import admin from "firebase-admin";
import { Resend } from "resend";
import { supabaseAdmin } from "@/lib/supabase-admin";
import {
  AdminActor,
  isManagedRole,
  isManagedStatus,
  ManagedRole,
  ManagedStatus,
  writeAdminAuditLog,
} from "@/lib/server/admin-auth";

type UserProfile = {
  id: string;
  firebase_uid: string;
  email: string;
  display_name: string | null;
  photo_url: string | null;
  role: ManagedRole;
  status: ManagedStatus;
  created_at: string;
  updated_at: string;
  dark_mode: boolean;
  notifications: boolean;
  marketing_emails: boolean;
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL;

function ensureSiteUrl() {
  if (!siteUrl) {
    throw new Error("SITE_URL_MISSING");
  }

  return siteUrl;
}

async function countActiveAdmins(excludingFirebaseUid?: string) {
  let query = supabaseAdmin
    .from("users")
    .select("id", { count: "exact", head: true })
    .eq("role", "admin")
    .neq("status", "suspended");

  if (excludingFirebaseUid) {
    query = query.neq("firebase_uid", excludingFirebaseUid);
  }

  const { count, error } = await query;
  if (error) throw error;
  return count ?? 0;
}

async function getUserById(id: string): Promise<UserProfile | null> {
  const { data, error } = await supabaseAdmin
    .from("users")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) throw error;
  return data as UserProfile | null;
}

async function sendPasswordSetEmail(email: string, link: string) {
  const resendKey = process.env.RESEND_API_KEY;
  if (!resendKey) {
    throw new Error("RESEND_NOT_CONFIGURED");
  }

  const resend = new Resend(resendKey);
  const { error } = await resend.emails.send({
    from: "Hand Line <noreply@mail.handlineco.com>",
    to: [email],
    subject: "Reset your Hand Line account password",
    html: `<p>An administrator has requested a password reset for your Hand Line account.</p><p><a href="${link}" style="display:inline-block;padding:10px 16px;background:#F28C38;color:#fff;text-decoration:none;border-radius:6px">Reset password</a></p><p>If the button does not work, copy this URL into your browser:</p><p>${link}</p>`,
  });

  if (error) throw new Error(error.message);
}

export async function listManagedUsers() {
  const { data, error } = await supabaseAdmin
    .from("users")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data as UserProfile[];
}

export async function getManagedUser(id: string) {
  return getUserById(id);
}

async function sendNewAccountEmail(email: string, password: string) {
  const resendKey = process.env.RESEND_API_KEY;
  if (!resendKey) throw new Error("RESEND_NOT_CONFIGURED");

  const resend = new Resend(resendKey);
  const { error } = await resend.emails.send({
    from: "Hand Line <noreply@mail.handlineco.com>",
    to: [email],
    subject: "Your Hand Line account details",
    html: `<p>An administrator has created your Hand Line account.</p><p><strong>Email:</strong> ${email}<br /><strong>Temporary password:</strong> ${password}</p><p>Sign in at <a href="${ensureSiteUrl()}/login">${ensureSiteUrl()}/login</a>. You can request a password reset from the login page at any time.</p>`,
  });
  if (error) throw new Error(error.message);
}

export async function createManagedUser(
  actor: AdminActor,
  input: {
    email: string;
    password: string;
    displayName?: string;
    role?: ManagedRole;
    preferences?: { dark_mode?: boolean; notifications?: boolean; marketing_emails?: boolean };
  }
) {
  const email = input.email.trim().toLowerCase();
  const role = input.role ?? "user";
  if (!email || !isManagedRole(role)) throw new Error("INVALID_INPUT");

  const password = input.password;
  const firebaseUser = await admin.auth().createUser({
    email,
    password,
    displayName: input.displayName?.trim() || undefined,
  });

  try {
    await admin.auth().setCustomUserClaims(firebaseUser.uid, { role });
    const { data: profile, error } = await supabaseAdmin
      .from("users")
      .insert({
        firebase_uid: firebaseUser.uid,
        email,
        display_name: input.displayName?.trim() || null,
        role,
        status: "active",
        invited_by: actor.firebaseUid,
        invited_at: new Date().toISOString(),
        dark_mode: input.preferences?.dark_mode ?? false,
        notifications: input.preferences?.notifications ?? true,
        marketing_emails: input.preferences?.marketing_emails ?? false,
      })
      .select("*")
      .single();

    if (error) throw error;

    await sendNewAccountEmail(email, password);
    await writeAdminAuditLog(actor, "user.created", { firebaseUid: firebaseUser.uid, email }, { role });
    return profile as UserProfile;
  } catch (error) {
    await admin.auth().deleteUser(firebaseUser.uid).catch(() => undefined);
    throw error;
  }
}

