'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { nord } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import type { Components } from 'react-markdown';

interface MarkdownContentProps {
  content: string;
}

export function MarkdownContent({ content }: MarkdownContentProps) {
  // Define markdown components with proper type annotations
  const markdownComponents: Components = {
    h1: ({ children }) => <h1 className="text-3xl font-bold mt-8 mb-4 text-brand-dark dark:text-white">{children}</h1>,
    h2: ({ children }) => <h2 className="text-2xl font-bold mt-6 mb-4 text-brand-dark dark:text-white">{children}</h2>,
    h3: ({ children }) => <h3 className="text-xl font-bold mt-4 mb-3 text-brand-dark dark:text-white">{children}</h3>,
    h4: ({ children }) => <h4 className="text-lg font-bold mt-4 mb-2 text-brand-dark dark:text-white">{children}</h4>,
    p: ({ children }) => <p className="my-4 text-base leading-7 text-brand-secondary dark:text-gray-300">{children}</p>,
    ul: ({ children }) => <ul className="list-disc pl-6 my-4 text-brand-secondary dark:text-gray-300">{children}</ul>,
    ol: ({ children }) => <ol className="list-decimal pl-6 my-4 text-brand-secondary dark:text-gray-300">{children}</ol>,
    li: ({ children }) => <li className="mb-1">{children}</li>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-brand-primary/70 pl-4 italic my-4 bg-brand-primary/5 py-2 pr-2 rounded-r-md text-brand-secondary dark:text-gray-300">{children}</blockquote>
    ),
    a: ({ href, children }) => (
      <a href={href} className="text-brand-primary hover:underline transition-all duration-200">{children}</a>
    ),
    img: ({ src, alt }) => (
      <img src={src} alt={alt} className="rounded-lg my-8 w-full h-auto shadow-sm border border-brand-primary/10 dark:border-brand-primary/20" />
    ),
    code: ({ className, children }) => {
      const match = /language-(\w+)/.exec(className || '');
      return match ? (
        <SyntaxHighlighter
          style={nord}
          language={match[1]}
          PreTag="div"
          className="rounded-md my-4 shadow-sm border border-brand-primary/10 dark:border-brand-primary/20"
        >
          {String(children).replace(/\n$/, '')}
        </SyntaxHighlighter>
      ) : (
        <code className="bg-brand-primary/10 text-brand-dark dark:text-white px-1.5 py-0.5 rounded">
          {children}
        </code>
      );
    },
    table: ({ children }) => (
      <div className="overflow-x-auto my-6 rounded-md border border-brand-primary/10 dark:border-brand-primary/20">
        <table className="min-w-full divide-y divide-brand-primary/10 dark:divide-brand-primary/20">{children}</table>
      </div>
    ),
    th: ({ children }) => (
      <th className="px-4 py-3 text-left text-sm font-medium bg-brand-primary/10 text-brand-dark dark:text-white">{children}</th>
    ),
    td: ({ children }) => (
      <td className="px-4 py-3 text-sm border-t border-brand-primary/10 dark:border-brand-primary/20 text-brand-secondary dark:text-gray-300">{children}</td>
    ),
  };

  return (
    <article className="prose prose-lg max-w-none bg-[#F5EFE0]/50 dark:bg-transparent p-6 rounded-lg border border-brand-primary/10 dark:border-brand-primary/20 shadow-sm backdrop-blur-sm dark:backdrop-blur-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={markdownComponents}
      >
        {content}
      </ReactMarkdown>
    </article>
  );
} 