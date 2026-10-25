import { z } from "zod";
import { supabaseAdmin } from "@/lib/supabase-admin";
import type { PPECategoryRecord, PPESectionRecord } from "@/lib/ppe-standards/types";

const localeStringSchema = z.record(z.string());

const nullableText = z.string().nullable();

export const ppeCategoryIdSchema = z.string().uuid();

export const categoryCreateSchema = z
  .object({
    id: ppeCategoryIdSchema,
    slug: z.string().min(1).max(2000),
    title_locales: localeStringSchema,
    summary_locales: localeStringSchema,
    hero_image_url: nullableText,
    card_image_url: nullableText,
    hero_focus_y: z.number().finite(),
    sort_order: z.number().finite(),
  })
  .strict();

export const categoryUpdateSchema = z
  .object({
    title_locales: localeStringSchema,
    summary_locales: localeStringSchema,
    hero_image_url: nullableText,
    card_image_url: nullableText,
    hero_focus_y: z.number().finite(),
    sort_order: z.number().finite(),
  })
  .strict();

const sectionImageSchema = z
  .object({
    url: z.string(),
    caption_locales: localeStringSchema.optional(),
  })
  .passthrough();

export const sectionSchema = z
  .object({
    id: ppeCategoryIdSchema,
    category_id: ppeCategoryIdSchema,
    slug: z.string().min(1),
    code: nullableText,
    title_locales: localeStringSchema,
    intro_locales: localeStringSchema,
    bullets_locales: z.union([z.array(z.string()), z.record(z.array(z.string()))]),
    image_url: nullableText,
    icon_url: nullableText,
    standard_icon_id: ppeCategoryIdSchema.nullable(),
    related_product_captions: z.record(localeStringSchema),
    related_product_ids: z.array(z.string()),
    sort_order: z.number().finite(),
    published: z.boolean(),
    extra_images: z.array(sectionImageSchema).optional(),
  })
  .strict();

export const libraryIconSchema = z
  .object({
    sectionId: ppeCategoryIdSchema,
    standard_name: z.string().min(1).max(300),
    image_url: z.string().min(1).max(2000),
  })
  .strict();

export const createPpeCategorySchema = z
  .object({
    category: categoryCreateSchema,
    sections: z.array(sectionSchema),
    libraryIcons: z.array(libraryIconSchema),
  })
  .strict();

export const updatePpeCategorySchema = z
  .object({
    category: categoryUpdateSchema,
    sections: z.array(sectionSchema),
    libraryIcons: z.array(libraryIconSchema),
  })
  .strict();

type SectionInput = z.infer<typeof sectionSchema>;
type LibraryIconInput = z.infer<typeof libraryIconSchema>;

function slugify(str: string): string {
  return (str || "")
    .toLowerCase()
    .replace(/[^\w\s]/g, "")
    .replace(/\s+/g, "-")
    .replace(/--+/g, "-")
    .trim();
}

async function ensureUniqueSlug(base: string): Promise<string> {
  let slug = slugify(base);
  let suffix = 1;
  while (true) {
    const { data, error } = await supabaseAdmin
      .from("ppe_categories")
      .select("id")
      .eq("slug", slug)
      .limit(1)
      .maybeSingle();
    if (error) break;
    if (!data) return slug;
    slug = `${slugify(base)}-${suffix++}`;
  }
  return slug;
}

function sectionRow(section: SectionInput, categoryId: string, includeExtraImages: boolean) {
  const row: Record<string, unknown> = {
    id: section.id,
    category_id: categoryId,
    slug: section.slug,
    code: section.code,
    title_locales: section.title_locales,
    intro_locales: section.intro_locales,
    bullets_locales: section.bullets_locales,
    image_url: section.image_url,
    icon_url: section.icon_url,
    standard_icon_id: section.standard_icon_id,
    related_product_captions: section.related_product_captions,
    related_product_ids: section.related_product_ids,
    sort_order: section.sort_order,
    published: section.published,
  };

  if (includeExtraImages) {
    row.extra_images = section.extra_images ?? [];
  }

  return row;
}

