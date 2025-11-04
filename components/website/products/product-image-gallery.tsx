"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/lib/context/language-context";

interface ProductImageGalleryProps {
  mainImage: string;
  image2?: string | null;
  image3?: string | null;
  image4?: string | null;
  image5?: string | null;
  additionalImages?: string[] | null;
  productName: string;
  isFeatured?: boolean;
  isNew?: boolean;
  outOfStock?: boolean;
}

export const ProductImageGallery = ({
  mainImage,
  image2,
  image3,
  image4,
  image5,
  additionalImages,
  productName,
  isFeatured,
  isNew,
  outOfStock
}: ProductImageGalleryProps) => {
  const { t } = useLanguage();

  // Collect all available images
  const allImages = [
    mainImage,
    ...(image2 ? [image2] : []),
    ...(image3 ? [image3] : []),
    ...(image4 ? [image4] : []),
    ...(image5 ? [image5] : []),
    ...(additionalImages || [])
  ].filter(Boolean) as string[];

  // State to track the currently selected image
  const [selectedImage, setSelectedImage] = useState(mainImage);
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    // If mainImage changes, update selected image
    if (mainImage) {
      setSelectedImage(mainImage);
    }
  }, [mainImage]);

  return (
    <div className="space-y-5">
      {/* Main displayed image */}
      <div 
        className="group relative aspect-square overflow-hidden rounded-lg border bg-white dark:bg-black shadow-sm transition-all duration-300 hover:shadow-md border-brand-primary/10 dark:border-brand-primary/20 backdrop-blur-sm dark:backdrop-blur-none"
        onMouseEnter={() => setIsZoomed(true)}
        onMouseLeave={() => setIsZoomed(false)}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedImage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full"
          >
            <Image
              src={selectedImage}
              alt={productName}
              fill
              className={`object-contain p-4 transition-all duration-500 ${isZoomed ? 'scale-110' : 'scale-100'} ${outOfStock ? 'opacity-70' : 'opacity-100'}`}
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </motion.div>
        </AnimatePresence>
        
        {isFeatured && (
          <Badge className="absolute left-4 top-4 z-10 bg-brand-primary text-white px-3 py-1.5 shadow-md font-medium">
            {t('products.featured')}
          </Badge>
        )}
        
        {isNew && (
          <Badge className="absolute right-4 top-4 z-10 bg-brand-primary text-white px-3 py-1.5 shadow-md font-medium">
            {t('products.new')}
          </Badge>
        )}

        {outOfStock && (
          <div className="absolute inset-0 flex items-center justify-center z-20 backdrop-blur-sm backdrop-brightness-90 bg-black/20">
            <Badge className="bg-[#F5EFE0]/90 dark:bg-black/80 border-brand-primary text-brand-primary px-4 py-2 text-base font-medium shadow-md transform rotate-0 hover:bg-[#F5EFE0] dark:hover:bg-black/90 transition-all duration-200">
              Out of Stock
            </Badge>
          </div>
        )}
      </div>
      
      {/* Thumbnail images for selection */}
      {allImages.length > 1 && (
        <div className="grid grid-cols-4 gap-4">
          {allImages.map((image, index) => (
            <div 
              key={index} 
              className={`relative aspect-square overflow-hidden rounded-lg cursor-pointer transition-all duration-200 transform ${
                selectedImage === image 
                  ? 'ring-2 ring-[#F08515] ring-offset-2 dark:ring-offset-gray-900 shadow-md scale-105 bg-white dark:bg-black' 
                  : 'border bg-white dark:bg-black border-brand-primary/10 dark:border-brand-primary/20 backdrop-blur-sm dark:backdrop-blur-none opacity-80 hover:opacity-100 hover:shadow-md'
              }`}
              onClick={() => setSelectedImage(image)}
            >
              <Image
                src={image}
                alt={`${productName} - View ${index + 1}`}
                fill
                className="object-contain p-2"
                sizes="(max-width: 768px) 25vw, 12.5vw"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}; 