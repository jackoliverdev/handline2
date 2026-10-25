import { supabase } from './supabase';
import type { Language } from './context/language-context';
import { createIndustrySlug } from './industry-slug';

// New interfaces for the structured content
export interface IndustrySection {
  title: string;
  description: string;
  key_hazards: string[];
  ppe_solutions: string[];
}

export interface IndustrySummaryContent {
  summary: string;
  sections: IndustrySection[];
}

export interface Industry {
  id: string;
  industry_name: string;
  description: string;
  content: string | null;
  image_url: string | null;
  feature_image_url: string | null;
  related_products: string[] | null;
  created_at?: string;
  updated_at?: string;
  slug?: string; // Derived from industry_name
  is_featured?: boolean;
  position?: number | null;
  showcase_description?: string;
  // Locale fields
  industry_name_locales?: Record<string, string>;
  description_locales?: Record<string, string>;
  content_locales?: Record<string, string>;
  features_locales?: Record<string, string[]>;
  showcase_description_locales?: Record<string, string>;
  features?: string[];
  // New structured content fields
  summary_content_locales?: Record<string, string>;
  summary_content_image_url?: string | null;
  sections_locales?: Record<string, IndustrySection[]>;
  // Computed fields after localisation
  summary_content?: string;
  sections?: IndustrySection[];
  // New related product ID fields (same as products table) - expanded to 10
  related_product_id_1?: string | null;
  related_product_id_2?: string | null;
  related_product_id_3?: string | null;
  related_product_id_4?: string | null;
  related_product_id_5?: string | null;
  related_product_id_6?: string | null;
  related_product_id_7?: string | null;
  related_product_id_8?: string | null;
  related_product_id_9?: string | null;
  related_product_id_10?: string | null;
}

export function localiseIndustry(industry: Industry, language: Language): Industry {
  const localisedSummaryContent = industry.summary_content_locales?.[language] || industry.summary_content_locales?.en;
  const localisedSections = industry.sections_locales?.[language] || industry.sections_locales?.en || [];

  return {
    ...industry,
    industry_name: industry.industry_name_locales?.[language] || industry.industry_name_locales?.en || industry.industry_name,
    description: industry.description_locales?.[language] || industry.description_locales?.en || industry.description,
    content: industry.content_locales?.[language] || industry.content_locales?.en || industry.content,
    showcase_description: industry.showcase_description_locales?.[language] || industry.showcase_description_locales?.en || industry.showcase_description,
    features: industry.features_locales?.[language] || industry.features_locales?.en || [],
    summary_content: localisedSummaryContent,
    sections: localisedSections,
  };
}

/**
 * Get all industries
 */
export async function getAllIndustries(language: Language) {
  try {
    const { data, error, count } = await supabase
      .from('industry_solutions')
      .select('*')
      .order('position', { ascending: true })
      .order('industry_name', { ascending: true });
    
    if (error) {
      console.error('Error fetching industries:', error);
      throw error;
    }
    
    // Transform data to include slugs and localise content
    const industriesWithSlugs = data.map(industry => localiseIndustry({
      ...industry,
      slug: createIndustrySlug(industry.industry_name)
    }, language));
    
    return { data: industriesWithSlugs, count };
  } catch (error) {
    console.error('Error in getAllIndustries:', error);
    throw error;
  }
}

/**
 * Get featured industries for homepage (ordered by position)
 */
export async function getFeaturedIndustries(language: Language) {
  try {
    const { data, error } = await supabase
      .from('industry_solutions')
      .select('*')
      .eq('is_featured', true)
      .order('position', { ascending: true })
      .limit(4);
    
    if (error) {
      console.error('Error fetching featured industries:', error);
      throw error;
    }
    
    // Transform data to include slugs and localise content
    const industriesWithSlugs = data.map(industry => localiseIndustry({
      ...industry,
      slug: createIndustrySlug(industry.industry_name)
    }, language));
    
    return { data: industriesWithSlugs };
  } catch (error) {
    console.error('Error in getFeaturedIndustries:', error);
    throw error;
  }
}

/**
 * Get an industry by ID
 */
export async function getIndustryById(id: string, language: Language) {
  try {
    const { data, error } = await supabase
      .from('industry_solutions')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return localiseIndustry(data, language);
  } catch (error) {
    console.error('Error getting industry by ID:', error);
    throw error;
  }
}

/**
 * Get an industry by slug
 */
export async function getIndustryBySlug(slug: string, language: Language) {
  try {
    // First fetch all industries
    const { data, error } = await supabase
      .from('industry_solutions')
      .select('*');
    
    if (error) throw error;
    
    // Then find the one with matching slug (since slug is derived, not stored)
    const industry = data.find(ind => createIndustrySlug(ind.industry_name) === slug);
    
    if (!industry) return null;
    
    // Add slug to the returned object and localise
    return localiseIndustry({
      ...industry,
      slug: createIndustrySlug(industry.industry_name)
    }, language);
  } catch (error) {
    console.error('Error getting industry by slug:', error);
    throw error;
  }
}

/**
 * Get related products for an industry using individual product IDs
 */
export async function getRelatedProductsByIds(industry: Industry) {
  const productIds = [
    industry.related_product_id_1,
    industry.related_product_id_2, 
    industry.related_product_id_3,
    industry.related_product_id_4,
    industry.related_product_id_5,
    industry.related_product_id_6,
    industry.related_product_id_7,
    industry.related_product_id_8,
    industry.related_product_id_9,
    industry.related_product_id_10
  ].filter(Boolean) as string[];

  if (productIds.length === 0) return [];
  
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .in('id', productIds)
      .eq('published', true);
    
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error getting related products by IDs:', error);
    return [];
  }
}

/**
 * Get related products for an industry (legacy method using array)
 */
export async function getRelatedProducts(productIds: string[]) {
  if (!productIds || productIds.length === 0) return [];
  
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .in('id', productIds)
      .eq('published', true);
    
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error getting related products:', error);
    return [];
  }
} 