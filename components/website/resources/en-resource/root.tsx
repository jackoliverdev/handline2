'use client';

import { ENResourceHero } from './hero';
import { ENResourceOverviewBuckets } from './overview-buckets';
import { ENResourceCategoryGrid } from './category-grid';
import { ENResourceCategoryIntro } from './category-intro';
import { ENResourceFooterCTA } from './footer-cta';
import { useLanguage } from '@/lib/context/language-context';
import type { PPECategory } from '@/lib/ppe-standards/types';

export default function ENResourceRoot({ categories }: { categories: PPECategory[] }) {
  const { language } = useLanguage();

  return (
    <main className="flex flex-col min-h-[100dvh]">
      <ENResourceHero language={language} />
      <ENResourceOverviewBuckets />
      <ENResourceCategoryIntro />
      <ENResourceCategoryGrid categories={categories} />
      <ENResourceFooterCTA />
    </main>
  );
} 