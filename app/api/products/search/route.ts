import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  try {
    console.log('=== PRODUCTS SEARCH API ROUTE CALLED ===');
    console.log('Request URL:', request.url);
    
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || '';
    const limit = parseInt(searchParams.get('limit') || '10');

    console.log('Products search request:', { query, limit });

    if (!query.trim()) {
      console.log('Empty query, returning empty results');
      return NextResponse.json([]);
    }

    // Search products directly using text search and ILIKE
    const { data: products, error } = await supabase
      .from('products')
      .select('*')
      .or(`name.ilike.%${query}%,description.ilike.%${query}%,category.ilike.%${query}%`)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('Products search error:', error);
      return NextResponse.json({ error: 'Search failed' }, { status: 500 });
    }

    console.log(`Found ${products?.length || 0} products`);
    console.log('Products with image URLs:', products?.map(p => ({
      name: p.name,
      image_url: p.image_url
    })));

    // Add slug field to each product for URL generation
    const productsWithSlugs = products?.map(product => ({
      ...product,
      slug: product.name.toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
        .replace(/\s+/g, '-') // Replace spaces with hyphens
        .trim()
    })) || [];

    return NextResponse.json(productsWithSlugs);
  } catch (error) {
    console.error('Products search API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 