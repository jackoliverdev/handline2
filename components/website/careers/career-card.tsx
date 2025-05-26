'use client';

import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowRight, MapPin, Briefcase, Building, Euro } from 'lucide-react';
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
  const salaryRange = (post.salary_range_locales && post.salary_range_locales[language]) || post.salary_range;

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
      className="group relative overflow-hidden rounded-xl border bg-white dark:bg-black/50 shadow-lg hover:shadow-2xl transition-all duration-500 border-gray-100 dark:border-gray-700/50 backdrop-blur-sm"
    >
      {/* New Badge */}
      {isNew && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, x: 5 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.3 }}
          className="absolute right-4 top-4 z-10"
        >
          <Badge className="bg-green-500 text-white text-xs font-medium px-2 py-1">
            {t('careers.new')}
          </Badge>
        </motion.div>
      )}
      
      {/* Header Section */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        className="p-6 pb-4"
      >
        {/* Department Badge */}
        <div className="mb-3">
          <Badge variant="outline" className="text-xs font-medium border-brand-primary/20 text-brand-primary bg-brand-primary/5">
            {department}
          </Badge>
        </div>
        
        {/* Job Title */}
        <Link href={`/careers/${post.slug}`}>
          <h3 className="mb-3 text-xl font-bold text-gray-900 hover:text-brand-primary dark:text-white dark:hover:text-brand-primary transition-colors duration-200 line-clamp-2">
            {title}
          </h3>
        </Link>
        
        {/* Job Summary */}
        <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3 leading-relaxed mb-4">
          {description}
        </p>
      </motion.div>
      
      {/* Job Details */}
      <div className="px-6 pb-4">
        <div className="grid grid-cols-1 gap-3">
          {/* Location & Job Type */}
          <div className="flex items-center justify-between">
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
              <MapPin className="mr-2 h-4 w-4 text-brand-primary flex-shrink-0" />
              <span className="truncate">{location}</span>
            </div>
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
              <Clock className="mr-2 h-4 w-4 text-brand-primary flex-shrink-0" />
              <span>{jobType}</span>
            </div>
          </div>
          
          {/* Salary Range */}
          {salaryRange && (
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
              <Euro className="mr-2 h-4 w-4 text-brand-primary flex-shrink-0" />
              <span className="font-medium text-gray-700 dark:text-gray-300">{salaryRange}</span>
            </div>
          )}
        </div>
      </div>
      
      {/* Action Section */}
      <div className="px-6 pb-6">
        <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800">
          {/* Posted Date */}
          <div className="flex items-center text-xs text-gray-400 dark:text-gray-500">
            <Calendar className="mr-1 h-3 w-3" />
            <span>Posted {formattedDate}</span>
          </div>
          
          {/* Apply Button */}
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.3 }}
          >
            <Button 
              variant="outline" 
              size="sm" 
              className="border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white transition-all duration-200 group"
              asChild
            >
              <Link href={`/careers/${post.slug}`} className="flex items-center">
                <span className="text-sm font-medium">View Details</span>
                <motion.div
                  initial={{ x: 0 }}
                  whileHover={{ x: 2 }}
                  transition={{ duration: 0.2 }}
                >
                  <ArrowRight className="h-4 w-4 ml-1" />
                </motion.div>
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
} 