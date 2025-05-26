"use client";

import React from "react";
import { Flame, Scissors, Settings } from "lucide-react";
import Image from "next/image";
import { useLanguage } from "@/lib/context/language-context";
import Link from "next/link";
import { motion } from "framer-motion";

const features = [
  {
    icon: <Flame className="h-8 w-8 text-white" />,
    key: "heatProtection",
    link: "/products?category=heat-resistant",
    gradient: "from-[#F28C38] to-[#E67A2C]"
  },
  {
    icon: <Scissors className="h-8 w-8 text-white" />,
    key: "cutResistance",
    link: "/products?category=cut-resistant",
    gradient: "from-[#F28C38] via-[#E67A2C] to-[#D96920]"
  },
  {
    icon: <Settings className="h-8 w-8 text-white" />,
    key: "customisation",
    link: "/about#customisation",
    gradient: "from-[#E67A2C] to-[#D96920]"
  }
];

// Animation variants
const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.3 + (i * 0.1),
      duration: 0.5,
      ease: "easeOut"
    }
  })
};

const quoteVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delay: 0.5,
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

export const ExpertiseSection = () => {
  const { t } = useLanguage();

  return (
    <motion.section 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={sectionVariants}
      className="pt-24 md:pt-8 pb-8 md:pb-10 -mt-32 sm:-mt-40 md:-mt-32 relative overflow-hidden bg-brand-light dark:bg-background border-brand-primary/10 dark:border-brand-primary/20" 
      style={{ zIndex: 1 }}
    >
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-brand-primary/5 dark:bg-brand-primary/10 rounded-bl-full"></div>
      <div className="absolute bottom-0 left-0 w-1/4 h-1/3 bg-brand-primary/5 dark:bg-brand-primary/10 rounded-tr-full"></div>
      
      <div className="container mx-auto px-4 sm:px-6 relative">
        <motion.div 
          variants={itemVariants}
          className="max-w-3xl mx-auto text-center mb-8"
        >
          <div className="space-y-3">
            <div className="inline-flex items-center justify-center">
              <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: "2.5rem" }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="h-1 w-10 bg-[#F28C38] rounded-full mr-3"
              ></motion.div>
              <h2 className="text-3xl md:text-4xl font-bold text-brand-dark dark:text-white font-heading">
                {t('expertise.title')}
              </h2>
              <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: "2.5rem" }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="h-1 w-10 bg-[#F28C38] rounded-full ml-3"
              ></motion.div>
            </div>
            <motion.p 
              variants={itemVariants}
              className="text-lg text-brand-secondary dark:text-gray-300 max-w-2xl mx-auto"
            >
              {t('expertise.description')}
            </motion.p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-16 relative" style={{ zIndex: 20 }}>
          {features.map((feature, index) => (
            <motion.div
              key={feature.key}
              custom={index}
              variants={cardVariants}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              style={{ zIndex: 30 }}
            >
              <Link
                href={feature.link}
                className="group/card block relative overflow-hidden rounded-2xl hover:cursor-pointer h-full"
              >
                <div className="relative bg-white dark:bg-black/50 border border-gray-100 dark:border-gray-700/50 p-6 h-full rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 backdrop-blur-sm group">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <motion.div 
                        initial={{ scale: 0.8, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 + (index * 0.1), duration: 0.4 }}
                        className={`p-3 rounded-lg bg-gradient-to-br ${feature.gradient}`}
                      >
                        {feature.icon}
                      </motion.div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl font-semibold text-[#F28C38] mb-2 group-hover:text-[#F28C38]/90 transition-colors duration-300">
                        {t(`expertise.features.${feature.key}.title`)}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-3 min-h-[60px]">
                        {t(`expertise.features.${feature.key}.description`)}
                      </p>
                      <div className="relative inline-flex items-center text-[#F28C38] text-sm font-medium">
                        <span className="relative">
                          {t(`expertise.features.${feature.key}.cta`)}
                          <span className="absolute left-0 -bottom-[2px] h-[1px] w-0 bg-[#F28C38] transition-all duration-300 ease-out group-hover/card:w-full"></span>
                        </span>
                        <motion.svg 
                          className="w-4 h-4 ml-1" 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          stroke="currentColor" 
                          strokeWidth="2" 
                          strokeLinecap="round" 
                          strokeLinejoin="round"
                          whileHover={{ x: 3, scale: 1.1 }}
                          transition={{ duration: 0.2 }}
                        >
                          <path d="M5 12h14M12 5l7 7-7 7"/>
                        </motion.svg>
                      </div>
                    </div>
                  </div>
                  
                  {/* Hover Effect Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/0 to-brand-primary/0 group-hover:from-brand-primary/5 group-hover:to-transparent transition-all duration-500 pointer-events-none rounded-2xl" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
        
        {/* Testimonial section with updated styling */}
        <motion.div 
          variants={quoteVariants}
          className="mt-12 md:mt-16 relative"
        >
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="absolute left-1/2 transform -translate-x-1/2 -translate-y-6 z-50"
          >
            <div className="h-12 w-12 p-0.5 rounded-full bg-gradient-to-br from-[#F28C38] to-[#E67A2C]">
              <div className="h-full w-full rounded-full overflow-hidden border-2 border-white/80 shadow-lg bg-white">
                <Image 
                  src="/avatars/FrancoCastronuovo.png" 
                  alt="Franco Castronuovo" 
                  width={96} 
                  height={96}
                  className="object-cover"
                />
              </div>
            </div>
          </motion.div>
          <div className="relative overflow-hidden rounded-2xl">
            <div className="relative bg-white dark:bg-black/50 border border-gray-100 dark:border-gray-700/50 p-4 sm:p-6 md:p-8 pt-10 sm:pt-12 rounded-2xl shadow-lg backdrop-blur-sm">
              <div className="flex flex-col items-center">
                <div className="flex items-start w-full max-w-[90%] sm:max-w-2xl md:max-w-4xl mx-auto">
                  <motion.span 
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 0.8, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.7, duration: 0.5 }}
                    className="text-3xl md:text-4xl text-[#F28C38] opacity-80 -ml-2 md:-ml-4"
                  >"</motion.span>
                  <motion.p 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                    className="text-sm sm:text-base text-gray-600 dark:text-gray-300 font-medium italic px-1 sm:px-2 text-center flex-1 leading-relaxed"
                  >
                    {t('expertise.quote.text')}
                  </motion.p>
                  <motion.span 
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 0.8, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.7, duration: 0.5 }}
                    className="text-3xl md:text-4xl text-[#F28C38] opacity-80 -mr-2 md:-mr-4"
                  >"</motion.span>
                </div>
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.9, duration: 0.5 }}
                  className="flex items-center mt-3 md:mt-4"
                >
                  <div className="h-px w-3 sm:w-4 md:w-5 bg-[#F28C38]/40 mr-2"></div>
                  <p className="text-xs sm:text-sm font-medium text-[#F28C38]">
                    {t('expertise.quote.author')}
                  </p>
                  <div className="h-px w-3 sm:w-4 md:w-5 bg-[#F28C38]/40 ml-2"></div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}; 