'use client';

import { motion } from 'framer-motion';
import { HelpCircle, ChevronDown, ArrowRight, Shield } from 'lucide-react';
import Link from 'next/link';
import * as React from 'react';
import { useLanguage } from "@/lib/context/language-context";

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

// Define the component props with the motion div capabilities
type MotionDivProps = React.ComponentProps<typeof motion.div> & {
  ref?: React.Ref<HTMLDivElement>;
};

export function ContactFaq() {
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);

  // Get FAQ questions from translations
  const faqs = [
    {
      question: t('contact.faq.questions.1.question'),
      answer: t('contact.faq.questions.1.answer'),
    },
    {
      question: t('contact.faq.questions.2.question'),
      answer: t('contact.faq.questions.2.answer'),
    },
    {
      question: t('contact.faq.questions.3.question'),
      answer: t('contact.faq.questions.3.answer'),
    },
    {
      question: t('contact.faq.questions.4.question'),
      answer: t('contact.faq.questions.4.answer'),
    },
  ];

  return (
    <section className="pt-8 pb-16 md:pt-12 md:pb-24 bg-[#F5EFE0]/80 dark:bg-transparent">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-8 text-center"
        >
          <div className="mb-4 inline-flex items-center rounded-full bg-brand-primary/10 px-3 py-1 text-sm border border-[#F28C38]/40 backdrop-blur-sm">
            <Shield className="mr-2 h-4 w-4 text-brand-primary" />
            <span className="text-brand-dark dark:text-white font-medium">
              {t('contact.faq.badge')}
            </span>
          </div>

          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-brand-dark dark:text-white">{t('contact.faq.title')}</h2>
          <p className="mt-4 text-lg text-brand-secondary dark:text-gray-300 max-w-2xl mx-auto">
            {t('contact.faq.description')}
          </p>
        </motion.div>

        <div className="mx-auto max-w-3xl">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  type: 'spring',
                  stiffness: 100,
                  damping: 15,
                  delay: index * 0.1,
                }}
              >
                <div
                  className={cn(
                    'overflow-hidden rounded-lg',
                    'bg-white dark:bg-black/50 shadow-sm',
                    'border border-brand-primary/10 dark:border-brand-primary/20',
                    'hover:border-brand-primary/30 transition-colors',
                    openIndex === index && 'border-brand-primary/40'
                  )}
                >
                  <button
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                    className="flex w-full items-center justify-between gap-4 p-4 text-left"
                  >
                    <span
                      className={cn(
                        'font-medium',
                        openIndex === index ? 'text-brand-primary' : 'text-brand-dark dark:text-white'
                      )}
                    >
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={cn(
                        'h-5 w-5 shrink-0 text-brand-primary transition-transform duration-200',
                        openIndex === index && 'rotate-180'
                      )}
                    />
                  </button>
                  <div
                    className={cn(
                      'grid transition-all duration-200 ease-in-out',
                      openIndex === index ? 'grid-rows-[1fr] pb-4' : 'grid-rows-[0fr]'
                    )}
                  >
                    <div className="overflow-hidden px-4">
                      <div className="text-brand-secondary dark:text-gray-300">
                        {faq.answer}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Support CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="mt-12 text-center"
          >
            <Button asChild variant="outline" className="group font-medium rounded-lg border-2 border-brand-primary/30 text-brand-primary hover:bg-brand-primary/5 dark:text-white dark:border-white/20 dark:hover:bg-white/5 transition-all duration-300">
              <Link
                href="#contact-form"
                className="flex items-center gap-2"
              >
                {t('contact.faq.cta')}
                <ArrowRight className="h-4 w-4 transition-all duration-300 group-hover:translate-x-1" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 