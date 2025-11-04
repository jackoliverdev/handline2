"use client";

import { Switch } from "@/components/ui/switch";
import { useLanguage } from "@/lib/context/language-context";

export function LowTemperatureFilterMobile({ value, onChange }: { value: boolean; onChange: (v: boolean) => void; }) {
  const { t } = useLanguage();
  return (
    <div className="flex items-center justify-between py-2">
      <span className="text-sm text-brand-dark dark:text-white">{t('products.filters.lowTemperature') || 'Low-temperature performance'}</span>
      <Switch checked={value} onCheckedChange={onChange} />
    </div>
  );
}


