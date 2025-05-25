"use client";

import { CategoryCard } from "./category-card";
import { useLanguage } from "@/lib/context/language-context";
import { motion } from "framer-motion";
import { Grid3X3 } from "lucide-react";
import Link from "next/link";

export const CategoryList = () => {
  const { t } = useLanguage();
  
  const categories = [
    {
      title: t('products.categories.main.gloves.title'),
      description: t('products.categories.main.gloves.description'),
      imageSrc: "https://bsrdkfjapuvbzultcela.supabase.co/storage/v1/object/public/products/Categories/Safety_Gloves.png",
      imageAlt: t('products.categories.main.gloves.title'),
      href: "/products/gloves"
    },
    {
      title: t('products.categories.main.industrialSwabs.title'),
      description: t('products.categories.main.industrialSwabs.description'),
      imageSrc: "https://bsrdkfjapuvbzultcela.supabase.co/storage/v1/object/public/products/Categories/Industrial_swabs.png", 
      imageAlt: t('products.categories.main.industrialSwabs.title'),
      href: "/products/industrial-swabs"
    },
    {
      title: t('products.categories.main.respiratory.title'),
      description: t('products.categories.main.respiratory.description'),
      imageSrc: "https://bsrdkfjapuvbzultcela.supabase.co/storage/v1/object/public/products/Categories/respiratory_protection.png",
      imageAlt: t('products.categories.main.respiratory.title'),
      href: "/products/respiratory"
    }
  ];

  return (
    <section id="product-categories" className="py-16">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <div className="flex flex-col items-center">
            <Link href="/products" className="inline-block transition-transform duration-300 mb-4">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="inline-flex items-center rounded-full bg-white/80 dark:bg-black/60 px-3 py-1 text-xs sm:text-sm border border-[#F28C38] backdrop-blur-sm cursor-pointer"
              >
                <Grid3X3 className="mr-1.5 h-3 w-3 sm:mr-2 sm:h-4 sm:w-4 text-[#F28C38]" />
                <span className="text-brand-dark dark:text-white font-medium font-heading">
                  {t('products.categories.main.badge')}
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
                {t('products.categories.main.title')}
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
              {t('products.categories.main.description')}
            </motion.p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <CategoryCard
              key={category.href}
              title={category.title}
              description={category.description}
              imageSrc={category.imageSrc}
              imageAlt={category.imageAlt}
              href={category.href}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}; 