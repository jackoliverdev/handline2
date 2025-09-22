"use client";

import { useLanguage } from "@/lib/context/language-context";
import { Checkbox } from "@/components/ui/checkbox";

export function ClothingCategoryFilterMobile({ options, selected, onToggle }: { options: string[]; selected: string[]; onToggle: (v: string) => void; }) {
  const { t } = useLanguage();
  return (
    <div className="space-y-2 py-2">
      <h3 className="text-sm font-medium text-brand-dark dark:text-white">{t('products.filters.clothingCategory.title') || 'Clothing Category'}</h3>
      {options.map((val) => (
        <div key={val} className="flex items-center space-x-2">
          <Checkbox id={`ccm-${val}`} checked={selected.includes(val)} onCheckedChange={() => onToggle(val)} className="data-[state=checked]:bg-brand-primary data-[state=checked]:border-brand-primary" />
          <label htmlFor={`ccm-${val}`} className="text-sm text-brand-secondary dark:text-gray-300 cursor-pointer">{val}</label>
        </div>
      ))}
    </div>
  );
}


