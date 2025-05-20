import { Metadata } from "next";
import { PartnersHero } from "@/components/website/partners/hero";
import { PartnersCardGrid } from "@/components/website/partners/card-grid";

export const metadata: Metadata = {
  title: "Partner With Us | HandLine",
  description: "Explore partnership and distribution opportunities with HandLine. Join our global network of safety solution providers.",
};

export default function PartnersPage() {
  return (
    <main className="flex flex-col min-h-screen">
      <PartnersHero />
      <PartnersCardGrid />
    </main>
  );
} 