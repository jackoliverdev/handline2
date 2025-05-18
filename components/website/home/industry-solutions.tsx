"use client";

import { useEffect, useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ChevronRight, Shield, Factory } from "lucide-react";
import { getAllIndustries, Industry } from "@/lib/industries-service";
import { useLanguage } from "@/lib/context/language-context";

export const IndustrySolutions = () => {
  const [industries, setIndustries] = useState<Industry[]>([]);
  const [loading, setLoading] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { t, language } = useLanguage();
  
  useEffect(() => {
    const loadIndustries = async () => {
      try {
        setLoading(true);
        const { data } = await getAllIndustries(language);
        // Take only the first 4 industries for display
        setIndustries(data.slice(0, 4));
      } catch (error) {
        console.error("Error loading industries:", error);
      } finally {
        setLoading(false);
      }
    };
    
    loadIndustries();
  }, [language]); // Add language as a dependency
  
  // Get the first paragraph of the description for a summary
  const getShortDescription = (industry: Industry) => {
    // If content is available, use that for a better summary
    if (industry.content) {
      // Extract the first paragraph after a heading or the first paragraph overall
      const contentParagraphs = industry.content.split('\n\n');
      // Look for the first paragraph that's not a heading
      for (const paragraph of contentParagraphs) {
        if (!paragraph.startsWith('#') && paragraph.trim().length > 0) {
          return paragraph.length > 100 
            ? paragraph.substring(0, 100) + '...' 
            : paragraph;
        }
      }
    }
    
    // Fall back to description if content is not available
    const firstParagraph = industry.description.split('\n\n')[0];
    return firstParagraph.length > 100 
      ? firstParagraph.substring(0, 100) + '...' 
      : firstParagraph;
  };

  return (
    <section className="pt-16 pb-24 sm:py-24 bg-brand-light dark:bg-background">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col items-center mb-16 text-center">
          <div>
            <div className="inline-flex items-center rounded-full bg-white/80 dark:bg-black/60 px-3 py-1 text-xs sm:text-sm border border-[#F28C38] backdrop-blur-sm mb-4">
              <Factory className="mr-1.5 h-3 w-3 sm:mr-2 sm:h-4 sm:w-4 text-[#F28C38]" />
              <span className="text-brand-dark dark:text-white font-medium font-heading">
                {t('industrySolutions.badge')}
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-brand-dark dark:text-white mb-4 font-heading">
              {t('industrySolutions.title')}
            </h2>
            <p className="max-w-2xl text-lg text-brand-secondary dark:text-gray-300 mx-auto">
              {t('industrySolutions.description')}
            </p>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center min-h-[300px]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-primary"></div>
          </div>
        ) : industries.length === 0 ? (
          <div className="text-center py-16 border border-brand-primary/10 dark:border-brand-primary/20 rounded-xl bg-white/50 dark:bg-gray-800/30">
            <p className="text-lg text-brand-secondary dark:text-gray-300">{t('industrySolutions.noIndustries')}</p>
          </div>
        ) : (
          <div 
            ref={scrollContainerRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {industries.map((industry) => (
              <div key={industry.id}>
                <Link href={`/industries/${industry.slug}`}>
                  <Card className="h-full overflow-hidden group hover:shadow-md transition-all duration-300 border border-brand-primary/10 dark:border-brand-primary/20 bg-[#F5EFE0]/80 dark:bg-transparent rounded-xl backdrop-blur-sm dark:backdrop-blur-none">
                    <div className="relative h-48 overflow-hidden">
                      {industry.image_url ? (
                        <Image
                          src={industry.image_url}
                          alt={industry.industry_name}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-gray-100 dark:bg-gray-800">
                          <Shield className="h-16 w-16 text-gray-400 dark:text-gray-500" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-xl font-bold text-white mb-1 font-heading">{industry.industry_name}</h3>
                      </div>
                    </div>
                    <CardContent className="p-5">
                      <p className="text-brand-secondary dark:text-gray-300 mb-4 line-clamp-3">
                        {getShortDescription(industry)}
                      </p>
                      <div className="flex items-center text-brand-primary font-medium group-hover:text-brand-primary/80">
                        <span>{t('industrySolutions.learnMore')}</span>
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}; 