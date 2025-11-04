"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { ChevronDown } from "lucide-react";
import { useLanguage } from "@/lib/context/language-context";

interface ENStandardFilterProps {
  standards: string[];
  selectedStandards: string[];
  toggleStandard: (standard: string) => void;
  isExpanded: boolean;
  toggleSection: (section: string) => void;
}

export const ENStandardFilter = ({
  standards,
  selectedStandards,
  toggleStandard,
  isExpanded,
  toggleSection,
}: ENStandardFilterProps) => {
  const { t } = useLanguage();

  if (standards.length === 0) return null;

  return (
    <div className="pb-2">
      <button
        className="flex w-full items-center justify-between mb-2"
        onClick={() => toggleSection("enStandard")}
      >
        <h3 className="text-sm font-medium text-brand-dark dark:text-white">
          {t('products.filters.enStandard')}
          {selectedStandards.length > 0 && (
            <Badge className="ml-2 bg-brand-primary text-white">{selectedStandards.length}</Badge>
          )}
        </h3>
        <ChevronDown
          className={`h-4 w-4 text-brand-primary transition-transform ${
            isExpanded ? "rotate-180" : ""
          }`}
        />
      </button>

      {isExpanded && (
        <div className="max-h-[200px] overflow-y-auto pr-1 space-y-2 mt-2">
          {standards.map((standard) => (
            <div key={standard} className="flex items-center space-x-2 px-1">
              <Checkbox
                id={`enStandard-desktop-${standard}`}
                checked={selectedStandards.includes(standard)}
                onCheckedChange={() => toggleStandard(standard)}
                className="data-[state=checked]:bg-brand-primary data-[state=checked]:border-brand-primary"
              />
              <label
                htmlFor={`enStandard-desktop-${standard}`}
                className="text-sm text-brand-secondary dark:text-gray-300 cursor-pointer w-full py-1"
              >
                {standard}
              </label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

