import { supabase } from './supabase';
import type { Language } from './context/language-context';

export interface BlogPost {
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
  is_featured?: boolean;
  created_at?: string;
  updated_at?: string;
  title_locales?: { [lang: string]: string };
  summary_locales?: { [lang: string]: string };
  content_locales?: { [lang: string]: string };
  tags_locales?: { [lang: string]: string[] };
  category?: string | null;
  category_locales?: { [lang: string]: string };
  extra_images_locales?: Array<{
    url: string;
    width?: number;
    height?: number;
  }>;
  related_product_id_1?: string | null;
  related_product_id_2?: string | null;
  related_product_id_3?: string | null;
  related_product_id_4?: string | null;
}

/**
 * Get all blog posts with optional filtering
 */
export async function getAllBlogs(options: {
  published?: boolean;
  featured?: boolean;
  tags?: string[];
  category?: string;
  limit?: number;
  offset?: number;
} = {}) {
  try {
    let query = supabase
      .from('blog_posts')
      .select('*')
      .order('published_at', { ascending: false });
    
    // Apply filters if provided
    if (options.published !== undefined) {
      query = query.eq('is_published', options.published);
    }
    if (options.featured !== undefined) {
      query = query.eq('is_featured', options.featured);
    }
    
    if (options.tags && options.tags.length > 0) {
      query = query.contains('tags', options.tags);
    }
    if (options.category) {
      // Filter by canonical category column
      query = query.eq('category', options.category);
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
      console.error('Error fetching blogs:', error);
      throw error;
    }
    
    return { data, count };
  } catch (error) {
    console.error('Error in getAllBlogs:', error);
    throw error;
  }
}

/**
 * Get a blog post by slug
 */
export async function getBlogBySlug(slug: string, language: Language = 'en') {
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .eq('is_published', true)
      .maybeSingle();
    if (error) {
      console.error('Error getting blog post by slug:', error);
      return null;
    }
    if (!data) return null;
    return localiseBlog(data, language);
  } catch (error) {
    console.error('Error getting blog post by slug:', error);
    return null;
  }
}

/**
 * Get related blog posts by tags
 */
export async function getRelatedBlogs(excludeId: string, tags: string[], limit: number = 3, language: Language = 'en') {
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('is_published', true)
      .not('id', 'eq', excludeId)
      .contains('tags', tags)
      .limit(limit);
    if (error) throw error;
    return (data || []).map(post => localiseBlog(post, language));
  } catch (error) {
    console.error('Error getting related blogs:', error);
    throw error;
  }
}

/**
 * Create a URL-friendly slug from a title
 */
export function createSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s]/g, '') // Remove non-word chars
    .replace(/\s+/g, '-')    // Replace spaces with hyphens
    .replace(/--+/g, '-')    // Replace multiple hyphens with single hyphen
    .trim();
}

export function localiseBlog(post: BlogPost, language: Language): BlogPost {
  return {
    ...post,
    title: post.title_locales?.[language] || post.title_locales?.en || post.title,
    summary: post.summary_locales?.[language] || post.summary_locales?.en || post.summary,
    content: post.content_locales?.[language] || post.content_locales?.en || post.content,
    tags: post.tags_locales?.[language] || post.tags_locales?.en || post.tags || [],
    category: post.category_locales?.[language] || post.category_locales?.en || post.category || null,
  };
} 