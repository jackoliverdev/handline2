import { ChevronDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { useLanguage } from "@/lib/context/language-context";

interface SubCategoryFilterProps {
  subCategories: string[];
  selectedSubCategories: string[];
  toggleSubCategory: (subCategory: string) => void;
  isExpanded: boolean;
  toggleSection: (section: string) => void;
}

export const SubCategoryFilter = ({
  subCategories,
  selectedSubCategories,
  toggleSubCategory,
  isExpanded,
  toggleSection,
}: SubCategoryFilterProps) => {
  const { t } = useLanguage();
  if (subCategories.length === 0) return null;

  return (
    <div className="pb-4">
      <button
        className="flex w-full items-center justify-between mb-2"
        onClick={() => toggleSection("subCategory")}
      >
        <h3 className="text-sm font-medium text-brand-dark dark:text-white">
          {t('products.filters.subCategory')}
          {selectedSubCategories.length > 0 && (
            <Badge className="ml-2 bg-brand-primary text-white">{selectedSubCategories.length}</Badge>
          )}
        </h3>
        <ChevronDown
          className={`h-4 w-4 text-brand-primary transition-transform ${
            isExpanded ? "rotate-180" : ""
          }`}
        />
      </button>

      {isExpanded && (
        <div className="max-h-[200px] overflow-y-auto pr-1 space-y-2 mt-2">
          {subCategories.map((subCategory) => (
            <div key={subCategory} className="flex items-center space-x-2 px-1">
              <Checkbox
                id={`subCategory-desktop-${subCategory}`}
                checked={selectedSubCategories.includes(subCategory)}
                onCheckedChange={() => toggleSubCategory(subCategory)}
                className="data-[state=checked]:bg-brand-primary data-[state=checked]:border-brand-primary"
              />
              <label
                htmlFor={`subCategory-desktop-${subCategory}`}
                className="text-sm text-brand-secondary dark:text-gray-300 cursor-pointer w-full py-1"
              >
                {subCategory}
              </label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}; 