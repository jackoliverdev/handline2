"use client";

import { CategoryCard } from "./category-card";
import { useLanguage } from "@/lib/context/language-context";
import { motion } from "framer-motion";
import { Grid3X3, MessageCircle, ChevronRight } from "lucide-react";
import React from "react";
import Link from "next/link";

// Local image map aligned with CategoryInfo defaults
const categoryImageMap: Record<string, string> = {
  gloves: "/glovecats/49K-C_A.webp", // No new gloves image provided, keeping existing
  industrialSwabs: "/categoryimages/CAT_swabs_Hero.webp",
  respiratory: "/categoryimages/CAT_respiratory_Hero.webp",
  armProtection: "/categoryimages/CAT_sleeves_Hero.webp",
  hearing: "/categoryimages/CAT_hearing_Hero.webp",
  footwear: "/categoryimages/CAT_footwear_Hero.webp",
  eyeFace: "/categoryimages/CAT_eyes_Hero.webp",
  head: "/categoryimages/CAT_head_Hero.webp",
  clothing: "/categoryimages/CAT_clothing-SUBCAT_HighVis_Hero.webp",
};

export const MainCategoriesRow = () => {
  const { t } = useLanguage();

  const categories = [
    {
      key: "gloves",
      title: t("products.categories.main.gloves.title"),
      description: t("products.categories.main.gloves.description"),
      imageSrc: categoryImageMap.gloves,
      href: "/products/gloves",
    },
    {
      key: "industrialSwabs",
      title: t("products.categories.main.industrialSwabs.title"),
      description: t("products.categories.main.industrialSwabs.description"),
      imageSrc: categoryImageMap.industrialSwabs,
      href: "/products/industrial-swabs",
    },
    {
      key: "respiratory",
      title: t("products.categories.main.respiratory.title"),
      description: t("products.categories.main.respiratory.description"),
      imageSrc: categoryImageMap.respiratory,
      href: "/products/respiratory",
    },
    {
      key: "hearing",
      title: t("products.categories.main.hearing.title"),
      description: t("products.categories.main.hearing.description"),
      imageSrc: categoryImageMap.hearing,
      href: "/products/hearing",
    },
    {
      key: "armProtection",
      title: t("products.categories.main.armProtection.title"),
      description: t("products.categories.main.armProtection.description"),
      imageSrc: categoryImageMap.armProtection,
      href: "/products/arm-protection",
    },
    {
      key: "footwear",
      title: t("products.categories.main.footwear.title"),
      description: t("products.categories.main.footwear.description"),
      imageSrc: categoryImageMap.footwear,
      href: "/products/footwear",
    },
    {
      key: "eyeFace",
      title: t("products.categories.main.eyeFace.title"),
      description: t("products.categories.main.eyeFace.description"),
      imageSrc: categoryImageMap.eyeFace,
      href: "/products/eye-face",
    },
    {
      key: "head",
      title: t("products.categories.main.head.title"),
      description: t("products.categories.main.head.description"),
      imageSrc: categoryImageMap.head,
      href: "/products/head",
    },
    {
      key: "clothing",
      title: t("products.categories.main.clothing.title"),
      description: t("products.categories.main.clothing.description"),
      imageSrc: categoryImageMap.clothing,
      href: "/products/clothing",
    },
  ];

  return (
    <section id="product-categories" className="py-16">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <div className="flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="inline-flex items-center rounded-full bg-white dark:bg-black/50 px-4 py-2 text-xs sm:text-sm border border-gray-100 dark:border-gray-700/50 backdrop-blur-sm shadow-md transition-all duration-300 mb-4"
            >
              <Grid3X3 className="mr-1.5 h-3 w-3 sm:mr-2 sm:h-4 sm:w-4 text-brand-primary" />
              <span className="text-brand-dark dark:text-white font-medium font-heading">
                {t("products.categories.main.badge")}
              </span>
            </motion.div>
            <div className="inline-flex items-center justify-center mb-4">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "2rem" }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="h-1 w-8 bg-brand-primary rounded-full mr-3"
              ></motion.div>
              <h2 className="text-3xl md:text-4xl font-bold text-brand-dark dark:text-white font-heading">
                {t("products.categories.main.title")}
              </h2>
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "2rem" }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="h-1 w-8 bg-brand-primary rounded-full ml-3"
              ></motion.div>
            </div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-lg text-brand-secondary dark:text-gray-300 max-w-2xl mx-auto"
            >
              {t("products.categories.main.description")}
            </motion.p>
          </div>
        </div>

        {/* Mobile: horizontal scrollable row */}
        <div className="md:hidden overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700 -mx-4 sm:mx-0">
          <div className="px-4 flex gap-6 lg:gap-8 snap-x snap-mandatory">
            {categories.map((c, index) => (
              <div key={c.key} className="snap-start flex-none w-[260px] sm:w-[300px]">
                <CategoryCard
                  title={c.title}
                  description={c.description}
                  imageSrc={c.imageSrc}
                  imageAlt={c.title}
                  href={c.href}
                  index={index}
                  noShadow
                />
              </div>
            ))}
            {/* Contact Card for Mobile */}
            <div className="snap-start flex-none w-[260px] sm:w-[300px]">
              <ContactCard index={categories.length} />
            </div>
          </div>
        </div>

        {/* Desktop: 2 rows x 5 columns grid */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-8">
          {categories.map((c, index) => (
            <CategoryCard
              key={c.key}
              title={c.title}
              description={c.description}
              imageSrc={c.imageSrc}
              imageAlt={c.title}
              href={c.href}
              index={index}
              noShadow
            />
          ))}
          {/* Contact Card - 10th item */}
          <ContactCard index={categories.length} />
        </div>
      </div>
    </section>
  );
};

