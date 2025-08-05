"use client";

import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, ChevronLeft, Flame, Scissors, Eye, Package } from "lucide-react";
import { getFeaturedProducts, Product } from "@/lib/products-service";
import { ProductPreviewModal } from "@/components/website/products/product-preview-modal";
import { useLanguage } from "@/lib/context/language-context";
import { motion } from "framer-motion";

// Green color scheme function for safety standards (scaled down version)
const getGreenPerformanceColour = (value: number | string | null): string => {
  if (value === null || value === 'X' || value === '') {
    return 'bg-white border border-gray-300 text-gray-900'; // White background with grey border for X
  }
  
  // Handle letter grades A-F (A is best = darkest green, F is worst = lightest green)
  if (typeof value === 'string' && /^[A-F]$/.test(value)) {
    switch (value) {
      case 'A':
        return 'bg-emerald-700 text-white'; // Darkest green for best performance
      case 'B':
        return 'bg-emerald-600 text-white';
      case 'C':
        return 'bg-emerald-500 text-white';
      case 'D':
        return 'bg-emerald-400 text-white';
      case 'E':
        return 'bg-emerald-300 text-white';
      case 'F':
        return 'bg-emerald-200 text-white'; // Lightest green for worst performance
      default:
        return 'bg-gray-400 text-white';
    }
  }
  
  const numValue = typeof value === 'number' ? value : parseInt(value.toString());
  if (isNaN(numValue)) {
    return 'bg-gray-400 text-white';
  }
  
  // Professional green color scheme - higher levels get darker green
  switch (numValue) {
    case 1:
      return 'bg-emerald-200 text-white'; // Light professional green
    case 2:
      return 'bg-emerald-300 text-white'; 
    case 3:
      return 'bg-emerald-500 text-white'; // Medium green
    case 4:
      return 'bg-emerald-600 text-white';
    case 5:
      return 'bg-emerald-700 text-white'; // Darkest green for highest performance
    default:
      if (numValue > 5) return 'bg-emerald-800 text-white'; // Even darker for values above 5
      return 'bg-emerald-200 text-white'; // Default to light green
  }
};

// Parse EN388 values from string like "EN388: 3544CX"
const parseEN388 = (cutLevel: string): (string | number)[] => {
  const match = cutLevel.match(/EN388:\s*(\d|X)(\d|X)(\d|X)(\d|X)([A-F]|X)?([A-F]|X)?/);
  if (match) {
    return [
      match[1] === 'X' ? 'X' : parseInt(match[1]), // abrasion
      match[2] === 'X' ? 'X' : parseInt(match[2]), // cut
      match[3] === 'X' ? 'X' : parseInt(match[3]), // tear
      match[4] === 'X' ? 'X' : parseInt(match[4]), // puncture
      match[5] || 'X', // iso_13997
      match[6] || 'X'  // impact
    ];
  }
  return [];
};

// Parse EN407 values from string like "EN407: 422241"
const parseEN407 = (heatLevel: string): (string | number)[] => {
  const match = heatLevel.match(/EN407:\s*(\d|X)(\d|X)(\d|X)(\d|X)(\d|X)?(\d|X)?/);
  if (match) {
    return [
      match[1] === 'X' ? 'X' : parseInt(match[1]), // flame
      match[2] === 'X' ? 'X' : parseInt(match[2]), // contact
      match[3] === 'X' ? 'X' : parseInt(match[3]), // convective
      match[4] === 'X' ? 'X' : parseInt(match[4]), // radiant
      match[5] === 'X' ? 'X' : parseInt(match[5] || '0'), // small splashes
      match[6] === 'X' ? 'X' : parseInt(match[6] || '0')  // large splashes
    ];
  }
  return [];
};

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

const buttonVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.4,
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

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

  // Initialize scroll position to middle for infinite scroll
  useEffect(() => {
    if (products.length > 0 && scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      // Set initial position to start of second set for seamless scrolling
      container.scrollLeft = container.scrollWidth / 3;
    }
  }, [products]);

  // Handle infinite scroll on mobile touch scrolling
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container || products.length === 0) return;

    const handleScroll = () => {
      const cardWidth = getCardWidth();
      
      // Exact same logic as desktop scrollLeft function
      if (container.scrollLeft <= cardWidth) {
        container.scrollLeft = (container.scrollWidth * 2) / 3 + container.scrollLeft;
      }
      
      // Exact same logic as desktop scrollRight function  
      const maxScroll = (container.scrollWidth * 2) / 3;
      if (container.scrollLeft >= maxScroll - cardWidth) {
        container.scrollLeft = container.scrollLeft - (container.scrollWidth / 3);
      }
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [products]);

  const getCardWidth = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const firstCard = container.querySelector('.product-card');
      if (firstCard) {
        // Get actual width including margins
        const cardStyle = getComputedStyle(firstCard);
        const cardWidth = firstCard.getBoundingClientRect().width;
        const marginRight = parseFloat(cardStyle.marginRight) || 0;
        return cardWidth + marginRight;
      }
    }
    // Fallback to calculated width based on responsive classes
    return window.innerWidth >= 640 ? 288 + 20 : 208 + 12; // sm:w-72 + sm:mr-5 or w-52 + mr-3
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const cardWidth = getCardWidth();
      
      // Check if we're at the beginning of the first set
      if (container.scrollLeft <= cardWidth) {
        // Jump to equivalent position in the last set without animation
        container.scrollLeft = (container.scrollWidth * 2) / 3 + container.scrollLeft;
      }
      
      container.scrollBy({
        left: -cardWidth,
        behavior: 'smooth'
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const cardWidth = getCardWidth();
      
      // Check if we're near the end of the last set
      const maxScroll = (container.scrollWidth * 2) / 3;
      if (container.scrollLeft >= maxScroll - cardWidth) {
        // Jump to equivalent position in the first set without animation
        container.scrollLeft = container.scrollLeft - (container.scrollWidth / 3);
      }
      
      container.scrollBy({
        left: cardWidth,
        behavior: 'smooth'
      });
    }
  };
  
  const handlePreviewClick = (product: Product) => {
    setPreviewProduct(product);
  };
  
  const handleClosePreview = () => {
    setPreviewProduct(null);
  };

  // Triple the products array for seamless infinite scroll
  const infiniteProducts = products.length > 0 ? [...products, ...products, ...products] : [];
  
  return (
    <motion.section 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={sectionVariants}
      className="pt-12 pb-12 md:pt-16 md:pb-16"
    >
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div 
          variants={itemVariants}
          className="flex flex-col items-center mb-6 sm:mb-10 text-center"
        >
          <div className="max-w-2xl">
            <div className="inline-flex items-center justify-center mb-4">
              <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: "2rem" }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="h-1 w-8 bg-brand-primary rounded-full mr-3"
              ></motion.div>
              <h2 className="text-3xl md:text-4xl font-bold text-brand-dark dark:text-white font-heading">
                {t('featuredProducts.title')}
              </h2>
              <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: "2rem" }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="h-1 w-8 bg-brand-primary rounded-full ml-3"
              ></motion.div>
            </div>
            <motion.p 
              variants={itemVariants}
              className="text-lg text-brand-secondary dark:text-gray-300"
            >
              {t('featuredProducts.description')}
            </motion.p>
          </div>
        </motion.div>
        
        {loading ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-center items-center min-h-[250px]"
          >
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-brand-primary"></div>
          </motion.div>
        ) : products.length === 0 ? (
          <motion.div 
            variants={itemVariants}
            className="text-center py-14 border border-brand-primary/10 dark:border-brand-primary/20 rounded-xl bg-white/50 dark:bg-gray-800/30"
          >
            <p className="text-lg text-brand-secondary dark:text-gray-300">{t('featuredProducts.noProducts')}</p>
          </motion.div>
        ) : (
          <div className="relative">
            {/* Left Arrow */}
            {products.length > 0 && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={scrollLeft}
                className="hidden sm:block absolute -left-10 top-[35%] -translate-y-1/2 z-20 bg-[#F5EFE0]/95 dark:bg-[#121212]/95 backdrop-blur-sm shadow-2xl rounded-full p-3 border-2 border-brand-primary/20 dark:border-brand-primary/30 hover:border-brand-primary hover:bg-gradient-to-br hover:from-[#F08515] hover:to-[#E67A2C] dark:hover:bg-brand-primary hover:shadow-2xl transition-all duration-300 group"
              >
                <ChevronLeft className="h-6 w-6 text-gray-600 dark:text-gray-300 group-hover:text-white transition-colors duration-300 drop-shadow-sm" />
              </motion.button>
            )}

            {/* Right Arrow */}
            {products.length > 0 && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={scrollRight}
                className="hidden sm:block absolute -right-10 top-[35%] -translate-y-1/2 z-20 bg-[#F5EFE0]/95 dark:bg-[#121212]/95 backdrop-blur-sm shadow-2xl rounded-full p-3 border-2 border-brand-primary/20 dark:border-brand-primary/30 hover:border-brand-primary hover:bg-gradient-to-br hover:from-[#F08515] hover:to-[#E67A2C] dark:hover:bg-brand-primary hover:shadow-2xl transition-all duration-300 group"
              >
                <ChevronRight className="h-6 w-6 text-gray-600 dark:text-gray-300 group-hover:text-white transition-colors duration-300 drop-shadow-sm" />
              </motion.button>
            )}

            <div 
              ref={scrollContainerRef}
              className="flex overflow-x-auto pb-4 sm:pb-5 -mx-3 sm:-mx-4 px-3 sm:px-4 snap-x snap-mandatory scrollbar-hide"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              <style jsx global>{`
                .scrollbar-hide::-webkit-scrollbar {
                  display: none;
                }
              `}</style>
              
              {infiniteProducts.map((product, index) => {
                // Encode the product name for the URL
                const encodedProductName = encodeURIComponent(product.name);
                const originalIndex = index % products.length;
                
                return (
                  <motion.div 
                    key={`${product.id}-${index}`} 
                    custom={originalIndex}
                    variants={productCardVariants}
                    className="min-w-[200px] sm:min-w-[280px] w-52 sm:w-72 flex-shrink-0 snap-start mr-3 sm:mr-5 product-card"
                  >
                    <div className="bg-white dark:bg-black/50 rounded-2xl overflow-hidden transition-all duration-500 h-full flex flex-col border border-gray-100 dark:border-gray-700/50 group">
                      <Link href={`/products/${encodedProductName}`} className="block">
                        <div className="relative h-40 sm:h-56 overflow-hidden cursor-pointer">
                          {product.image_url ? (
                            <motion.div
                              initial={{ scale: 1.1, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              transition={{ duration: 0.5, delay: 0.3 + (index * 0.1) }}
                            >
                              <Image
                                src={product.image_url}
                                alt={product.name}
                                fill
                                className="object-contain p-3 sm:p-4 transition-transform duration-700 group-hover:scale-110"
                              />
                            </motion.div>
                          ) : (
                            <div className="flex h-full w-full items-center justify-center bg-gray-100 dark:bg-gray-800">
                              <span className="text-gray-400 dark:text-gray-500 font-medium text-xs sm:text-sm">No image</span>
                            </div>
                          )}
                          <div className="absolute inset-0 bg-brand-primary/0 group-hover:bg-brand-primary/5 transition-colors duration-300" />
                          {product.category && (
                            <motion.div 
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.4 + (index * 0.1), duration: 0.3 }}
                              className="absolute top-2 sm:top-3 left-2 sm:left-3 bg-white/90 dark:bg-gray-900/90 text-brand-primary dark:text-brand-primary py-0.5 sm:py-1 px-1.5 sm:px-2.5 rounded-md text-[10px] sm:text-xs font-medium shadow-md border border-brand-primary/20 backdrop-blur-sm"
                            >
                              {product.category}
                            </motion.div>
                          )}
                          {product.out_of_stock && (
                            <motion.div 
                              initial={{ opacity: 0, x: 10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.4 + (index * 0.1), duration: 0.3 }}
                              className="absolute top-2 sm:top-3 right-2 sm:right-3 bg-gradient-to-r from-red-500 to-red-600 text-white py-0.5 sm:py-1 px-1.5 sm:px-2.5 rounded-md text-[10px] sm:text-xs font-medium shadow-lg"
                            >
                              Out of Stock
                            </motion.div>
                          )}
                        </div>
                      </Link>
                      
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 + (index * 0.1), duration: 0.3 }}
                        className="p-3 sm:p-5 flex flex-col flex-grow space-y-2 sm:space-y-3"
                      >
                        <Link href={`/products/${encodedProductName}`}>
                          <h3 className="text-sm sm:text-xl font-bold text-gray-900 dark:text-white mb-1 font-heading group-hover:text-brand-primary transition-colors duration-200 cursor-pointer hover:text-brand-primary line-clamp-2">{product.name}</h3>
                        </Link>
                        
                        <p className="text-[11px] sm:text-sm text-gray-600 dark:text-gray-300 mb-2 sm:mb-3 line-clamp-2">
                          {product.short_description || product.description}
                        </p>
                        
                        {/* Safety Standards with Green Squares - Same as product cards */}
                        {(product.cut_resistance_level || product.heat_resistance_level) && (
                          <div className="space-y-2">
                            {/* EN Standards - Stacked vertically */}
                            <div className="space-y-1.5">
                              {/* EN388 Standard */}
                              {product.cut_resistance_level && (
                                <div className="flex items-center gap-1.5">
                                  <div className="flex h-3 w-3 items-center justify-center">
                                    <div className="relative w-3 h-3">
                                      <Image
                                        src="/images/standards/EN388.png"
                                        alt="EN388"
                                        fill
                                        className="object-contain dark:invert"
                                      />
                                    </div>
                                  </div>
                                  <span className="text-[10px] font-medium text-gray-700 dark:text-gray-300 min-w-[32px]">
                                    EN388
                                  </span>
                                  <div className="flex gap-0.5">
                                    {parseEN388(product.cut_resistance_level).map((value, index) => (
                                      <span
                                        key={index}
                                        className={`text-[10px] px-0.5 py-0.5 rounded w-4 h-4 flex items-center justify-center font-medium ${getGreenPerformanceColour(value)}`}
                                      >
                                        {value}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              )}
                              
                              {/* EN407 Standard */}
                              {product.heat_resistance_level && (
                                <div className="flex items-center gap-1.5">
                                  <div className="flex h-3 w-3 items-center justify-center">
                                    <div className="relative w-3 h-3">
                                      <Image
                                        src="/images/standards/EN407.png"
                                        alt="EN407"
                                        fill
                                        className="object-contain dark:invert"
                                      />
                                    </div>
                                  </div>
                                  <span className="text-[10px] font-medium text-gray-700 dark:text-gray-300 min-w-[32px]">
                                    EN407
                                  </span>
                                  <div className="flex gap-0.5">
                                    {parseEN407(product.heat_resistance_level).map((value, index) => (
                                      <span
                                        key={index}
                                        className={`text-[10px] px-0.5 py-0.5 rounded w-4 h-4 flex items-center justify-center font-medium ${getGreenPerformanceColour(value)}`}
                                      >
                                        {value}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                        
                        <div className="flex-1" />
                        
                        <motion.div 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.8 + (index * 0.05), duration: 0.3 }}
                          className="grid grid-cols-2 gap-1.5 sm:gap-2 pt-2 border-t border-gray-200 dark:border-gray-700"
                        >
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="flex items-center justify-center text-[10px] sm:text-sm border-brand-primary text-brand-primary hover:bg-white hover:text-brand-primary hover:border-brand-primary hover:shadow-lg hover:scale-105 transition-all duration-300 transform py-1.5 sm:py-2 px-1 sm:px-3"
                            onClick={() => handlePreviewClick(product)}
                          >
                            <Eye className="mr-0.5 sm:mr-1.5 h-3 w-3 sm:h-4 sm:w-4" />
                            <span className="hidden sm:inline">{t('featuredProducts.preview')}</span>
                            <span className="sm:hidden">View</span>
                          </Button>
                          
                          <Button 
                            variant="default" 
                            size="sm" 
                            className="bg-brand-primary hover:bg-brand-primary/90 text-white font-medium transition-all duration-300 hover:scale-105 hover:shadow-xl transform text-[10px] sm:text-sm py-1.5 sm:py-2 px-1 sm:px-3"
                            asChild
                          >
                            <Link href={`/products/${encodedProductName}`} className="flex items-center justify-center">
                              <span className="transition-all duration-300">{t('featuredProducts.details')}</span>
                              <motion.div
                                whileHover={{ x: 3, scale: 1.1 }}
                                transition={{ duration: 0.2 }}
                              >
                                <ChevronRight className="ml-0.5 sm:ml-1.5 h-3 w-3 sm:h-4 sm:w-4" />
                              </motion.div>
                            </Link>
                          </Button>
                        </motion.div>
                      </motion.div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}
        
        <motion.div 
          variants={buttonVariants}
          className="flex justify-center mt-7 sm:mt-9"
        >
          <Button asChild variant="default" className="group bg-brand-primary text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:bg-brand-primary/90 hover:scale-105 transform">
            <Link href="/products" className="flex items-center gap-1.5">
              <Package className="h-4 w-4 sm:h-5 sm:w-5" />
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