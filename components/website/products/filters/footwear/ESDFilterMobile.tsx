"use client";

import { useLanguage } from "@/lib/context/language-context";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function ESDFilterMobile({ value, onChange }: { value: boolean | null; onChange: (v: boolean | null) => void; }) {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button
        className="flex w-full items-center justify-between py-2 text-left text-base font-medium text-brand-dark dark:text-white"
        onClick={() => setOpen((v) => !v)}
      >
        <span className="flex items-center">
          {t('products.filters.esd')}
          {value !== null && <Badge className="ml-2 bg-brand-primary text-white">1</Badge>}
        </span>
        <ChevronDown className={`h-4 w-4 text-brand-primary transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="flex items-center justify-between mt-2">
          <div className="text-sm text-brand-dark/70 dark:text-gray-300">{t('productPage.yes') || 'Yes'} / {t('productPage.no') || 'No'}</div>
          <div className="flex items-center gap-3">
            {value !== null && (
              <button className="text-xs underline text-brand-primary/90" onClick={() => onChange(null)}>{t('products.filters.any') || 'Any'}</button>
            )}
            <Switch checked={value === true} onCheckedChange={(c) => onChange(c)} />
          </div>
        </div>
      )}
    </div>
  );
}



