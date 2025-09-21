"use client";

import { useLanguage } from "@/lib/context/language-context";
import { Switch } from "@/components/ui/switch";

interface Props {
  value: boolean | null;
  onChange: (val: boolean | null) => void;
}

export const ReusableFilterMobile = ({ value, onChange }: Props) => {
  const { t } = useLanguage();
  return (
    <div className="mt-2">
      <h3 className="text-sm font-medium text-brand-dark dark:text-white mb-2">{t('products.filters.reusable') || 'Reusable'}</h3>
      <div className="flex items-center justify-between">
        <div className="text-xs text-brand-dark/70 dark:text-gray-300">R / NR</div>
        <div className="flex items-center gap-3">
          {value !== null && (
            <button className="text-xs underline text-brand-primary/90" onClick={() => onChange(null)}>Any</button>
          )}
          <Switch checked={value === true} onCheckedChange={(c) => onChange(c)} />
        </div>
      </div>
    </div>
  );
};


