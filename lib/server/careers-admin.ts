import { z } from "zod";
import { createSlug, type CareerPost } from "@/lib/career-service";
import { supabaseAdmin } from "@/lib/supabase-admin";

const localeJson = z.record(z.string(), z.any());

const careerFields = {
  slug: z.string().optional(),
  title: z.string().optional(),
  summary: z.string().optional(),
  description: z.string().optional(),
  responsibilities: z.array(z.string()).optional(),
  requirements: z.array(z.string()).optional(),
  benefits: z.array(z.string()).optional(),
  location: z.string().optional(),
  department: z.string().optional(),
  job_type: z.string().optional(),
  work_site: z.string().nullable().optional(),
  salary_range: z.string().nullable().optional(),
  image_url: z.string().nullable().optional(),
  published_at: z.string().nullable().optional(),
  expiry_date: z.string().nullable().optional(),
  is_published: z.boolean().optional(),
  is_featured: z.boolean().optional(),
  title_locales: localeJson.optional(),
  summary_locales: localeJson.optional(),
  description_locales: localeJson.optional(),
  responsibilities_locales: localeJson.optional(),
  requirements_locales: localeJson.optional(),
  benefits_locales: localeJson.optional(),
  location_locales: localeJson.optional(),
  department_locales: localeJson.optional(),
  job_type_locales: localeJson.optional(),
  work_site_locales: localeJson.optional(),
  salary_range_locales: localeJson.optional(),
};

export const careerWriteSchema = z.object(careerFields).strict();

export const careerIdSchema = z.string().uuid();

export const careerToggleSchema = z
  .object({
    field: z.enum(["is_published", "is_featured"]),
  })
  .strict();

export type CareerWriteInput = z.infer<typeof careerWriteSchema>;

export async function listCareers(): Promise<CareerPost[]> {
  const { data, error } = await supabaseAdmin
    .from("careers")
    .select("*")
    .order("published_at", { ascending: false });

  if (error) throw error;
  return (data ?? []) as CareerPost[];
}

export async function getCareerRecord(id: string): Promise<CareerPost | null> {
  const { data, error } = await supabaseAdmin.from("careers").select("*").eq("id", id).maybeSingle();

  if (error) throw error;
  return (data as CareerPost | null) ?? null;
}

export async function insertCareer(post: CareerWriteInput): Promise<CareerPost> {
  const payload: CareerWriteInput = {
    ...post,
    slug: post.slug || createSlug(post.title || ""),
    responsibilities: post.responsibilities || [],
    requirements: post.requirements || [],
    benefits: post.benefits || [],
  };

  if (payload.is_published && !payload.published_at) {
    payload.published_at = new Date().toISOString();
  }

  const { data, error } = await supabaseAdmin.from("careers").insert([payload]).select().single();

  if (error) throw error;
  return data as CareerPost;
}

export async function updateCareerRecord(id: string, updates: CareerWriteInput): Promise<CareerPost | null> {
  const next: CareerWriteInput = { ...updates };
  if (updates.title && !updates.slug) {
    next.slug = createSlug(updates.title);
  }
  if (typeof updates.is_published === "boolean") {
    if (updates.is_published && !updates.published_at) {
      next.published_at = new Date().toISOString();
    }
    if (!updates.is_published) {
      next.published_at = null;
    }
  }
  if (
    updates.responsibilities !== undefined ||
    updates.requirements !== undefined ||
    updates.benefits !== undefined
  ) {
    next.responsibilities = updates.responsibilities ?? [];
    next.requirements = updates.requirements ?? [];
    next.benefits = updates.benefits ?? [];
  }

  const { data, error } = await supabaseAdmin.from("careers").update(next).eq("id", id).select().maybeSingle();

  if (error) throw error;
  return (data as CareerPost | null) ?? null;
}

export async function deleteCareerRecord(id: string): Promise<void> {
  const { error } = await supabaseAdmin.from("careers").delete().eq("id", id);
  if (error) throw error;
}

export async function toggleCareerPublishedRecord(id: string): Promise<CareerPost | null> {
  const { data: current, error: fetchError } = await supabaseAdmin
    .from("careers")
    .select("is_published, published_at")
    .eq("id", id)
    .maybeSingle();

  if (fetchError) throw fetchError;
  if (!current) return null;

  const nextIsPublished = !current.is_published;
  const nextPublishedAt = nextIsPublished ? new Date().toISOString() : null;

  const { data, error } = await supabaseAdmin
    .from("careers")
    .update({ is_published: nextIsPublished, published_at: nextPublishedAt })
    .eq("id", id)
    .select()
    .maybeSingle();

  if (error) throw error;
  return (data as CareerPost | null) ?? null;
}

export async function toggleCareerFeaturedRecord(id: string): Promise<CareerPost | null> {
  const { data: current, error: fetchError } = await supabaseAdmin
    .from("careers")
    .select("is_featured")
    .eq("id", id)
    .maybeSingle();

  if (fetchError) throw fetchError;
  if (!current) return null;

  const { data, error } = await supabaseAdmin
    .from("careers")
    .update({ is_featured: !current.is_featured })
    .eq("id", id)
    .select()
    .maybeSingle();

  if (error) throw error;
  return (data as CareerPost | null) ?? null;
}
