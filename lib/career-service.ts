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
  work_site?: string | null;
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
  work_site_locales?: { [lang: string]: string };
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
 * Get a career post by ID
 */
export async function getCareerById(id: string) {
  try {
    const { data, error } = await supabase
      .from('careers')
      .select('*')
      .eq('id', id)
      .single();
    if (error) throw error;
    return data as CareerPost;
  } catch (error) {
    console.error('Error getting career post by id:', error);
    throw error;
  }
}

/**
 * Create a URL-friendly slug from a title
 */
function createSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s]/g, '')
    .replace(/\s+/g, '-')
    .replace(/--+/g, '-')
    .trim();
}

/**
 * Create a new career post
 */
export async function createCareer(post: Omit<CareerPost, 'id' | 'created_at' | 'updated_at'>) {
  try {
    const payload: any = {
      ...post,
      slug: post.slug || createSlug(post.title),
      responsibilities: post.responsibilities || [],
      requirements: post.requirements || [],
      benefits: post.benefits || [],
    };

    if (payload.is_published && !payload.published_at) {
      payload.published_at = new Date().toISOString();
    }

    const { data, error } = await supabase
      .from('careers')
      .insert([payload])
      .select()
      .single();

    if (error) throw error;
    return data as CareerPost;
  } catch (error) {
    console.error('Error creating career post:', error);
    throw error;
  }
}

/**
 * Update an existing career post
 */
export async function updateCareer(id: string, updates: Partial<CareerPost>) {
  try {
    const next: any = { ...updates };
    if (updates.title && !updates.slug) {
      next.slug = createSlug(updates.title);
    }
    if (typeof updates.is_published === 'boolean') {
      if (updates.is_published && !updates.published_at) {
        next.published_at = new Date().toISOString();
      }
      if (!updates.is_published) {
        next.published_at = null;
      }
    }
    if (updates.responsibilities === undefined && updates.requirements === undefined && updates.benefits === undefined) {
      // no-op
    } else {
      next.responsibilities = updates.responsibilities ?? [];
      next.requirements = updates.requirements ?? [];
      next.benefits = updates.benefits ?? [];
    }

    const { data, error } = await supabase
      .from('careers')
      .update(next)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data as CareerPost;
  } catch (error) {
    console.error('Error updating career post:', error);
    throw error;
  }
}

/**
 * Delete a career post
 */
export async function deleteCareer(id: string) {
  try {
    const { error } = await supabase
      .from('careers')
      .delete()
      .eq('id', id);
    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error deleting career post:', error);
    throw error;
  }
}

/**
 * Toggle publish status for a career post
 */
export async function toggleCareerPublished(id: string) {
  try {
    const { data: current, error: fetchError } = await supabase
      .from('careers')
      .select('is_published, published_at')
      .eq('id', id)
      .single();
    if (fetchError) throw fetchError;

    const nextIsPublished = !current.is_published;
    const nextPublishedAt = nextIsPublished ? new Date().toISOString() : null;

    const { data, error } = await supabase
      .from('careers')
      .update({ is_published: nextIsPublished, published_at: nextPublishedAt })
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data as CareerPost;
  } catch (error) {
    console.error('Error toggling career publish status:', error);
    throw error;
  }
}

/**
 * Toggle featured status for a career post
 */
export async function toggleCareerFeatured(id: string) {
  try {
    const { data: current, error: fetchError } = await supabase
      .from('careers')
      .select('is_featured')
      .eq('id', id)
      .single();
    if (fetchError) throw fetchError;

    const { data, error } = await supabase
      .from('careers')
      .update({ is_featured: !current.is_featured })
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data as CareerPost;
  } catch (error) {
    console.error('Error toggling career featured status:', error);
    throw error;
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