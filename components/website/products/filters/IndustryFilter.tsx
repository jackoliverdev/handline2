import { ChevronDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { useLanguage } from "@/lib/context/language-context";

interface IndustryFilterProps {
  industries: string[];
  selectedIndustries: string[];
  toggleIndustry: (industry: string) => void;
  isExpanded: boolean;
  toggleSection: (section: string) => void;
}

export const IndustryFilter = ({
  industries,
  selectedIndustries,
  toggleIndustry,
  isExpanded,
  toggleSection,
}: IndustryFilterProps) => {
  const { t } = useLanguage();
  if (industries.length === 0) return null;

  return (
    <div className="border-b border-brand-primary/10 dark:border-brand-primary/20 pb-4">
      <button
        className="flex w-full items-center justify-between mb-2"
        onClick={() => toggleSection("industries")}
      >
        <h3 className="text-sm font-medium text-brand-dark dark:text-white">
          {t('products.filters.industries')}
          {selectedIndustries.length > 0 && (
            <Badge className="ml-2 bg-brand-primary text-white">{selectedIndustries.length}</Badge>
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
          {industries.map((industry) => (
            <div key={industry} className="flex items-center space-x-2 px-1">
              <Checkbox
                id={`industry-sidebar-${industry}`}
                checked={selectedIndustries.includes(industry)}
                onCheckedChange={() => toggleIndustry(industry)}
                className="data-[state=checked]:bg-brand-primary data-[state=checked]:border-brand-primary"
              />
              <label
                htmlFor={`industry-sidebar-${industry}`}
                className="text-sm text-brand-secondary dark:text-gray-300 cursor-pointer w-full py-1"
              >
                {industry}
              </label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}; 