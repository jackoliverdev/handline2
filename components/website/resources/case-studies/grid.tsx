'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, X, TrendingUp, Users, Award, Building2 } from 'lucide-react';

import { CaseStudyCard } from './case-study-card';
import { CaseStudy } from '@/lib/case-studies-service';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/lib/context/language-context';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';

interface CaseStudyGridProps {
  caseStudies: CaseStudy[];
  language: string;
}

export function CaseStudyGrid({ caseStudies, language }: CaseStudyGridProps) {
  const { t } = useLanguage();
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  // Extract unique tags and industries from case studies (localised)
  const { tags, industries } = useMemo(() => {
    const allTags = caseStudies.flatMap((caseStudy) =>
      (caseStudy.tags_locales && caseStudy.tags_locales[language]) || caseStudy.tags || []
    );
    const uniqueTags = Array.from(new Set(allTags)).sort();

    const allIndustries = caseStudies
      .map((caseStudy) => 
        (caseStudy.industry_locales && caseStudy.industry_locales[language]) || caseStudy.industry
      )
      .filter(Boolean) as string[];
    const uniqueIndustries = Array.from(new Set(allIndustries)).sort();

    return { tags: uniqueTags, industries: uniqueIndustries };
  }, [caseStudies, language]);

  // Handle tag selection
  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag)
        ? prev.filter((t) => t !== tag)
        : [...prev, tag]
    );
  };

  // Handle industry selection
  const toggleIndustry = (industry: string) => {
    setSelectedIndustries((prev) =>
      prev.includes(industry)
        ? prev.filter((i) => i !== industry)
        : [...prev, industry]
    );
  };

  // Clear all filters
  const clearFilters = () => {
    setSelectedTags([]);
    setSelectedIndustries([]);
    setSearchQuery('');
  };

  // Filter case studies based on search query, selected tags and industries (localised)
  const filteredCaseStudies = useMemo(() => {
    return caseStudies.filter((caseStudy) => {
      const title = (caseStudy.title_locales && caseStudy.title_locales[language]) || caseStudy.title;
      const summary = (caseStudy.summary_locales && caseStudy.summary_locales[language]) || caseStudy.summary;
      const clientName = (caseStudy.client_name_locales && caseStudy.client_name_locales[language]) || caseStudy.client_name || '';
      
      const matchesSearch = searchQuery === '' || 
        title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        clientName.toLowerCase().includes(searchQuery.toLowerCase());
      
      const caseStudyTags = (caseStudy.tags_locales && caseStudy.tags_locales[language]) || caseStudy.tags || [];
      const matchesTags = selectedTags.length === 0 ||
        (caseStudyTags && caseStudyTags.some(tag => selectedTags.includes(tag)));
      
      const caseStudyIndustry = (caseStudy.industry_locales && caseStudy.industry_locales[language]) || caseStudy.industry || '';
      const matchesIndustry = selectedIndustries.length === 0 ||
        selectedIndustries.includes(caseStudyIndustry);
      
      return matchesSearch && matchesTags && matchesIndustry;
    });
  }, [caseStudies, searchQuery, selectedTags, selectedIndustries, language]);

  const activeFiltersCount = selectedTags.length + selectedIndustries.length;

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
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-12 text-center"
        id="case-study-articles"
        style={{ scrollMarginTop: "60px" }}
      >
        <div className="inline-flex items-center mb-6 rounded-full bg-gradient-to-r from-brand-primary/10 to-brand-primary/10 px-6 py-2 text-sm border border-brand-primary/20 backdrop-blur-sm">
          <Award className="mr-2 h-4 w-4 text-brand-primary" />
          <span className="text-brand-dark dark:text-white font-medium bg-gradient-to-r from-brand-primary to-brand-primary bg-clip-text text-transparent">
            {t('caseStudies.grid.badge')}
          </span>
        </div>
        <h2 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-white dark:via-gray-100 dark:to-white bg-clip-text text-transparent">
          {t('caseStudies.grid.title')}
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
          {t('caseStudies.grid.description')}
        </p>
      </motion.div>

      {/* Enhanced Search and Filters - Single Row */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mb-10"
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
                placeholder={t('caseStudies.grid.searchPlaceholder')}
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
            
            {/* Filter Controls */}
            <div className="flex gap-3">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="outline" 
                    className="h-12 px-4 bg-white dark:bg-black/50 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-black/20 whitespace-nowrap flex-shrink-0"
                  >
                    <Filter className="mr-2 h-4 w-4" />
                    {t('caseStudies.grid.filterByIndustry')}
                    {selectedIndustries.length > 0 && (
                      <Badge variant="secondary" className="ml-2 px-1.5 py-0.5 text-xs">
                        {selectedIndustries.length}
                      </Badge>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-64 max-h-80 overflow-y-auto">
                  <DropdownMenuLabel className="flex items-center">
                    <Building2 className="mr-2 h-4 w-4" />
                    {t('caseStudies.grid.filterByIndustry')}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {industries.map((industry) => (
                    <DropdownMenuItem
                      key={industry}
                      className={`cursor-pointer ${selectedIndustries.includes(industry) ? 'bg-brand-primary/10 text-brand-primary' : ''}`}
                      onClick={() => toggleIndustry(industry)}
                    >
                      <div className="flex items-center justify-between w-full">
                        <span>{industry}</span>
                        {selectedIndustries.includes(industry) && (
                          <Badge variant="default" className="ml-2 h-5 w-5 p-0 rounded-full">
                            ✓
                          </Badge>
                        )}
                      </div>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="outline" 
                    className="h-12 px-4 bg-white dark:bg-black/50 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-black/20 whitespace-nowrap flex-shrink-0"
                  >
                    <TrendingUp className="mr-2 h-4 w-4" />
                    {t('caseStudies.grid.filterByTags')}
                    {selectedTags.length > 0 && (
                      <Badge variant="secondary" className="ml-2 px-1.5 py-0.5 text-xs">
                        {selectedTags.length}
                      </Badge>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-64 max-h-80 overflow-y-auto">
                  <DropdownMenuLabel>{t('caseStudies.grid.filterByTags')}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {tags.map((tag) => (
                    <DropdownMenuItem
                      key={tag}
                      className={`cursor-pointer ${selectedTags.includes(tag) ? 'bg-brand-primary/10 text-brand-primary' : ''}`}
                      onClick={() => toggleTag(tag)}
                    >
                      <div className="flex items-center justify-between w-full">
                        <span>{tag}</span>
                        {selectedTags.includes(tag) && (
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
          </div>

          {/* Right Side - Results and Clear Filters */}
          <div className="flex items-center gap-3 flex-shrink-0">
            {/* Results Count */}
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-brand-primary" />
              <p className="text-lg font-medium text-gray-900 dark:text-white whitespace-nowrap">
                <span className="text-xl font-bold text-brand-primary">{filteredCaseStudies.length}</span> {t('caseStudies.grid.caseStudies')}
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
                {t('caseStudies.grid.clearFilters')} ({activeFiltersCount})
                <X className="ml-1 h-4 w-4" />
              </Button>
            )}
          </div>
        </div>

        {/* Active Filters Display */}
        <AnimatePresence>
          {(selectedTags.length > 0 || selectedIndustries.length > 0) && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="flex flex-wrap gap-2"
            >
              {selectedIndustries.map((industry) => (
                <Badge
                  key={`industry-${industry}`}
                  variant="secondary"
                  className="bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-200 cursor-pointer"
                  onClick={() => toggleIndustry(industry)}
                >
                  <Building2 className="mr-1 h-3 w-3" />
                  {industry}
                  <X className="ml-1 h-3 w-3" />
                </Badge>
              ))}
              {selectedTags.map((tag) => (
                <Badge
                  key={`tag-${tag}`}
                  variant="secondary"
                  className="bg-brand-primary-100 text-brand-primary-800 border-brand-primary-200 hover:bg-brand-primary-200 cursor-pointer"
                  onClick={() => toggleTag(tag)}
                >
                  {tag}
                  <X className="ml-1 h-3 w-3" />
                </Badge>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Case Studies Grid */}
      <AnimatePresence mode="wait">
        {filteredCaseStudies.length > 0 ? (
          <motion.div
            key="grid"
            variants={container}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
          >
            {filteredCaseStudies.map((caseStudy, index) => (
              <motion.div key={caseStudy.slug} variants={item}>
                <CaseStudyCard caseStudy={caseStudy} index={index} language={language} />
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
              {t('caseStudies.grid.noCaseStudies')}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md">
              {t('caseStudies.grid.noCaseStudiesDescription')}
            </p>
            {activeFiltersCount > 0 && (
              <Button onClick={clearFilters} variant="outline">
                {t('caseStudies.grid.clearAllFilters')}
              </Button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
} 