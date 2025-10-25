"use client";

import { useLanguage } from "@/lib/context/language-context";
import { Checkbox } from "@/components/ui/checkbox";

export function SizeFilterMobile({ options, selected, onToggle }: { options: string[]; selected: string[]; onToggle: (v: string) => void; }) {
  const { t } = useLanguage();

  if (options.length === 0) return null;

  return (
    <div className="pb-4">
      <h3 className="text-base font-medium text-brand-dark dark:text-white mb-2">{t('products.filters.size')}</h3>
      <div className="space-y-2 max-h-[180px] overflow-y-auto">
        {options.map((val) => (
          <div key={val} className="flex items-center space-x-2">
            <Checkbox id={`sizem-${val}`} checked={selected.includes(val)} onCheckedChange={() => onToggle(val)} className="data-[state=checked]:bg-brand-primary data-[state=checked]:border-brand-primary" />
            <label htmlFor={`sizem-${val}`} className="text-sm text-brand-secondary dark:text-gray-300 cursor-pointer">{val}</label>
          </div>
        ))}
      </div>
    </div>
  );
}

