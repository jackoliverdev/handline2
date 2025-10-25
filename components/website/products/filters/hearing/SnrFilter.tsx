"use client";

import { useLanguage } from "@/lib/context/language-context";
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

interface Props {
  options: number[];
  selected: number[];
  onToggle: (opt: number) => void;
  isExpanded?: boolean;
  toggleSection?: (id: string) => void;
}

export const SnrFilter = ({ options, selected, onToggle, isExpanded, toggleSection }: Props) => {
  const { t } = useLanguage();
  const [localOpen, setLocalOpen] = useState(false);
  const open = isExpanded ?? localOpen;
  return (
    <div className="pb-4">
      <button className="flex w-full items-center justify-between mb-2" onClick={() => (toggleSection ? toggleSection("hearingSnr") : setLocalOpen(v => !v))}>
        <h3 className="text-sm font-medium text-brand-dark dark:text-white">{t('products.filters.snr')}</h3>
        <ChevronDown className={`h-4 w-4 text-brand-primary transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="space-y-2 max-h-[240px] overflow-y-auto">
          {options.map(opt => (
            <div key={opt} className="flex items-center space-x-2">
              <Checkbox id={`snr-${opt}`} checked={selected.includes(opt)} onCheckedChange={() => onToggle(opt)} className="data-[state=checked]:bg-brand-primary data-[state=checked]:border-brand-primary" />
              <label htmlFor={`snr-${opt}`} className="text-sm text-brand-secondary dark:text-gray-300 cursor-pointer">{opt} dB</label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};


