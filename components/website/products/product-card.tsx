"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Flame, Scissors, ArrowRight, Eye } from "lucide-react";
import { Product } from "@/lib/products-service";
import { ProductPreviewModal } from "./product-preview-modal";
import { useLanguage } from "@/lib/context/language-context";

export interface ProductCardProps {
  product: Product;
  onProductClick?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onProductClick }) => {
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
    <div className="group relative overflow-hidden rounded-lg border bg-[#F5EFE0]/80 dark:bg-transparent shadow-sm transition-all duration-300 hover:shadow-md border-brand-primary/10 dark:border-brand-primary/20 backdrop-blur-sm dark:backdrop-blur-none">
      {/* Badges container - stacked vertically */}
      <div className="absolute right-2 top-2 z-10 flex flex-col gap-1">
        {/* Out of Stock Badge */}
        {product.out_of_stock && (
          <Badge className="bg-red-500 text-white text-xs">
            {t('products.outOfStock')}
          </Badge>
        )}
        
        {/* New Badge */}
        {isNew && (
          <Badge className="bg-brand-primary text-white text-xs">
            {t('products.new')}
          </Badge>
        )}
      </div>
      
      {/* Product Image */}
      <Link href={`/products/${encodedProductName}`} className="block overflow-hidden">
        <div className="relative h-32 sm:h-48 w-full overflow-hidden bg-black dark:bg-black">
          {product.image_url ? (
            <Image
              src={product.image_url}
              alt={product.name}
              fill
              className="object-contain p-2 transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-gray-900 dark:bg-gray-900">
              <span className="text-gray-400 dark:text-gray-500">No image</span>
            </div>
          )}
        </div>
      </Link>
      
      {/* Product Details */}
      <div className="p-2 sm:p-4">
        <div className="mb-1 sm:mb-2 flex items-center justify-between">
          <Badge variant="outline" className="text-[10px] sm:text-xs border-brand-primary/30 text-brand-secondary dark:text-gray-300">
            {product.category}
          </Badge>
        </div>
        
        <Link href={`/products/${encodedProductName}`}>
          <h3 className="mb-1 sm:mb-2 line-clamp-1 text-sm sm:text-lg font-bold text-brand-dark hover:text-brand-primary dark:text-white dark:hover:text-brand-primary">
            {product.name}
          </h3>
        </Link>
        
        {/* Key Specifications */}
        <div className="mb-2 sm:mb-4 grid grid-cols-2 gap-1 sm:gap-2">
          {product.temperature_rating && (
            <div className="flex items-center text-xs sm:text-sm text-brand-secondary dark:text-gray-300">
              <Flame className="mr-1 h-3 w-3 sm:h-4 sm:w-4 text-brand-primary" />
              <span>{product.temperature_rating}°C</span>
            </div>
          )}
          {product.cut_resistance_level && product.en_standard && (
            <div className="flex items-center text-xs sm:text-sm text-brand-secondary dark:text-gray-300">
              <div className="relative w-4 h-4 sm:w-5 sm:h-5 mr-1 flex-shrink-0">
                <Image
                  src={`/images/standards/${product.en_standard}.png`}
                  alt={product.en_standard}
                  fill
                  className="object-contain"
                />
              </div>
              <span>{product.en_standard}</span>
            </div>
          )}
        </div>
        
        {/* Industries (if any) */}
        {product.industries && product.industries.length > 0 && (
          <div className="mb-2 sm:mb-4 hidden sm:block">
            <div className="flex flex-wrap gap-1">
              {product.industries.slice(0, 2).map((industry) => (
                <Badge key={industry} variant="secondary" className="text-xs">
                  {industry}
                </Badge>
              ))}
              {product.industries.length > 2 && (
                <Badge variant="secondary" className="text-xs">
                  +{product.industries.length - 2}
                </Badge>
              )}
            </div>
          </div>
        )}
        
        {/* Action Buttons */}
        <div className="mt-2 grid grid-cols-2 gap-1 sm:gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center justify-center border-brand-primary/30 text-brand-primary hover:bg-brand-primary/10 hover:border-brand-primary hover:text-black dark:hover:text-white dark:hover:bg-brand-primary/5 text-xs sm:text-sm h-7 sm:h-9"
            onClick={handlePreviewClick}
          >
            <Eye className="hidden sm:inline-block sm:mr-1.5 sm:h-4 sm:w-4" />
            {t('products.preview')}
          </Button>
          
          <Button 
            variant="default" 
            size="sm" 
            className="bg-brand-primary text-white hover:bg-brand-primary/90 transition-all duration-300 group text-xs sm:text-sm h-7 sm:h-9"
            asChild
          >
            <Link href={`/products/${encodedProductName}`} className="flex items-center justify-center w-full">
              {t('products.details')}
              <ArrowRight className="hidden sm:inline-block sm:ml-1.5 sm:h-4 sm:w-4 sm:transition-transform sm:duration-300 sm:group-hover:translate-x-1" />
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
    </div>
  );
}; 