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
  categoryType?: 'gloves' | 'respiratory' | 'industrialSwabs' | 'heat' | 'cut' | 'general';
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
    ? ((['heat', 'cut', 'general'].includes(categoryType)) 
        ? t(`products.categories.main.gloves.subcategories.${categoryType}.title`)
        : t(`products.categories.main.${categoryType}.title`))
    : title;
    
  const displayDescription = categoryType
    ? ((['heat', 'cut', 'general'].includes(categoryType))
        ? t(`products.categories.pages.${categoryType}.detailedDescription`) 
        : t(`products.categories.main.${categoryType}.detailedDescription`))
    : description;
    
  const displayImageSrc = imageSrc || (categoryType ? getDefaultImageForCategory(categoryType) : "");
  const displayImageAlt = imageAlt || displayTitle || "";
  
  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Text Content - Left Side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={SPRING_CONFIG}
            className="space-y-4 md:space-y-6"
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-brand-dark dark:text-white font-heading">
              {displayTitle}
            </h2>
            <p className="text-base md:text-lg text-brand-secondary dark:text-gray-300 leading-relaxed">
              {displayDescription}
            </p>
          </motion.div>

          {/* Image - Right Side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ ...SPRING_CONFIG, delay: 0.1 }}
            className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-lg"
          >
            <Image
              src={displayImageSrc}
              alt={displayImageAlt}
              fill
              className="object-cover"
              priority
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Helper function to get default images for category types
function getDefaultImageForCategory(categoryType: string): string {
  const imageMap = {
    gloves: "https://bsrdkfjapuvbzultcela.supabase.co/storage/v1/object/public/products/Categories/Safety_Gloves.png",
    respiratory: "https://bsrdkfjapuvbzultcela.supabase.co/storage/v1/object/public/products/Categories/respiratory_protection.png",
    industrialSwabs: "https://bsrdkfjapuvbzultcela.supabase.co/storage/v1/object/public/products/Categories/Industrial_swabs.png",
    heat: "https://bsrdkfjapuvbzultcela.supabase.co/storage/v1/object/public/products/Categories/heat_resistant_gloves.png",
    cut: "https://bsrdkfjapuvbzultcela.supabase.co/storage/v1/object/public/products/Categories/cut_resistant_gloves.png",
    general: "https://bsrdkfjapuvbzultcela.supabase.co/storage/v1/object/public/products/Categories/general_purpose_gloves.png"
  };
  
  return imageMap[categoryType as keyof typeof imageMap] || "";
} 