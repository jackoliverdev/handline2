"use client";
import { useLanguage } from '@/lib/context/language-context';
import { BlogCard } from './blog-card';
import { MarkdownContent } from './markdown-content';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, Calendar, Clock, User, Share2 } from 'lucide-react';
import type { BlogPost } from '@/lib/blog-service';

export default function BlogPostClient({ post }: { post: BlogPost }) {
  const { language, t } = useLanguage();
  const title = post.title_locales?.[language] || post.title;
  const summary = post.summary_locales?.[language] || post.summary;
  const content = post.content_locales?.[language] || post.content;
  const tags = post.tags_locales?.[language] || post.tags || [];

  // Calculate reading time (approximately 200 words per minute)
  const wordCount = content.split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / 200);

  // Format the date
  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat(language === 'it' ? 'it-IT' : 'en-GB', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  };

  return (
    <main className="flex flex-col min-h-[100dvh] bg-[#F5EFE0]/80 dark:bg-transparent pt-8 md:pt-12">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="bg-grid-primary/[0.02] absolute inset-0 [mask-image:radial-gradient(white,transparent_85%)]" />
        <div className="absolute -top-1/3 right-0 -z-10 h-[600px] w-[600px] rounded-full bg-brand-primary/5 blur-[100px]" />
        <div className="absolute bottom-0 left-0 -z-10 h-[300px] w-[300px] rounded-full bg-brand-primary/10 blur-[100px]" />
      </div>

      {/* Hero Section */}
      <section className="relative w-full pt-4 pb-8 md:py-12">
        <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-2 border-b border-brand-primary/10">
          {/* Back Button */}
          <div className="mb-6">
            <Button variant="outline" size="sm" asChild className="bg-[#F5EFE0]/90 hover:bg-[#F5EFE0] dark:bg-transparent dark:hover:bg-black/20 border-brand-primary/20 hover:border-brand-primary/40 dark:border-brand-primary/30 dark:hover:border-brand-primary/50 transition-all duration-200">
              <Link href="/blog" className="flex items-center gap-1.5 text-brand-dark dark:text-gray-200 hover:text-brand-primary dark:hover:text-brand-primary">
                <ChevronLeft className="h-4 w-4 text-brand-primary" />
                {t('blog.backToBlogs')}
              </Link>
            </Button>
          </div>

          <div className="space-y-6">
            {/* Tags */}
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {tags.map((tag: string) => (
                  <Badge key={tag} variant="outline" className="bg-brand-primary/10 text-brand-primary hover:bg-brand-primary/20 border-brand-primary">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}

            {/* Featured Image */}
            {post.image_url && (
              <div className="relative aspect-[21/9] w-full overflow-hidden rounded-xl">
                <Image
                  src={post.image_url}
                  alt={title}
                  fill
                  priority
                  className="object-cover transition-all duration-500 hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 70vw"
                />
                <div className="absolute inset-0 rounded-xl border border-brand-primary/10 bg-gradient-to-t from-background/50 via-transparent to-transparent" />
              </div>
            )}

            {/* Title */}
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-brand-dark dark:text-white">
              {title}
            </h1>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-6 text-brand-secondary dark:text-gray-300">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-primary/10">
                  <User className="h-4 w-4 text-brand-primary" />
                </div>
                <span>{post.author}</span>
              </div>
              {post.published_at && (
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-primary/10">
                    <Calendar className="h-4 w-4 text-brand-primary" />
                  </div>
                  <span>{formatDate(post.published_at)}</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-primary/10">
                  <Clock className="h-4 w-4 text-brand-primary" />
                </div>
                <span>{t('blog.minRead').replace('{count}', readingTime.toString())}</span>
              </div>
              <div className="ml-auto">
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Share2 className="h-4 w-4" />
                  <span className="sr-only">Share</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="w-full pt-0 md:pt-0 pb-12 md:pb-16">
        <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div>
            <MarkdownContent content={content} />
          </div>
        </div>
      </section>
    </main>
  );
} 