'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { nord } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { motion } from 'framer-motion';
import { ExternalLink, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import type { Components } from 'react-markdown';
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';

interface BlogGalleryImage {
  url: string;
  width?: number;
  height?: number;
}

interface MarkdownContentProps {
  content: string;
  images?: BlogGalleryImage[];
}

export function MarkdownContent({ content, images }: MarkdownContentProps) {
  const [current, setCurrent] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!images || images.length === 0) return;
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
  }, [current, images]);

  const prev = () => setCurrent((c) => (c - 1 + (images?.length || 0)) % (images?.length || 1));
  const next = () => setCurrent((c) => (c + 1) % (images?.length || 1));
  // Define markdown components with proper type annotations
  const markdownComponents: Components = {
    h1: ({ children }) => (
      <h1 className="text-3xl font-bold mt-8 mb-4 text-brand-dark dark:text-white bg-gradient-to-r from-brand-primary to-brand-primary bg-clip-text text-transparent">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl font-bold mt-6 mb-4 text-brand-dark dark:text-white relative">
        <span className="absolute -left-4 top-0 h-full w-1 bg-gradient-to-b from-brand-primary to-brand-primary rounded-full" />
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-bold mt-4 mb-3 text-brand-dark dark:text-white">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-lg font-bold mt-4 mb-2 text-brand-dark dark:text-white">
        {children}
      </h4>
    ),
    p: ({ children }) => (
      <p className="my-4 text-base leading-7 text-brand-secondary dark:text-gray-300">
        {children}
      </p>
    ),
    ul: ({ children }) => (
      <ul className="list-disc list-outside pl-6 my-5 text-brand-secondary dark:text-gray-300 space-y-2 marker:text-brand-primary">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal list-outside pl-6 my-5 text-brand-secondary dark:text-gray-300 space-y-2 marker:text-brand-primary marker:font-semibold">
        {children}
      </ol>
    ),
    li: ({ children }) => (
      <li className="leading-7 rounded-md px-2 py-1 -mx-2 hover:bg-brand-primary/5 dark:hover:bg-brand-primary/10 transition-colors duration-200">
        {children}
      </li>
    ),
    strong: ({ children }) => (
      <strong className="text-brand-dark dark:text-white font-semibold">{children}</strong>
    ),
    em: ({ children }) => (
      <em className="text-brand-secondary dark:text-gray-300">{children}</em>
    ),
    hr: () => (
      <hr className="my-8 border-t border-brand-primary/20" />
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-brand-primary/70 pl-6 pr-4 italic my-6 bg-brand-primary/5 dark:bg-black/30 py-4 rounded-r-xl text-brand-secondary dark:text-gray-300 relative">
        <Quote className="absolute top-2 right-2 h-6 w-6 text-brand-primary/30" />
        {children}
      </blockquote>
    ),
    a: ({ href, children }) => (
      <a 
        href={href} 
        className="text-brand-primary hover:text-brand-primary underline decoration-brand-primary/30 hover:decoration-brand-primary/30 transition-all duration-200 inline-flex items-center gap-1"
        target={href?.startsWith('http') ? '_blank' : undefined}
        rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
      >
        {children}
        {href?.startsWith('http') && <ExternalLink className="h-3 w-3" />}
      </a>
    ),
    img: ({ src, alt }) => (
      <div className="my-8">
        <img 
          src={src} 
          alt={alt} 
          className="rounded-xl w-full h-auto shadow-lg border border-brand-primary/10 dark:border-brand-primary/20 hover:shadow-xl transition-shadow duration-300" 
        />
        {alt && (
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center mt-2 italic">
            {alt}
          </p>
        )}
      </div>
    ),
    code: ({ className, children }) => {
      const match = /language-(\w+)/.exec(className || '');
      return match ? (
        <div>
          <SyntaxHighlighter
            style={nord}
            language={match[1]}
            PreTag="div"
            className="rounded-xl my-4 shadow-md border border-brand-primary/10 dark:border-brand-primary/20 overflow-hidden"
          >
            {String(children).replace(/\n$/, '')}
          </SyntaxHighlighter>
        </div>
      ) : (
        <code className="bg-brand-primary/10 text-brand-dark dark:text-white px-2 py-1 rounded-md font-mono text-sm border border-brand-primary/20">
          {children}
        </code>
      );
    },
    table: ({ children }) => (
      <div className="overflow-x-auto my-6 rounded-xl border border-brand-primary/10 dark:border-brand-primary/20 shadow-sm">
        <table className="min-w-full divide-y divide-brand-primary/10 dark:divide-brand-primary/20">{children}</table>
      </div>
    ),
    th: ({ children }) => (
      <th className="px-6 py-4 text-left text-sm font-semibold bg-gradient-to-r from-brand-primary/10 to-brand-primary/10 text-brand-dark dark:text-white border-b border-brand-primary/20">
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td className="px-6 py-4 text-sm border-t border-brand-primary/10 dark:border-brand-primary/20 text-brand-secondary dark:text-gray-300 hover:bg-brand-primary/5 dark:hover:bg-brand-primary/10 transition-colors duration-200">
        {children}
      </td>
    ),
  };

  return (
    <motion.article 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="prose prose-lg max-w-none bg-white dark:bg-black/50 p-8 rounded-xl border border-gray-100 dark:border-gray-700/50 shadow-sm backdrop-blur-sm dark:backdrop-blur-none hover:shadow-md transition-shadow duration-300"
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={markdownComponents}
      >
        {content}
      </ReactMarkdown>
      
      {/* Images Gallery - integrated into the same container */}
      {images && images.length > 0 && (
        <div className="mt-8">
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
                <div
                  key={img.url + idx}
                  className="gallery-card relative snap-start flex-shrink-0 w-[300px] sm:w-[360px] md:w-[420px] h-[220px] sm:h-[280px] md:h-[340px] rounded-xl overflow-hidden p-2"
                >
                  <Image src={img.url} alt="Blog image" fill className="object-contain" sizes="(max-width: 768px) 70vw, 40vw" />
                </div>
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
      )}
    </motion.article>
  );
} 