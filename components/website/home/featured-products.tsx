"use client";

import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Flame, Scissors, Eye } from "lucide-react";
import { getFeaturedProducts, Product } from "@/lib/products-service";
import { ProductPreviewModal } from "@/components/website/products/product-preview-modal";
import { useLanguage } from "@/lib/context/language-context";

export const FeaturedProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [previewProduct, setPreviewProduct] = useState<Product | null>(null);
  const { t, language } = useLanguage();
  
  useEffect(() => {
    const loadFeaturedProducts = async () => {
      try {
        const { products } = await getFeaturedProducts(language);
        setProducts(products);
      } catch (error) {
        console.error("Error loading featured products:", error);
      } finally {
        setLoading(false);
      }
    };
    
    loadFeaturedProducts();
  }, [language]);
  
  const handlePreviewClick = (product: Product) => {
    setPreviewProduct(product);
  };
  
  const handleClosePreview = () => {
    setPreviewProduct(null);
  };
  
  return (
    <section className="py-16 pb-12 sm:py-24 bg-brand-light dark:bg-background">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col items-center mb-8 sm:mb-12 text-center">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-dark dark:text-white mb-4 font-heading">
              {t('featuredProducts.title')}
            </h2>
            <p className="text-lg text-brand-secondary dark:text-gray-300">
              {t('featuredProducts.description')}
            </p>
          </div>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center min-h-[300px]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-primary"></div>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-16 border border-brand-primary/10 dark:border-brand-primary/20 rounded-xl bg-white/50 dark:bg-gray-800/30">
            <p className="text-lg text-brand-secondary dark:text-gray-300">{t('featuredProducts.noProducts')}</p>
          </div>
        ) : (
          <div className="relative">
            <div 
              ref={scrollContainerRef}
              className="flex overflow-x-auto pb-4 sm:pb-6 -mx-4 px-4 snap-x snap-mandatory scrollbar-hide"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              <style jsx global>{`
                .scrollbar-hide::-webkit-scrollbar {
                  display: none;
                }
              `}</style>
              {products.map((product) => {
                // Encode the product name for the URL
                const encodedProductName = encodeURIComponent(product.name);
                
                return (
                  <div key={product.id} className="min-w-[240px] sm:min-w-[300px] w-64 sm:w-80 flex-shrink-0 snap-start mr-4 sm:mr-6">
                    <div className="bg-[#F5EFE0]/80 dark:bg-transparent rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 h-full flex flex-col border border-brand-primary/10 dark:border-brand-primary/20 backdrop-blur-sm dark:backdrop-blur-none">
                      <div className="relative h-48 sm:h-64 overflow-hidden bg-black dark:bg-black">
                        {product.image_url ? (
                          <Image
                            src={product.image_url}
                            alt={product.name}
                            fill
                            className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center bg-gray-900 dark:bg-gray-900">
                            <span className="text-gray-400 dark:text-gray-500">No image</span>
                          </div>
                        )}
                        {product.category && (
                          <div className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-brand-primary text-white py-0.5 px-2 sm:py-1 sm:px-3 rounded-full text-xs sm:text-sm font-medium">
                            {product.category}
                          </div>
                        )}
                        {product.out_of_stock && (
                          <div className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-red-500 text-white py-0.5 px-2 sm:py-1 sm:px-3 rounded-full text-xs sm:text-sm font-medium">
                            Out of Stock
                          </div>
                        )}
                      </div>
                      
                      <div className="p-3 sm:p-6 flex flex-col flex-grow">
                        <h3 className="text-lg sm:text-xl font-bold text-brand-dark dark:text-white mb-1 sm:mb-2 font-heading">{product.name}</h3>
                        
                        <p className="text-xs sm:text-sm text-brand-secondary dark:text-gray-400 mb-2 sm:mb-4 line-clamp-2">
                          {product.short_description || product.description}
                        </p>
                        
                        <div className="grid grid-cols-2 gap-2 sm:gap-4 mb-3 sm:mb-6">
                          {product.temperature_rating && (
                            <div className="flex items-center">
                              <Flame className="h-3 w-3 sm:h-4 sm:w-4 text-brand-primary mr-1 sm:mr-1.5" />
                              <div>
                                <p className="text-2xs sm:text-xs text-brand-secondary dark:text-gray-400">{t('featuredProducts.specs.temperature')}</p>
                                <p className="text-sm sm:text-base font-medium text-brand-dark dark:text-white">{product.temperature_rating}°C</p>
                              </div>
                            </div>
                          )}
                          {product.cut_resistance_level && (
                            <div className="flex items-center">
                              <Scissors className="h-3 w-3 sm:h-4 sm:w-4 text-brand-primary mr-1 sm:mr-1.5" />
                              <div>
                                <p className="text-2xs sm:text-xs text-brand-secondary dark:text-gray-400">{t('featuredProducts.specs.cutLevel')}</p>
                                <p className="text-sm sm:text-base font-medium text-brand-dark dark:text-white">{product.cut_resistance_level}</p>
                              </div>
                            </div>
                          )}
                        </div>
                        
                        <div className="mt-auto flex gap-1 sm:gap-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="flex-1 text-xs sm:text-sm py-1.5 sm:py-2 border-brand-primary/30 text-brand-primary hover:bg-brand-primary/10 hover:border-brand-primary hover:text-black dark:hover:text-white dark:hover:bg-brand-primary/5"
                            onClick={() => handlePreviewClick(product)}
                          >
                            <Eye className="mr-1 sm:mr-1.5 h-3 w-3 sm:h-4 sm:w-4" />
                            {t('featuredProducts.preview')}
                          </Button>
                          
                          <Button 
                            variant="default" 
                            size="sm" 
                            className="flex-1 text-xs sm:text-sm py-1.5 sm:py-2 bg-brand-primary text-white hover:bg-brand-primary/90 transition-all duration-300 group"
                            asChild
                          >
                            <Link href={`/products/${encodedProductName}`} className="flex items-center justify-center">
                              {t('featuredProducts.details')}
                              <ChevronRight className="ml-1 sm:ml-1.5 h-3 w-3 sm:h-4 sm:w-4 transition-transform duration-300 group-hover:translate-x-1" />
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
        
        <div className="flex justify-center mt-8 sm:mt-12">
          <Button asChild variant="outline" className="group border-brand-primary text-brand-primary dark:text-white dark:border-white hover:text-brand-primary hover:bg-white/80 dark:hover:bg-white/10">
            <Link href="/products" className="flex items-center gap-1.5">
              <span>{t('featuredProducts.viewAll')}</span>
              <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
      
      {previewProduct && (
        <ProductPreviewModal
          product={previewProduct}
          isOpen={previewProduct !== null}
          onClose={handleClosePreview}
        />
      )}
    </section>
  );
}; 