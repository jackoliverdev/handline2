'use client';

import Image from 'next/image';
import { useLanguage } from '@/lib/context/language-context';
import type { PPECategory } from '@/lib/ppe-standards/types';
import { motion } from 'framer-motion';

interface Props {
  category: PPECategory;
}

export function ENResourceCategoryHero({ category }: Props) {
  const { t, language } = useLanguage();

  return (
    <section className="relative mb-2 sm:mb-4 md:mb-6 bg-[#F5EFE0] dark:bg-background">
      {/* Hero with slanted bottom, mirroring Careers hero */}
      <div className="relative pt-24 md:pt-32 pb-40 md:pb-44 lg:pb-48 overflow-hidden" style={{ zIndex: 1 }}>
        {/* Background image */}
        <div className="absolute inset-0 w-full h-full" style={{ zIndex: -1 }}>
          {category.heroImageUrl && (
            <Image
              src={category.heroImageUrl}
              alt={(category as any).titleLocales?.[language] || category.title}
              fill
              className="object-cover"
              style={{ objectPosition: `center ${category.heroFocusY ?? 50}%` }}
              priority
            />
          )}
          <div className="absolute inset-0 bg-black/35" />
        </div>

        {/* Slanted bottom overlay */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-40 md:h-48 lg:h-56 bg-[#F5EFE0] dark:bg-background transform-gpu"
          style={{
            WebkitClipPath: 'polygon(0% 40%, 100% 70%, 100% 100%, 0% 100%)',
            clipPath: 'polygon(0% 40%, 100% 70%, 100% 100%, 0% 100%)',
            willChange: 'clip-path',
          }}
        />

        <div className="container mx-auto px-6 relative max-w-7xl">
          <div className="lg:w-3/4 xl:w-2/3">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl md:text-5xl font-bold tracking-tight text-white drop-shadow-md"
            >
              {(category as any).titleLocales?.[language] || category.title}
            </motion.h1>
            {((category as any).summaryLocales?.[language] || category.summary) && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mt-3 text-base md:text-lg text-white/90 drop-shadow-sm max-w-3xl"
              >
                {(category as any).summaryLocales?.[language] || category.summary}
              </motion.p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}


