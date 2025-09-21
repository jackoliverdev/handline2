"use client";

import { Switch } from "@/components/ui/switch";
import { useLanguage } from "@/lib/context/language-context";

export function VentilationFilter({ value, onChange }: { value: boolean; onChange: (v: boolean) => void; }) {
  const { t } = useLanguage();
  return (
    <div className="flex items-center justify-between py-3 border-b border-brand-primary/10 dark:border-brand-primary/20">
      <span className="text-sm text-brand-dark dark:text-white">{t('products.filters.ventilation') || 'Ventilation'}</span>
      <Switch checked={value} onCheckedChange={onChange} />
    </div>
  );
}


