"use client";

import React from "react";
import { Leaf, Mail, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/context/language-context";
import Image from "next/image";

const SPRING_CONFIG = { stiffness: 100, damping: 30, mass: 1 };

export const EsgHero = () => {
  const { t } = useLanguage();

  return (
    <div className="relative bg-green-100/90 dark:bg-green-900/30">
      {/* Background section with slanted edge */}
      <section 
        className="relative pt-8 pb-20 md:pt-32 md:pb-16 [clip-path:polygon(0_0,100%_0,100%_95%,0_85%)] md:[clip-path:polygon(0_0,100%_0,100%_100%,0_88%)]"
        style={{ zIndex: 1 }}
      >
        {/* Background Image - placeholder for future nature/forest image */}
        <div className="absolute inset-0 w-full h-full" style={{ zIndex: -1 }}>
          <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-green-600"></div>
          <div className="absolute inset-0 bg-black/20"></div>
        </div>
        
        {/* Decorative Circles */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-16 right-12 w-40 h-40 border border-white rounded-full"></div>
          <div className="absolute bottom-24 left-16 w-28 h-28 border border-white rounded-full"></div>
          <div className="absolute top-1/3 right-1/4 w-36 h-36 border border-white rounded-full"></div>
          <div className="absolute bottom-1/3 left-1/3 w-20 h-20 border border-white rounded-full"></div>
        </div>
        
        <div className="container mx-auto px-6 relative">
          <div className="flex flex-col items-start gap-6">
            {/* Text Content - Full Width */}
            <div className="flex flex-col space-y-3 mb-2 sm:mb-0 w-full max-w-5xl">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={SPRING_CONFIG}
              >
                <Link href="/about/esg" className="inline-block hover:scale-105 transition-transform duration-300">
                  <div className="inline-flex items-center rounded-full bg-white/80 dark:bg-black/60 px-3 py-1 text-xs sm:text-sm border border-green-400 backdrop-blur-sm cursor-pointer hover:shadow-lg transition-all duration-300">
                    <Leaf className="mr-1.5 h-3 w-3 sm:mr-2 sm:h-4 sm:w-4 text-green-600" />
                    <span className="text-green-700 dark:text-green-300 font-medium font-heading">
                      {t('about.esg.hero.badge')}
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
                  <span className="text-white drop-shadow-md">{t('about.esg.hero.title')} </span>
                  <br />
                  <span className="text-green-200 drop-shadow-md">{t('about.esg.hero.titleAccent')}</span>
                </h1>
              </motion.div>
              
              {/* Description */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...SPRING_CONFIG, delay: 0.2 }}
              >
                <p className="text-base md:text-lg text-white/90 drop-shadow-sm max-w-4xl">
                  {t('about.esg.hero.description')}
                </p>
              </motion.div>
              
              {/* Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...SPRING_CONFIG, delay: 0.3 }}
                className="flex flex-col space-y-3 sm:flex-row sm:space-x-6 sm:space-y-0 pt-1 w-full"
              >
                {/* Contact Button */}
                <Link 
                  href="/contact"
                  className="group flex items-center justify-center gap-1.5 sm:gap-2 px-4 sm:px-5 py-2.5 sm:py-3 bg-green-600 text-white font-medium rounded-lg shadow-md hover:shadow-xl transition-all duration-300 hover:bg-green-700 hover:scale-105 transform w-full sm:w-auto text-sm md:text-base h-10 md:h-auto"
                >
                  <Mail className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span>{t('about.esg.cta.buttons.contact')}</span>
                  <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
                {/* Learn More Button */}
                <Link 
                  href="/about" 
                  className="group flex items-center justify-center gap-1.5 sm:gap-2 px-4 sm:px-5 py-2.5 sm:py-3 border-2 border-white text-white hover:bg-white hover:text-green-600 hover:shadow-lg hover:scale-105 transition-all duration-300 rounded-lg font-medium w-full sm:w-auto text-sm md:text-base h-10 md:h-auto transform"
                >
                  <Leaf className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span>{t('about.esg.cta.buttons.learnMore')}</span>
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