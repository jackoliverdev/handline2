"use client";

import { Product } from "@/lib/products-service";
import { ProductGrid } from "@/components/website/products/product-grid";
import { LengthFilter } from "@/components/website/products/filters/swabs/LengthFilter";
import { PadSizeFilter } from "@/components/website/products/filters/swabs/PadSizeFilter";
import { LengthFilterMobile } from "@/components/website/products/filters/swabs/LengthFilterMobile";
import { PadSizeFilterMobile } from "@/components/website/products/filters/swabs/PadSizeFilterMobile";
import { useLanguage } from "@/lib/context/language-context";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Brush } from "lucide-react";
// Removed Link; badge should not be clickable

interface IndustrialSwabsProductsSectionProps {
  products: Product[];
}

export function IndustrialSwabsProductsSection({ products }: IndustrialSwabsProductsSectionProps) {
  const { t, language } = useLanguage();
  const [initialCategory, setInitialCategory] = useState<string | undefined>(undefined);
  const [lengthRange, setLengthRange] = useState<{ min: number; max: number } | null>(null);
  const [padRange, setPadRange] = useState<{ diameter?: { min: number; max: number }; length?: { min: number; max: number } }>({});
  const [selectedLengths, setSelectedLengths] = useState<string[]>([]);
  const [selectedPadSizes, setSelectedPadSizes] = useState<string[]>([]);
  
  // Filter products for industrial swabs category - very strict filtering to match other sections
  const swabsProducts = products.filter(product => {
    // Primary check: Must explicitly mention "swab", "swabs", "tampone", or "tamponi" in category or subcategory
    const explicitSwabTerms = 
      product.category?.toLowerCase().includes('swab') ||
      product.category?.toLowerCase().includes('swabs') ||
      product.category_locales?.it?.toLowerCase().includes('tampone') ||
      product.category_locales?.it?.toLowerCase().includes('tamponi') ||
      product.sub_category?.toLowerCase().includes('swab') ||
      product.sub_category?.toLowerCase().includes('swabs') ||
      product.sub_category_locales?.it?.toLowerCase().includes('tampone') ||
      product.sub_category_locales?.it?.toLowerCase().includes('tamponi');
    
    if (explicitSwabTerms) {
      // Ensure it's not primarily categorized as protective equipment
      const notProtectiveEquipment = 
        !product.category?.toLowerCase().includes('glove') &&
        !product.category_locales?.it?.toLowerCase().includes('guant') &&
        !product.category?.toLowerCase().includes('mask') &&
        !product.category_locales?.it?.toLowerCase().includes('maschera') &&
        !product.category?.toLowerCase().includes('respiratory') &&
        !product.category_locales?.it?.toLowerCase().includes('respiratorio');
      
      return notProtectiveEquipment;
    }
    
    // Secondary check: Products with industrial cleaning terms but must be specific to swabs
    const hasIndustrialCleaningTerms = 
      (product.category?.toLowerCase().includes('industrial') && 
       (product.category?.toLowerCase().includes('cleaning') || 
        product.category?.toLowerCase().includes('maintenance'))) ||
      (product.category_locales?.it?.toLowerCase().includes('industriale') && 
       (product.category_locales?.it?.toLowerCase().includes('pulizia') || 
        product.category_locales?.it?.toLowerCase().includes('manutenzione')));
    
    if (hasIndustrialCleaningTerms) {
      // Must also have swab-related terms in name or features
      const hasSwabInContent = 
        product.name?.toLowerCase().includes('swab') ||
        product.name_locales?.it?.toLowerCase().includes('tampone') ||
        product.features?.some(feature => 
          feature.toLowerCase().includes('swab') || 
          feature.toLowerCase().includes('cotton')
        ) ||
        product.features_locales?.it?.some(feature => 
          feature.toLowerCase().includes('tampone') || 
          feature.toLowerCase().includes('cotone')
        );
      
      return hasSwabInContent;
    }
    
    return false;
  });

  // Get the correct swabs category name for initialCategory - recalculates when language or products change
  const getCategoryForFilter = () => {
    if (swabsProducts.length === 0) return undefined;
    
    // Look for a product with swab terms in the category name for current language
    const swabProduct = swabsProducts.find(product => {
      const category = language === 'it' 
        ? (product.category_locales?.it || product.category)
        : product.category;
      
      if (language === 'it') {
        return category?.toLowerCase().includes('tampone') || 
               category?.toLowerCase().includes('tamponi') ||
               category?.toLowerCase().includes('industriale');
      } else {
        return category?.toLowerCase().includes('swab') || 
               category?.toLowerCase().includes('swabs') ||
               category?.toLowerCase().includes('industrial');
      }
    });
    
    if (swabProduct) {
      return language === 'it' 
        ? (swabProduct.category_locales?.it || swabProduct.category)
        : swabProduct.category;
    }
    
    // Fallback to first product's category
    const firstProduct = swabsProducts[0];
    return language === 'it' 
      ? (firstProduct.category_locales?.it || firstProduct.category)
      : firstProduct.category;
  };

  // Update initialCategory when language or swabsProducts change
  useEffect(() => {
    setInitialCategory(getCategoryForFilter());
    // Compute bounds for filters
    if (swabsProducts.length) {
      // Build discrete options from existing data
      const lengthOpts = Array.from(
        new Set(
          swabsProducts
            .map((p) => (typeof p.length_cm === 'number' ? `${p.length_cm} cm` : null))
            .filter((v): v is string => !!v)
        )
      ).sort((a, b) => parseInt(a) - parseInt(b));
      // Initialise range for backward compatibility (unused in UI now)
      const nums = swabsProducts.map((p) => p.length_cm).filter((v): v is number => typeof v === 'number');
      if (nums.length) setLengthRange({ min: Math.min(...nums), max: Math.max(...nums) });

      const padOpts = Array.from(
        new Set(
          swabsProducts
            .map((p) => {
              const ps: any = p.pad_size_json;
              const d = ps?.en?.diameter_mm;
              const l = ps?.en?.length_mm;
              return typeof d === 'number' && typeof l === 'number' ? `${d}×${l} mm` : null;
            })
            .filter((v): v is string => !!v)
        )
      ).sort((a, b) => parseInt(a) - parseInt(b));

      setAvailableLengthOptions(lengthOptsRef => lengthOpts);
      setAvailablePadSizeOptions(padOptsRef => padOpts);
    }
  }, [language, swabsProducts.length]);

  // Local state to keep available options
  const [availableLengthOptions, setAvailableLengthOptions] = useState<string[]>([]);
  const [availablePadSizeOptions, setAvailablePadSizeOptions] = useState<string[]>([]);

  return (
    <section id="products" className="py-10">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Match gloves and respirators: remove pill and subtitle; tighter spacing */}
        <div className="mb-4" />
        
        <ProductGrid 
          products={swabsProducts} 
          initialCategory={initialCategory}
          hideMainCategoryFilter
          extraFiltersRender={(
            <>
              <LengthFilter
                options={availableLengthOptions}
                selected={selectedLengths}
                onToggle={(opt) => setSelectedLengths(prev => prev.includes(opt) ? prev.filter(x => x !== opt) : [...prev, opt])}
              />
              <PadSizeFilter
                options={availablePadSizeOptions}
                selected={selectedPadSizes}
                onToggle={(opt) => setSelectedPadSizes(prev => prev.includes(opt) ? prev.filter(x => x !== opt) : [...prev, opt])}
              />
            </>
          )}
          extraFiltersRenderMobile={(
            <>
              <LengthFilterMobile
                options={availableLengthOptions}
                selected={selectedLengths}
                onToggle={(opt) => setSelectedLengths(prev => prev.includes(opt) ? prev.filter(x => x !== opt) : [...prev, opt])}
              />
              <PadSizeFilterMobile
                options={availablePadSizeOptions}
                selected={selectedPadSizes}
                onToggle={(opt) => setSelectedPadSizes(prev => prev.includes(opt) ? prev.filter(x => x !== opt) : [...prev, opt])}
              />
            </>
          )}
          hideDefaultFilters={true}
          extraFilterPredicate={(p) => {
            // Length (discrete options now)
            const lengthLabel = typeof p.length_cm === 'number' ? `${p.length_cm} cm` : undefined;
            const lengthOk = selectedLengths.length === 0 || (!!lengthLabel && selectedLengths.includes(lengthLabel));
            // Pad size (discrete)
            const ps: any = p.pad_size_json;
            const d = ps?.en?.diameter_mm as number | undefined;
            const l = ps?.en?.length_mm as number | undefined;
            const padLabel = typeof d === 'number' && typeof l === 'number' ? `${d}×${l} mm` : undefined;
            const padOk = selectedPadSizes.length === 0 || (!!padLabel && selectedPadSizes.includes(padLabel));
            return lengthOk && padOk;
          }}
        />
      </div>
    </section>
  );
} 