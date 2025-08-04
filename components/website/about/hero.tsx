"use client";

import React from "react";
import { Building, ArrowRight, ChevronRight, Mail, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/context/language-context";
import Image from "next/image";

const SPRING_CONFIG = { stiffness: 100, damping: 30, mass: 1 };

export const AboutHero = () => {
  const { t } = useLanguage();

  return (
    <div className="relative mb-6 sm:mb-16 md:mb-32 bg-[#F5EFE0] dark:bg-background">
      {/* Background section with slanted edge */}
      <section 
        className="relative pt-28 md:pt-32 pb-48 md:pb-32 bg-[#F5EFE0] dark:bg-background [clip-path:polygon(0_0,100%_0,100%_82%,0_72%)] md:[clip-path:polygon(0_0,100%_0,100%_95%,0_82%)]"
        style={{ zIndex: 1 }}
      >
        {/* Background Image */}
        <div className="absolute inset-0 w-full h-full" style={{ zIndex: -1 }}>
          <Image 
            src="/aboutheronew.png" 
            alt="Worker with child - Hand Line about us"
            fill
            className="object-cover object-center"
            style={{ objectPosition: '50% 40%' }}
            priority
          />
          <div className="absolute inset-0 bg-black/30"></div>
        </div>
        
        <div className="container mx-auto px-6 relative">
          <div className="flex flex-col lg:grid lg:grid-cols-2 items-center gap-6">
            {/* Text Content */}
            <div className="flex flex-col space-y-3 mb-2 sm:mb-0 w-full">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={SPRING_CONFIG}
              >
                <Link href="/about" className="inline-block hover:scale-105 transition-transform duration-300">
                  <div className="inline-flex items-center rounded-full bg-white/80 dark:bg-black/60 px-3 py-1 text-xs sm:text-sm border border-brand-primary backdrop-blur-sm cursor-pointer hover:shadow-lg transition-all duration-300">
                    <Award className="mr-1.5 h-3 w-3 sm:mr-2 sm:h-4 sm:w-4 text-brand-primary" />
                    <span className="text-brand-dark dark:text-white font-medium font-heading">
                      {t('about.hero.badge')}
                    </span>
                  </div>
                </Link>
              </motion.div>
              
              {/* Heading */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...SPRING_CONFIG, delay: 0.1 }}
              >
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight font-heading">
                  <span className="text-white drop-shadow-md">{t('about.hero.title')} </span>
                  <span className="text-brand-primary drop-shadow-md">{t('about.hero.titleHighlight1')}</span>
                  <br />
                  <span className="text-white drop-shadow-md">{t('about.hero.titleMiddle')} </span>
                  <span className="text-brand-primary drop-shadow-md">{t('about.hero.titleHighlight2')}</span>
                </h1>
              </motion.div>
              
              {/* Subtitle */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...SPRING_CONFIG, delay: 0.2 }}
              >
                <h2 className="text-base md:text-lg text-white/90 drop-shadow-sm font-medium">
                  {t('about.hero.subtitle')}
                </h2>
              </motion.div>
              
              {/* Description */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...SPRING_CONFIG, delay: 0.3 }}
              >
                <p className="text-base md:text-lg text-white/90 drop-shadow-sm">
                  <span className="block sm:inline">{t('about.hero.descriptionMobile')}</span>
                  <span className="hidden sm:inline">{t('about.hero.descriptionDesktop')}</span>
                </p>
              </motion.div>
              
              {/* Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...SPRING_CONFIG, delay: 0.4 }}
                className="flex flex-col space-y-3 sm:flex-row sm:space-x-6 sm:space-y-0 pt-1 w-full"
              >
                {/* Our Story Button */}
                <Link 
                  href="#our-story"
                  className="group flex items-center justify-center gap-1.5 sm:gap-2 px-4 sm:px-5 py-2.5 sm:py-3 bg-brand-primary text-white font-medium rounded-lg shadow-md hover:shadow-xl transition-all duration-300 hover:bg-brand-primary/90 hover:scale-105 transform w-full sm:w-auto text-sm md:text-base h-10 md:h-auto"
                >
                  <Building className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span>{t('about.hero.buttons.ourStory')}</span>
                  <ChevronRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
                {/* Get in Touch Button */}
                <Link 
                  href="/contact" 
                  className="group flex items-center justify-center gap-1.5 sm:gap-2 px-4 sm:px-5 py-2.5 sm:py-3 border-2 border-white text-white hover:bg-white hover:text-brand-primary hover:shadow-lg hover:scale-105 transition-all duration-300 rounded-lg font-medium w-full sm:w-auto text-sm md:text-base h-10 md:h-auto transform"
                >
                  <Mail className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span>{t('about.hero.buttons.getInTouch')}</span>
                  <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 transition-all duration-300 group-hover:translate-x-1" />
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}; 