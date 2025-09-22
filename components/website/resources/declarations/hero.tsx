"use client";

import React from "react";
import { FileCheck, ChevronRight, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";
import { useLanguage } from '@/lib/context/language-context';

const SPRING_CONFIG = { stiffness: 100, damping: 30, mass: 1 };

interface DeclarationsHeroProps {
  language: string;
}

export function DeclarationsHero({ language }: DeclarationsHeroProps) {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden bg-[#F5EFE0]/80 dark:bg-transparent pt-24 pb-0 md:pt-28 md:pb-2">
      {/* Decorative Elements */}
      <div className="absolute -top-32 -right-32 h-[300px] w-[300px] md:h-[500px] md:w-[500px] rounded-full bg-brand-primary/5 blur-3xl dark:bg-brand-primary/10"></div>
      <div className="absolute -bottom-32 -left-32 h-[250px] w-[250px] md:h-[400px] md:w-[400px] rounded-full bg-brand-primary/10 blur-3xl dark:bg-brand-primary/5"></div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-primary/20 to-transparent"></div>

      <div className="container relative z-10 px-4 md:px-6">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={SPRING_CONFIG}
            className="mb-4 md:mb-6"
          >
            <div className="inline-flex items-center rounded-full border border-brand-primary px-3 py-1 md:px-4 md:py-1.5 text-xs md:text-sm backdrop-blur-sm">
              <FileCheck className="mr-1.5 h-3 w-3 md:h-4 md:w-4 text-brand-primary" />
              <span className="text-brand-dark dark:text-white font-medium">
                {t('declarations.hero.badge')}
              </span>
            </div>
          </motion.div>

          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...SPRING_CONFIG, delay: 0.1 }}
            className="relative mb-4 md:mb-6"
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-brand-dark dark:text-white font-heading">
              {t('declarations.hero.title')} <span className="text-brand-primary">{t('declarations.hero.titleAccent')}</span>
            </h1>
          </motion.div>

          {/* Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...SPRING_CONFIG, delay: 0.2 }}
            className="mb-6 md:mb-10 space-y-3 md:space-y-4"
          >
            <p className="max-w-3xl text-base md:text-lg text-brand-secondary dark:text-gray-300">
              {t('declarations.hero.description')}
            </p>
            <p className="max-w-3xl mx-auto text-center text-sm md:text-base text-brand-secondary dark:text-gray-300">
              {t('declarations.hero.contactLine.before')} {" "}
              <Link href="/contact" className="text-brand-primary underline underline-offset-2 hover:opacity-80">
                {t('declarations.hero.contactLine.linkText')}
              </Link>{" "}
              {t('declarations.hero.contactLine.after')}
            </p>
          </motion.div>

          {/* Stats removed as requested */}

          {/* Buttons removed per client feedback to keep hero minimal */}
        </div>
      </div>
    </section>
  );
} 