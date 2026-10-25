import { z } from "zod";
import { createSlug, type BlogPost } from "@/lib/blog-service";
import { supabaseAdmin } from "@/lib/supabase-admin";

const localeJson = z.record(z.string(), z.any());

const extraImageSchema = z
  .object({
    url: z.string(),
    width: z.number().optional(),
    height: z.number().optional(),
  })
  .passthrough();

const blogFields = {
  title: z.string().optional(),
  slug: z.string().optional(),
  summary: z.string().optional(),
  content: z.string().optional(),
  author: z.string().optional(),
  image_url: z.string().nullable().optional(),
  featured_image_url: z.string().nullable().optional(),
  tags: z.array(z.string()).optional(),
  published_at: z.string().nullable().optional(),
  is_published: z.boolean().optional(),
  is_featured: z.boolean().optional(),
  title_locales: localeJson.optional(),
  summary_locales: localeJson.optional(),
  content_locales: localeJson.optional(),
  tags_locales: localeJson.optional(),
  category: z.string().nullable().optional(),
  category_locales: localeJson.optional(),
  extra_images_locales: z.array(extraImageSchema).optional(),
  related_product_id_1: z.string().nullable().optional(),
  related_product_id_2: z.string().nullable().optional(),
  related_product_id_3: z.string().nullable().optional(),
  related_product_id_4: z.string().nullable().optional(),
};

export const blogWriteSchema = z.object(blogFields).strict();

export const blogIdSchema = z.string().uuid();

export const blogToggleSchema = z
  .object({
    field: z.enum(["is_published", "is_featured"]),
  })
  .strict();

export type BlogWriteInput = z.infer<typeof blogWriteSchema>;

export async function listBlogs(): Promise<BlogPost[]> {
  const { data, error } = await supabaseAdmin
    .from("blog_posts")
    .select("*")
    .order("published_at", { ascending: false });

  if (error) throw error;
  return (data ?? []) as BlogPost[];
}

export async function getBlogRecord(id: string): Promise<BlogPost | null> {
  const { data, error } = await supabaseAdmin
    .from("blog_posts")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) throw error;
  return (data as BlogPost | null) ?? null;
}

export async function insertBlog(input: BlogWriteInput): Promise<BlogPost> {
  const row = {
    ...input,
    id: crypto.randomUUID(),
    slug: input.slug || createSlug(input.title || ""),
  };

  const { data, error } = await supabaseAdmin.from("blog_posts").insert([row]).select().single();

  if (error) throw error;
  return data as BlogPost;
}

export async function updateBlogRecord(id: string, updates: BlogWriteInput): Promise<BlogPost | null> {
  const next: BlogWriteInput = { ...updates };
  if (updates.title && !updates.slug) {
    next.slug = createSlug(updates.title);
  }

  const { data, error } = await supabaseAdmin
    .from("blog_posts")
    .update(next)
    .eq("id", id)
    .select()
    .maybeSingle();

  if (error) throw error;
  return (data as BlogPost | null) ?? null;
}

export async function deleteBlogRecord(id: string): Promise<void> {
  const { error } = await supabaseAdmin.from("blog_posts").delete().eq("id", id);
  if (error) throw error;
}

export async function toggleBlogPublishedRecord(id: string): Promise<BlogPost | null> {
  const { data: blog, error: fetchError } = await supabaseAdmin
    .from("blog_posts")
    .select("is_published")
    .eq("id", id)
    .maybeSingle();

  if (fetchError) throw fetchError;
  if (!blog) return null;

  const { data, error } = await supabaseAdmin
    .from("blog_posts")
    .update({ is_published: !blog.is_published })
    .eq("id", id)
    .select()
    .maybeSingle();

  if (error) throw error;
  return (data as BlogPost | null) ?? null;
}

export async function toggleBlogFeaturedRecord(id: string): Promise<BlogPost | null> {
  const { data: blog, error: fetchError } = await supabaseAdmin
    .from("blog_posts")
    .select("is_featured")
    .eq("id", id)
    .maybeSingle();

  if (fetchError) throw fetchError;
  if (!blog) return null;

  const { data, error } = await supabaseAdmin
    .from("blog_posts")
    .update({ is_featured: !blog.is_featured })
    .eq("id", id)
    .select()
    .maybeSingle();

  if (error) throw error;
  return (data as BlogPost | null) ?? null;
}
