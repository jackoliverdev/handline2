'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Loader2, ArrowRight, Clock, TrendingUp, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/lib/context/language-context';
import { searchContent, getRecentSearches, saveRecentSearch, getSearchSuggestions } from '@/lib/search-service';
import { SearchResultItem } from './search-result-item';
import type { SearchSuggestion } from '@/lib/search-types';
import { cn } from '@/lib/utils';

interface SearchDropdownProps {
  query: string;
  onQueryChange: (query: string) => void;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  className?: string;
  placeholder?: string;
}

export function SearchDropdown({
  query,
  onQueryChange,
  isOpen,
  onOpenChange,
  className,
  placeholder
}: SearchDropdownProps) {
  const { t, language } = useLanguage();
  const router = useRouter();
  const [results, setResults] = useState<SearchSuggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [isFocused, setIsFocused] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Popular searches - could be dynamic from analytics
  const popularSearches = ['heat resistant gloves', 'cut protection', 'safety equipment', 'EN standards'];

  // Load recent searches on mount
  useEffect(() => {
    const recent = getRecentSearches();
    setRecentSearches(recent.map(r => r.query));
  }, []);

  // Get search results when query changes
  useEffect(() => {
    const performSearch = async () => {
      if (!query.trim() || query.length < 1) {
        setResults([]);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      try {
        // Use the comprehensive search API with language parameter
        const response = await fetch('/api/search/all?' + new URLSearchParams({
          q: query,
          limit: '10',
          language: language
        }));
        
        if (!response.ok) {
          throw new Error('Search failed');
        }
        
        const searchData = await response.json();
        
        // Convert results to SearchSuggestion format for display
        const searchSuggestions = searchData.results?.map((result: any, index: number) => ({
          id: result.id,
          title: result.title,
          description: result.description,
          content_type: result.content_type,
          url: result.url,
          image_url: result.image_url,
          suggestion: result.title,
          match_count: 1
        })) || [];
        
        setResults(searchSuggestions);
      } catch (error) {
        console.error('Search dropdown failed:', error);
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    };

    const debounceTimer = setTimeout(performSearch, 300);
    return () => clearTimeout(debounceTimer);
  }, [query, language]);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      
      // Don't close if clicking on the dropdown or the input
      if (dropdownRef.current && !dropdownRef.current.contains(target)) {
        // Check if click is on the input field
        if (inputRef.current && inputRef.current.contains(target)) {
          return; // Don't close if clicking on input
        }
        
        // Small delay to allow other events to complete
        setTimeout(() => {
          onOpenChange(false);
          setIsFocused(false);
        }, 150);
      }
    };

    if (isOpen) {
      // Use mousedown instead of click for better timing
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen, onOpenChange]);

  // Handle search submission
  const handleSearch = (searchQuery: string) => {
    if (searchQuery.trim()) {
      saveRecentSearch(searchQuery, results.length);
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      onOpenChange(false);
      setIsFocused(false);
    }
  };

  // Handle Enter key
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch(query);
    } else if (e.key === 'Escape') {
      onOpenChange(false);
      setIsFocused(false);
      inputRef.current?.blur();
    }
  };

  // Handle recent/popular search click
  const handleSuggestionClick = (suggestion: string) => {
    onQueryChange(suggestion);
    handleSearch(suggestion);
    // Clear the input after search
    setTimeout(() => {
      onQueryChange('');
    }, 100);
  };

  // Handle result item click
  const handleResultClick = (result: SearchSuggestion) => {
    if (query.trim()) {
      saveRecentSearch(query, results.length);
    }
    
    // Use the url if available, otherwise fallback to search with the suggestion
    const url = result.url || `/search?q=${encodeURIComponent(result.suggestion || result.title || query)}`;
    router.push(url);
    
    // Clear the search input and close dropdown
    onQueryChange('');
    onOpenChange(false);
    setIsFocused(false);
  };

  // Handle clear button click
  const handleClear = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onQueryChange('');
    setResults([]);
    inputRef.current?.focus();
  };

  // Handle focus - simplified logic
  const handleFocus = () => {
    setIsFocused(true);
    onOpenChange(true);
  };

  // Handle blur - more conservative approach
  const handleBlur = (e: React.FocusEvent) => {
    // Don't close immediately on blur - wait for potential interactions
    setTimeout(() => {
      // Only close if focus hasn't returned and we're not interacting with dropdown
      if (!inputRef.current?.matches(':focus')) {
        setIsFocused(false);
      }
    }, 200);
  };

  const hasResults = results.length > 0;
  const showRecentOrPopular = !query.trim() && (recentSearches.length > 0 || popularSearches.length > 0);
  const showNoResults = query.trim().length >= 2 && !isLoading && !hasResults;

  return (
    <div ref={dropdownRef} className={cn("relative", className)}>
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-brand-primary z-10" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            onQueryChange(e.target.value);
            // Ensure dropdown opens when user starts typing
            if (!isOpen) {
              onOpenChange(true);
            }
          }}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          placeholder={placeholder || t('search.searchPlaceholder')}
          className="w-full pl-10 pr-12 py-1 border border-gray-300 dark:border-gray-700/50 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent outline-none transition-all duration-200 bg-white dark:bg-black/50 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 backdrop-blur-sm"
        />
        
        {/* Right side icons container */}
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center">
          {/* Loading spinner */}
          {isLoading && (
            <Loader2 className="h-4 w-4 text-brand-primary animate-spin" />
          )}
          
          {/* Clear button */}
          {query.trim() && !isLoading && (
            <button
              onClick={handleClear}
              className="h-4 w-4 text-gray-400 dark:text-gray-300 hover:text-gray-600 dark:hover:text-gray-100 transition-colors flex items-center justify-center"
              type="button"
              aria-label="Clear search"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {/* Dropdown */}
      {isOpen && (showRecentOrPopular || hasResults || isLoading || showNoResults) && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-black/100 border border-gray-200 dark:border-gray-700/50 rounded-lg shadow-lg z-50 max-h-96 overflow-hidden backdrop-blur-sm">
          {/* Loading state */}
          {isLoading && query.trim() && (
            <div className="p-4 text-center">
              <Loader2 className="h-5 w-5 animate-spin mx-auto mb-2 text-brand-primary" />
              <p className="text-sm text-gray-500 dark:text-gray-400">{t('search.searching')}</p>
            </div>
          )}

          {/* No query state - show recent/popular searches */}
          {showRecentOrPopular && (
            <div className="p-3">
              {recentSearches.length > 0 && (
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="h-4 w-4 text-gray-400 dark:text-gray-500" />
                    <span className="text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                      {t('search.dropdown.recentSearches')}
                    </span>
                  </div>
                  <div className="space-y-1">
                    {recentSearches.slice(0, 3).map((search, index) => (
                      <button
                        key={index}
                        onClick={() => handleSuggestionClick(search)}
                        className="w-full text-left px-2 py-1.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded transition-colors"
                      >
                        {search}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="h-4 w-4 text-gray-400 dark:text-gray-500" />
                  <span className="text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                    {t('search.dropdown.popularSearches')}
                  </span>
                </div>
                <div className="space-y-1">
                  {popularSearches.map((search, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestionClick(search)}
                      className="w-full text-left px-2 py-1.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded transition-colors"
                    >
                      {search}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Results */}
          {hasResults && (
            <div className="max-h-80 overflow-y-auto">
              {results.map((result, index) => (
                <SearchResultItem
                  key={result.id || `suggestion-${index}`}
                  result={result}
                  variant="dropdown"
                  onClick={() => handleResultClick(result)}
                />
              ))}
            </div>
          )}

          {/* View all results */}
          {hasResults && (
            <div className="border-t border-gray-100 dark:border-gray-700/50 p-3">
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  
                  // Save recent search
                  if (query.trim()) {
                    saveRecentSearch(query, results.length);
                  }
                  
                  // Navigate directly and close dropdown
                  const searchUrl = `/search?q=${encodeURIComponent(query.trim())}`;
                  window.location.href = searchUrl;
                  
                  onOpenChange(false);
                  setIsFocused(false);
                  
                  // Clear the input after navigating
                  setTimeout(() => {
                    onQueryChange('');
                  }, 100);
                }}
                variant="ghost"
                className="w-full justify-between text-sm hover:bg-gray-50 dark:hover:bg-gray-700/50 text-gray-700 dark:text-gray-300"
              >
                <span>{t('search.dropdown.viewAllFor').replace('{query}', query)}</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          )}

          {/* No results */}
          {showNoResults && (
            <div className="p-4 text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{t('search.dropdown.noResults')}</p>
              <p className="text-xs text-gray-400 dark:text-gray-500">{t('search.dropdown.noResultsDescription')}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
} 