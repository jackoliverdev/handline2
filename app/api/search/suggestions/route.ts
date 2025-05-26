import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  try {
    console.log('=== SUGGESTIONS API ROUTE CALLED ===');
    console.log('Request URL:', request.url);
    
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || '';
    const limit = parseInt(searchParams.get('limit') || '10');

    console.log('API Search suggestions request:', { query, limit });

    if (!query.trim()) {
      console.log('Empty query, returning empty suggestions');
      return NextResponse.json([]);
    }

    // Instead of using the broken RPC function, let's get actual suggestions from products
    const searchPattern = query.trim();
    const suggestions: any[] = [];

    // Get product name suggestions
    const { data: products, error: productsError } = await supabase
      .from('products')
      .select('name, id')
      .ilike('name', `%${searchPattern}%`)
      .limit(Math.ceil(limit / 2));

    if (products) {
      suggestions.push(...products.map((product, index) => ({
        // Advanced search format
        suggestion: product.name,
        content_type: 'product',
        match_count: 1,
        // Legacy format
        id: `product-${product.id}`,
        title: product.name,
        description: 'Product',
        url: `/search?q=${encodeURIComponent(product.name)}`,
        image_url: null
      })));
    }

    // Get blog post title suggestions
    const { data: blogPosts, error: blogError } = await supabase
      .from('blog_posts')
      .select('title, slug')
      .eq('is_published', true)
      .ilike('title', `%${searchPattern}%`)
      .limit(Math.ceil(limit / 2));

    if (blogPosts) {
      suggestions.push(...blogPosts.map((post, index) => ({
        // Advanced search format
        suggestion: post.title,
        content_type: 'blog',
        match_count: 1,
        // Legacy format
        id: `blog-${post.slug}`,
        title: post.title,
        description: 'Article',
        url: `/search?q=${encodeURIComponent(post.title)}`,
        image_url: null
      })));
    }

    // Limit and sort suggestions
    const limitedSuggestions = suggestions
      .slice(0, limit)
      .sort((a, b) => a.suggestion.localeCompare(b.suggestion));

    console.log(`=== RETURNING ${limitedSuggestions.length} SEARCH SUGGESTIONS ===`);
    
    return NextResponse.json(limitedSuggestions);

  } catch (error) {
    console.error('Error in search suggestions API:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
} 