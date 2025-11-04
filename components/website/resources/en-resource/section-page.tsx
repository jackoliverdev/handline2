'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import type { PPESectionDetail } from '@/lib/ppe-standards/types';
import { MiniProductCard } from '@/components/app/mini-product-card';
import { SectionImagesGallery } from '@/components/website/resources/shared/SectionImagesGallery';
import { useEffect, useState } from 'react';

interface Props {
  section: PPESectionDetail;
}

export function ENResourceSectionPage({ section }: Props) {
  const [related, setRelated] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      try {
        if (!section.relatedProductIds?.length) return;
        const { supabase } = await import('@/lib/supabase');
        const { data } = await supabase
          .from('products')
          .select('*')
          .in('id', section.relatedProductIds);
        setRelated(data || []);
      } catch (e) {
        console.error('Failed to load related products for section', e);
      }
    })();
  }, [section.relatedProductIds]);

  return (
    <main className="flex flex-col min-h-[100dvh] bg-[#F5EFE0]/60 dark:bg-transparent">
      <section className="relative pt-20 md:pt-28 pb-6 md:pb-8">
        <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="mb-4 text-sm text-brand-secondary dark:text-gray-300">
            <Link href="/resources/ppe-standards" className="hover:text-brand-primary">PPE Standards Hub</Link>
            <ChevronRight className="inline h-4 w-4 mx-1" />
            <Link href={`/resources/ppe-standards/${section.category.slug}`} className="hover:text-brand-primary">{section.category.title}</Link>
            <ChevronRight className="inline h-4 w-4 mx-1" />
            <span className="text-brand-dark dark:text-white font-medium">{section.code ? `${section.code} — ${section.title}` : section.title}</span>
          </nav>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-center">
            <div className="md:col-span-3">
              <h1 className="flex items-center gap-2 text-3xl md:text-5xl font-bold tracking-tight text-brand-dark dark:text-white">
                {(section as any).iconUrl && (
                  <span className="relative inline-block h-7 w-7 md:h-10 md:w-10">
                    <Image src={(section as any).iconUrl} alt="section icon" fill className="object-contain" />
                  </span>
                )}
                {section.code ? `${section.code} — ${section.title}` : section.title}
              </h1>
              {section.intro && (
                <p className="mt-3 text-brand-secondary dark:text-gray-300 text-base md:text-lg max-w-2xl">{section.intro}</p>
              )}
            </div>
            <div className="md:col-span-2 relative aspect-[16/10] w-full overflow-hidden rounded-xl shadow-lg">
              {section.imageUrl && (
                <Image src={section.imageUrl} alt={section.title} fill className="object-cover" />
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="py-6 md:py-10">
        <div className="container max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.ul initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3 md:space-y-4">
            {section.bullets.map((b, i) => (
              <li key={i} className="pl-4 relative text-brand-dark dark:text-white">
                <span className="absolute left-0 top-2 h-2 w-2 rounded-full bg-brand-primary" />
                {b}
              </li>)
            )}
          </motion.ul>
          {/* Optional images gallery */}
          {(section as any).extraImages && (section as any).extraImages.length > 0 && (
            <SectionImagesGallery images={(section as any).extraImages} />
          )}
        </div>
      </section>

      {related.length > 0 && (
        <section className="py-6 md:py-10 bg-[#F5EFE0]/60 dark:bg-transparent">
          <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-xl md:text-2xl font-semibold text-brand-dark dark:text-white mb-4">Related products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((p) => (
                <MiniProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}


