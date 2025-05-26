import { supabase } from './supabase';
import { v4 as uuidv4 } from 'uuid';
import type { Language } from './context/language-context';

export interface CaseStudy {
  id?: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  author: string;
  image_url: string | null;
  featured_image_url?: string | null;
  tags: string[];
  published_at?: string;
  is_published?: boolean;
  created_at?: string;
  updated_at?: string;
  title_locales?: { [lang: string]: string };
  summary_locales?: { [lang: string]: string };
  content_locales?: { [lang: string]: string };
  tags_locales?: { [lang: string]: string[] };
  client_name?: string;
  industry?: string;
  challenge?: string;
  solution?: string;
  results?: string;
  client_logo_url?: string;
  client_name_locales?: { [lang: string]: string };
  industry_locales?: { [lang: string]: string };
  challenge_locales?: { [lang: string]: string };
  solution_locales?: { [lang: string]: string };
  results_locales?: { [lang: string]: string };
  testimonial?: string;
  testimonial_author?: string;
  testimonial_position?: string;
  metrics?: any;
  testimonial_locales?: { [lang: string]: string };
  testimonial_author_locales?: { [lang: string]: string };
  testimonial_position_locales?: { [lang: string]: string };
  metrics_locales?: { [lang: string]: any };
  showcase_title?: string;
  showcase_description?: string;
  showcase_title_locales?: { [lang: string]: string };
  showcase_description_locales?: { [lang: string]: string };
}

/**
 * Get all case studies with optional filtering
 */
export async function getAllCaseStudies(options: {
  published?: boolean;
  featured?: boolean;
  tags?: string[];
  industry?: string;
  limit?: number;
  offset?: number;
} = {}) {
  try {
    let query = supabase
      .from('case_studies')
      .select('*')
      .order('published_at', { ascending: false });
    
    // Apply filters if provided
    if (options.published !== undefined) {
      query = query.eq('is_published', options.published);
    }
    
    if (options.tags && options.tags.length > 0) {
      query = query.contains('tags', options.tags);
    }
    
    if (options.industry) {
      query = query.eq('industry', options.industry);
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
      console.error('Error fetching case studies:', error);
      throw error;
    }
    
    return { data, count };
  } catch (error) {
    console.error('Error in getAllCaseStudies:', error);
    throw error;
  }
}

/**
 * Get a case study by ID
 */
export async function getCaseStudyById(id: string) {
  try {
    const { data, error } = await supabase
      .from('case_studies')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error getting case study:', error);
    throw error;
  }
}

/**
 * Get a case study by slug
 */
export async function getCaseStudyBySlug(slug: string, language: Language = 'en') {
  try {
    const { data, error } = await supabase
      .from('case_studies')
      .select('*')
      .eq('slug', slug)
      .single();
    if (error) throw error;
    return localiseCaseStudy(data, language);
  } catch (error) {
    console.error('Error getting case study by slug:', error);
    throw error;
  }
}

/**
 * Create a new case study
 */
export async function createCaseStudy(caseStudyData: Omit<CaseStudy, 'id' | 'created_at' | 'updated_at'>) {
  try {
    // Generate a unique ID
    const newCaseStudy = {
      ...caseStudyData,
      id: uuidv4(),
      slug: caseStudyData.slug || createSlug(caseStudyData.title)
    };
    
    const { data, error } = await supabase
      .from('case_studies')
      .insert([newCaseStudy])
      .select()
      .single();
    
    if (error) {
      console.error('Error creating case study:', error);
      throw error;
    }
    
    return data;
  } catch (error) {
    console.error('Error in createCaseStudy:', error);
    throw error;
  }
}

/**
 * Update a case study
 */
export async function updateCaseStudy(id: string, updates: Partial<CaseStudy>) {
  try {
    // If title is updated and slug isn't provided, update the slug too
    if (updates.title && !updates.slug) {
      updates.slug = createSlug(updates.title);
    }
    
    const { data, error } = await supabase
      .from('case_studies')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      console.error('Error updating case study:', error);
      throw error;
    }
    
    return data;
  } catch (error) {
    console.error('Error in updateCaseStudy:', error);
    throw error;
  }
}

/**
 * Delete a case study
 */
export async function deleteCaseStudy(id: string) {
  try {
    const { error } = await supabase
      .from('case_studies')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error('Error deleting case study:', error);
      throw error;
    }
    
    return true;
  } catch (error) {
    console.error('Error in deleteCaseStudy:', error);
    throw error;
  }
}

