"use client";

import { Switch } from "@/components/ui/switch";
import { useLanguage } from "@/lib/context/language-context";

interface Props {
  value: boolean;
  onChange: (val: boolean) => void;
}

export const ThumbLoopFilter = ({ value, onChange }: Props) => {
  const { t } = useLanguage();
  return (
    <div className="pb-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-brand-dark dark:text-white">{t('products.filters.thumbLoop')}</h3>
        <Switch checked={value} onCheckedChange={onChange} />
      </div>
    </div>
  );
};


