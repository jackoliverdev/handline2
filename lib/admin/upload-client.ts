"use client";

import { adminFetch } from "@/lib/admin-api";
import { supabase } from "@/lib/supabase";

export type AdminUploadBucket = "products" | "technical-sheets" | "ppehub" | "blog-covers" | "industries";

export async function adminUploadFile(
  bucket: AdminUploadBucket,
  path: string,
  file: File,
  options: { upsert?: boolean } = {}
): Promise<string> {
  const signed = await adminFetch<{ path: string; token: string; publicUrl: string }>("/api/admin/storage/sign-upload", {
    method: "POST",
    body: JSON.stringify({ bucket, path, upsert: options.upsert === true }),
  });

  const { error } = await supabase.storage.from(bucket).uploadToSignedUrl(signed.path, signed.token, file, {
    contentType: file.type || undefined,
    upsert: options.upsert === true,
  });

  if (error) throw error;
  return signed.publicUrl;
}
