import { ChevronDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { useLanguage } from "@/lib/context/language-context";

interface TemperatureFilterProps {
  tempRatings: number[];
  selectedTempRatings: string[];
  toggleTempRating: (temp: string) => void;
  isExpanded: boolean;
  toggleSection: (section: string) => void;
  nested?: boolean;
}

export const TemperatureFilter = ({
  tempRatings,
  selectedTempRatings,
  toggleTempRating,
  isExpanded,
  toggleSection,
  nested = false,
}: TemperatureFilterProps) => {
  const { t } = useLanguage();
  if (tempRatings.length === 0) return null;

  return (
    <div className="pb-2">
      <button
        className="flex w-full items-center justify-between mb-2"
        onClick={() => toggleSection("temperature")}
      >
        <h3 className="text-sm font-medium text-brand-dark dark:text-white">
          {t('products.filters.temperature')}
          {selectedTempRatings.length > 0 && (
            <Badge className="ml-2 bg-brand-primary text-white">{selectedTempRatings.length}</Badge>
          )}
        </h3>
        <ChevronDown
          className={`h-4 w-4 text-brand-primary transition-transform ${
            isExpanded ? "rotate-180" : ""
          }`}
        />
      </button>

      {isExpanded && (
        <div className="max-h-[240px] overflow-y-auto pr-1 space-y-2 mt-2">
          {tempRatings.map((temp) => (
            <div key={temp} className="flex items-center space-x-2 px-1">
              <Checkbox
                id={`tempRating-desktop-${temp}`}
                checked={selectedTempRatings.includes(temp.toString())}
                onCheckedChange={() => toggleTempRating(temp.toString())}
                className="data-[state=checked]:bg-brand-primary data-[state=checked]:border-brand-primary"
              />
              <label
                htmlFor={`tempRating-desktop-${temp}`}
                className="text-sm text-brand-secondary dark:text-gray-300 cursor-pointer w-full py-1"
              >
                {temp}°C
              </label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}; 