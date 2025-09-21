"use client";

import { useLanguage } from "@/lib/context/language-context";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

interface Props {
  value: boolean | null;
  onChange: (val: boolean | null) => void;
  isExpanded?: boolean;
  toggleSection?: (section: string) => void;
}

export const ESDFilter = ({ value, onChange, isExpanded, toggleSection }: Props) => {
  const { t } = useLanguage();
  const [localExpanded, setLocalExpanded] = useState(false);
  const open = isExpanded ?? localExpanded;
  const opts: Array<{ label: string; v: boolean | null }> = [
    { label: t('products.filters.any') || 'Any', v: null },
    { label: t('common.yes') || 'Yes', v: true },
    { label: t('common.no') || 'No', v: false },
  ];
  return (
    <div className="border-b border-brand-primary/10 dark:border-brand-primary/20 pb-4">
      <button className="flex w-full items-center justify-between mb-2" onClick={() => (toggleSection ? toggleSection("esd") : setLocalExpanded(v => !v))}>
        <h3 className="text-sm font-medium text-brand-dark dark:text-white">{t('products.filters.esd')}</h3>
        <ChevronDown className={`h-4 w-4 text-brand-primary transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="grid grid-cols-3 gap-2">
          {opts.map(o => (
            <button key={String(o.v)} onClick={() => onChange(o.v)} className={`text-xs rounded px-2 py-1 border ${value === o.v ? 'bg-brand-primary text-white border-brand-primary' : 'bg-white dark:bg-black/40 text-brand-dark dark:text-white border-brand-primary/20'}`}>
              {o.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};


