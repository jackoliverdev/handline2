"use client";

import { useLanguage } from "@/lib/context/language-context";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { Switch } from "@/components/ui/switch";

interface Props {
  value: boolean | null;
  onChange: (val: boolean | null) => void;
  isExpanded?: boolean;
  toggleSection?: (id: string) => void;
}

export const ReusableFilter = ({ value, onChange, isExpanded, toggleSection }: Props) => {
  const { t } = useLanguage();
  const [localOpen, setLocalOpen] = useState(false);
  const open = isExpanded ?? localOpen;
  return (
    <div className="border-b border-brand-primary/10 dark:border-brand-primary/20 pb-4">
      <button className="flex w-full items-center justify-between mb-2" onClick={() => (toggleSection ? toggleSection('hearingReusable') : setLocalOpen(v => !v))}>
        <h3 className="text-sm font-medium text-brand-dark dark:text-white">{t('products.filters.reusable') || 'Reusable'}</h3>
        <ChevronDown className={`h-4 w-4 text-brand-primary transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="flex items-center justify-between py-1">
          <div className="text-xs text-brand-dark/70 dark:text-gray-300">R / NR</div>
          <div className="flex items-center gap-3">
            {value !== null && (
              <button className="text-xs underline text-brand-primary/90" onClick={() => onChange(null)}>Any</button>
            )}
            <Switch checked={value === true} onCheckedChange={(c) => onChange(c)} />
          </div>
        </div>
      )}
    </div>
  );
};


