'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useLanguage } from '@/lib/context/language-context';
import { SearchHero } from '@/components/website/search/hero';
import { SearchResultsList } from '@/components/website/search/results-list';
import { SearchFilters } from '@/components/website/search/filters';
import type { SearchResult, ContentType } from '@/lib/search-types';
import { Loader2 } from 'lucide-react';

interface SearchPageState {
  results: SearchResult[];
  totalCount: number;
  isLoading: boolean;
  error: string | null;
  hasMore: boolean;
}

function SearchPageContent() {
  const searchParams = useSearchParams();
  const { language } = useLanguage();
  const [query, setQuery] = useState('');
  const [searchState, setSearchState] = useState<SearchPageState>({
    results: [],
    totalCount: 0,
    isLoading: false,
    error: null,
    hasMore: false
  });

  // Filter states
  const [selectedContentTypes, setSelectedContentTypes] = useState<ContentType[]>([]);
  const [sortBy, setSortBy] = useState<'relevance' | 'newest' | 'alphabetical'>('relevance');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc'); // For alphabetical sorting
  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 12;

  // Get query from URL on mount and when searchParams change
  useEffect(() => {
    const urlQuery = searchParams?.get('q') || '';
    setQuery(urlQuery);
    if (urlQuery) {
      setCurrentPage(1); // Reset to first page for new search
    }
  }, [searchParams]);

  // Perform search when parameters change
  useEffect(() => {
    const performSearch = async () => {
      if (!query.trim()) {
        setSearchState({
          results: [],
          totalCount: 0,
          isLoading: false,
          error: null,
          hasMore: false
        });
        return;
      }

      setSearchState(prev => ({ ...prev, isLoading: true, error: null }));

      try {
        // Build query parameters for the new search API
        const searchParams = new URLSearchParams({
          q: query.trim(),
          limit: resultsPerPage.toString(),
          offset: ((currentPage - 1) * resultsPerPage).toString(),
          language: language,
          sort: sortBy,
          sortDirection: sortDirection
        });

        // Add content types filter if any selected
        if (selectedContentTypes.length > 0) {
          searchParams.set('content_types', JSON.stringify(selectedContentTypes));
        }

        console.log('Calling new search API with params:', searchParams.toString());

        // Call the new comprehensive search API
        const response = await fetch(`/api/search/all?${searchParams.toString()}`);
        
        if (!response.ok) {
          throw new Error('Search request failed');
        }

        const data = await response.json();

        console.log('Search API response:', data);

        setSearchState({
          results: data.results || [],
          totalCount: data.total || 0,
          isLoading: false,
          error: null,
          hasMore: data.hasMore || false
        });
      } catch (error) {
        console.error('Search failed:', error);
        setSearchState({
          results: [],
          totalCount: 0,
          isLoading: false,
          error: 'Search failed. Please try again.',
          hasMore: false
        });
      }
    };

    const debounceTimer = setTimeout(performSearch, 300);
    return () => clearTimeout(debounceTimer);
  }, [query, selectedContentTypes, sortBy, sortDirection, currentPage, language]);

  // Handle filter changes
  const handleContentTypesChange = (contentTypes: ContentType[]) => {
    setSelectedContentTypes(contentTypes);
    setCurrentPage(1); // Reset to first page
  };

  const handleSortChange = (sort: 'relevance' | 'newest' | 'alphabetical') => {
    if ((sort === 'alphabetical' && sortBy === 'alphabetical') || 
        (sort === 'newest' && sortBy === 'newest')) {
      // If already selected (alphabetical or newest), toggle direction
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      // For new sort type or relevance, reset to ascending
      setSortBy(sort);
      setSortDirection('asc');
    }
    
    // If changing sort type (not just direction), update sortBy
    if (sort !== sortBy) {
      setSortBy(sort);
    }
    
    setCurrentPage(1); // Reset to first page
  };

  const handleLoadMore = () => {
    setCurrentPage(prev => prev + 1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <main className="flex flex-col min-h-[100dvh]">
      {/* Hero Section */}
      <SearchHero 
        query={query} 
        totalResults={searchState.totalCount}
        isLoading={searchState.isLoading}
      />

      {/* Search Results Content */}
      <div className="bg-[#F5EFE0]/80 dark:bg-transparent py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Sidebar */}
            <aside className="lg:w-80 flex-shrink-0">
              <SearchFilters
                selectedContentTypes={selectedContentTypes}
                sortBy={sortBy}
                sortDirection={sortDirection}
                onContentTypesChange={handleContentTypesChange}
                onSortChange={handleSortChange}
                totalResults={searchState.totalCount}
                isLoading={searchState.isLoading}
              />
            </aside>

            {/* Results */}
            <div className="flex-1">
              <SearchResultsList
                query={query}
                results={searchState.results}
                totalCount={searchState.totalCount}
                isLoading={searchState.isLoading}
                error={searchState.error}
                hasMore={searchState.hasMore}
                currentPage={currentPage}
                resultsPerPage={resultsPerPage}
                onLoadMore={handleLoadMore}
                onPageChange={handlePageChange}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-brand-primary" />
      </div>
    }>
      <SearchPageContent />
    </Suspense>
  );
} 