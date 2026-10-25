import { z } from "zod";
import type { Product } from "@/lib/products-service";
import { generateUniqueProductSlug } from "@/lib/product-slug";
import { supabaseAdmin } from "@/lib/supabase-admin";

const nullableText = z.string().nullable();
const nullableNumber = z.number().nullable();
const jsonValue = z.any();

function omitProductSystemColumns(value: unknown): unknown {
  if (!value || typeof value !== "object" || Array.isArray(value)) return value;
  const record = { ...(value as Record<string, unknown>) };
  delete record.id;
  delete record.created_at;
  delete record.updated_at;
  return record;
}

const productWriteObject = z
  .object({
    slug: nullableText.optional(),
    name: nullableText.optional(),
    description: nullableText.optional(),
    short_description: nullableText.optional(),
    category: nullableText.optional(),
    sub_category: nullableText.optional(),
    temperature_rating: nullableNumber.optional(),
    cut_resistance_level: nullableText.optional(),
    heat_resistance_level: nullableText.optional(),
    en_standard: nullableText.optional(),
    features: z.array(z.string()).nullable().optional(),
    applications: z.array(z.string()).nullable().optional(),
    industries: z.array(z.string()).nullable().optional(),
    image_url: nullableText.optional(),
    image2_url: nullableText.optional(),
    image3_url: nullableText.optional(),
    image4_url: nullableText.optional(),
    image5_url: nullableText.optional(),
    additional_images: z.array(z.string()).nullable().optional(),
    technical_sheet_url: nullableText.optional(),
    declaration_sheet_url: nullableText.optional(),
    ukca_declaration_url: nullableText.optional(),
    technical_sheet_url_it: nullableText.optional(),
    declaration_sheet_url_it: nullableText.optional(),
    declaration_docs_locales: z.array(z.any()).nullable().optional(),
    manufacturers_instruction_url: nullableText.optional(),
    manufacturers_instruction_url_it: nullableText.optional(),
    technical_sheet_locales: jsonValue.optional(),
    manufacturers_instruction_locales: jsonValue.optional(),
    is_featured: z.boolean().optional(),
    out_of_stock: z.boolean().optional(),
    order_priority: nullableNumber.optional(),
    related_product_id_1: nullableText.optional(),
    related_product_id_2: nullableText.optional(),
    related_product_id_3: nullableText.optional(),
    related_product_id_4: nullableText.optional(),
    brands: z.array(z.string()).nullable().optional(),
    tags_locales: jsonValue.optional(),
    size_locales: jsonValue.optional(),
    length_cm: nullableNumber.optional(),
    ce_category: nullableText.optional(),
    published: z.boolean().optional(),
    coming_soon: z.boolean().optional(),
    availability_status: nullableText.optional(),
    safety: jsonValue.optional(),
    environment_pictograms: jsonValue.optional(),
    pad_size_json: jsonValue.optional(),
    name_locales: jsonValue.optional(),
    description_locales: jsonValue.optional(),
    short_description_locales: jsonValue.optional(),
    category_locales: jsonValue.optional(),
    sub_category_locales: jsonValue.optional(),
    features_locales: jsonValue.optional(),
    applications_locales: jsonValue.optional(),
    industries_locales: jsonValue.optional(),
    materials_locales: jsonValue.optional(),
    protection_class: nullableText.optional(),
    npf: nullableText.optional(),
    connections: z.array(z.string()).nullable().optional(),
    compatible_with: z.array(z.string()).nullable().optional(),
    filter_type: nullableText.optional(),
    protection_codes: z.array(z.string()).nullable().optional(),
    ean: nullableText.optional(),
    respiratory_standards: jsonValue.optional(),
    arm_attributes: jsonValue.optional(),
    hearing_standards: jsonValue.optional(),
    hearing_attributes: jsonValue.optional(),
    footwear_standards: jsonValue.optional(),
    footwear_attributes: jsonValue.optional(),
    eye_face_standards: jsonValue.optional(),
    eye_face_attributes: jsonValue.optional(),
    eye_face_attributes_locales: jsonValue.optional(),
    eye_face_comfort_features_locales: jsonValue.optional(),
    eye_face_equipment_locales: jsonValue.optional(),
    head_comfort_features_locales: jsonValue.optional(),
    head_other_details_locales: jsonValue.optional(),
    head_equipment_locales: jsonValue.optional(),
    hearing_comfort_features_locales: jsonValue.optional(),
    hearing_other_details_locales: jsonValue.optional(),
    hearing_equipment_locales: jsonValue.optional(),
    respiratory_comfort_features_locales: jsonValue.optional(),
    respiratory_other_details_locales: jsonValue.optional(),
    respiratory_equipment_locales: jsonValue.optional(),
    clothing_comfort_features_locales: jsonValue.optional(),
    clothing_other_details_locales: jsonValue.optional(),
    head_standards: jsonValue.optional(),
    head_attributes: jsonValue.optional(),
    clothing_standards: jsonValue.optional(),
    clothing_attributes: jsonValue.optional(),
    clothing_type: nullableText.optional(),
    clothing_category: nullableText.optional(),
    coatings_locales: jsonValue.optional(),
    eye_face_materials_locales: jsonValue.optional(),
    footwear_materials_locales: jsonValue.optional(),
    footwear_comfort_features_locales: jsonValue.optional(),
    footwear_special_features_locales: jsonValue.optional(),
    head_tech_specs_locales: jsonValue.optional(),
    clothing_attributes_locales: jsonValue.optional(),
    connections_locales: jsonValue.optional(),
    compatible_with_locales: jsonValue.optional(),
  })
  .strict();

