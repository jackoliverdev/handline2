import admin from "firebase-admin";
import { initializeFirebaseAdmin } from "@/lib/firebase-admin";
import { supabaseAdmin } from "@/lib/supabase-admin";

export type ManagedRole = "admin" | "user";
export type ManagedStatus = "invited" | "active" | "suspended";

export interface AdminActor {
  firebaseUid: string;
  email: string;
  role: ManagedRole;
}

export function getBearerToken(authorization?: string): string | null {
  if (!authorization?.startsWith("Bearer ")) {
    return null;
  }

  return authorization.slice("Bearer ".length).trim() || null;
}

export async function requireAdmin(authorization?: string): Promise<AdminActor> {
  const token = getBearerToken(authorization);
  if (!token) {
    throw new Error("UNAUTHENTICATED");
  }

  initializeFirebaseAdmin();
  const decoded = await admin.auth().verifyIdToken(token, true);
  const email = decoded.email?.toLowerCase();
  if (!email) {
    throw new Error("UNAUTHENTICATED");
  }

  const { data: profile, error } = await supabaseAdmin
    .from("users")
    .select("role")
    .eq("firebase_uid", decoded.uid)
    .maybeSingle();

  if (error) {
    throw new Error("AUTHORIZATION_LOOKUP_FAILED");
  }

  const roleFromClaim = decoded.role?.toString().toLowerCase();
  const roleFromProfile = profile?.role?.toString().toLowerCase();
  const isAdmin = roleFromClaim === "admin" || roleFromProfile === "admin";
  if (!isAdmin) {
    throw new Error("FORBIDDEN");
  }

  // Keep claims aligned for existing administrators created before claims existed.
  if (roleFromClaim !== "admin") {
    await admin.auth().setCustomUserClaims(decoded.uid, { role: "admin" });
  }

  return {
    firebaseUid: decoded.uid,
    email,
    role: "admin",
  };
}

export async function requireAuthenticatedUser(authorization?: string) {
  const token = getBearerToken(authorization);
  if (!token) {
    throw new Error("UNAUTHENTICATED");
  }

  initializeFirebaseAdmin();
  return admin.auth().verifyIdToken(token, true);
}

export async function writeAdminAuditLog(
  actor: AdminActor,
  action: string,
  target?: { firebaseUid?: string; email?: string },
  metadata: Record<string, unknown> = {}
) {
  const { error } = await supabaseAdmin.from("admin_audit_log").insert({
    actor_firebase_uid: actor.firebaseUid,
    actor_email: actor.email,
    action,
    target_firebase_uid: target?.firebaseUid ?? null,
    target_email: target?.email ?? null,
    metadata,
  });

  if (error) {
    console.error("Failed to write admin audit log:", error.message);
  }
}

export function isManagedRole(value: unknown): value is ManagedRole {
  return value === "admin" || value === "user";
}

export function isManagedStatus(value: unknown): value is ManagedStatus {
  return value === "invited" || value === "active" || value === "suspended";
}
