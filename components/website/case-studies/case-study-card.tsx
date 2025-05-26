'use client';

import { motion } from 'framer-motion';
import { Calendar, ArrowRight, User, Tag, Briefcase, Building, TrendingUp, Award, Quote, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import type { CaseStudy } from '@/lib/case-studies-service';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/lib/context/language-context';

interface CaseStudyCardProps {
  caseStudy: CaseStudy;
  index: number;
  language: string;
}

export function CaseStudyCard({ caseStudy, index, language }: CaseStudyCardProps) {
  const { t } = useLanguage();
  
  // Format the date
  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat(language === 'it' ? 'it-IT' : 'en-GB', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  };
  
  const formattedDate = caseStudy.published_at 
    ? formatDate(caseStudy.published_at)
    : formatDate(caseStudy.created_at);
  
  // Use featured_image_url if available, fallback to image_url
  const imageUrl = caseStudy.featured_image_url || caseStudy.image_url || '/images/placeholder-case-study.jpg';

  // Check if the case study is new (created within the last 30 days)
  const isNew = caseStudy.published_at 
    ? new Date(caseStudy.published_at).getTime() > Date.now() - (30 * 24 * 60 * 60 * 1000)
    : false;

  // Localised fields
  const title = (caseStudy.title_locales && caseStudy.title_locales[language]) || caseStudy.title;
  const summary = (caseStudy.summary_locales && caseStudy.summary_locales[language]) || caseStudy.summary;
  const tags = (caseStudy.tags_locales && caseStudy.tags_locales[language]) || caseStudy.tags || [];
  const clientName = (caseStudy.client_name_locales && caseStudy.client_name_locales[language]) || caseStudy.client_name;
  const industry = (caseStudy.industry_locales && caseStudy.industry_locales[language]) || caseStudy.industry;
  const challenge = (caseStudy.challenge_locales && caseStudy.challenge_locales[language]) || caseStudy.challenge;
  const results = (caseStudy.results_locales && caseStudy.results_locales[language]) || caseStudy.results;

  // Extract key metrics if available
  const metrics = caseStudy.metrics_locales?.[language] || caseStudy.metrics;
  const keyMetrics = metrics ? Object.entries(metrics).slice(0, 2) : [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: Math.min(index * 0.1, 0.8),
        duration: 0.5,
        ease: [0.21, 0.47, 0.32, 0.98]
      }}
      className="group relative overflow-hidden rounded-2xl bg-white dark:bg-black/50 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-gray-700/50 backdrop-blur-sm"
    >
      {/* New Badge */}
      {isNew && (
        <div className="absolute right-4 top-4 z-20">
          <Badge className="bg-gradient-to-r from-brand-primary to-orange-500 text-white font-medium px-3 py-1 shadow-lg">
            New
          </Badge>
        </div>
      )}
      
      {/* Hero Image Section */}
      <div className="relative h-64 overflow-hidden">
        <Link href={`/resources/case-studies/${caseStudy.slug}`} className="block h-full">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          <div className="absolute inset-0 bg-brand-primary/0 group-hover:bg-brand-primary/10 transition-colors duration-300" />
        </Link>
        
        {/* Industry Badge on Image */}
        <div className="absolute bottom-4 left-4">
          <Badge variant="secondary" className="bg-white/90 backdrop-blur-sm text-gray-900 border-0 font-medium px-3 py-1.5">
            <Building className="h-3 w-3 mr-1.5" />
            {industry}
          </Badge>
        </div>

        {/* Client Logo */}
        {caseStudy.client_logo_url && (
          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-2">
            <div className="relative h-8 w-20">
              <Image
                src={caseStudy.client_logo_url}
                alt={clientName || ''}
                fill
                className="object-contain"
              />
            </div>
          </div>
        )}
      </div>
      
      {/* Content Section */}
      <div className="p-6 space-y-4">
        {/* Tags */}
        {tags && tags.length > 0 && (
          <div className="flex items-center gap-2 overflow-hidden">
            {tags.slice(0, 1).map((tag, idx) => (
              <Badge 
                key={idx} 
                variant="outline" 
                className="text-xs border-brand-primary/30 text-brand-primary bg-brand-primary/5 hover:bg-brand-primary/10 transition-colors whitespace-nowrap"
              >
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
        
        {/* Title */}
        <div className="pt-2">
          <Link href={`/resources/case-studies/${caseStudy.slug}`}>
            <h3 className="text-xl font-bold leading-tight text-gray-900 dark:text-white hover:text-brand-primary dark:hover:text-brand-primary transition-colors duration-200 line-clamp-2 group-hover:text-brand-primary">
              {title}
            </h3>
          </Link>
        </div>
        
        {/* Summary */}
        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed line-clamp-3">
          {summary}
        </p>

        {/* Challenge Preview */}
        {challenge && (
          <div className="bg-gray-50 dark:bg-black/50 rounded-lg p-3 border-l-4 border-brand-primary">
            <h4 className="text-xs font-semibold text-brand-primary mb-1 uppercase tracking-wide">Challenge</h4>
            <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2">{challenge}</p>
          </div>
        )}
        
        {/* Client Info */}
        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 pt-2 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="flex items-center">
              <Briefcase className="h-4 w-4 mr-1.5 text-brand-primary" />
              <span className="font-medium">{clientName}</span>
            </div>
          </div>
          {formattedDate && (
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1.5 text-brand-primary" />
              <span>{formattedDate}</span>
            </div>
          )}
        </div>
        
        {/* CTA Button */}
        <Button 
          variant="default" 
          size="sm" 
          className="w-full mt-4 bg-gradient-to-r from-brand-primary to-orange-500 hover:from-brand-primary/90 hover:to-orange-500/90 text-white font-medium transition-all duration-300 group-hover:shadow-lg"
          asChild
        >
          <Link href={`/resources/case-studies/${caseStudy.slug}`} className="flex items-center justify-center">
            <span>Read Case Study</span>
            <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </div>

      {/* Hover Effect Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/0 to-brand-primary/0 group-hover:from-brand-primary/5 group-hover:to-transparent transition-all duration-500 pointer-events-none rounded-2xl" />
    </motion.div>
  );
} 