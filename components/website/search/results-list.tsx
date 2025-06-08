'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Loader2, AlertCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SearchResultItem } from '@/components/website/search/search-result-item';
import { useLanguage } from '@/lib/context/language-context';
import type { SearchResult } from '@/lib/search-types';
import { cn } from '@/lib/utils';

interface SearchResultsListProps {
  query: string;
  results: SearchResult[];
  totalCount: number;
  isLoading: boolean;
  error: string | null;
  hasMore: boolean;
  currentPage: number;
  resultsPerPage: number;
  onLoadMore: () => void;
  onPageChange?: (page: number) => void;
}

export function SearchResultsList({
  query,
  results,
  totalCount,
  isLoading,
  error,
  hasMore,
  currentPage,
  resultsPerPage,
  onLoadMore,
  onPageChange
}: SearchResultsListProps) {
  const { t } = useLanguage();

  const totalPages = Math.ceil(totalCount / resultsPerPage);
  const startResult = (currentPage - 1) * resultsPerPage + 1;
  const endResult = Math.min(currentPage * resultsPerPage, totalCount);

  // Convert SearchResult to SearchSuggestion format for the SearchResultItem
  const searchSuggestions = results.map(result => ({
    id: result.id,
    title: result.title,
    description: result.description,
    content_type: result.content_type,
    url: result.url,
    image_url: result.image_url,
    suggestion: result.title,
    match_count: 1
  }));

  // Loading state
  if (isLoading && results.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-brand-primary mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          {t('search.results.searching')}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 text-center max-w-md">
          {t('search.results.searchingDescription')}
        </p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <AlertCircle className="h-8 w-8 text-red-500 mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          {t('search.results.error')}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 text-center max-w-md mb-4">
          {error}
        </p>
        <Button 
          onClick={() => window.location.reload()} 
          variant="outline"
          className="border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white"
        >
          {t('search.results.tryAgain')}
        </Button>
      </div>
    );
  }

  // No query state
  if (!query.trim()) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="text-4xl mb-4">🔍</div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          {t('search.results.noQuery')}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 text-center max-w-md">
          {t('search.results.noQueryDescription')}
        </p>
      </div>
    );
  }

  // No results state
  if (results.length === 0 && !isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="text-4xl mb-4">😕</div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          {t('search.results.noResults')}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 text-center max-w-md">
          {t('search.results.noResultsDescription').replace('{query}', `"${query}"`)}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Results Header */}
      <div className="bg-white dark:bg-black/50 backdrop-blur-sm border border-gray-100 dark:border-gray-700/50 rounded-xl shadow-md p-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-primary/10 flex-shrink-0">
              <div className="text-lg">🔍</div>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-brand-dark dark:text-white">
                {t('search.results.title')} <span className="text-brand-primary">"{query}"</span>
              </h2>
              <p className="text-sm text-brand-secondary dark:text-gray-400 mt-1">
                <span className="font-medium text-brand-primary">{totalCount.toLocaleString()}</span> results found
                {results.length !== totalCount && (
                  <span className="ml-1">• Showing {results.length}</span>
                )}
              </p>
            </div>
          </div>

          {/* Pagination info */}
          {totalPages > 1 && (
            <div className="bg-gray-50/80 dark:bg-gray-800/50 px-3 py-2 rounded-lg border border-gray-100 dark:border-gray-700/50">
              <div className="text-xs text-brand-secondary dark:text-gray-400 text-center">
                <span className="font-medium">Page {currentPage} of {totalPages}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Results Grid */}
      <div className="grid gap-4 sm:gap-6">
        {searchSuggestions.map((result, index) => (
          <motion.div
            key={result.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.4,
              delay: index * 0.1,
              ease: "easeOut"
            }}
          >
            <SearchResultItem
              result={result}
              variant="page"
              className="hover:shadow-lg transition-shadow duration-200"
            />
          </motion.div>
        ))}
      </div>

      {/* Loading more */}
      {isLoading && results.length > 0 && (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="h-6 w-6 animate-spin text-brand-primary mr-2" />
          <span className="text-gray-600 dark:text-gray-400">
            {t('search.results.loadingMore')}
          </span>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && !isLoading && (
        <div className="flex items-center justify-center gap-2 pt-6">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange && onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={cn(
              "border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white hover:border-gray-400 dark:hover:border-gray-500",
              currentPage === 1 && "opacity-50 cursor-not-allowed"
            )}
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            {t('search.results.previous')}
          </Button>

          <div className="flex items-center gap-1 mx-4">
            {/* Page numbers - show a few around current page */}
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const pageNum = Math.max(1, Math.min(totalPages - 4, currentPage - 2)) + i;
              if (pageNum > totalPages) return null;
              
              return (
                <Button
                  key={pageNum}
                  variant={pageNum === currentPage ? "default" : "ghost"}
                  size="sm"
                  onClick={() => onPageChange && onPageChange(pageNum)}
                  className={cn(
                    "w-8 h-8 p-0",
                    pageNum === currentPage 
                      ? "bg-brand-primary text-white hover:bg-brand-primary/90" 
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"
                  )}
                >
                  {pageNum}
                </Button>
              );
            })}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange && onPageChange(currentPage + 1)}
            disabled={!hasMore || currentPage >= totalPages}
            className={cn(
              "border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white hover:border-gray-400 dark:hover:border-gray-500",
              (!hasMore || currentPage >= totalPages) && "opacity-50 cursor-not-allowed"
            )}
          >
            {t('search.results.next')}
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      )}

      {/* Load More Button (alternative to pagination) */}
      {hasMore && !isLoading && totalPages <= 1 && (
        <div className="flex items-center justify-center pt-6">
          <Button
            onClick={onLoadMore}
            variant="outline"
            className="border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white"
          >
            {t('search.results.loadMore')}
          </Button>
        </div>
      )}
    </div>
  );
} 