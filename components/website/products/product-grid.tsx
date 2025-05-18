"use client";

import { useState, useEffect } from "react";
import { Product } from "@/lib/products-service";
import { ProductCard } from "./product-card";
import { ProductPreviewModal } from "./product-preview-modal";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { SearchX, ChevronDown, ChevronUp, Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { useLanguage } from "@/lib/context/language-context";

// Import utility functions
import {
  formatCutLevel,
  getUniqueTempRatings,
  getUniqueCutLevels,
  getUniqueIndustries,
  getUniqueSubCategories,
  sortCategoriesByPreference,
} from "@/lib/product-utils";

// Import filter components
import { CategoryFilter } from "./filters/CategoryFilter";
import { SubCategoryFilter } from "./filters/SubCategoryFilter";
import { TemperatureFilter } from "./filters/TemperatureFilter";
import { CutLevelFilter } from "./filters/CutLevelFilter";
import { IndustryFilter } from "./filters/IndustryFilter";
import { FilterBadges } from "./filters/FilterBadges";
import { MobileFilterSheet } from "./filters/MobileFilterSheet";

interface ProductGridProps {
  products: Product[];
  className?: string;
}

export const ProductGrid = ({ products, className = "" }: ProductGridProps) => {
  const { t, language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedSubCategories, setSelectedSubCategories] = useState<string[]>([]);
  const [selectedTempRatings, setSelectedTempRatings] = useState<string[]>([]);
  const [selectedCutLevels, setSelectedCutLevels] = useState<string[]>([]);
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState<string>("featured");
  const [previewProduct, setPreviewProduct] = useState<Product | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [activeFiltersCount, setActiveFiltersCount] = useState(0);
  
  // Track expanded filter sections
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    category: true,
    subCategory: false,
    temperature: false,
    cutLevel: false,
    industries: false
  });
  
  // Use this effect to ensure proper scroll margin for the filters
  useEffect(() => {
    // Add scroll margin to allow for proper scrolling with fixed header
    const categorySection = document.getElementById('product-categories');
    if (categorySection) {
      categorySection.style.scrollMarginTop = '100px';
    }
  }, []);
  
  // Track expanded sections for mobile
  const [expandedMobileSections, setExpandedMobileSections] = useState<Record<string, boolean>>({
    category: false,
    subCategory: false,
    temperature: false,
    cutLevel: false,
    industries: false
  });
  
  // Number of products to show per row based on screen size (4 in large screens)
  const PRODUCTS_PER_ROW = 4;
  // Number of rows to show initially (2 rows = 8 products)
  const INITIAL_ROWS = 2;
  
  // Localise all products
  const localizedProducts = products.map(product => ({
    ...product,
    name: product.name_locales?.[language] || product.name,
    description: product.description_locales?.[language] || product.description,
    short_description: product.short_description_locales?.[language] || product.short_description,
    category: product.category_locales?.[language] || product.category,
    sub_category: product.sub_category_locales?.[language] || product.sub_category,
    features: product.features_locales?.[language] || product.features,
    applications: product.applications_locales?.[language] || product.applications,
    industries: product.industries_locales?.[language] || product.industries,
  }));

  // Get unique categories from localised products
  const uniqueCategories = Array.from(
    new Set(localizedProducts.map((product) => product.category || t('products.filters.uncategorised')))
  ).filter((cat): cat is string => Boolean(cat));

  // Get unique subcategories based on selected category
  const uniqueSubCategories = Array.from(
    new Set(
      localizedProducts
        .filter(p => !selectedCategory || selectedCategory === "all" || p.category === selectedCategory)
        .map(p => p.sub_category)
        .filter((sub): sub is string => Boolean(sub))
    )
  );

  // Get unique temperature ratings
  const uniqueTempRatings = getUniqueTempRatings(localizedProducts);

  // Get unique cut resistance levels
  const uniqueCutLevels = getUniqueCutLevels(localizedProducts);

  // Get unique industries
  const uniqueIndustries = getUniqueIndustries(localizedProducts);

  // Define preferred category order (localised)
  const preferredOrder = [
    t("products.filters.heatResistantGloves") || "Heat Resistant Gloves",
    t("products.filters.cutResistantGloves") || "Cut Resistant Gloves",
    t("products.filters.generalPurposeGloves") || "General Purpose Gloves",
    t("products.filters.industrialSwabs") || "Industrial Swabs",
    t("products.filters.respiratoryProtection") || "Respiratory Protection"
  ];

  // Sort categories based on preferred order
  const categories = sortCategoriesByPreference(uniqueCategories, preferredOrder);
  
  // Update active filters count when filters change
  useEffect(() => {
    let count = 0;
    if (selectedCategory && selectedCategory !== "all") count++;
    if (selectedSubCategories.length > 0) count++;
    if (selectedTempRatings.length > 0) count++;
    if (selectedCutLevels.length > 0) count++;
    if (selectedIndustries.length > 0) count++;
    setActiveFiltersCount(count);
  }, [selectedCategory, selectedSubCategories, selectedTempRatings, selectedCutLevels, selectedIndustries]);
  
  // Handle industry selection
  const toggleIndustry = (industry: string) => {
    setSelectedIndustries(prev => 
      prev.includes(industry)
        ? prev.filter(i => i !== industry)
        : [...prev, industry]
    );
  };
  
  // Add handlers for the multi-select filters
  const toggleSubCategory = (subCategory: string) => {
    setSelectedSubCategories(prev => 
      prev.includes(subCategory)
        ? prev.filter(i => i !== subCategory)
        : [...prev, subCategory]
    );
  };
  
  const toggleTempRating = (temp: string) => {
    setSelectedTempRatings(prev => 
      prev.includes(temp)
        ? prev.filter(i => i !== temp)
        : [...prev, temp]
    );
  };
  
  const toggleCutLevel = (level: string) => {
    setSelectedCutLevels(prev => 
      prev.includes(level)
        ? prev.filter(i => i !== level)
        : [...prev, level]
    );
  };
  
  // Clear all filters
  const clearFilters = () => {
    setSelectedCategory("");
    setSelectedSubCategories([]);
    setSelectedTempRatings([]);
    setSelectedCutLevels([]);
    setSelectedIndustries([]);
  };
  
  // Filter products by all criteria
  const filteredProducts = localizedProducts.filter((product) => {
    // Match search query
    const matchesSearch = 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (product.short_description && product.short_description.toLowerCase().includes(searchQuery.toLowerCase()));
      
    // Match category
    const matchesCategory = 
      !selectedCategory || 
      selectedCategory === "all" || 
      (product.category || t('products.filters.uncategorised')) === selectedCategory;
    
    // Match subcategory
    const matchesSubCategory =
      selectedSubCategories.length === 0 ||
      (product.sub_category && selectedSubCategories.includes(product.sub_category));
    
    // Match temperature rating
    const matchesTempRating =
      selectedTempRatings.length === 0 ||
      (product.temperature_rating !== null && 
       product.temperature_rating !== undefined && 
       selectedTempRatings.includes(product.temperature_rating.toString()));
    
    // Match cut resistance level
    const matchesCutLevel =
      selectedCutLevels.length === 0 ||
      (product.cut_resistance_level && 
       selectedCutLevels.includes(product.cut_resistance_level));
    
    // Match industries
    const matchesIndustries =
      selectedIndustries.length === 0 ||
      (product.industries && 
       selectedIndustries.some(industry => 
         product.industries.includes(industry)
       ));
    
    return matchesSearch && 
           matchesCategory && 
           matchesSubCategory && 
           matchesTempRating && 
           matchesCutLevel && 
           matchesIndustries;
  });
  
  // Sort products based on selected option and category order
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    // First sort by category according to preferred order
    const categoryA = a.category || t('products.filters.uncategorised');
    const categoryB = b.category || t('products.filters.uncategorised');
    
    const indexA = preferredOrder.indexOf(categoryA);
    const indexB = preferredOrder.indexOf(categoryB);
    
    // If categories are different and both are in preferred order, sort by category
    if (categoryA !== categoryB && indexA !== -1 && indexB !== -1) {
      return indexA - indexB;
    }
    
    // If only one category is in preferred order, it comes first
    if (indexA !== -1 && indexB === -1) {
      return -1;
    }
    
    if (indexA === -1 && indexB !== -1) {
      return 1;
    }
    
    // If categories are the same or neither is in preferred order, 
    // sort by the selected sort option
    switch (sortOption) {
      case "featured":
        // Featured products first, then by priority, then by date
        return (b.is_featured ? 1 : 0) - (a.is_featured ? 1 : 0) || 
               (b.order_priority || 0) - (a.order_priority || 0) ||
               new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      case "newest":
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      case "name-asc":
        return a.name.localeCompare(b.name);
      case "name-desc":
        return b.name.localeCompare(a.name);
      default:
        return 0;
    }
  });
  
  // Determine if we need to show the "See More" button
  const initialProductsCount = INITIAL_ROWS * PRODUCTS_PER_ROW;
  const hasMoreProducts = sortedProducts.length > initialProductsCount;
  
  // Determine which products to show (all or just first 2 rows)
  const displayedProducts = isExpanded || !hasMoreProducts 
    ? sortedProducts 
    : sortedProducts.slice(0, initialProductsCount);
  
  const handleProductPreview = (product: Product) => {
    setPreviewProduct(product);
  };
  
  const closePreviewModal = () => {
    setPreviewProduct(null);
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
    
    // Scroll to the toggle button position if collapsing
    if (isExpanded) {
      // Use setTimeout to allow the state to update and DOM to reflow
      setTimeout(() => {
        const expandButton = document.getElementById('expand-toggle-button');
        if (expandButton) {
          const yOffset = -100; // Add some offset for better UX
          const y = expandButton.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }, 10);
    }
  };

  // Toggle expanded state for a section
  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Force category section to be open by default
  useEffect(() => {
    // Explicitly open the category section when component mounts
    const categoryHeader = document.querySelector('button[aria-controls="category-content"]');
    if (categoryHeader && categoryHeader.getAttribute('aria-expanded') === 'false') {
      (categoryHeader as HTMLButtonElement).click();
    }
  }, []);

  // Toggle mobile section expansion
  const toggleMobileSection = (section: string) => {
    setExpandedMobileSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <div className={className}>
      <h2 className="mb-8 text-center text-3xl font-bold md:text-4xl text-brand-dark dark:text-white font-heading">
        {t('products.browseTitle')}
      </h2>
      {/* Desktop-only left sidebar filters */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-[280px,1fr]">
        <div className="hidden md:block">
          <div className="sticky top-24 border border-brand-primary/10 dark:border-brand-primary/20 rounded-lg overflow-hidden">
            <div className="bg-[#F5EFE0]/80 dark:bg-transparent backdrop-blur-sm dark:backdrop-blur-none p-4">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-brand-dark dark:text-white">{t('products.filters.title')}</h2>
                {activeFiltersCount > 0 && (
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="border-brand-primary/30 text-brand-primary hover:bg-brand-primary/10 hover:border-brand-primary hover:text-black dark:hover:text-white dark:hover:bg-brand-primary/5 transition-all duration-300 group" 
                    onClick={clearFilters}
                  >
                    <X className="mr-1.5 h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                    {t('products.filters.clearAll')}
                  </Button>
                )}
              </div>
              
              <div className="space-y-6">
                {/* Category Filter */}
                <CategoryFilter
                  categories={categories}
                  selectedCategory={selectedCategory}
                  setSelectedCategory={setSelectedCategory}
                  isExpanded={expandedSections.category}
                  toggleSection={toggleSection}
                />
                
                {/* Sub-Category Filter */}
                <SubCategoryFilter
                  subCategories={uniqueSubCategories}
                  selectedSubCategories={selectedSubCategories}
                  toggleSubCategory={toggleSubCategory}
                  isExpanded={expandedSections.subCategory}
                  toggleSection={toggleSection}
                />
                
                {/* Temperature Rating Filter */}
                <TemperatureFilter
                  tempRatings={uniqueTempRatings}
                  selectedTempRatings={selectedTempRatings}
                  toggleTempRating={toggleTempRating}
                  isExpanded={expandedSections.temperature}
                  toggleSection={toggleSection}
                />
                
                {/* Cut Resistance Level Filter */}
                <CutLevelFilter
                  cutLevels={uniqueCutLevels}
                  selectedCutLevels={selectedCutLevels}
                  toggleCutLevel={toggleCutLevel}
                  isExpanded={expandedSections.cutLevel}
                  toggleSection={toggleSection}
                />
                
                {/* Industries Filter */}
                <IndustryFilter
                  industries={uniqueIndustries}
                  selectedIndustries={selectedIndustries}
                  toggleIndustry={toggleIndustry}
                  isExpanded={expandedSections.industries}
                  toggleSection={toggleSection}
                />
              </div>
            </div>
          </div>
        </div>
        
        <div>
          {/* Filters and sorting */}
          <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-[1fr,auto]">
            {/* Search */}
            <div className="relative">
              <Input
                placeholder={t('products.searchPlaceholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full border-brand-primary/20 focus-visible:ring-brand-primary bg-[#F5EFE0]/60 dark:bg-transparent dark:border-brand-primary/20 placeholder:text-brand-secondary/70 dark:placeholder:text-gray-500"
              />
              {searchQuery && (
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 text-brand-secondary hover:text-brand-primary hover:bg-white/60 dark:hover:bg-gray-800/60"
                  onClick={() => setSearchQuery("")}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
            
            {/* Mobile Filters Button */}
            <div className="md:hidden">
              <Sheet open={isFiltersOpen} onOpenChange={setIsFiltersOpen}>
                <SheetTrigger asChild>
                  <Button 
                    variant="outline" 
                    className="w-full border-brand-primary/20 bg-[#F5EFE0]/60 dark:bg-transparent dark:border-brand-primary/20 flex items-center justify-between hover:bg-white/80 dark:hover:bg-gray-800/40"
                  >
                    <span className="flex items-center">
                      <Filter className="mr-2 h-4 w-4 text-brand-primary" />
                      Filters
                    </span>
                    {activeFiltersCount > 0 && (
                      <Badge className="ml-2 bg-brand-primary text-white">{activeFiltersCount}</Badge>
                    )}
                  </Button>
                </SheetTrigger>
                
                <MobileFilterSheet
                  isOpen={isFiltersOpen}
                  setIsOpen={setIsFiltersOpen}
                  categories={categories}
                  selectedCategory={selectedCategory}
                  setSelectedCategory={setSelectedCategory}
                  subCategories={uniqueSubCategories}
                  selectedSubCategories={selectedSubCategories}
                  toggleSubCategory={toggleSubCategory}
                  tempRatings={uniqueTempRatings}
                  selectedTempRatings={selectedTempRatings}
                  toggleTempRating={toggleTempRating}
                  cutLevels={uniqueCutLevels}
                  selectedCutLevels={selectedCutLevels}
                  toggleCutLevel={toggleCutLevel}
                  industries={uniqueIndustries}
                  selectedIndustries={selectedIndustries}
                  toggleIndustry={toggleIndustry}
                  clearFilters={clearFilters}
                  expandedSections={expandedMobileSections}
                  toggleSection={toggleMobileSection}
                  activeFiltersCount={activeFiltersCount}
                />
              </Sheet>
            </div>
            
            {/* Sort options */}
            <div>
              <Select value={sortOption} onValueChange={setSortOption}>
                <SelectTrigger className="border-brand-primary/20 focus:ring-brand-primary bg-[#F5EFE0]/60 dark:bg-transparent dark:border-brand-primary/20 hover:bg-white/80 dark:hover:bg-gray-800/40 transition-all duration-300 group">
                  <SelectValue placeholder={t('products.sortOptions.featured')} />
                </SelectTrigger>
                <SelectContent className="border-brand-primary/20 bg-[#F5EFE0]/95 dark:bg-black/95 backdrop-blur-md">
                  <SelectItem value="featured" className="focus:bg-brand-primary/10 focus:text-brand-primary transition-colors duration-200">{t('products.sortOptions.featured')}</SelectItem>
                  <SelectItem value="newest" className="focus:bg-brand-primary/10 focus:text-brand-primary transition-colors duration-200">{t('products.sortOptions.newest')}</SelectItem>
                  <SelectItem value="name-asc" className="focus:bg-brand-primary/10 focus:text-brand-primary transition-colors duration-200">{t('products.sortOptions.name-asc')}</SelectItem>
                  <SelectItem value="name-desc" className="focus:bg-brand-primary/10 focus:text-brand-primary transition-colors duration-200">{t('products.sortOptions.name-desc')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {/* Active Filters - Mobile and Tablet only */}
          <FilterBadges
            selectedCategory={selectedCategory}
            selectedSubCategories={selectedSubCategories}
            selectedTempRatings={selectedTempRatings}
            selectedCutLevels={selectedCutLevels}
            selectedIndustries={selectedIndustries}
            setSelectedCategory={setSelectedCategory}
            toggleSubCategory={toggleSubCategory}
            toggleTempRating={toggleTempRating}
            toggleCutLevel={toggleCutLevel}
            toggleIndustry={toggleIndustry}
            clearFilters={clearFilters}
          />
          
          {/* Results count */}
          <div className="mb-6">
            <p className="text-sm text-brand-secondary dark:text-gray-400">
              {t('products.results.showing')
                .replace('{current}', String(isExpanded ? localizedProducts.length : Math.min(displayedProducts.length, initialProductsCount)))
                .replace('{total}', String(localizedProducts.length))}
            </p>
          </div>
          
          {localizedProducts.length > 0 ? (
            <div className="space-y-8">
              <div className="grid grid-cols-2 gap-3 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {displayedProducts.map((product) => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    onProductClick={handleProductPreview}
                  />
                ))}
              </div>
              
              {hasMoreProducts && (
                <div className="flex justify-center pt-4" id="expand-toggle-button">
                  <Button 
                    variant={isExpanded ? "outline" : "default"}
                    size="lg"
                    className={`px-6 py-5 font-medium text-base shadow-md hover:shadow-lg transition-all duration-300 ${
                      isExpanded 
                        ? "border-brand-primary/30 bg-[#F5EFE0]/80 dark:bg-transparent text-brand-primary hover:bg-brand-primary/5 dark:border-brand-primary/30" 
                        : "bg-brand-primary text-white hover:bg-brand-primary/90"
                    }`}
                    onClick={toggleExpanded}
                  >
                    {isExpanded ? (
                      <span className="flex items-center">
                        {t('products.results.showLess')} <ChevronUp className="ml-2 h-5 w-5" />
                      </span>
                    ) : (
                      <span className="flex items-center">
                        {t('products.results.seeMore')} <ChevronDown className="ml-2 h-5 w-5" />
                      </span>
                    )}
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 border border-brand-primary/10 dark:border-brand-primary/20 rounded-lg bg-brand-light dark:bg-gray-800/20">
              <SearchX className="mb-4 h-16 w-16 text-brand-primary/50" />
              <h3 className="mb-2 text-xl font-semibold text-brand-dark dark:text-white">{t('products.results.noResults')}</h3>
              <p className="text-center text-brand-secondary dark:text-gray-400 max-w-md">
                {t('products.results.noResultsDescription')}
              </p>
              <Button 
                variant="outline" 
                className="mt-4 border-brand-primary/30 text-brand-primary hover:bg-brand-primary/10 hover:border-brand-primary hover:text-black dark:hover:text-white dark:hover:bg-brand-primary/5 transition-all duration-300 group" 
                onClick={clearFilters}
              >
                <X className="mr-1.5 h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                {t('products.results.clearFilters')}
              </Button>
            </div>
          )}
          
          {/* Product preview modal */}
          {previewProduct && (
            <ProductPreviewModal 
              product={previewProduct} 
              isOpen={!!previewProduct} 
              onClose={closePreviewModal} 
            />
          )}
        </div>
      </div>
    </div>
  );
}; 