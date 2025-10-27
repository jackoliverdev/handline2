"use client";

import { useLanguage } from "@/lib/context/language-context";
import { Checkbox } from "@/components/ui/checkbox";

export function ClassFilterMobile({ options, selected, onToggle }: { options: string[]; selected: string[]; onToggle: (opt: string) => void; }) {
  const { t } = useLanguage();
  return (
    <div className="pb-4">
      <h3 className="text-base font-medium text-brand-dark dark:text-white mb-2">{t('products.filters.footwearClass')}</h3>
      <div className="space-y-2 max-h-[240px] overflow-y-auto">
          {options.map(opt => (
          <div key={opt} className="flex items-center space-x-2">
            <Checkbox id={`fw-class-m-${opt}`} checked={selected.includes(opt)} onCheckedChange={() => onToggle(opt)} className="data-[state=checked]:bg-brand-primary data-[state=checked]:border-brand-primary" />
            <label htmlFor={`fw-class-m-${opt}`} className="text-sm text-brand-secondary dark:text-gray-300 cursor-pointer">{opt}</label>
          </div>
        ))}
      </div>
    </div>
  );
}



