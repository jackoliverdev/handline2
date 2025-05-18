import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getIndustryBySlug, getRelatedProducts } from '@/lib/industries-service';
import { cookies } from 'next/headers';
import { IndustryDetail } from '@/components/website/industries/slug/IndustryDetail';

interface IndustryPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: IndustryPageProps): Promise<Metadata> {
  const cookieStore = cookies();
  const lang = (cookieStore.get('language')?.value as 'en' | 'it') || 'en';
  const industry = await getIndustryBySlug(params.slug, lang);
  if (!industry) {
    return {
      title: 'Industry Not Found',
    };
  }
  return {
    title: `${industry.industry_name} Safety Solutions | HandLine Company`,
    description: industry.description.split('\n\n')[0] || industry.description,
  };
}

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function IndustryPage({ params }: IndustryPageProps) {
  const cookieStore = cookies();
  const lang = (cookieStore.get('language')?.value as 'en' | 'it') || 'en';
  // Fetch raw industry (with all locale fields)
  const industry = await getIndustryBySlug(params.slug, lang);
  if (!industry) {
    notFound();
  }
  // Get related products if any are specified
  const relatedProducts = industry.related_products && industry.related_products.length > 0
    ? await getRelatedProducts(industry.related_products)
    : [];
  return (
    <IndustryDetail industry={industry} relatedProducts={relatedProducts} />
  );
} 