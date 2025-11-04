'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { PPESection } from '@/lib/ppe-standards/types';
import { useLanguage } from '@/lib/context/language-context';
import { supabase } from '@/lib/supabase';
import { SectionImagesGallery } from '@/components/website/resources/shared/SectionImagesGallery';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface Props {
  sections: PPESection[];
}

export function ENResourceSectionsBlocks({ sections }: Props) {
  const { language } = useLanguage();
  return (
    <section className="container pt-0 md:pt-1 pb-6 md:pb-8">
      <div className="space-y-8 md:space-y-10">
        {sections.map((s, idx) => {
          const title = (s as any).titleLocales?.[language] || s.title;
          const intro = (s as any).introLocales?.[language] || s.intro;
          const bullets = ((s as any).bulletsLocales && !Array.isArray((s as any).bulletsLocales) ? (s as any).bulletsLocales[language] || (s as any).bulletsLocales['en'] : s.bullets) || s.bullets;
          return (
          <motion.article
            key={s.id}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: idx * 0.05 }}
            className="grid grid-cols-1 md:grid-cols-5 gap-6 items-start rounded-2xl bg-white dark:bg-black/40 border border-gray-200 dark:border-gray-700 shadow-sm p-5 md:p-6"
          >
            <div className="md:col-span-3">
              <h3 className="flex items-center gap-2 text-xl md:text-2xl font-semibold text-brand-dark dark:text-white">
                {(s as any).iconUrl && (
                  <span className="relative inline-block h-6 w-6 md:h-7 md:w-7">
                    <Image src={(s as any).iconUrl} alt="section icon" fill className="object-contain" />
                  </span>
                )}
                {title}
              </h3>
              {intro && (
                <div className="mt-2 text-brand-secondary dark:text-gray-300 prose prose-sm max-w-none dark:prose-invert">
                  <ReactMarkdown 
                    remarkPlugins={[remarkGfm]}
                    components={{
                      a: ({ node, ...props }) => <a className="text-brand-primary hover:text-brand-primary/80 underline" target="_blank" rel="noopener noreferrer" {...props} />,
                      img: ({ node, ...props }) => <img className="max-w-full h-auto rounded-md" alt={props.alt || ''} {...props} />,
                      h1: ({ node, ...props }) => <h1 className="text-2xl font-bold mb-3 mt-4 text-brand-dark dark:text-white" {...props} />,
                      h2: ({ node, ...props }) => <h2 className="text-xl font-bold mb-2 mt-3 text-brand-dark dark:text-white" {...props} />,
                      h3: ({ node, ...props }) => <h3 className="text-lg font-bold mb-2 mt-3 text-brand-dark dark:text-white" {...props} />,
                      p: ({ node, ...props }) => <p className="mb-3 leading-relaxed text-brand-secondary dark:text-gray-300" {...props} />,
                      ul: ({ node, ...props }) => <ul className="list-disc pl-6 mb-3 space-y-1 text-brand-dark dark:text-white" {...props} />,
                      ol: ({ node, ...props }) => <ol className="list-decimal pl-6 mb-3 space-y-1 text-brand-dark dark:text-white" {...props} />,
                      blockquote: ({ node, ...props }) => <blockquote className="border-l-4 border-brand-primary pl-4 italic text-gray-600 dark:text-gray-400 my-3" {...props} />,
                      code: ({ node, ...props }) => 
                        <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm font-mono" {...props} />,
                      strong: ({ node, ...props }) => <strong className="font-semibold text-brand-dark dark:text-white" {...props} />,
                      em: ({ node, ...props }) => <em className="italic text-brand-dark dark:text-white" {...props} />
                    }}
                  >
                    {intro}
                  </ReactMarkdown>
                </div>
              )}
              {bullets?.length > 0 && (
                <ul className="mt-4 space-y-2">
                  {bullets.map((b: string, i: number) => (
                    <li key={i} className="pl-4 relative text-brand-dark dark:text-white">
                      <span className="absolute left-0 top-2 h-2 w-2 rounded-full bg-brand-primary" />
                      {b}
                    </li>
                  ))}
                </ul>
              )}
              {/* images grid rendered full-width below */}
            </div>
            <div className="md:col-span-2 relative w-full rounded-xl">
              <SectionRelatedProducts ids={s.relatedProductIds || []} lang={language} captions={(s as any).relatedProductCaptions} />
            </div>
            {/* Full-width horizontal gallery below content when available */}
            {(s as any).extraImages && (s as any).extraImages.length > 0 && (
              <div className="md:col-span-5">
                <SectionImagesGallery images={(s as any).extraImages} />
              </div>
            )}
          </motion.article>
          );
        })}
      </div>
    </section>
  );
}



