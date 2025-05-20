import { Metadata } from "next";
import { PartnershipsHero } from "@/components/website/partners/partnerships/hero";
import { PartnershipForm } from "@/components/website/partners/partnerships/form";

export const metadata: Metadata = {
  title: "Strategic Partnerships | HandLine",
  description: "Explore partnership opportunities with HandLine. Build strategic alliances for innovative safety solutions.",
};

export default function PartnershipsPage() {
  return (
    <main className="flex flex-col min-h-screen">
      <PartnershipsHero />
      
      <section className="py-16 md:py-24 bg-[#F5EFE0]/80 dark:bg-transparent">
        <div className="container mx-auto px-4 md:px-6">
          <PartnershipForm />
        </div>
      </section>
    </main>
  );
} 