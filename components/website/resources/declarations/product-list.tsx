'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Download, Search, Filter, X, Users, FileText } from 'lucide-react';
import { Product, localiseProduct } from '@/lib/products-service';
import { useLanguage } from '@/lib/context/language-context';
import { motion, AnimatePresence } from 'framer-motion';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';

interface ProductListProps {
  products: Product[];
}

export function ProductList({ products }: ProductListProps) {
  const { t, language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Localise all products
  const localizedProducts = products.map(product => localiseProduct(product, language));

  // Filter products that have a declaration sheet URL (declaration document)
  const productsWithDeclarations = localizedProducts.filter(product => product.declaration_sheet_url);

  // Extract unique categories
  const categories = useMemo(() => {
    const allCategories = productsWithDeclarations
      .map(product => product.category)
      .filter(Boolean) as string[];
    return Array.from(new Set(allCategories)).sort();
  }, [productsWithDeclarations]);

  // Handle category selection
  const toggleCategory = (category: string) => {
    setSelectedCategory(prev => prev === category ? null : category);
  };

  // Clear all filters
  const clearFilters = () => {
    setSelectedCategory(null);
    setSearchQuery('');
  };

  const activeFiltersCount = (selectedCategory ? 1 : 0);

  // Filter by search query and category
  const filteredProducts = useMemo(() => {
    return productsWithDeclarations.filter(product => {
      const matchesSearch = searchQuery === '' ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (product.short_description && product.short_description.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesCategory = selectedCategory === null || product.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [productsWithDeclarations, searchQuery, selectedCategory]);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="space-y-2">
      {/* Enhanced Search and Filters - Single Row */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mb-4"
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
                placeholder={t('declarations.grid.searchPlaceholder')}
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
            {categories.length > 0 && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="outline" 
                    className="h-12 px-4 bg-white dark:bg-black/50 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-black/20 whitespace-nowrap flex-shrink-0"
                  >
                    <Filter className="mr-2 h-4 w-4" />
                    {t('declarations.grid.filterByCategory')}
                    {selectedCategory && (
                      <Badge variant="secondary" className="ml-2 px-1.5 py-0.5 text-xs">
                        1
                      </Badge>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-64 max-h-80 overflow-y-auto">
                  <DropdownMenuLabel className="flex items-center">
                    <FileText className="mr-2 h-4 w-4" />
                    {t('declarations.grid.categories')}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {categories.map((category) => (
                    <DropdownMenuItem
                      key={category}
                      className={`cursor-pointer ${selectedCategory === category ? 'bg-brand-primary/10 text-brand-primary' : ''}`}
                      onClick={() => toggleCategory(category)}
                    >
                      <div className="flex items-center justify-between w-full">
                        <span>{category}</span>
                        {selectedCategory === category && (
                          <Badge variant="default" className="ml-2 h-5 w-5 p-0 rounded-full">
                            ✓
                          </Badge>
                        )}
                      </div>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>

          {/* Right Side - Results and Clear Filters */}
          <div className="flex items-center gap-3 flex-shrink-0">
            {/* Results Count */}
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-brand-primary" />
              <p className="text-lg font-medium text-gray-900 dark:text-white whitespace-nowrap">
                <span className="text-xl font-bold text-brand-primary">{filteredProducts.length}</span> {t('declarations.grid.declarations')}
                {searchQuery && (
                  <span className="text-gray-500 dark:text-gray-400 ml-2 hidden sm:inline">
                    {t('declarations.grid.searchFor')} "{searchQuery}"
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
                {t('declarations.grid.clearFilters')} ({activeFiltersCount})
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
                <FileText className="mr-1 h-3 w-3" />
                {selectedCategory}
                <X className="ml-1 h-3 w-3" />
              </Badge>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Products Grid */}
      <AnimatePresence mode="wait">
        {filteredProducts.length > 0 ? (
          <motion.div 
            key="grid"
            className="space-y-6"
            variants={container}
            initial="hidden"
            animate="show"
            exit="hidden"
          >
            {filteredProducts.map((product) => (
              <motion.div 
                key={product.id}
                className="rounded-xl bg-white dark:bg-black/50 border border-gray-100 dark:border-gray-700/50 shadow-lg hover:shadow-2xl transition-all duration-500 backdrop-blur-sm overflow-hidden group"
                variants={item}
              >
                <div className="flex gap-6 p-6">
                  {/* Product Image */}
                  <div className="relative flex-shrink-0 h-20 w-20 rounded-xl overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 border border-gray-200 dark:border-gray-600">
                    {product.image_url ? (
                      <Image
                        src={product.image_url}
                        alt={product.name}
                        fill
                        className="object-contain p-2"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center">
                        <FileText className="h-8 w-8 text-gray-400 dark:text-gray-500" />
                      </div>
                    )}
                  </div>
                
                  <div className="flex-grow flex flex-col">
                    {/* Title row with Category and Download button */}
                    <div className="flex items-center justify-between w-full mb-3">
                      <div className="flex items-center gap-4">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-brand-primary transition-colors duration-300">{product.name}</h3>
                        {product.category && (
                          <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-500/10 dark:text-orange-300 dark:border-orange-500/20">
                            {product.category}
                          </Badge>
                        )}
                      </div>
                      
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="bg-white dark:bg-black/50 border-brand-primary/30 text-brand-primary hover:bg-brand-primary hover:text-white dark:hover:bg-brand-primary transition-all duration-300 gap-2 shadow-sm hover:shadow-md"
                        asChild
                      >
                        <a href={product.declaration_sheet_url || '#'} target="_blank" rel="noopener noreferrer" download>
                          <span>{t('standards.download')}</span>
                          <Download className="h-4 w-4" />
                        </a>
                      </Button>
                    </div>
                    
                    {/* Description */}
                    {product.short_description && (
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                        {product.short_description}
                      </p>
                    )}
                  </div>
                </div>
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
              {t('declarations.grid.noDeclarations')}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md">
              {searchQuery || selectedCategory
                ? t('declarations.grid.noDeclarationsDescription')
                : t('declarations.grid.noDeclarationsAvailable')}
            </p>
            {activeFiltersCount > 0 && (
              <Button onClick={clearFilters} variant="outline">
                {t('declarations.grid.clearAllFilters')}
              </Button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 