import { ChevronDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { formatCutLevel } from "@/lib/product-utils";
import { useLanguage } from "@/lib/context/language-context";

interface CutLevelFilterProps {
  cutLevels: string[];
  selectedCutLevels: string[];
  toggleCutLevel: (level: string) => void;
  isExpanded: boolean;
  toggleSection: (section: string) => void;
}

export const CutLevelFilter = ({
  cutLevels,
  selectedCutLevels,
  toggleCutLevel,
  isExpanded,
  toggleSection,
}: CutLevelFilterProps) => {
  const { t } = useLanguage();
  if (cutLevels.length === 0) return null;

  return (
    <div className="pb-2">
      <button
        className="flex w-full items-center justify-between mb-2"
        onClick={() => toggleSection("cutLevel")}
      >
        <h3 className="text-sm font-medium text-brand-dark dark:text-white">
          {t('products.filters.cutLevel')}
          {selectedCutLevels.length > 0 && (
            <Badge className="ml-2 bg-brand-primary text-white">{selectedCutLevels.length}</Badge>
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
          {cutLevels.map((level) => (
            <div key={level} className="flex items-center space-x-2 px-1">
              <Checkbox
                id={`cutLevel-desktop-${level}`}
                checked={selectedCutLevels.includes(level)}
                onCheckedChange={() => toggleCutLevel(level)}
                className="data-[state=checked]:bg-brand-primary data-[state=checked]:border-brand-primary"
              />
              <label
                htmlFor={`cutLevel-desktop-${level}`}
                className="text-sm text-brand-secondary dark:text-gray-300 cursor-pointer w-full py-1"
              >
                {formatCutLevel(level)}
              </label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}; 