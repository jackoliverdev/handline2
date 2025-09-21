'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/context/language-context';
import type { PPECategory } from '@/lib/ppe-standards/types';

interface CategoryGridProps {
  categories: PPECategory[];
}

export function ENResourceCategoryGrid({ categories }: CategoryGridProps) {
  const { t, language } = useLanguage();

  return (
    <section className="container py-8 md:py-12">
      <h2 className="sr-only">{t('standards.categories.navTitle') || 'Categories'}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((c, idx) => (
          <motion.div
            key={c.id}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: idx * 0.05 }}
            className="group rounded-2xl overflow-hidden bg-white dark:bg-black/40 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow"
          >
            <Link href={`/resources/ppe-standards/${c.slug}`} className="block">
              <div className="relative aspect-[16/9] w-full overflow-hidden">
                {(c as any).cardImageUrl || c.heroImageUrl ? (
                  <Image src={(c as any).cardImageUrl || c.heroImageUrl!} alt={c.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700" />
                )}
              </div>
              <div className="p-5">
                <h3 className="text-lg font-semibold text-brand-dark dark:text-white">{c.titleLocales?.[language] || c.title}</h3>
                {(c.summaryLocales?.[language] || c.summary) && (
                  <p className="text-sm text-brand-secondary dark:text-gray-300 mt-2 line-clamp-3">{c.summaryLocales?.[language] || c.summary}</p>
                )}
                <div className="mt-3 text-brand-primary font-medium">{t('standards.cards.learnMore')}</div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}


