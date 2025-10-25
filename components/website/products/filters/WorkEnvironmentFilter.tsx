"use client";

import { useLanguage } from "@/lib/context/language-context";
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronDown } from "lucide-react";
import { workEnvironmentFilters } from "@/content/workenvironmentfilters";

interface WorkEnvironmentFilterProps {
  selectedWorkEnvironments: string[];
  toggleWorkEnvironment: (environment: string) => void;
  isExpanded: boolean;
  toggleSection: (section: string) => void;
  isMobile?: boolean;
}

export const WorkEnvironmentFilter = ({
  selectedWorkEnvironments,
  toggleWorkEnvironment,
  isExpanded,
  toggleSection,
  isMobile = false
}: WorkEnvironmentFilterProps) => {
  const { t } = useLanguage();
  
  if (workEnvironmentFilters.length === 0) return null;

  return (
    <div className="pb-4">
      <button
        className="flex w-full items-center justify-between mb-2"
        onClick={() => toggleSection('workEnvironment')}
      >
        <h3 className="text-sm font-medium text-brand-dark dark:text-white">
          {t('products.filters.workEnvironment')}
        </h3>
        <ChevronDown
          className={`h-4 w-4 text-brand-primary transition-transform ${
            isExpanded ? "rotate-180" : ""
          }`}
        />
      </button>
      
      <div className={isExpanded ? "block" : "hidden"}>
        <div className={`max-h-[240px] overflow-y-auto pr-1 space-y-3 mt-2 ${isMobile ? 'px-2' : ''}`}>
          {workEnvironmentFilters.map((environment) => (
            <div key={environment.id} className="flex items-center space-x-3 group">
              <Checkbox
                id={`environment-${isMobile ? 'mobile-' : ''}${environment.id}`}
                checked={selectedWorkEnvironments.includes(environment.id)}
                onCheckedChange={() => toggleWorkEnvironment(environment.id)}
                className="data-[state=checked]:bg-brand-primary data-[state=checked]:border-brand-primary"
              />
              <label
                htmlFor={`environment-${isMobile ? 'mobile-' : ''}${environment.id}`}
                className="text-sm text-brand-secondary dark:text-gray-300 cursor-pointer"
              >
                {t(environment.translationKey)}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}; 