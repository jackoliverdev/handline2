"use client";

import { useLanguage } from "@/lib/context/language-context";
import { Checkbox } from "@/components/ui/checkbox";

export function WorkEnvironmentFilterMobile({ options, selected, onToggle }: { options: string[]; selected: string[]; onToggle: (opt: string) => void; }) {
  const { t } = useLanguage();
  
  const labelFor = (key: string) => {
    const labels: Record<string, string> = {
      chemical: t('productPage.workEnvironment.chemical') || 'Chemical Exposure',
      biological: t('productPage.workEnvironment.biological') || 'Biological Hazards',
      electrical: t('productPage.workEnvironment.electrical') || 'Electrical risk'
    };
    return labels[key] || key;
  };
  
  return (
    <div className="pb-4">
      <h3 className="text-base font-medium text-brand-dark dark:text-white mb-2">{t('productPage.workEnvironmentSuitability') || 'Work Environment Suitability'}</h3>
      <div className="space-y-2 max-h-[240px] overflow-y-auto">
        {options.map(opt => (
          <div key={opt} className="flex items-center space-x-2">
            <Checkbox id={`workenv-m-${opt}`} checked={selected.includes(opt)} onCheckedChange={() => onToggle(opt)} className="data-[state=checked]:bg-brand-primary data-[state=checked]:border-brand-primary" />
            <label htmlFor={`workenv-m-${opt}`} className="text-sm text-brand-secondary dark:text-gray-300 cursor-pointer">{labelFor(opt)}</label>
          </div>
        ))}
      </div>
    </div>
  );
}

