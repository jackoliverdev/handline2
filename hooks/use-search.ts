'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useLanguage } from '@/lib/context/language-context';
import {
  searchContent,
  getSearchSuggestions,
  getSearchFilters,
  getPopularSearches,
  saveRecentSearch,
  getRecentSearches,
  clearRecentSearches
} from '@/lib/search-service';
import type {
  SearchResult,
  SearchOptions,
  SearchSuggestion,
  SearchFilters,
  RecentSearch,
  ContentType
} from '@/lib/search-types';
import { useDebounce } from './use-debounce';

interface UseSearchState {
  // Search results
  results: SearchResult[];
  totalCount: number;
  hasMore: boolean;
  
  // Loading states
  isLoading: boolean;
  isLoadingSuggestions: boolean;
  
  // Dropdown suggestions
  suggestions: SearchSuggestion[];
  showSuggestions: boolean;
  
  // Filters and meta
  filters: SearchFilters;
  popularSearches: string[];
  recentSearches: RecentSearch[];
  
  // Current search params
  query: string;
  activeFilters: {
    contentTypes: ContentType[];
    category: string;
  };
  
  // Error handling
  error: string | null;
}

interface UseSearchActions {
  // Core search actions
  search: (newQuery: string, options?: Partial<SearchOptions>) => Promise<void>;
  clearResults: () => void;
  
  // Query management
  setQuery: (query: string) => void;
  clearQuery: () => void;
  
  // Filter management
  setContentTypeFilter: (types: ContentType[]) => void;
  setCategoryFilter: (category: string) => void;
  clearFilters: () => void;
  
  // Suggestions
  getSuggestions: (query: string) => Promise<void>;
  hideSuggestions: () => void;
  showSuggestionsDropdown: () => void;
  
  // Recent searches
  addRecentSearch: (query: string, resultsCount: number) => void;
  clearRecentSearches: () => void;
  
  // Utils
  refreshFilters: () => Promise<void>;
  reset: () => void;
}

const initialState: UseSearchState = {
  results: [],
  totalCount: 0,
  hasMore: false,
  isLoading: false,
  isLoadingSuggestions: false,
  suggestions: [],
  showSuggestions: false,
  filters: { content_types: [], categories: [] },
  popularSearches: [],
  recentSearches: [],
  query: '',
  activeFilters: {
    contentTypes: [],
    category: ''
  },
  error: null
};

