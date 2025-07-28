"use client";
import { useLanguage } from "@/lib/context/language-context";
import { IndustryCard } from "@/components/website/industries/industry-card";
import { localiseIndustry } from "@/lib/industries-service";
import { motion } from 'framer-motion';
import { Star, ArrowRight, Building, Factory } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function SectorsSection({ industries }: { industries: any[] }) {
  const { t, language } = useLanguage();
  
  // Localise industries on the client
  const localisedIndustries = industries.map(ind => localiseIndustry(ind, language));
  
  // Get featured industry (first one with is_featured = true)
  const featuredIndustry = localisedIndustries.find(industry => industry.is_featured);

  return (
    <>
      {/* Featured Industry Section */}
      {featuredIndustry && (
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="py-16 bg-gradient-to-br from-brand-primary/5 via-transparent to-brand-primary/5"
        >
          <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center mb-4 rounded-full bg-gradient-to-r from-brand-primary/10 to-brand-primary/10 px-6 py-2 text-sm border border-brand-primary/20 backdrop-blur-sm"
              >
                <Star className="mr-2 h-4 w-4 text-brand-primary" />
                <span className="text-brand-dark dark:text-white font-medium">
                  {t('industries.spotlight.badge')}
                </span>
              </motion.div>
              <h2 className="text-3xl md:text-4xl font-bold text-brand-dark dark:text-white mb-4">
                {t('industries.spotlight.title')}
              </h2>
              <p className="text-lg text-brand-secondary dark:text-gray-300 max-w-2xl mx-auto">
                {t('industries.spotlight.description')}
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="text-2xl font-bold text-brand-dark dark:text-white mb-3">
                    {featuredIndustry.industry_name}
                  </h3>
                  <p className="text-brand-secondary dark:text-gray-300 leading-relaxed">
                    {featuredIndustry.showcase_description || featuredIndustry.description}
                  </p>
                </div>
                
                <div className="flex items-center space-x-4 p-4 bg-white dark:bg-black/50 rounded-lg border border-brand-primary/10">
                  <Factory className="h-8 w-8 text-brand-primary" />
                  <div>
                    <div className="font-semibold text-brand-dark dark:text-white">
                      {featuredIndustry.industry_name}
                    </div>
                    <div className="text-sm text-brand-secondary dark:text-gray-300">
                      {t('industries.spotlight.subtitle')}
                    </div>
                  </div>
                </div>
                
                <Button asChild className="group bg-gradient-to-r from-brand-primary to-brand-primary hover:from-brand-primary/90 hover:to-brand-primary/90">
                  <Link href={`/industries/${featuredIndustry.slug}`} className="inline-flex items-center">
                    {t('industries.spotlight.cta')}
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative"
              >
                <div className="aspect-[4/3] rounded-xl overflow-hidden shadow-xl">
                  <img
                    src={featuredIndustry.feature_image_url || featuredIndustry.image_url || ''}
                    alt={featuredIndustry.industry_name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>
              </motion.div>
            </div>
          </div>
        </motion.section>
      )}

      {/* Sectors Grid Section */}
      {/* 
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {localisedIndustries.map((industry, index) => (
              <IndustryCard key={industry.id} industry={industry} t={t} index={index} />
            ))}
          </div>
        </div>
      </section>
      */}
    </>
  );
} 