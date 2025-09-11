"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, X as XIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export interface BlogGalleryImage {
  url: string;
  width?: number;
  height?: number;
}

interface BlogImagesGalleryProps {
  images: BlogGalleryImage[];
  title?: string;
}

export const BlogImagesGallery = ({ images, title }: BlogImagesGalleryProps) => {
  const [current, setCurrent] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = trackRef.current;
    if (!container) return;
    const idx = Math.min(current, Math.max(0, images.length - 1));
    const cards = container.querySelectorAll<HTMLElement>(".gallery-card");
    const target = cards[idx];
    if (!target) return;
    const containerRect = container.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();
    const targetCenter = targetRect.left + container.scrollLeft + targetRect.width / 2;
    const desired = containerRect.left + container.scrollLeft + containerRect.width / 2;
    const delta = targetCenter - desired;
    container.scrollTo({ left: container.scrollLeft + delta, behavior: 'smooth' });
  }, [current, images.length]);

  const prev = () => setCurrent((c) => (c - 1 + images.length) % images.length);
  const next = () => setCurrent((c) => (c + 1) % images.length);

  if (!images || images.length === 0) return null;

  return (
    <section className="py-4 md:py-6 bg-transparent">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="rounded-2xl bg-white dark:bg-black/60 border border-brand-primary/10 dark:border-brand-primary/20 shadow-sm p-3 sm:p-4">

          <div className="relative">
          <div
            ref={trackRef}
            className="flex overflow-x-auto snap-x snap-mandatory gap-5 py-2 scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            <style jsx global>{`
              .scrollbar-hide::-webkit-scrollbar { display: none; }
            `}</style>
            {images.map((img, idx) => (
              <motion.button
                key={img.url + idx}
                onClick={() => { setCurrent(idx); setIsOpen(true); }}
                className="gallery-card relative snap-start flex-shrink-0 w-[300px] sm:w-[360px] md:w-[420px] h-[220px] sm:h-[280px] md:h-[340px] rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 bg-white dark:bg-black/70 shadow-sm p-2"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-20% 0%" }}
                transition={{ duration: 0.25 }}
              >
                <Image src={img.url} alt="Blog image" fill className="object-contain bg-white dark:bg-black" sizes="(max-width: 768px) 70vw, 40vw" />
              </motion.button>
            ))}
          </div>

            {images.length > 1 && (
              <>
                <button
                  onClick={prev}
                  aria-label="Previous images"
                  className="hidden md:block absolute -left-8 top-1/2 -translate-y-1/2 z-20 bg-white/90 dark:bg-[#121212]/95 backdrop-blur-sm shadow-2xl rounded-full p-3 border-2 border-brand-primary/20 dark:border-brand-primary/30 hover:border-brand-primary hover:bg-gradient-to-br hover:from-[#F08515] hover:to-[#E67A2C] dark:hover:bg-brand-primary hover:shadow-2xl transition-all duration-300 group"
                >
                  <ChevronLeft className="h-6 w-6 text-gray-700 dark:text-gray-200 group-hover:text-white transition-colors" />
                </button>
                <button
                  onClick={next}
                  aria-label="Next images"
                  className="hidden md:block absolute -right-8 top-1/2 -translate-y-1/2 z-20 bg-white/90 dark:bg-[#121212]/95 backdrop-blur-sm shadow-2xl rounded-full p-3 border-2 border-brand-primary/20 dark:border-brand-primary/30 hover:border-brand-primary hover:bg-gradient-to-br hover:from-[#F08515] hover:to-[#E67A2C] dark:hover:bg-brand-primary hover:shadow-2xl transition-all duration-300 group"
                >
                  <ChevronRight className="h-6 w-6 text-gray-700 dark:text-gray-200 group-hover:text-white transition-colors" />
                </button>
                {/* Mobile mini controls */}
                <div className="md:hidden flex items-center justify-center gap-4 mt-4">
                  <Button variant="outline" size="sm" onClick={prev} className="border-brand-primary text-brand-primary hover:bg-white">Prev</Button>
                  <Button variant="default" size="sm" onClick={next} className="bg-brand-primary hover:bg-brand-primary/90 text-white">Next</Button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-[60] bg-black/90 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute top-4 right-4">
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="rounded-full bg-white/10 hover:bg-white/20 text-white">
                <XIcon className="h-5 w-5" />
              </Button>
            </div>
            <div className="absolute left-4">
              <Button variant="secondary" size="icon" onClick={prev} className="rounded-full bg-white/20 hover:bg-white/30 text-white border border-white/30"><ChevronLeft className="h-6 w-6" /></Button>
            </div>
            <div className="absolute right-4">
              <Button variant="secondary" size="icon" onClick={next} className="rounded-full bg-white/20 hover:bg-white/30 text-white border border-white/30"><ChevronRight className="h-6 w-6" /></Button>
            </div>
            <motion.div key={current} initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.25 }} className="max-w-5xl w-full">
              <div className="relative w-full aspect-[16/10] md:aspect-[16/9] bg-black rounded-xl overflow-hidden">
                <Image src={images[current].url} alt="Blog image" fill className="object-contain"/>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};


