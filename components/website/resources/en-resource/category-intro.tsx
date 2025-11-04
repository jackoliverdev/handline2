'use client';

import { useLanguage } from '@/lib/context/language-context';
import { BadgeCheck } from 'lucide-react';

export function ENResourceCategoryIntro() {
  const { t } = useLanguage();

  return (
    <section className="container pt-4 pb-2 md:pt-6 md:pb-4">
      <div className="max-w-3xl mx-auto text-center mb-4 md:mb-6">
        <div className="inline-flex items-center rounded-full border border-brand-primary px-3 py-1 text-xs md:text-sm backdrop-blur-sm mb-3">
          <BadgeCheck className="mr-1.5 h-3 w-3 md:h-4 md:w-4 text-brand-primary" />
          <span className="text-brand-dark dark:text-white font-medium">
            {t('standards.categoriesIntro.badge')}
          </span>
        </div>
        <h3 className="text-xl md:text-2xl lg:text-3xl font-bold tracking-tight text-brand-dark dark:text-white mb-2">
          {t('standards.categoriesIntro.title')}
        </h3>
        <p className="text-brand-secondary dark:text-gray-300 text-sm md:text-base">
          {t('standards.categoriesIntro.description')}
        </p>
      </div>
    </section>
  );
}

export default ENResourceCategoryIntro;


