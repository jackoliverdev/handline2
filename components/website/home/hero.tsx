"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Award, ArrowRight, ChevronRight, Shield, Clock, Factory, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { GlovesModel } from "./3d-model";
import { useLanguage } from "@/lib/context/language-context";

const SPRING_CONFIG = { stiffness: 100, damping: 30, mass: 1 };

export const Hero = () => {
  const { t } = useLanguage();

  return (
    <div className="relative mb-6 sm:mb-16 md:mb-32 bg-[#F5EFE0] dark:bg-background">
      {/* Background section with slanted edge */}
      <section 
        className="relative pt-28 md:pt-32 pb-0 md:pb-16 bg-[#F5EFE0] dark:bg-background [clip-path:polygon(0_0,100%_0,100%_82%,0_72%)] md:[clip-path:polygon(0_0,100%_0,100%_95%,0_82%)]"
        style={{ zIndex: 1 }}
      >
        {/* Background Image */}
        <div className="absolute inset-0 w-full h-full" style={{ zIndex: -1 }}>
          <Image 
            src="/heroimg.png" 
            alt="Construction worker background"
            fill
            className="object-cover object-center"
            style={{ objectPosition: '50% 25%' }}
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
                  <div className="inline-flex items-center rounded-full bg-white/80 dark:bg-black/60 px-3 py-1 text-xs sm:text-sm border border-[#F28C38] backdrop-blur-sm cursor-pointer">
                    <Award className="mr-1.5 h-3 w-3 sm:mr-2 sm:h-4 sm:w-4 text-[#F28C38]" />
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
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight font-heading">
                  <span className="text-white drop-shadow-md block">{t('hero.mainTitle.handline')}</span>
                  <span className="text-white drop-shadow-md">{t('hero.mainTitle.weSpeak')} </span>
                  <span className="text-[#F28C38] drop-shadow-md">{t('hero.mainTitle.safety')}</span>
                </h1>
              </motion.div>
              
              {/* Description */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...SPRING_CONFIG, delay: 0.2 }}
              >
                <p className="max-w-2xl text-base md:text-lg text-white/90 drop-shadow-sm">
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
                  href="/products#product-categories"
                  className="group flex items-center justify-center gap-1.5 sm:gap-2 px-4 sm:px-5 py-2.5 sm:py-3 bg-[#F28C38] text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:bg-[#F28C38]/90 w-full sm:w-auto text-sm md:text-base h-10 md:h-auto"
                >
                  <Shield className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span>{t('hero.exploreProducts')}</span>
                  <ChevronRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
                {/* Get in Touch Button */}
                <Link 
                  href="/contact" 
                  className="group flex items-center justify-center gap-1.5 sm:gap-2 px-4 sm:px-5 py-2.5 sm:py-3 border-2 border-white text-white hover:bg-white hover:text-[#F28C38] transition-all duration-300 rounded-lg font-medium w-full sm:w-auto text-sm md:text-base h-10 md:h-auto"
                >
                  <Mail className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span>{t('hero.getInTouch')}</span>
                  <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 transition-all duration-300 group-hover:translate-x-1" />
                </Link>
              </motion.div>
            </div>
            
            {/* Placeholder for gloves */}
            <div className="relative w-full h-[300px] sm:h-[350px] md:h-[400px]"></div>
          </div>
        </div>
      </section>
      
      {/* 3D Gloves Model - positioned outside the clipped section */}
      <div 
        className="absolute left-1/2 -translate-x-1/2 top-[58%] md:translate-x-0 md:left-auto md:right-[15%] lg:right-[18%] md:top-[15%]"
        style={{ 
          zIndex: 2,
          pointerEvents: 'auto'
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ ...SPRING_CONFIG, delay: 0.4 }}
          className="w-[370px] h-[390px] sm:w-[420px] sm:h-[450px] md:w-[550px] md:h-[550px] lg:w-[600px] lg:h-[600px]"
        >
          <GlovesModel />
        </motion.div>
      </div>
    </div>
  );
}; 