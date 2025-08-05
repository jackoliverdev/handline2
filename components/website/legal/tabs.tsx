"use client";

import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter, useSearchParams } from "next/navigation";
import { useLanguage } from "@/lib/context/language-context";
import { legalContent } from "@/content/legal";

export function LegalTabs() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { t, language } = useLanguage();
  const tab = searchParams?.get("tab") || "terms";

  const handleTabChange = (value: string) => {
    router.push(`/legal?tab=${value}`);
  };

  // Get content based on current language
  const getLocalizedContent = (section: keyof typeof legalContent.en) => {
    const langCode = language as 'en' | 'it';
    return legalContent[langCode][section];
  };

  return (
    <div className="w-full bg-brand-light dark:bg-background pb-16">
      <div className="container py-4 md:py-6">
        <Tabs defaultValue={tab} onValueChange={handleTabChange} className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList className="grid w-full max-w-lg grid-cols-3 border border-brand-primary/10 dark:border-brand-primary/20 bg-white dark:bg-black/50 backdrop-blur-sm">
              <TabsTrigger 
                value="terms" 
                className="data-[state=active]:bg-brand-primary data-[state=active]:text-white dark:data-[state=active]:text-white"
              >
                {t('legal.tabs.terms')}
              </TabsTrigger>
              <TabsTrigger 
                value="privacy"
                className="data-[state=active]:bg-brand-primary data-[state=active]:text-white dark:data-[state=active]:text-white"
              >
                {t('legal.tabs.privacy')}
              </TabsTrigger>
              <TabsTrigger 
                value="cookies"
                className="data-[state=active]:bg-brand-primary data-[state=active]:text-white dark:data-[state=active]:text-white"
              >
                {t('legal.tabs.cookies')}
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="terms" className="max-w-4xl mx-auto">
            <div className="rounded-lg p-6 bg-white dark:bg-black/50 border border-brand-primary/10 dark:border-brand-primary/20 backdrop-blur-sm shadow-sm">
              <h2 className="text-3xl font-bold mb-2 text-brand-dark dark:text-white font-heading">{t('legal.content.terms.title')}</h2>
              <p className="text-brand-secondary dark:text-gray-400 mb-8">{t('legal.content.terms.lastUpdated')}</p>
              
              {getLocalizedContent('terms').sections.map((section, index) => (
                <div key={index} className="mb-8">
                  <h3 className="text-xl font-semibold mb-4 text-brand-dark dark:text-white font-heading">{section.title}</h3>
                  <div 
                    dangerouslySetInnerHTML={{ __html: section.content }} 
                    className="prose prose-slate dark:prose-invert max-w-none text-brand-secondary dark:text-gray-300" 
                  />
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="privacy" className="max-w-4xl mx-auto">
            <div className="rounded-lg p-6 bg-white dark:bg-black/50 border border-brand-primary/10 dark:border-brand-primary/20 backdrop-blur-sm shadow-sm">
              <h2 className="text-3xl font-bold mb-2 text-brand-dark dark:text-white font-heading">{t('legal.content.privacy.title')}</h2>
              <p className="text-brand-secondary dark:text-gray-400 mb-8">{t('legal.content.privacy.lastUpdated')}</p>
              
              {getLocalizedContent('privacy').sections.map((section, index) => (
                <div key={index} className="mb-8">
                  <h3 className="text-xl font-semibold mb-4 text-brand-dark dark:text-white font-heading">{section.title}</h3>
                  <div 
                    dangerouslySetInnerHTML={{ __html: section.content }} 
                    className="prose prose-slate dark:prose-invert max-w-none text-brand-secondary dark:text-gray-300" 
                  />
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="cookies" className="max-w-4xl mx-auto">
            <div className="rounded-lg p-6 bg-white dark:bg-black/50 border border-brand-primary/10 dark:border-brand-primary/20 backdrop-blur-sm shadow-sm">
              <h2 className="text-3xl font-bold mb-2 text-brand-dark dark:text-white font-heading">{t('legal.content.cookies.title')}</h2>
              <p className="text-brand-secondary dark:text-gray-400 mb-8">{t('legal.content.cookies.lastUpdated')}</p>
              
              {getLocalizedContent('cookies').sections.map((section, index) => (
                <div key={index} className="mb-8">
                  <h3 className="text-xl font-semibold mb-4 text-brand-dark dark:text-white font-heading">{section.title}</h3>
                  <div 
                    dangerouslySetInnerHTML={{ __html: section.content }} 
                    className="prose prose-slate dark:prose-invert max-w-none text-brand-secondary dark:text-gray-300" 
                  />
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
} 