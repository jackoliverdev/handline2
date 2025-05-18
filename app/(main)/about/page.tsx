import { Metadata } from "next";
import { AboutHero } from "@/components/website/about/hero";
import { CompanyHistory } from "@/components/website/about/company-history";
import { MissionValues } from "@/components/website/about/mission-values";
import { Team } from "@/components/website/about/team";

export const metadata: Metadata = {
  title: "About HandLine | Italian Safety Glove Manufacturer",
  description: "Discover HandLine's 40+ year history of designing and manufacturing premium safety gloves and protective equipment for industrial applications across Europe.",
};

export default function AboutPage() {
  return (
    <main className="flex flex-col min-h-screen">
      <AboutHero />
      
      <CompanyHistory />
      
      <MissionValues />
      
      <Team />
    </main>
  );
} 