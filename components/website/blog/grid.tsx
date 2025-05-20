'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, BookOpen, Tag, X } from 'lucide-react';

import { BlogCard } from './blog-card';
import { BlogPost } from '@/lib/blog-service';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/lib/context/language-context';

interface BlogGridProps {
  blogPosts: BlogPost[];
  language: string;
}

export function BlogGrid({ blogPosts, language }: BlogGridProps) {
  const { t } = useLanguage();
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [tags, setTags] = useState<string[]>([]);

  // Extract unique tags from blog posts (localised)
  useEffect(() => {
    const allTags = blogPosts.flatMap((post) =>
      (post.tags_locales && post.tags_locales[language]) || post.tags || []
    );
    const uniqueTags = Array.from(new Set(allTags));
    setTags(uniqueTags);
  }, [blogPosts, language]);

  // Handle tag selection
  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag)
        ? prev.filter((t) => t !== tag)
        : [...prev, tag]
    );
  };

  // Clear all filters
  const clearFilters = () => {
    setSelectedTags([]);
    setSearchQuery('');
  };

  // Check if any filters are active
  const hasActiveFilters = selectedTags.length > 0 || searchQuery.length > 0;

  // Filter blog posts based on search query and selected tags (localised)
  const filteredPosts = blogPosts.filter((post) => {
    const title = (post.title_locales && post.title_locales[language]) || post.title;
    const summary = (post.summary_locales && post.summary_locales[language]) || post.summary;
    const matchesSearch = title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      summary.toLowerCase().includes(searchQuery.toLowerCase());
    const postTags = (post.tags_locales && post.tags_locales[language]) || post.tags || [];
    const matchesTags = selectedTags.length === 0 ||
      (postTags && postTags.some(tag => selectedTags.includes(tag)));
    return matchesSearch && matchesTags;
  });

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <section className="container py-8 md:py-12">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-10 text-center"
        id="blog-articles"
        style={{ scrollMarginTop: "60px" }}
      >
        <div className="inline-flex items-center mb-6 rounded-full bg-brand-primary/10 px-4 py-1 text-sm border border-[#F28C38]/40 backdrop-blur-sm">
          <BookOpen className="mr-2 h-4 w-4 text-brand-primary" />
          <span className="text-brand-dark dark:text-white font-medium">
            {t('blog.grid.badge')}
          </span>
        </div>
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-brand-dark dark:text-white">{t('blog.grid.title')}</h2>
        <p className="mx-auto mt-4 text-lg text-brand-secondary dark:text-gray-300">
          {t('blog.grid.description')}
        </p>
      </motion.div>

      {/* Filters and Search */}
      <div className="mb-10 space-y-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder={t('blog.grid.searchPlaceholder')}
            className="pl-10 text-ui-md"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {tags.map((tag) => (
            <Badge
              key={tag}
              variant={selectedTags.includes(tag) ? 'default' : 'outline'}
              className="cursor-pointer text-ui-sm"
              onClick={() => toggleTag(tag)}
            >
              {tag}
            </Badge>
          ))}
          
          {hasActiveFilters && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={clearFilters}
              className="ml-2 text-brand-primary hover:text-brand-primary/80 hover:bg-brand-primary/10"
            >
              <X className="mr-1 h-4 w-4" />
              {t('blog.grid.clearFilters')}
            </Button>
          )}
        </div>
      </div>

      {/* Results count */}
      <div className="mb-8">
        <p className="text-body-md text-muted-foreground">
          {t('blog.grid.showing')} <span className="font-medium text-foreground">{filteredPosts.length}</span> {t('blog.grid.articles')}
        </p>
      </div>

      {/* Blog Grid */}
      {filteredPosts.length > 0 ? (
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {filteredPosts.map((post, index) => (
            <BlogCard key={post.slug} post={post} index={index} language={language} />
          ))}
        </motion.div>
      ) : (
        <div className="flex h-60 flex-col items-center justify-center rounded-xl border border-dashed text-center">
          <p className="text-heading-5 mb-2">{t('blog.grid.noArticles')}</p>
          <p className="text-body-md text-muted-foreground">{t('blog.grid.noArticlesDescription')}</p>
        </div>
      )}
    </section>
  );
} 