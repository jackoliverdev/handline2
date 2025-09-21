"use client";

import { useLanguage } from "@/lib/context/language-context";
import { Checkbox } from "@/components/ui/checkbox";

interface Props {
  options: number[];
  selected: number[];
  onToggle: (opt: number) => void;
}

export const SnrFilterMobile = ({ options, selected, onToggle }: Props) => {
  const { t } = useLanguage();
  return (
    <div className="mt-2">
      <h3 className="text-sm font-medium text-brand-dark dark:text-white mb-2">{t('products.filters.snr') || 'SNR'}</h3>
      <div className="space-y-2">
        {options.map(opt => (
          <div key={opt} className="flex items-center space-x-2">
            <Checkbox id={`snr-mobile-${opt}`} checked={selected.includes(opt)} onCheckedChange={() => onToggle(opt)} className="data-[state=checked]:bg-brand-primary data-[state=checked]:border-brand-primary" />
            <label htmlFor={`snr-mobile-${opt}`} className="text-sm text-brand-secondary dark:text-gray-300 cursor-pointer">{opt} dB</label>
          </div>
        ))}
      </div>
    </div>
  );
};


