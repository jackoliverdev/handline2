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
      <h3 className="text-xl font-bold mb-3 text-brand-dark dark:text-white border-l-4 border-brand-primary pl-4 py-2 bg-brand-primary/10 dark:bg-brand-primary/5 rounded-r-md font-heading">{title}</h3>
      <p className="text-base leading-7 text-brand-secondary dark:text-gray-300 pl-1">{content}</p>
    </motion.div>
  );

  return (
    <section className="pt-4 pb-10 md:pt-6 md:pb-14 bg-brand-light dark:bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div 
          id="disclaimer-content" 
          className="max-w-4xl mx-auto backdrop-blur-sm dark:backdrop-blur-none"
          style={{ scrollMarginTop: "80px" }}
        >
          <motion.article 
            className="prose prose-lg max-w-none bg-white dark:bg-black/50 p-6 rounded-lg border border-brand-primary/20 dark:border-brand-primary/30 shadow-sm backdrop-blur-sm"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
            }}
          >
            {/* Make PPE Selection a section like the others for consistent styling */}
            <Section 
              title={t('standards.productDisclaimer.sections.usage.title')} 
              content={t('standards.productDisclaimer.sections.usage.content')} 
            />
            
            <div className="mt-6 space-y-4">
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
            </div>
          </motion.article>
        </div>
      </div>
    </section>
  );
} 