/**
 * Toggle the published status of a case study
 */
export async function toggleCaseStudyPublished(id: string) {
  try {
    // First get the current status
    const { data: caseStudy, error: fetchError } = await supabase
      .from('case_studies')
      .select('is_published')
      .eq('id', id)
      .single();
    
    if (fetchError) throw fetchError;
    
    // Then toggle it
    const { data, error } = await supabase
      .from('case_studies')
      .update({ is_published: !caseStudy.is_published })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    
    return data;
  } catch (error) {
    console.error('Error toggling case study published status:', error);
    throw error;
  }
}

/**
 * Get related case studies by tags or industry
 */
export async function getRelatedCaseStudies(excludeId: string, tags: string[], industry?: string, limit: number = 3, language: Language = 'en') {
  try {
    let query = supabase
      .from('case_studies')
      .select('*')
      .eq('is_published', true)
      .not('id', 'eq', excludeId)
      .limit(limit);
    
    if (tags && tags.length > 0) {
      query = query.contains('tags', tags);
    }
    
    if (industry) {
      query = query.eq('industry', industry);
    }
    
    const { data, error } = await query;
    if (error) throw error;
    return (data || []).map(caseStudy => localiseCaseStudy(caseStudy, language));
  } catch (error) {
    console.error('Error getting related case studies:', error);
    throw error;
  }
}

/**
 * Upload a case study image to Supabase storage
 */
export async function uploadCaseStudyImage(caseStudyId: string, file: File): Promise<{ url: string | null }> {
  try {
    if (!caseStudyId) {
      throw new Error("Case study ID is required for image upload");
    }

    console.log("Uploading case study image:", file.name, "type:", file.type, "size:", file.size);
    
    // Create file path
    const fileExt = file.name.split('.').pop();
    const fileName = `${caseStudyId}/${Date.now()}.${fileExt}`;
    
    console.log("Uploading to:", fileName);
    
    // Upload to storage
    const { data, error } = await supabase.storage
      .from('case-study-images')
      .upload(fileName, file);
      
    if (error) {
      console.error("Error uploading case study image:", error);
      return { url: null };
    }
    
    console.log("Image uploaded successfully:", data);
    
    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('case-study-images')
      .getPublicUrl(fileName);
      
    console.log("Image public URL:", publicUrl);
    
    return { url: publicUrl };
  } catch (error) {
    console.error('Error uploading case study image:', error);
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

export function localiseCaseStudy(caseStudy: CaseStudy, language: Language): CaseStudy {
  return {
    ...caseStudy,
    title: caseStudy.title_locales?.[language] || caseStudy.title_locales?.en || caseStudy.title,
    summary: caseStudy.summary_locales?.[language] || caseStudy.summary_locales?.en || caseStudy.summary,
    content: caseStudy.content_locales?.[language] || caseStudy.content_locales?.en || caseStudy.content,
    tags: caseStudy.tags_locales?.[language] || caseStudy.tags_locales?.en || caseStudy.tags || [],
    client_name: caseStudy.client_name_locales?.[language] || caseStudy.client_name_locales?.en || caseStudy.client_name,
    industry: caseStudy.industry_locales?.[language] || caseStudy.industry_locales?.en || caseStudy.industry,
    challenge: caseStudy.challenge_locales?.[language] || caseStudy.challenge_locales?.en || caseStudy.challenge,
    solution: caseStudy.solution_locales?.[language] || caseStudy.solution_locales?.en || caseStudy.solution,
    results: caseStudy.results_locales?.[language] || caseStudy.results_locales?.en || caseStudy.results,
    testimonial: caseStudy.testimonial_locales?.[language] || caseStudy.testimonial_locales?.en || caseStudy.testimonial,
    testimonial_author: caseStudy.testimonial_author_locales?.[language] || caseStudy.testimonial_author_locales?.en || caseStudy.testimonial_author,
    testimonial_position: caseStudy.testimonial_position_locales?.[language] || caseStudy.testimonial_position_locales?.en || caseStudy.testimonial_position,
    metrics: caseStudy.metrics_locales?.[language] || caseStudy.metrics_locales?.en || caseStudy.metrics,
    showcase_title: caseStudy.showcase_title_locales?.[language] || caseStudy.showcase_title_locales?.en || caseStudy.showcase_title,
    showcase_description: caseStudy.showcase_description_locales?.[language] || caseStudy.showcase_description_locales?.en || caseStudy.showcase_description,
  };
} 