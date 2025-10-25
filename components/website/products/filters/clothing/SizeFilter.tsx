"use client";

import { useLanguage } from "@/lib/context/language-context";
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

export function SizeFilter({ options, selected, onToggle, isExpanded, toggleSection, defaultOpen }: { options: string[]; selected: string[]; onToggle: (v: string) => void; isExpanded?: boolean; toggleSection?: (id: string) => void; defaultOpen?: boolean; }) {
  const { t } = useLanguage();
  const [localOpen, setLocalOpen] = useState(!!defaultOpen);
  const open = isExpanded ?? localOpen;

  if (options.length === 0) return null;

  return (
    <div className="pb-4">
      <button className="flex w-full items-center justify-between mb-2" onClick={() => (toggleSection ? toggleSection("size") : setLocalOpen(v => !v))}>
        <h3 className="text-sm font-medium text-brand-dark dark:text-white">{t('products.filters.size')}</h3>
        <ChevronDown className={`h-4 w-4 text-brand-primary transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="space-y-2 max-h-[180px] overflow-y-auto">
          {options.map((val) => (
            <div key={val} className="flex items-center space-x-2">
              <Checkbox id={`size-${val}`} checked={selected.includes(val)} onCheckedChange={() => onToggle(val)} className="data-[state=checked]:bg-brand-primary data-[state=checked]:border-brand-primary" />
              <label htmlFor={`size-${val}`} className="text-sm text-brand-secondary dark:text-gray-300 cursor-pointer">{val}</label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

