"use client";

import React from "react";
import { Building, Briefcase, Users, Globe, Shield, ChevronRight, ArrowRight, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/context/language-context";

const SPRING_CONFIG = { stiffness: 100, damping: 30, mass: 1 };

interface CareersHeroProps {
  language: string;
}

export function CareersHero({ language }: CareersHeroProps) {
  const { t } = useLanguage();
  
  const stats = [
    { value: '150+', label: t('careers.hero.stats.employees') },
    { value: '40+', label: t('careers.hero.stats.years') },
    { value: '25+', label: t('careers.hero.stats.years') }
  ];

  return (
    <section className="relative overflow-hidden bg-[#F5EFE0]/80 dark:bg-transparent pt-28 pb-6 md:pt-32 md:pb-16">
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
              <Users className="mr-1.5 h-3 w-3 md:h-4 md:w-4 text-brand-primary" />
              <span className="text-brand-dark dark:text-white font-medium">
                {t('careers.hero.badge')}
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
              {t('careers.hero.title')}
            </h1>
          </motion.div>

          {/* Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...SPRING_CONFIG, delay: 0.2 }}
            className="mb-6 md:mb-10"
          >
            <p className="max-w-2xl text-base md:text-lg text-brand-secondary dark:text-gray-300">
              {t('careers.hero.description')}
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...SPRING_CONFIG, delay: 0.3 }}
            className="mx-auto mb-6 md:mb-10 grid max-w-xl grid-cols-3 gap-4 md:gap-6"
          >
            {stats.map((stat, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="text-2xl md:text-3xl font-bold text-brand-primary font-heading">{stat.value}</div>
                <div className="mt-0.5 md:mt-1 text-xs md:text-sm text-brand-secondary dark:text-gray-400">{stat.label}</div>
              </div>
            ))}
          </motion.div>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...SPRING_CONFIG, delay: 0.4 }}
            className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3 md:gap-4 w-full"
          >
            <Button 
              size="default" 
              className="group font-medium bg-brand-primary hover:bg-brand-primary/90 w-full sm:w-auto text-sm md:text-base h-10 md:h-11"
              asChild
            >
              <Link href="/about" className="flex items-center justify-center gap-1.5 md:gap-2">
                <Briefcase className="h-4 w-4 md:h-5 md:w-5" />
                <span>{t('careers.hero.aboutCompany')}</span>
                <ArrowRight className="h-3.5 w-3.5 md:h-4 md:w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button 
              size="default" 
              variant="outline" 
              className="group font-medium border-brand-primary text-brand-primary hover:text-brand-primary hover:bg-white/80 dark:text-white dark:border-white dark:hover:bg-white/10 w-full sm:w-auto text-sm md:text-base h-10 md:h-11"
              asChild
            >
              <Link href="/contact" className="flex items-center justify-center gap-1.5 md:gap-2">
                <Shield className="h-4 w-4 md:h-5 md:w-5" />
                <span>{t('careers.hero.contactUs')}</span>
                <ChevronRight className="h-3.5 w-3.5 md:h-4 md:w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 