"use client";
import { useLanguage } from "@/lib/context/language-context";
import { IndustryCard } from "@/components/website/industries/industry-card";
import { localiseIndustry } from "@/lib/industries-service";

export function SectorsSection({ industries }: { industries: any[] }) {
  const { t, language } = useLanguage();
  // Localise industries on the client
  const localisedIndustries = industries.map(ind => localiseIndustry(ind, language));
  return (
    <section id="industry-sectors" className="py-16">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-brand-dark dark:text-white mb-4">
            {t('industries.sectorsWeServe')}
          </h2>
          <p className="max-w-2xl mx-auto text-brand-secondary dark:text-gray-300">
            {t('industries.sectorsDescription')}
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {localisedIndustries.map((industry) => (
            <IndustryCard key={industry.id} industry={industry} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
} 