'use client';

import { ENResourceHero } from './hero';
import { EnStandardsGrid } from './grid';
import { useLanguage } from '@/lib/context/language-context';
import type { EnStandard } from '@/lib/en-standard-service';

export default function ENResourceRoot({ standards }: { standards: EnStandard[] }) {
  const { language } = useLanguage();

  return (
    <main className="flex flex-col min-h-[100dvh]">
      <ENResourceHero language={language} />
      <div id="en-resource-grid" className="bg-[#F5EFE0]/80 dark:bg-transparent py-12">
        <EnStandardsGrid standards={standards} language={language} />
      </div>
    </main>
  );
} 