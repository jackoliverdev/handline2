'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Briefcase, Building, MapPin, X } from 'lucide-react';

import { CareerCard } from './career-card';
import { CareerPost } from '@/lib/career-service';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/lib/context/language-context';

interface CareerGridProps {
  careerPosts: CareerPost[];
  language: string;
}

export function CareerGrid({ careerPosts, language }: CareerGridProps) {
  const { t } = useLanguage();
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [departments, setDepartments] = useState<string[]>([]);
  const [locations, setLocations] = useState<string[]>([]);

  // Extract unique departments and locations from career posts (localised)
  useEffect(() => {
    const allDepartments = careerPosts.map((post) =>
      (post.department_locales && post.department_locales[language]) || post.department || ''
    ).filter(Boolean);
    
    const allLocations = careerPosts.map((post) =>
      (post.location_locales && post.location_locales[language]) || post.location || ''
    ).filter(Boolean);
    
    setDepartments(Array.from(new Set(allDepartments)));
    setLocations(Array.from(new Set(allLocations)));
  }, [careerPosts, language]);

  // Handle department selection
  const toggleDepartment = (department: string) => {
    setSelectedDepartments((prev) =>
      prev.includes(department)
        ? prev.filter((d) => d !== department)
        : [...prev, department]
    );
  };

  // Handle location selection
  const toggleLocation = (location: string) => {
    setSelectedLocations((prev) =>
      prev.includes(location)
        ? prev.filter((l) => l !== location)
        : [...prev, location]
    );
  };

  // Clear all filters
  const clearFilters = () => {
    setSelectedDepartments([]);
    setSelectedLocations([]);
    setSearchQuery('');
  };

  // Check if any filters are active
  const hasActiveFilters = selectedDepartments.length > 0 || selectedLocations.length > 0 || searchQuery.length > 0;

  // Filter career posts based on search query, departments and locations (localised)
  const filteredPosts = careerPosts.filter((post) => {
    const title = (post.title_locales && post.title_locales[language]) || post.title;
    const description = (post.description_locales && post.description_locales[language]) || post.description;
    const matchesSearch = title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const department = (post.department_locales && post.department_locales[language]) || post.department || '';
    const matchesDepartment = selectedDepartments.length === 0 || selectedDepartments.includes(department);
    
    const location = (post.location_locales && post.location_locales[language]) || post.location || '';
    const matchesLocation = selectedLocations.length === 0 || selectedLocations.includes(location);
    
    return matchesSearch && matchesDepartment && matchesLocation;
  });

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="container py-8 md:py-12">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-10 text-center"
        id="career-positions"
        style={{ scrollMarginTop: "60px" }}
      >
        <div className="inline-flex items-center mb-6 rounded-full bg-brand-primary/10 px-4 py-1 text-sm border border-[#F28C38]/40 backdrop-blur-sm">
          <Briefcase className="mr-2 h-4 w-4 text-brand-primary" />
          <span className="text-brand-dark dark:text-white font-medium">
            {t('careers.grid.badge')}
          </span>
        </div>
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-brand-dark dark:text-white">{t('careers.grid.title')}</h2>
        <p className="mx-auto mt-4 text-lg text-brand-secondary dark:text-gray-300">
          {t('careers.grid.description')}
        </p>
      </motion.div>

      {/* Filters and Search */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mb-10 space-y-6"
      >
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder={t('careers.grid.searchPlaceholder')}
            className="pl-10 text-ui-md"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        {/* Filters row */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="flex flex-wrap items-start gap-x-8 gap-y-4"
        >
          {/* Department filters */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-brand-dark dark:text-white flex items-center">
              <Building className="mr-2 h-4 w-4 text-brand-primary" />
              {t('careers.grid.departments')}
            </h3>
            <div className="flex flex-wrap items-center gap-2">
              {departments.map((department, index) => (
                <motion.div
                  key={department}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + (index * 0.05) }}
                >
                  <Badge
                    variant={selectedDepartments.includes(department) ? 'default' : 'outline'}
                    className="cursor-pointer text-ui-sm"
                    onClick={() => toggleDepartment(department)}
                  >
                    {department}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* Location filters */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-brand-dark dark:text-white flex items-center">
              <MapPin className="mr-2 h-4 w-4 text-brand-primary" />
              {t('careers.grid.locations')}
            </h3>
            <div className="flex flex-wrap items-center gap-2">
              {locations.map((location, index) => (
                <motion.div
                  key={location}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 + (index * 0.05) }}
                >
                  <Badge
                    variant={selectedLocations.includes(location) ? 'default' : 'outline'}
                    className="cursor-pointer text-ui-sm"
                    onClick={() => toggleLocation(location)}
                  >
                    {location}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
        
        {hasActiveFilters && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={clearFilters}
              className="ml-2 text-brand-primary hover:text-brand-primary/80 hover:bg-brand-primary/10"
            >
              <X className="mr-1 h-4 w-4" />
              {t('careers.grid.clearFilters')}
            </Button>
          </motion.div>
        )}
      </motion.div>

      {/* Results count */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3, delay: 0.5 }}
        className="mb-8"
      >
        <p className="text-body-md text-muted-foreground">
          {t('careers.grid.showing')} <span className="font-medium text-foreground">{filteredPosts.length}</span> {t('careers.grid.positions')}
        </p>
      </motion.div>

      {/* Career Grid */}
      {filteredPosts.length > 0 ? (
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {filteredPosts.map((post, index) => (
            <CareerCard key={post.slug} post={post} index={index} language={language} />
          ))}
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex h-60 flex-col items-center justify-center rounded-xl border border-dashed text-center"
        >
          <p className="text-heading-5 mb-2">{t('careers.grid.noPositions')}</p>
          <p className="text-body-md text-muted-foreground">{t('careers.grid.noPositionsDescription')}</p>
        </motion.div>
      )}
    </section>
  );
} 