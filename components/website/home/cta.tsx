"use client";

import React from "react";
import Link from "next/link";
import { Shield, Package, Mail } from "lucide-react";
import { useLanguage } from "@/lib/context/language-context";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

// Animation variants
const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1
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

const badgeVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut"
    }
  }
};

const buttonVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.2 + (i * 0.1),
      duration: 0.4,
      ease: "easeOut"
    }
  })
};

export function CTA() {
  const { t } = useLanguage();

  return (
    <motion.section 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={sectionVariants}
      className="w-full pt-8 pb-12 md:pt-12 md:pb-20 lg:pt-16 lg:pb-24"
    >
      <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          variants={itemVariants}
          className="relative overflow-hidden bg-gradient-to-br from-white via-gray-50/50 to-white dark:from-black/50 dark:via-gray-900/50 dark:to-black/50 border border-gray-100 dark:border-gray-700/50 rounded-xl md:rounded-2xl p-4 sm:p-6 md:p-8 backdrop-blur-sm shadow-xl"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-grid-primary/[0.02] [mask-image:radial-gradient(white,transparent_70%)]" />
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="absolute top-0 right-0 w-20 h-20 md:w-32 md:h-32 bg-gradient-to-br from-brand-primary/10 to-orange-500/10 rounded-full blur-2xl" 
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="absolute bottom-0 left-0 w-16 h-16 md:w-24 md:h-24 bg-gradient-to-tr from-orange-500/10 to-brand-primary/10 rounded-full blur-2xl" 
          />
          
          {/* Content */}
          <div className="relative text-center max-w-3xl mx-auto">
            {/* Badge */}
            <motion.div 
              variants={badgeVariants}
              className="inline-flex items-center mb-3 md:mb-4 rounded-full bg-gradient-to-r from-brand-primary/10 to-orange-500/10 px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-sm border border-brand-primary/20 backdrop-blur-sm"
            >
              <Shield className="mr-1.5 md:mr-2 h-3 w-3 md:h-4 md:w-4 text-brand-primary" />
              <span className="text-brand-dark dark:text-white font-medium">
                {t('cta.badge')}
              </span>
            </motion.div>

            {/* Title */}
            <motion.h2 
              variants={itemVariants}
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-brand-dark dark:text-white mb-3 md:mb-4 leading-tight md:leading-relaxed px-2"
            >
              {t('cta.title')}{' '}
              <span className="text-orange-500">
                {t('cta.titleAccent')}
              </span>
              {' '}?
            </motion.h2>

            {/* Description */}
            <motion.p 
              variants={itemVariants}
              className="text-sm sm:text-base text-brand-secondary dark:text-gray-300 max-w-2xl mx-auto mb-6 md:mb-8 px-2"
            >
              {t('cta.description')}
            </motion.p>

            {/* Action Buttons */}
            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center mb-4 md:mb-6 px-2"
            >
              <motion.div
                custom={0}
                variants={buttonVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto"
              >
                <Button 
                  variant="default" 
                  size="lg" 
                  className="w-full sm:w-auto bg-brand-primary hover:bg-brand-primary/90 text-white font-medium transition-all duration-300 hover:shadow-xl transform text-sm md:text-base h-11 md:h-12"
                  asChild
                >
                  <Link href="/products" className="flex items-center justify-center gap-2">
                    <Package className="h-4 w-4 md:h-5 md:w-5" />
                    {t('cta.buttons.browseProducts')}
                  </Link>
                </Button>
              </motion.div>
              
              <motion.div
                custom={1}
                variants={buttonVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto"
              >
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="w-full sm:w-auto border-brand-primary text-brand-primary hover:bg-white hover:text-brand-primary hover:border-brand-primary hover:shadow-lg transition-all duration-300 text-sm md:text-base h-11 md:h-12"
                  asChild
                >
                  <Link href="/contact" className="flex items-center justify-center gap-2">
                    <Mail className="h-4 w-4 md:h-5 md:w-5" />
                    {t('cta.buttons.contactUs')}
                  </Link>
                </Button>
              </motion.div>
            </motion.div>

            {/* Trust Indicator */}
            <motion.div 
              variants={itemVariants}
              className="pt-3 md:pt-4 border-t border-gray-200 dark:border-gray-700"
            >
              <p className="text-xs md:text-sm text-brand-secondary dark:text-gray-400 px-2">
                {t('cta.trustIndicator')}
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
} 