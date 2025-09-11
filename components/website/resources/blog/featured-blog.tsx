'use client';

import { motion } from 'framer-motion';
import { Star, ArrowRight, User, Clock, Calendar } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import type { BlogPost } from '@/lib/blog-service';
import type { Language } from '@/lib/context/language-context';

interface FeaturedBlogProps {
  blog: BlogPost;
  language: Language;
  t: any;
}

export function FeaturedBlog({ blog, language, t }: FeaturedBlogProps) {
  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const getReadingTime = (content: string) => {
    const wordsPerMinute = 200;
    const wordCount = content.split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / wordsPerMinute);
    return readingTime;
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="py-16 bg-gradient-to-br from-brand-primary/5 via-transparent to-brand-primary/5"
    >
      <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center mb-4 rounded-full bg-gradient-to-r from-brand-primary/10 to-brand-primary/10 px-6 py-2 text-sm border border-brand-primary/20 backdrop-blur-sm"
          >
            <Star className="mr-2 h-4 w-4 text-brand-primary" />
            <span className="text-brand-dark dark:text-white font-medium">
              {t('blog.featuredArticle')}
            </span>
          </motion.div>
          <h2 className="text-3xl md:text-4xl font-bold text-brand-dark dark:text-white mb-4">
            {t('blog.featuredTitle')}
          </h2>
          <p className="text-lg text-brand-secondary dark:text-gray-300 max-w-2xl mx-auto">
            {t('blog.featuredDescription')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div>
              {/* Category Badge above title (derived from first tag or 'Other Insights') */}
              <div className="mb-3">
                <Badge className={`text-xs font-medium border px-2 py-1 rounded-full ${
                  (blog.tags && blog.tags[0] || '').toLowerCase().includes('innovation')
                    ? 'bg-[#F28C38]/10 text-[#F28C38] border-[#F28C38]/20'
                    : (blog.tags && blog.tags[0] || '').toLowerCase().includes('sustain')
                    ? 'bg-[#3BAA36]/10 text-[#3BAA36] border-[#3BAA36]/20'
                    : (blog.tags && blog.tags[0] || '').toLowerCase().includes('compliance') || (blog.tags && blog.tags[0] || '').toLowerCase().includes('safety')
                    ? 'bg-[#0F5B78]/10 text-[#0F5B78] border-[#0F5B78]/20'
                    : 'bg-gray-200/40 text-gray-700 dark:text-gray-200 dark:bg-gray-700/40 border-gray-300/40'
                }`}>
                  {(() => {
                    const first = ((blog.tags_locales && blog.tags_locales[language]) || blog.tags || [])[0] || '';
                    const f = first.toLowerCase();
                    if (f.includes('innovation')) return t('blog.categoriesBuckets.buckets.productsInnovation.title');
                    if (f.includes('sustain')) return t('blog.categoriesBuckets.buckets.industrySustainability.title');
                    if (f.includes('compliance') || f.includes('safety')) return t('blog.categoriesBuckets.buckets.safetyCompliance.title');
                    return t('blog.categoriesBuckets.buckets.other.title');
                  })()}
                </Badge>
              </div>
              <h3 className="text-2xl font-bold text-brand-dark dark:text-white mb-3">
                {(blog.title_locales && blog.title_locales[language]) || blog.title}
              </h3>
              <p className="text-brand-secondary dark:text-gray-300 leading-relaxed">
                {(blog.summary_locales && blog.summary_locales[language]) || blog.summary}
              </p>
            </div>
            
            <div className="flex items-center space-x-4 p-4 bg-white dark:bg-black/50 rounded-lg border border-brand-primary/10">
              <div className="flex flex-wrap items-center gap-4 text-sm text-brand-secondary dark:text-gray-300 w-full">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4" />
                  <span>{formatDate(blog.published_at)}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4" />
                  <span>{getReadingTime(blog.content)} {t('blog.minRead')}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <span>{blog.author}</span>
                </div>
              </div>
            </div>

            {blog.tags && blog.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {((blog.tags_locales && blog.tags_locales[language]) || blog.tags).slice(0, 3).map((tag: string, index: number) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-brand-primary/10 text-brand-primary dark:text-brand-primary border border-brand-primary/20 rounded-full text-xs font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
            
            <Button asChild className="group bg-gradient-to-r from-brand-primary to-brand-primary hover:from-brand-primary/90 hover:to-brand-primary/90">
              <Link href={`/resources/blog/${blog.slug}`} className="inline-flex items-center">
                {t('blog.readArticle')}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="aspect-[4/3] rounded-xl overflow-hidden shadow-xl">
              <img
                src={blog.featured_image_url || blog.image_url || ''}
                alt={(blog.title_locales && blog.title_locales[language]) || blog.title}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
} 