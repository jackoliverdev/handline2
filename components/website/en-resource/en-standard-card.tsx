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
      className="group relative overflow-hidden rounded-lg border bg-[#F5EFE0]/80 dark:bg-transparent shadow-sm transition-all duration-300 hover:shadow-md border-brand-primary/10 dark:border-brand-primary/20 backdrop-blur-sm dark:backdrop-blur-none"
    >
      {/* Featured Badge */}
      {standard.featured && (
        <Badge 
          className="absolute right-3 top-3 z-10 bg-brand-primary text-white"
        >
          Featured
        </Badge>
      )}
      
      {/* Standard Image */}
      <Link href={`/resources/en-resource-centre/${standard.slug}`} className="block overflow-hidden">
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-black dark:bg-black">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
            <span className="text-2xl text-white font-bold">{formattedCode}</span>
          </div>
        </div>
      </Link>
      
      {/* Standard Details */}
      <div className="p-4">
        <div className="mb-2 flex items-center justify-between">
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {tags.slice(0, 2).map((tag, idx) => (
                <Badge key={idx} variant="outline" className="text-xs border-brand-primary/30 text-brand-secondary dark:text-gray-300">
                  {tag}
                </Badge>
              ))}
              {tags.length > 2 && (
                <Badge variant="outline" className="text-xs border-brand-primary/30 text-brand-secondary dark:text-gray-300">
                  +{tags.length - 2}
                </Badge>
              )}
            </div>
          )}
        </div>
        
        <Link href={`/resources/en-resource-centre/${standard.slug}`}>
          <h3 className="mb-2 line-clamp-1 text-lg font-bold text-brand-dark hover:text-brand-primary dark:text-white dark:hover:text-brand-primary">
            {title}
          </h3>
        </Link>
        
        <p className="mb-3 text-sm text-brand-secondary dark:text-gray-300 line-clamp-2">
          {summary}
        </p>
        
        {/* Meta info */}
        <div className="mb-4 flex items-center text-sm text-brand-secondary dark:text-gray-300">
          <Shield className="mr-1 h-4 w-4 text-brand-primary" />
          <span className="truncate">{category}</span>
        </div>
        
        {/* Action Buttons */}
        <div className="mt-2 grid grid-cols-1 gap-2">
          <Button 
            variant="default" 
            size="sm" 
            className="flex items-center justify-between bg-brand-primary text-white hover:bg-brand-primary/90"
            asChild
          >
            <Link href={`/resources/en-resource-centre/${standard.slug}`}>
              <span>{t('standards.viewStandard')}</span>
              <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </Button>
          
          {standard.downloads && standard.downloads.length > 0 && (
            <Button
              variant="outline"
              size="sm"
              className="flex items-center justify-between border-brand-primary text-brand-primary hover:bg-brand-primary/10"
              asChild
            >
              <a href={standard.downloads[0].url} target="_blank" rel="noopener noreferrer">
                <span>{t('standards.download')}</span>
                <Download className="h-4 w-4 ml-1" />
              </a>
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
} 