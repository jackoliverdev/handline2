'use client';

import { useLanguage } from '@/lib/context/language-context';
import { motion } from "framer-motion";
import { Package } from "lucide-react";
// Removed Link; the badge should not be clickable

export function ProductsPageTitle() {
  const { t } = useLanguage();

  return (
    <div className="text-center mb-12">
      <div className="flex flex-col items-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="inline-flex items-center rounded-full bg-white/80 dark:bg-black/60 px-3 py-1 text-xs sm:text-sm border border-brand-primary backdrop-blur-sm mb-4"
        >
          <Package className="mr-1.5 h-3 w-3 sm:mr-2 sm:h-4 sm:w-4 text-brand-primary" />
          <span className="text-brand-dark dark:text-white font-medium font-heading">
            {t('products.badge')}
          </span>
        </motion.div>
        <div className="inline-flex items-center justify-center mb-4">
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: "2.5rem" }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="h-1 w-10 bg-brand-primary rounded-full mr-3"
          ></motion.div>
          <h2 className="text-3xl md:text-4xl font-bold text-brand-dark dark:text-white font-heading">
            {t('products.mainPageTitle')}
          </h2>
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: "2.5rem" }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="h-1 w-10 bg-brand-primary rounded-full ml-3"
          ></motion.div>
        </div>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-lg text-brand-secondary dark:text-gray-300 max-w-2xl mx-auto"
        >
          {t('products.mainPageDescription')}
        </motion.p>
      </div>
    </div>
  );
} 