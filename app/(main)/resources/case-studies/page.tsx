import { Metadata } from "next";
import { CaseStudiesHero } from "@/components/website/case-studies/hero";

export const metadata: Metadata = {
  title: "Case Studies | HandLine",
  description: "Discover real-world examples of how HandLine safety solutions have helped businesses enhance protection and improve productivity.",
};

export default function CaseStudiesPage() {
  return (
    <main className="flex flex-col min-h-screen">
      <CaseStudiesHero language="en" />
      
      <section className="py-16 md:py-24 bg-[#F5EFE0]/80 dark:bg-transparent">
        <div className="container mx-auto px-4 md:px-6">
          <div id="case-studies-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" style={{ scrollMarginTop: "80px" }}>
            {/* Case study cards would go here */}
            <div className="flex items-center justify-center h-64 bg-white/50 dark:bg-gray-800/30 rounded-lg border border-brand-primary/10">
              <p className="text-brand-secondary dark:text-gray-300">Case studies coming soon</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
} 