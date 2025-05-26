"use client";

import { useEffect, useState, useRef } from "react";
import { useLanguage } from "@/lib/context/language-context";
import { Product } from "@/lib/products-service";
import { ProductPreviewModal } from "@/components/website/products/product-preview-modal";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Flame, Scissors, Eye } from "lucide-react";
import { motion } from "framer-motion";

// Animation variants
const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

const productCardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.2 + (i * 0.1),
      duration: 0.4,
      ease: "easeOut"
    }
  })
};

interface RelatedProductsProps {
  relatedProducts: Product[];
}

export const RelatedProducts = ({ relatedProducts }: RelatedProductsProps) => {
  const { t, language } = useLanguage();
  const [previewProduct, setPreviewProduct] = useState<Product | null>(null);
  const hasRelatedProducts = relatedProducts && relatedProducts.length > 0;

  const handlePreviewClick = (product: Product) => {
    setPreviewProduct(product);
  };
  
  const handleClosePreview = () => {
    setPreviewProduct(null);
  };

  return (
    <motion.section 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={sectionVariants}
      className="py-16 bg-brand-light dark:bg-background"
    >
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div 
          variants={itemVariants}
          className="flex flex-col items-center mb-8 text-center"
        >
          <div className="max-w-2xl">
            <div className="inline-flex items-center justify-center mb-4">
              <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: "2.5rem" }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="h-1 w-10 bg-[#F28C38] rounded-full mr-3"
              ></motion.div>
              <h2 className="text-2xl md:text-3xl font-bold text-brand-dark dark:text-white font-heading">
                {t('relatedProducts.title')}
              </h2>
              <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: "2.5rem" }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="h-1 w-10 bg-[#F28C38] rounded-full ml-3"
              ></motion.div>
            </div>
          </div>
        </motion.div>

        {hasRelatedProducts ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 mb-10">
            {relatedProducts.map((product, index) => {
              const name = product.name_locales?.[language] || product.name;
              const description = product.description_locales?.[language] || product.description;
              const short_description = product.short_description_locales?.[language] || product.short_description;
              const category = product.category_locales?.[language] || product.category;
              const sub_category = product.sub_category_locales?.[language] || product.sub_category;
              const features = product.features_locales?.[language] || product.features;
              const applications = product.applications_locales?.[language] || product.applications;
              const industries = product.industries_locales?.[language] || product.industries;
              
              const localizedProduct = {
                ...product,
                name,
                description,
                short_description,
                category,
                sub_category,
                features,
                applications,
                industries,
              };

              // Encode the product name for the URL
              const encodedProductName = encodeURIComponent(name);
              
              return (
                <motion.div 
                  key={product.id} 
                  custom={index}
                  variants={productCardVariants}
                  className="w-full"
                >
                  <div className="bg-white dark:bg-black/50 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 h-full flex flex-col border border-gray-100 dark:border-gray-700/50 backdrop-blur-sm group">
                    <div className="relative h-44 sm:h-56 overflow-hidden">
                      {product.image_url ? (
                        <motion.div
                          initial={{ scale: 1.1, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ duration: 0.5, delay: 0.3 + (index * 0.1) }}
                        >
                          <Image
                            src={product.image_url}
                            alt={name}
                            fill
                            className="object-contain p-4 transition-transform duration-700 group-hover:scale-110"
                          />
                        </motion.div>
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-gray-100 dark:bg-gray-800">
                          <span className="text-gray-400 dark:text-gray-500 font-medium">No image</span>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-brand-primary/0 group-hover:bg-brand-primary/5 transition-colors duration-300" />
                      {category && (
                        <motion.div 
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.4 + (index * 0.1), duration: 0.3 }}
                          className="absolute top-3 left-3 bg-white/90 dark:bg-gray-900/90 text-brand-primary dark:text-brand-primary py-1 px-2.5 rounded-md text-xs font-medium shadow-md border border-brand-primary/20 backdrop-blur-sm"
                        >
                          {category}
                        </motion.div>
                      )}
                      {product.out_of_stock && (
                        <motion.div 
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.4 + (index * 0.1), duration: 0.3 }}
                          className="absolute top-3 right-3 bg-gradient-to-r from-red-500 to-red-600 text-white py-1 px-2.5 rounded-md text-xs font-medium shadow-lg"
                        >
                          Out of Stock
                        </motion.div>
                      )}
                    </div>
                    
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 + (index * 0.1), duration: 0.3 }}
                      className="p-4 sm:p-5 flex flex-col flex-grow space-y-3"
                    >
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-1 font-heading group-hover:text-brand-primary transition-colors duration-200">{name}</h3>
                      
                      <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
                        {short_description || description}
                      </p>
                      
                      <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-3">
                        {product.temperature_rating && (
                          <motion.div 
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 + (index * 0.05), duration: 0.3 }}
                            className="flex items-center"
                          >
                            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-primary/10 mr-2">
                              <Flame className="h-5 w-5 text-brand-primary" />
                            </div>
                            <div>
                              <p className="text-xs text-gray-600 dark:text-gray-400">{t('featuredProducts.specs.temperature')}</p>
                              <p className="text-xs sm:text-sm font-medium text-gray-900 dark:text-white">{product.temperature_rating}°C</p>
                            </div>
                          </motion.div>
                        )}
                        {product.cut_resistance_level && product.en_standard && (
                          <motion.div 
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7 + (index * 0.05), duration: 0.3 }}
                            className="flex items-center"
                          >
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-primary/10 mr-2">
                              <div className="relative w-6 h-6">
                                <Image
                                  src={`/images/standards/${product.en_standard}.png`}
                                  alt={product.en_standard}
                                  fill
                                  className="object-contain dark:invert"
                                />
                              </div>
                            </div>
                            <div>
                              <p className="text-xs text-gray-600 dark:text-gray-400 whitespace-nowrap">EN Standards</p>
                              <p className="text-xs sm:text-sm font-medium text-gray-900 dark:text-white">{product.en_standard}</p>
                            </div>
                          </motion.div>
                        )}
                      </div>
                      
                      <div className="flex-1" />
                      
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 + (index * 0.05), duration: 0.3 }}
                        className="grid grid-cols-2 gap-2 pt-2 border-t border-gray-200 dark:border-gray-700"
                      >
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex items-center justify-center text-xs sm:text-sm border-brand-primary/30 text-brand-primary hover:bg-gray-700 hover:text-white hover:border-gray-700 transition-all duration-300"
                          onClick={() => handlePreviewClick(localizedProduct)}
                        >
                          <Eye className="mr-1 sm:mr-1.5 h-3 w-3 sm:h-4 sm:w-4" />
                          {t('featuredProducts.preview')}
                        </Button>
                        
                        <Button 
                          variant="default" 
                          size="sm" 
                          className="bg-gradient-to-r from-brand-primary to-orange-500 hover:from-brand-primary/90 hover:to-orange-500/90 text-white font-medium transition-all duration-300 hover:scale-105 hover:shadow-xl transform text-xs sm:text-sm"
                          asChild
                        >
                          <Link href={`/products/${encodedProductName}`} className="flex items-center justify-center">
                            <span className="transition-all duration-300">{t('featuredProducts.details')}</span>
                            <motion.div
                              whileHover={{ x: 3, scale: 1.1 }}
                              transition={{ duration: 0.2 }}
                            >
                              <ChevronRight className="ml-1 sm:ml-1.5 h-3 w-3 sm:h-4 sm:w-4" />
                            </motion.div>
                          </Link>
                        </Button>
                      </motion.div>
                    </motion.div>

                    {/* Hover Effect Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/0 to-brand-primary/0 group-hover:from-brand-primary/5 group-hover:to-transparent transition-all duration-500 pointer-events-none rounded-2xl" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <motion.div 
            variants={itemVariants}
            className="text-center py-14 border border-brand-primary/10 dark:border-brand-primary/20 rounded-xl bg-white/50 dark:bg-gray-800/30"
          >
            <p className="text-lg text-brand-secondary dark:text-gray-300">{t('featuredProducts.noProducts')}</p>
          </motion.div>
        )}
        
        <motion.div 
          variants={itemVariants}
          className="text-center"
        >
          <Button asChild variant="outline" className="group border-brand-primary text-brand-primary dark:text-white dark:border-white hover:text-brand-primary hover:bg-white/80 dark:hover:bg-white/10">
            <Link href="/products" className="flex items-center gap-1.5">
              <span>{t('featuredProducts.viewAll')}</span>
              <motion.div
                whileHover={{ x: 3 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4" />
              </motion.div>
            </Link>
          </Button>
        </motion.div>
      </div>
      
      {previewProduct && (
        <ProductPreviewModal
          product={previewProduct}
          isOpen={previewProduct !== null}
          onClose={handleClosePreview}
        />
      )}
    </motion.section>
  );
}; 