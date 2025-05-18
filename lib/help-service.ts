import { supabase } from './supabase';
import { v4 as uuidv4 } from 'uuid';

export interface HelpArticle {
  id?: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  type: string;
  category: string;
  tags?: string[];
  priority?: number;
  has_video?: boolean;
  video_url?: string | null;
  published: boolean;
  featured: boolean;
  created_at?: string;
  updated_at?: string;
}

/**
 * Get all help articles with optional filtering
 */
export async function getAllHelpArticles(options: {
  published?: boolean;
  featured?: boolean;
  type?: string;
  category?: string;
  limit?: number;
  offset?: number;
} = {}) {
  try {
    let query = supabase
      .from('help_articles')
      .select('*')
      .order('priority', { ascending: false })
      .order('created_at', { ascending: false });
    
    // Apply filters if provided
    if (options.published !== undefined) {
      query = query.eq('published', options.published);
    }
    
    if (options.featured !== undefined) {
      query = query.eq('featured', options.featured);
    }
    
    if (options.type) {
      query = query.eq('type', options.type);
    }
    
    if (options.category) {
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
      console.error('Error fetching help articles:', error);
      throw error;
    }
    
    return { data, count };
  } catch (error) {
    console.error('Error in getAllHelpArticles:', error);
    throw error;
  }
}

/**
 * Get a help article by ID
 */
export async function getHelpArticleById(id: string) {
  try {
    const { data, error } = await supabase
      .from('help_articles')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error getting help article:', error);
    throw error;
  }
}

/**
 * Get a help article by slug
 */
export async function getHelpArticleBySlug(slug: string) {
  try {
    const { data, error } = await supabase
      .from('help_articles')
      .select('*')
      .eq('slug', slug)
      .single();
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error getting help article by slug:', error);
    throw error;
  }
}

/**
 * Create a new help article
 */
export async function createHelpArticle(articleData: Omit<HelpArticle, 'id' | 'created_at' | 'updated_at'>) {
  try {
    console.log("Creating help article with data:", JSON.stringify(articleData, null, 2));
    
    // Extract only the fields we know exist in the database
    const {
      title,
      slug,
      summary,
      content,
      type,
      category,
      tags,
      priority,
      has_video,
      video_url,
      published,
      featured,
      ...rest // Ignore any other fields that might cause problems
    } = articleData;
    
    // Generate a unique ID
    const newArticle = {
      id: uuidv4(),
      title,
      slug: slug || createSlug(title),
      summary,
      content,
      type,
      category,
      tags,
      priority,
      has_video,
      video_url,
      published,
      featured
    };
    
    console.log("Clean article data for insert:", newArticle);
    
    const { data, error } = await supabase
      .from('help_articles')
      .insert([newArticle])
      .select()
      .single();
    
    if (error) {
      console.error('Error creating help article:', error);
      throw new Error(`Database error: ${error.message}`);
    }
    
    if (!data) {
      throw new Error('No data returned after creating help article');
    }
    
    console.log("Help article created successfully:", data);
    return data;
  } catch (error: any) {
    console.error('Error in createHelpArticle:', error);
    // Enhance error for debugging
    if (error.message) {
      throw new Error(`Failed to create help article: ${error.message}`);
    }
    throw error;
  }
}

/**
 * Update a help article
 */
export async function updateHelpArticle(id: string, updates: Partial<HelpArticle>) {
  try {
    console.log("Updating help article with ID:", id, "Data:", JSON.stringify(updates, null, 2));
    
    // Extract only the fields we know exist in the database
    const {
      title,
      slug,
      summary,
      content,
      type,
      category,
      tags,
      priority,
      has_video,
      video_url,
      published,
      featured,
      ...rest // Ignore any other fields that might cause problems
    } = updates;
    
    // Create a clean update object with only the fields that exist
    const cleanUpdates: Partial<HelpArticle> = {};
    
    // Only add fields that are defined
    if (title !== undefined) cleanUpdates.title = title;
    if (summary !== undefined) cleanUpdates.summary = summary;
    if (content !== undefined) cleanUpdates.content = content;
    if (type !== undefined) cleanUpdates.type = type;
    if (category !== undefined) cleanUpdates.category = category;
    if (tags !== undefined) cleanUpdates.tags = tags;
    if (priority !== undefined) cleanUpdates.priority = priority;
    if (has_video !== undefined) cleanUpdates.has_video = has_video;
    if (video_url !== undefined) cleanUpdates.video_url = video_url;
    if (published !== undefined) cleanUpdates.published = published;
    if (featured !== undefined) cleanUpdates.featured = featured;
    
    // If title is updated and slug isn't provided, update the slug too
    if (title && !slug) {
      cleanUpdates.slug = createSlug(title);
    } else if (slug !== undefined) {
      cleanUpdates.slug = slug;
    }
    
    console.log("Clean update data:", cleanUpdates);
    
    const { data, error } = await supabase
      .from('help_articles')
      .update(cleanUpdates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      console.error('Error updating help article:', error);
      throw new Error(`Database error: ${error.message}`);
    }
    
    if (!data) {
      throw new Error('No data returned after updating help article');
    }
    
    console.log("Help article updated successfully:", data);
    return data;
  } catch (error: any) {
    console.error('Error in updateHelpArticle:', error);
    // Enhance error for debugging
    if (error.message) {
      throw new Error(`Failed to update help article: ${error.message}`);
    }
    throw error;
  }
}

/**
 * Delete a help article
 */
export async function deleteHelpArticle(id: string) {
  try {
    const { error } = await supabase
      .from('help_articles')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error('Error deleting help article:', error);
      throw error;
    }
    
    return true;
  } catch (error) {
    console.error('Error in deleteHelpArticle:', error);
    throw error;
  }
}

/**
 * Toggle the published status of a help article
 */
export async function toggleHelpArticlePublished(id: string) {
  try {
    // First get the current status
    const { data: article, error: fetchError } = await supabase
      .from('help_articles')
      .select('published')
      .eq('id', id)
      .single();
    
    if (fetchError) throw fetchError;
    
    // Then toggle it
    const { data, error } = await supabase
      .from('help_articles')
      .update({ published: !article.published })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    
    return data;
  } catch (error) {
    console.error('Error toggling help article published status:', error);
    throw error;
  }
}

/**
 * Toggle the featured status of a help article
 */
export async function toggleHelpArticleFeatured(id: string) {
  try {
    // First get the current status
    const { data: article, error: fetchError } = await supabase
      .from('help_articles')
      .select('featured')
      .eq('id', id)
      .single();
    
    if (fetchError) throw fetchError;
    
    // Then toggle it
    const { data, error } = await supabase
      .from('help_articles')
      .update({ featured: !article.featured })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    
    return data;
  } catch (error) {
    console.error('Error toggling help article featured status:', error);
    throw error;
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