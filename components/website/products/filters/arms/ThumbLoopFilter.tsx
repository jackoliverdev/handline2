"use client";

import { useLanguage } from "@/lib/context/language-context";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

interface Props {
  value: boolean | null;
  onChange: (val: boolean | null) => void;
  isExpanded?: boolean;
  toggleSection?: (id: string) => void;
}

export const ThumbLoopFilter = ({ value, onChange, isExpanded, toggleSection }: Props) => {
  const { t } = useLanguage();
  const [localOpen, setLocalOpen] = useState(false);
  const open = isExpanded ?? localOpen;
  return (
    <div className="border-b border-brand-primary/10 dark:border-brand-primary/20 pb-4">
      <button className="flex w-full items-center justify-between mb-2" onClick={() => (toggleSection ? toggleSection('thumbLoop') : setLocalOpen(v => !v))}>
        <h3 className="text-sm font-medium text-brand-dark dark:text-white">{t('products.filters.thumbLoop') || 'Thumb loop'}</h3>
        <ChevronDown className={`h-4 w-4 text-brand-primary transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="flex gap-2">
          {[{ label: t('productPage.yes') || 'Yes', val: true }, { label: t('productPage.no') || 'No', val: false }].map(o => (
            <button
              key={String(o.val)}
              className={`px-2 py-1 text-xs rounded border ${value === o.val ? 'bg-[#F28C38] text-white border-[#F28C38]' : 'border-brand-primary/20 text-brand-dark dark:text-white'}`}
              onClick={() => onChange(value === o.val ? null : o.val)}
            >
              {o.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};