// Contact Card Component
const ContactCard = ({ index }: { index: number }) => {
  const { t } = useLanguage();
  const SPRING_CONFIG = { stiffness: 100, damping: 30, mass: 1 };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ...SPRING_CONFIG, delay: index * 0.1 }}
      className="group h-full"
    >
      <Link href="/contact" className="block h-full">
        <div className="relative bg-white dark:bg-black/50 rounded-2xl shadow-none transition-all duration-500 overflow-hidden border border-gray-100 dark:border-gray-700/50 group-hover:border-brand-primary/50 backdrop-blur-sm h-full flex flex-col">
          {/* Icon section - matching aspect ratio of image */}
          <div className="relative aspect-[4/3] overflow-hidden flex items-center justify-center">
            <MessageCircle className="h-16 w-16 text-brand-primary transition-transform duration-700 group-hover:scale-105" />
            {/* Brand gradient overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </div>
          
          {/* Content */}
          <div className="p-6 flex-1 flex flex-col">
            <div className="flex items-start justify-between gap-4 flex-1">
              <div className="flex-1 flex flex-col h-full">
                <h3 className="text-lg font-bold text-brand-dark dark:text-white font-heading mb-3 group-hover:text-brand-primary transition-colors duration-300 leading-tight">
                  {t("products.categories.main.contactCard.title")}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed flex-1 line-clamp-3">
                  {t("products.categories.main.contactCard.description")}
                </p>
              </div>
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-brand-primary/10 group-hover:bg-brand-primary group-hover:scale-110 transition-all duration-300 flex-shrink-0 mt-1">
                <ChevronRight className="h-4 w-4 text-brand-primary group-hover:text-white transition-all duration-300" />
              </div>
            </div>
          </div>
          
          {/* Enhanced hover effect overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/0 via-transparent to-brand-primary/0 group-hover:from-brand-primary/5 group-hover:to-brand-primary/5 transition-all duration-500 pointer-events-none rounded-2xl" />
          
          {/* Bottom accent line */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-primary/0 via-brand-primary to-brand-primary/0 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center" />
        </div>
      </Link>
    </motion.div>
  );
};
