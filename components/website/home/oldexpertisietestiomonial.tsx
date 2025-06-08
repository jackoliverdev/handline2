"use client";

import React from "react";
import Image from "next/image";
import { useLanguage } from "@/lib/context/language-context";
import { motion } from "framer-motion";

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

export const OldExpertiseTestimonial = () => {
  const { t } = useLanguage();

  return (
    <motion.div 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
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
  );
}; 