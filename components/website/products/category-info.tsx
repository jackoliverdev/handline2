"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/context/language-context";

const SPRING_CONFIG = { stiffness: 100, damping: 30, mass: 1 };

interface CategoryInfoProps {
  title?: string;
  description?: string;
  imageSrc?: string;
  imageAlt?: string;
  categoryType?: 'gloves' | 'respiratory' | 'industrialSwabs' | 'armProtection' | 'hearing' | 'footwear' | 'eyeFace' | 'head' | 'clothing' | 'heat' | 'cut' | 'general' | 'mechanical' | 'welding';
}

export const CategoryInfo = ({ 
  title, 
  description, 
  imageSrc, 
  imageAlt,
  categoryType 
}: CategoryInfoProps) => {
  const { t } = useLanguage();
  
  // Use localized content if categoryType is provided, otherwise use props
  const displayTitle = categoryType 
    ? ((['heat', 'cut', 'general', 'mechanical', 'welding'].includes(categoryType)) 
        ? t(`products.categories.main.gloves.subcategories.${categoryType}.title`)
        : t(`products.categories.main.${categoryType}.title`))
    : title;
    
  const displayDescription = categoryType
    ? ((['heat', 'cut', 'general', 'mechanical', 'welding'].includes(categoryType))
        ? t(`products.categories.pages.${categoryType}.detailedDescription`) 
        : t(`products.categories.main.${categoryType}.detailedDescription`))
    : description;
    
  const displayImageSrc = imageSrc || (categoryType ? getDefaultImageForCategory(categoryType) : "");
  const displayImageAlt = imageAlt || displayTitle || "";
  
  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-8 lg:gap-12 items-stretch">
          {/* Text Content - Left Side (70% width) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={SPRING_CONFIG}
            className="flex items-center lg:col-span-7"
          >
            <div className="bg-white dark:bg-black/50 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700/50 p-8 md:p-10 h-full flex flex-col justify-center backdrop-blur-sm hover:shadow-xl transition-all duration-500">
              <div className="space-y-4">
                <div className="inline-flex items-center rounded-full bg-brand-primary/10 px-4 py-2 text-sm border border-brand-primary/20">
                  <span className="text-brand-primary font-medium">{t('products.categoryOverview')}</span>
                </div>
                
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-brand-dark dark:text-white font-heading leading-tight">
                  {displayTitle}
                </h2>
                
                <div className="w-20 h-1 bg-gradient-to-r from-brand-primary to-brand-primary rounded-full"></div>
                
                <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                  {displayDescription}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Image - Right Side (30% width) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ ...SPRING_CONFIG, delay: 0.1 }}
            className="flex items-center lg:col-span-3"
          >
            <div className="relative w-full h-full min-h-[400px] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 bg-white dark:bg-black/50 border border-gray-100 dark:border-gray-700/50 group">
              <Image
                src={displayImageSrc}
                alt={displayImageAlt}
                fill
                className="object-contain transition-transform duration-700 group-hover:scale-105"
                priority
              />
              {/* Subtle hover overlay */}
              <div className="absolute inset-0 bg-brand-primary/0 group-hover:bg-brand-primary/5 transition-colors duration-500" />
              
              {/* Enhanced gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Helper function to get default images for category types
function getDefaultImageForCategory(categoryType: string): string {
  const imageMap = {
    gloves: "/glovecats/49K-C_A.webp",
    respiratory: "/images/products/categories/respirator.jpeg",
    industrialSwabs: "/images/HLC_SWABS_main.jpg",
    armProtection: "/images/products/categories/armppe.webp",
    footwear: "/images/products/categories/safetyboot.png",
    hearing: "/images/products/categories/single use ear plugs.webp",
    eyeFace: "/images/products/categories/metalfreeglasses.jpg",
    head: "/images/products/categories/Safety helmet suitable for low temperatures and splash protection.webp",
    clothing: "/images/products/categories/High-Vis, Jacket High-Vis.webp",
    heat: "/glovecats/152-14 3L20_A.webp",
    cut: "/glovecats/HL8801 DSR_A.webp",
    general: "/glovecats/HL 6WWG_A.webp",
    mechanical: "/glovecats/HL1001B_A.webp",
    welding: "/glovecats/49K-C_A.webp"
  };
  
  return imageMap[categoryType as keyof typeof imageMap] || "";
} 