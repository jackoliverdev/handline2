import { supabase } from './supabase';
import { v4 as uuidv4 } from 'uuid';
import type { Language } from './context/language-context';

export interface EnStandard {
  id?: number;
  title: string;
  slug: string;
  summary: string;
  content: string;
  image_url: string | null;
  category: string;
  standard_code: string;
  downloads: DownloadItem[];
  tags: string[];
  featured: boolean;
  published: boolean;
  published_at?: string;
  created_at?: string;
  updated_at?: string;
  title_locales?: { [lang: string]: string };
  summary_locales?: { [lang: string]: string };
  content_locales?: { [lang: string]: string };
  category_locales?: { [lang: string]: string };
  tags_locales?: { [lang: string]: string[] };
}

export interface DownloadItem {
  title: string;
  title_locales?: { [lang: string]: string };
  url: string;
  type: string;
}

/**
 * Get all EN standards with optional filtering
 */
export async function getAllEnStandards(options: {
  published?: boolean;
  featured?: boolean;
  category?: string;
  tags?: string[];
  limit?: number;
  offset?: number;
} = {}) {
  try {
    let query = supabase
      .from('en_resources')
      .select('*')
      .order('standard_code', { ascending: true });
    
    // Apply filters if provided
    if (options.published !== undefined) {
      query = query.eq('published', options.published);
    }
    
    if (options.featured !== undefined) {
      query = query.eq('featured', options.featured);
    }
    
    if (options.category) {
      query = query.eq('category', options.category);
    }
    
    if (options.tags && options.tags.length > 0) {
      query = query.contains('tags', options.tags);
    }
    
    // Apply pagination
    if (options.limit) {
      query = query.limit(options.limit);
    }
    
    if (options.offset) {
      query = query.range(options.offset, options.offset + (options.limit || 10) - 1);
    }
    
    const { data, error, count } = await query;
    
    if (error) {
      console.error('Error fetching EN standards:', error);
      throw error;
    }
    
    return { data, count };
  } catch (error) {
    console.error('Error in getAllEnStandards:', error);
    throw error;
  }
}

/**
 * Get all categories from EN standards
 */
export async function getAllEnCategories(language: Language = 'en') {
  try {
    const { data, error } = await supabase
      .from('en_resources')
      .select('category, category_locales')
      .order('category', { ascending: true });
    
    if (error) {
      console.error('Error fetching EN categories:', error);
      throw error;
    }
    
    // Extract unique categories
    const categoryMap = new Map();
    data.forEach(item => {
      const categoryName = item.category_locales?.[language] || item.category;
      categoryMap.set(item.category, categoryName);
    });
    
    // Convert map to array of objects
    const categories = Array.from(categoryMap).map(([key, value]) => ({
      key,
      name: value
    }));
    
    return categories;
  } catch (error) {
    console.error('Error in getAllEnCategories:', error);
    throw error;
  }
}

/**
 * Get an EN standard by ID
 */
export async function getEnStandardById(id: number) {
  try {
    const { data, error } = await supabase
      .from('en_resources')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error getting EN standard:', error);
    throw error;
  }
}

/**
 * Get an EN standard by slug
 */
export async function getEnStandardBySlug(slug: string, language: Language = 'en') {
  try {
    const { data, error } = await supabase
      .from('en_resources')
      .select('*')
      .eq('slug', slug)
      .single();
    if (error) throw error;
    return localiseEnStandard(data, language);
  } catch (error) {
    console.error('Error getting EN standard by slug:', error);
    throw error;
  }
}

/**
 * Get EN standards by category
 */
export async function getEnStandardsByCategory(category: string, language: Language = 'en') {
  try {
    const { data, error } = await supabase
      .from('en_resources')
      .select('*')
      .eq('category', category)
      .eq('published', true)
      .order('standard_code', { ascending: true });
    
    if (error) throw error;
    return (data || []).map(standard => localiseEnStandard(standard, language));
  } catch (error) {
    console.error('Error getting EN standards by category:', error);
    throw error;
  }
}

/**
 * Create a new EN standard
 */
export async function createEnStandard(standardData: Omit<EnStandard, 'id' | 'created_at' | 'updated_at'>) {
  try {
    // Generate slug if not provided
    const newStandard = {
      ...standardData,
      slug: standardData.slug || createSlug(standardData.title)
    };
    
    const { data, error } = await supabase
      .from('en_resources')
      .insert([newStandard])
      .select()
      .single();
    
    if (error) {
      console.error('Error creating EN standard:', error);
      throw error;
    }
    
    return data;
  } catch (error) {
    console.error('Error in createEnStandard:', error);
    throw error;
  }
}

