'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Briefcase, Building, MapPin, X, Filter, Users } from 'lucide-react';

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
    setSelectedDepartments(() => []);
    setSelectedLocations(() => []);
    setSearchQuery(() => '');
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
    <section className="bg-[#F5EFE0]/80 dark:bg-background py-16">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
          id="career-positions"
          style={{ scrollMarginTop: "60px" }}
        >
          <div className="inline-flex items-center mb-4 rounded-full bg-brand-primary/10 px-4 py-2 text-sm border border-brand-primary/20">
            <Users className="mr-2 h-4 w-4 text-brand-primary" />
            <span className="text-brand-primary font-medium">
              {t('careers.grid.badge')}
            </span>
          </div>
          <h2 className="text-4xl font-bold tracking-tight text-brand-dark dark:text-white mb-4">
            {t('careers.grid.title')}
          </h2>
          <p className="mx-auto max-w-6xl text-lg text-brand-secondary dark:text-gray-300">
            {t('careers.grid.description')}
          </p>
        </motion.div>

        {/* Search and Filters Section */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white/90 dark:bg-transparent rounded-xl shadow-sm border border-brand-primary/20 dark:border-gray-700 p-6 mb-8 backdrop-blur-sm"
        >
          {/* Search Bar */}
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder={t('careers.grid.searchPlaceholder')}
              className="pl-12 h-12 text-base border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 focus:bg-white dark:focus:bg-gray-800"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          {/* Filters */}
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Department Filters */}
            <div className="flex-1">
              <div className="flex items-center mb-3">
                <Building className="mr-2 h-4 w-4 text-brand-primary" />
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                  {t('careers.grid.departments')}
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {departments.map((department, index) => (
                  <motion.div
                    key={department}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 + (index * 0.05) }}
                  >
                    <Badge
                      variant={selectedDepartments.includes(department) ? 'default' : 'outline'}
                      className={`cursor-pointer text-sm px-3 py-1 ${
                        selectedDepartments.includes(department)
                          ? 'bg-brand-primary text-white hover:bg-brand-primary/90'
                          : 'border-gray-300 text-gray-700 hover:border-brand-primary hover:text-brand-primary dark:border-gray-600 dark:text-gray-300'
                      }`}
                      onClick={() => toggleDepartment(department)}
                    >
                      {department}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </div>
            
            {/* Location Filters */}
            <div className="flex-1">
              <div className="flex items-center mb-3">
                <MapPin className="mr-2 h-4 w-4 text-brand-primary" />
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                  {t('careers.grid.locations')}
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {locations.map((location, index) => (
                  <motion.div
                    key={location}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.15 + (index * 0.05) }}
                  >
                    <Badge
                      variant={selectedLocations.includes(location) ? 'default' : 'outline'}
                      className={`cursor-pointer text-sm px-3 py-1 ${
                        selectedLocations.includes(location)
                          ? 'bg-brand-primary text-white hover:bg-brand-primary/90'
                          : 'border-gray-300 text-gray-700 hover:border-brand-primary hover:text-brand-primary dark:border-gray-600 dark:text-gray-300'
                      }`}
                      onClick={() => toggleLocation(location)}
                    >
                      {location}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Clear Filters */}
          {hasActiveFilters && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600"
            >
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={clearFilters}
                className="text-brand-primary hover:text-brand-primary/80 hover:bg-brand-primary/10"
              >
                <X className="mr-2 h-4 w-4" />
                {t('careers.grid.clearFilters')}
              </Button>
            </motion.div>
          )}
        </motion.div>

        {/* Results Summary */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="flex items-center justify-between mb-8"
        >
          <div className="flex items-center">
            <Briefcase className="mr-2 h-5 w-5 text-brand-primary" />
            <p className="text-lg font-medium text-brand-dark dark:text-white">
              {filteredPosts.length} {filteredPosts.length === 1 ? 'Position' : 'Positions'} Available
            </p>
          </div>
          {hasActiveFilters && (
            <p className="text-sm text-brand-secondary dark:text-gray-400">
              Filtered from {careerPosts.length} total positions
            </p>
          )}
        </motion.div>

        {/* Career Grid */}
        {filteredPosts.length > 0 ? (
          <motion.div
            key={`${selectedDepartments.length}-${selectedLocations.length}-${searchQuery.length}`}
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
          >
            {filteredPosts.map((post, index) => (
              <CareerCard key={post.slug} post={post} index={index} language={language} />
            ))}
          </motion.div>
        ) : (
          <motion.div
            key={`empty-${selectedDepartments.length}-${selectedLocations.length}-${searchQuery.length}`}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col items-center justify-center py-16 text-center"
          >
            <div className="bg-brand-primary/10 dark:bg-transparent rounded-full p-6 mb-6">
              <Briefcase className="h-12 w-12 text-brand-primary" />
            </div>
            <h3 className="text-xl font-semibold text-brand-dark dark:text-white mb-2">
              {t('careers.grid.noPositions')}
            </h3>
            <p className="text-brand-secondary dark:text-gray-300 max-w-md">
              {t('careers.grid.noPositionsDescription')}
            </p>
            {hasActiveFilters && (
              <Button 
                variant="outline" 
                onClick={clearFilters}
                className="mt-4 border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white"
              >
                Clear all filters
              </Button>
            )}
          </motion.div>
        )}
      </div>
    </section>
  );
} 