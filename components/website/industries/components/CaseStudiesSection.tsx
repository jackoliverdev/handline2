"use client";
import { useLanguage } from "@/lib/context/language-context";
import { CaseStudy as CaseStudyComponent } from "@/components/website/industries/case-study";
import { Separator } from "@/components/ui/separator";

export function CaseStudiesSection({ caseStudies }: { caseStudies: any[] }) {
  const { t } = useLanguage();
  return (
    <>
      <Separator className="border-t border-brand-primary/10 dark:border-brand-primary/20" />
      <section id="case-studies" className="py-8 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-brand-dark dark:text-white mb-2 sm:mb-4">
              {t('industries.successStories')}
            </h2>
            <p className="max-w-2xl mx-auto text-sm sm:text-base text-brand-secondary dark:text-gray-300">
              {t('industries.successStoriesDescription')}
            </p>
          </div>
          <div className="space-y-2 sm:space-y-4">
            {caseStudies.map((caseStudy, index) => (
              <CaseStudyComponent 
                key={caseStudy.id} 
                caseStudy={caseStudy} 
                isEven={index % 2 !== 0}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
} 