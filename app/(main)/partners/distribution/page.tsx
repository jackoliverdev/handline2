import { Metadata } from "next";
import { DistributionHero } from "@/components/website/partners/distribution/hero";
import { DistributionForm } from "@/components/website/partners/distribution/form";

export const metadata: Metadata = {
  title: "Become a Distributor | HandLine",
  description: "Join HandLine's global distribution network. Bring industry-leading safety solutions to your market.",
};

export default function DistributionPage() {
  return (
    <main className="flex flex-col min-h-screen">
      <DistributionHero />
      
      <section className="py-16 md:py-24 bg-[#F5EFE0]/80 dark:bg-transparent">
        <div className="container mx-auto px-4 md:px-6">
          <DistributionForm />
        </div>
      </section>
    </main>
  );
} 