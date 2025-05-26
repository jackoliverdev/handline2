import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  try {
    console.log('=== SEARCH API ROUTE CALLED ===');
    console.log('Request URL:', request.url);
    
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || '';
    const content_filter = searchParams.get('content_filter');
    const category_filter = searchParams.get('category_filter');
    const locale_preference = searchParams.get('locale_preference') || 'en';
    const limit_results = parseInt(searchParams.get('limit_results') || '50');
    const min_similarity = parseFloat(searchParams.get('min_similarity') || '0.1');

    console.log('API Search request:', {
      query,
      content_filter,
      category_filter,
      locale_preference,
      limit_results
    });

    if (!query.trim()) {
      console.log('Empty query, returning empty results');
      return NextResponse.json({
        results: [],
        query,
        total: 0,
        total_count: 0,
        has_more: false,
        filters: {
          content_filter: null,
          category_filter: null,
          locale_preference
        }
      });
    }

    // Parse content_filter if it exists
    let contentFilterArray = null;
    if (content_filter) {
      try {
        contentFilterArray = JSON.parse(content_filter);
      } catch (e) {
        console.error('Error parsing content_filter:', e);
      }
    }

    console.log('Calling supabase.rpc("advanced_search") with params:', {
      search_query: query.trim(),
      content_filter: contentFilterArray,
      category_filter: null,
      locale_preference: locale_preference,
      limit_results: limit_results,
      min_similarity: min_similarity
    });

    // Call the advanced search function
    const { data, error } = await supabase.rpc('advanced_search', {
      search_query: query.trim(),
      content_filter: contentFilterArray,
      category_filter: null,
      locale_preference: locale_preference,
      limit_results: limit_results,
      min_similarity: min_similarity
    });

    if (error) {
      console.error('Advanced search error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const results = data || [];
    
    console.log(`=== RECEIVED ${results.length} RAW RESULTS FROM DATABASE ===`);
    
    // Debug logging for image URLs
    console.log('API Search results:', results.map((r: any, index: number) => ({
      index,
      title: r.title,
      content_type: r.content_type,
      image_url: r.image_url,
      hasImageUrl: !!r.image_url,
      imageUrlType: typeof r.image_url,
      imageUrlLength: r.image_url?.length || 0
    })));

    console.log('=== RETURNING SEARCH RESPONSE ===');

    return NextResponse.json({
      results,
      query,
      total: results.length,
      total_count: results.length,
      has_more: false,
      filters: {
        content_filter: contentFilterArray,
        category_filter: null,
        locale_preference
      }
    });

  } catch (error) {
    console.error('Error in search API:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
} 