/**
 * Update an EN standard
 */
export async function updateEnStandard(id: number, updates: Partial<EnStandard>) {
  try {
    // If title is updated and slug isn't provided, update the slug too
    if (updates.title && !updates.slug) {
      updates.slug = createSlug(updates.title);
    }
    
    const { data, error } = await supabase
      .from('en_resources')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      console.error('Error updating EN standard:', error);
      throw error;
    }
    
    return data;
  } catch (error) {
    console.error('Error in updateEnStandard:', error);
    throw error;
  }
}

/**
 * Delete an EN standard
 */
export async function deleteEnStandard(id: number) {
  try {
    const { error } = await supabase
      .from('en_resources')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error('Error deleting EN standard:', error);
      throw error;
    }
    
    return true;
  } catch (error) {
    console.error('Error in deleteEnStandard:', error);
    throw error;
  }
}

/**
 * Toggle the published status of an EN standard
 */
export async function toggleEnStandardPublished(id: number) {
  try {
    // First get the current status
    const { data: standard, error: fetchError } = await supabase
      .from('en_resources')
      .select('published')
      .eq('id', id)
      .single();
    
    if (fetchError) throw fetchError;
    
    // Then toggle it
    const { data, error } = await supabase
      .from('en_resources')
      .update({ published: !standard.published })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    
    return data;
  } catch (error) {
    console.error('Error toggling EN standard published status:', error);
    throw error;
  }
}

/**
 * Get related EN standards by category and tags
 */
export async function getRelatedEnStandards(excludeId: number, category: string, tags: string[], limit: number = 3, language: Language = 'en') {
  try {
    const { data, error } = await supabase
      .from('en_resources')
      .select('*')
      .eq('published', true)
      .eq('category', category)
      .not('id', 'eq', excludeId)
      .limit(limit);
    if (error) throw error;
    return (data || []).map(standard => localiseEnStandard(standard, language));
  } catch (error) {
    console.error('Error getting related EN standards:', error);
    throw error;
  }
}

/**
 * Upload an EN standard image to Supabase storage
 */
export async function uploadEnStandardImage(standardId: number, file: File): Promise<{ url: string | null }> {
  try {
    if (!standardId) {
      throw new Error("Standard ID is required for image upload");
    }

    console.log("Uploading EN standard image:", file.name, "type:", file.type, "size:", file.size);
    
    // Create file path
    const fileExt = file.name.split('.').pop();
    const fileName = `${standardId}/${Date.now()}.${fileExt}`;
    
    console.log("Uploading to:", fileName);
    
    // Upload to storage
    const { data, error } = await supabase.storage
      .from('en-standard-images')
      .upload(fileName, file);
      
    if (error) {
      console.error("Error uploading EN standard image:", error);
      return { url: null };
    }
    
    console.log("Image uploaded successfully:", data);
    
    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('en-standard-images')
      .getPublicUrl(fileName);
      
    console.log("Image public URL:", publicUrl);
    
    return { url: publicUrl };
  } catch (error) {
    console.error('Error uploading EN standard image:', error);
    return { url: null };
  }
}

/**
 * Create a URL-friendly slug from a title
 */
function createSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s]/g, '') // Remove non-word chars
    .replace(/\s+/g, '-')    // Replace spaces with hyphens
    .replace(/--+/g, '-')    // Replace multiple hyphens with single hyphen
    .trim();
}

/**
 * Get all published EN standards
 */
export async function getPublishedEnStandards(language: Language = 'en') {
  try {
    const { data } = await getAllEnStandards({ published: true });
    
    // Apply localisation to each standard
    return (data || []).map(standard => localiseEnStandard(standard, language));
  } catch (error) {
    console.error('Error getting published EN standards:', error);
    return [];
  }
}

/**
 * Apply localization to an EN standard object
 */
export function localiseEnStandard(standard: EnStandard, language: Language): EnStandard {
  const result = {
    ...standard,
    title: standard.title_locales?.[language] || standard.title_locales?.en || standard.title,
    summary: standard.summary_locales?.[language] || standard.summary_locales?.en || standard.summary,
    content: standard.content_locales?.[language] || standard.content_locales?.en || standard.content,
    category: standard.category_locales?.[language] || standard.category_locales?.en || standard.category,
    tags: standard.tags_locales?.[language] || standard.tags_locales?.en || standard.tags || [],
  };

  // Apply localization to download titles if available
  if (standard.downloads && Array.isArray(standard.downloads)) {
    result.downloads = standard.downloads.map(download => ({
      ...download,
      title: download.title_locales?.[language] || download.title_locales?.en || download.title
    }));
  }

  return result;
} 