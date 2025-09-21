"use client";

import { useLanguage } from "@/lib/context/language-context";

export function ArcClassFilterMobile({ options, selected, onToggle }: { options: number[]; selected: number[]; onToggle: (n: number) => void; }) {
  const { t } = useLanguage();
  return (
    <div className="py-3 border-b border-brand-primary/10 dark:border-brand-primary/20">
      <div className="text-sm font-medium text-brand-dark dark:text-white mb-2">{t('products.filters.arcClass') || 'Arc protection class'}</div>
      <div className="flex flex-wrap gap-2">
        {options.map(c => (
          <button key={c} onClick={() => onToggle(c)} className={`text-xs rounded px-2 py-1 border transition-colors ${selected.includes(c) ? 'bg-brand-primary text-white border-brand-primary' : 'bg-white dark:bg-black/40 text-brand-dark dark:text-white border-brand-primary/30 hover:border-brand-primary'}`}>
            C{c}
          </button>
        ))}
      </div>
    </div>
  );
}


