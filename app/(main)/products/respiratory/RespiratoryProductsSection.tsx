"use client";

import { Product } from "@/lib/products-service";
import { ProductGrid } from "@/components/website/products/product-grid";
import { useLanguage } from "@/lib/context/language-context";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";
// Removed Link; badge should not be clickable

interface RespiratoryProductsSectionProps {
  products: Product[];
}

export function RespiratoryProductsSection({ products }: RespiratoryProductsSectionProps) {
  const { t, language } = useLanguage();
  const [initialCategory, setInitialCategory] = useState<string | undefined>(undefined);
  
  // Filter products for respiratory protection category - very strict filtering to match other sections
  const respiratoryProducts = products.filter(product => {
    // Primary check: Must explicitly mention respiratory, mask, or respirator terms in category or subcategory
    const explicitRespiratoryTerms = 
      product.category?.toLowerCase().includes('respiratory') ||
      product.category?.toLowerCase().includes('respirator') ||
      product.category?.toLowerCase().includes('mask') ||
      product.category?.toLowerCase().includes('masks') ||
      product.category_locales?.it?.toLowerCase().includes('respiratorio') ||
      product.category_locales?.it?.toLowerCase().includes('respiratoria') ||
      product.category_locales?.it?.toLowerCase().includes('respiratore') ||
      product.category_locales?.it?.toLowerCase().includes('maschera') ||
      product.category_locales?.it?.toLowerCase().includes('maschere') ||
      product.sub_category?.toLowerCase().includes('respiratory') ||
      product.sub_category?.toLowerCase().includes('respirator') ||
      product.sub_category?.toLowerCase().includes('mask') ||
      product.sub_category_locales?.it?.toLowerCase().includes('respiratorio') ||
      product.sub_category_locales?.it?.toLowerCase().includes('respiratore') ||
      product.sub_category_locales?.it?.toLowerCase().includes('maschera');
    
    if (explicitRespiratoryTerms) {
      // Ensure it's not primarily categorized as other protective equipment
      const notOtherProtection = 
        !product.category?.toLowerCase().includes('glove') &&
        !product.category_locales?.it?.toLowerCase().includes('guant') &&
        !product.category?.toLowerCase().includes('swab') &&
        !product.category_locales?.it?.toLowerCase().includes('tampone');
      
      return notOtherProtection;
    }
    
    // Secondary check: Products with breathing/air protection terms but must be specific to respiratory
    const hasBreathingProtectionTerms = 
      (product.category?.toLowerCase().includes('breathing') && 
       product.category?.toLowerCase().includes('protection')) ||
      (product.category?.toLowerCase().includes('air') && 
       product.category?.toLowerCase().includes('filter')) ||
      (product.category_locales?.it?.toLowerCase().includes('respirazione') && 
       product.category_locales?.it?.toLowerCase().includes('protezione')) ||
      (product.category_locales?.it?.toLowerCase().includes('aria') && 
       product.category_locales?.it?.toLowerCase().includes('filtro'));
    
    if (hasBreathingProtectionTerms) {
      // Must also have respiratory-related terms in name or features
      const hasRespiratoryInContent = 
        product.name?.toLowerCase().includes('mask') ||
        product.name?.toLowerCase().includes('respirator') ||
        product.name?.toLowerCase().includes('respiratory') ||
        product.name_locales?.it?.toLowerCase().includes('maschera') ||
        product.name_locales?.it?.toLowerCase().includes('respiratore') ||
        product.name_locales?.it?.toLowerCase().includes('respiratorio') ||
        product.features?.some(feature => 
          feature.toLowerCase().includes('mask') || 
          feature.toLowerCase().includes('respirator') ||
          feature.toLowerCase().includes('breathing')
        ) ||
        product.features_locales?.it?.some(feature => 
          feature.toLowerCase().includes('maschera') || 
          feature.toLowerCase().includes('respiratore') ||
          feature.toLowerCase().includes('respirazione')
        );
      
      return hasRespiratoryInContent;
    }
    
    return false;
  });

  // Get the correct respiratory category name for initialCategory - recalculates when language or products change
  const getCategoryForFilter = () => {
    if (respiratoryProducts.length === 0) return undefined;
    
    // Look for a product with respiratory terms in the category name for current language
    const respiratoryProduct = respiratoryProducts.find(product => {
      const category = language === 'it' 
        ? (product.category_locales?.it || product.category)
        : product.category;
      
      if (language === 'it') {
        return category?.toLowerCase().includes('respiratorio') || 
               category?.toLowerCase().includes('respiratoria') ||
               category?.toLowerCase().includes('maschera');
      } else {
        return category?.toLowerCase().includes('respiratory') || 
               category?.toLowerCase().includes('mask') ||
               category?.toLowerCase().includes('respirator');
      }
    });
    
    if (respiratoryProduct) {
      return language === 'it' 
        ? (respiratoryProduct.category_locales?.it || respiratoryProduct.category)
        : respiratoryProduct.category;
    }
    
    // Fallback to first product's category
    const firstProduct = respiratoryProducts[0];
    return language === 'it' 
      ? (firstProduct.category_locales?.it || firstProduct.category)
      : firstProduct.category;
  };

  // Update initialCategory when language or respiratoryProducts change
  useEffect(() => {
    setInitialCategory(getCategoryForFilter());
  }, [language, respiratoryProducts.length]);

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
              <ShieldCheck className="mr-1.5 h-3 w-3 sm:mr-2 sm:h-4 sm:w-4 text-[#F28C38]" />
              <span className="text-brand-dark dark:text-white font-medium font-heading">
                {t('products.categories.pages.respiratory.badge')}
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
                {t('products.categories.pages.respiratory.title')}
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
              {t('products.categories.pages.respiratory.description')}
            </motion.p>
          </div>
        </div>
        
        <ProductGrid products={respiratoryProducts} initialCategory={initialCategory} />
      </div>
    </section>
  );
} 