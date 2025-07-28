"use client";

import { Product } from "@/lib/products-service";
import { ProductGrid } from "@/components/website/products/product-grid";
import { useLanguage } from "@/lib/context/language-context";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Shield } from "lucide-react";
import Link from "next/link";

interface MechanicalProductsSectionProps {
  products: Product[];
}

export function MechanicalProductsSection({ products }: MechanicalProductsSectionProps) {
  const { t, language } = useLanguage();
  const [initialCategory, setInitialCategory] = useState<string | undefined>(undefined);
  
  // Filter products for mechanical category - now using subcategory
  const mechanicalProducts = products.filter(product => {
    // Check if subcategory matches mechanical hazards gloves
    const isMechanicalHazards = 
      product.sub_category === "Mechanical hazards gloves" ||
      product.sub_category_locales?.it === "Guanti per rischi meccanici" ||
      product.sub_category_locales?.en === "Mechanical hazards gloves";
    
    return isMechanicalHazards;
  });

  // Get the correct mechanical category name for initialCategory - recalculates when language or products change
  const getCategoryForFilter = () => {
    if (mechanicalProducts.length === 0) return undefined;
    
    // Look for a product with "mechanical" or "meccanici" in the category name for current language
    const mechanicalProduct = mechanicalProducts.find(product => {
      const category = language === 'it' 
        ? (product.category_locales?.it || product.category)
        : product.category;
      
      if (language === 'it') {
        return category?.toLowerCase().includes('meccanici') ||
               category?.toLowerCase().includes('meccanico');
      } else {
        return category?.toLowerCase().includes('mechanical') ||
               category?.toLowerCase().includes('general');
      }
    });
    
    if (mechanicalProduct) {
      return language === 'it' 
        ? (mechanicalProduct.category_locales?.it || mechanicalProduct.category)
        : mechanicalProduct.category;
    }
    
    // Fallback to first product's category
    const firstProduct = mechanicalProducts[0];
    return language === 'it' 
      ? (firstProduct.category_locales?.it || firstProduct.category)
      : firstProduct.category;
  };

  // Update initialCategory when language or mechanicalProducts change
  useEffect(() => {
    setInitialCategory(getCategoryForFilter());
  }, [language, mechanicalProducts.length]);

  return (
    <section id="products" className="py-16">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <div className="flex flex-col items-center">
            <Link href="/products/gloves/mechanical" className="inline-block transition-transform duration-300 mb-4">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="inline-flex items-center rounded-full bg-white/80 dark:bg-black/60 px-3 py-1 text-xs sm:text-sm border border-[#F28C38] backdrop-blur-sm cursor-pointer"
              >
                <Shield className="mr-1.5 h-3 w-3 sm:mr-2 sm:h-4 sm:w-4 text-[#F28C38]" />
                <span className="text-brand-dark dark:text-white font-medium font-heading">
                  {t('products.categories.pages.mechanical.badge')}
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
                {t('products.categories.pages.mechanical.title')}
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
              {t('products.categories.pages.mechanical.description')}
            </motion.p>
          </div>
        </div>
        
        <div id="product-grid">
          <ProductGrid products={mechanicalProducts} initialCategory={initialCategory} />
        </div>
      </div>
    </section>
  );
} 