"use client";

import { useLanguage } from "@/lib/context/language-context";
import { Checkbox } from "@/components/ui/checkbox";

export function BrimLengthFilterMobile({ options, selected, onToggle }: { options: string[]; selected: string[]; onToggle: (opt: string) => void; }) {
  const { t } = useLanguage();
  return (
    <div className="space-y-2">
      <h3 className="text-sm font-medium text-brand-dark dark:text-white">{t('products.filters.brimLength') || 'Brim length'}</h3>
      {options.map(opt => (
        <div key={opt} className="flex items-center space-x-2">
          <Checkbox id={`brim-m-${opt}`} checked={selected.includes(opt)} onCheckedChange={() => onToggle(opt)} />
          <label htmlFor={`brim-m-${opt}`} className="text-sm text-brand-secondary dark:text-gray-300 capitalize">{opt}</label>
        </div>
      ))}
    </div>
  );
}


