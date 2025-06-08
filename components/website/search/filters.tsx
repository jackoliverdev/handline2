'use client';

import React, { useState } from 'react';
import { Filter, X, ChevronDown, Check, SortAsc, SortDesc, Grid3X3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/lib/context/language-context';
import type { ContentType } from '@/lib/search-types';
import { cn } from '@/lib/utils';

interface SearchFiltersProps {
  selectedContentTypes: ContentType[];
  sortBy: 'relevance' | 'newest' | 'alphabetical';
  sortDirection: 'asc' | 'desc';
  onContentTypesChange: (contentTypes: ContentType[]) => void;
  onSortChange: (sort: 'relevance' | 'newest' | 'alphabetical') => void;
  totalResults: number;
  isLoading: boolean;
}

export function SearchFilters({
  selectedContentTypes,
  sortBy,
  sortDirection,
  onContentTypesChange,
  onSortChange,
  totalResults,
  isLoading
}: SearchFiltersProps) {
  const { t } = useLanguage();
  const [isExpanded, setIsExpanded] = useState(false);

  // Content type options
  const contentTypeOptions: { key: ContentType; labelKey: string; icon: string }[] = [
    { key: 'product', labelKey: 'search.contentTypes.product', icon: '🔧' },
    { key: 'industry_solution', labelKey: 'search.contentTypes.industry_solution', icon: '🏭' },
    { key: 'blog', labelKey: 'search.contentTypes.blog', icon: '📝' },
    { key: 'case_study', labelKey: 'search.contentTypes.case_study', icon: '📊' },
    { key: 'career', labelKey: 'search.contentTypes.career', icon: '💼' },
    { key: 'en_resource', labelKey: 'search.contentTypes.en_resource', icon: '📋' }
  ];

  // Sort options
  const getSortOptions = () => [
    { key: 'relevance' as const, labelKey: 'search.sorting.relevance', icon: Grid3X3 },
    { 
      key: 'newest' as const, 
      labelKey: sortBy === 'newest' && sortDirection === 'desc' 
        ? 'search.sorting.oldest' 
        : 'search.sorting.newest', 
      icon: sortBy === 'newest' && sortDirection === 'desc' ? SortAsc : SortDesc,
      customLabel: sortBy === 'newest' 
        ? (sortDirection === 'desc' ? 'Oldest First' : 'Newest First')
        : undefined
    },
    { 
      key: 'alphabetical' as const, 
      labelKey: sortBy === 'alphabetical' && sortDirection === 'desc' 
        ? 'search.sorting.alphabeticalDesc' 
        : 'search.sorting.alphabetical', 
      icon: sortBy === 'alphabetical' && sortDirection === 'desc' ? SortDesc : SortAsc,
      customLabel: sortBy === 'alphabetical' 
        ? (sortDirection === 'desc' ? 'Z-A' : 'A-Z')
        : undefined
    }
  ];

  const sortOptions = getSortOptions();

  // Handle content type toggle
  const handleContentTypeToggle = (contentType: ContentType) => {
    if (selectedContentTypes.includes(contentType)) {
      onContentTypesChange(selectedContentTypes.filter(type => type !== contentType));
    } else {
      onContentTypesChange([...selectedContentTypes, contentType]);
    }
  };

  // Clear all filters
  const clearAllFilters = () => {
    onContentTypesChange([]);
    onSortChange('relevance');
  };

  // Get active filters count
  const activeFiltersCount = selectedContentTypes.length;

  return (
    <div className="sticky top-24">
      <div className="border border-gray-100 dark:border-gray-700/50 rounded-xl shadow-md">
        <div className="bg-white dark:bg-black/50 backdrop-blur-sm p-5">
          {/* Filters Header */}
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-brand-primary" />
              <h3 className="font-semibold text-brand-dark dark:text-white">
                {t('search.filters.title')}
              </h3>
              {activeFiltersCount > 0 && (
                <Badge className="bg-brand-primary text-white text-xs">
                  {activeFiltersCount}
                </Badge>
              )}
            </div>
            
            {/* Mobile toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="lg:hidden text-brand-primary hover:bg-brand-primary/10 h-7 w-7 p-0"
            >
              <ChevronDown className={cn(
                "h-4 w-4 transition-transform",
                isExpanded && "rotate-180"
              )} />
            </Button>
          </div>

          {/* Clear filters */}
          {activeFiltersCount > 0 && (
            <div className="mb-5">
              <Button
                variant="outline"
                size="sm"
                onClick={clearAllFilters}
                className="h-7 px-2 text-xs border-brand-primary/30 text-brand-primary hover:bg-brand-primary hover:text-white transition-all duration-200"
              >
                <X className="h-3 w-3 mr-1" />
                {t('search.filters.clearAll')}
              </Button>
            </div>
          )}

          {/* Filters Content */}
          <div className={cn(
            "space-y-5",
            "lg:block", // Always show on desktop
            isExpanded ? "block" : "hidden" // Toggle on mobile
          )}>
            {/* Results Count */}
            <div className="text-center p-3 bg-gray-50/80 dark:bg-gray-800/50 rounded-lg">
              <div className="text-sm text-brand-secondary dark:text-gray-400">
                {isLoading ? (
                  <div className="inline-flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-brand-primary/30 border-t-brand-primary rounded-full animate-spin"></div>
                    <span>{t('search.filters.loading')}</span>
                  </div>
                ) : (
                  <span>
                    <span className="text-lg font-bold text-brand-primary">{totalResults.toLocaleString()}</span> results found
                  </span>
                )}
              </div>
            </div>

            {/* Sort Options */}
            <div className="space-y-3">
              <div className="flex items-center gap-1 text-xs text-brand-primary font-medium">
                <SortAsc className="h-3 w-3" />
                {t('search.filters.sortBy.title')}
              </div>
              <div className="space-y-1.5">
                {sortOptions.map((option) => {
                  const Icon = option.icon;
                  const isSelected = sortBy === option.key;
                  return (
                    <button
                      key={option.key}
                      onClick={() => onSortChange(option.key)}
                      className={cn(
                        "w-full flex items-center gap-2 p-2.5 rounded-lg text-xs transition-all duration-200 text-left",
                        isSelected
                          ? "bg-brand-primary text-white shadow-sm"
                          : "hover:bg-gray-50 dark:hover:bg-gray-800/50 text-gray-700 dark:text-gray-300"
                      )}
                    >
                      <Icon className="h-3 w-3 flex-shrink-0" />
                      <span className="flex-1 font-medium">
                        {option.customLabel || t(option.labelKey)}
                      </span>
                      {isSelected && (
                        <Check className="h-3 w-3" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Content Types */}
            <div className="space-y-3">
              <div className="flex items-center gap-1 text-xs text-brand-primary font-medium">
                <span className="text-sm">📋</span>
                {t('search.filters.contentType')}
              </div>
              <div className="space-y-1.5">
                {contentTypeOptions.map((option) => {
                  const isSelected = selectedContentTypes.includes(option.key);
                  return (
                    <button
                      key={option.key}
                      onClick={() => handleContentTypeToggle(option.key)}
                      className={cn(
                        "w-full flex items-center gap-2 p-2.5 rounded-lg text-xs transition-all duration-200 text-left",
                        isSelected
                          ? "bg-brand-primary text-white shadow-sm"
                          : "hover:bg-gray-50 dark:hover:bg-gray-800/50 text-gray-700 dark:text-gray-300"
                      )}
                    >
                      <span className="text-sm flex-shrink-0">{option.icon}</span>
                      <span className="flex-1 font-medium">{t(option.labelKey)}</span>
                      {isSelected && (
                        <Check className="h-3 w-3" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Applied Filters */}
            {activeFiltersCount > 0 && (
              <div className="space-y-2 pt-3 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-1 text-xs text-brand-primary font-medium">
                  <span className="text-sm">🏷️</span>
                  Active
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {selectedContentTypes.map((type) => {
                    const option = contentTypeOptions.find(opt => opt.key === type);
                    return option ? (
                      <Badge
                        key={type}
                        variant="secondary"
                        className="bg-brand-primary text-white cursor-pointer hover:bg-brand-primary/90 transition-all duration-200 px-2 py-0.5 text-xs"
                        onClick={() => handleContentTypeToggle(type)}
                      >
                        <span className="mr-1">{option.icon}</span>
                        {t(option.labelKey)}
                        <X className="h-2 w-2 ml-1" />
                      </Badge>
                    ) : null;
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 