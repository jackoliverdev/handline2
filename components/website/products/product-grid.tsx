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
  getUniqueHeatLevels,
  getUniqueIndustries,
  getUniqueSubCategories,
  sortCategoriesByPreference,
} from "@/lib/product-utils";

// Import filter components
import { CategoryFilter } from "./filters/CategoryFilter";
import { SubCategoryFilter } from "./filters/SubCategoryFilter";
import { TemperatureFilter } from "./filters/TemperatureFilter";
import { HazardProtectionFilter } from "./filters/HazardProtectionFilter";
import { WorkEnvironmentFilter } from "./filters/WorkEnvironmentFilter";
import { IndustryFilter } from "./filters/IndustryFilter";
import { FilterBadges } from "./filters/FilterBadges";
import { MobileFilterSheet } from "./filters/MobileFilterSheet";

// Import hazard protection helpers
import { matchesHazardProtection } from "@/content/hazardfilters";
import { matchesWorkEnvironment } from "@/content/workenvironmentfilters";

interface ProductGridProps {
  products: Product[];
  className?: string;
  initialCategory?: string;
}

export const ProductGrid = ({ products, className = "", initialCategory }: ProductGridProps) => {
  const { t, language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory || "");
  const [selectedSubCategories, setSelectedSubCategories] = useState<string[]>([]);
  const [selectedTempRatings, setSelectedTempRatings] = useState<string[]>([]);
  const [selectedCutLevels, setSelectedCutLevels] = useState<string[]>([]);
  const [selectedHeatLevels, setSelectedHeatLevels] = useState<string[]>([]);
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);
  const [selectedHazardProtections, setSelectedHazardProtections] = useState<string[]>([]);
  const [selectedWorkEnvironments, setSelectedWorkEnvironments] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState<string>("featured");
  const [previewProduct, setPreviewProduct] = useState<Product | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [activeFiltersCount, setActiveFiltersCount] = useState(0);
  
  // Track expanded filter sections - adjust based on whether we're on a specific category page
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    category: false, // Always close category since we only have one
    subCategory: true, // Always open sub-category as the main filter
    temperature: false,
    cutLevel: false,
    heatLevel: false,
    hazardProtection: false,
    workEnvironment: false,
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
    category: false, // Always closed since we only have one category
    subCategory: true, // Always open sub-category as the main filter
    temperature: false,
    cutLevel: false,
    heatLevel: false,
    hazardProtection: false,
    workEnvironment: false,
    industries: false
  });
  
  // Number of products to show per row based on screen size (4 in large screens)
  const PRODUCTS_PER_ROW = 4;
  // Number of rows to show initially (2 rows = 8 products)
  const INITIAL_ROWS = 2;
  
  // Localise products for display but keep original categories for sorting
  const localizedProducts = products.map(product => ({
    ...product,
    // Keep original category for sorting logic
    original_category: product.category,
    // Localized fields for display
    name: product.name_locales?.[language] || product.name,
    description: product.description_locales?.[language] || product.description,
    short_description: product.short_description_locales?.[language] || product.short_description,
    category: product.category_locales?.[language] || product.category, // This is for display
    sub_category: product.sub_category_locales?.[language] || product.sub_category,
    features: product.features_locales?.[language] || product.features,
    applications: product.applications_locales?.[language] || product.applications,
    industries: product.industries_locales?.[language] || product.industries,
  }));

  // Get unique categories (now just "Hand protection")
  const uniqueCategories = Array.from(
    new Set(localizedProducts.map(p => p.category).filter(Boolean))
  );

  // Get unique subcategories based on selected category (now this is the main filter)
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

  // Get unique heat resistance levels
  const uniqueHeatLevels = getUniqueHeatLevels(localizedProducts);

  // Get unique industries
  const uniqueIndustries = getUniqueIndustries(localizedProducts);

  // Define preferred subcategory order using ORIGINAL English subcategories for consistent sorting
  const originalPreferredOrder = [
    "Heat resistant gloves",
    "Cut resistant gloves", 
    "Gloves for general use",
    "Mechanical hazards gloves",
    "Welding glove"
  ];

  // Define preferred subcategory order (localised) for display
  const preferredOrder = [
    t("products.filters.heatResistantGloves") || "Heat resistant gloves",
    t("products.filters.cutResistantGloves") || "Cut resistant gloves",
    t("products.filters.generalPurposeGloves") || "Gloves for general use",
    t("products.filters.mechanicalHazardsGloves") || "Mechanical hazards gloves",
    t("products.filters.weldingGlove") || "Welding glove"
  ];

  // Sort subcategories based on preferred order (now this is the main filter)
  const subcategories = sortCategoriesByPreference(uniqueSubCategories, preferredOrder);
  
  // Update active filters count when filters change
  useEffect(() => {
    let count = 0;
    if (selectedCategory && selectedCategory !== "all") count++;
    if (selectedSubCategories.length > 0) count++;
    if (selectedTempRatings.length > 0) count++;
    if (selectedCutLevels.length > 0) count++;
    if (selectedHeatLevels.length > 0) count++;
    if (selectedHazardProtections.length > 0) count++;
    if (selectedWorkEnvironments.length > 0) count++;
    if (selectedIndustries.length > 0) count++;
    setActiveFiltersCount(count);
  }, [selectedCategory, selectedSubCategories, selectedTempRatings, selectedCutLevels, selectedHeatLevels, selectedHazardProtections, selectedWorkEnvironments, selectedIndustries]);
  
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
  
  const toggleHeatLevel = (level: string) => {
    setSelectedHeatLevels(prev => 
      prev.includes(level)
        ? prev.filter(i => i !== level)
        : [...prev, level]
    );
  };
  
  const toggleHazardProtection = (hazard: string) => {
    setSelectedHazardProtections(prev => 
      prev.includes(hazard)
        ? prev.filter(i => i !== hazard)
        : [...prev, hazard]
    );
  };
  
  const toggleWorkEnvironment = (environment: string) => {
    setSelectedWorkEnvironments(prev => 
      prev.includes(environment)
        ? prev.filter(i => i !== environment)
        : [...prev, environment]
    );
  };
  
  // Clear all filters
  const clearFilters = () => {
    setSelectedCategory("");
    setSelectedSubCategories([]);
    setSelectedTempRatings([]);
    setSelectedCutLevels([]);
    setSelectedHeatLevels([]);
    setSelectedHazardProtections([]);
    setSelectedWorkEnvironments([]);
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
    
    // Match heat resistance level
    const matchesHeatLevel =
      selectedHeatLevels.length === 0 ||
      (product.heat_resistance_level && 
       selectedHeatLevels.includes(product.heat_resistance_level));
    
    // Match hazard protection
    const matchesHazardProtectionFilter =
      selectedHazardProtections.length === 0 ||
      selectedHazardProtections.some(hazardId => 
        matchesHazardProtection(product.safety, hazardId)
      );
    
    // Match work environment
    const matchesWorkEnvironmentFilter =
      selectedWorkEnvironments.length === 0 ||
      selectedWorkEnvironments.some(environmentId => 
        matchesWorkEnvironment(product.environment_pictograms, environmentId)
      );
    
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
           matchesHeatLevel && 
           matchesHazardProtectionFilter && 
           matchesWorkEnvironmentFilter &&
           matchesIndustries;
  });
  
  // Sort products based on selected option and category order using ORIGINAL categories
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    // Use original English categories for consistent sorting across languages
    const categoryA = (a as any).original_category || 'Uncategorised';
    const categoryB = (b as any).original_category || 'Uncategorised';
    
    const indexA = originalPreferredOrder.indexOf(categoryA);
    const indexB = originalPreferredOrder.indexOf(categoryB);
    
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

  // Toggle mobile section expansion
  const toggleMobileSection = (section: string) => {
    setExpandedMobileSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <div className={className}>
      {/* Desktop-only left sidebar filters */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-[280px,1fr]">
        <div className="hidden md:block">
          <div className="sticky top-24 border border-gray-100 dark:border-gray-700/50 rounded-2xl overflow-hidden shadow-lg">
            <div className="bg-white dark:bg-black/50 backdrop-blur-sm p-4">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-brand-dark dark:text-white">{t('products.filters.title')}</h2>
                {activeFiltersCount > 0 && (
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="border-brand-primary/30 text-brand-primary hover:bg-gray-700 hover:text-white hover:border-gray-700 transition-all duration-300 group" 
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
                  categories={uniqueCategories}
                  selectedCategory={selectedCategory}
                  setSelectedCategory={setSelectedCategory}
                  isExpanded={expandedSections.category}
                  toggleSection={toggleSection}
                />
                
                {/* Sub-Category Filter */}
                <SubCategoryFilter
                  subCategories={subcategories}
                  selectedSubCategories={selectedSubCategories}
                  toggleSubCategory={toggleSubCategory}
                  isExpanded={expandedSections.subCategory}
                  toggleSection={toggleSection}
                />
                
                {/* Hazard Protection Filter */}
                <HazardProtectionFilter
                  selectedHazardProtections={selectedHazardProtections}
                  toggleHazardProtection={toggleHazardProtection}
                  isExpanded={expandedSections.hazardProtection}
                  toggleSection={toggleSection}
                />
                
                {/* Work Environment Filter */}
                <WorkEnvironmentFilter
                  selectedWorkEnvironments={selectedWorkEnvironments}
                  toggleWorkEnvironment={toggleWorkEnvironment}
                  isExpanded={expandedSections.workEnvironment}
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
          <div id="product-grid" className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-[1fr,auto]" style={{ scrollMarginTop: '100px' }}>
            {/* Search */}
            <div className="relative">
              <Input
                placeholder={t('products.searchPlaceholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full border-gray-100 dark:border-gray-700/50 focus-visible:ring-brand-primary bg-white dark:bg-black/50 placeholder:text-gray-500 dark:placeholder:text-gray-400 shadow-md hover:shadow-lg transition-all duration-300 rounded-xl"
              />
              {searchQuery && (
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 text-gray-500 hover:text-brand-primary hover:bg-brand-primary/10 transition-all duration-300"
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
                    className="w-full border-gray-100 dark:border-gray-700/50 bg-white dark:bg-black/50 flex items-center justify-between hover:shadow-lg transition-all duration-300 rounded-xl shadow-md"
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
                  categories={uniqueCategories}
                  selectedCategory={selectedCategory}
                  setSelectedCategory={setSelectedCategory}
                  subCategories={subcategories}
                  selectedSubCategories={selectedSubCategories}
                  toggleSubCategory={toggleSubCategory}
                  tempRatings={uniqueTempRatings}
                  selectedTempRatings={selectedTempRatings}
                  toggleTempRating={toggleTempRating}
                  selectedHazardProtections={selectedHazardProtections}
                  toggleHazardProtection={toggleHazardProtection}
                  selectedWorkEnvironments={selectedWorkEnvironments}
                  toggleWorkEnvironment={toggleWorkEnvironment}
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
                <SelectTrigger className="border-gray-100 dark:border-gray-700/50 focus:ring-brand-primary bg-white dark:bg-black/50 hover:shadow-lg transition-all duration-300 rounded-xl shadow-md group">
                  <SelectValue placeholder={t('products.sortOptions.featured')} />
                </SelectTrigger>
                <SelectContent className="border-gray-100 dark:border-gray-700/50 bg-white dark:bg-black/90 backdrop-blur-md rounded-xl shadow-xl">
                  <SelectItem value="featured" className="focus:bg-brand-primary/10 focus:text-brand-primary transition-colors duration-200 rounded-lg">{t('products.sortOptions.featured')}</SelectItem>
                  <SelectItem value="newest" className="focus:bg-brand-primary/10 focus:text-brand-primary transition-colors duration-200 rounded-lg">{t('products.sortOptions.newest')}</SelectItem>
                  <SelectItem value="name-asc" className="focus:bg-brand-primary/10 focus:text-brand-primary transition-colors duration-200 rounded-lg">{t('products.sortOptions.name-asc')}</SelectItem>
                  <SelectItem value="name-desc" className="focus:bg-brand-primary/10 focus:text-brand-primary transition-colors duration-200 rounded-lg">{t('products.sortOptions.name-desc')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {/* Active Filters - Mobile and Tablet only */}
          <FilterBadges
            selectedCategory={selectedCategory}
            selectedSubCategories={selectedSubCategories}
            selectedTempRatings={selectedTempRatings}
            selectedHazardProtections={selectedHazardProtections}
            selectedWorkEnvironments={selectedWorkEnvironments}
            selectedIndustries={selectedIndustries}
            setSelectedCategory={setSelectedCategory}
            toggleSubCategory={toggleSubCategory}
            toggleTempRating={toggleTempRating}
            toggleHazardProtection={toggleHazardProtection}
            toggleWorkEnvironment={toggleWorkEnvironment}
            toggleIndustry={toggleIndustry}
            clearFilters={clearFilters}
          />
          
          {/* Results count */}
          <div className="mb-6">
            <p className="text-sm text-brand-secondary dark:text-gray-400">
              {t('products.results.showing')
                .replace('{current}', String(isExpanded ? sortedProducts.length : Math.min(displayedProducts.length, initialProductsCount)))
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
                    className={`px-8 py-6 font-medium text-base shadow-lg hover:shadow-xl transition-all duration-500 rounded-xl ${
                      isExpanded 
                        ? "border-gray-100 dark:border-gray-700/50 bg-white dark:bg-black/50 text-brand-primary hover:bg-gray-700 hover:text-white hover:border-gray-700" 
                        : "bg-gradient-to-r from-brand-primary to-brand-primary hover:from-brand-primary/90 hover:to-brand-primary/90 text-white hover:scale-105 transform"
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
            <div className="flex flex-col items-center justify-center py-16 border border-gray-100 dark:border-gray-700/50 rounded-2xl bg-white dark:bg-black/50 shadow-lg">
              <SearchX className="mb-4 h-16 w-16 text-brand-primary/50" />
              <h3 className="mb-2 text-xl font-semibold text-brand-dark dark:text-white">{t('products.results.noResults')}</h3>
              <p className="text-center text-gray-600 dark:text-gray-400 max-w-md">
                {t('products.results.noResultsDescription')}
              </p>
              <Button 
                variant="outline" 
                className="mt-4 border-brand-primary/30 text-brand-primary hover:bg-gray-700 hover:text-white hover:border-gray-700 transition-all duration-300 group" 
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