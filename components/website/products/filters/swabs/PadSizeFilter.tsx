"use client";

import { useLanguage } from "@/lib/context/language-context";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

interface PadSizeFilterProps {
  // For swabs we show discrete options like "45×75" rather than ranges
  options: string[];
  selected: string[];
  onToggle: (option: string) => void;
  isExpanded?: boolean;
  toggleSection?: (section: string) => void;
  isMobile?: boolean;
}

export const PadSizeFilter = ({
  options,
  selected,
  onToggle,
  isExpanded,
  toggleSection,
  isMobile = false,
}: PadSizeFilterProps) => {
  const { t } = useLanguage();
  const [localExpanded, setLocalExpanded] = useState(false);

  if (!options || options.length === 0) return null;

  return (
    <div className="border-b border-brand-primary/10 dark:border-brand-primary/20 pb-4">
      <button
        className="flex w-full items-center justify-between mb-2"
        onClick={() => (toggleSection ? toggleSection("padSize") : setLocalExpanded((v) => !v))}
      >
        <h3 className="text-sm font-medium text-brand-dark dark:text-white">
          {t("products.filters.padSize") || "Pad size"}
        </h3>
        <ChevronDown className={`h-4 w-4 text-brand-primary transition-transform ${(isExpanded ?? localExpanded) ? "rotate-180" : ""}`} />
      </button>

      {(isExpanded ?? localExpanded) && (
        <div className={`space-y-2 max-h-[240px] overflow-y-auto ${isMobile ? "px-2" : ""}`}>
          {options.map((opt) => {
            const id = `pad-${opt.replace(/[^a-zA-Z0-9]/g, "-")}`;
            return (
              <div key={opt} className="flex items-center space-x-2">
                <Checkbox
                  id={id}
                  checked={selected.includes(opt)}
                  onCheckedChange={() => onToggle(opt)}
                  className="data-[state=checked]:bg-brand-primary data-[state=checked]:border-brand-primary"
                />
                <label htmlFor={id} className="text-sm text-brand-secondary dark:text-gray-300 cursor-pointer">
                  {opt}
                </label>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};


