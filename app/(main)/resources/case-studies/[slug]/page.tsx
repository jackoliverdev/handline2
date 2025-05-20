import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, Calendar, Clock, User, Share2, Tag } from 'lucide-react';
import { Metadata } from 'next';
import { cookies } from 'next/headers';
import en from '@/lib/translations/en.json';
import it from '@/lib/translations/it.json';

import { getCaseStudyBySlug, getRelatedCaseStudies } from '@/lib/case-studies-service';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CaseStudyCard } from '@/components/website/case-studies/case-study-card';
import { MarkdownContent } from '@/components/website/case-studies/markdown-content';
import CaseStudyClient from '@/components/website/case-studies/CaseStudyClient';

interface CaseStudyPageProps {
  params: {
    slug: string;
  };
}

const translations = { en, it };

export async function generateMetadata({ params }: CaseStudyPageProps): Promise<Metadata> {
  const cookieStore = cookies();
  const lang = (cookieStore.get('language')?.value as 'en' | 'it') || 'en';
  const caseStudy = await getCaseStudyBySlug(params.slug);
  
  if (!caseStudy) {
    return {
      title: lang === 'it' ? 'Caso studio non trovato' : 'Case Study Not Found',
    };
  }
  
  const hostname = process.env.NEXT_PUBLIC_SITE_URL || 'https://handline2.vercel.app';
  const url = `${hostname}/resources/case-studies/${params.slug}`;

  // Get localised content
  const title = caseStudy.title_locales?.[lang] || caseStudy.title;
  const summary = caseStudy.summary_locales?.[lang] || caseStudy.summary;
  const clientName = caseStudy.client_name_locales?.[lang] || caseStudy.client_name;
  const industry = caseStudy.industry_locales?.[lang] || caseStudy.industry;

  // Base metadata object
  const metadata: Metadata = {
    title: `${title} | HandLine Case Studies`,
    description: summary,
    openGraph: {
      title: title,
      description: summary,
      url: url,
      siteName: 'HandLine Safety Solutions',
      locale: lang === 'it' ? 'it_IT' : 'en_GB',
      type: 'article',
      publishedTime: caseStudy.published_at,
      authors: [caseStudy.author || 'HandLine'],
      tags: caseStudy.tags || [],
      // Add case study specific metadata
      images: []
    },
    twitter: {
      card: 'summary_large_image',
      title: title,
      description: summary,
    }
  };

  // Only add images if there's an image_url available
  if (caseStudy.image_url) {
    if (metadata.openGraph) {
      metadata.openGraph.images = [
        {
          url: caseStudy.image_url,
          width: 1200,
          height: 630,
          alt: title
        }
      ];
    }
    
    if (metadata.twitter) {
      metadata.twitter.images = [caseStudy.image_url];
    }
  }

  return metadata;
}

// Disable static generation for this page
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const cookieStore = cookies();
  const lang = (cookieStore.get('language')?.value as 'en' | 'it') || 'en';
  
  const caseStudy = await getCaseStudyBySlug(params.slug);
  if (!caseStudy) notFound();
  
  // Fetch related case studies
  const tags = caseStudy.tags || [];
  const industry = caseStudy.industry || '';
  const relatedCaseStudies = await getRelatedCaseStudies(caseStudy.id || '', tags, industry, 3, lang);
  
  return <CaseStudyClient caseStudy={caseStudy} relatedCaseStudies={relatedCaseStudies} />;
} 