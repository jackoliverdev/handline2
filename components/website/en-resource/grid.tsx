'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, FileText, X, Shield } from 'lucide-react';

import { EnStandardCard } from './en-standard-card';
import { EnStandard, getAllEnCategories } from '@/lib/en-standard-service';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/lib/context/language-context';
import type { Language } from '@/lib/context/language-context';

interface EnStandardsGridProps {
  standards: EnStandard[];
  language: string;
}

export function EnStandardsGrid({ standards, language }: EnStandardsGridProps) {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [categories, setCategories] = useState<Array<{key: string, name: string}>>([]);

  // Fetch unique categories from standards
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesData = await getAllEnCategories(language as Language);
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error fetching categories:', error);
        // Fallback: Extract categories from current standards
        const allCategories = standards.map(standard => ({
          key: standard.category,
          name: standard.category_locales?.[language] || standard.category
        }));
        const uniqueCategories = Array.from(
          new Map(allCategories.map(item => [item.key, item])).values()
        );
        setCategories(uniqueCategories);
      }
    };
    
    fetchCategories();
  }, [standards, language]);

  // Handle category selection
  const toggleCategory = (category: string) => {
    setSelectedCategory(prev => prev === category ? null : category);
  };

  // Clear all filters
  const clearFilters = () => {
    setSelectedCategory(null);
    setSearchQuery('');
  };

  // Check if any filters are active
  const hasActiveFilters = selectedCategory !== null || searchQuery.length > 0;

  // Filter standards based on search query and selected category
  const filteredStandards = standards.filter((standard) => {
    const title = (standard.title_locales && standard.title_locales[language]) || standard.title;
    const summary = (standard.summary_locales && standard.summary_locales[language]) || standard.summary;
    const standardCode = standard.standard_code || '';
    
    const matchesSearch = title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      standardCode.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === null || standard.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
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
        id="standards-list"
        style={{ scrollMarginTop: "60px" }}
      >
        <div className="inline-flex items-center mb-6 rounded-full bg-brand-primary/10 px-4 py-1 text-sm border border-[#F28C38]/40 backdrop-blur-sm">
          <Shield className="mr-2 h-4 w-4 text-brand-primary" />
          <span className="text-brand-dark dark:text-white font-medium">
            {t('standards.grid.badge')}
          </span>
        </div>
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-brand-dark dark:text-white">{t('standards.grid.title')}</h2>
        <p className="mx-auto mt-4 text-lg text-brand-secondary dark:text-gray-300">
          {t('standards.grid.description')}
        </p>
      </motion.div>

      {/* Filters and Search */}
      <div className="mb-10 space-y-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder={t('standards.grid.searchPlaceholder')}
            className="pl-10 text-ui-md"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex-none font-medium text-brand-dark dark:text-white mr-2">
            {t('standards.grid.filterByCategory')}:
          </div>
          {categories.map((category) => (
            <Badge
              key={category.key}
              variant={selectedCategory === category.key ? 'default' : 'outline'}
              className="cursor-pointer text-ui-sm"
              onClick={() => toggleCategory(category.key)}
            >
              {category.name}
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
              {t('standards.grid.clearFilters')}
            </Button>
          )}
        </div>
      </div>

      {/* Results count */}
      <div className="mb-8">
        <p className="text-body-md text-muted-foreground">
          {t('standards.grid.showing')} <span className="font-medium text-foreground">{filteredStandards.length}</span> {t('standards.grid.standards')}
        </p>
      </div>

      {/* Standards Grid */}
      {filteredStandards.length > 0 ? (
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {filteredStandards.map((standard, index) => (
            <EnStandardCard key={standard.id} standard={standard} index={index} language={language} />
          ))}
        </motion.div>
      ) : (
        <div className="flex h-60 flex-col items-center justify-center rounded-xl border border-dashed text-center">
          <p className="text-heading-5 mb-2">{t('standards.grid.noStandards')}</p>
          <p className="text-body-md text-muted-foreground">{t('standards.grid.noStandardsDescription')}</p>
        </div>
      )}
    </section>
  );
} 