"use client";

import { Product } from "@/lib/products-service";
import { ProductGrid } from "@/components/website/products/product-grid";
import { useLanguage } from "@/lib/context/language-context";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Shield } from "lucide-react";
import Link from "next/link";

interface CutProductsSectionProps {
  products: Product[];
}

export function CutProductsSection({ products }: CutProductsSectionProps) {
  const { t, language } = useLanguage();
  const [initialCategory, setInitialCategory] = useState<string | undefined>(undefined);
  
  // Filter products for cut category - very strict filtering to match heat-resistant behavior
  const cutProducts = products.filter(product => {
    // Primary indicators - these are the most reliable
    const hasEN388 = product.en_standard === 'EN388';
    const hasCutLevel = product.cut_resistance_level && 
        (typeof product.cut_resistance_level === 'number' ? product.cut_resistance_level > 0 : 
         product.cut_resistance_level.length > 0);
    
    // If it has EN388 or cut resistance level, it's likely cut-resistant
    if (hasEN388 || hasCutLevel) {
      // But also ensure it's not primarily categorized as something else
      const notPrimarilyOtherCategory = 
        !product.category?.toLowerCase().includes('general purpose') &&
        !product.category_locales?.it?.toLowerCase().includes('uso generale') &&
        !product.category?.toLowerCase().includes('heat resistant') &&
        !product.category_locales?.it?.toLowerCase().includes('termoresistenti');
      
      if (notPrimarilyOtherCategory) {
        return true;
      }
    }
    
    // Secondary check: Must explicitly mention cut resistance in category or subcategory
    const explicitCutResistant = 
      product.category?.toLowerCase().includes('cut resistant') ||
      product.category_locales?.it?.toLowerCase().includes('antitaglio') ||
      product.sub_category?.toLowerCase().includes('cut resistant') ||
      product.sub_category_locales?.it?.toLowerCase().includes('antitaglio');
    
    // Only include if explicitly cut-resistant and not general purpose
    if (explicitCutResistant) {
      const notGeneralPurpose = 
        !product.category?.toLowerCase().includes('general purpose') &&
        !product.category_locales?.it?.toLowerCase().includes('uso generale');
      
      return notGeneralPurpose;
    }
    
    return false;
  });

  // Get the correct cut-resistant category name for initialCategory - recalculates when language or products change
  const getCategoryForFilter = () => {
    if (cutProducts.length === 0) return undefined;
    
    // Look for a product with "cut resistant" or "antitaglio" in the category name for current language
    const cutResistantProduct = cutProducts.find(product => {
      const category = language === 'it' 
        ? (product.category_locales?.it || product.category)
        : product.category;
      
      if (language === 'it') {
        return category?.toLowerCase().includes('antitaglio') ||
               category?.toLowerCase().includes('resistente al taglio');
      } else {
        return category?.toLowerCase().includes('cut resistant') ||
               category?.toLowerCase().includes('cut');
      }
    });
    
    if (cutResistantProduct) {
      return language === 'it' 
        ? (cutResistantProduct.category_locales?.it || cutResistantProduct.category)
        : cutResistantProduct.category;
    }
    
    // Fallback to first product's category
    const firstProduct = cutProducts[0];
    return language === 'it' 
      ? (firstProduct.category_locales?.it || firstProduct.category)
      : firstProduct.category;
  };

  // Update initialCategory when language or cutProducts change
  useEffect(() => {
    setInitialCategory(getCategoryForFilter());
  }, [language, cutProducts.length]);

  return (
    <section id="products" className="py-16">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <div className="flex flex-col items-center">
            <Link href="/products/gloves/cut" className="inline-block transition-transform duration-300 mb-4">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="inline-flex items-center rounded-full bg-white/80 dark:bg-black/60 px-3 py-1 text-xs sm:text-sm border border-[#F28C38] backdrop-blur-sm cursor-pointer"
              >
                <Shield className="mr-1.5 h-3 w-3 sm:mr-2 sm:h-4 sm:w-4 text-[#F28C38]" />
                <span className="text-brand-dark dark:text-white font-medium font-heading">
                  {t('products.categories.pages.cut.badge')}
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
              <h2 className="text-3xl md:text-4xl font-bold text-brand-dark dark:text-white font-heading text-center">
                {t('products.categories.pages.cut.title').split(' ').slice(0, -1).join(' ')}<br />
                {t('products.categories.pages.cut.title').split(' ').slice(-1)}
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
              {t('products.categories.pages.cut.description')}
            </motion.p>
          </div>
        </div>
        
        <ProductGrid products={cutProducts} initialCategory={initialCategory} />
      </div>
    </section>
  );
} 