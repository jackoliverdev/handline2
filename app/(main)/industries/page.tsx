import { Metadata } from "next";
import { IndustriesHero } from "@/components/website/industries/hero";
import { getAllIndustries } from "@/lib/industries-service";
import { SectorsSection } from "@/components/website/industries/components/SectorsSection";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "Industry Solutions | Hand Line",
  description: "Explore HandLine's tailored safety solutions for a wide range of industries, including manufacturing, construction, chemical processing, and more.",
};

// Disable static generation for this page
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function IndustriesPage() {
  const cookieStore = cookies();
  const lang = (cookieStore.get('language')?.value as 'en' | 'it') || 'en';
  const { data: industries = [] } = await getAllIndustries(lang);
  return (
    <main className="bg-brand-light dark:bg-background">
      <IndustriesHero />
      <SectorsSection industries={industries} />
    </main>
  );
} 