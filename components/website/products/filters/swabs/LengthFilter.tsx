"use client";

import { useLanguage } from "@/lib/context/language-context";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

interface LengthFilterProps {
  // Range mode (unused for swabs now, but kept for compatibility)
  min?: number;
  max?: number;
  value?: { min: number; max: number };
  onChange?: (next: { min: number; max: number }) => void;
  // Options mode (used for swabs)
  options?: string[];
  selected?: string[];
  onToggle?: (option: string) => void;
  isExpanded?: boolean;
  toggleSection?: (section: string) => void;
  isMobile?: boolean;
}

export const LengthFilter = ({
  min,
  max,
  value,
  onChange,
  options,
  selected = [],
  onToggle,
  isExpanded,
  toggleSection,
  isMobile = false,
}: LengthFilterProps) => {
  const { t } = useLanguage();
  const [localExpanded, setLocalExpanded] = useState(false);

  return (
    <div className="pb-2">
      <button
        className="flex w-full items-center justify-between mb-2"
        onClick={() => (toggleSection ? toggleSection("length") : setLocalExpanded((v) => !v))}
      >
        <h3 className="text-sm font-medium text-brand-dark dark:text-white">
          {t("products.filters.length")}
        </h3>
        <ChevronDown
          className={`h-4 w-4 text-brand-primary transition-transform ${
            (isExpanded ?? localExpanded) ? "rotate-180" : ""
          }`}
        />
      </button>

      {(isExpanded ?? localExpanded) && (
        options && options.length > 0 ? (
          <div className={`space-y-2 max-h-[240px] overflow-y-auto ${isMobile ? "px-2" : ""}`}>
            {options.map((opt) => {
              const id = `length-${opt.replace(/[^a-zA-Z0-9]/g, "-")}`;
              return (
                <div key={opt} className="flex items-center space-x-2">
                  <Checkbox
                    id={id}
                    checked={selected.includes(opt)}
                    onCheckedChange={() => onToggle && onToggle(opt)}
                    className="data-[state=checked]:bg-brand-primary data-[state=checked]:border-brand-primary"
                  />
                  <label htmlFor={id} className="text-sm text-brand-secondary dark:text-gray-300 cursor-pointer">
                    {opt}
                  </label>
                </div>
              );
            })}
          </div>
        ) : (
          <div className={`grid grid-cols-2 gap-2 ${isMobile ? "px-2" : ""}`}>
            <div>
              <label className="block text-xs text-brand-secondary dark:text-gray-300 mb-1">
                {t("products.filters.min") || "Min"}
              </label>
              <Input
                type="number"
                value={value!.min}
                min={min}
                max={value!.max}
                onChange={(e) =>
                  onChange && onChange({ min: Number(e.target.value || min), max: value!.max })
                }
                className="h-9"
              />
            </div>
            <div>
              <label className="block text-xs text-brand-secondary dark:text-gray-300 mb-1">
                {t("products.filters.max") || "Max"}
              </label>
              <Input
                type="number"
                value={value!.max}
                min={value!.min}
                max={max}
                onChange={(e) =>
                  onChange && onChange({ min: value!.min, max: Number(e.target.value || max) })
                }
                className="h-9"
              />
            </div>
            <div className="col-span-2 text-[10px] text-brand-secondary dark:text-gray-400 mt-1">
              {t("products.filters.lengthUnitNote") || "Units as per product data"}
            </div>
          </div>
        )
      )}
    </div>
  );
};


