"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/context/language-context";
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronDown } from "lucide-react";

export function WorkEnvironmentFilter({ options, selected, onToggle, isExpanded, toggleSection }: { options: string[]; selected: string[]; onToggle: (opt: string) => void; isExpanded?: boolean; toggleSection?: (id: string) => void; }) {
  const { t } = useLanguage();
  const [localOpen, setLocalOpen] = useState(false);
  const open = isExpanded ?? localOpen;
  
  const labelFor = (key: string) => {
    const labels: Record<string, string> = {
      chemical: t('productPage.workEnvironment.chemical') || 'Chemical Exposure',
      biological: t('productPage.workEnvironment.biological') || 'Biological Hazards',
      electrical: t('productPage.workEnvironment.electrical') || 'Electrical risk'
    };
    return labels[key] || key;
  };
  
  return (
    <div className="pb-2">
      <button className="flex w-full items-center justify-between mb-2" onClick={() => (toggleSection ? toggleSection("eyeFaceWorkEnv") : setLocalOpen(v => !v))}>
        <h3 className="text-sm font-medium text-brand-dark dark:text-white">{t('productPage.workEnvironmentSuitability') || 'Work Environment Suitability'}</h3>
        <ChevronDown className={`h-4 w-4 text-brand-primary transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="space-y-2 max-h-[240px] overflow-y-auto">
          {options.map(opt => (
            <div key={opt} className="flex items-center space-x-2">
              <Checkbox id={`workenv-${opt}`} checked={selected.includes(opt)} onCheckedChange={() => onToggle(opt)} className="data-[state=checked]:bg-brand-primary data-[state=checked]:border-brand-primary" />
              <label htmlFor={`workenv-${opt}`} className="text-sm text-brand-secondary dark:text-gray-300 cursor-pointer">{labelFor(opt)}</label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

