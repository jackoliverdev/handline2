"use client";

import { Product } from "@/lib/products-service";
import { ProductGrid } from "@/components/website/products/product-grid";
import { useLanguage } from "@/lib/context/language-context";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { HardHat } from "lucide-react";
import Link from "next/link";

interface GeneralProductsSectionProps {
  products: Product[];
}

export function GeneralProductsSection({ products }: GeneralProductsSectionProps) {
  const { t, language } = useLanguage();
  const [initialCategory, setInitialCategory] = useState<string | undefined>(undefined);
  
  // Filter products for general category - very strict filtering to match heat/cut-resistant behavior
  const generalProducts = products.filter(product => {
    // Primary check: Must explicitly mention "general purpose" in category or subcategory
    const explicitGeneralPurpose = 
      product.category?.toLowerCase().includes('general purpose') ||
      product.category_locales?.it?.toLowerCase().includes('uso generale') ||
      product.sub_category?.toLowerCase().includes('general purpose') ||
      product.sub_category_locales?.it?.toLowerCase().includes('uso generale');
    
    if (explicitGeneralPurpose) {
      // Ensure it's not primarily categorized as something more specific
      const notSpecializedCategory = 
        !product.category?.toLowerCase().includes('cut resistant') &&
        !product.category_locales?.it?.toLowerCase().includes('antitaglio') &&
        !product.category?.toLowerCase().includes('heat resistant') &&
        !product.category_locales?.it?.toLowerCase().includes('termoresistenti');
      
      return notSpecializedCategory;
    }
    
    // Secondary check: Products with general/construction terms but no specialized indicators
    const hasGeneralTerms = 
      product.category?.toLowerCase().includes('general') ||
      product.category_locales?.it?.toLowerCase().includes('generale') ||
      product.sub_category?.toLowerCase().includes('general') ||
      product.sub_category_locales?.it?.toLowerCase().includes('generale');
    
    if (hasGeneralTerms) {
      // Must not have specialized indicators
      const notSpecialized = 
        !product.en_standard && 
        !product.cut_resistance_level &&
        !product.temperature_rating &&
        !product.category?.toLowerCase().includes('cut resistant') &&
        !product.category_locales?.it?.toLowerCase().includes('antitaglio') &&
        !product.category?.toLowerCase().includes('heat resistant') &&
        !product.category_locales?.it?.toLowerCase().includes('termoresistenti');
      
      return notSpecialized;
    }
    
    return false;
  });

  // Get the correct general purpose category name for initialCategory - recalculates when language or products change
  const getCategoryForFilter = () => {
    if (generalProducts.length === 0) return undefined;
    
    // Look for a product with "general purpose" or "uso generale" in the category name for current language
    const generalPurposeProduct = generalProducts.find(product => {
      const category = language === 'it' 
        ? (product.category_locales?.it || product.category)
        : product.category;
      
      if (language === 'it') {
        return category?.toLowerCase().includes('uso generale') ||
               category?.toLowerCase().includes('generale');
      } else {
        return category?.toLowerCase().includes('general purpose') ||
               category?.toLowerCase().includes('general');
      }
    });
    
    if (generalPurposeProduct) {
      return language === 'it' 
        ? (generalPurposeProduct.category_locales?.it || generalPurposeProduct.category)
        : generalPurposeProduct.category;
    }
    
    // Fallback to first product's category
    const firstProduct = generalProducts[0];
    return language === 'it' 
      ? (firstProduct.category_locales?.it || firstProduct.category)
      : firstProduct.category;
  };

  // Update initialCategory when language or generalProducts change
  useEffect(() => {
    setInitialCategory(getCategoryForFilter());
  }, [language, generalProducts.length]);

  return (
    <section id="products" className="py-16">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <div className="flex flex-col items-center">
            <Link href="/products/gloves/general" className="inline-block transition-transform duration-300 mb-4">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="inline-flex items-center rounded-full bg-white/80 dark:bg-black/60 px-3 py-1 text-xs sm:text-sm border border-[#F28C38] backdrop-blur-sm cursor-pointer"
              >
                <HardHat className="mr-1.5 h-3 w-3 sm:mr-2 sm:h-4 sm:w-4 text-[#F28C38]" />
                <span className="text-brand-dark dark:text-white font-medium font-heading">
                  {t('products.categories.pages.general.badge')}
                </span>
              </motion.div>
            </Link>
            <div className="inline-flex items-center justify-center mb-4">
              <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: "2.5rem" }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="h-1 w-10 bg-[#F28C38] rounded-full mr-3"
              ></motion.div>
              <h2 className="text-3xl md:text-4xl font-bold text-brand-dark dark:text-white font-heading">
                {t('products.categories.pages.general.title')}
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
              {t('products.categories.pages.general.description')}
            </motion.p>
          </div>
        </div>
        
        <ProductGrid products={generalProducts} initialCategory={initialCategory} />
      </div>
    </section>
  );
} 