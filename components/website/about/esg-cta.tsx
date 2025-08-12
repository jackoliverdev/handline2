"use client";

import React from "react";
import Link from "next/link";
import { Shield, Mail, Leaf, ArrowRight } from "lucide-react";
import { useLanguage } from "@/lib/context/language-context";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

export const EsgCta = () => {
  const { t } = useLanguage();

  return (
    <section className="py-16 md:py-20 bg-gradient-to-br from-green-600 to-green-800 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 border border-white rounded-full"></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 border border-white rounded-full"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 border border-white rounded-full"></div>
      </div>
      
      <div className="container px-4 md:px-6 relative">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="mb-6 bg-white/20 text-white border-white/30 backdrop-blur-sm">
              <Leaf className="mr-2 h-4 w-4" />
              {t('about.esg.cta.badge')}
            </Badge>
          </motion.div>
          
          {/* Title */}
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 tracking-tight"
          >
            {t('about.esg.cta.title')}{' '}
            <span className="text-green-200">{t('about.esg.cta.titleAccent')}</span>
          </motion.h2>
          
          {/* Description */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base md:text-lg text-white/90 mb-8 max-w-3xl mx-auto"
          >
            {t('about.esg.cta.description')}
          </motion.p>
          
          {/* Action Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto"
            >
              <Link 
                href="/contact"
                className="group flex items-center justify-center gap-1.5 sm:gap-2 px-4 sm:px-5 py-2.5 sm:py-3 bg-green-600 text-white font-medium rounded-lg shadow-md hover:shadow-xl transition-all duration-300 hover:bg-green-700 hover:scale-105 transform w-full sm:w-auto text-sm md:text-base h-10 md:h-auto"
              >
                <Mail className="h-4 w-4 sm:h-5 sm:w-5" />
                <span>{t('about.esg.cta.buttons.contact')}</span>
                <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto"
            >
              <Link 
                href="/products#product-grid"
                className="group flex items-center justify-center gap-1.5 sm:gap-2 px-4 sm:px-5 py-2.5 sm:py-3 border-2 border-white text-white hover:bg-white hover:text-green-700 hover:shadow-lg hover:scale-105 transition-all duration-300 rounded-lg font-medium w-full sm:w-auto text-sm md:text-base h-10 md:h-auto transform"
              >
                <Shield className="h-4 w-4 sm:h-5 sm:w-5" />
                <span>{t('about.esg.cta.buttons.learnMore')}</span>
                <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}; 