'use client';

import { motion } from 'framer-motion';
import * as React from 'react';
import { useLanguage } from "@/lib/context/language-context";
import { MessageCircle } from 'lucide-react';

import { ContactForm } from './contact-form';
import { ContactInfo } from './contact-info';

export function ContactSection() {
  const { t } = useLanguage();

  return (
    <section className="py-16 md:py-24 bg-[#F5EFE0]/80 dark:bg-transparent">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-8 text-center"
        >
          <div className="mb-4 inline-flex items-center rounded-full bg-brand-primary/10 px-3 py-1 text-sm border border-brand-primary/40 backdrop-blur-sm">
            <MessageCircle className="h-4 w-4 mr-2 text-brand-primary" aria-hidden="true" />
            <span className="text-brand-dark dark:text-white font-medium">
              {t('contact.section.badge')}
            </span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-brand-dark dark:text-white">{t('contact.section.title')}</h2>
          <p className="mt-4 text-lg text-brand-secondary dark:text-gray-300 max-w-2xl mx-auto">
            {t('contact.section.description')}
          </p>
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-2">
          <ContactForm />
          <ContactInfo />
        </div>
      </div>
    </section>
  );
} 