"use client";

import { useLanguage } from "@/lib/context/language-context";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function SizeRangeFilterMobile({ bounds, value, onChange }: { bounds: { min: number; max: number } | null; value: { min?: number; max?: number }; onChange: (v: { min?: number; max?: number }) => void; }) {
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
          {t('products.filters.sizeRange')}
          {active && <Badge className="ml-2 bg-brand-primary text-white">1</Badge>}
        </span>
        <ChevronDown className={`h-4 w-4 text-brand-primary transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="grid grid-cols-2 gap-2 mt-2">
          <div>
            <label className="block text-xs text-brand-secondary dark:text-gray-300 mb-1">{t('products.filters.min') || 'Min'}</label>
            <Input type="number" className="h-9 text-sm" placeholder={bounds ? String(bounds.min) : ''} value={value.min ?? ''} onChange={(e) => onChange({ min: e.target.value ? parseInt(e.target.value) : undefined, max: value.max })} />
          </div>
          <div>
            <label className="block text-xs text-brand-secondary dark:text-gray-300 mb-1">{t('products.filters.max') || 'Max'}</label>
            <Input type="number" className="h-9 text-sm" placeholder={bounds ? String(bounds.max) : ''} value={value.max ?? ''} onChange={(e) => onChange({ min: value.min, max: e.target.value ? parseInt(e.target.value) : undefined })} />
          </div>
        </div>
      )}
    </div>
  );
}



