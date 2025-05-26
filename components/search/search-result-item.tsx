'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Clock, ExternalLink } from 'lucide-react';
import type { SearchSuggestion } from '@/lib/search-types';
import { useLanguage } from '@/lib/context/language-context';
import { cn } from '@/lib/utils';

interface SearchResultItemProps {
  result: SearchSuggestion;
  onClick?: () => void;
  variant?: 'dropdown' | 'page';
  className?: string;
}

const CONTENT_TYPE_COLORS = {
  product: 'bg-[#F28C38] text-white',
  industry_solution: 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200',
  blog: 'bg-green-100 dark:bg-green-800/30 text-green-800 dark:text-green-200', 
  case_study: 'bg-purple-100 dark:bg-purple-800/30 text-purple-800 dark:text-purple-200',
  career: 'bg-orange-100 dark:bg-orange-800/30 text-orange-800 dark:text-orange-200',
  en_resource: 'bg-amber-100 dark:bg-amber-800/30 text-amber-800 dark:text-amber-200'
} as const;

const CONTENT_TYPE_ICONS = {
  product: '🔧',
  industry_solution: '🏭', 
  blog: '📝',
  case_study: '📊',
  career: '💼',
  en_resource: '📋'
} as const;

export function SearchResultItem({ 
  result, 
  onClick, 
  variant = 'dropdown',
  className 
}: SearchResultItemProps) {
  const { t } = useLanguage();
  const router = useRouter();

  // Debug logging for image URLs
  console.log('SearchResultItem result:', {
    title: result.title,
    content_type: result.content_type,
    image_url: result.image_url,
    hasImageUrl: !!result.image_url,
    imageUrlType: typeof result.image_url
  });

  const contentTypeLabel = t(`search.contentTypes.${result.content_type}`);
  const contentTypeColor = CONTENT_TYPE_COLORS[result.content_type];
  const contentTypeIcon = CONTENT_TYPE_ICONS[result.content_type];

  const isDropdown = variant === 'dropdown';

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Call the onClick handler (parent handles navigation)
    if (onClick) {
      onClick();
    } else if (result.url) {
      // If no onClick handler provided, navigate to the URL directly
      router.push(result.url);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Call the onClick handler immediately on mousedown
    if (onClick) {
      onClick();
    } else if (result.url) {
      // If no onClick handler provided, navigate to the URL directly
      router.push(result.url);
    }
  };

  return (
    <div 
      onClick={handleClick}
      onMouseDown={handleMouseDown}
      className={cn(
        "group block transition-all duration-200 cursor-pointer",
        isDropdown ? [
          "p-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 border-b border-gray-100 dark:border-gray-700/50 last:border-b-0",
          "hover:shadow-sm"
        ] : [
          "p-4 bg-white dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700/50 hover:border-[#F28C38] dark:hover:border-[#F28C38]",
          "hover:shadow-md backdrop-blur-sm"
        ],
        className
      )}
    >
      <div className="flex items-start gap-3">
        {/* Image */}
        <div className={cn(
          "relative flex-shrink-0 bg-gray-100 dark:bg-gray-700/50 rounded-md overflow-hidden",
          isDropdown ? "w-12 h-12" : "w-16 h-16"
        )}>
          {result.image_url ? (
            <Image
              src={result.image_url}
              alt={result.title || result.suggestion || 'Search result'}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-200"
              sizes={isDropdown ? "48px" : "64px"}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400 dark:text-gray-500">
              <span className={cn(
                "text-center",
                isDropdown ? "text-lg" : "text-xl"
              )}>
                {contentTypeIcon}
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Content Type Badge */}
          <div className="flex items-center gap-2 mb-1">
            <Badge 
              variant="secondary"
              className={cn(
                "text-xs font-medium",
                contentTypeColor,
                isDropdown ? "px-2 py-0.5" : "px-2.5 py-1"
              )}
            >
              {contentTypeLabel}
            </Badge>
            {!isDropdown && (
              <ExternalLink className="w-3 h-3 text-gray-400 dark:text-gray-500 group-hover:text-[#F28C38] dark:group-hover:text-[#F28C38] transition-colors" />
            )}
          </div>

          {/* Title */}
          <h3 className={cn(
            "font-semibold text-gray-900 dark:text-white group-hover:text-[#F28C38] dark:group-hover:text-[#F28C38] transition-colors",
            "line-clamp-1",
            isDropdown ? "text-sm" : "text-base"
          )}>
            {result.title || result.suggestion || 'Search result'}
          </h3>

          {/* Description - only show on page variant */}
          {!isDropdown && result.description && (
            <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 mt-1">
              {result.description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
} 