"use client";

import { Switch } from "@/components/ui/switch";
import { useLanguage } from "@/lib/context/language-context";

export function LowTemperatureFilter({ value, onChange, withDivider = true }: { value: boolean; onChange: (v: boolean) => void; withDivider?: boolean; }) {
  const { t } = useLanguage();
  return (
    <div className={`flex items-center justify-between py-3`}>
      <span className="text-sm text-brand-dark dark:text-white">{t('products.filters.lowTemperature')}</span>
      <Switch checked={value} onCheckedChange={onChange} />
    </div>
  );
}


