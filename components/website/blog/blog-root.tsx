'use client';

import { BlogHero } from './hero';
import { BlogGrid } from './grid';
import { useLanguage } from '@/lib/context/language-context';
import type { BlogPost } from '@/lib/blog-service';

export default function BlogRoot({ blogPosts }: { blogPosts: BlogPost[] }) {
  const { language } = useLanguage();

  return (
    <main className="flex flex-col min-h-[100dvh]">
      <BlogHero language={language} />
      <div id="blog-grid" className="bg-[#F5EFE0]/80 dark:bg-transparent py-12">
        <BlogGrid blogPosts={blogPosts} language={language} />
      </div>
    </main>
  );
} 