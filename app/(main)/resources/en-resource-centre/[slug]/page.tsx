import { Metadata } from "next";
import { notFound } from "next/navigation";
import EnStandardClient from "@/components/website/en-resource/EnStandardClient";
import { getEnStandardBySlug, getRelatedEnStandards } from "@/lib/en-standard-service";
import type { Language } from "@/lib/context/language-context";

type EnStandardPageProps = {
  params: {
    slug: string;
  }
}

export async function generateMetadata({ params }: EnStandardPageProps): Promise<Metadata> {
  const standard = await getEnStandardBySlug(params.slug, "en");
  
  if (!standard) {
    return {
      title: "Standard Not Found | HandLine",
      description: "The requested standard could not be found."
    };
  }
  
  return {
    title: `${standard.standard_code} - ${standard.title} | HandLine`,
    description: standard.summary,
    openGraph: {
      title: `${standard.standard_code} - ${standard.title} | HandLine`,
      description: standard.summary,
      images: standard.image_url ? [standard.image_url] : [],
    },
  };
}

export default async function EnStandardPage({ params }: EnStandardPageProps) {
  const standard = await getEnStandardBySlug(params.slug, "en" as Language);
  
  if (!standard) {
    notFound();
  }
  
  // Get related standards
  const relatedStandards = await getRelatedEnStandards(
    standard.id || 0,
    standard.category,
    standard.tags || [],
    3,
    "en" as Language
  );
  
  return <EnStandardClient standard={standard} relatedStandards={relatedStandards} />;
} 