'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '@/lib/context/language-context';

export interface SectionImageEntry {
  url: string;
  caption_locales?: Record<string, string>;
}

interface Props {
  images: SectionImageEntry[];
}

export function SectionImagesGallery({ images }: Props) {
  const trackRef = useRef<HTMLDivElement>(null);
  const { language } = useLanguage();

  if (!images || images.length === 0) return null;

  const scrollBy = (delta: number) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: delta, behavior: 'smooth' });
  };

  return (
    <div className="mt-6">
      <div className="relative">
        <div
          ref={trackRef}
          className="flex overflow-x-auto snap-x snap-mandatory gap-5 py-2 scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          <style jsx global>{`
            .scrollbar-hide::-webkit-scrollbar { display: none; }
          `}</style>
          {images.map((img, idx) => {
            const caption = img.caption_locales?.[language] || img.caption_locales?.en || '';
            return (
              <figure
                key={`${img.url}-${idx}`}
                className="relative snap-start flex-shrink-0 w-[300px] sm:w-[360px] md:w-[420px] rounded-xl p-2 bg-white/80 dark:bg-black/40 border border-brand-primary/10 dark:border-brand-primary/20"
              >
                <div className="relative w-full aspect-[16/10] rounded-md overflow-hidden">
                  <Image src={img.url} alt={caption || 'PPE section image'} fill className="object-contain" sizes="(max-width: 768px) 70vw, 40vw" />
                </div>
                {caption && (
                  <figcaption className="mt-2 text-xs text-center text-brand-secondary dark:text-gray-300 line-clamp-2">{caption}</figcaption>
                )}
              </figure>
            );
          })}
        </div>

        {images.length > 1 && (
          <>
            <button
              type="button"
              aria-label="Previous"
              onClick={() => scrollBy(-360)}
              className="hidden sm:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 dark:bg-black/70 rounded-full p-2 border border-brand-primary/30 hover:bg-brand-primary hover:text-white transition-colors"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              aria-label="Next"
              onClick={() => scrollBy(360)}
              className="hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 dark:bg-black/70 rounded-full p-2 border border-brand-primary/30 hover:bg-brand-primary hover:text-white transition-colors"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}
      </div>
    </div>
  );
}


