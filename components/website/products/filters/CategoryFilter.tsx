import { ChevronDown } from "lucide-react";
import { useLanguage } from "@/lib/context/language-context";

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  isExpanded: boolean;
  toggleSection: (section: string) => void;
}

export const CategoryFilter = ({
  categories,
  selectedCategory,
  setSelectedCategory,
  isExpanded,
  toggleSection,
}: CategoryFilterProps) => {
  const { t } = useLanguage();
  return (
    <div className="border-b border-brand-primary/10 dark:border-brand-primary/20 pb-4">
      <button
        className="flex w-full items-center justify-between mb-2"
        onClick={() => toggleSection("category")}
        aria-controls="category-content"
        aria-expanded={isExpanded}
      >
        <h3 className="text-sm font-medium text-brand-dark dark:text-white">{t('products.filters.category')}</h3>
        <ChevronDown
          className={`h-4 w-4 text-brand-primary transition-transform ${
            isExpanded ? "rotate-180" : ""
          }`}
        />
      </button>

      <div id="category-content" className={isExpanded ? "block" : "hidden"}>
        <div className="max-h-[240px] overflow-y-auto pr-1 space-y-2 mt-2">
          <div
            className={`px-3 py-1.5 rounded-md cursor-pointer ${
              !selectedCategory || selectedCategory === "all"
                ? "bg-brand-primary/10 text-brand-primary font-medium"
                : "text-brand-secondary dark:text-gray-300 hover:bg-white/60 dark:hover:bg-gray-800/60"
            }`}
            onClick={() => setSelectedCategory("all")}
          >
            {t('products.filters.allCategories')}
          </div>
          {categories.map((category) => (
            <div
              key={category}
              className={`px-3 py-1.5 rounded-md cursor-pointer ${
                selectedCategory === category
                  ? "bg-brand-primary/10 text-brand-primary font-medium"
                  : "text-brand-secondary dark:text-gray-300 hover:bg-white/60 dark:hover:bg-gray-800/60"
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}; 