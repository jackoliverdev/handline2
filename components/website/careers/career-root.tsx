'use client';

import { CareersHero } from './hero';
import { CareerGrid } from './career-grid';
import { useLanguage } from '@/lib/context/language-context';
import type { CareerPost } from '@/lib/career-service';
import { useEffect, useState } from 'react';

export default function CareerRoot({ careerPosts }: { careerPosts: CareerPost[] }) {
  const { language } = useLanguage();
  const [showDebug, setShowDebug] = useState(false);

  // Debug mode with keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+Shift+D to toggle debug mode
      if (e.ctrlKey && e.shiftKey && e.key === 'D') {
        setShowDebug(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <main className="flex flex-col min-h-screen bg-[#F5EFE0]/80 dark:bg-background">
      <CareersHero language={language} />
      {showDebug && (
        <div className="container mx-auto px-4 mb-8 p-4 bg-red-50 border border-red-200 rounded-md">
          <h3 className="text-lg font-semibold text-red-700 mb-2">Debug Information</h3>
          <p className="mb-2">Posts received: {careerPosts.length}</p>
          <pre className="bg-white p-3 rounded text-xs overflow-auto max-h-60">
            {JSON.stringify(careerPosts, null, 2)}
          </pre>
          <p className="mt-2 text-sm text-gray-600">
            Press Ctrl+Shift+D to hide this debug panel
          </p>
        </div>
      )}
      <CareerGrid careerPosts={careerPosts} language={language} />
    </main>
  );
} 