"use client";

import React from "react";
import { BookOpen, FileText, ChevronRight, Users, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { motion } from "framer-motion";
import { useLanguage } from '@/lib/context/language-context';
import type { BlogPost } from '@/lib/blog-service';
import Image from "next/image";

const SPRING_CONFIG = { stiffness: 100, damping: 30, mass: 1 };

interface BlogHeroProps {
  language: string;
  blogPosts?: BlogPost[];
  searchQuery?: string;
  onSearchChange?: (value: string) => void;
}

export function BlogHero({ language, blogPosts = [], searchQuery = '', onSearchChange }: BlogHeroProps) {
  const { t } = useLanguage();
  const matches = (blogPosts || []).filter((post) => {
    if (!searchQuery) return false;
    const title = (post.title_locales && post.title_locales[language]) || post.title || '';
    const summary = (post.summary_locales && post.summary_locales[language]) || post.summary || '';
    const q = searchQuery.toLowerCase();
    return title.toLowerCase().includes(q) || summary.toLowerCase().includes(q);
  }).slice(0, 6);

  return (
    <section className="relative overflow-visible bg-[#F5EFE0]/80 dark:bg-transparent pt-28 pb-2 md:pt-32 md:pb-6">
      {/* Decorative Elements */}
      <div className="absolute -top-32 -right-32 h-[300px] w-[300px] md:h-[500px] md:w-[500px] rounded-full bg-brand-primary/5 blur-3xl dark:bg-brand-primary/10"></div>
      <div className="absolute -bottom-32 -left-32 h-[250px] w-[250px] md:h-[400px] md:w-[400px] rounded-full bg-brand-primary/10 blur-3xl dark:bg-brand-primary/5"></div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-primary/20 to-transparent"></div>

      <div className="container relative z-10 px-4 md:px-6">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={SPRING_CONFIG}
            className="mb-4 md:mb-6"
          >
            <div className="inline-flex items-center rounded-full border border-brand-primary px-3 py-1 md:px-4 md:py-1.5 text-xs md:text-sm backdrop-blur-sm">
              <FileText className="mr-1.5 h-3 w-3 md:h-4 md:w-4 text-brand-primary" />
              <span className="text-brand-dark dark:text-white font-medium">
                {t('blog.hero.badge')}
              </span>
            </div>
          </motion.div>

          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...SPRING_CONFIG, delay: 0.1 }}
            className="relative mb-4 md:mb-6"
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-brand-dark dark:text-white font-heading">
              {t('blog.hero.title')} <span className="text-brand-primary">{t('blog.hero.titleAccent')}</span>
            </h1>
          </motion.div>

          {/* Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...SPRING_CONFIG, delay: 0.2 }}
            className="mb-6 md:mb-10"
          >
            <p className="max-w-2xl text-base md:text-lg text-brand-secondary dark:text-gray-300">
              {t('blog.hero.description')}
            </p>
          </motion.div>

          {/* Stats removed as requested */}

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...SPRING_CONFIG, delay: 0.3 }}
            className="w-full max-w-2xl mb-6"
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder={t('blog.grid.searchPlaceholder')}
                className="pl-12 pr-4 h-12 bg-white dark:bg-black/50 border-gray-200 dark:border-gray-700 rounded-xl shadow-sm focus:shadow-md transition-all duration-200"
                value={searchQuery}
                onChange={(e) => onSearchChange?.(e.target.value)}
              />
              {searchQuery && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0"
                  onClick={() => onSearchChange?.('')}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
              {searchQuery && matches.length > 0 && (
                <div className="absolute left-0 right-0 mt-2 bg-white dark:bg-neutral-900 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden z-50">
                  <ul className="divide-y divide-gray-100 dark:divide-gray-800">
                    {matches.map((post) => {
                      const title = (post.title_locales && post.title_locales[language]) || post.title;
                      const image = post.featured_image_url || post.image_url || '/images/heroimg.png';
                      return (
                        <li key={post.slug}>
                          <Link href={`/resources/blog/${post.slug}`} className="flex items-center gap-3 p-3 hover:bg-gray-50 dark:hover:bg-neutral-800 transition-colors">
                            <div className="relative h-12 w-16 flex-shrink-0 overflow-hidden rounded-md bg-gray-100 dark:bg-neutral-800">
                              <Image src={image || '/images/heroimg.png'} alt={title} fill className="object-cover" />
                            </div>
                            <span className="text-sm font-medium text-brand-dark dark:text-white line-clamp-2 text-left">{title}</span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 