import { z } from "zod";
import { v4 as uuidv4 } from "uuid";
import { supabaseAdmin } from "@/lib/supabase-admin";
import type { Industry } from "@/lib/industries-service";

const optionalText = z.string().nullable().optional();
const optionalJson = z.unknown().optional();
const optionalProductId = z.string().nullable().optional();
const optionalProductIds = z.array(z.string()).nullable().optional();

const industryFields = {
  industry_name: optionalText,
  description: optionalText,
  content: optionalText,
  image_url: optionalText,
  feature_image_url: optionalText,
  showcase_description: optionalText,
  showcase_description_locales: optionalJson,
  features_locales: optionalJson,
  related_products: optionalProductIds,
  industry_name_locales: optionalJson,
  description_locales: optionalJson,
  summary_content_locales: optionalJson,
  summary_content_image_url: optionalText,
  sections_locales: optionalJson,
  related_product_id_1: optionalProductId,
  related_product_id_2: optionalProductId,
  related_product_id_3: optionalProductId,
  related_product_id_4: optionalProductId,
  related_product_id_5: optionalProductId,
  related_product_id_6: optionalProductId,
  related_product_id_7: optionalProductId,
  related_product_id_8: optionalProductId,
  related_product_id_9: optionalProductId,
  related_product_id_10: optionalProductId,
};

export const createIndustrySchema = z.object(industryFields).strict();

export const updateIndustrySchema = z
  .object({
    ...industryFields,
    is_featured: z.boolean().optional(),
    position: z.number().int().min(1).max(4).nullable().optional(),
  })
  .strict()
  .refine((value) => Object.values(value).some((item) => item !== undefined), {
    message: "No changes supplied",
  });

export const industryIdSchema = z.string().uuid();

export type IndustryActionResult =
  | { ok: true; industry: Industry }
  | { ok: false; status: number; error: string };

function definedColumns(input: object): Record<string, unknown> {
  const columns: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(input)) {
    if (value !== undefined) columns[key] = value;
  }
  return columns;
}

export async function insertIndustry(input: z.infer<typeof createIndustrySchema>): Promise<IndustryActionResult> {
  const { data, error } = await supabaseAdmin
    .from("industry_solutions")
    .insert({
      id: uuidv4(),
      ...definedColumns(input),
    })
    .select("*")
    .single();

  if (error) {
    throw error;
  }

  return { ok: true, industry: data as Industry };
}

export async function updateIndustryRecord(
  id: string,
  input: z.infer<typeof updateIndustrySchema>
): Promise<IndustryActionResult> {
  const { data, error } = await supabaseAdmin
    .from("industry_solutions")
    .update(definedColumns(input))
    .eq("id", id)
    .select("*")
    .maybeSingle();

  if (error) {
    throw error;
  }

  if (!data) {
    return { ok: false, status: 404, error: "NOT_FOUND" };
  }

  return { ok: true, industry: data as Industry };
}

export async function deleteIndustryRecord(id: string): Promise<{ ok: true } | { ok: false; status: number; error: string }> {
  const { data, error } = await supabaseAdmin
    .from("industry_solutions")
    .delete()
    .eq("id", id)
    .select("id")
    .maybeSingle();

  if (error) {
    throw error;
  }

  if (!data) {
    return { ok: false, status: 404, error: "NOT_FOUND" };
  }

  return { ok: true };
}
