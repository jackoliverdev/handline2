'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Briefcase, Tag, Building } from 'lucide-react';

import { CaseStudyCard } from './case-study-card';
import { CaseStudy } from '@/lib/case-studies-service';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/lib/context/language-context';

interface CaseStudyGridProps {
  caseStudies: CaseStudy[];
  language: string;
}

export function CaseStudyGrid({ caseStudies, language }: CaseStudyGridProps) {
  const { t } = useLanguage();
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [industries, setIndustries] = useState<string[]>([]);

  // Extract unique tags and industries from case studies (localised)
  useEffect(() => {
    const allTags = caseStudies.flatMap((caseStudy) =>
      (caseStudy.tags_locales && caseStudy.tags_locales[language]) || caseStudy.tags || []
    );
    const uniqueTags = Array.from(new Set(allTags));
    setTags(uniqueTags);

    const allIndustries = caseStudies
      .map((caseStudy) => 
        (caseStudy.industry_locales && caseStudy.industry_locales[language]) || caseStudy.industry
      )
      .filter(Boolean) as string[];
    const uniqueIndustries = Array.from(new Set(allIndustries));
    setIndustries(uniqueIndustries);
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

  // Filter case studies based on search query, selected tags and industries (localised)
  const filteredCaseStudies = caseStudies.filter((caseStudy) => {
    const title = (caseStudy.title_locales && caseStudy.title_locales[language]) || caseStudy.title;
    const summary = (caseStudy.summary_locales && caseStudy.summary_locales[language]) || caseStudy.summary;
    const clientName = (caseStudy.client_name_locales && caseStudy.client_name_locales[language]) || caseStudy.client_name || '';
    
    const matchesSearch = title.toLowerCase().includes(searchQuery.toLowerCase()) ||
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
        id="case-study-articles"
        style={{ scrollMarginTop: "60px" }}
      >
        <div className="inline-flex items-center mb-6 rounded-full bg-brand-primary/10 px-4 py-1 text-sm border border-[#F28C38]/40 backdrop-blur-sm">
          <Briefcase className="mr-2 h-4 w-4 text-brand-primary" />
          <span className="text-brand-dark dark:text-white font-medium">
            {t('caseStudies.grid.badge')}
          </span>
        </div>
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-brand-dark dark:text-white">{t('caseStudies.grid.title')}</h2>
        <p className="mx-auto mt-4 text-lg text-brand-secondary dark:text-gray-300">
          {t('caseStudies.grid.description')}
        </p>
      </motion.div>

      {/* Filters and Search */}
      <div className="mb-10 space-y-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder={t('caseStudies.grid.searchPlaceholder')}
            className="pl-10 text-ui-md"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        {/* Tags filter */}
        <div>
          <h3 className="mb-2 text-sm font-medium text-brand-dark dark:text-white flex items-center">
            <Tag className="mr-2 h-4 w-4 text-brand-primary" />
            {t('caseStudies.grid.filterByTags')}
          </h3>
          <div className="flex flex-wrap gap-2">
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
          </div>
        </div>
        
        {/* Industries filter */}
        <div>
          <h3 className="mb-2 text-sm font-medium text-brand-dark dark:text-white flex items-center">
            <Building className="mr-2 h-4 w-4 text-brand-primary" />
            {t('caseStudies.grid.filterByIndustry')}
          </h3>
          <div className="flex flex-wrap gap-2">
            {industries.map((industry) => (
              <Badge
                key={industry}
                variant={selectedIndustries.includes(industry) ? 'default' : 'outline'}
                className="cursor-pointer text-ui-sm"
                onClick={() => toggleIndustry(industry)}
              >
                {industry}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {/* Results count */}
      <div className="mb-8">
        <p className="text-body-md text-muted-foreground">
          {t('caseStudies.grid.showing')} <span className="font-medium text-foreground">{filteredCaseStudies.length}</span> {t('caseStudies.grid.caseStudies')}
        </p>
      </div>

      {/* Case Studies Grid */}
      {filteredCaseStudies.length > 0 ? (
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {filteredCaseStudies.map((caseStudy, index) => (
            <CaseStudyCard key={caseStudy.slug} caseStudy={caseStudy} index={index} language={language} />
          ))}
        </motion.div>
      ) : (
        <div className="flex h-60 flex-col items-center justify-center rounded-xl border border-dashed text-center">
          <p className="text-heading-5 mb-2">{t('caseStudies.grid.noCaseStudies')}</p>
          <p className="text-body-md text-muted-foreground">{t('caseStudies.grid.noCaseStudiesDescription')}</p>
        </div>
      )}
    </section>
  );
} 