interface SectionRelatedProductsProps {
  ids: string[];
  lang: 'en' | 'it';
  captions?: Record<string, Record<string, string>>;
}

function SectionRelatedProducts({ ids, lang, captions }: SectionRelatedProductsProps) {
  const [products, setProducts] = useState<any[]>([]);
  const [index, setIndex] = useState(0);

  const key = useMemo(() => ids.filter(Boolean).join(','), [ids]);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        if (!ids || ids.length === 0) {
          if (isMounted) setProducts([]);
          return;
        }
        const { data, error } = await supabase
          .from('products')
          .select('id,name,name_locales,image_url')
          .in('id', ids);
        if (!isMounted) return;
        if (error) {
          console.error('Failed to load related products for section:', error);
          setProducts([]);
          return;
        }
        // Preserve original order of ids
        const ordered = (data || []).sort((a: any, b: any) => ids.indexOf(a.id) - ids.indexOf(b.id));
        setProducts(ordered);
        setIndex(0);
      } catch (e) {
        console.error('Failed to load related products for section', e);
        if (isMounted) setProducts([]);
      }
    })();
    return () => { isMounted = false; };
  }, [key]);

  if (!products || products.length === 0) {
    return <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700" />;
  }

  const product = products[index];
  const name: string = (product?.name_locales?.[lang]) || product?.name || '';
  const caption: string | undefined = captions?.[product?.id]?.[lang] || captions?.[product?.id]?.['en'] || undefined;
  // Attempt to read caption from injected relatedProductCaptions if present on the parent section prop (via closure capture not available here),
  // so we rely on a data attribute passed through ids? As a simpler approach, read from product object if backend later adds it. For now, just noop.
  const encoded = encodeURIComponent(name);

  const canSlide = products.length > 1;

  const prev = () => setIndex((i) => (i - 1 + products.length) % products.length);
  const next = () => setIndex((i) => (i + 1) % products.length);

  return (
    <div className="relative w-full">
      <Link href={`/products/${encoded}`} className="block group">
        <div className="relative w-full aspect-[16/10] bg-white dark:bg-black rounded-xl overflow-hidden">
          {product?.image_url ? (
            <Image src={product.image_url} alt={name} fill className="object-contain" />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700" />
          )}
        </div>
        <div className="px-3 py-2 bg-white dark:bg-black">
          <p className="text-sm md:text-base font-medium text-brand-dark dark:text-white truncate group-hover:text-[#F28C38] transition-colors">{name}</p>
          {caption && (
            <p className="text-xs text-brand-secondary dark:text-gray-300 truncate group-hover:text-[#F28C38]/90 transition-colors">{caption}</p>
          )}
        </div>
      </Link>

      {/* Arrows over the image area */}
      {canSlide && (
        <>
          <button
            type="button"
            aria-label="Previous"
            onClick={prev}
            className="absolute left-2 top-[calc(16/10*50%)] -translate-y-1/2 z-10 bg-[#F5EFE0]/95 dark:bg-[#121212]/90 rounded-full p-1.5 border border-brand-primary/30 hover:bg-brand-primary hover:text-white transition-colors"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            aria-label="Next"
            onClick={next}
            className="absolute right-2 top-[calc(16/10*50%)] -translate-y-1/2 z-10 bg-[#F5EFE0]/95 dark:bg-[#121212]/90 rounded-full p-1.5 border border-brand-primary/30 hover:bg-brand-primary hover:text-white transition-colors"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </>
      )}
    </div>
  );
}

