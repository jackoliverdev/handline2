import { Metadata } from "next";
import { PartnersHero } from "@/components/website/partners/hero";
import { PartnersCardGrid } from "@/components/website/partners/card-grid";

export const metadata: Metadata = {
  title: "Partner With Us | Hand Line",
  description: "Explore partnership and distribution opportunities with Hand Line. Join our global network of safety solution providers.",
};

export default function PartnersPage() {
  return (
    <main className="flex flex-col min-h-screen">
      <PartnersHero />
      <PartnersCardGrid />
    </main>
  );
} 