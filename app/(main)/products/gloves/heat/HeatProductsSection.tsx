"use client";

import { Product } from "@/lib/products-service";
import { ProductGrid } from "@/components/website/products/product-grid";
import { useLanguage } from "@/lib/context/language-context";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Flame } from "lucide-react";
import Link from "next/link";

interface HeatProductsSectionProps {
  products: Product[];
}

export function HeatProductsSection({ products }: HeatProductsSectionProps) {
  const { t, language } = useLanguage();
  const [initialCategory, setInitialCategory] = useState<string | undefined>(undefined);
  
  // Filter products for heat category - now using subcategory
  const heatProducts = products.filter(product => {
    // Check if subcategory matches heat resistant gloves
    const isHeatResistant = 
      product.sub_category === "Heat resistant gloves" ||
      product.sub_category_locales?.it === "Guanti termoresistenti" ||
      product.sub_category_locales?.en === "Heat resistant gloves";
    
    return isHeatResistant;
  });

  // Get the correct heat-resistant category name for initialCategory - recalculates when language or products change
  const getCategoryForFilter = () => {
    if (heatProducts.length === 0) return undefined;
    
    // Look for a product with "heat resistant" or "termoresistenti" in the category name for current language
    const heatResistantProduct = heatProducts.find(product => {
      const category = language === 'it' 
        ? (product.category_locales?.it || product.category)
        : product.category;
      
      if (language === 'it') {
        return category?.toLowerCase().includes('termoresistenti') ||
               category?.toLowerCase().includes('termico');
      } else {
        return category?.toLowerCase().includes('heat resistant') ||
               category?.toLowerCase().includes('heat');
      }
    });
    
    if (heatResistantProduct) {
      return language === 'it' 
        ? (heatResistantProduct.category_locales?.it || heatResistantProduct.category)
        : heatResistantProduct.category;
    }
    
    // Fallback to first product's category
    const firstProduct = heatProducts[0];
    return language === 'it' 
      ? (firstProduct.category_locales?.it || firstProduct.category)
      : firstProduct.category;
  };

  // Update initialCategory when language or heatProducts change
  useEffect(() => {
    setInitialCategory(getCategoryForFilter());
  }, [language, heatProducts.length]);

  return (
    <section id="products" className="py-16">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <div className="flex flex-col items-center">
            <Link href="/products/gloves/heat" className="inline-block transition-transform duration-300 mb-4">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="inline-flex items-center rounded-full bg-white/80 dark:bg-black/60 px-3 py-1 text-xs sm:text-sm border border-[#F28C38] backdrop-blur-sm cursor-pointer"
              >
                <Flame className="mr-1.5 h-3 w-3 sm:mr-2 sm:h-4 sm:w-4 text-[#F28C38]" />
                <span className="text-brand-dark dark:text-white font-medium font-heading">
                  {t('products.categories.pages.heat.badge')}
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
                {t('products.categories.pages.heat.title')}
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
              {t('products.categories.pages.heat.description')}
            </motion.p>
          </div>
        </div>
        
        <div id="product-grid">
          <ProductGrid products={heatProducts} initialCategory={initialCategory} />
        </div>
      </div>
    </section>
  );
} 