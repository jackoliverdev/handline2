"use client";

import { useLanguage } from "@/lib/context/language-context";
import { ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";

interface Props {
  bounds: { min: number; max: number } | null;
  value: { min?: number; max?: number };
  onChange: (next: { min?: number; max?: number }) => void;
  isExpanded?: boolean;
  toggleSection?: (section: string) => void;
}

export const SizeRangeFilter = ({ bounds, value, onChange, isExpanded, toggleSection }: Props) => {
  const { t } = useLanguage();
  const [localExpanded, setLocalExpanded] = useState(false);
  const open = isExpanded ?? localExpanded;
  const [minVal, setMinVal] = useState<string>(value.min ? String(value.min) : "");
  const [maxVal, setMaxVal] = useState<string>(value.max ? String(value.max) : "");

  useEffect(() => {
    setMinVal(value.min ? String(value.min) : "");
    setMaxVal(value.max ? String(value.max) : "");
  }, [value.min, value.max]);

  return (
    <div className="pb-4">
      <button className="flex w-full items-center justify-between mb-2" onClick={() => (toggleSection ? toggleSection("sizeRange") : setLocalExpanded(v => !v))}>
        <h3 className="text-sm font-medium text-brand-dark dark:text-white">{t('products.filters.sizeRange')}</h3>
        <ChevronDown className={`h-4 w-4 text-brand-primary transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="text-xs text-brand-secondary dark:text-gray-300">Min</label>
            <Input type="number" value={minVal} onChange={(e) => setMinVal(e.target.value)} onBlur={() => onChange({ min: minVal ? parseInt(minVal) : undefined, max: value.max })} className="h-8 text-sm" placeholder={bounds ? String(bounds.min) : ''} />
          </div>
          <div>
            <label className="text-xs text-brand-secondary dark:text-gray-300">Max</label>
            <Input type="number" value={maxVal} onChange={(e) => setMaxVal(e.target.value)} onBlur={() => onChange({ min: value.min, max: maxVal ? parseInt(maxVal) : undefined })} className="h-8 text-sm" placeholder={bounds ? String(bounds.max) : ''} />
          </div>
        </div>
      )}
    </div>
  );
};


