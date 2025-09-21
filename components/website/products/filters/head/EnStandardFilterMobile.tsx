"use client";

import { useLanguage } from "@/lib/context/language-context";
import { Checkbox } from "@/components/ui/checkbox";

const ALL_STD = ['EN 397','EN 50365','EN 12492','EN 812'];

export function EnStandardFilterMobile({ selected, onToggle }: { selected: string[]; onToggle: (opt: string) => void; }) {
  const { t } = useLanguage();
  const options = ALL_STD;
  return (
    <div className="space-y-2">
      <h3 className="text-sm font-medium text-brand-dark dark:text-white">EN Standards</h3>
      {options.map(opt => (
        <div key={opt} className="flex items-center space-x-2">
          <Checkbox id={`enstd-m-${opt}`} checked={selected.includes(opt)} onCheckedChange={() => onToggle(opt)} />
          <label htmlFor={`enstd-m-${opt}`} className="text-sm text-brand-secondary dark:text-gray-300">{opt}</label>
        </div>
      ))}
    </div>
  );
}


