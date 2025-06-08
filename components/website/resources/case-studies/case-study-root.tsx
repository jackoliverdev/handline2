'use client';

import { CaseStudiesHero } from './hero';
import { CaseStudyGrid } from './grid';
import { useLanguage } from '@/lib/context/language-context';
import { motion } from 'framer-motion';
import { Award, Users, TrendingUp, Building, Star, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import type { CaseStudy } from '@/lib/case-studies-service';

export default function CaseStudyRoot({ caseStudies }: { caseStudies: CaseStudy[] }) {
  const { language, t } = useLanguage();

  // Get featured case study (first one with image)
  const featuredCaseStudy = caseStudies.find(cs => cs.image_url || cs.featured_image_url);

  return (
    <main className="flex flex-col min-h-[100dvh]">
      <CaseStudiesHero language={language} />
      
      {/* Featured Case Study Section */}
      {featuredCaseStudy && (
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
                  Featured Case Study
                </span>
              </motion.div>
              <h2 className="text-3xl md:text-4xl font-bold text-brand-dark dark:text-white mb-4">
                Success in Action
              </h2>
              <p className="text-lg text-brand-secondary dark:text-gray-300 max-w-2xl mx-auto">
                Discover how we've helped businesses transform their operations and achieve remarkable results.
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
                    {(featuredCaseStudy.title_locales && featuredCaseStudy.title_locales[language]) || featuredCaseStudy.title}
                  </h3>
                  <p className="text-brand-secondary dark:text-gray-300 leading-relaxed">
                    {(featuredCaseStudy.summary_locales && featuredCaseStudy.summary_locales[language]) || featuredCaseStudy.summary}
                  </p>
                </div>
                
                {featuredCaseStudy.client_name && (
                  <div className="flex items-center space-x-4 p-4 bg-white dark:bg-black/50 rounded-lg border border-brand-primary/10">
                    <Building className="h-8 w-8 text-brand-primary" />
                    <div>
                      <div className="font-semibold text-brand-dark dark:text-white">
                        {(featuredCaseStudy.client_name_locales && featuredCaseStudy.client_name_locales[language]) || featuredCaseStudy.client_name}
                      </div>
                      <div className="text-sm text-brand-secondary dark:text-gray-300">
                        {(featuredCaseStudy.industry_locales && featuredCaseStudy.industry_locales[language]) || featuredCaseStudy.industry}
                      </div>
                    </div>
                  </div>
                )}
                
                <Button asChild className="group bg-gradient-to-r from-brand-primary to-brand-primary hover:from-brand-primary/90 hover:to-brand-primary/90">
                  <Link href={`/resources/case-studies/${featuredCaseStudy.slug}`} className="inline-flex items-center">
                    Read Full Case Study
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
                    src={featuredCaseStudy.featured_image_url || featuredCaseStudy.image_url || ''}
                    alt={(featuredCaseStudy.title_locales && featuredCaseStudy.title_locales[language]) || featuredCaseStudy.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>
              </motion.div>
            </div>
          </div>
        </motion.section>
      )}

      {/* Case Studies Grid */}
      <div id="case-study-grid" className="bg-[#F5EFE0]/80 dark:bg-transparent py-12">
        <CaseStudyGrid caseStudies={caseStudies} language={language} />
      </div>
    </main>
  );
} 