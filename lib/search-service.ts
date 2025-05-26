import { supabase } from './supabase';
import type { Language } from './context/language-context';
import type {
  SearchResult,
  SearchOptions,
  SearchResponse,
  SearchSuggestion,
  SearchFilters,
  RecentSearch,
  ContentType
} from './search-types';
import {
  CONTENT_TYPE_LABELS,
  CATEGORY_LABELS
} from './search-types';

/**
 * Main search function using the search API route
 */
export async function searchContent(options: SearchOptions = {}): Promise<SearchResponse> {
  try {
    // Handle both old and new API options
    const query = options.query || '';
    const content_filter = options.content_filter || options.content_types || undefined;
    const category_filter = options.category_filter || options.category || undefined;
    const locale_preference = options.locale_preference || options.language || 'en';
    const limit_results = options.limit_results || options.limit || 50;
    const offset = options.offset || 0;

    console.log('Search service with options:', options);

    if (!query.trim()) {
      return {
        results: [],
        query,
        total: 0,
        total_count: 0,
        has_more: false,
        offset: offset,
        limit: limit_results,
        filters: {
          content_filter,
          category_filter,
          locale_preference
        }
      };
    }

    // Build URL parameters for the comprehensive search API
    const searchParams = new URLSearchParams();
    searchParams.set('q', query.trim());
    if (content_filter && content_filter.length > 0) {
      searchParams.set('content_types', content_filter.join(','));
    }
    if (category_filter) {
      searchParams.set('category', category_filter);
    }
    searchParams.set('language', locale_preference);
    searchParams.set('limit', limit_results.toString());
    searchParams.set('offset', offset.toString());

    // Call the comprehensive search API
    const response = await fetch(`/api/search/all?${searchParams.toString()}`);
    
    if (!response.ok) {
      throw new Error(`Search API failed: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.error) {
      throw new Error(data.error);
    }

    const results = data.results || [];
    
    // Debug logging for image URLs in search results
    console.log('Search API results:', results.map((r: any) => ({
      title: r.title,
      content_type: r.content_type,
      image_url: r.image_url,
      hasImageUrl: !!r.image_url,
      imageUrlLength: r.image_url?.length || 0
    })));
    
    console.log(`Retrieved ${results.length} search results for "${query}"`);
    
    return {
      results: results,
      query,
      total: data.total || results.length,
      total_count: data.total || results.length,
      has_more: data.hasMore || false,
      offset: offset,
      limit: limit_results,
      filters: {
        content_filter,
        category_filter,
        locale_preference
      }
    };

  } catch (error) {
    console.error('Error in search service:', error);
    return {
      results: [],
      query: options.query || '',
      total: 0,
      total_count: 0,
      has_more: false,
      offset: options.offset || 0,
      limit: options.limit || 50,
      filters: {
        content_filter: undefined,
        category_filter: undefined,
        locale_preference: 'en'
      }
    };
  }
}

/**
 * Get search suggestions using the suggestions API route
 */
export async function getSearchSuggestions(query: string, language: Language = 'en'): Promise<SearchSuggestion[]> {
  try {
    if (!query.trim()) {
      return [];
    }

    console.log(`Getting search suggestions for: "${query}"`);

    // Build URL parameters
    const searchParams = new URLSearchParams();
    searchParams.set('q', query.trim());
    searchParams.set('limit', '10');

    // Call the suggestions API
    const response = await fetch(`/api/search/suggestions?${searchParams.toString()}`);
    
    if (!response.ok) {
      throw new Error(`Suggestions API failed: ${response.status}`);
    }

    const suggestions = await response.json();
    
    console.log(`Retrieved ${suggestions.length} search suggestions from API`);
    
    return suggestions as SearchSuggestion[];

  } catch (error) {
    console.error('Error in getSearchSuggestions:', error);
    return [];
  }
}

/**
 * Get search filters by analyzing current results
 */
export async function getSearchFilters(query: string = '', language: Language = 'en'): Promise<SearchFilters> {
  try {
    console.log('Getting search filters...');

    // Get a sample of search results to analyse filters
    const searchResponse = await searchContent({
      query,
      locale_preference: language,
      limit_results: 1000 // Get more results to better analyse filters
    });

    const results = searchResponse.results;

    // Count content types
    const contentTypeCounts = new Map<ContentType, number>();
    const categoryCounts = new Map<string, number>();

    results.forEach(item => {
      // Count content types
      const contentType = item.content_type as ContentType;
      contentTypeCounts.set(contentType, (contentTypeCounts.get(contentType) || 0) + 1);

      // Count categories
      if (item.category) {
        categoryCounts.set(item.category, (categoryCounts.get(item.category) || 0) + 1);
      }
    });

    // Format content type filters
    const contentTypeFilters = Array.from(contentTypeCounts.entries()).map(([key, count]) => ({
      key,
      name: CONTENT_TYPE_LABELS[key]?.[language] || CONTENT_TYPE_LABELS[key]?.en || key,
      count
    }));

    // Format category filters  
    const categoryFilters = Array.from(categoryCounts.entries()).map(([key, count]) => ({
      key,
      name: CATEGORY_LABELS[key]?.[language] || CATEGORY_LABELS[key]?.en || key,
      count
    }));

    console.log(`Retrieved filters: ${contentTypeFilters.length} content types, ${categoryFilters.length} categories`);

    return {
      content_types: contentTypeFilters.sort((a, b) => b.count - a.count),
      categories: categoryFilters.sort((a, b) => b.count - a.count)
    };

  } catch (error) {
    console.error('Error in getSearchFilters:', error);
    return { content_types: [], categories: [] };
  }
}

/**
 * Get popular/trending searches
 */
export async function getPopularSearches(language: Language = 'en'): Promise<string[]> {
  const popularSearches = {
    en: [
      'heat resistant gloves',
      'cut protection',
      'safety gloves',
      'welding gloves',
      'construction safety'
    ],
    it: [
      'guanti resistenti al calore',
      'protezione taglio',
      'guanti di sicurezza',
      'guanti saldatura',
      'sicurezza costruzioni'
    ]
  };

  return popularSearches[language] || popularSearches.en;
}

/**
 * Save a search to recent searches (local storage)
 */
export function saveRecentSearch(query: string, resultsCount: number): void {
  if (typeof window === 'undefined') return;

  try {
    const recent = getRecentSearches();
    const newSearch: RecentSearch = {
      query: query.trim(),
      timestamp: new Date().toISOString(),
      results_count: resultsCount
    };

    // Remove duplicate if exists
    const filtered = recent.filter(search => search.query !== newSearch.query);
    
    // Add to beginning and limit to 10
    const updated = [newSearch, ...filtered].slice(0, 10);
    
    localStorage.setItem('handline_recent_searches', JSON.stringify(updated));
  } catch (error) {
    console.error('Error saving recent search:', error);
  }
}

/**
 * Get recent searches from local storage
 */
export function getRecentSearches(): RecentSearch[] {
  if (typeof window === 'undefined') return [];

  try {
    const stored = localStorage.getItem('handline_recent_searches');
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error getting recent searches:', error);
    return [];
  }
}

/**
 * Clear recent searches
 */
export function clearRecentSearches(): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.removeItem('handline_recent_searches');
  } catch (error) {
    console.error('Error clearing recent searches:', error);
  }
}

/**
 * Search within a specific content type
 */
export async function searchByContentType(
  contentType: ContentType,
  query: string = '',
  options: Partial<SearchOptions> = {}
): Promise<SearchResponse> {
  return searchContent({
    ...options,
    query,
    content_filter: [contentType]
  });
} 