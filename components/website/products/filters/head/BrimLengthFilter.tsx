"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/context/language-context";
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronDown } from "lucide-react";

export function BrimLengthFilter({ options, selected, onToggle, isExpanded, toggleSection }: { options: string[]; selected: string[]; onToggle: (opt: string) => void; isExpanded?: boolean; toggleSection?: (id: string) => void; }) {
  const { t } = useLanguage();
  const [openLocal, setOpenLocal] = useState(false);
  const open = isExpanded ?? openLocal;
  return (
    <div className="pb-2">
      <button className="flex w-full items-center justify-between text-left text-sm text-brand-dark dark:text-white py-3" onClick={() => toggleSection ? toggleSection('brim') : setOpenLocal(!open)}>
        {t('products.filters.brimLength') || 'Brim length'}
        <ChevronDown className={`h-4 w-4 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="mt-2 space-y-2">
          {options.map(opt => (
            <label key={opt} className="flex items-center space-x-2">
              <Checkbox id={`brim-${opt}`} checked={selected.includes(opt)} onCheckedChange={() => onToggle(opt)} />
              <span className="text-sm text-brand-secondary dark:text-gray-300 capitalize">{opt}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}


