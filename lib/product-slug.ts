import { supabase } from "@/lib/supabase";

export function createProductSlugBase(name: string): string {
  const slug = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return slug || "product";
}

export async function generateUniqueProductSlug(name: string): Promise<string> {
  const baseSlug = createProductSlugBase(name);
  const { data, error } = await supabase
    .from("products")
    .select("slug")
    .like("slug", `${baseSlug}%`);

  if (error) {
    throw new Error(`Unable to generate product URL: ${error.message}`);
  }

  const existingSlugs = new Set(
    (data || [])
      .map((product) => product.slug)
      .filter((slug): slug is string => typeof slug === "string")
  );

  let slug = baseSlug;
  let duplicateNumber = 2;
  while (existingSlugs.has(slug)) {
    slug = `${baseSlug}-${duplicateNumber}`;
    duplicateNumber += 1;
  }

  return slug;
}
