'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/context/language-context';
import { BadgeCheck, Scale, Shield, Globe } from 'lucide-react';
import Link from 'next/link';

export function ENResourceOverviewBuckets() {
  const { t } = useLanguage();

  const buckets = [
    {
      key: 'regulation',
      href: '/resources/ppe-standards/overview?tab=regulation',
      Icon: Scale,
      color: '#0F5B78',
    },
    {
      key: 'categories',
      href: '/resources/ppe-standards/overview?tab=categories',
      Icon: Shield,
      color: '#F28C38',
    },
    {
      key: 'standards',
      href: '/resources/ppe-standards/overview?tab=standards',
      Icon: Globe,
      color: '#3BAA36',
    },
  ] as const;

  return (
    <section className="container py-8 md:py-12">
      {/* Overarching regulation header */}
      <div className="max-w-3xl mx-auto text-center mb-8 md:mb-10">
        <div className="inline-flex items-center rounded-full border border-brand-primary px-3 py-1 text-xs md:text-sm backdrop-blur-sm mb-3">
          <BadgeCheck className="mr-1.5 h-3 w-3 md:h-4 md:w-4 text-brand-primary" />
          <span className="text-brand-dark dark:text-white font-medium">
            {t('standards.overview.badge')}
          </span>
        </div>
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-brand-dark dark:text-white mb-3">
          {t('standards.overview.title')}
        </h2>
        <p className="text-brand-secondary dark:text-gray-300 text-base md:text-lg">
          {t('standards.overview.subtitle')}
        </p>
      </div>

      {/* Buckets grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {buckets.map(({ key, href, Icon, color }, idx) => (
          <motion.div
            key={key}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: idx * 0.05 }}
            className="rounded-xl overflow-hidden bg-white dark:bg-black/40 border border-gray-200 dark:border-gray-700 shadow-sm"
          >
            <Link href={href} className="block">
              <div className="p-5 flex items-start gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg" style={{ backgroundColor: `${color}1A` }}>
                  <Icon className="h-5 w-5" style={{ color }} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-brand-dark dark:text-white">
                    {t(`standards.buckets.${key}.title`)}
                  </h3>
                  <p className="text-sm text-brand-secondary dark:text-gray-300 mt-1">
                    {t(`standards.buckets.${key}.subtitle`)}
                  </p>
                </div>
              </div>
              {/* No footer link per spec */}
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}


