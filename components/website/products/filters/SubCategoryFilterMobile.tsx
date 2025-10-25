"use client";

import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { useLanguage } from "@/lib/context/language-context";

interface SubCategoryFilterMobileProps {
  subCategories: string[];
  selectedSubCategories: string[];
  toggleSubCategory: (subCategory: string) => void;
}

export const SubCategoryFilterMobile = ({
  subCategories,
  selectedSubCategories,
  toggleSubCategory,
}: SubCategoryFilterMobileProps) => {
  const { t } = useLanguage();
  if (subCategories.length === 0) return null;

  return (
    <div className="pb-4">
      <h3 className="text-base font-medium text-brand-dark dark:text-white mb-2">
        {t('products.filters.subCategory')}
        {selectedSubCategories.length > 0 && (
          <Badge className="ml-2 bg-brand-primary text-white">{selectedSubCategories.length}</Badge>
        )}
      </h3>

      <div className="max-h-[200px] overflow-y-auto pr-1 space-y-2 mt-2">
        {subCategories.map((subCategory) => (
          <div key={subCategory} className="flex items-center space-x-2 px-1">
            <Checkbox
              id={`subCategory-mobile-${subCategory}`}
              checked={selectedSubCategories.includes(subCategory)}
              onCheckedChange={() => toggleSubCategory(subCategory)}
              className="data-[state=checked]:bg-brand-primary data-[state=checked]:border-brand-primary"
            />
            <label
              htmlFor={`subCategory-mobile-${subCategory}`}
              className="text-sm text-brand-secondary dark:text-gray-300 cursor-pointer w-full py-1"
            >
              {subCategory}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

