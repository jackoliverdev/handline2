import { Metadata } from "next";
import { notFound } from "next/navigation";
import { cookies } from 'next/headers';
import EnStandardClient from "@/components/website/resources/en-resource/EnStandardClient";
import { getEnStandardBySlug, getRelatedEnStandards } from "@/lib/en-standard-service";
import type { Language } from "@/lib/context/language-context";

type EnStandardPageProps = {
  params: {
    slug: string;
  }
}

export async function generateMetadata({ params }: EnStandardPageProps): Promise<Metadata> {
  const cookieStore = cookies();
  const lang = (cookieStore.get('language')?.value as 'en' | 'it') || 'en';
  const standard = await getEnStandardBySlug(params.slug, lang as Language);
  
  if (!standard) {
    return {
      title: lang === 'it' ? 'Standard non trovato' : 'Standard Not Found | HandLine',
      description: lang === 'it' ? 'Lo standard richiesto non è stato trovato.' : 'The requested standard could not be found.'
    };
  }
  
  const hostname = process.env.NEXT_PUBLIC_SITE_URL || 'https://handline2.vercel.app';
  const url = `${hostname}/resources/en-resource-centre/${params.slug}`;
  
  // Get localised content
  const title = standard.title_locales?.[lang] || standard.title;
  const summary = standard.summary_locales?.[lang] || standard.summary;
  const category = standard.category_locales?.[lang] || standard.category;
  const tags = standard.tags_locales?.[lang] || standard.tags || [];
  
  // Base metadata object
  const metadata: Metadata = {
    title: `${standard.standard_code} - ${title} | HandLine`,
    description: summary,
    openGraph: {
      title: `${standard.standard_code} - ${title}`,
      description: summary,
      url: url,
      siteName: 'HandLine Safety Solutions',
      locale: lang === 'it' ? 'it_IT' : 'en_GB',
      type: 'article',
      tags: [...tags, category, 'EN Standards', 'Safety Standards']
    },
    twitter: {
      card: 'summary_large_image',
      title: `${standard.standard_code} - ${title}`,
      description: summary,
    }
  };
  
  // Only add images if there's an image_url available
  if (standard.image_url) {
    if (metadata.openGraph) {
      metadata.openGraph.images = [
        {
          url: standard.image_url,
          width: 1200,
          height: 630,
          alt: title
        }
      ];
    }
    
    if (metadata.twitter) {
      metadata.twitter.images = [standard.image_url];
    }
  }
  
  return metadata;
}

// Disable static generation for this page
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function EnStandardPage({ params }: EnStandardPageProps) {
  const cookieStore = cookies();
  const lang = (cookieStore.get('language')?.value as 'en' | 'it') || 'en';
  const standard = await getEnStandardBySlug(params.slug, lang as Language);
  
  if (!standard) {
    notFound();
  }
  
  // Get related standards
  const relatedStandards = await getRelatedEnStandards(
    standard.id || 0,
    standard.category,
    standard.tags || [],
    3,
    lang as Language
  );
  
  return <EnStandardClient standard={standard} relatedStandards={relatedStandards} />;
} 