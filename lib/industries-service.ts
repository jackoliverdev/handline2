import { supabase } from './supabase';
import { v4 as uuidv4 } from 'uuid';
import type { Language } from './context/language-context';

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
  showcase_description?: string;
  // Locale fields
  industry_name_locales?: Record<string, string>;
  description_locales?: Record<string, string>;
  content_locales?: Record<string, string>;
  features_locales?: Record<string, string[]>;
  showcase_description_locales?: Record<string, string>;
  features?: string[];
}

export function localiseIndustry(industry: Industry, language: Language): Industry {
  return {
    ...industry,
    industry_name: industry.industry_name_locales?.[language] || industry.industry_name_locales?.en || industry.industry_name,
    description: industry.description_locales?.[language] || industry.description_locales?.en || industry.description,
    content: industry.content_locales?.[language] || industry.content_locales?.en || industry.content,
    showcase_description: industry.showcase_description_locales?.[language] || industry.showcase_description_locales?.en || industry.showcase_description,
    features: industry.features_locales?.[language] || industry.features_locales?.en || [],
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
      slug: createSlug(industry.industry_name)
    }, language));
    
    return { data: industriesWithSlugs, count };
  } catch (error) {
    console.error('Error in getAllIndustries:', error);
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
    const industry = data.find(ind => createSlug(ind.industry_name) === slug);
    
    if (!industry) return null;
    
    // Add slug to the returned object and localise
    return localiseIndustry({
      ...industry,
      slug: createSlug(industry.industry_name)
    }, language);
  } catch (error) {
    console.error('Error getting industry by slug:', error);
    throw error;
  }
}

/**
 * Create a new industry
 */
export async function createIndustry(industryData: Omit<Industry, 'id' | 'created_at' | 'updated_at'>) {
  try {
    // Generate a unique ID
    const newIndustry = {
      ...industryData,
      id: uuidv4()
    };
    
    const { data, error } = await supabase
      .from('industry_solutions')
      .insert([newIndustry])
      .select()
      .single();
    
    if (error) {
      console.error('Error creating industry:', error);
      throw error;
    }
    
    return data;
  } catch (error) {
    console.error('Error in createIndustry:', error);
    throw error;
  }
}

/**
 * Update an industry
 */
export async function updateIndustry(id: string, updates: Partial<Industry>) {
  try {
    const { data, error } = await supabase
      .from('industry_solutions')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      console.error('Error updating industry:', error);
      throw error;
    }
    
    return data;
  } catch (error) {
    console.error('Error in updateIndustry:', error);
    throw error;
  }
}

/**
 * Delete an industry
 */
export async function deleteIndustry(id: string) {
  try {
    const { error } = await supabase
      .from('industry_solutions')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error('Error deleting industry:', error);
      throw error;
    }
    
    return true;
  } catch (error) {
    console.error('Error in deleteIndustry:', error);
    throw error;
  }
}

/**
 * Upload an industry image to Supabase storage
 */
export async function uploadIndustryImage(industryId: string, file: File): Promise<{ url: string | null }> {
  try {
    if (!industryId) {
      throw new Error("Industry ID is required for image upload");
    }

    console.log("Uploading industry image:", file.name, "type:", file.type, "size:", file.size);
    
    // Create file path
    const fileExt = file.name.split('.').pop();
    const fileName = `${industryId}/${Date.now()}.${fileExt}`;
    
    console.log("Uploading to:", fileName);
    
    // Upload to storage - use the existing "industries" bucket
    const { data, error } = await supabase.storage
      .from('industries')
      .upload(fileName, file);
      
    if (error) {
      console.error("Error uploading industry image:", error);
      return { url: null };
    }
    
    console.log("Image uploaded successfully:", data);
    
    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('industries')
      .getPublicUrl(fileName);
      
    console.log("Image public URL:", publicUrl);
    
    return { url: publicUrl };
  } catch (error) {
    console.error('Error uploading industry image:', error);
    return { url: null };
  }
}

/**
 * Get related products for an industry
 */
export async function getRelatedProducts(productIds: string[]) {
  if (!productIds || productIds.length === 0) return [];
  
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .in('id', productIds);
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error getting related products:', error);
    return [];
  }
}

/**
 * Create a URL-friendly slug from a name
 */
function createSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^\w\s]/g, '') // Remove non-word chars
    .replace(/\s+/g, '-')    // Replace spaces with hyphens
    .replace(/--+/g, '-')    // Replace multiple hyphens with single hyphen
    .trim();
} 