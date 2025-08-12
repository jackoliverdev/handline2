import { Metadata } from "next";
import { EsgHero } from "@/components/website/about/esg-hero";
import { EsgSections } from "@/components/website/about/esg-sections";
import { EsgCertification } from "@/components/website/about/esg-certification";
import { EsgCta } from "@/components/website/about/esg-cta";

export const metadata: Metadata = {
  title: "ESG Commitment | Hand Line",
  description: "Discover HandLine's commitment to Environmental, Social, and Governance principles. Learn about our sustainability initiatives and ethical business practices.",
};

export default function EsgPage() {
  return (
    <main className="flex flex-col min-h-screen">
      <EsgHero />
      
      <EsgSections />
      
      <EsgCertification />
      
      <EsgCta />
    </main>
  );
} 