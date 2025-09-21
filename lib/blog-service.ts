import { supabase } from './supabase';
import { v4 as uuidv4 } from 'uuid';
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
 * Get a blog post by ID
 */
export async function getBlogById(id: string) {
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error getting blog post:', error);
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
      .single();
    if (error) throw error;
    return localiseBlog(data, language);
  } catch (error) {
    console.error('Error getting blog post by slug:', error);
    throw error;
  }
}

/**
 * Create a new blog post
 */
export async function createBlog(blogData: Omit<BlogPost, 'id' | 'created_at' | 'updated_at'>) {
  try {
    // Generate a unique ID
    const newBlog: any = {
      ...blogData,
      id: uuidv4(),
      slug: blogData.slug || createSlug(blogData.title)
    };
    
    const { data, error } = await supabase
      .from('blog_posts')
      .insert([newBlog])
      .select()
      .single();
    
    if (error) {
      console.error('Error creating blog post:', error);
      throw error;
    }
    
    return data;
  } catch (error) {
    console.error('Error in createBlog:', error);
    throw error;
  }
}

/**
 * Update a blog post
 */
export async function updateBlog(id: string, updates: Partial<BlogPost>) {
  try {
    // If title is updated and slug isn't provided, update the slug too
    if (updates.title && !updates.slug) {
      updates.slug = createSlug(updates.title);
    }
    
    const { data, error } = await supabase
      .from('blog_posts')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      console.error('Error updating blog post:', error);
      throw error;
    }
    
    return data;
  } catch (error) {
    console.error('Error in updateBlog:', error);
    throw error;
  }
}

/**
 * Delete a blog post
 */
export async function deleteBlog(id: string) {
  try {
    const { error } = await supabase
      .from('blog_posts')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error('Error deleting blog post:', error);
      throw error;
    }
    
    return true;
  } catch (error) {
    console.error('Error in deleteBlog:', error);
    throw error;
  }
}

/**
 * Toggle the published status of a blog post
 */
export async function toggleBlogPublished(id: string) {
  try {
    // First get the current status
    const { data: blog, error: fetchError } = await supabase
      .from('blog_posts')
      .select('is_published')
      .eq('id', id)
      .single();
    
    if (fetchError) throw fetchError;
    
    // Then toggle it
    const { data, error } = await supabase
      .from('blog_posts')
      .update({ is_published: !blog.is_published })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    
    return data;
  } catch (error) {
    console.error('Error toggling blog published status:', error);
    throw error;
  }
}

/**
 * Toggle the featured status of a blog post
 */
export async function toggleBlogFeatured(id: string) {
  try {
    // Get current featured status
    const { data: blog, error: fetchError } = await supabase
      .from('blog_posts')
      .select('is_featured')
      .eq('id', id)
      .single();
    if (fetchError) throw fetchError;

    const { data, error } = await supabase
      .from('blog_posts')
      .update({ is_featured: !blog.is_featured })
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error toggling blog featured status:', error);
    throw error;
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
 * Upload a blog cover image to Supabase storage
 */
export async function uploadBlogCoverImage(blogId: string, file: File): Promise<{ url: string | null }> {
  try {
    if (!blogId) {
      throw new Error("Blog ID is required for image upload");
    }

    console.log("Uploading blog cover image:", file.name, "type:", file.type, "size:", file.size);
    
    // Create file path
    const fileExt = file.name.split('.').pop();
    const fileName = `${blogId}/${Date.now()}.${fileExt}`;
    
    console.log("Uploading to:", fileName);
    
    // Upload to storage
    const { data, error } = await supabase.storage
      .from('blog-covers')
      .upload(fileName, file);
      
    if (error) {
      console.error("Error uploading blog cover image:", error);
      return { url: null };
    }
    
    console.log("Image uploaded successfully:", data);
    
    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('blog-covers')
      .getPublicUrl(fileName);
      
    console.log("Image public URL:", publicUrl);
    
    return { url: publicUrl };
  } catch (error) {
    console.error('Error uploading blog cover image:', error);
    return { url: null };
  }
}

/**
 * Upload an extra blog image to Supabase storage
 */
export async function uploadBlogExtraImage(blogId: string, file: File): Promise<{ url: string | null }> {
  try {
    if (!blogId) {
      throw new Error('Blog ID is required for image upload');
    }
    const fileExt = file.name.split('.').pop();
    const fileName = `${blogId}/${Date.now()}-${Math.random().toString(36).slice(2,8)}.${fileExt}`;
    const { error } = await supabase.storage
      .from('blog-covers')
      .upload(fileName, file);
    if (error) {
      console.error('Error uploading blog extra image:', error);
      return { url: null };
    }
    const { data: { publicUrl } } = supabase.storage
      .from('blog-covers')
      .getPublicUrl(fileName);
    return { url: publicUrl };
  } catch (error) {
    console.error('Error uploading blog extra image:', error);
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