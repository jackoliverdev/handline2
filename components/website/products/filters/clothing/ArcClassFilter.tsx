"use client";

import { useLanguage } from "@/lib/context/language-context";
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

export function ArcClassFilter({ options, selected, onToggle, isExpanded, toggleSection }: { options: number[]; selected: number[]; onToggle: (n: number) => void; isExpanded?: boolean; toggleSection?: (id: string) => void; }) {
  const { t } = useLanguage();
  const [localOpen, setLocalOpen] = useState(false);
  const open = isExpanded ?? localOpen;
  return (
    <div className="pb-4">
      <button className="flex w-full items-center justify-between mb-2" onClick={() => (toggleSection ? toggleSection("clothingArc") : setLocalOpen(v => !v))}>
        <h3 className="text-sm font-medium text-brand-dark dark:text-white">{t('products.filters.arcClass')}</h3>
        <ChevronDown className={`h-4 w-4 text-brand-primary transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="space-y-2">
          {options.map((c) => (
            <div key={c} className="flex items-center space-x-2">
              <Checkbox id={`arc-${c}`} checked={selected.includes(c)} onCheckedChange={() => onToggle(c)} className="data-[state=checked]:bg-brand-primary data-[state=checked]:border-brand-primary" />
              <label htmlFor={`arc-${c}`} className="text-sm text-brand-secondary dark:text-gray-300 cursor-pointer">C{c}</label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}


