'use client';

import React from 'react';
import { useLanguage } from '@/lib/context/language-context';
import type { Language } from '@/lib/context/language-context';
import { motion } from 'framer-motion';

interface ProductDisclaimerContentProps {
  language: string;
}

export function ProductDisclaimerContent({ language }: ProductDisclaimerContentProps) {
  const { t } = useLanguage();

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  // Custom section component for consistent styling
  const Section = ({ title, content }: { title: string, content: string }) => (
    <motion.div 
      className="mb-8" 
      initial="hidden" 
      whileInView="visible" 
      viewport={{ once: true, margin: "-100px" }}
      variants={fadeIn}
    >
      <h3 className="text-xl font-bold mb-3 text-brand-dark dark:text-white border-l-4 border-brand-primary/70 pl-4 py-2 bg-brand-primary/5 rounded-r-md">{title}</h3>
      <p className="text-base leading-7 text-brand-secondary dark:text-gray-300 pl-1">{content}</p>
    </motion.div>
  );

  return (
    <section className="py-16 md:py-24 bg-[#F5EFE0]/80 dark:bg-transparent">
      <div className="container mx-auto px-4 md:px-6">
        <div 
          id="disclaimer-content" 
          className="max-w-4xl mx-auto backdrop-blur-sm dark:backdrop-blur-none"
          style={{ scrollMarginTop: "80px" }}
        >
          <motion.article 
            className="prose prose-lg max-w-none bg-[#F5EFE0]/50 dark:bg-transparent p-6 rounded-lg border border-brand-primary/10 dark:border-brand-primary/20 shadow-sm"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
            }}
          >
            <motion.h2 
              className="text-3xl font-bold mt-0 mb-6 text-brand-dark dark:text-white"
              variants={fadeIn}
            >
              {t('standards.productDisclaimer.sections.usage.title')}
            </motion.h2>
            
            <motion.p 
              className="my-4 text-lg leading-7 text-brand-secondary dark:text-gray-300"
              variants={fadeIn}
            >
              {t('standards.productDisclaimer.sections.usage.content')}
            </motion.p>
            
            <div className="mt-8 space-y-4">
              <Section 
                title={t('standards.productDisclaimer.sections.heatResistance.title')} 
                content={t('standards.productDisclaimer.sections.heatResistance.content')} 
              />
              
              <Section 
                title={t('standards.productDisclaimer.sections.cutResistance.title')} 
                content={t('standards.productDisclaimer.sections.cutResistance.content')} 
              />
              
              <Section 
                title={t('standards.productDisclaimer.sections.generalGuidelines.title')} 
                content={t('standards.productDisclaimer.sections.generalGuidelines.content')} 
              />
              
              <Section 
                title={t('standards.productDisclaimer.sections.limitations.title')} 
                content={t('standards.productDisclaimer.sections.limitations.content')} 
              />
              
              <Section 
                title={t('standards.productDisclaimer.sections.properSelection.title')} 
                content={t('standards.productDisclaimer.sections.properSelection.content')} 
              />
              
              <Section 
                title={t('standards.productDisclaimer.sections.modification.title')} 
                content={t('standards.productDisclaimer.sections.modification.content')} 
              />
              
              <motion.div 
                className="mt-12 p-6 bg-brand-primary/10 rounded-lg border border-brand-primary/20"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={{
                  hidden: { opacity: 0, scale: 0.95 },
                  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
                }}
              >
                <h3 className="text-xl font-bold mb-3 text-brand-dark dark:text-white">{t('standards.productDisclaimer.sections.legalNotice.title')}</h3>
                <p className="text-base leading-7 text-brand-secondary dark:text-gray-300">{t('standards.productDisclaimer.sections.legalNotice.content')}</p>
              </motion.div>
            </div>
          </motion.article>
        </div>
      </div>
    </section>
  );
} 