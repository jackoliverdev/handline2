'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/context/language-context';
import { Button } from '@/components/ui/button';
import { BookOpen, Mail } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export function ENResourceFooterCTA() {
  const { t } = useLanguage();
  return (
    <section className="relative py-12 md:py-16">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-100px' }}
        className="container"
      >
        <div className="relative overflow-hidden bg-gradient-to-br from-white via-gray-50/50 to-white dark:from-black/50 dark:via-gray-900/50 dark:to-black/50 border border-gray-100 dark:border-gray-700/50 rounded-xl md:rounded-2xl p-4 sm:p-6 md:p-8 backdrop-blur-sm shadow-xl">
          <div className="pointer-events-none absolute inset-0 bg-grid-primary/[0.02] [mask-image:radial-gradient(white,transparent_70%)]" />
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="pointer-events-none absolute -top-10 -left-10 h-48 w-48 rounded-full bg-brand-primary/10 blur-2xl"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="pointer-events-none absolute -bottom-12 -right-12 h-56 w-56 rounded-full bg-brand-primary/10 blur-2xl"
          />

          <div className="relative text-center max-w-4xl mx-auto">
            <div className="flex justify-center mb-3">
              <Badge className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm bg-brand-primary/10 text-brand-primary border border-brand-primary/20">
                <BookOpen className="h-4 w-4 text-brand-primary" />
                {t('standards.footerCta.badge')}
              </Badge>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-brand-dark dark:text-white mb-3">
              {t('standards.footerCta.title')}
            </h2>
            <p className="text-brand-secondary dark:text-gray-300">
              {t('standards.footerCta.text')}
            </p>
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 px-2">
              <Button asChild size="lg" className="w-full sm:w-auto bg-brand-primary hover:bg-brand-primary/90 text-white font-medium transition-all duration-300 hover:shadow-xl transform text-sm md:text-base h-11 md:h-12">
                <Link href="/resources/blog" className="flex items-center justify-center gap-2">
                  <BookOpen className="h-4 w-4 md:h-5 md:w-5" />
                  {t('standards.footerCta.buttons.blog')}
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="w-full sm:w-auto border-brand-primary text-brand-primary hover:bg-white hover:text-brand-primary hover:border-brand-primary hover:shadow-lg transition-all duration-300 text-sm md:text-base h-11 md:h-12">
                <Link href="/contact" className="flex items-center justify-center gap-2">
                  <Mail className="h-4 w-4 md:h-5 md:w-5" />
                  {t('standards.footerCta.buttons.contact')}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}


