'use client';

import Link from 'next/link';
import { ChevronRight, Home, Shield } from 'lucide-react';
import { useLanguage } from '@/lib/context/language-context';
import type { PPECategory } from '@/lib/ppe-standards/types';

interface Props {
  category: PPECategory;
}

export function ENResourceBreadcrumb({ category }: Props) {
  const { t, language } = useLanguage();
  const current = (category as any).titleLocales?.[language] || category.title;
  return (
    <nav className="flex items-center space-x-2 text-sm">
      <Link 
        href="/" 
        className="inline-flex items-center gap-1.5 text-brand-secondary hover:text-brand-primary dark:text-gray-400 dark:hover:text-brand-primary transition-colors duration-200 group"
      >
        <Home className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
        <span className="font-medium">{t('navbar.home')}</span>
      </Link>
      <ChevronRight className="h-4 w-4 text-brand-primary/60" />
      <Link 
        href="/resources/ppe-standards" 
        className="inline-flex items-center gap-1.5 text-brand-secondary hover:text-brand-primary dark:text-gray-400 dark:hover:text-brand-primary transition-colors duration-200 group"
      >
        <Shield className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
        <span className="font-medium">PPE Standards Hub</span>
      </Link>
      <ChevronRight className="h-4 w-4 text-brand-primary/60" />
      <span className="text-brand-dark dark:text-white font-semibold bg-brand-primary/10 dark:bg-brand-primary/20 px-3 py-1 rounded-full text-xs uppercase tracking-wide">
        {current}
      </span>
    </nav>
  );
}


