'use client';

import { CaseStudiesHero } from './hero';
import { CaseStudyGrid } from './grid';
import { useLanguage } from '@/lib/context/language-context';
import type { CaseStudy } from '@/lib/case-studies-service';

export default function CaseStudyRoot({ caseStudies }: { caseStudies: CaseStudy[] }) {
  const { language } = useLanguage();

  return (
    <main className="flex flex-col min-h-[100dvh]">
      <CaseStudiesHero language={language} />
      <div id="case-study-grid" className="bg-[#F5EFE0]/80 dark:bg-transparent py-12">
        <CaseStudyGrid caseStudies={caseStudies} language={language} />
      </div>
    </main>
  );
} 