"use client";

import { Switch } from "@/components/ui/switch";
import { useLanguage } from "@/lib/context/language-context";

export function ElectricalInsulationFilter({ value, onChange, withDivider = true }: { value: boolean; onChange: (v: boolean) => void; withDivider?: boolean; }) {
  const { t } = useLanguage();
  return (
    <div className={`flex items-center justify-between py-3 ${withDivider ? 'border-b border-brand-primary/10 dark:border-brand-primary/20' : ''}`}>
      <span className="text-sm text-brand-dark dark:text-white">{t('products.filters.electricalInsulation') || 'Electrical insulation (EN 50365)'}</span>
      <Switch checked={value} onCheckedChange={onChange} />
    </div>
  );
}


