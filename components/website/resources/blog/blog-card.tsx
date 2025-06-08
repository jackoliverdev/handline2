'use client';

import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowRight, User, Tag } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import type { BlogPost } from '@/lib/blog-service';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/lib/context/language-context';

interface BlogCardProps {
  post: BlogPost;
  index: number;
  language: string;
}

export function BlogCard({ post, index, language }: BlogCardProps) {
  const { t } = useLanguage();
  // Calculate the reading time (approximately 200 words per minute)
  const wordCount = (post.content_locales && post.content_locales[language] ? post.content_locales[language] : post.content).split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / 200);
  
  // Format the date
  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat(language === 'it' ? 'it-IT' : 'en-GB', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };
  
  const formattedDate = post.published_at 
    ? formatDate(post.published_at)
    : formatDate(post.created_at);
  
  // Fallback image if image_url is null
  const imageUrl = post.image_url || '/images/placeholder-blog.jpg';

  // Check if the post is new (created within the last 14 days)
  const isNew = post.published_at 
    ? new Date(post.published_at).getTime() > Date.now() - (14 * 24 * 60 * 60 * 1000)
    : false;

  // Localised fields
  const title = (post.title_locales && post.title_locales[language]) || post.title;
  const summary = (post.summary_locales && post.summary_locales[language]) || post.summary;
  const tags = (post.tags_locales && post.tags_locales[language]) || post.tags || [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: Math.min(index * 0.1, 0.8),
        duration: 0.5,
        ease: [0.21, 0.47, 0.32, 0.98]
      }}
      className="group relative overflow-hidden rounded-2xl bg-white dark:bg-black/50 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-gray-700/50 backdrop-blur-sm h-full flex flex-col"
    >
      {/* New Badge */}
      {isNew && (
        <div className="absolute right-4 top-4 z-20">
          <Badge className="bg-gradient-to-r from-brand-primary to-brand-primary text-white font-medium px-3 py-1 shadow-lg">
            New
          </Badge>
        </div>
      )}
      
      {/* Blog Image */}
      <Link href={`/resources/blog/${post.slug}`} className="block overflow-hidden">
        <div className="relative aspect-[16/9] w-full overflow-hidden">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          <div className="absolute inset-0 bg-brand-primary/0 group-hover:bg-brand-primary/10 transition-colors duration-300" />
        </div>
      </Link>
      
      {/* Blog Details */}
      <div className="p-6 flex-1 flex flex-col space-y-4">
        {/* Tags */}
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.slice(0, 3).map((tag, idx) => (
              <Badge 
                key={idx} 
                variant="outline" 
                className="text-xs border-brand-primary/30 text-brand-primary bg-brand-primary/5 hover:bg-brand-primary/10 transition-colors"
              >
                {tag}
              </Badge>
            ))}
            {tags.length > 3 && (
              <Badge variant="outline" className="text-xs border-gray-300 text-gray-600">
                +{tags.length - 3}
              </Badge>
            )}
          </div>
        )}
        
        {/* Title */}
        <Link href={`/resources/blog/${post.slug}`}>
          <h3 className="text-xl font-bold leading-tight text-gray-900 dark:text-white hover:text-brand-primary dark:hover:text-brand-primary transition-colors duration-200 line-clamp-2 group-hover:text-brand-primary">
            {title}
          </h3>
        </Link>
        
        {/* Summary */}
        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed line-clamp-3 flex-1">
          {summary}
        </p>
        
        {/* Meta info */}
        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 pt-2 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="flex items-center">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-primary/10">
                <User className="h-4 w-4 text-brand-primary" />
              </div>
              <span className="ml-2 font-medium">{post.author}</span>
            </div>
          </div>
          <div className="flex items-center">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-primary/10">
              <Clock className="h-4 w-4 text-brand-primary" />
            </div>
            <span className="ml-2">{readingTime} min read</span>
          </div>
        </div>
        
        {/* CTA Button */}
        <Button 
          variant="default" 
          size="sm" 
          className="w-full mt-4 bg-brand-primary hover:bg-brand-primary/90 text-white font-medium transition-all duration-300 hover:scale-105 hover:shadow-xl transform"
          asChild
        >
          <Link href={`/resources/blog/${post.slug}`} className="flex items-center justify-center">
            <span>{t('blog.readArticle')}</span>
            <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </div>

      {/* Hover Effect Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/0 to-brand-primary/0 group-hover:from-brand-primary/5 group-hover:to-transparent transition-all duration-500 pointer-events-none rounded-2xl" />
    </motion.div>
  );
} 