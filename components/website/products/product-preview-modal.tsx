"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Flame, Scissors, ArrowRight, X } from "lucide-react";
import { Product } from "@/lib/products-service";
import { useLanguage } from "@/lib/context/language-context";

interface ProductPreviewModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

export const ProductPreviewModal: React.FC<ProductPreviewModalProps> = ({
  product,
  isOpen,
  onClose,
}) => {
  const { t } = useLanguage();
  // Encode the product name for use in URLs
  const encodedProductName = encodeURIComponent(product.name);
  
  // Collect all available images
  const allImages = [
    product.image_url,
    product.image2_url,
    product.image3_url,
    product.image4_url,
    product.image5_url
  ].filter(Boolean) as string[];
  
  // State to track the currently selected image
  const [selectedImage, setSelectedImage] = useState(product.image_url || "");

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-w-[95vw] p-0 gap-0 bg-[#F5EFE0]/95 dark:bg-black backdrop-blur-sm dark:backdrop-blur-none max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 right-0 p-2 z-20 flex justify-end">
          <DialogClose asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full bg-brand-primary/10 hover:bg-brand-primary/20 absolute top-2 right-2">
              <X className="h-4 w-4 text-brand-primary" />
              <span className="sr-only">Close</span>
            </Button>
          </DialogClose>
        </div>
        <DialogHeader className="p-4 sm:p-6 pt-8 sm:pt-6 border-b border-brand-primary/10 dark:border-brand-primary/20">
          <div className="flex flex-wrap items-center gap-2 mb-1 sm:mb-2">
            <Badge variant="outline" className="border-brand-primary/30 text-brand-secondary dark:text-gray-300 text-xs">
              {product.category}
            </Badge>
            {product.sub_category && (
              <Badge variant="outline" className="border-brand-primary/30 text-brand-secondary dark:text-gray-300 text-xs">
                {product.sub_category}
              </Badge>
            )}
            {product.out_of_stock && (
              <Badge variant="destructive" className="bg-red-500 text-white text-xs">
                Out of Stock
              </Badge>
            )}
          </div>
          <DialogTitle className="text-lg sm:text-xl font-bold text-brand-dark dark:text-white">
            {product.name}
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col sm:grid sm:grid-cols-2 gap-3 sm:gap-4 p-4 sm:p-6">
          <div className="space-y-3">
            {/* Main Image */}
            <div className="relative aspect-square bg-black dark:bg-black rounded-md overflow-hidden h-[180px] sm:h-auto">
              <Image
                src={selectedImage}
                alt={product.name}
                fill
                className="object-contain p-3 transition-opacity duration-200"
                sizes="(max-width: 600px) 100vw, 300px"
              />
              
              {product.is_featured && (
                <Badge className="absolute left-2 top-2 bg-brand-primary text-white text-xs">
                  Featured
                </Badge>
              )}
            </div>
            
            {/* Thumbnails */}
            {allImages.length > 1 && (
              <div className="flex overflow-x-auto space-x-2 pb-1">
                {allImages.map((image, index) => (
                  <button
                    key={index}
                    className={`relative h-12 w-12 flex-shrink-0 rounded-md overflow-hidden border-2 transition-all ${
                      selectedImage === image 
                        ? 'border-brand-primary shadow-sm' 
                        : 'border-gray-200 dark:border-gray-800 opacity-70 hover:opacity-100'
                    }`}
                    onClick={() => setSelectedImage(image)}
                  >
                    <Image
                      src={image}
                      alt={`${product.name} - View ${index + 1}`}
                      fill
                      className="object-contain p-1"
                      sizes="48px"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-2 sm:space-y-4">
            <div>
              <p className="text-xs sm:text-sm text-brand-secondary dark:text-gray-300 line-clamp-3">
                {product.short_description || product.description}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {product.temperature_rating && (
                <div className="flex items-center text-xs sm:text-sm text-brand-secondary dark:text-gray-300">
                  <Flame className="mr-1 h-3 w-3 sm:h-4 sm:w-4 text-brand-primary flex-shrink-0" />
                  <span>{product.temperature_rating}°C</span>
                </div>
              )}
              
              {product.cut_resistance_level && (
                <div className="flex items-center text-xs sm:text-sm text-brand-secondary dark:text-gray-300">
                  <Scissors className="mr-1 h-3 w-3 sm:h-4 sm:w-4 text-brand-primary flex-shrink-0" />
                  <span>EN388: {product.cut_resistance_level.replace("EN388: ", "")}</span>
                </div>
              )}
            </div>

            {product.industries && product.industries.length > 0 && (
              <div>
                <h4 className="text-xs font-medium text-brand-dark dark:text-white mb-1">{t('products.industries')}</h4>
                <div className="flex flex-wrap gap-1">
                  {product.industries.map((industry) => (
                    <Badge key={industry} variant="secondary" className="text-[10px] sm:text-xs">
                      {industry}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {product.features && product.features.length > 0 && (
              <div>
                <h4 className="text-xs font-medium text-brand-dark dark:text-white mb-0.5 sm:mb-1">{t('products.keyFeatures')}</h4>
                <ul className="list-disc list-inside space-y-0.5 sm:space-y-1 text-xs sm:text-sm text-brand-secondary dark:text-gray-300">
                  {product.features.slice(0, 2).map((feature, index) => (
                    <li key={index} className="line-clamp-1">{feature}</li>
                  ))}
                  {product.features.length > 2 && (
                    <li className="text-brand-primary text-xs">{t('products.moreFeatures').replace('{{count}}', String(product.features.length - 2))}</li>
                  )}
                </ul>
              </div>
            )}
          </div>
        </div>

        <DialogFooter className="p-4 sm:p-6 pt-1 sm:pt-2 flex-col sm:flex-row sm:justify-end items-stretch">
          <Button 
            variant="default"
            className="bg-brand-primary hover:bg-brand-primary/90 text-white transition-all duration-300 group w-full sm:w-auto py-4 sm:py-2 text-sm" 
            asChild
          >
            <Link href={`/products/${encodedProductName}`} className="flex items-center justify-center">
              {t('products.viewFullDetails')}
              <ArrowRight className="ml-2 h-3 w-3 sm:h-4 sm:w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}; 