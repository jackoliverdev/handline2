import { supabase } from '@/lib/supabase';
import type { PPECategory, PPECategoryRecord, PPESection, PPESectionDetail, PPESectionRecord, PPELanguage } from './types';

function resolveLocale<T extends Record<string, any>>(locales: T | undefined, lang: PPELanguage, fallback?: string): string {
  if (!locales || typeof locales !== 'object') return fallback || '';
  return locales[lang] || locales['en'] || fallback || '';
}

function resolveBullets(input: Record<string, string[]> | string[] | undefined, lang: PPELanguage): string[] {
  if (!input) return [];
  if (Array.isArray(input)) return input.filter(Boolean);
  const arr = input[lang] || input['en'] || [];
  return Array.isArray(arr) ? arr.filter(Boolean) : [];
}

function mapCategory(rec: PPECategoryRecord, lang: PPELanguage): PPECategory {
  return {
    id: rec.id,
    slug: rec.slug,
    title: resolveLocale(rec.title_locales, lang, rec.slug),
    summary: resolveLocale(rec.summary_locales, lang, ''),
    heroImageUrl: rec.hero_image_url || null,
    cardImageUrl: (rec as any).card_image_url || rec.hero_image_url || null,
    heroFocusY: (rec as any).hero_focus_y ?? null,
    sortOrder: rec.sort_order ?? 0,
    titleLocales: rec.title_locales,
    summaryLocales: rec.summary_locales,
  };
}

function mapSection(rec: PPESectionRecord, category: PPECategory, lang: PPELanguage): PPESectionDetail {
  return {
    id: rec.id,
    categoryId: rec.category_id,
    slug: rec.slug,
    code: rec.code || null,
    title: resolveLocale(rec.title_locales, lang, rec.slug),
    intro: resolveLocale(rec.intro_locales, lang, ''),
    bullets: resolveBullets(rec.bullets_locales as any, lang),
    imageUrl: rec.image_url || null,
    relatedProductIds: Array.isArray(rec.related_product_ids) ? rec.related_product_ids : [],
    sortOrder: rec.sort_order ?? 0,
    titleLocales: rec.title_locales,
    introLocales: rec.intro_locales,
    bulletsLocales: rec.bullets_locales,
    category,
  };
}

export interface PPEStandardsService {
  getCategories(lang: PPELanguage): Promise<PPECategory[]>;
  getCategory(slug: string, lang: PPELanguage): Promise<PPECategory | null>;
  getSectionsByCategory(slug: string, lang: PPELanguage): Promise<PPESection[]>;
  getSection(categorySlug: string, sectionSlug: string, lang: PPELanguage): Promise<PPESectionDetail | null>;
}

class SupabasePPEService implements PPEStandardsService {
  async getCategories(lang: PPELanguage): Promise<PPECategory[]> {
    const { data, error } = await supabase
      .from('ppe_categories')
      .select('*')
      .eq('published', true)
      .order('sort_order', { ascending: true });
    if (error || !data) return [];
    return (data as PPECategoryRecord[]).map((r) => mapCategory(r, lang));
  }

  async getCategory(slug: string, lang: PPELanguage): Promise<PPECategory | null> {
    const { data, error } = await supabase
      .from('ppe_categories')
      .select('*')
      .eq('slug', slug)
      .eq('published', true)
      .single();
    if (error || !data) return null;
    return mapCategory(data as PPECategoryRecord, lang);
  }

  async getSectionsByCategory(slug: string, lang: PPELanguage): Promise<PPESection[]> {
    const category = await this.getCategory(slug, lang);
    if (!category) return [];
    const { data, error } = await supabase
      .from('ppe_sections')
      .select('*')
      .eq('category_id', category.id)
      .eq('published', true)
      .order('sort_order', { ascending: true });
    if (error || !data) return [];
    return (data as PPESectionRecord[]).map((r) => mapSection(r, category, lang));
  }

  async getSection(categorySlug: string, sectionSlug: string, lang: PPELanguage): Promise<PPESectionDetail | null> {
    const category = await this.getCategory(categorySlug, lang);
    if (!category) return null;
    const { data, error } = await supabase
      .from('ppe_sections')
      .select('*')
      .eq('category_id', category.id)
      .eq('slug', sectionSlug)
      .eq('published', true)
      .single();
    if (error || !data) return null;
    return mapSection(data as PPESectionRecord, category, lang);
  }
}

let singleton: PPEStandardsService | null = null;

export function getService(): PPEStandardsService {
  if (!singleton) singleton = new SupabasePPEService();
  return singleton;
}


