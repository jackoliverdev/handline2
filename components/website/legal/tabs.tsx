"use client";

import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter, useSearchParams } from "next/navigation";
import { legalContent } from "@/content/legal";

export function LegalTabs() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tab = searchParams?.get("tab") || "terms";

  const handleTabChange = (value: string) => {
    router.push(`/legal?tab=${value}`);
  };

  return (
    <div className="w-full bg-brand-light dark:bg-background pb-16">
      <div className="container py-8 md:py-12">
        <Tabs defaultValue={tab} onValueChange={handleTabChange} className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList className="grid w-full max-w-lg grid-cols-3 border border-brand-primary/10 dark:border-brand-primary/20 bg-white/70 dark:bg-gray-800/30 backdrop-blur-sm">
              <TabsTrigger 
                value="terms" 
                className="data-[state=active]:bg-brand-primary data-[state=active]:text-white dark:data-[state=active]:text-white"
              >
                Terms of Service
              </TabsTrigger>
              <TabsTrigger 
                value="privacy"
                className="data-[state=active]:bg-brand-primary data-[state=active]:text-white dark:data-[state=active]:text-white"
              >
                Privacy Policy
              </TabsTrigger>
              <TabsTrigger 
                value="cookies"
                className="data-[state=active]:bg-brand-primary data-[state=active]:text-white dark:data-[state=active]:text-white"
              >
                Cookie Policy
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="terms" className="max-w-4xl mx-auto">
            <div className="rounded-lg p-6 bg-[#F5EFE0]/80 dark:bg-transparent border border-brand-primary/10 dark:border-brand-primary/20 backdrop-blur-sm shadow-sm">
              <h2 className="text-3xl font-bold mb-2 text-brand-dark dark:text-white font-heading">{legalContent.terms.title}</h2>
              <p className="text-brand-secondary dark:text-gray-400 mb-8">{legalContent.terms.lastUpdated}</p>
              
              {legalContent.terms.sections.map((section, index) => (
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
            <div className="rounded-lg p-6 bg-[#F5EFE0]/80 dark:bg-transparent border border-brand-primary/10 dark:border-brand-primary/20 backdrop-blur-sm shadow-sm">
              <h2 className="text-3xl font-bold mb-2 text-brand-dark dark:text-white font-heading">{legalContent.privacy.title}</h2>
              <p className="text-brand-secondary dark:text-gray-400 mb-8">{legalContent.privacy.lastUpdated}</p>
              
              {legalContent.privacy.sections.map((section, index) => (
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
            <div className="rounded-lg p-6 bg-[#F5EFE0]/80 dark:bg-transparent border border-brand-primary/10 dark:border-brand-primary/20 backdrop-blur-sm shadow-sm">
              <h2 className="text-3xl font-bold mb-2 text-brand-dark dark:text-white font-heading">{legalContent.cookies.title}</h2>
              <p className="text-brand-secondary dark:text-gray-400 mb-8">{legalContent.cookies.lastUpdated}</p>
              
              {legalContent.cookies.sections.map((section, index) => (
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