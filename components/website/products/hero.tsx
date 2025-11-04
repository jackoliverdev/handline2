"use client";

import React from "react";
import { ShoppingBag, Shield, Filter, ChevronRight, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/context/language-context";

const SPRING_CONFIG = { stiffness: 100, damping: 30, mass: 1 };

type ProductsHeroProps = {
  showDescription?: boolean;
};

export const ProductsHero = ({ showDescription = true }: ProductsHeroProps) => {
  const { t, language } = useLanguage() as any;

  return (
    <section className="relative overflow-hidden bg-brand-light dark:bg-background pt-16 pb-2 md:pt-32 md:pb-4">
      {/* Decorative Elements */}
      <div className="absolute -top-32 -right-32 h-[300px] w-[300px] md:h-[500px] md:w-[500px] rounded-full bg-brand-primary/5 blur-3xl dark:bg-brand-primary/10"></div>
      <div className="absolute -bottom-32 -left-32 h-[250px] w-[250px] md:h-[400px] md:w-[400px] rounded-full bg-brand-primary/10 blur-3xl dark:bg-brand-primary/5"></div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-primary/20 to-transparent"></div>

      <div className="container relative z-10 px-4 md:px-6">
        <div className="flex flex-col items-center text-center max-w-5xl mx-auto">
          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...SPRING_CONFIG, delay: 0.1 }}
            className="relative mb-2 md:mb-3"
          >
            <h1 className={`text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-brand-dark dark:text-white font-heading whitespace-normal ${language === 'en' ? 'md:whitespace-nowrap' : 'md:whitespace-normal'}`}>
              {t("productsHero.heading.line1Start")} <span className="text-brand-primary">{t("productsHero.heading.line1Highlight")}</span> {t("productsHero.heading.line1End")} {t("productsHero.heading.line2")}
            </h1>
          </motion.div>

          {/* Description */}
          {showDescription && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...SPRING_CONFIG, delay: 0.2 }}
              className="mb-6 md:mb-8"
            >
              <p className="max-w-8xl text-base md:text-lg text-brand-secondary dark:text-gray-300 mb-4 md:mb-6">
                {t("productsHero.description")}
              </p>
              <p className="max-w-8xl text-base md:text-lg text-brand-secondary dark:text-gray-300">
                {t("productsHero.secondDescription")}
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}; 