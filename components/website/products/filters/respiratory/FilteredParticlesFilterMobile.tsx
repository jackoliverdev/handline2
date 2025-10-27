"use client";

import { useLanguage } from "@/lib/context/language-context";
import { Checkbox } from "@/components/ui/checkbox";

interface Props {
  options: string[];
  selected: string[];
  onToggle: (opt: string) => void;
}

export const FilteredParticlesFilterMobile = ({ options, selected, onToggle }: Props) => {
  const { t } = useLanguage();
  
  if (options.length === 0) return null;
  
  return (
    <div className="pb-4">
      <h3 className="text-base font-medium text-brand-dark dark:text-white mb-2">{t('products.filters.filteredParticles')}</h3>
      <div className="space-y-2 max-h-[240px] overflow-y-auto">
        {options.map(opt => (
          <div key={opt} className="flex items-center space-x-2">
            <Checkbox id={`particle-m-${opt}`} checked={selected.includes(opt)} onCheckedChange={() => onToggle(opt)} className="data-[state=checked]:bg-brand-primary data-[state=checked]:border-brand-primary" />
            <label htmlFor={`particle-m-${opt}`} className="text-sm text-brand-secondary dark:text-gray-300 cursor-pointer">
              {opt} - {t(`productPage.respiratoryStandards.gases.${opt.toLowerCase()}`)}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

