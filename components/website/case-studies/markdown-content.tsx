'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { nord } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { motion } from 'framer-motion';
import { ExternalLink, Quote } from 'lucide-react';
import type { Components } from 'react-markdown';

interface MarkdownContentProps {
  content: string;
}

export function MarkdownContent({ content }: MarkdownContentProps) {
  // Define markdown components with proper type annotations
  const markdownComponents: Components = {
    h1: ({ children }) => (
      <motion.h1 
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold mt-8 mb-4 text-brand-dark dark:text-white bg-gradient-to-r from-brand-primary to-orange-500 bg-clip-text text-transparent"
      >
        {children}
      </motion.h1>
    ),
    h2: ({ children }) => (
      <motion.h2 
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-2xl font-bold mt-6 mb-4 text-brand-dark dark:text-white relative"
      >
        <span className="absolute -left-4 top-0 h-full w-1 bg-gradient-to-b from-brand-primary to-orange-500 rounded-full" />
        {children}
      </motion.h2>
    ),
    h3: ({ children }) => (
      <motion.h3 
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="text-xl font-bold mt-4 mb-3 text-brand-dark dark:text-white"
      >
        {children}
      </motion.h3>
    ),
    h4: ({ children }) => (
      <motion.h4 
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="text-lg font-bold mt-4 mb-2 text-brand-dark dark:text-white"
      >
        {children}
      </motion.h4>
    ),
    p: ({ children }) => (
      <motion.p 
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="my-4 text-base leading-7 text-brand-secondary dark:text-gray-300"
      >
        {children}
      </motion.p>
    ),
    ul: ({ children }) => (
      <motion.ul 
        initial={{ opacity: 0, x: -10 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="list-disc pl-6 my-4 text-brand-secondary dark:text-gray-300 space-y-1"
      >
        {children}
      </motion.ul>
    ),
    ol: ({ children }) => (
      <motion.ol 
        initial={{ opacity: 0, x: -10 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="list-decimal pl-6 my-4 text-brand-secondary dark:text-gray-300 space-y-1"
      >
        {children}
      </motion.ol>
    ),
    li: ({ children }) => <li className="mb-1 hover:text-brand-dark dark:hover:text-white transition-colors duration-200">{children}</li>,
    blockquote: ({ children }) => (
      <motion.blockquote 
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="border-l-4 border-brand-primary/70 pl-6 pr-4 italic my-6 bg-brand-primary/5 dark:bg-black/30 py-4 rounded-r-xl text-brand-secondary dark:text-gray-300 relative"
      >
        <Quote className="absolute top-2 right-2 h-6 w-6 text-brand-primary/30" />
        {children}
      </motion.blockquote>
    ),
    a: ({ href, children }) => (
      <a 
        href={href} 
        className="text-brand-primary hover:text-orange-500 underline decoration-brand-primary/30 hover:decoration-orange-500 transition-all duration-200 inline-flex items-center gap-1"
        target={href?.startsWith('http') ? '_blank' : undefined}
        rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
      >
        {children}
        {href?.startsWith('http') && <ExternalLink className="h-3 w-3" />}
      </a>
    ),
    img: ({ src, alt }) => (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="my-8"
      >
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
      </motion.div>
    ),
    code: ({ className, children }) => {
      const match = /language-(\w+)/.exec(className || '');
      return match ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <SyntaxHighlighter
            style={nord}
            language={match[1]}
            PreTag="div"
            className="rounded-xl my-4 shadow-md border border-brand-primary/10 dark:border-brand-primary/20 overflow-hidden"
          >
            {String(children).replace(/\n$/, '')}
          </SyntaxHighlighter>
        </motion.div>
      ) : (
        <code className="bg-brand-primary/10 text-brand-dark dark:text-white px-2 py-1 rounded-md font-mono text-sm border border-brand-primary/20">
          {children}
        </code>
      );
    },
    table: ({ children }) => (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="overflow-x-auto my-6 rounded-xl border border-brand-primary/10 dark:border-brand-primary/20 shadow-sm"
      >
        <table className="min-w-full divide-y divide-brand-primary/10 dark:divide-brand-primary/20">{children}</table>
      </motion.div>
    ),
    th: ({ children }) => (
      <th className="px-6 py-4 text-left text-sm font-semibold bg-gradient-to-r from-brand-primary/10 to-orange-500/10 text-brand-dark dark:text-white border-b border-brand-primary/20">
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
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="prose prose-lg max-w-none bg-white dark:bg-black/50 p-8 rounded-xl border border-brand-primary/10 dark:border-brand-primary/20 shadow-sm backdrop-blur-sm dark:backdrop-blur-none hover:shadow-md transition-shadow duration-300"
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={markdownComponents}
      >
        {content}
      </ReactMarkdown>
    </motion.article>
  );
} 