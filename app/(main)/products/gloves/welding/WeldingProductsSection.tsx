"use client";

import { Product } from "@/lib/products-service";
import { ProductGrid } from "@/components/website/products/product-grid";
import { useLanguage } from "@/lib/context/language-context";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Zap } from "lucide-react";
import Link from "next/link";

interface WeldingProductsSectionProps {
  products: Product[];
}

export function WeldingProductsSection({ products }: WeldingProductsSectionProps) {
  const { t, language } = useLanguage();
  const [initialCategory, setInitialCategory] = useState<string | undefined>(undefined);
  
  // Filter products for welding category - now using subcategory
  const weldingProducts = products.filter(product => {
    // Check if subcategory matches welding glove
    const isWelding = 
      product.sub_category === "Welding glove" ||
      product.sub_category_locales?.it === "Guanti per saldatura" ||
      product.sub_category_locales?.en === "Welding glove";
    
    return isWelding;
  });

  // Get the correct welding category name for initialCategory - recalculates when language or products change
  const getCategoryForFilter = () => {
    if (weldingProducts.length === 0) return undefined;
    
    // Look for a product with "welding" or "saldatura" in the category name for current language
    const weldingProduct = weldingProducts.find(product => {
      const category = language === 'it' 
        ? (product.category_locales?.it || product.category)
        : product.category;
      
      if (language === 'it') {
        return category?.toLowerCase().includes('saldatura') ||
               category?.toLowerCase().includes('saldatori');
      } else {
        return category?.toLowerCase().includes('welding') ||
               category?.toLowerCase().includes('welders');
      }
    });
    
    if (weldingProduct) {
      return language === 'it' 
        ? (weldingProduct.category_locales?.it || weldingProduct.category)
        : weldingProduct.category;
    }
    
    // Fallback to first product's category
    const firstProduct = weldingProducts[0];
    return language === 'it' 
      ? (firstProduct.category_locales?.it || firstProduct.category)
      : firstProduct.category;
  };

  // Update initialCategory when language or weldingProducts change
  useEffect(() => {
    setInitialCategory(getCategoryForFilter());
  }, [language, weldingProducts.length]);

  return (
    <section id="products" className="py-16">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <div className="flex flex-col items-center">
            <Link href="/products/gloves/welding" className="inline-block transition-transform duration-300 mb-4">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="inline-flex items-center rounded-full bg-white/80 dark:bg-black/60 px-3 py-1 text-xs sm:text-sm border border-[#F28C38] backdrop-blur-sm cursor-pointer"
              >
                <Zap className="mr-1.5 h-3 w-3 sm:mr-2 sm:h-4 sm:w-4 text-[#F28C38]" />
                <span className="text-brand-dark dark:text-white font-medium font-heading">
                  {t('products.categories.pages.welding.badge')}
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
                {t('products.categories.pages.welding.title')}
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
              {t('products.categories.pages.welding.description')}
            </motion.p>
          </div>
        </div>
        
        <div id="product-grid">
          <ProductGrid products={weldingProducts} initialCategory={initialCategory} />
        </div>
      </div>
    </section>
  );
} 