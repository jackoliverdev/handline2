import { NextResponse } from "next/server";
import { z } from "zod";
import { requireAdmin } from "@/lib/server/admin-auth";
import { adminAuthErrorResponse, invalidBody } from "@/lib/server/admin-http";
import { UPLOAD_BUCKETS, validateUploadPath } from "@/lib/server/storage-paths";
import { supabaseAdmin } from "@/lib/supabase-admin";

export const runtime = "nodejs";

const signUploadSchema = z
  .object({
    bucket: z.enum(UPLOAD_BUCKETS),
    path: z.string(),
    upsert: z.boolean().optional(),
  })
  .strict();

export async function POST(request: Request) {
  try {
    await requireAdmin(request.headers.get("authorization") || undefined);

    const body = await request.json().catch(() => null);
    const parsed = signUploadSchema.safeParse(body);
    if (!parsed.success) {
      return invalidBody();
    }

    const upsert = parsed.data.upsert === true;
    const validated = validateUploadPath(parsed.data.bucket, parsed.data.path, upsert);
    if (!validated.ok) {
      return NextResponse.json({ error: validated.error }, { status: 400 });
    }

    const { data, error } = await supabaseAdmin.storage
      .from(parsed.data.bucket)
      .createSignedUploadUrl(parsed.data.path, { upsert });

    if (error || !data) {
      console.error("[storage] sign failed", error?.message ?? "UPLOAD_SIGN_FAILED");
      return NextResponse.json({ error: "UPLOAD_SIGN_FAILED" }, { status: 500 });
    }

    const publicUrl = supabaseAdmin.storage.from(parsed.data.bucket).getPublicUrl(parsed.data.path).data.publicUrl;
    return NextResponse.json({ path: data.path, token: data.token, publicUrl });
  } catch (error) {
    const authResponse = adminAuthErrorResponse(error);
    if (authResponse) return authResponse;
    console.error("[storage] sign failed", error instanceof Error ? error.message : error);
    return NextResponse.json({ error: "UPLOAD_SIGN_FAILED" }, { status: 500 });
  }
}
