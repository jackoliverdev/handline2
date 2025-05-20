import { Metadata } from "next";
import { DeclarationsHero } from "@/components/website/declarations/hero";

export const metadata: Metadata = {
  title: "Compliance Declarations | HandLine",
  description: "Access official declarations of conformity for HandLine products certifying compliance with European health, safety, and environmental protection standards.",
};

export default function DeclarationsPage() {
  return (
    <main className="flex flex-col min-h-screen">
      <DeclarationsHero language="en" />
      
      <section className="py-16 md:py-24 bg-[#F5EFE0]/80 dark:bg-transparent">
        <div className="container mx-auto px-4 md:px-6">
          <div id="declarations-list" className="max-w-4xl mx-auto" style={{ scrollMarginTop: "80px" }}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Declaration cards would go here */}
              <div className="flex flex-col p-5 bg-white/50 dark:bg-gray-800/30 rounded-lg border border-brand-primary/10">
                <h3 className="text-lg font-semibold text-brand-dark dark:text-white mb-2">Heat Resistant Gloves</h3>
                <p className="text-sm text-brand-secondary dark:text-gray-300 mb-4">EN 407:2020 certification for thermal risks</p>
                <button className="mt-auto inline-flex items-center gap-2 text-brand-primary font-medium text-sm">
                  <span>View Declaration</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-download">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="7 10 12 15 17 10"></polyline>
                    <line x1="12" y1="15" x2="12" y2="3"></line>
                  </svg>
                </button>
              </div>
              
              <div className="flex flex-col p-5 bg-white/50 dark:bg-gray-800/30 rounded-lg border border-brand-primary/10">
                <h3 className="text-lg font-semibold text-brand-dark dark:text-white mb-2">Cut Resistant Series</h3>
                <p className="text-sm text-brand-secondary dark:text-gray-300 mb-4">EN 388:2016+A1:2018 certification for mechanical risks</p>
                <button className="mt-auto inline-flex items-center gap-2 text-brand-primary font-medium text-sm">
                  <span>View Declaration</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-download">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="7 10 12 15 17 10"></polyline>
                    <line x1="12" y1="15" x2="12" y2="3"></line>
                  </svg>
                </button>
              </div>
              
              <div className="flex flex-col p-5 bg-white/50 dark:bg-gray-800/30 rounded-lg border border-brand-primary/10">
                <h3 className="text-lg font-semibold text-brand-dark dark:text-white mb-2">Chemical Protection</h3>
                <p className="text-sm text-brand-secondary dark:text-gray-300 mb-4">EN ISO 374-1:2016+A1:2018 chemical protection certification</p>
                <button className="mt-auto inline-flex items-center gap-2 text-brand-primary font-medium text-sm">
                  <span>View Declaration</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-download">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="7 10 12 15 17 10"></polyline>
                    <line x1="12" y1="15" x2="12" y2="3"></line>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
} 