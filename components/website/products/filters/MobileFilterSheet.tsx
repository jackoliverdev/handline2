import { ChevronDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { X } from "lucide-react";
import { FilterSection } from "./FilterSection";
import { useLanguage } from "@/lib/context/language-context";
import { hazardProtectionFilters } from "@/content/hazardfilters";

interface MobileFilterSheetProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  categories: string[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  subCategories: string[];
  selectedSubCategories: string[];
  toggleSubCategory: (subCategory: string) => void;
  tempRatings: number[];
  selectedTempRatings: string[];
  toggleTempRating: (temp: string) => void;
  selectedHazardProtections: string[];
  toggleHazardProtection: (hazard: string) => void;
  enStandards: string[];
  selectedENStandards: string[];
  toggleENStandard: (standard: string) => void;
  industries: string[];
  selectedIndustries: string[];
  toggleIndustry: (industry: string) => void;
  clearFilters: () => void;
  expandedSections: Record<string, boolean>;
  toggleSection: (section: string) => void;
  activeFiltersCount: number;
  // Category-specific mobile content
  extraFiltersRender?: React.ReactNode;
  // When true, hide default hazard/EN standard/temp/industries blocks
  hideDefaultFilters?: boolean;
  // When true, hide Category and Sub-Category groups
  hideCategoryFilters?: boolean;
  // When true, hide only the main Category group (keep Sub-Category)
  hideMainCategoryFilter?: boolean;
}

export const MobileFilterSheet = ({
  isOpen,
  setIsOpen,
  categories,
  selectedCategory,
  setSelectedCategory,
  subCategories,
  selectedSubCategories,
  toggleSubCategory,
  tempRatings,
  selectedTempRatings,
  toggleTempRating,
  selectedHazardProtections,
  toggleHazardProtection,
  enStandards,
  selectedENStandards,
  toggleENStandard,
  industries,
  selectedIndustries,
  toggleIndustry,
  clearFilters,
  expandedSections,
  toggleSection,
  activeFiltersCount,
  extraFiltersRender,
  hideDefaultFilters = false,
  hideCategoryFilters = false,
  hideMainCategoryFilter = false,
}: MobileFilterSheetProps) => {
  const { t } = useLanguage();
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent side="left" className="w-full max-w-xs h-full flex flex-col" onOpenAutoFocus={(e) => e.preventDefault()}>
        <SheetHeader>
          <SheetTitle className="text-xl font-bold text-brand-dark dark:text-white">{t('products.filters.title')}</SheetTitle>
        </SheetHeader>
        
        <div className="flex-1 flex flex-col gap-4 mt-4 overflow-y-auto pr-1">
          {/* Category Filter */}
          {!hideCategoryFilters && !hideMainCategoryFilter && (
          <div>
            <button 
              className="flex w-full items-center justify-between py-2 text-left text-base font-medium text-brand-dark dark:text-white"
              onClick={() => toggleSection('category')}
            >
              <span className="flex items-center">
                {t('products.filters.category')}
                {selectedCategory && selectedCategory !== "all" && (
                  <Badge className="ml-2 bg-brand-primary text-white">1</Badge>
                )}
              </span>
              <ChevronDown 
                className={`h-4 w-4 text-brand-primary transition-transform ${
                  expandedSections.category ? 'rotate-180' : ''
                }`}
              />
            </button>
            
            {expandedSections.category && (
              <div className="space-y-2 max-h-40 overflow-y-auto pr-2 mt-2">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="category-all" 
                    checked={!selectedCategory || selectedCategory === "all"}
                    onCheckedChange={() => setSelectedCategory("all")}
                    className="data-[state=checked]:bg-brand-primary data-[state=checked]:border-brand-primary"
                  />
                  <label 
                    htmlFor="category-all"
                    className="text-sm text-brand-secondary dark:text-gray-300 cursor-pointer"
                  >
                    {t('products.filters.allCategories')}
                  </label>
                </div>
                {categories.map((category) => (
                  <div key={category} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`category-${category}`} 
                      checked={selectedCategory === category}
                      onCheckedChange={() => setSelectedCategory(category)}
                      className="data-[state=checked]:bg-brand-primary data-[state=checked]:border-brand-primary"
                    />
                    <label 
                      htmlFor={`category-${category}`}
                      className="text-sm text-brand-secondary dark:text-gray-300 cursor-pointer"
                    >
                      {category}
                    </label>
                  </div>
                ))}
              </div>
            )}
          </div>
          )}
          
          {/* Sub-Category Filter */}
          {!hideCategoryFilters && subCategories.length > 0 && (
            <div>
              <button 
                className="flex w-full items-center justify-between py-2 text-left text-base font-medium text-brand-dark dark:text-white"
                onClick={() => toggleSection('subCategory')}
              >
                <span className="flex items-center">
                  {t('products.filters.subCategory')}
                  {selectedSubCategories.length > 0 && (
                    <Badge className="ml-2 bg-brand-primary text-white">{selectedSubCategories.length}</Badge>
                  )}
                </span>
                <ChevronDown 
                  className={`h-4 w-4 text-brand-primary transition-transform ${
                    expandedSections.subCategory ? 'rotate-180' : ''
                  }`}
                />
              </button>
              
              {expandedSections.subCategory && (
                <div className="space-y-2 max-h-40 overflow-y-auto pr-2 mt-2">
                  {subCategories.map((subCategory) => (
                    <div key={subCategory} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`subCategory-${subCategory}`} 
                        checked={selectedSubCategories.includes(subCategory)}
                        onCheckedChange={() => toggleSubCategory(subCategory)}
                        className="data-[state=checked]:bg-brand-primary data-[state=checked]:border-brand-primary"
                      />
                      <label 
                        htmlFor={`subCategory-${subCategory}`}
                        className="text-sm text-brand-secondary dark:text-gray-300 cursor-pointer"
                      >
                        {subCategory}
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
          
          {/* Industries (moved directly after Sub-Category) */}
          {!hideDefaultFilters && (
            <div>
              <button 
                className="flex w-full items-center justify-between py-2 text-left text-base font-medium text-brand-dark dark:text-white"
                onClick={() => toggleSection('industries')}
              >
                <span className="flex items-center">
                  {t('products.filters.industries')}
                  {selectedIndustries.length > 0 && (
                    <Badge className="ml-2 bg-brand-primary text-white">{selectedIndustries.length}</Badge>
                  )}
                </span>
                <ChevronDown 
                  className={`h-4 w-4 text-brand-primary transition-transform ${
                    expandedSections.industries ? 'rotate-180' : ''
                  }`}
                />
              </button>
              
              {expandedSections.industries && (
                <div className="space-y-2 max-h-40 overflow-y-auto pr-2 mt-2">
                  {industries.map((industry) => (
                    <div key={industry} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`industry-${industry}`} 
                        checked={selectedIndustries.includes(industry)}
                        onCheckedChange={() => toggleIndustry(industry)}
                        className="data-[state=checked]:bg-brand-primary data-[state=checked]:border-brand-primary"
                      />
                      <label 
                        htmlFor={`industry-${industry}`}
                        className="text-sm text-brand-secondary dark:text-gray-300 cursor-pointer"
                      >
                        {industry}
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* EN Standard (now after Industries) */}
          {!hideDefaultFilters && enStandards.length > 0 && (
            <div>
              <button 
                className="flex w-full items-center justify-between py-2 text-left text-base font-medium text-brand-dark dark:text-white"
                onClick={() => toggleSection('enStandard')}
              >
                <span className="flex items-center">
                  {t('products.filters.enStandard')}
                  {selectedENStandards.length > 0 && (
                    <Badge className="ml-2 bg-brand-primary text-white">{selectedENStandards.length}</Badge>
                  )}
                </span>
                <ChevronDown 
                  className={`h-4 w-4 text-brand-primary transition-transform ${
                    expandedSections.enStandard ? 'rotate-180' : ''
                  }`}
                />
              </button>
              
              {expandedSections.enStandard && (
                <div className="space-y-2 max-h-40 overflow-y-auto pr-2 mt-2">
                  {enStandards.map((standard) => (
                    <div key={standard} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`enStandard-mobile-${standard}`} 
                        checked={selectedENStandards.includes(standard)}
                        onCheckedChange={() => toggleENStandard(standard)}
                        className="data-[state=checked]:bg-brand-primary data-[state=checked]:border-brand-primary"
                      />
                      <label 
                        htmlFor={`enStandard-mobile-${standard}`}
                        className="text-sm text-brand-secondary dark:text-gray-300 cursor-pointer"
                      >
                        {standard}
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Gloves group: Hazard Protection + Temperature */}
          {!hideDefaultFilters && (
            <FilterSection title={t('navbar.safetyGloves')} defaultExpanded={false} variant="mobile">
              {/* Hazard Protection Filter */}
              <div className="pb-4">
                <button 
                  className="flex w-full items-center justify-between mb-2"
                  onClick={() => toggleSection('hazardProtection')}
                >
                  <h3 className="text-sm font-medium text-brand-dark dark:text-white">
                    {t('products.filters.hazardProtection')}
                    {selectedHazardProtections.length > 0 && (
                      <Badge className="ml-2 bg-brand-primary text-white">{selectedHazardProtections.length}</Badge>
                    )}
                  </h3>
                  <ChevronDown 
                    className={`h-4 w-4 text-brand-primary transition-transform ${
                      expandedSections.hazardProtection ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                
                {expandedSections.hazardProtection && (
                  <div className="space-y-2 max-h-40 overflow-y-auto pr-2 mt-2">
                    {hazardProtectionFilters.map((filter) => (
                      <div key={filter.id} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`hazardProtection-${filter.id}`} 
                          checked={selectedHazardProtections.includes(filter.id)}
                          onCheckedChange={() => toggleHazardProtection(filter.id)}
                          className="data-[state=checked]:bg-brand-primary data-[state=checked]:border-brand-primary"
                        />
                        <label 
                          htmlFor={`hazardProtection-${filter.id}`}
                          className="text-sm text-brand-secondary dark:text-gray-300 cursor-pointer"
                        >
                          {t(filter.translationKey)}
                        </label>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Temperature Rating Filter */}
              <div className="pb-4">
                <button 
                  className="flex w-full items-center justify-between mb-2"
                  onClick={() => toggleSection('temperature')}
                >
                  <h3 className="text-sm font-medium text-brand-dark dark:text-white">
                    {t('products.filters.temperature')}
                    {selectedTempRatings.length > 0 && (
                      <Badge className="ml-2 bg-brand-primary text-white">{selectedTempRatings.length}</Badge>
                    )}
                  </h3>
                  <ChevronDown 
                    className={`h-4 w-4 text-brand-primary transition-transform ${
                      expandedSections.temperature ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                
                {expandedSections.temperature && (
                  <div className="space-y-2 max-h-40 overflow-y-auto pr-2 mt-2">
                    {tempRatings.map((temp) => (
                      <div key={temp} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`tempRating-${temp}`} 
                          checked={selectedTempRatings.includes(temp.toString())}
                          onCheckedChange={() => toggleTempRating(temp.toString())}
                          className="data-[state=checked]:bg-brand-primary data-[state=checked]:border-brand-primary"
                        />
                        <label 
                          htmlFor={`tempRating-${temp}`}
                          className="text-sm text-brand-secondary dark:text-gray-300 cursor-pointer"
                        >
                          {temp}°C
                        </label>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </FilterSection>
          )}

          {/* Category-specific extra filters (e.g., swabs) come last to match desktop order */}
          {extraFiltersRender}
        </div>
        
        <SheetFooter className="mt-6">
          <div className="flex space-x-4 w-full">
            <Button 
              variant="outline" 
              className="flex-1 border-brand-primary/30 text-brand-primary hover:bg-brand-primary/10 hover:border-brand-primary hover:text-black dark:hover:text-white dark:hover:bg-brand-primary/5 transition-all duration-300 group" 
              onClick={clearFilters}
            >
              <X className="mr-1.5 h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
              {t('products.filters.clearAll')}
            </Button>
            <Button 
              className="flex-1 bg-brand-primary text-white hover:bg-brand-primary/90" 
              onClick={() => setIsOpen(false)}
            >
              {t('products.filters.apply')}
            </Button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}; 