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
import { BlogCard } from '@/components/website/resources/blog/blog-card';
import { MarkdownContent } from '@/components/website/resources/blog/markdown-content';
import BlogPostClient from '@/components/website/resources/blog/BlogPostClient';

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
  
  const hostname = process.env.NEXT_PUBLIC_SITE_URL || 'https://handline2.vercel.app';
  const url = `${hostname}/resources/blog/${params.slug}`;

  // Base metadata object
  const metadata: Metadata = {
    title: `${post.title} | HandLine Blog`,
    description: post.summary,
    openGraph: {
      title: post.title,
      description: post.summary,
      url: url,
      siteName: 'HandLine Safety Solutions',
      locale: lang === 'it' ? 'it_IT' : 'en_GB',
      type: 'article',
      publishedTime: post.published_at,
      authors: [post.author || 'HandLine'],
      tags: post.tags || []
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.summary,
    }
  };

  // Only add images if there's an image_url available
  if (post.image_url) {
    if (metadata.openGraph) {
      metadata.openGraph.images = [
        {
          url: post.image_url,
          width: 1200,
          height: 630,
          alt: post.title
        }
      ];
    }
    
    if (metadata.twitter) {
      metadata.twitter.images = [post.image_url];
    }
  }

  return metadata;
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