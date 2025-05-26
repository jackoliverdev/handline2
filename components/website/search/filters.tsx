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
  selectedCategory: string;
  sortBy: 'relevance' | 'newest' | 'alphabetical';
  onContentTypesChange: (contentTypes: ContentType[]) => void;
  onCategoryChange: (category: string) => void;
  onSortChange: (sort: 'relevance' | 'newest' | 'alphabetical') => void;
  totalResults: number;
  isLoading: boolean;
}

export function SearchFilters({
  selectedContentTypes,
  selectedCategory,
  sortBy,
  onContentTypesChange,
  onCategoryChange,
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

  // Category options - these would typically come from the API
  const categoryOptions = [
    { key: '', labelKey: 'search.filters.allCategories' },
    { key: 'Heat-Resistant Gloves', labelKey: 'search.categories.heatResistant' },
    { key: 'Cut-Resistant Gloves', labelKey: 'search.categories.cutResistant' },
    { key: 'General Purpose Gloves', labelKey: 'search.categories.generalPurpose' },
    { key: 'Industrial Swabs', labelKey: 'search.categories.industrialSwabs' },
    { key: 'Respiratory Protection', labelKey: 'search.categories.respiratory' },
    { key: 'industry', labelKey: 'search.categories.industry' },
    { key: 'blog', labelKey: 'search.categories.blog' },
    { key: 'case_study', labelKey: 'search.categories.caseStudy' },
    { key: 'career', labelKey: 'search.categories.career' },
    { key: 'en_resource', labelKey: 'search.categories.enResource' }
  ];

  // Sort options
  const sortOptions = [
    { key: 'relevance' as const, labelKey: 'search.sorting.relevance', icon: Grid3X3 },
    { key: 'newest' as const, labelKey: 'search.sorting.newest', icon: SortDesc },
    { key: 'alphabetical' as const, labelKey: 'search.sorting.alphabetical', icon: SortAsc }
  ];

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
    onCategoryChange('');
    onSortChange('relevance');
  };

  // Get active filters count
  const activeFiltersCount = selectedContentTypes.length + (selectedCategory ? 1 : 0);

  return (
    <div className="space-y-6">
      {/* Filters Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter className="h-5 w-5 text-brand-primary" />
          <h3 className="font-semibold text-gray-900 dark:text-white">
            {t('search.filters.title')}
          </h3>
          {activeFiltersCount > 0 && (
            <Badge variant="secondary" className="bg-brand-primary text-white">
              {activeFiltersCount}
            </Badge>
          )}
        </div>
        
        {/* Mobile toggle */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          className="lg:hidden"
        >
          <ChevronDown className={cn(
            "h-4 w-4 transition-transform",
            isExpanded && "rotate-180"
          )} />
        </Button>
      </div>

      {/* Clear filters */}
      {activeFiltersCount > 0 && (
        <Button
          variant="ghost"
          size="sm"
          onClick={clearAllFilters}
          className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
        >
          <X className="h-4 w-4 mr-1" />
          {t('search.filters.clearAll')}
        </Button>
      )}

      {/* Filters Content */}
      <div className={cn(
        "space-y-6",
        "lg:block", // Always show on desktop
        isExpanded ? "block" : "hidden" // Toggle on mobile
      )}>
        {/* Results Count */}
        <div className="text-sm text-gray-600 dark:text-gray-400">
          {isLoading ? (
            t('search.filters.loading')
          ) : (
            t('search.filters.resultsCount').replace('{count}', totalResults.toString())
          )}
        </div>

        {/* Sort Options */}
        <div className="space-y-3">
          <h4 className="font-medium text-gray-900 dark:text-white text-sm">
            {t('search.filters.sortBy.title')}
          </h4>
          <div className="space-y-2">
            {sortOptions.map((option) => {
              const Icon = option.icon;
              return (
                <button
                  key={option.key}
                  onClick={() => onSortChange(option.key)}
                  className={cn(
                    "w-full flex items-center gap-2 p-2 rounded-lg text-sm transition-colors text-left",
                    sortBy === option.key
                      ? "bg-brand-primary text-white"
                      : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span>{t(option.labelKey)}</span>
                  {sortBy === option.key && (
                    <Check className="h-4 w-4 ml-auto" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Content Types */}
        <div className="space-y-3">
          <h4 className="font-medium text-gray-900 dark:text-white text-sm">
            {t('search.filters.contentType')}
          </h4>
          <div className="space-y-2">
            {contentTypeOptions.map((option) => (
              <button
                key={option.key}
                onClick={() => handleContentTypeToggle(option.key)}
                className={cn(
                  "w-full flex items-center gap-2 p-2 rounded-lg text-sm transition-colors text-left",
                  selectedContentTypes.includes(option.key)
                    ? "bg-brand-primary text-white"
                    : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
                )}
              >
                <span className="text-base">{option.icon}</span>
                <span className="flex-1">{t(option.labelKey)}</span>
                {selectedContentTypes.includes(option.key) && (
                  <Check className="h-4 w-4" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Categories */}
        <div className="space-y-3">
          <h4 className="font-medium text-gray-900 dark:text-white text-sm">
            {t('search.filters.category')}
          </h4>
          <div className="space-y-1">
            {categoryOptions.map((option) => (
              <button
                key={option.key}
                onClick={() => onCategoryChange(option.key)}
                className={cn(
                  "w-full flex items-center justify-between p-2 rounded-lg text-sm transition-colors text-left",
                  selectedCategory === option.key
                    ? "bg-brand-primary text-white"
                    : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
                )}
              >
                <span>{t(option.labelKey)}</span>
                {selectedCategory === option.key && (
                  <Check className="h-4 w-4" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Applied Filters */}
        {activeFiltersCount > 0 && (
          <div className="space-y-3 pt-4 border-t border-gray-200 dark:border-gray-700">
            <h4 className="font-medium text-gray-900 dark:text-white text-sm">
              {t('search.filters.applied')}
            </h4>
            <div className="flex flex-wrap gap-2">
              {selectedContentTypes.map((type) => {
                const option = contentTypeOptions.find(opt => opt.key === type);
                return option ? (
                  <Badge
                    key={type}
                    variant="secondary"
                    className="bg-brand-primary text-white cursor-pointer hover:bg-brand-primary/90"
                    onClick={() => handleContentTypeToggle(type)}
                  >
                    <span className="mr-1">{option.icon}</span>
                    {t(option.labelKey)}
                    <X className="h-3 w-3 ml-1" />
                  </Badge>
                ) : null;
              })}
              {selectedCategory && (
                <Badge
                  variant="secondary"
                  className="bg-brand-primary text-white cursor-pointer hover:bg-brand-primary/90"
                  onClick={() => onCategoryChange('')}
                >
                  {t(categoryOptions.find(opt => opt.key === selectedCategory)?.labelKey || 'search.filters.category')}
                  <X className="h-3 w-3 ml-1" />
                </Badge>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 