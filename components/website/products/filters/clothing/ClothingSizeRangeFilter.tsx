"use client";

import { useLanguage } from "@/lib/context/language-context";
import { ChevronDown } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

interface Props {
  bounds: { min: number; max: number } | null;
  value: { min?: number; max?: number };
  onChange: (next: { min?: number; max?: number }) => void;
  isExpanded?: boolean;
  toggleSection?: (section: string) => void;
}

const SIZE_OPTIONS = [
  { label: 'XS', value: 1 },
  { label: 'S', value: 2 },
  { label: 'M', value: 3 },
  { label: 'L', value: 4 },
  { label: 'XL', value: 5 },
  { label: '2XL', value: 6 },
  { label: '3XL', value: 7 },
  { label: '4XL', value: 8 },
  { label: '5XL', value: 9 },
  { label: '6XL', value: 10 },
  { label: '7XL', value: 11 },
  { label: '8XL', value: 12 },
];

export const ClothingSizeRangeFilter = ({ bounds, value, onChange, isExpanded, toggleSection }: Props) => {
  const { t } = useLanguage();
  const [localExpanded, setLocalExpanded] = useState(false);
  const open = isExpanded ?? localExpanded;

  return (
    <div className="pb-2">
      <button className="flex w-full items-center justify-between mb-2" onClick={() => (toggleSection ? toggleSection("sizeRange") : setLocalExpanded(v => !v))}>
        <h3 className="text-sm font-medium text-brand-dark dark:text-white">{t('products.filters.size')}</h3>
        <ChevronDown className={`h-4 w-4 text-brand-primary transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="text-xs text-brand-secondary dark:text-gray-300 mb-1 block">Min</label>
            <Select 
              value={value.min ? String(value.min) : "none"} 
              onValueChange={(v) => onChange({ min: v === 'none' ? undefined : parseInt(v), max: value.max })}
            >
              <SelectTrigger className="h-8 text-sm">
                <SelectValue placeholder="Any" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">Any</SelectItem>
                {SIZE_OPTIONS.map((size) => (
                  <SelectItem key={size.value} value={String(size.value)}>
                    {size.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-xs text-brand-secondary dark:text-gray-300 mb-1 block">Max</label>
            <Select 
              value={value.max ? String(value.max) : "none"} 
              onValueChange={(v) => onChange({ min: value.min, max: v === 'none' ? undefined : parseInt(v) })}
            >
              <SelectTrigger className="h-8 text-sm">
                <SelectValue placeholder="Any" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">Any</SelectItem>
                {SIZE_OPTIONS.map((size) => (
                  <SelectItem key={size.value} value={String(size.value)}>
                    {size.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      )}
    </div>
  );
};