export function useSearch(initialQuery: string = '') {
  const { language } = useLanguage();
  const [state, setState] = useState<UseSearchState>({
    ...initialState,
    query: initialQuery
  });
  
  // Debounce search query for suggestions
  const debouncedQuery = useDebounce(state.query, 300);
  
  // Track if component is mounted to avoid state updates after unmount
  const isMountedRef = useRef(true);
  
  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  // Safe state update that checks if component is mounted
  const safeSetState = useCallback((updater: (prev: UseSearchState) => UseSearchState) => {
    if (isMountedRef.current) {
      setState(updater);
    }
  }, []);

  // Initialize data on mount
  useEffect(() => {
    const initializeData = async () => {
      try {
        const [popularSearches, recentSearches, filters] = await Promise.all([
          getPopularSearches(language),
          Promise.resolve(getRecentSearches()),
          getSearchFilters('', language)
        ]);

        safeSetState(prev => ({
          ...prev,
          popularSearches,
          recentSearches,
          filters
        }));
      } catch (error) {
        console.error('Error initializing search data:', error);
      }
    };

    initializeData();
  }, [language, safeSetState]);

  // Auto-suggest when query changes (debounced)
  useEffect(() => {
    if (debouncedQuery.trim() && state.showSuggestions) {
      getSuggestions(debouncedQuery);
    } else {
      safeSetState(prev => ({ ...prev, suggestions: [] }));
    }
  }, [debouncedQuery, state.showSuggestions, safeSetState]);

  // Get search suggestions
  const getSuggestions = useCallback(async (query: string) => {
    if (!query.trim()) {
      safeSetState(prev => ({ ...prev, suggestions: [] }));
      return;
    }

    safeSetState(prev => ({ ...prev, isLoadingSuggestions: true }));

    try {
      const suggestions = await getSearchSuggestions(query, language);
      safeSetState(prev => ({
        ...prev,
        suggestions,
        isLoadingSuggestions: false
      }));
    } catch (error) {
      console.error('Suggestions error:', error);
      safeSetState(prev => ({
        ...prev,
        suggestions: [],
        isLoadingSuggestions: false
      }));
    }
  }, [language, safeSetState]);

  // Core search function
  const search = useCallback(async (newQuery: string, options: Partial<SearchOptions> = {}) => {
    const trimmedQuery = newQuery.trim();
    
    safeSetState(prev => ({
      ...prev,
      isLoading: true,
      error: null,
      query: newQuery
    }));

    try {
      const searchOptions: SearchOptions = {
        query: trimmedQuery,
        content_filter: state.activeFilters.contentTypes.length > 0 ? state.activeFilters.contentTypes : undefined,
        category_filter: state.activeFilters.category || undefined,
        locale_preference: language,
        limit_results: 50,
        min_similarity: 0.1,
        ...options
      };

      const response = await searchContent(searchOptions);
      
      safeSetState(prev => ({
        ...prev,
        results: response.results,
        totalCount: response.total,
        hasMore: response.results.length >= 50, // Check if there might be more results
        isLoading: false,
        showSuggestions: false
      }));

      // Save to recent searches if there's a query and results
      if (trimmedQuery && response.results.length > 0) {
        saveRecentSearch(trimmedQuery, response.total);
        const updatedRecent = getRecentSearches();
        safeSetState(prev => ({ ...prev, recentSearches: updatedRecent }));
      }

    } catch (error) {
      console.error('Search error:', error);
      safeSetState(prev => ({
        ...prev,
        isLoading: false,
        error: 'Search failed. Please try again.',
        results: [],
        totalCount: 0,
        hasMore: false
      }));
    }
  }, [state.activeFilters, language, safeSetState]);

  // Refresh filters based on current query
  const refreshFilters = useCallback(async () => {
    try {
      const filters = await getSearchFilters(state.query, language);
      safeSetState(prev => ({ ...prev, filters }));
    } catch (error) {
      console.error('Error refreshing filters:', error);
    }
  }, [state.query, language, safeSetState]);

  // Action creators
  const actions: UseSearchActions = {
    search,
    clearResults: () => safeSetState(prev => ({ 
      ...prev, 
      results: [], 
      totalCount: 0, 
      hasMore: false
    })),
    
    setQuery: (query: string) => safeSetState(prev => ({ ...prev, query })),
    clearQuery: () => safeSetState(prev => ({ ...prev, query: '', suggestions: [] })),
    
    setContentTypeFilter: (types: ContentType[]) => 
      safeSetState(prev => ({ 
        ...prev, 
        activeFilters: { ...prev.activeFilters, contentTypes: types } 
      })),
    
    setCategoryFilter: (category: string) => 
      safeSetState(prev => ({ 
        ...prev, 
        activeFilters: { ...prev.activeFilters, category } 
      })),
    
    clearFilters: () => 
      safeSetState(prev => ({ 
        ...prev, 
        activeFilters: { contentTypes: [], category: '' } 
      })),
    
    getSuggestions,
    hideSuggestions: () => safeSetState(prev => ({ ...prev, showSuggestions: false })),
    showSuggestionsDropdown: () => safeSetState(prev => ({ ...prev, showSuggestions: true })),
    
    addRecentSearch: (query: string, resultsCount: number) => {
      saveRecentSearch(query, resultsCount);
      const updatedRecent = getRecentSearches();
      safeSetState(prev => ({ ...prev, recentSearches: updatedRecent }));
    },
    
    clearRecentSearches: () => {
      clearRecentSearches();
      safeSetState(prev => ({ ...prev, recentSearches: [] }));
    },
    
    refreshFilters,
    
    reset: () => safeSetState(() => ({ ...initialState, query: '' }))
  };

  return {
    ...state,
    ...actions
  };
} 