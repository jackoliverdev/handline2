"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/context/language-context";
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronDown } from "lucide-react";

export function LensTintFilter({ options, selected, onToggle, isExpanded, toggleSection }: { options: string[]; selected: string[]; onToggle: (opt: string) => void; isExpanded?: boolean; toggleSection?: (id: string) => void; }) {
  const { t } = useLanguage();
  const [localOpen, setLocalOpen] = useState(false);
  const open = isExpanded ?? localOpen;
  const humanise = (key: string) => key.replace(/_/g, ' ').toLowerCase();
  const capitaliseWords = (s: string) => s.replace(/\b\w/g, (m) => m.toUpperCase());
  const labelFor = (key: string) => {
    const tKey = `productPage.lensTintTypes.${key}`;
    const translated = t(tKey);
    return translated === tKey ? capitaliseWords(humanise(key)) : translated;
  };
  return (
    <div className="pb-4">
      <button className="flex w-full items-center justify-between mb-2" onClick={() => (toggleSection ? toggleSection("eyeFaceTint") : setLocalOpen(v => !v))}>
        <h3 className="text-sm font-medium text-brand-dark dark:text-white">{t('products.filters.lensTint')}</h3>
        <ChevronDown className={`h-4 w-4 text-brand-primary transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="space-y-2 max-h-[240px] overflow-y-auto">
          {options.map(opt => (
            <div key={opt} className="flex items-center space-x-2">
              <Checkbox id={`tint-${opt}`} checked={selected.includes(opt)} onCheckedChange={() => onToggle(opt)} className="data-[state=checked]:bg-brand-primary data-[state=checked]:border-brand-primary" />
              <label htmlFor={`tint-${opt}`} className="text-sm text-brand-secondary dark:text-gray-300 cursor-pointer">{labelFor(opt)}</label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}


