"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/lib/context/language-context";
import { Target, TrendingUp, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

export const EsgCertification = () => {
  const { t } = useLanguage();
  
  // Safely access certification points using individual translation keys with index
  const getCertificationPoint = (index: number) => {
    return t(`about.esg.certification.points.${index}`);
  };
  
  // Define number of points for certification section
  const pointIndices = [0, 1, 2]; // 3 points
  
  return (
    <section className="py-16 md:py-20 bg-green-100/90 dark:bg-green-900/30">
      <div className="container px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="mb-6 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-700">
              {t('about.esg.certification.badge')}
            </Badge>
          </motion.div>
          
          {/* Title */}
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-2xl md:text-3xl font-bold tracking-tight text-brand-dark dark:text-white mb-4"
          >
            {t('about.esg.certification.title')}
          </motion.h2>
          
          {/* Description */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base text-brand-secondary dark:text-gray-300 mb-8"
          >
            {t('about.esg.certification.description')}
          </motion.p>
          
          {/* Points */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
          >
            {pointIndices.map((index) => {
              const icons = [Target, TrendingUp, CheckCircle];
              const Icon = icons[index] || CheckCircle;
              
              return (
                <div key={index} className="flex flex-col items-center text-center space-y-3">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <Icon className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <p className="text-sm text-brand-secondary dark:text-gray-300">
                    {getCertificationPoint(index)}
                  </p>
                </div>
              );
            })}
          </motion.div>
          
          {/* Closing statement */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-sm italic text-brand-secondary dark:text-gray-400"
          >
            {t('about.esg.certification.closing')}
          </motion.p>
        </div>
      </div>
    </section>
  );
}; 