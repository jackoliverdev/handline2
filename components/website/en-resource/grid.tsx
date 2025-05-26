'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, FileText, X, Shield, Filter, Users } from 'lucide-react';

import { EnStandardCard } from './en-standard-card';
import { EnStandard, getAllEnCategories } from '@/lib/en-standard-service';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/lib/context/language-context';
import type { Language } from '@/lib/context/language-context';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';

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
  const activeFiltersCount = (selectedCategory ? 1 : 0);

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
        delayChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <section className="container py-8 md:py-12">
      {/* Enhanced Search and Filters - Single Row */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mb-10"
        id="standards-list"
        style={{ scrollMarginTop: "60px" }}
      >
        {/* Unified Search, Filters, and Results Row */}
        <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between mb-6">
          {/* Left Side - Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-3 flex-1">
            {/* Search Bar */}
            <div className="relative flex-[2]">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder={t('standards.grid.searchPlaceholder')}
                className="pl-12 pr-4 h-12 bg-white dark:bg-black/50 border-gray-200 dark:border-gray-700 rounded-xl shadow-sm focus:shadow-md transition-all duration-200"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0"
                  onClick={() => setSearchQuery('')}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
            
            {/* Categories Filter */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="outline" 
                  className="h-12 px-4 bg-white dark:bg-black/50 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-black/20 whitespace-nowrap flex-shrink-0"
                >
                  <Filter className="mr-2 h-4 w-4" />
                  Categories
                  {selectedCategory && (
                    <Badge variant="secondary" className="ml-2 px-1.5 py-0.5 text-xs">
                      1
                    </Badge>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-64 max-h-80 overflow-y-auto">
                <DropdownMenuLabel className="flex items-center">
                  <Shield className="mr-2 h-4 w-4" />
                  Categories
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {categories.map((category) => (
                  <DropdownMenuItem
                    key={category.key}
                    className={`cursor-pointer ${selectedCategory === category.key ? 'bg-brand-primary/10 text-brand-primary' : ''}`}
                    onClick={() => toggleCategory(category.key)}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span>{category.name}</span>
                      {selectedCategory === category.key && (
                        <Badge variant="default" className="ml-2 h-5 w-5 p-0 rounded-full">
                          ✓
                        </Badge>
                      )}
                    </div>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Right Side - Results and Clear Filters */}
          <div className="flex items-center gap-3 flex-shrink-0">
            {/* Results Count */}
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-brand-primary" />
              <p className="text-lg font-medium text-gray-900 dark:text-white whitespace-nowrap">
                <span className="text-xl font-bold text-brand-primary">{filteredStandards.length}</span> {t('standards.grid.standards')}
                {searchQuery && (
                  <span className="text-gray-500 dark:text-gray-400 ml-2 hidden sm:inline">
                    for "{searchQuery}"
                  </span>
                )}
              </p>
            </div>

            {/* Clear Filters */}
            {activeFiltersCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 whitespace-nowrap"
              >
                Clear ({activeFiltersCount})
                <X className="ml-1 h-4 w-4" />
              </Button>
            )}
          </div>
        </div>

        {/* Active Filters Display */}
        <AnimatePresence>
          {selectedCategory && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="flex flex-wrap gap-2"
            >
              <Badge
                variant="secondary"
                className="bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-200 cursor-pointer"
                onClick={() => toggleCategory(selectedCategory)}
              >
                <Shield className="mr-1 h-3 w-3" />
                {categories.find(cat => cat.key === selectedCategory)?.name}
                <X className="ml-1 h-3 w-3" />
              </Badge>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Standards Grid */}
      <AnimatePresence mode="wait">
        {filteredStandards.length > 0 ? (
          <motion.div
            key="grid"
            variants={container}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
          >
            {filteredStandards.map((standard, index) => (
              <motion.div key={standard.id} variants={item}>
                <EnStandardCard standard={standard} index={index} language={language} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="empty"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center justify-center py-20 px-6 text-center"
          >
            <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-full flex items-center justify-center mb-6">
              <Search className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {t('standards.grid.noStandards')}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md">
              {t('standards.grid.noStandardsDescription')}
            </p>
            {activeFiltersCount > 0 && (
              <Button onClick={clearFilters} variant="outline">
                Clear all filters
              </Button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
} 