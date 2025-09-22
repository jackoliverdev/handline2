"use client";

import { useLanguage } from "@/lib/context/language-context";
import { Checkbox } from "@/components/ui/checkbox";

export function ClothingTypeFilterMobile({ options, selected, onToggle }: { options: string[]; selected: string[]; onToggle: (v: string) => void; }) {
  const { t } = useLanguage();

  const labelFor = (val: string) => {
    switch (val) {
      case 'welding': return t('products.filters.clothingType.options.welding');
      case 'high-visibility': return t('products.filters.clothingType.options.highVisibility');
      case 'safety-workwear': return t('products.filters.clothingType.options.safetyWorkwear');
      default: return val;
    }
  };

  return (
    <div className="space-y-2 py-2">
      <h3 className="text-sm font-medium text-brand-dark dark:text-white">{t('products.filters.clothingType.title') || 'Clothing Type'}</h3>
      {options.map((val) => (
        <div key={val} className="flex items-center space-x-2">
          <Checkbox id={`ctm-${val}`} checked={selected.includes(val)} onCheckedChange={() => onToggle(val)} className="data-[state=checked]:bg-brand-primary data-[state=checked]:border-brand-primary" />
          <label htmlFor={`ctm-${val}`} className="text-sm text-brand-secondary dark:text-gray-300 cursor-pointer">{labelFor(val)}</label>
        </div>
      ))}
    </div>
  );
}


