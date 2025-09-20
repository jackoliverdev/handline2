import type { Language } from '@/lib/context/language-context';

export interface PPECategoryRecord {
  id: string;
  slug: string;
  title_locales: Record<string, string>;
  summary_locales: Record<string, string>;
  hero_image_url?: string | null;
  card_image_url?: string | null;
  hero_focus_y?: number | null; // 0-100 percentage for vertical focus
  sort_order: number;
  published: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface PPESectionRecord {
  id: string;
  category_id: string;
  slug: string;
  code?: string | null;
  title_locales: Record<string, string>;
  intro_locales: Record<string, string>;
  bullets_locales: Record<string, string[]> | string[]; // tolerate array-only legacy
  image_url?: string | null;
  related_product_ids: string[];
  sort_order: number;
  published: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface PPECategory {
  id: string;
  slug: string;
  title: string;
  summary: string;
  heroImageUrl?: string | null;
  cardImageUrl?: string | null;
  heroFocusY?: number | null;
  sortOrder: number;
  // raw locales for client-side re-localisation
  titleLocales?: Record<string, string>;
  summaryLocales?: Record<string, string>;
}

export interface PPESection {
  id: string;
  categoryId: string;
  slug: string;
  code?: string | null;
  title: string;
  intro: string;
  bullets: string[];
  imageUrl?: string | null;
  relatedProductIds: string[];
  sortOrder: number;
  // raw locales for client-side re-localisation
  titleLocales?: Record<string, string>;
  introLocales?: Record<string, string>;
  bulletsLocales?: Record<string, string[]> | string[];
}

export interface PPESectionDetail extends PPESection {
  category: PPECategory;
}

export type PPELanguage = Language;


