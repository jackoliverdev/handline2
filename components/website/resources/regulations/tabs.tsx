"use client";

import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter, useSearchParams } from "next/navigation";
import { useLanguage } from "@/lib/context/language-context";
import { ppeRegulationsContent } from "@/content/ppe-regulations";

export function RegulationsTabs() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { t, language } = useLanguage();

  const tabParam = searchParams?.get("tab") || "regulation";
  const validTabs = ["regulation", "categories", "standards"] as const;
  const tab = (validTabs as readonly string[]).includes(tabParam) ? tabParam : "regulation";

  const handleTabChange = (value: string) => {
    router.push(`/resources/ppe-standards/overview?tab=${value}`, { scroll: false });
  };

  const getLocalizedContent = (section: keyof typeof ppeRegulationsContent.en) => {
    const langCode = language as "en" | "it";
    return ppeRegulationsContent[langCode][section];
  };

  return (
    <div className="w-full bg-brand-light dark:bg-background pb-16">
      <div className="container py-4 md:py-6">
        <Tabs value={tab} onValueChange={handleTabChange} className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList className="h-auto w-full max-w-xl flex flex-col gap-2 p-2 rounded-md border border-brand-primary/10 dark:border-brand-primary/20 bg-white dark:bg-black/50 backdrop-blur-sm sm:grid sm:[grid-template-columns:1fr_1fr_1.6fr] sm:grid-cols-3 sm:gap-0 sm:p-1">
              <TabsTrigger
                value="regulation"
                className="w-full sm:w-auto data-[state=active]:bg-brand-primary data-[state=active]:text-white dark:data-[state=active]:text-white"
              >
                {t('standards.buckets.regulation.title')}
              </TabsTrigger>
              <TabsTrigger
                value="categories"
                className="w-full sm:w-auto data-[state=active]:bg-brand-primary data-[state=active]:text-white dark:data-[state=active]:text-white"
              >
                {t('standards.buckets.categories.title')}
              </TabsTrigger>
              <TabsTrigger
                value="standards"
                className="w-full sm:w-auto data-[state=active]:bg-brand-primary data-[state=active]:text-white dark:data-[state=active]:text-white"
              >
                {t('standards.buckets.standards.title')}
              </TabsTrigger>
            </TabsList>
          </div>

          {validTabs.map((key) => (
            <TabsContent key={key} value={key} className="max-w-4xl mx-auto">
              <div className="rounded-lg p-6 md:p-8 bg-white dark:bg-black/50 border border-brand-primary/10 dark:border-brand-primary/20 backdrop-blur-sm shadow-sm">
                <h2 className="text-3xl font-bold mb-2 text-brand-dark dark:text-white font-heading">{getLocalizedContent(key as any).title}</h2>
                <p className="text-brand-secondary dark:text-gray-400 mb-8">{getLocalizedContent(key as any).lastUpdated}</p>

                {getLocalizedContent(key as any).sections.map((section: any, index: number) => (
                  <div key={index} className="mb-8">
                    <h3 className="text-xl font-semibold mb-4 text-brand-dark dark:text-white font-heading">{section.title}</h3>
                    <div
                      dangerouslySetInnerHTML={{ __html: section.content }}
                      className="legal-content prose prose-slate dark:prose-invert max-w-none text-brand-secondary dark:text-gray-300 
                                 prose-p:mb-4 prose-p:leading-relaxed prose-p:text-base
                                 prose-ul:mb-4 prose-ul:pl-6 prose-li:mb-2 prose-li:leading-relaxed 
                                 prose-ol:mb-4 prose-ol:pl-6 prose-ol:list-decimal
                                 prose-strong:text-brand-dark dark:prose-strong:text-white prose-strong:font-semibold
                                 prose-h4:text-lg prose-h4:font-semibold prose-h4:text-brand-dark dark:prose-h4:text-white prose-h4:mb-3 prose-h4:mt-6"
                    />
                  </div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}


