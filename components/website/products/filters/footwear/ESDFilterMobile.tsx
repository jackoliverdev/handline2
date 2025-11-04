"use client";

import { useLanguage } from "@/lib/context/language-context";
import { Switch } from "@/components/ui/switch";

export function ESDFilterMobile({ value, onChange }: { value: boolean; onChange: (v: boolean) => void; }) {
  const { t } = useLanguage();
  return (
    <div className="pb-4">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-medium text-brand-dark dark:text-white">{t('products.filters.esd')}</h3>
        <Switch checked={value} onCheckedChange={onChange} />
      </div>
    </div>
  );
}



