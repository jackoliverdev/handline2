import { Product } from "@/lib/products-service";

/**
 * Formats a cut resistance level for display
 * @param level The raw cut resistance level string
 * @returns Formatted cut level string
 */
export const formatCutLevel = (level: string): string => {
  if (level === "CE Category I") return level;
  
  const match = level.match(/EN388: (\d{4})/);
  if (match) {
    const code = match[1];
    return `EN388: ${code}`;
  }
  return level;
};

/**
 * Extracts unique values from an array of products by a specific property
 * @param products The product array
 * @param key The property to extract unique values from
 * @returns Array of unique values
 */
export const extractUniqueValues = <T, K extends keyof Product>(
  products: Product[], 
  key: K
): Product[K][] => {
  return Array.from(
    new Set(
      products
        .map(product => product[key])
        .filter(Boolean)
    )
  ) as Product[K][];
};

/**
 * Extracts unique temperature ratings from products and sorts them numerically
 * @param products Array of products
 * @returns Sorted array of unique temperature ratings
 */
export const getUniqueTempRatings = (products: Product[]): number[] => {
  return Array.from(
    new Set(
      products
        .filter(product => product.temperature_rating !== null)
        .map(product => product.temperature_rating)
    )
  ).sort((a, b) => Number(a) - Number(b)) as number[];
};

/**
 * Extracts unique cut resistance levels from products
 * @param products Array of products
 * @returns Array of unique cut resistance levels
 */
export const getUniqueCutLevels = (products: Product[]): string[] => {
  return Array.from(
    new Set(
      products
        .filter(product => product.cut_resistance_level)
        .map(product => product.cut_resistance_level)
    )
  ) as string[];
};

/**
 * Extracts unique industries from all products
 * @param products Array of products
 * @returns Sorted array of unique industries
 */
export const getUniqueIndustries = (products: Product[]): string[] => {
  return Array.from(
    new Set(
      products
        .flatMap(product => product.industries || [])
    )
  ).sort() as string[];
};

/**
 * Extracts unique subcategories based on selected category
 * @param products Array of products
 * @param selectedCategory The currently selected category (or 'all')
 * @returns Array of unique subcategories
 */
export const getUniqueSubCategories = (
  products: Product[],
  selectedCategory: string
): string[] => {
  return Array.from(
    new Set(
      products
        .filter(product => !selectedCategory || selectedCategory === "all" || product.category === selectedCategory)
        .map(product => product.sub_category)
        .filter(Boolean)
    )
  ) as string[];
};

/**
 * Sorts categories based on preferred order
 * @param categories Array of category names
 * @param preferredOrder Array defining the preferred order
 * @returns Sorted array of categories
 */
export const sortCategoriesByPreference = (
  categories: string[],
  preferredOrder: string[]
): string[] => {
  return [...categories].sort((a, b) => {
    const indexA = preferredOrder.indexOf(a);
    const indexB = preferredOrder.indexOf(b);
    
    // If both categories are in preferredOrder, sort by their position
    if (indexA !== -1 && indexB !== -1) {
      return indexA - indexB;
    }
    
    // If only a is in preferredOrder, it comes first
    if (indexA !== -1) {
      return -1;
    }
    
    // If only b is in preferredOrder, it comes first
    if (indexB !== -1) {
      return 1;
    }
    
    // If neither is in preferredOrder, sort alphabetically
    return a.localeCompare(b);
  });
}; 