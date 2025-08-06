"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Award, ArrowRight, ChevronRight, Shield, Clock, Factory, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/lib/context/language-context";

const SPRING_CONFIG = { stiffness: 100, damping: 30, mass: 1 };

export const Hero = () => {
  const { t } = useLanguage();

  return (
    <div className="relative mb-6 sm:mb-16 md:mb-32 pb-8 sm:pb-6 md:pb-4 lg:pb-2 xl:pb-0 bg-[#F5EFE0] dark:bg-background">
      {/* Background section with slanted edge */}
      <section 
        className="relative pt-28 md:pt-32 pb-16 md:pb-32 bg-[#F5EFE0] dark:bg-background [clip-path:polygon(0_0,100%_0,100%_82%,0_72%)] md:[clip-path:polygon(0_0,100%_0,100%_95%,0_82%)]"
        style={{ zIndex: 1 }}
      >
        {/* Background Image */}
        <div className="absolute inset-0 w-full h-full" style={{ zIndex: -1 }}>
          <Image 
            src="/herotry4.png" 
            alt="Construction worker background"
            fill
            className="object-cover object-center"
            style={{ objectPosition: '20% 50%' }}
            priority
          />
          <div className="absolute inset-0 bg-black/30"></div>
        </div>
        
        <div className="container mx-auto px-6 relative max-w-7xl">
          <div className="flex flex-col xl:grid xl:grid-cols-2 items-center gap-6 xl:gap-16">
            {/* Text Content */}
            <div className="flex flex-col space-y-3 md:space-y-4 mb-2 sm:mb-0 w-full xl:pr-12">
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
                      {t('hero.expertise')}
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
                <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight font-heading">
                  <span className="text-white drop-shadow-md block">{t('hero.mainTitle.handline')}</span>
                  <span className="text-white drop-shadow-md">{t('hero.mainTitle.weSpeak')} </span>
                  <span className="text-brand-primary drop-shadow-md">{t('hero.mainTitle.safety')}</span>
                </h1>
              </motion.div>
              
              {/* Description */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...SPRING_CONFIG, delay: 0.2 }}
              >
                <p className="max-w-2xl xl:max-w-none text-base md:text-lg xl:text-xl text-white/90 drop-shadow-sm">
                  {t('hero.description')}
                </p>
              </motion.div>
              
              {/* Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...SPRING_CONFIG, delay: 0.3 }}
                className="flex flex-col space-y-3 sm:flex-row sm:space-x-6 sm:space-y-0 pt-1 w-full"
              >
                {/* Products Button */}
                <a 
                  href="/products#product-grid"
                  className="group flex items-center justify-center gap-1.5 sm:gap-2 px-4 sm:px-5 py-2.5 sm:py-3 bg-brand-primary text-white font-medium rounded-lg shadow-md hover:shadow-xl transition-all duration-300 hover:bg-brand-primary/90 hover:scale-105 transform w-full sm:w-auto text-sm md:text-base h-10 md:h-auto"
                >
                  <Shield className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span>{t('hero.exploreProducts')}</span>
                  <ChevronRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
                {/* Get in Touch Button */}
                <Link 
                  href="/contact" 
                  className="group flex items-center justify-center gap-1.5 sm:gap-2 px-4 sm:px-5 py-2.5 sm:py-3 border-2 border-white text-white hover:bg-white hover:text-brand-primary hover:shadow-lg hover:scale-105 transition-all duration-300 rounded-lg font-medium w-full sm:w-auto text-sm md:text-base h-10 md:h-auto transform"
                >
                  <Mail className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span>{t('hero.getInTouch')}</span>
                  <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 transition-all duration-300 group-hover:translate-x-1" />
                </Link>
              </motion.div>
            </div>
            
            {/* Placeholder for gloves */}
            <div className="relative w-full h-[300px] sm:h-[350px] md:h-[450px] lg:h-[500px] xl:h-[550px]"></div>
          </div>
        </div>
      </section>
      
      {/* Static Gloves Image - positioned outside the clipped section */}
      <div 
        className="absolute left-1/2 -translate-x-1/2 top-[48%] xl:translate-x-0 xl:left-auto xl:right-[8%] 2xl:right-[12%] xl:top-24"
        style={{ 
          zIndex: 2,
          pointerEvents: 'auto'
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ ...SPRING_CONFIG, delay: 0.4 }}
          className="w-[520px] h-[540px] sm:w-[600px] sm:h-[630px] md:w-[820px] md:h-[680px] lg:w-[900px] lg:h-[740px] xl:w-[950px] xl:h-[780px] 2xl:w-[1000px] 2xl:h-[820px] relative"
        >
          <Image
            src="/glovecats/49K-C_A.webp"
            alt="Professional Safety Gloves"
            fill
            className="object-contain drop-shadow-2xl"
            priority
          />
          {/* Subtle glow effect */}
          <div className="absolute inset-0 bg-brand-primary/5 rounded-full blur-3xl scale-75 -z-10"></div>
        </motion.div>
      </div>
    </div>
  );
}; 