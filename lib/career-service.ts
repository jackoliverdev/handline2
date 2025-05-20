import { supabase } from './supabase';
import type { Language } from './context/language-context';

// Define types for localization
export type LocalizedString = {
  [key: string]: string;
};

// Define the Career Post type
export interface CareerPost {
  id?: string;
  slug: string;
  title: string;
  summary: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
  location: string;
  department: string;
  job_type: string;
  salary_range?: string | null;
  image_url?: string | null;
  published_at?: string | null;
  expiry_date?: string | null;
  is_published?: boolean;
  is_featured?: boolean;
  created_at?: string;
  updated_at?: string | null;
  // Localized fields
  title_locales?: { [lang: string]: string };
  summary_locales?: { [lang: string]: string };
  description_locales?: { [lang: string]: string };
  responsibilities_locales?: { [lang: string]: string[] };
  requirements_locales?: { [lang: string]: string[] };
  benefits_locales?: { [lang: string]: string[] };
  location_locales?: { [lang: string]: string };
  department_locales?: { [lang: string]: string };
  job_type_locales?: { [lang: string]: string };
  salary_range_locales?: { [lang: string]: string };
}

/**
 * Get all career posts with optional filtering
 */
export async function getAllCareerPosts(options: {
  published?: boolean;
  featured?: boolean;
  departments?: string[];
  limit?: number;
  offset?: number;
} = {}) {
  try {
    console.log('🔍 Calling getAllCareerPosts with options:', options);
    
    let query = supabase
      .from('careers')
      .select('*')
      .order('published_at', { ascending: false });
    
    // Apply filters if provided
    if (options.published !== undefined) {
      console.log(`   → Filtering by is_published: ${options.published}`);
      query = query.eq('is_published', options.published);
    }
    
    if (options.featured !== undefined) {
      console.log(`   → Filtering by is_featured: ${options.featured}`);
      query = query.eq('is_featured', options.featured);
    }
    
    if (options.departments && options.departments.length > 0) {
      console.log(`   → Filtering by departments: ${options.departments.join(', ')}`);
      query = query.in('department', options.departments);
    }
    
    // Apply pagination
    if (options.limit) {
      query = query.limit(options.limit);
    }
    
    if (options.offset) {
      query = query.range(options.offset, options.offset + (options.limit || 10) - 1);
    }
    
    // Log SQL query if possible
    console.log('   → Query:', query);
    
    const { data, error, count } = await query;
    
    if (error) {
      console.error('❌ Error fetching career posts:', error);
      return [];
    }
    
    console.log(`✅ Successfully fetched ${data?.length || 0} career posts:`, data);
    
    return data || [];
  } catch (error) {
    console.error('❌ Error in getAllCareerPosts:', error);
    return [];
  }
}

/**
 * Get a career post by slug
 */
export async function getCareerPostBySlug(slug: string, language: Language = 'en') {
  try {
    const { data, error } = await supabase
      .from('careers')
      .select('*')
      .eq('slug', slug)
      .single();
    
    if (error) {
      console.error(`Error fetching career post with slug ${slug}:`, error);
      return null;
    }
    
    return localiseCareerPost(data, language);
  } catch (error) {
    console.error(`Error in getCareerPostBySlug:`, error);
    return null;
  }
}

/**
 * Get featured career posts
 */
export async function getFeaturedCareerPosts(limit: number = 3, language: Language = 'en') {
  try {
    const { data, error } = await supabase
      .from('careers')
      .select('*')
      .eq('is_published', true)
      .eq('is_featured', true)
      .order('published_at', { ascending: false })
      .limit(limit);
    
    if (error) {
      console.error('Error fetching featured career posts:', error);
      return [];
    }
    
    return (data || []).map(post => localiseCareerPost(post, language));
  } catch (error) {
    console.error('Error in getFeaturedCareerPosts:', error);
    return [];
  }
}

/**
 * Get related career posts by department
 */
export async function getRelatedCareerPosts(excludeSlug: string, department: string, limit: number = 3, language: Language = 'en') {
  try {
    const { data, error } = await supabase
      .from('careers')
      .select('*')
      .eq('is_published', true)
      .eq('department', department)
      .not('slug', 'eq', excludeSlug)
      .limit(limit);
    
    if (error) {
      console.error('Error fetching related career posts:', error);
      return [];
    }
    
    return (data || []).map(post => localiseCareerPost(post, language));
  } catch (error) {
    console.error('Error in getRelatedCareerPosts:', error);
    return [];
  }
}

/**
 * Localise a career post
 */
export function localiseCareerPost(post: CareerPost, language: Language): CareerPost {
  if (!post) return post;
  
  return {
    ...post,
    title: post.title_locales?.[language] || post.title_locales?.en || post.title,
    summary: post.summary_locales?.[language] || post.summary_locales?.en || post.summary,
    description: post.description_locales?.[language] || post.description_locales?.en || post.description,
    responsibilities: post.responsibilities_locales?.[language] || post.responsibilities_locales?.en || post.responsibilities,
    requirements: post.requirements_locales?.[language] || post.requirements_locales?.en || post.requirements,
    benefits: post.benefits_locales?.[language] || post.benefits_locales?.en || post.benefits,
    location: post.location_locales?.[language] || post.location_locales?.en || post.location,
    department: post.department_locales?.[language] || post.department_locales?.en || post.department,
    job_type: post.job_type_locales?.[language] || post.job_type_locales?.en || post.job_type,
    salary_range: post.salary_range_locales?.[language] || post.salary_range_locales?.en || post.salary_range,
  };
} 