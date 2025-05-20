'use client';

import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowRight, MapPin, Briefcase, Building } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import type { CareerPost } from '@/lib/career-service';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/lib/context/language-context';

interface CareerCardProps {
  post: CareerPost;
  index: number;
  language: string;
}

export function CareerCard({ post, index, language }: CareerCardProps) {
  const { t } = useLanguage();
  
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
  const imageUrl = post.image_url || '/images/placeholder-career.jpg';

  // Check if the post is new (created within the last 7 days)
  const isNew = post.published_at 
    ? new Date(post.published_at).getTime() > Date.now() - (7 * 24 * 60 * 60 * 1000)
    : false;

  // Localised fields
  const title = (post.title_locales && post.title_locales[language]) || post.title;
  const description = (post.description_locales && post.description_locales[language]) || post.description;
  const location = (post.location_locales && post.location_locales[language]) || post.location;
  const department = (post.department_locales && post.department_locales[language]) || post.department;
  const jobType = (post.job_type_locales && post.job_type_locales[language]) || post.job_type;

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div
      variants={item}
      className="group relative overflow-hidden rounded-lg border bg-[#F5EFE0]/80 dark:bg-transparent shadow-sm transition-all duration-300 hover:shadow-md border-brand-primary/10 dark:border-brand-primary/20 backdrop-blur-sm dark:backdrop-blur-none"
    >
      {/* New Badge */}
      {isNew && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, x: 5 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.3 }}
          className="absolute right-3 top-3 z-10"
        >
          <Badge 
            className="bg-brand-primary text-white"
          >
            {t('careers.new')}
          </Badge>
        </motion.div>
      )}
      
      {/* Career Image */}
      <Link href={`/careers/${post.slug}`} className="block overflow-hidden">
        <motion.div 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative aspect-[16/9] w-full overflow-hidden bg-black dark:bg-black"
        >
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </motion.div>
      </Link>
      
      {/* Career Details */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        className="p-4"
      >
        <div className="mb-2 flex items-center justify-between">
          {jobType && (
            <Badge variant="outline" className="text-xs border-brand-primary/30 text-brand-secondary dark:text-gray-300">
              {jobType}
            </Badge>
          )}
        </div>
        
        <Link href={`/careers/${post.slug}`}>
          <h3 className="mb-2 line-clamp-1 text-lg font-bold text-brand-dark hover:text-brand-primary dark:text-white dark:hover:text-brand-primary">
            {title}
          </h3>
        </Link>
        
        <p className="mb-3 text-sm text-brand-secondary dark:text-gray-300 line-clamp-2">
          {description}
        </p>
        
        {/* Meta info */}
        <div className="mb-4 grid grid-cols-2 gap-2">
          <div className="flex items-center text-sm text-brand-secondary dark:text-gray-300">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, duration: 0.3 }}
            >
              <MapPin className="mr-1 h-4 w-4 text-brand-primary" />
            </motion.div>
            <span className="truncate">{location}</span>
          </div>
          <div className="flex items-center text-sm text-brand-secondary dark:text-gray-300">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.35, duration: 0.3 }}
            >
              <Building className="mr-1 h-4 w-4 text-brand-primary" />
            </motion.div>
            <span>{department}</span>
          </div>
        </div>
        
        {/* Action Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.3 }}
          className="mt-2 grid grid-cols-1 gap-2"
        >
          <Button 
            variant="default" 
            size="sm" 
            className="flex items-center justify-between bg-brand-primary text-white hover:bg-brand-primary/90 group"
            asChild
          >
            <Link href={`/careers/${post.slug}`}>
              <span>{t('careers.viewPosition')}</span>
              <motion.div
                initial={{ x: 0 }}
                whileHover={{ x: 3 }}
                transition={{ duration: 0.2 }}
              >
                <ArrowRight className="h-4 w-4 ml-1" />
              </motion.div>
            </Link>
          </Button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
} 