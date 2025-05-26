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
  
  // Function to clean and validate image URLs
  const cleanImageUrl = (url: string | null | undefined): string | null => {
    if (!url) return null;
    // Remove any trailing curly braces or other invalid characters
    const cleaned = url.replace(/[{}]/g, '').trim();
    // Validate it's a proper URL
    try {
      new URL(cleaned);
      return cleaned;
    } catch {
      return null;
    }
  };
  
  // Collect all available images with cleaning
  const allImages = [
    cleanImageUrl(product.image_url),
    cleanImageUrl(product.image2_url),
    cleanImageUrl(product.image3_url),
    cleanImageUrl(product.image4_url),
    cleanImageUrl(product.image5_url)
  ].filter(Boolean) as string[];
  
  // State to track the currently selected image
  const [selectedImage, setSelectedImage] = useState(allImages[0] || "");

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] max-w-[95vw] p-0 gap-0 bg-white dark:bg-black/100 backdrop-blur-sm border border-gray-100 dark:border-gray-700/50 shadow-2xl max-h-[85vh] overflow-y-auto">
        
        {/* Header with title and badges */}
        <div className="p-6 pb-4 border-b border-gray-100 dark:border-gray-700/50">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            {/* Featured Badge - Better contrast */}
            {product.is_featured && (
              <div className="bg-brand-primary text-white py-1 px-3 rounded-lg text-sm font-bold shadow-lg border-2 border-brand-primary">
                Featured
              </div>
            )}
            
            {/* Category Badge */}
            {product.category && (
              <div className="bg-white/90 dark:bg-gray-900/90 text-brand-primary py-1 px-3 rounded-lg text-sm font-medium shadow-md border border-brand-primary/20 backdrop-blur-sm">
                {product.category}
              </div>
            )}
            
            {product.sub_category && (
              <div className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 py-1 px-3 rounded-lg text-sm font-medium border border-gray-200 dark:border-gray-700">
                {product.sub_category}
              </div>
            )}
            
            {product.out_of_stock && (
              <div className="bg-gradient-to-r from-red-500 to-red-600 text-white py-1 px-3 rounded-lg text-sm font-medium shadow-lg">
                Out of Stock
              </div>
            )}
          </div>
          
          <h2 className="text-xl font-bold text-brand-dark dark:text-white font-heading">
            {product.name}
          </h2>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
          {/* Left side - Images */}
          <div className="space-y-3">
            {/* Main Image */}
            <div className="relative aspect-square bg-white dark:bg-black/30 rounded-xl overflow-hidden border border-gray-100 dark:border-gray-700/50 shadow-md group">
              <Image
                src={selectedImage}
                alt={product.name}
                fill
                className="object-contain p-3 transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 350px"
              />
              <div className="absolute inset-0 bg-brand-primary/0 group-hover:bg-brand-primary/5 transition-colors duration-300" />
            </div>
            
            {/* Thumbnails */}
            {allImages.length > 1 && (
              <div className="flex space-x-2">
                {allImages.map((image, index) => (
                  <button
                    key={index}
                    className={`relative h-12 w-12 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                      selectedImage === image 
                        ? 'border-brand-primary shadow-md scale-105' 
                        : 'border-gray-200 dark:border-gray-700 opacity-70 hover:opacity-100 hover:scale-105'
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

          {/* Right side - Details */}
          <div className="space-y-4">
            {/* Description */}
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-3 border border-gray-100 dark:border-gray-700/50">
              <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                {product.short_description || product.description}
              </p>
            </div>

            {/* Specifications - Compact */}
            <div className="space-y-3">
              <h4 className="text-base font-semibold text-brand-dark dark:text-white font-heading">Specifications</h4>
              
              <div className="space-y-2">
                {product.temperature_rating && (
                  <div className="flex items-center bg-white dark:bg-black/30 rounded-lg p-3 border border-gray-100 dark:border-gray-700/50 shadow-sm">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-primary/10 mr-3">
                      <Flame className="h-4 w-4 text-brand-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 dark:text-gray-400">Temperature Resistance</p>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">{product.temperature_rating}°C</p>
                    </div>
                  </div>
                )}
                
                {product.cut_resistance_level && product.en_standard && (
                  <div className="flex items-center bg-white dark:bg-black/30 rounded-lg p-3 border border-gray-100 dark:border-gray-700/50 shadow-sm">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-primary/10 mr-3">
                      <div className="relative w-5 h-5">
                        <Image
                          src={`/images/standards/${product.en_standard}.png`}
                          alt={product.en_standard}
                          fill
                          className="object-contain dark:invert"
                        />
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 dark:text-gray-400">EN Standards</p>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">{product.en_standard}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Industries - Compact */}
            {product.industries && product.industries.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-base font-semibold text-brand-dark dark:text-white font-heading">Industries</h4>
                <div className="flex flex-wrap gap-1.5">
                  {product.industries.map((industry) => (
                    <div key={industry} className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 py-1 px-2 rounded text-xs font-medium border border-gray-200 dark:border-gray-700">
                      {industry}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Key Features - Compact */}
            {product.features && product.features.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-base font-semibold text-brand-dark dark:text-white font-heading">Key Features:</h4>
                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-3 border border-gray-100 dark:border-gray-700/50">
                  <ul className="space-y-1">
                    {product.features.slice(0, 3).map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <div className="w-1.5 h-1.5 bg-brand-primary rounded-full mt-1.5 mr-2 flex-shrink-0"></div>
                        <span className="text-gray-700 dark:text-gray-300 text-sm">{feature}</span>
                      </li>
                    ))}
                    {product.features.length > 3 && (
                      <li className="text-brand-primary text-sm font-medium">
                        +{product.features.length - 3} more
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 pt-0 border-t border-gray-100 dark:border-gray-700/50">
          <Button 
            variant="default"
            className="bg-gradient-to-r from-brand-primary to-orange-500 hover:from-brand-primary/90 hover:to-orange-500/90 text-white font-medium transition-all duration-300 hover:scale-[1.02] hover:shadow-lg w-full py-2.5 text-sm rounded-lg shadow-md" 
            asChild
          >
            <Link href={`/products/${encodedProductName}`} className="flex items-center justify-center">
              <span className="font-semibold">View Full Details</span>
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}; 