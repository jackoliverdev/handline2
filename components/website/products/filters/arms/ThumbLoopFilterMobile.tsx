"use client";

import { useLanguage } from "@/lib/context/language-context";

interface Props {
  value: boolean | null;
  onChange: (val: boolean | null) => void;
}

export const ThumbLoopFilterMobile = ({ value, onChange }: Props) => {
  const { t } = useLanguage();
  return (
    <div className="border-b border-brand-primary/10 dark:border-brand-primary/20 pb-4">
      <h3 className="text-base font-medium text-brand-dark dark:text-white mb-2">{t('products.filters.thumbLoop') || 'Thumb loop'}</h3>
      <div className="flex gap-2">
        {[{ label: t('productPage.yes') || 'Yes', val: true }, { label: t('productPage.no') || 'No', val: false }].map(o => (
          <button
            key={String(o.val)}
            className={`px-2 py-1 text-xs rounded border ${value === o.val ? 'bg-[#F28C38] text-white border-[#F28C38]' : 'border-brand-primary/20 text-brand-dark dark:text-white'}`}
            onClick={() => onChange(value === o.val ? null : o.val)}
          >
            {o.label}
          </button>
        ))}
      </div>
    </div>
  );
};


