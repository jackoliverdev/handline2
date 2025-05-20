import { Metadata } from "next";
import { AboutHero } from "@/components/website/about/hero";
import { CompanyHistory } from "@/components/website/about/company-history";
import { Values } from "@/components/website/about/values";
import { Certifications } from "@/components/website/about/certifications";
import { Mission } from "@/components/website/about/mission";
import { Different } from "@/components/website/about/different";

export const metadata: Metadata = {
  title: "About HandLine | Italian Safety Glove Manufacturer",
  description: "Discover HandLine's 40+ year history of designing and manufacturing premium safety gloves and protective equipment for industrial applications across Europe.",
};

export default function AboutPage() {
  return (
    <main className="flex flex-col min-h-screen">
      <AboutHero />
      
      <Mission />

      <Values />
      
      <Different />
      
      <CompanyHistory />
      
      <Certifications />
    </main>
  );
} 