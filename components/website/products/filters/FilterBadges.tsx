import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useLanguage } from "@/lib/context/language-context";
import { hazardProtectionFilters } from "@/content/hazardfilters";

interface FilterBadgesProps {
  selectedCategory: string;
  selectedSubCategories: string[];
  selectedTempRatings: string[];
  selectedHazardProtections: string[];
  selectedIndustries: string[];
  setSelectedCategory: (category: string) => void;
  toggleSubCategory: (subCategory: string) => void;
  toggleTempRating: (temp: string) => void;
  toggleHazardProtection: (hazard: string) => void;
  toggleIndustry: (industry: string) => void;
  clearFilters: () => void;
}

export const FilterBadges = ({
  selectedCategory,
  selectedSubCategories,
  selectedTempRatings,
  selectedHazardProtections,
  selectedIndustries,
  setSelectedCategory,
  toggleSubCategory,
  toggleTempRating,
  toggleHazardProtection,
  toggleIndustry,
  clearFilters,
}: FilterBadgesProps) => {
  const { t } = useLanguage();
  const activeFiltersCount = 
    (selectedCategory && selectedCategory !== "all" ? 1 : 0) +
    selectedSubCategories.length +
    selectedTempRatings.length +
    selectedHazardProtections.length +
    selectedIndustries.length;
  
  if (activeFiltersCount === 0) return null;

  return (
    <div className="mb-4 md:hidden flex flex-wrap gap-2 items-center">
      <span className="text-sm text-brand-secondary dark:text-gray-400">{t('products.filters.activeFilters')}</span>
      
      {selectedCategory && selectedCategory !== "all" && (
        <Badge 
          variant="secondary" 
          className="flex items-center gap-1 bg-brand-primary/10 text-brand-primary hover:bg-brand-primary/20"
        >
          {selectedCategory}
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-4 w-4 p-0 hover:bg-transparent"
            onClick={() => setSelectedCategory("")}
          >
            <X className="h-3 w-3" />
          </Button>
        </Badge>
      )}
      
      {selectedSubCategories.map(subCategory => (
        <Badge 
          key={subCategory}
          variant="secondary" 
          className="flex items-center gap-1 bg-brand-primary/10 text-brand-primary hover:bg-brand-primary/20"
        >
          {subCategory}
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-4 w-4 p-0 hover:bg-transparent"
            onClick={() => toggleSubCategory(subCategory)}
          >
            <X className="h-3 w-3" />
          </Button>
        </Badge>
      ))}
      
      {selectedTempRatings.map(temp => (
        <Badge 
          key={temp}
          variant="secondary" 
          className="flex items-center gap-1 bg-brand-primary/10 text-brand-primary hover:bg-brand-primary/20"
        >
          {temp}°C
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-4 w-4 p-0 hover:bg-transparent"
            onClick={() => toggleTempRating(temp)}
          >
            <X className="h-3 w-3" />
          </Button>
        </Badge>
      ))}
      
      {selectedHazardProtections.map(hazard => (
        <Badge 
          key={hazard}
          variant="secondary" 
          className="flex items-center gap-1 bg-brand-primary/10 text-brand-primary hover:bg-brand-primary/20"
        >
          {hazardProtectionFilters.find(f => f.id === hazard)?.name || hazard}
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-4 w-4 p-0 hover:bg-transparent"
            onClick={() => toggleHazardProtection(hazard)}
          >
            <X className="h-3 w-3" />
          </Button>
        </Badge>
      ))}
      
      {selectedIndustries.map(industry => (
        <Badge 
          key={industry}
          variant="secondary" 
          className="flex items-center gap-1 bg-brand-primary/10 text-brand-primary hover:bg-brand-primary/20"
        >
          {industry}
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-4 w-4 p-0 hover:bg-transparent"
            onClick={() => toggleIndustry(industry)}
          >
            <X className="h-3 w-3" />
          </Button>
        </Badge>
      ))}
      
      <Button 
        variant="ghost" 
        size="sm" 
        className="text-xs text-brand-primary hover:text-brand-primary/80 hover:bg-transparent px-2 h-6"
        onClick={clearFilters}
      >
        {t('products.filters.clearAll')}
      </Button>
    </div>
  );
}; 