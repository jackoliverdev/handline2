"use client";

import { useLanguage } from "@/lib/context/language-context";
import { Checkbox } from "@/components/ui/checkbox";

export function ProtectionTypeFilterMobile({ selected, onToggle }: { selected: string[]; onToggle: (opt: string) => void; }) {
  const { t } = useLanguage();
  const options = ['IR','UV','Arc'];
  return (
    <div className="pb-4">
      <h3 className="text-base font-medium text-brand-dark dark:text-white mb-2">{t('products.filters.protectionType') || 'Protection type'}</h3>
      <div className="space-y-2 max-h-[240px] overflow-y-auto">
          {options.map(opt => (
          <div key={opt} className="flex items-center space-x-2">
            <Checkbox id={`prot-m-${opt}`} checked={selected.includes(opt)} onCheckedChange={() => onToggle(opt)} className="data-[state=checked]:bg-brand-primary data-[state=checked]:border-brand-primary" />
            <label htmlFor={`prot-m-${opt}`} className="text-sm text-brand-secondary dark:text-gray-300 cursor-pointer">{opt}</label>
          </div>
        ))}
      </div>
    </div>
  );
}


