'use client';

import { motion } from 'framer-motion';
import { FileText, Download, ArrowRight, Shield, Tag } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import type { EnStandard } from '@/lib/en-standard-service';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/lib/context/language-context';

interface EnStandardCardProps {
  standard: EnStandard;
  index: number;
  language: string;
}

export function EnStandardCard({ standard, index, language }: EnStandardCardProps) {
  const { t } = useLanguage();
  
  // Format the standard code for display
  const formattedCode = standard.standard_code || '';
  
  // Fallback image if image_url is null
  const imageUrl = standard.image_url || '/images/placeholder-standard.jpg';

  // Localised fields
  const title = (standard.title_locales && standard.title_locales[language]) || standard.title;
  const summary = (standard.summary_locales && standard.summary_locales[language]) || standard.summary;
  const category = (standard.category_locales && standard.category_locales[language]) || standard.category;
  const tags = (standard.tags_locales && standard.tags_locales[language]) || standard.tags || [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: Math.min(index * 0.1, 0.8),
        duration: 0.3,
      }}
      className="group relative overflow-hidden rounded-lg border bg-white dark:bg-black/50 shadow-sm transition-all duration-300 hover:shadow-lg border-gray-200 dark:border-gray-700 backdrop-blur-sm"
    >
      {/* Featured Badge */}
      {standard.featured && (
        <Badge 
          className="absolute right-2 top-2 z-10 bg-brand-primary text-white text-xs px-2 py-1"
        >
          Featured
        </Badge>
      )}
      
      {/* Standard Image */}
      <Link href={`/resources/en-resource-centre/${standard.slug}`} className="block overflow-hidden">
        <div className="relative aspect-square w-full overflow-hidden bg-gray-100 dark:bg-gray-800">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-contain transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
            <span className="text-xl font-bold text-white drop-shadow-lg">{formattedCode}</span>
          </div>
        </div>
      </Link>
      
      {/* Standard Details */}
      <div className="p-3">
        {/* Tags */}
        {tags && tags.length > 0 && (
          <div className="flex items-center gap-1 mb-2">
            {tags.slice(0, 1).map((tag, idx) => (
              <Badge key={idx} variant="outline" className="text-xs border-brand-primary/30 text-brand-primary bg-brand-primary/5 whitespace-nowrap">
                {tag}
              </Badge>
            ))}
            {tags.length > 1 && (
              <Badge variant="outline" className="text-xs border-gray-300 text-gray-600 whitespace-nowrap">
                +{tags.length - 1}
              </Badge>
            )}
          </div>
        )}
        
        <Link href={`/resources/en-resource-centre/${standard.slug}`}>
          <h3 className="mb-2 line-clamp-2 text-base font-bold text-gray-900 dark:text-white hover:text-brand-primary transition-colors">
            {title}
          </h3>
        </Link>
        
        <p className="mb-3 text-xs text-gray-600 dark:text-gray-300 line-clamp-2 leading-relaxed">
          {summary}
        </p>
        
        {/* Meta info */}
        <div className="mb-3 flex items-center text-xs text-gray-500 dark:text-gray-400">
          <Shield className="mr-1 h-3 w-3 text-brand-primary" />
          <span className="truncate">{category}</span>
        </div>
        
        {/* Action Buttons */}
        <div className="grid grid-cols-1 gap-1.5">
          <Button 
            variant="default" 
            size="sm" 
            className="h-8 text-xs bg-[#F28C38] text-white hover:bg-[#F28C38]/90 hover:shadow-lg hover:scale-105 transition-all duration-300 transform"
            asChild
          >
            <Link href={`/resources/en-resource-centre/${standard.slug}`} className="flex items-center justify-center">
              <span>{t('standards.viewStandard')}</span>
              <ArrowRight className="h-3 w-3 ml-1 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Button>
          
          {standard.downloads && standard.downloads.length > 0 && (
            <Button
              variant="outline"
              size="sm"
              className="h-8 text-xs border-brand-primary text-brand-primary hover:bg-white hover:text-brand-primary hover:border-brand-primary hover:shadow-lg hover:scale-105 transition-all duration-300 transform group"
              asChild
            >
              <a href={standard.downloads[0].url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
                <span>{t('standards.download')}</span>
                <Download className="h-3 w-3 ml-1 transition-transform duration-300 group-hover:translate-y-[-1px]" />
              </a>
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
} 