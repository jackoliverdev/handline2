"use client";

import { useLanguage } from "@/lib/context/language-context";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function EyeFaceEnStandardFilterMobile({ options, selected, onToggle }: { options: string[]; selected: string[]; onToggle: (opt: string) => void; }) {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button
        className="flex w-full items-center justify-between py-2 text-left text-base font-medium text-brand-dark dark:text-white"
        onClick={() => setOpen((v) => !v)}
      >
        <span className="flex items-center">
          {t('products.filters.standardCodes')}
          {selected.length > 0 && <Badge className="ml-2 bg-brand-primary text-white">{selected.length}</Badge>}
        </span>
        <ChevronDown className={`h-4 w-4 text-brand-primary transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="space-y-2 max-h-40 overflow-y-auto pr-2 mt-2">
          {options.map(opt => (
            <div key={opt} className="flex items-center space-x-2">
              <Checkbox id={`ef-enstd-m-${opt}`} checked={selected.includes(opt)} onCheckedChange={() => onToggle(opt)} className="data-[state=checked]:bg-brand-primary data-[state=checked]:border-brand-primary" />
              <label htmlFor={`ef-enstd-m-${opt}`} className="text-sm text-brand-secondary dark:text-gray-300 cursor-pointer">{opt}</label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}


