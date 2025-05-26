'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { nord } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import type { Components } from 'react-markdown';

interface CareerMarkdownContentProps {
  content: string;
}

export function CareerMarkdownContent({ content }: CareerMarkdownContentProps) {
  return (
    <article className="bg-white dark:bg-black/50 rounded-xl p-8 lg:p-12 border border-gray-100 dark:border-gray-700/50 shadow-lg hover:shadow-2xl transition-all duration-500 backdrop-blur-sm">
      <ReactMarkdown
        components={{
          h1: ({ ...props }) => (
            <h1 className="text-3xl font-bold text-brand-dark dark:text-white mb-6 leading-tight" {...props} />
          ),
          h2: ({ ...props }) => (
            <h2 className="text-2xl font-semibold text-brand-dark dark:text-white mb-4 mt-8 leading-tight" {...props} />
          ),
          h3: ({ ...props }) => (
            <h3 className="text-xl font-semibold text-brand-dark dark:text-white mb-3 mt-6 leading-tight" {...props} />
          ),
          h4: ({ ...props }) => (
            <h4 className="text-lg font-semibold text-brand-dark dark:text-white mb-2 mt-4 leading-tight" {...props} />
          ),
          p: ({ ...props }) => (
            <p className="text-brand-secondary dark:text-gray-300 mb-4 leading-relaxed" {...props} />
          ),
          ul: ({ ...props }) => (
            <ul className="list-disc list-inside text-brand-secondary dark:text-gray-300 mb-4 space-y-2 ml-4" {...props} />
          ),
          ol: ({ ...props }) => (
            <ol className="list-decimal list-inside text-brand-secondary dark:text-gray-300 mb-4 space-y-2 ml-4" {...props} />
          ),
          li: ({ ...props }) => (
            <li className="leading-relaxed" {...props} />
          ),
          strong: ({ ...props }) => (
            <strong className="font-semibold text-brand-dark dark:text-white" {...props} />
          ),
          em: ({ ...props }) => (
            <em className="italic text-brand-secondary dark:text-gray-300" {...props} />
          ),
          blockquote: ({ ...props }) => (
            <blockquote className="border-l-4 border-brand-primary bg-brand-primary/5 dark:bg-brand-primary/10 pl-4 py-2 my-4 italic text-brand-secondary dark:text-gray-300" {...props} />
          ),
          code: ({ ...props }) => (
            <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-sm font-mono text-brand-dark dark:text-gray-300" {...props} />
          ),
          pre: ({ ...props }) => (
            <pre className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg overflow-x-auto mb-4" {...props} />
          ),
          hr: ({ ...props }) => (
            <hr className="border-brand-primary/20 dark:border-gray-600 my-8" {...props} />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </article>
  );
} 