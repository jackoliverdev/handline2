"use client";

import { adminFetch } from "@/lib/admin-api";
import type { PPECategoryRecord, PPESectionRecord } from "@/lib/ppe-standards/types";

export interface PpeLibraryIconInput {
  sectionId: string;
  standard_name: string;
  image_url: string;
}

export interface PpeSectionInput {
  id: string;
  category_id: string;
  slug: string;
  code: string | null;
  title_locales: Record<string, string>;
  intro_locales: Record<string, string>;
  bullets_locales: Record<string, string[]> | string[];
  image_url: string | null;
  icon_url: string | null;
  standard_icon_id: string | null;
  related_product_captions: Record<string, Record<string, string>>;
  related_product_ids: string[];
  sort_order: number;
  published: boolean;
  extra_images?: { url: string; caption_locales?: Record<string, string> }[];
}

export interface PpeCategoryCreateInput {
  id: string;
  slug: string;
  title_locales: Record<string, string>;
  summary_locales: Record<string, string>;
  hero_image_url: string | null;
  card_image_url: string | null;
  hero_focus_y: number;
  sort_order: number;
}

export interface PpeCategoryUpdateInput {
  title_locales: Record<string, string>;
  summary_locales: Record<string, string>;
  hero_image_url: string | null;
  card_image_url: string | null;
  hero_focus_y: number;
  sort_order: number;
}

export async function createPpeCategory(payload: {
  category: PpeCategoryCreateInput;
  sections: PpeSectionInput[];
  libraryIcons: PpeLibraryIconInput[];
}): Promise<PPECategoryRecord> {
  const result = await adminFetch<{ category: PPECategoryRecord }>("/api/admin/ppe-categories", {
    method: "POST",
    body: JSON.stringify(payload),
  });
  return result.category;
}

export async function getAdminPpeCategory(id: string): Promise<{ category: PPECategoryRecord; sections: PPESectionRecord[] }> {
  return adminFetch<{ category: PPECategoryRecord; sections: PPESectionRecord[] }>(`/api/admin/ppe-categories/${id}`);
}

export async function updatePpeCategory(
  id: string,
  payload: {
    category: PpeCategoryUpdateInput;
    sections: PpeSectionInput[];
    libraryIcons: PpeLibraryIconInput[];
  }
): Promise<{ category: PPECategoryRecord; sections: PPESectionRecord[] }> {
  return adminFetch<{ category: PPECategoryRecord; sections: PPESectionRecord[] }>(`/api/admin/ppe-categories/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}

export async function deletePpeCategory(id: string): Promise<void> {
  await adminFetch<{ ok: true }>(`/api/admin/ppe-categories/${id}`, { method: "DELETE" });
}
