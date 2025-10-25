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
 * Extracts unique heat resistance levels from products
 * @param products Array of products
 * @returns Array of unique heat resistance levels
 */
export const getUniqueHeatLevels = (products: Product[]): string[] => {
  return Array.from(
    new Set(
      products
        .filter(product => product.heat_resistance_level)
        .map(product => product.heat_resistance_level)
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

/**
 * Extracts all EN standards present in a single product
 * @param product A product object
 * @returns Array of EN standard codes present in the product
 */
export const getProductENStandards = (product: Product): string[] => {
  const standards: string[] = [];

  // Check gloves safety standards
  if (product.safety?.en_388?.enabled) {
    standards.push('EN 388');
  }
  if (product.safety?.en_407?.enabled) {
    standards.push('EN 407');
  }
  if (product.safety?.en_374_1 || product.safety?.en_374_5) {
    standards.push('EN 374');
  }
  if (product.safety?.en_511?.enabled) {
    standards.push('EN 511');
  }
  if (product.safety?.en_421) {
    standards.push('EN 421');
  }
  if (product.safety?.en_iso_21420) {
    standards.push('EN ISO 21420');
  }
  if (product.safety?.en_12477) {
    standards.push('EN 12477');
  }
  if (product.safety?.en_659) {
    standards.push('EN 659');
  }
  if (product.safety?.en_16350) {
    standards.push('EN 16350');
  }
  if (product.safety?.en_381_7) {
    standards.push('EN 381-7');
  }
  if (product.safety?.en_60903) {
    standards.push('EN 60903');
  }
  if (product.safety?.en_1082_1) {
    standards.push('EN 1082-1');
  }

  // Check respiratory standards
  if (product.respiratory_standards) {
    const respStds = product.respiratory_standards as any;
    if (respStds.en_149) standards.push('EN 149');
    if (respStds.en_140) standards.push('EN 140');
    if (respStds.en_143) standards.push('EN 143');
    if (respStds.din_3181_3) standards.push('DIN 3181-3');
  }

  // Check hearing standards
  if ((product as any).hearing_standards?.en352) {
    standards.push('EN 352');
  }

  // Check footwear standards
  if ((product as any).footwear_standards?.en_iso_20345_2011) {
    standards.push('EN ISO 20345:2011');
  }
  if ((product as any).footwear_standards?.en_iso_20345_2022) {
    standards.push('EN ISO 20345:2022');
  }

  // Check eye & face standards
  const eyeStd = (product as any).eye_face_standards;
  if (eyeStd?.en166) standards.push('EN 166');
  if (eyeStd?.en169) standards.push('EN 169');
  if (eyeStd?.en170) standards.push('EN 170');
  if (eyeStd?.en172) standards.push('EN 172');
  if (eyeStd?.en175) standards.push('EN 175');
  if (eyeStd?.gs_et_29) standards.push('GS-ET-29');

  // Check head standards
  const headStd = (product as any).head_standards;
  if (headStd?.en397?.present) standards.push('EN 397');
  if (headStd?.en50365) standards.push('EN 50365');
  if (headStd?.en12492) standards.push('EN 12492');
  if (headStd?.en812) standards.push('EN 812');

  // Check clothing standards
  const clothingStd = (product as any).clothing_standards;
  if (clothingStd?.en_iso_20471) standards.push('EN ISO 20471');
  if (clothingStd?.en_iso_11612) standards.push('EN ISO 11612');
  if (clothingStd?.en_iso_11611) standards.push('EN ISO 11611');
  if (clothingStd?.en_1149_5) standards.push('EN 1149-5');
  if (clothingStd?.iec_61482_2) standards.push('IEC 61482-2');
  if (clothingStd?.en_343) standards.push('EN 343');
  if (clothingStd?.en_iso_13688) standards.push('EN ISO 13688');

  return Array.from(new Set(standards));
};

/**
 * Extracts unique EN standards from all products
 * @param products Array of products
 * @returns Sorted array of unique EN standards
 */
export const getUniqueENStandards = (products: Product[]): string[] => {
  const allStandards = products.flatMap(product => getProductENStandards(product));
  return Array.from(new Set(allStandards)).sort();
};

/**
 * Checks if a product matches any of the selected EN standards
 * @param product A product object
 * @param selectedStandards Array of selected EN standard codes
 * @returns True if product matches at least one selected standard
 */
export const matchesENStandards = (product: Product, selectedStandards: string[]): boolean => {
  if (selectedStandards.length === 0) return true;
  
  const productStandards = getProductENStandards(product);
  return selectedStandards.some(standard => productStandards.includes(standard));
};

/**
 * Extracts filtered particle types from a product's EN14387 respiratory standards
 * @param product A product object
 * @returns Array of particle type codes (e.g., ["A", "B", "E", "K"])
 */
export const getProductFilteredParticles = (product: Product): string[] => {
  const particles: string[] = [];
  
  const respiratoryStandards = product.respiratory_standards as Record<string, any>;
  if (!respiratoryStandards) return particles;
  
  const en14387 = respiratoryStandards.en14387;
  if (en14387 && en14387.gases) {
    const gases = en14387.gases as Record<string, boolean>;
    Object.keys(gases).forEach(gasKey => {
      if (gases[gasKey] === true) {
        particles.push(gasKey.toUpperCase());
      }
    });
  }
  
  return particles.sort();
};

/**
 * Gets all unique filtered particle types from an array of products
 * @param products Array of product objects
 * @returns Sorted array of unique particle type codes
 */
export const getUniqueFilteredParticles = (products: Product[]): string[] => {
  const particleSet = new Set<string>();
  
  products.forEach(product => {
    const particles = getProductFilteredParticles(product);
    particles.forEach(p => particleSet.add(p));
  });
  
  return Array.from(particleSet).sort();
};

/**
 * Checks if a product's filtered particles match the selected ones
 * @param product A product object
 * @param selectedParticles Array of selected particle type codes
 * @returns True if product matches at least one selected particle type
 */
export const matchesFilteredParticles = (product: Product, selectedParticles: string[]): boolean => {
  if (selectedParticles.length === 0) return true;
  const productParticles = getProductFilteredParticles(product);
  return selectedParticles.some(p => productParticles.includes(p));
}; 