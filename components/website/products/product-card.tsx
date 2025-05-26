"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Flame, Scissors, ArrowRight, Eye } from "lucide-react";
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

  // Encode the product name for use in URLs
  const encodedProductName = encodeURIComponent(product.name);

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
          <Badge className="bg-gradient-to-r from-brand-primary to-orange-500 text-white font-medium px-2 py-1 shadow-lg text-xs">
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
        <div className="grid grid-cols-2 gap-2">
          {product.temperature_rating && (
            <div className="flex items-center">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-primary/10 mr-2">
                <Flame className="h-5 w-5 text-brand-primary" />
              </div>
              <div>
                <p className="text-xs text-gray-600 dark:text-gray-400">Temperature</p>
                <p className="text-xs font-medium text-gray-900 dark:text-white">{product.temperature_rating}°C</p>
              </div>
            </div>
          )}
          {product.cut_resistance_level && product.en_standard && (
            <div className="flex items-center">
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
                <p className="text-xs font-medium text-gray-900 dark:text-white">{product.en_standard}</p>
              </div>
            </div>
          )}
        </div>
        
        {/* Industries */}
        {product.industries && product.industries.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {product.industries.slice(0, 2).map((industry) => (
              <Badge key={industry} variant="secondary" className="text-xs bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors text-gray-700 dark:text-gray-300">
                {industry}
              </Badge>
            ))}
            {product.industries.length > 2 && (
              <Badge variant="secondary" className="text-xs bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                +{product.industries.length - 2}
              </Badge>
            )}
          </div>
        )}
        
        {/* Spacer to push buttons to bottom */}
        <div className="flex-1" />
        
        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-gray-200 dark:border-gray-700">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center justify-center border-brand-primary/30 text-brand-primary hover:bg-gray-700 hover:text-white hover:border-gray-700 transition-all duration-300 h-8"
            onClick={handlePreviewClick}
          >
            <Eye className="h-4 w-4 mr-1.5" />
            <span className="text-xs">{t('products.preview')}</span>
          </Button>
          
          <Button 
            variant="default" 
            size="sm" 
            className="bg-gradient-to-r from-brand-primary to-orange-500 hover:from-brand-primary/90 hover:to-orange-500/90 text-white font-medium transition-all duration-300 hover:scale-105 hover:shadow-xl transform h-8"
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