"use client";

import { useLanguage } from "@/lib/context/language-context";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";

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

export function ClothingSizeRangeFilterMobile({ bounds, value, onChange }: { bounds: { min: number; max: number } | null; value: { min?: number; max?: number }; onChange: (v: { min?: number; max?: number }) => void; }) {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const active = (value.min !== undefined) || (value.max !== undefined);
  
  return (
    <div>
      <button
        className="flex w-full items-center justify-between py-2 text-left text-base font-medium text-brand-dark dark:text-white"
        onClick={() => setOpen((v) => !v)}
      >
        <span className="flex items-center">
          {t('products.filters.size')}
          {active && <Badge className="ml-2 bg-brand-primary text-white">1</Badge>}
        </span>
        <ChevronDown className={`h-4 w-4 text-brand-primary transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="grid grid-cols-2 gap-2 mt-2">
          <div>
            <label className="block text-xs text-brand-secondary dark:text-gray-300 mb-1">{t('products.filters.min') || 'Min'}</label>
            <Select 
              value={value.min ? String(value.min) : "none"} 
              onValueChange={(v) => onChange({ min: v === 'none' ? undefined : parseInt(v), max: value.max })}
            >
              <SelectTrigger className="h-9 text-sm">
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
            <label className="block text-xs text-brand-secondary dark:text-gray-300 mb-1">{t('products.filters.max') || 'Max'}</label>
            <Select 
              value={value.max ? String(value.max) : "none"} 
              onValueChange={(v) => onChange({ min: value.min, max: v === 'none' ? undefined : parseInt(v) })}
            >
              <SelectTrigger className="h-9 text-sm">
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
}

