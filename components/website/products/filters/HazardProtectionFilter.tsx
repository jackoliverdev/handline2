"use client";

import { useLanguage } from "@/lib/context/language-context";
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronDown } from "lucide-react";
import { hazardProtectionFilters } from "@/content/hazardfilters";

interface HazardProtectionFilterProps {
  selectedHazardProtections: string[];
  toggleHazardProtection: (hazard: string) => void;
  isExpanded: boolean;
  toggleSection: (section: string) => void;
  isMobile?: boolean;
}

export const HazardProtectionFilter = ({
  selectedHazardProtections,
  toggleHazardProtection,
  isExpanded,
  toggleSection,
  isMobile = false
}: HazardProtectionFilterProps) => {
  const { t } = useLanguage();
  
  if (hazardProtectionFilters.length === 0) return null;

  return (
    <div className="border-b border-brand-primary/10 dark:border-brand-primary/20 pb-4">
      <button
        className="flex w-full items-center justify-between mb-2"
        onClick={() => toggleSection('hazardProtection')}
      >
        <h3 className="text-sm font-medium text-brand-dark dark:text-white">
          Hazard Protection
        </h3>
        <ChevronDown
          className={`h-4 w-4 text-brand-primary transition-transform ${
            isExpanded ? "rotate-180" : ""
          }`}
        />
      </button>
      
      <div className={isExpanded ? "block" : "hidden"}>
        <div className={`max-h-[240px] overflow-y-auto pr-1 space-y-3 mt-2 ${isMobile ? 'px-2' : ''}`}>
          {hazardProtectionFilters.map((hazard) => (
            <div key={hazard.id} className="flex items-center space-x-3 group">
              <Checkbox
                id={`hazard-${isMobile ? 'mobile-' : ''}${hazard.id}`}
                checked={selectedHazardProtections.includes(hazard.id)}
                onCheckedChange={() => toggleHazardProtection(hazard.id)}
                className="data-[state=checked]:bg-brand-primary data-[state=checked]:border-brand-primary"
              />
              <label
                htmlFor={`hazard-${isMobile ? 'mobile-' : ''}${hazard.id}`}
                className="text-sm text-brand-secondary dark:text-gray-300 cursor-pointer"
              >
                {hazard.name}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}; 