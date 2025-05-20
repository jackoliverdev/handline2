import { Metadata } from "next";
import { ENResourceHero } from "@/components/website/en-resource/hero";

export const metadata: Metadata = {
  title: "EN Resource Centre | HandLine",
  description: "Comprehensive information on European safety standards for personal protective equipment and our product compliance.",
};

export default function ENResourceCentrePage() {
  return (
    <main className="flex flex-col min-h-screen">
      <ENResourceHero language="en" />
      
      <section className="py-16 md:py-24 bg-[#F5EFE0]/80 dark:bg-transparent">
        <div className="container mx-auto px-4 md:px-6">
          <div id="standards-list" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" style={{ scrollMarginTop: "80px" }}>
            {/* EN Standards content would go here */}
            <div className="flex items-center justify-center h-64 bg-white/50 dark:bg-gray-800/30 rounded-lg border border-brand-primary/10">
              <p className="text-brand-secondary dark:text-gray-300">EN standards information coming soon</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
} 