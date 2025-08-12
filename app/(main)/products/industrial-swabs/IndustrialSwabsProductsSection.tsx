"use client";

import { Product } from "@/lib/products-service";
import { ProductGrid } from "@/components/website/products/product-grid";
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
  }, [language, swabsProducts.length]);

  return (
    <section id="products" className="py-16">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <div className="flex flex-col items-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="inline-flex items-center rounded-full bg-white/80 dark:bg-black/60 px-3 py-1 text-xs sm:text-sm border border-[#F28C38] backdrop-blur-sm mb-4"
            >
              <Brush className="mr-1.5 h-3 w-3 sm:mr-2 sm:h-4 sm:w-4 text-[#F28C38]" />
              <span className="text-brand-dark dark:text-white font-medium font-heading">
                {t('products.categories.pages.industrialSwabs.badge')}
              </span>
            </motion.div>
            <div className="inline-flex items-center justify-center mb-4">
              <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: "2.5rem" }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="h-1 w-10 bg-[#F28C38] rounded-full mr-3"
              ></motion.div>
              <h2 className="text-3xl md:text-4xl font-bold text-brand-dark dark:text-white font-heading">
                {t('products.categories.pages.industrialSwabs.title')}
              </h2>
              <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: "2.5rem" }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="h-1 w-10 bg-[#F28C38] rounded-full ml-3"
              ></motion.div>
            </div>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-lg text-brand-secondary dark:text-gray-300 max-w-2xl mx-auto"
            >
              {t('products.categories.pages.industrialSwabs.description')}
            </motion.p>
          </div>
        </div>
        
        <ProductGrid products={swabsProducts} initialCategory={initialCategory} />
      </div>
    </section>
  );
} 