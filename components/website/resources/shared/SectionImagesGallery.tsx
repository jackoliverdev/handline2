'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useLanguage } from '@/lib/context/language-context';
import { Dialog, DialogContent, DialogClose } from '@/components/ui/dialog';

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
  const [selectedImage, setSelectedImage] = useState<{ url: string; caption: string } | null>(null);

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
                className="relative snap-start flex-shrink-0 w-[300px] sm:w-[360px] md:w-[420px] rounded-xl p-2 bg-white/80 dark:bg-black/40 border border-brand-primary/10 dark:border-brand-primary/20 group cursor-pointer"
                onClick={() => setSelectedImage({ url: img.url, caption })}
              >
                <div className="relative w-full aspect-[16/10] rounded-md overflow-hidden">
                  <Image 
                    src={img.url} 
                    alt={caption || 'PPE section image'} 
                    fill 
                    className="object-contain transition-transform duration-300 group-hover:scale-105" 
                    sizes="(max-width: 768px) 70vw, 40vw" 
                  />
                </div>
                {caption && (
                  <figcaption className="mt-2 text-xs text-center text-brand-secondary dark:text-gray-300 line-clamp-2 group-hover:text-brand-primary transition-colors">{caption}</figcaption>
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

      {/* Image Lightbox Modal */}
      <Dialog open={!!selectedImage} onOpenChange={(open) => !open && setSelectedImage(null)}>
        <DialogContent className="max-w-[98vw] max-h-[98vh] w-auto h-auto p-0 bg-black/95 border-none">
          <DialogClose className="absolute right-4 top-4 z-50 rounded-full bg-white/10 hover:bg-white/20 p-2 transition-colors">
            <X className="h-6 w-6 text-white" />
            <span className="sr-only">Close</span>
          </DialogClose>
          {selectedImage && (
            <div className="relative w-full h-full flex flex-col items-center justify-center p-2">
              <div className="relative w-full max-w-[96vw] max-h-[90vh] aspect-auto">
                <Image
                  src={selectedImage.url}
                  alt={selectedImage.caption || 'PPE section image'}
                  width={1600}
                  height={1200}
                  className="object-contain w-full h-full"
                  sizes="96vw"
                />
              </div>
              {selectedImage.caption && (
                <p className="mt-3 text-sm text-white/90 text-center max-w-3xl px-4">
                  {selectedImage.caption}
                </p>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}


