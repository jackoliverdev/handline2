"use client";

import { useLanguage } from "@/lib/context/language-context";
import { Checkbox } from "@/components/ui/checkbox";
import { workEnvironmentFilters } from "@/content/workenvironmentfilters";

interface WorkEnvironmentFilterMobileProps {
  selectedWorkEnvironments: string[];
  toggleWorkEnvironment: (environment: string) => void;
}

export const WorkEnvironmentFilterMobile = ({
  selectedWorkEnvironments,
  toggleWorkEnvironment,
}: WorkEnvironmentFilterMobileProps) => {
  const { t } = useLanguage();
  
  if (workEnvironmentFilters.length === 0) return null;

  return (
    <div className="pb-4">
      <h3 className="text-base font-medium text-brand-dark dark:text-white mb-2">{t('products.filters.workEnvironment')}</h3>
      <div className="space-y-2 max-h-[200px] overflow-y-auto pr-1">
        {workEnvironmentFilters.map((filter) => (
          <div key={filter.id} className="flex items-center space-x-2 px-1">
            <Checkbox
              id={`work-env-mobile-${filter.id}`}
              checked={selectedWorkEnvironments.includes(filter.id)}
              onCheckedChange={() => toggleWorkEnvironment(filter.id)}
              className="data-[state=checked]:bg-brand-primary data-[state=checked]:border-brand-primary"
            />
            <label
              htmlFor={`work-env-mobile-${filter.id}`}
              className="text-sm text-brand-secondary dark:text-gray-300 cursor-pointer w-full py-1"
            >
              {t(filter.translationKey)}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};
