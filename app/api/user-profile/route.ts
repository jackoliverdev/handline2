import { NextRequest, NextResponse } from "next/server";
import { requireAuthenticatedUser } from "@/lib/server/admin-auth";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function GET(request: NextRequest) {
  try {
    const decoded = await requireAuthenticatedUser(request.headers.get("authorization") || undefined);
    const { data: profile, error } = await supabaseAdmin.from("users").select("*").eq("firebase_uid", decoded.uid).maybeSingle();
    if (error) throw error;
    if (!profile) return NextResponse.json({ success: true, data: null });

    const updates = {
      last_login_at: new Date().toISOString(),
      ...(profile.status === "invited" ? { status: "active" } : {}),
    };
    const { data, error: updateError } = await supabaseAdmin
      .from("users")
      .update(updates)
      .eq("firebase_uid", decoded.uid)
      .select("*")
      .single();
    if (updateError) throw updateError;
    return NextResponse.json({ success: true, data });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to load profile";
    return NextResponse.json({ success: false, message }, { status: message === "UNAUTHENTICATED" ? 401 : 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const decoded = await requireAuthenticatedUser(request.headers.get("authorization") || undefined);
    const body = await request.json();
    const updates = {
      ...(typeof body.display_name === "string" ? { display_name: body.display_name } : {}),
      ...(typeof body.photo_url === "string" || body.photo_url === null ? { photo_url: body.photo_url } : {}),
    };
    const { data, error } = await supabaseAdmin.from("users").update(updates).eq("firebase_uid", decoded.uid).select().single();
    if (error) throw error;
    return NextResponse.json({ success: true, data });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to update profile";
    return NextResponse.json({ success: false, message }, { status: message === "UNAUTHENTICATED" ? 401 : 500 });
  }
}