export async function updateManagedUser(
  actor: AdminActor,
  id: string,
  updates: {
    display_name?: string;
    role?: ManagedRole;
    status?: ManagedStatus;
    dark_mode?: boolean;
    notifications?: boolean;
    marketing_emails?: boolean;
  }
) {
  const target = await getUserById(id);
  if (!target) throw new Error("NOT_FOUND");
  if (target.firebase_uid === actor.firebaseUid && (updates.role === "user" || updates.status === "suspended")) {
    throw new Error("SELF_PRIVILEGE_CHANGE_FORBIDDEN");
  }
  if (updates.role !== undefined && !isManagedRole(updates.role)) throw new Error("INVALID_ROLE");
  if (updates.status !== undefined && !isManagedStatus(updates.status)) throw new Error("INVALID_STATUS");

  const removesAdmin = target.role === "admin" && (updates.role === "user" || updates.status === "suspended");
  if (removesAdmin && await countActiveAdmins(target.firebase_uid) === 0) {
    throw new Error("LAST_ADMIN_PROTECTED");
  }

  const nextRole = updates.role ?? target.role;
  const nextStatus = updates.status ?? target.status;
  const now = new Date().toISOString();

  await admin.auth().setCustomUserClaims(target.firebase_uid, { role: nextRole });
  if (nextStatus === "suspended") {
    await admin.auth().updateUser(target.firebase_uid, { disabled: true });
    await admin.auth().revokeRefreshTokens(target.firebase_uid);
  } else if (target.status === "suspended") {
    await admin.auth().updateUser(target.firebase_uid, { disabled: false });
  }

  const payload = {
    ...updates,
    role: nextRole,
    status: nextStatus,
    ...(nextStatus === "suspended" ? { suspended_at: now, suspended_by: actor.firebaseUid } : {}),
  };
  const { data, error } = await supabaseAdmin
    .from("users")
    .update(payload)
    .eq("id", id)
    .select("*")
    .single();

  if (error) throw error;
  await writeAdminAuditLog(actor, "user.updated", { firebaseUid: target.firebase_uid, email: target.email }, { updates: payload });
  return data as UserProfile;
}

export async function sendManagedPasswordReset(actor: AdminActor, id: string) {
  const target = await getUserById(id);
  if (!target) throw new Error("NOT_FOUND");

  const link = await admin.auth().generatePasswordResetLink(target.email, {
    url: `${ensureSiteUrl()}/login`,
    handleCodeInApp: false,
  });
  await sendPasswordSetEmail(target.email, link);
  await writeAdminAuditLog(actor, "user.password_reset_sent", { firebaseUid: target.firebase_uid, email: target.email });
}

export async function deleteManagedUser(actor: AdminActor, id: string) {
  const target = await getUserById(id);
  if (!target) throw new Error("NOT_FOUND");
  if (target.firebase_uid === actor.firebaseUid) throw new Error("SELF_DELETE_FORBIDDEN");
  if (target.role === "admin" && await countActiveAdmins(target.firebase_uid) === 0) {
    throw new Error("LAST_ADMIN_PROTECTED");
  }

  await admin.auth().deleteUser(target.firebase_uid);
  const { error } = await supabaseAdmin.from("users").delete().eq("id", id);
  if (error) throw error;
  await writeAdminAuditLog(actor, "user.deleted", { firebaseUid: target.firebase_uid, email: target.email });
}
