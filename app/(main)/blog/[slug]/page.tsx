import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, Calendar, Clock, User, Share2, Tag } from 'lucide-react';
import { Metadata } from 'next';
import { cookies } from 'next/headers';
import en from '@/lib/translations/en.json';
import it from '@/lib/translations/it.json';

import { getBlogBySlug, getRelatedBlogs } from '@/lib/blog-service';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BlogCard } from '@/components/website/blog/blog-card';
import { MarkdownContent } from '@/components/website/blog/markdown-content';
import BlogPostClient from '@/components/website/blog/BlogPostClient';

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

const translations = { en, it };

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const cookieStore = cookies();
  const lang = (cookieStore.get('language')?.value as 'en' | 'it') || 'en';
  const post = await getBlogBySlug(params.slug);
  
  if (!post) {
    return {
      title: lang === 'it' ? 'Articolo non trovato' : 'Post Not Found',
    };
  }
  
  return {
    title: `${post.title} | HandLine Blog`,
    description: post.summary,
  };
}

// Disable static generation for this page
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getBlogBySlug(params.slug);
  if (!post) notFound();
  // Optionally, fetch related posts here or in the client component
  return <BlogPostClient post={post} />;
} 