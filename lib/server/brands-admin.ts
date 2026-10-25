import { z } from "zod";
import { supabaseAdmin } from "@/lib/supabase-admin";

const LOGO_MIME_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/gif", "image/webp"] as const;

/** Stay under the Vercel request body limit once the file is sent as multipart. */
export const MAX_LOGO_BYTES = 4 * 1024 * 1024;

const logoUrlSchema = z.preprocess(
  (value) => (value === "" ? null : value),
  z.string().trim().url().max(2000).nullable()
);

export const createBrandSchema = z.object({
  name: z.string().trim().min(1).max(100),
  logo_url: logoUrlSchema.optional(),
  dark_mode_logo_url: logoUrlSchema.optional(),
});

export const updateBrandSchema = z
  .object({
    name: z.string().trim().min(1).max(100).optional(),
    logo_url: logoUrlSchema.optional(),
    dark_mode_logo_url: logoUrlSchema.optional(),
  })
  .refine((value) => Object.values(value).some((item) => item !== undefined), {
    message: "No changes supplied",
  });

export const brandIdSchema = z.string().uuid();

const logoFileSchema = z.object({
  type: z.enum(LOGO_MIME_TYPES),
  size: z.number().int().positive().max(MAX_LOGO_BYTES),
});

export interface BrandRecord {
  id: string;
  name: string;
  logo_url: string | null;
  dark_mode_logo_url: string | null;
  created_at: string;
  updated_at: string;
}

export type BrandActionResult =
  | { ok: true; brand: BrandRecord }
  | { ok: false; status: number; error: string };

const EXTENSION_BY_MIME: Record<(typeof LOGO_MIME_TYPES)[number], string> = {
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
  "image/png": "png",
  "image/gif": "gif",
  "image/webp": "webp",
};

function exactIlikePattern(name: string): string {
  return name.replace(/[\\%_]/g, (character) => `\\${character}`);
}

async function nameTaken(name: string, excludeId?: string): Promise<boolean> {
  const { data, error } = await supabaseAdmin
    .from("brands")
    .select("id")
    .ilike("name", exactIlikePattern(name))
    .limit(5);

  if (error) {
    throw error;
  }

  return (data ?? []).some((row) => row.id !== excludeId);
}

export async function insertBrand(input: z.infer<typeof createBrandSchema>): Promise<BrandActionResult> {
  if (await nameTaken(input.name)) {
    return { ok: false, status: 409, error: "BRAND_EXISTS" };
  }

  const { data, error } = await supabaseAdmin
    .from("brands")
    .insert({
      name: input.name,
      logo_url: input.logo_url ?? null,
      dark_mode_logo_url: input.dark_mode_logo_url ?? null,
    })
    .select("*")
    .single();

  if (error) {
    if (error.code === "23505") {
      return { ok: false, status: 409, error: "BRAND_EXISTS" };
    }
    throw error;
  }

  return { ok: true, brand: data as BrandRecord };
}

export async function updateBrandRecord(
  id: string,
  input: z.infer<typeof updateBrandSchema>
): Promise<BrandActionResult> {
  if (input.name && (await nameTaken(input.name, id))) {
    return { ok: false, status: 409, error: "BRAND_EXISTS" };
  }

  const updates: Record<string, string | null> = {
    updated_at: new Date().toISOString(),
  };
  if (input.name !== undefined) updates.name = input.name;
  if (input.logo_url !== undefined) updates.logo_url = input.logo_url;
  if (input.dark_mode_logo_url !== undefined) updates.dark_mode_logo_url = input.dark_mode_logo_url;

  const { data, error } = await supabaseAdmin
    .from("brands")
    .update(updates)
    .eq("id", id)
    .select("*")
    .maybeSingle();

  if (error) {
    if (error.code === "23505") {
      return { ok: false, status: 409, error: "BRAND_EXISTS" };
    }
    throw error;
  }

  if (!data) {
    return { ok: false, status: 404, error: "NOT_FOUND" };
  }

  return { ok: true, brand: data as BrandRecord };
}

export async function deleteBrandRecord(id: string): Promise<BrandActionResult> {
  const { data, error } = await supabaseAdmin
    .from("brands")
    .delete()
    .eq("id", id)
    .select("id, name, logo_url, dark_mode_logo_url, created_at, updated_at")
    .maybeSingle();

  if (error) {
    throw error;
  }

  if (!data) {
    return { ok: false, status: 404, error: "NOT_FOUND" };
  }

  return { ok: true, brand: data as BrandRecord };
}

export async function uploadBrandLogoFile(file: File): Promise<{ ok: true; logo_url: string } | { ok: false; status: number; error: string }> {
  const parsed = logoFileSchema.safeParse({ type: file.type, size: file.size });
  if (!parsed.success) {
    return { ok: false, status: 400, error: "INVALID_LOGO" };
  }

  const extension = EXTENSION_BY_MIME[parsed.data.type];
  const filePath = `brands/${Date.now()}-${crypto.randomUUID()}.${extension}`;
  const bytes = Buffer.from(await file.arrayBuffer());

  const { error } = await supabaseAdmin.storage.from("products").upload(filePath, bytes, {
    contentType: parsed.data.type,
    cacheControl: "3600",
    upsert: false,
  });

  if (error) {
    console.error("[brands] logo upload failed", error.message);
    return { ok: false, status: 500, error: "LOGO_UPLOAD_FAILED" };
  }

  const { data } = supabaseAdmin.storage.from("products").getPublicUrl(filePath);
  return { ok: true, logo_url: data.publicUrl };
}
