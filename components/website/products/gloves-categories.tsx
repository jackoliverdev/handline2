"use client";

import React from "react";
import { CategoryCard } from "./category-card";
import { useLanguage } from "@/lib/context/language-context";
import { motion } from "framer-motion";
import { Shield } from "lucide-react";
import Link from "next/link";

export const GlovesCategories = () => {
  const { t } = useLanguage();
  
  const subcategories = [
    {
      title: t('products.categories.main.gloves.subcategories.heat.title'),
      description: t('products.categories.main.gloves.subcategories.heat.description'),
      imageSrc: "https://bsrdkfjapuvbzultcela.supabase.co/storage/v1/object/public/products/Categories/heat_resistant_gloves.png",
      imageAlt: t('products.categories.main.gloves.subcategories.heat.title'),
      href: "/products/gloves/heat"
    },
    {
      title: t('products.categories.main.gloves.subcategories.cut.title'),
      description: t('products.categories.main.gloves.subcategories.cut.description'),
      imageSrc: "https://bsrdkfjapuvbzultcela.supabase.co/storage/v1/object/public/products/Categories/cut_resistant_gloves.png",
      imageAlt: t('products.categories.main.gloves.subcategories.cut.title'), 
      href: "/products/gloves/cut"
    },
    {
      title: t('products.categories.main.gloves.subcategories.general.title'),
      description: t('products.categories.main.gloves.subcategories.general.description'),
      imageSrc: "https://bsrdkfjapuvbzultcela.supabase.co/storage/v1/object/public/products/Categories/general_purpose_gloves.png",
      imageAlt: t('products.categories.main.gloves.subcategories.general.title'),
      href: "/products/gloves/general"
    }
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <div className="flex flex-col items-center">
            <Link href="/products/gloves" className="inline-block transition-transform duration-300 mb-4">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="inline-flex items-center rounded-full bg-white dark:bg-black/50 px-4 py-2 text-xs sm:text-sm border border-gray-100 dark:border-gray-700/50 backdrop-blur-sm cursor-pointer shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 group"
              >
                <Shield className="mr-1.5 h-3 w-3 sm:mr-2 sm:h-4 sm:w-4 text-[#F28C38] group-hover:scale-110 transition-transform duration-300" />
                <span className="text-brand-dark dark:text-white font-medium font-heading">
                  {t('products.categories.main.gloves.badge')}
                </span>
              </motion.div>
            </Link>
            <div className="inline-flex items-center justify-center mb-4">
              <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: "2.5rem" }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="h-1 w-10 bg-[#F28C38] rounded-full mr-3"
              ></motion.div>
              <h2 className="text-3xl md:text-4xl font-bold text-brand-dark dark:text-white font-heading">
                {t('products.categories.main.gloves.title')} Categories
              </h2>
              <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: "2.5rem" }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="h-1 w-10 bg-[#F28C38] rounded-full ml-3"
              ></motion.div>
            </div>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-lg text-brand-secondary dark:text-gray-300 max-w-2xl mx-auto"
            >
              {t('products.categories.main.gloves.categoriesDescription')}
            </motion.p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {subcategories.map((subcategory, index) => (
            <CategoryCard
              key={subcategory.href}
              title={subcategory.title}
              description={subcategory.description}
              imageSrc={subcategory.imageSrc}
              imageAlt={subcategory.imageAlt}
              href={subcategory.href}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}; 