async function attachLibraryIcons(sections: SectionInput[], libraryIcons: LibraryIconInput[]): Promise<SectionInput[]> {
  if (libraryIcons.length === 0 || sections.length === 0) return sections;

  const sectionIds = new Set(sections.map((section) => section.id));
  const relevant = libraryIcons.filter((icon) => sectionIds.has(icon.sectionId));
  if (relevant.length === 0) return sections;

  const urls = Array.from(new Set(relevant.map((icon) => icon.image_url)));
  const { data: existingRows, error } = await supabaseAdmin
    .from("standard_icons")
    .select("image_url")
    .in("image_url", urls);

  if (error) throw error;

  const known = new Set((existingRows ?? []).map((row) => String(row.image_url)));
  const assigned = new Map<string, string>();

  for (const icon of relevant) {
    if (known.has(icon.image_url)) continue;

    const { data, error: insertError } = await supabaseAdmin
      .from("standard_icons")
      .insert({ standard_name: icon.standard_name, image_url: icon.image_url })
      .select("id, image_url")
      .single();

    if (insertError) throw insertError;

    known.add(String(data.image_url));
    assigned.set(icon.sectionId, data.id as string);
  }

  if (assigned.size === 0) return sections;

  return sections.map((section) => {
    const standardIconId = assigned.get(section.id);
    if (!standardIconId) return section;
    return { ...section, standard_icon_id: standardIconId };
  });
}

async function upsertSections(
  categoryId: string,
  sections: SectionInput[],
  libraryIcons: LibraryIconInput[],
  includeExtraImages: boolean
): Promise<void> {
  const withIcons = await attachLibraryIcons(sections, libraryIcons);
  if (withIcons.length === 0) return;

  const { error } = await supabaseAdmin
    .from("ppe_sections")
    .upsert(
      withIcons.map((section) => sectionRow(section, categoryId, includeExtraImages)),
      { onConflict: "id" }
    );

  if (error) throw error;
}

export async function getPpeCategoryRecord(id: string): Promise<{
  category: PPECategoryRecord;
  sections: PPESectionRecord[];
} | null> {
  const { data: category, error } = await supabaseAdmin
    .from("ppe_categories")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) throw error;
  if (!category) return null;

  const { data: sections, error: sectionsError } = await supabaseAdmin
    .from("ppe_sections")
    .select("*")
    .eq("category_id", id)
    .order("sort_order", { ascending: true });

  if (sectionsError) throw sectionsError;

  return {
    category: category as PPECategoryRecord,
    sections: (sections ?? []) as PPESectionRecord[],
  };
}

export async function createPpeCategoryRecord(input: z.infer<typeof createPpeCategorySchema>): Promise<{
  category: PPECategoryRecord;
}> {
  const slug = await ensureUniqueSlug(input.category.slug);

  const { data, error } = await supabaseAdmin
    .from("ppe_categories")
    .upsert(
      [
        {
          id: input.category.id,
          slug,
          title_locales: input.category.title_locales,
          summary_locales: input.category.summary_locales,
          hero_image_url: input.category.hero_image_url,
          card_image_url: input.category.card_image_url,
          hero_focus_y: input.category.hero_focus_y,
          sort_order: input.category.sort_order,
        },
      ],
      { onConflict: "id" }
    )
    .select("*")
    .single();

  if (error) throw error;

  await upsertSections(input.category.id, input.sections, input.libraryIcons, false);

  return { category: data as PPECategoryRecord };
}

export async function updatePpeCategoryRecord(
  id: string,
  input: z.infer<typeof updatePpeCategorySchema>
): Promise<{ category: PPECategoryRecord; sections: PPESectionRecord[] } | null> {
  const { data, error } = await supabaseAdmin
    .from("ppe_categories")
    .update({
      title_locales: input.category.title_locales,
      summary_locales: input.category.summary_locales,
      hero_image_url: input.category.hero_image_url,
      card_image_url: input.category.card_image_url,
      hero_focus_y: input.category.hero_focus_y,
      sort_order: input.category.sort_order,
    })
    .eq("id", id)
    .select("id")
    .maybeSingle();

  if (error) throw error;
  if (!data) return null;

  const { data: existingSectionRows, error: existingFetchErr } = await supabaseAdmin
    .from("ppe_sections")
    .select("id")
    .eq("category_id", id);

  if (existingFetchErr) throw existingFetchErr;

  const currentIds = new Set(input.sections.map((section) => section.id));
  const idsToDelete = (existingSectionRows ?? [])
    .map((row) => row.id as string)
    .filter((sectionId) => !currentIds.has(sectionId));

  if (idsToDelete.length > 0) {
    const { error: deleteErr } = await supabaseAdmin.from("ppe_sections").delete().in("id", idsToDelete);
    if (deleteErr) throw deleteErr;
  }

  await upsertSections(id, input.sections, input.libraryIcons, true);

  return getPpeCategoryRecord(id);
}

export async function deletePpeCategoryRecord(id: string): Promise<void> {
  const { error } = await supabaseAdmin.from("ppe_categories").delete().eq("id", id);
  if (error) throw error;
}
