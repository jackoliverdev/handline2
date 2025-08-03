"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Flame, Scissors, ArrowRight, Eye, ListChecks } from "lucide-react";
import { Product } from "@/lib/products-service";
import { ProductPreviewModal } from "./product-preview-modal";
import { useLanguage } from "@/lib/context/language-context";

export interface ProductCardProps {
  product: Product;
  onProductClick?: (product: Product) => void;
  index?: number;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onProductClick, index = 0 }) => {
  // Check if the product is new (created within the last 30 days)
  const isNew = new Date(product.created_at).getTime() > Date.now() - (30 * 24 * 60 * 60 * 1000);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const { t } = useLanguage();
  
  const handlePreviewClick = () => {
    setShowPreviewModal(true);
  };
  
  const handleModalClose = () => {
    setShowPreviewModal(false);
  };

  // Use the original English name for URL generation (not localized)
  // This ensures URLs work consistently across language changes
  const encodedProductName = encodeURIComponent(product.name);

  // Get top 4 applications
  const topApplications = product.applications ? product.applications.slice(0, 4) : [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: Math.min(index * 0.1, 0.8),
        duration: 0.5,
        ease: [0.21, 0.47, 0.32, 0.98]
      }}
      className="group relative overflow-hidden rounded-2xl bg-white dark:bg-black/50 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-gray-700/50 backdrop-blur-sm h-full flex flex-col"
    >
      {/* Badges container - stacked vertically */}
      <div className="absolute right-3 top-3 z-20 flex flex-col gap-1">
        {/* Out of Stock Badge */}
        {product.out_of_stock && (
          <Badge className="bg-gradient-to-r from-red-500 to-red-600 text-white font-medium px-2 py-1 shadow-lg text-xs">
            {t('products.outOfStock')}
          </Badge>
        )}
        
        {/* New Badge */}
        {isNew && (
          <Badge className="bg-gradient-to-r from-brand-primary to-brand-primary text-white font-medium px-2 py-1 shadow-lg text-xs">
            {t('products.new')}
          </Badge>
        )}
      </div>
      
      {/* Product Image */}
      <Link href={`/products/${encodedProductName}`} className="block overflow-hidden">
        <div className="relative h-36 w-full overflow-hidden">
          {product.image_url ? (
            <Image
              src={product.image_url}
              alt={product.name}
              fill
              className="object-contain p-3 transition-transform duration-700 group-hover:scale-110"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-gray-100 dark:bg-gray-800">
              <span className="text-gray-400 dark:text-gray-500 font-medium text-sm">No image</span>
            </div>
          )}
          <div className="absolute inset-0 bg-brand-primary/0 group-hover:bg-brand-primary/5 transition-colors duration-300" />
        </div>
      </Link>
      
      {/* Product Details */}
      <div className="p-4 flex-1 flex flex-col space-y-3">
        {/* Category Badge */}
        <div className="flex items-center justify-between">
          <Badge 
            variant="outline" 
            className="text-xs border-brand-primary/30 text-gray-800 dark:text-brand-primary bg-brand-primary/10 hover:bg-brand-primary/20 transition-colors font-medium"
          >
            {product.category}
          </Badge>
        </div>
        
        {/* Product Name */}
        <Link href={`/products/${encodedProductName}`}>
          <h3 className="text-lg font-bold leading-tight text-gray-900 dark:text-white hover:text-brand-primary dark:hover:text-brand-primary transition-colors duration-200 line-clamp-2 group-hover:text-brand-primary">
            {product.name}
          </h3>
        </Link>
        
        {/* Key Specifications */}
        <div className="space-y-2">
          {(product.cut_resistance_level || product.heat_resistance_level) && (
            <>
              {/* EN Standards Title */}
              <div className="flex items-center gap-1">
                <p className="text-xs text-brand-primary font-medium">{t('products.enStandards')}</p>
              </div>
              
              {/* EN Standards Values - Responsive Grid */}
              <div className={`grid gap-1 ${
                product.cut_resistance_level && product.heat_resistance_level 
                  ? 'grid-cols-2' 
                  : 'grid-cols-1'
              }`}>
                {product.cut_resistance_level && (
                  <div className="flex items-center gap-0.5 -ml-0.5">
                    <div className="flex h-4 w-4 items-center justify-center">
                      <div className="relative w-4 h-4">
                        <Image
                          src="/images/standards/EN388.png"
                          alt="EN388"
                          fill
                          className="object-contain dark:invert"
                        />
                      </div>
                    </div>
                    <p className="text-[11px] sm:text-xs font-medium text-gray-900 dark:text-white truncate ml-1">
                      {product.cut_resistance_level}
                    </p>
                  </div>
                )}
                {product.heat_resistance_level && (
                  <div className="flex items-center gap-0.5 -ml-0.5">
                    <div className="flex h-4 w-4 items-center justify-center">
                      <div className="relative w-4 h-4">
                        <Image
                          src="/images/standards/EN407.png"
                          alt="EN407"
                          fill
                          className="object-contain dark:invert"
                        />
                      </div>
                    </div>
                    <p className="text-[11px] sm:text-xs font-medium text-gray-900 dark:text-white truncate ml-1">
                      {product.heat_resistance_level}
                    </p>
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {/* Top 2 Applications */}
        {topApplications.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center gap-1">
              <ListChecks className="h-3 w-3 text-brand-primary" />
              <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">{t('products.applications')}</p>
            </div>
            <ul className="space-y-1">
              {topApplications.map((application, index) => (
                <li key={index} className="text-xs text-gray-600 dark:text-gray-300 flex items-start">
                  <span className="text-brand-primary mr-1">•</span>
                  <span className="line-clamp-1">{application}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        
        {/* Spacer to push buttons to bottom */}
        <div className="flex-1" />
        
        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-gray-200 dark:border-gray-700">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center justify-center border-brand-primary text-brand-primary hover:bg-white hover:text-brand-primary hover:border-brand-primary hover:shadow-lg hover:scale-105 transition-all duration-300 transform h-8"
            onClick={handlePreviewClick}
          >
            <Eye className="h-4 w-4 mr-1.5" />
            <span className="text-xs">{t('products.preview')}</span>
          </Button>
          
          <Button 
            variant="default" 
            size="sm" 
            className="bg-brand-primary hover:bg-brand-primary/90 text-white font-medium transition-all duration-300 hover:scale-105 hover:shadow-xl transform h-8"
            asChild
          >
            <Link href={`/products/${encodedProductName}`} className="flex items-center justify-center w-full">
              <span className="text-xs transition-all duration-300">{t('products.details')}</span>
              <ArrowRight className="h-3 w-3 ml-1.5 transition-all duration-300 group-hover:translate-x-2 group-hover:scale-110" />
            </Link>
          </Button>
        </div>
        
        {/* Preview Modal */}
        {showPreviewModal && (
          <ProductPreviewModal 
            product={product} 
            isOpen={showPreviewModal} 
            onClose={handleModalClose} 
          />
        )}
      </div>

      {/* Hover Effect Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/0 to-brand-primary/0 group-hover:from-brand-primary/5 group-hover:to-transparent transition-all duration-500 pointer-events-none rounded-2xl" />
    </motion.div>
  );
}; 