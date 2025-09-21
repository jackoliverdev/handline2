"use client";

import { CategoryCard } from "./category-card";
import { useLanguage } from "@/lib/context/language-context";
import { motion } from "framer-motion";
import { Grid3X3, ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";

// Local image map aligned with CategoryInfo defaults
const categoryImageMap: Record<string, string> = {
  gloves: "/glovecats/49K-C_A.webp",
  industrialSwabs: "/images/HLC_SWABS_main.jpg",
  respiratory: "/images/products/categories/respirator.jpeg",
  armProtection: "/images/products/categories/armppe.webp",
  hearing: "/images/products/categories/single use ear plugs.webp",
  footwear: "/images/products/categories/safetyboot.png",
  eyeFace: "/images/products/categories/metalfreeglasses.jpg",
  head: "/images/products/categories/Safety helmet suitable for low temperatures and splash protection.webp",
  clothing: "/images/products/categories/High-Vis, Jacket High-Vis.webp",
};

export const MainCategoriesRow = () => {
  const { t } = useLanguage();
  const scrollRef = React.useRef<HTMLDivElement | null>(null);
  const [canScrollLeft, setCanScrollLeft] = React.useState(false);
  const [canScrollRight, setCanScrollRight] = React.useState(false);

  const updateScrollButtons = React.useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 1);
  }, []);

  React.useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    updateScrollButtons();
    el.addEventListener("scroll", updateScrollButtons, { passive: true });
    window.addEventListener("resize", updateScrollButtons, { passive: true });
    return () => {
      el.removeEventListener("scroll", updateScrollButtons as any);
      window.removeEventListener("resize", updateScrollButtons as any);
    };
  }, [updateScrollButtons]);

  const getStep = (): number => {
    const el = scrollRef.current;
    if (!el) return 300;
    const inner = el.firstElementChild as HTMLElement | null;
    if (!inner) return 300;
    const firstItem = inner.querySelector(':scope > div') as HTMLElement | null;
    if (!firstItem) return 300;
    const gap = parseFloat(getComputedStyle(inner).columnGap || '0') || 0;
    return firstItem.offsetWidth + gap;
  };

  const scrollByAmount = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const step = getStep();
    const amount = step * (dir === "left" ? -1 : 1);
    el.scrollBy({ left: amount, behavior: "smooth" });
  };

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

        {/* Horizontal, scrollable row of categories with desktop arrows */}
        <div className="relative -mx-4 sm:mx-0">
          {/* Scroll container */}
          <div
            ref={scrollRef}
            className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700"
          >
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
            </div>
          </div>
          {/* Desktop arrows */}
          {canScrollLeft && (
            <button
              type="button"
              aria-label="Scroll left"
              onClick={() => scrollByAmount("left")}
              className="group hidden sm:block absolute -left-6 top-1/2 -translate-y-1/2 z-10 bg-white/90 dark:bg-black/70 backdrop-blur-sm shadow-lg rounded-full p-2 border-2 border-brand-primary/30 dark:border-brand-primary/40 hover:border-transparent hover:bg-gradient-to-br hover:from-[#F08515] hover:to-[#E67A2C] dark:hover:from-[#F08515] dark:hover:to-[#E67A2C] transition-all"
            >
              <ChevronLeft className="h-5 w-5 text-brand-primary group-hover:text-white" />
            </button>
          )}
          {canScrollRight && (
            <button
              type="button"
              aria-label="Scroll right"
              onClick={() => scrollByAmount("right")}
              className="group hidden sm:block absolute -right-6 top-1/2 -translate-y-1/2 z-10 bg-white/90 dark:bg-black/70 backdrop-blur-sm shadow-lg rounded-full p-2 border-2 border-brand-primary/30 dark:border-brand-primary/40 hover:border-transparent hover:bg-gradient-to-br hover:from-[#F08515] hover:to-[#E67A2C] dark:hover:from-[#F08515] dark:hover:to-[#E67A2C] transition-all"
            >
              <ChevronRight className="h-5 w-5 text-brand-primary group-hover:text-white" />
            </button>
          )}
        </div>
      </div>
    </section>
  );
};