export const productWriteSchema = z.preprocess(omitProductSystemColumns, productWriteObject);

export const productIdSchema = z.string().uuid();

export const productToggleSchema = z
  .object({
    field: z.enum(["is_featured", "out_of_stock"]),
  })
  .strict();

export const productNameQuerySchema = z.string().trim().min(1).max(300);

export type ProductActionResult =
  | { ok: true; product: Product }
  | { ok: false; status: number; error: string };

export async function insertProduct(input: z.infer<typeof productWriteObject>): Promise<ProductActionResult> {
  if (typeof input.name !== "string" || !input.name.trim()) {
    return { ok: false, status: 400, error: "INVALID_BODY" };
  }

  const providedSlug = typeof input.slug === "string" ? input.slug.trim() : "";
  const slug = providedSlug || (await generateUniqueProductSlug(supabaseAdmin, input.name.trim()));

  const { data, error } = await supabaseAdmin
    .from("products")
    .insert([{ ...input, slug }])
    .select("*")
    .single();

  if (error) {
    throw error;
  }

  return { ok: true, product: data as Product };
}

export async function getProductRecord(id: string): Promise<ProductActionResult> {
  const { data, error } = await supabaseAdmin.from("products").select("*").eq("id", id).maybeSingle();

  if (error) {
    throw error;
  }

  if (!data) {
    return { ok: false, status: 404, error: "NOT_FOUND" };
  }

  return { ok: true, product: data as Product };
}

export async function updateProductRecord(
  id: string,
  input: z.infer<typeof productWriteObject>
): Promise<ProductActionResult> {
  const { data, error } = await supabaseAdmin
    .from("products")
    .update({ ...input, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select("*")
    .maybeSingle();

  if (error) {
    throw error;
  }

  if (!data) {
    return { ok: false, status: 404, error: "NOT_FOUND" };
  }

  return { ok: true, product: data as Product };
}

export async function deleteProductRecord(id: string): Promise<ProductActionResult> {
  const { data, error } = await supabaseAdmin.from("products").delete().eq("id", id).select("*").maybeSingle();

  if (error) {
    throw error;
  }

  if (!data) {
    return { ok: false, status: 404, error: "NOT_FOUND" };
  }

  return { ok: true, product: data as Product };
}

export async function toggleProductField(
  id: string,
  field: z.infer<typeof productToggleSchema>["field"]
): Promise<ProductActionResult> {
  const { data: current, error: readError } = await supabaseAdmin
    .from("products")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (readError) {
    throw readError;
  }

  if (!current) {
    return { ok: false, status: 404, error: "NOT_FOUND" };
  }

  const nextValue = !Boolean(current[field]);
  const { data, error } = await supabaseAdmin
    .from("products")
    .update({ [field]: nextValue })
    .eq("id", id)
    .select("*")
    .maybeSingle();

  if (error) {
    throw error;
  }

  if (!data) {
    return { ok: false, status: 404, error: "NOT_FOUND" };
  }

  return { ok: true, product: data as Product };
}

export async function isProductNameTaken(name: string): Promise<boolean> {
  const { data, error } = await supabaseAdmin
    .from("products")
    .select("id")
    .eq("name", name)
    .limit(1)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return Boolean(data);
}
