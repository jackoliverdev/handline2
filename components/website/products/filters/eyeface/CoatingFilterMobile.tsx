"use client";

import { useLanguage } from "@/lib/context/language-context";
import { Checkbox } from "@/components/ui/checkbox";

export function CoatingFilterMobile({ options, selected, onToggle }: { options: string[]; selected: string[]; onToggle: (opt: string) => void; }) {
  const { t } = useLanguage();
  const humanise = (key: string) => key.replace(/_/g, ' ').replace(/\b\w/g, (m) => m.toUpperCase());
  const labelFor = (key: string) => {
    const tKey = `productPage.coatingTypes.${key}`;
    const translated = t(tKey);
    return translated === tKey ? humanise(key) : translated;
  };
  return (
    <div className="space-y-2">
      <h3 className="text-sm font-medium text-brand-dark dark:text-white">{t('products.filters.coating') || 'Coating'}</h3>
      {options.map(opt => (
        <div key={opt} className="flex items-center space-x-2">
          <Checkbox id={`coat-m-${opt}`} checked={selected.includes(opt)} onCheckedChange={() => onToggle(opt)} className="data-[state=checked]:bg-brand-primary data-[state=checked]:border-brand-primary" />
          <label htmlFor={`coat-m-${opt}`} className="text-sm text-brand-secondary dark:text-gray-300 cursor-pointer">{labelFor(opt)}</label>
        </div>
      ))}
    </div>
  );
}


