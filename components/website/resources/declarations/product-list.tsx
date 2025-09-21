'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Download, Search, Filter, X, Users, FileText, ChevronDown } from 'lucide-react';
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ProductListProps {
  products: Product[];
}

export function ProductList({ products }: ProductListProps) {
  const { t, language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  // Document locale selector (defaults to ALL)
  const [docLanguage, setDocLanguage] = useState<string>('all');

  // Manual mapping of locale codes to labels for the filter dropdown
  const DECLARATION_FILTERS: { value: string; label: string }[] = [
    { value: 'en-GB', label: 'GB English' },
    { value: 'de-DE', label: 'DE Deutsch' },
    { value: 'fr-FR', label: 'FR Français' },
    { value: 'it-IT', label: 'IT Italiano' },
    { value: 'lv-LV', label: 'LV Latviešu' },
    { value: 'hu-HU', label: 'HU Magyar' },
    { value: 'bg-BG', label: 'BG Български' },
    { value: 'cs-CZ', label: 'CS Čeština' },
    { value: 'da-DK', label: 'DA Dansk' },
    { value: 'el-GR', label: 'EL Ελληνικά' },
    { value: 'es-ES', label: 'ES Español' },
    { value: 'et-EE', label: 'ET Eesti' },
    { value: 'fi-FI', label: 'FI Suomi' },
    { value: 'hr-HR', label: 'HR Hrvatski' },
    { value: 'lt-LT', label: 'LT Lietuvių' },
    { value: 'nl-NL', label: 'NL Nederlands' },
    { value: 'pl-PL', label: 'PL Polski' },
    { value: 'pt-PT', label: 'PT Português' },
    { value: 'ro-RO', label: 'RO Română' },
    { value: 'sk-SK', label: 'SK Slovenčina' },
    { value: 'sl-SI', label: 'SL Slovenščina' },
    { value: 'sv-SE', label: 'SV Svenska' },
  ];

  // Translated ALL option label
  const ALL_OPTION = { value: 'all', label: t('declarations.grid.allLanguages') } as const;

  // Utilities that ONLY use the new declaration_docs_locales JSON with locale codes (e.g. 'en-GB')
  const getProductLocales = (product: Product): string[] => {
    const entries = Array.isArray((product as any).declaration_docs_locales)
      ? (product as any).declaration_docs_locales
      : [];
    return entries
      .filter((e: any) => e && e.kind === 'eu' && typeof e.locale === 'string' && e.locale.trim().length > 0)
      .map((e: any) => e.locale);
  };

  const getJsonDocUrl = (product: Product, localeCode: string): string | null => {
    const entries = Array.isArray((product as any).declaration_docs_locales)
      ? (product as any).declaration_docs_locales
      : [];
    const exact = entries.find((e: any) => e && e.kind === 'eu' && e.locale === localeCode);
    return exact ? exact.url : null;
  };

  // Exact-match only (no English fallback) for filtering and primary button state
  const getJsonDocUrlExact = (product: Product, localeCode: string): string | null => {
    return getJsonDocUrl(product, localeCode);
  };

  const getUkcaUrl = (product: Product): string | null => {
    // Only use the dedicated column now
    return (product as any).ukca_declaration_url || null;
  };

  // Build available locales per product when needed (not used for the main filter)
  // Kept as a helper if we want to highlight availability, but the main filter is manual

  // Localise all products
  const localizedProducts = products.map(product => localiseProduct(product, language));

  // Filter products that have at least one EU doc in JSON
  const productsWithDeclarations = localizedProducts.filter(product => getProductLocales(product).length > 0);

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

  // Filter by search query, category, and selected document language (exact only)
  const filteredProducts = useMemo(() => {
    return productsWithDeclarations.filter(product => {
      const matchesSearch = searchQuery === '' ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (product.short_description && product.short_description.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesCategory = selectedCategory === null || product.category === selectedCategory;
      const matchesLanguage = docLanguage === 'all' || getJsonDocUrlExact(product, docLanguage) !== null;
      
      return matchesSearch && matchesCategory && matchesLanguage;
    });
  }, [productsWithDeclarations, searchQuery, selectedCategory, docLanguage]);

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

  // Helpers
  const getEuDeclarationUrl = (product: Product, localeCode: string | undefined): string | null => getJsonDocUrl(product, localeCode || 'en-GB');

  // UKCA button strictly uses the dedicated column
  const getUkDeclarationUrl = (product: Product): string | null => getUkcaUrl(product);

  // Determine preferred locale for EU DoC when top filter is "All"
  const getPreferredLocaleForProduct = (product: Product): string => {
    const locales = getProductLocales(product);
    const ordered = language === 'it' ? ['it-IT', 'en-GB'] : ['en-GB', 'it-IT'];
    for (const loc of ordered) {
      if (locales.includes(loc)) return loc;
    }
    return locales[0] || 'en-GB';
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
          {/* Left Side - Language, Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-3 flex-1">
            {/* Language/Locale Selector */}
            <div className="flex-1 sm:flex-none sm:w-56">
              <Select value={docLanguage} onValueChange={setDocLanguage}>
                <SelectTrigger className="h-12 rounded-xl bg-white dark:bg-black/50 border-gray-200 dark:border-gray-700">
                  <SelectValue placeholder="Language" />
                </SelectTrigger>
                <SelectContent>
                  {[ALL_OPTION, ...DECLARATION_FILTERS].map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
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
                    className="h-12 px-4 bg-white dark:bg-black/50 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-black/20 whitespace-nowrap flex-shrink-0 text-brand-dark dark:text-white hover:text-brand-dark dark:hover:text-white"
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
                    <span className="text-brand-dark dark:text-white">{t('declarations.grid.categories')}</span>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {categories.map((category) => (
                    <DropdownMenuItem
                      key={category}
                      className={`cursor-pointer ${selectedCategory === category ? 'bg-brand-primary/10 text-brand-primary' : 'text-brand-dark dark:text-white'}`}
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

          {/* Right Side - Clear Filters only (removed total counter per feedback) */}
          <div className="flex items-center gap-3 flex-shrink-0">
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

      {/* Products list (desktop + mobile variants) */}
      <AnimatePresence mode="wait">
        {filteredProducts.length > 0 ? (
          <>
            {/* Desktop */}
            <motion.div key="grid-desktop" className="hidden md:block space-y-6" variants={container} initial="hidden" animate="show" exit="hidden">
              {filteredProducts.map((product) => (
                <motion.div key={product.id} className="rounded-xl bg-white dark:bg-black/50 border border-gray-100 dark:border-gray-700/50 shadow-lg hover:shadow-2xl transition-all duration-500 backdrop-blur-sm overflow-hidden group" variants={item}>
                  <div className="flex gap-6 p-6">
                    <div className="relative flex-shrink-0 h-20 w-20 rounded-xl overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 border border-gray-200 dark:border-gray-600">
                      {product.image_url ? (
                        <Image src={product.image_url} alt={product.name} fill className="object-contain p-2" />
                      ) : (
                        <div className="flex h-full items-center justify-center"><FileText className="h-8 w-8 text-gray-400 dark:text-gray-500" /></div>
                      )}
                    </div>
                    <div className="flex-grow flex flex-col">
                      <div className="flex items-center justify-between w-full mb-3">
                        <div className="flex items-center gap-4">
                          <h3 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-brand-primary transition-colors duration-300">{product.name}</h3>
                          {product.category && (<Badge variant="outline" className="bg-brand-primary-50 text-brand-primary-700 border-brand-primary-200 dark:bg-brand-primary/10 dark:text-brand-primary/300 dark:border-brand-primary/20">{product.category}</Badge>)}
                        </div>
                        <div className="flex items-center gap-2">
                          {getUkDeclarationUrl(product) && (
                            <Button variant="outline" size="sm" className="bg-white dark:bg-black/50 border-brand-primary/30 text-brand-primary hover:bg-brand-primary hover:text-white dark:hover:bg-brand-primary transition-all duration-300 gap-2 shadow-sm hover:shadow-md" asChild>
                              <a href={getUkDeclarationUrl(product) as string} target="_blank" rel="noopener noreferrer" download><span>UKCA DoC</span><Download className="h-4 w-4" /></a>
                            </Button>
                          )}
                          <div className="flex items-stretch">
                            <Button variant="outline" size="sm" className="rounded-r-none bg-white dark:bg-black/50 border-brand-primary/30 text-brand-primary hover:bg-brand-primary hover:text-white dark:hover:bg-brand-primary transition-all duration-300 gap-2 shadow-sm hover:shadow-md" asChild disabled={!getJsonDocUrlExact(product, docLanguage === 'all' ? getPreferredLocaleForProduct(product) : docLanguage)}>
                              <a href={getJsonDocUrlExact(product, docLanguage === 'all' ? getPreferredLocaleForProduct(product) : docLanguage) || '#'} target="_blank" rel="noopener noreferrer" download><span>EU DoC</span><Download className="h-4 w-4" /></a>
                            </Button>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="sm" className="rounded-l-none px-2 bg-white dark:bg-black/50 border-brand-primary/30 text-brand-primary hover:bg-brand-primary hover:text-white dark:hover:bg-brand-primary shadow-sm hover:shadow-md" aria-label="Select EU DoC language"><ChevronDown className="h-4 w-4" /></Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="w-44 max-h-96 overflow-y-auto">
                                <DropdownMenuLabel>Language</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                {DECLARATION_FILTERS.filter((opt) => opt.value !== 'all').map((opt) => {
                                  const url = getJsonDocUrlExact(product, opt.value);
                                  const label = opt.label;
                                  const disabled = !url;
                                  return (
                                    <DropdownMenuItem key={opt.value} className={`cursor-pointer ${docLanguage === opt.value ? 'bg-brand-primary/10 text-brand-primary' : ''}`} disabled={disabled} onClick={() => setDocLanguage(opt.value)}>
                                      <span className="flex-1">{label}</span>
                                      {!disabled ? (<a className="text-brand-primary hover:underline" href={url || '#'} target="_blank" rel="noopener noreferrer" download onClick={(e) => e.stopPropagation()}>Download</a>) : (<span className="text-gray-400">N/A</span>)}
                                    </DropdownMenuItem>
                                  );
                                })}
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Mobile */}
            <motion.div key="list-mobile" className="md:hidden space-y-4" variants={container} initial="hidden" animate="show" exit="hidden">
              {filteredProducts.map((product) => (
                <motion.div key={product.id} className="rounded-xl bg-white dark:bg-black/50 border border-gray-100 dark:border-gray-700/50 shadow-sm overflow-hidden" variants={item}>
                  <div className="p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <h3 className="text-base font-semibold text-gray-900 dark:text-white truncate">{product.name}</h3>
                        {product.category && (<Badge variant="outline" className="mt-1 text-xs bg-brand-primary/10 border-brand-primary/20 text-brand-primary">{product.category}</Badge>)}
                      </div>
                      <div className="relative h-12 w-12 rounded-md overflow-hidden bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-600 flex-shrink-0">
                        {product.image_url ? (<Image src={product.image_url} alt={product.name} fill className="object-contain p-1" />) : (<div className="flex h-full items-center justify-center"><FileText className="h-5 w-5 text-gray-400" /></div>)}
                      </div>
                    </div>
                    <div className="mt-3 flex flex-col gap-2">
                      {getUkDeclarationUrl(product) && (
                        <Button variant="outline" size="sm" className="w-full bg-white dark:bg-black/50 border-brand-primary/30 text-brand-primary hover:bg-brand-primary hover:text-white dark:hover:bg-brand-primary transition-all duration-300 gap-2 shadow-sm hover:shadow-md" asChild>
                          <a href={getUkDeclarationUrl(product) as string} target="_blank" rel="noopener noreferrer" download>
                            <div className="flex items-center justify-center gap-2"><span>UKCA DoC</span><Download className="h-4 w-4" /></div>
                          </a>
                        </Button>
                      )}
                      <div className="flex w-full">
                        <Button variant="outline" size="sm" className="flex-1 rounded-r-none bg-white dark:bg-black/50 border-brand-primary/30 text-brand-primary hover:bg-brand-primary hover:text-white dark:hover:bg-brand-primary transition-all duration-300 gap-2 shadow-sm hover:shadow-md" asChild disabled={!getJsonDocUrlExact(product, docLanguage === 'all' ? getPreferredLocaleForProduct(product) : docLanguage)}>
                          <a href={getJsonDocUrlExact(product, docLanguage === 'all' ? getPreferredLocaleForProduct(product) : docLanguage) || '#'} target="_blank" rel="noopener noreferrer" download>
                            <div className="flex items-center justify-center gap-2"><span>EU DoC</span><Download className="h-4 w-4" /></div>
                          </a>
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm" className="rounded-l-none px-2 bg-white dark:bg-black/50 border-brand-primary/30 text-brand-primary hover:bg-brand-primary hover:text-white dark:hover:bg-brand-primary shadow-sm hover:shadow-md" aria-label="Select EU DoC language">
                              <ChevronDown className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-56 max-h-80 overflow-y-auto">
                            <DropdownMenuLabel>Language</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                          {DECLARATION_FILTERS.filter((opt) => opt.value !== 'all').map((opt) => {
                              const url = getJsonDocUrlExact(product, opt.value);
                              const disabled = !url;
                              return (
                              <DropdownMenuItem key={opt.value} disabled={disabled} onClick={() => setDocLanguage(opt.value)} className={`${docLanguage === opt.value ? 'bg-brand-primary/10 text-brand-primary' : ''}`}>
                                  <span className="flex-1">{opt.label}</span>
                                  {!disabled ? (<a className="text-brand-primary hover:underline" href={url || '#'} target="_blank" rel="noopener noreferrer" download onClick={(e) => e.stopPropagation()}>Download</a>) : (<span className="text-gray-400">N/A</span>)}
                                </DropdownMenuItem>
                              );
                            })}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </>
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