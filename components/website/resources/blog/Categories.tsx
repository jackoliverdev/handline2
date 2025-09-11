'use client';

import Image from 'next/image';
import { useLanguage } from '@/lib/context/language-context';
import { motion } from 'framer-motion';

type Props = {
  onSelect?: (query: string, color?: string) => void;
};

export default function BlogCategories({ onSelect }: Props) {
  const { t } = useLanguage();
  const handleSelect = (value: string, color?: string) => {
    if (onSelect) onSelect(value, color);
    if (typeof window !== 'undefined') {
      const el = document.getElementById('blog-grid');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const buckets = [
    {
      key: 'productsInnovation',
      color: '#F28C38',
      image: '/images/blogs/productinnovation.webp',
    },
    {
      key: 'industrySustainability',
      color: '#3BAA36',
      image: '/images/blogs/industrysustainabaility.webp',
    },
    {
      key: 'safetyCompliance',
      color: '#0F5B78',
      image: '/images/blogs/safteycompliance.webp',
    },
  ];

  return (
    <section className="container py-8 md:py-12">
      <h2 className="text-2xl md:text-3xl font-bold text-brand-dark dark:text-white mb-6">
        {t('blog.categoriesBuckets.title')}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {buckets.map((b, idx) => (
          <motion.button
            key={b.key}
            whileHover={{ y: -2 }}
            className="rounded-xl overflow-hidden text-left bg-white dark:bg-black/40 border border-gray-200 dark:border-gray-700 shadow-sm"
            onClick={() => handleSelect(t(`blog.categoriesBuckets.buckets.${b.key}.title`), b.color)}
          >
            <div className="relative h-48 md:h-56 w-full">
              <Image src={b.image} alt={t(`blog.categoriesBuckets.buckets.${b.key}.title`)} fill className="object-cover object-[50%_80%]" />
              <div className={`text-white px-4 py-2 absolute bottom-0 left-0 right-0 font-semibold`}
                   style={{ backgroundColor: b.color, opacity: 0.95 }}
              >
                {t(`blog.categoriesBuckets.buckets.${b.key}.title`)}
              </div>
            </div>
            <div className="p-4 text-brand-secondary dark:text-gray-300">
              {t(`blog.categoriesBuckets.buckets.${b.key}.description`)}
            </div>
          </motion.button>
        ))}
      </div>
    </section>
  );
}


