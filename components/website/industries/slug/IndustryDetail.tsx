"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, Shield, Package, Mail, FileText } from "lucide-react";
import { useLanguage } from "@/lib/context/language-context";
import { localiseIndustry } from "@/lib/industries-service";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { IndustrySection } from "@/components/website/industries/IndustrySection";
import { RelatedProducts } from "@/components/website/products/slug/RelatedProducts";
import { motion } from "framer-motion";

export function IndustryDetail({ industry, relatedProducts }: { industry: any, relatedProducts: any[] }) {
  const { t, language } = useLanguage();
  const localisedIndustry = localiseIndustry(industry, language);

  // Use showcase description instead of the long description
  const mainDescription = localisedIndustry.showcase_description || localisedIndustry.description.split('\n\n')[0] || localisedIndustry.description;
  // Use features array if present
  const features = localisedIndustry.features && localisedIndustry.features.length > 0
    ? localisedIndustry.features
    : [];

  // Tags (optional, fallback to industry name)
  const tags = [localisedIndustry.industry_name];

  return (
    <main className="flex flex-col min-h-[100dvh] bg-brand-light dark:bg-background pt-8 md:pt-12">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="bg-grid-primary/[0.02] absolute inset-0 [mask-image:radial-gradient(white,transparent_85%)]" />
        <div className="absolute -top-1/3 right-0 -z-10 h-[600px] w-[600px] rounded-full bg-brand-primary/5 blur-[100px]" />
        <div className="absolute bottom-0 left-0 -z-10 h-[300px] w-[300px] rounded-full bg-brand-primary/10 blur-[100px]" />
      </div>

      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative w-full pt-20 pb-8 md:pt-28 md:pb-12"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Content with Image Overlay */}
          <div className="relative">
            {/* Featured Image with Overlay Content */}
            {localisedIndustry.image_url && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative aspect-[2/1] sm:aspect-[5/2] md:aspect-[3/1] w-full overflow-hidden rounded-2xl shadow-2xl"
              >
                <Image
                  src={localisedIndustry.image_url}
                  alt={localisedIndustry.industry_name}
                  fill
                  priority
                  className="object-cover transition-all duration-700 hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 70vw"
                />
                
                {/* Enhanced Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-brand-primary/20 via-transparent to-brand-primary/20" />
                
                {/* Back Button - Top Left of Image */}
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  className="absolute top-4 left-4 z-10"
                >
                  <Button variant="outline" size="sm" asChild className="bg-white/20 text-white border-white/30 hover:bg-white/30 hover:border-white/50 backdrop-blur-md shadow-lg font-medium transition-all duration-200 h-8 px-3">
                    <Link href="/industries" className="flex items-center gap-1.5 hover:text-brand-primary">
                      <ChevronLeft className="h-4 w-4" />
                      <span className="hidden sm:inline text-sm">{t('navbar.industries')}</span>
                    </Link>
                  </Button>
                </motion.div>

                {/* Category Badge - Top Right of Image */}
                {tags && tags.length > 0 && (
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="absolute top-4 right-4 z-10"
                  >
                    {tags.map((tag: string, index) => (
                      <motion.div
                        key={tag}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                      >
                        <Badge className="bg-white/20 text-white border-white/30 hover:bg-white/30 backdrop-blur-md shadow-lg font-medium h-8">
                          {tag}
                        </Badge>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
                
                {/* Content Overlay */}
                <div className="absolute inset-0 flex flex-col justify-between p-4 sm:p-6 md:p-8 lg:p-12">
                  {/* Top Spacer to create space from back button and category */}
                  <div className="flex-shrink-0 h-12 sm:h-16 md:h-20"></div>
                  
                  {/* Bottom Content */}
                  <div className="flex-shrink-0">
                    {/* Title */}
                    <motion.h1
                      initial={{ opacity: 0, y: 40 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.6 }}
                      className="text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-3 sm:mb-4 leading-tight"
                      style={{
                        textShadow: '0 4px 20px rgba(0,0,0,0.5), 0 2px 10px rgba(0,0,0,0.3)'
                      }}
                    >
                      {localisedIndustry.industry_name}
                    </motion.h1>

                    {/* Industry Description */}
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.7, delay: 0.8 }}
                      className="max-w-3xl mb-4 sm:mb-6"
                    >
                      <p className="text-sm sm:text-lg md:text-xl text-white/90 leading-relaxed backdrop-blur-sm">
                        {mainDescription}
                      </p>
                    </motion.div>

                    {/* Action Buttons */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 1.0 }}
                      className="flex flex-col sm:flex-row gap-3 sm:gap-4"
                    >
                      <Button
                        size="default"
                        className="bg-gradient-to-r from-brand-primary to-brand-primary hover:from-brand-primary/90 hover:to-brand-primary/90 text-white font-semibold px-6 py-2.5 sm:px-8 sm:py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border-0 text-sm sm:text-base"
                        asChild
                      >
                        <Link href="/contact">
                          {t('navbar.contact')}
                        </Link>
                      </Button>
                      <Button
                        variant="outline"
                        size="default"
                        className="bg-white/10 text-white border-white/30 hover:bg-white/20 hover:border-white/50 backdrop-blur-sm font-semibold px-6 py-2.5 sm:px-8 sm:py-3 rounded-xl text-sm sm:text-base"
                        asChild
                      >
                         <Link href="/products#product-grid">
                          {t('industries.viewSolutions')}
                        </Link>
                      </Button>
                    </motion.div>
                  </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-4 right-4 w-12 h-12 sm:w-20 sm:h-20 bg-white/5 rounded-full backdrop-blur-sm" />
                <div className="absolute bottom-4 left-4 w-8 h-8 sm:w-12 sm:h-12 bg-brand-primary/20 rounded-full backdrop-blur-sm" />
              </motion.div>
            )}

            {/* Fallback for no image */}
            {!localisedIndustry.image_url && (
              <div className="py-16 md:py-24 text-center">
                {/* Tags */}
                {tags && tags.length > 0 && (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="flex flex-wrap justify-center gap-2 mb-6"
                  >
                    {tags.map((tag: string, index) => (
                      <motion.div
                        key={tag}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                      >
                        <Badge variant="outline" className="bg-brand-primary/10 text-brand-primary hover:bg-brand-primary/20 border-brand-primary">
                          {tag}
                        </Badge>
                      </motion.div>
                    ))}
                  </motion.div>
                )}

                {/* Title */}
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.4 }}
                  className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-brand-dark dark:text-white mb-6 leading-tight"
                >
                  {localisedIndustry.industry_name}
                </motion.h1>

                {/* Industry Description */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="text-xl text-brand-secondary dark:text-gray-300 max-w-3xl mx-auto mb-8"
                >
                  <p>{mainDescription}</p>
                </motion.div>

                {/* Action Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  className="flex flex-wrap justify-center gap-4"
                >
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-brand-primary to-brand-primary hover:from-brand-primary/90 hover:to-brand-primary/90 text-white font-semibold px-8 py-3 rounded-xl"
                    asChild
                  >
                    <Link href="/contact">
                      {t('navbar.contact')}
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-brand-primary text-brand-primary hover:bg-brand-primary/10 font-semibold px-8 py-3 rounded-xl"
                    asChild
                  >
                     <Link href="/products#product-grid">
                      {t('industries.viewSolutions')}
                    </Link>
                  </Button>
                </motion.div>
              </div>
            )}
          </div>
        </div>
      </motion.section>

      {/* Content Section */}
      {(localisedIndustry.summary_content || localisedIndustry.sections || localisedIndustry.content) && (
        <section className="w-full pt-6 md:pt-8 pb-6 md:pb-8">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Industry Summary Section */}
            {localisedIndustry.summary_content && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mb-12"
              >
                <div className="bg-white dark:bg-black/50 rounded-2xl p-6 md:p-8 shadow-lg border border-gray-100 dark:border-gray-700/50 backdrop-blur-sm">
                  <h2 className="text-2xl md:text-3xl font-bold text-brand-dark dark:text-white mb-6">
                    {localisedIndustry.industry_name} Industry Overview
                  </h2>
                  
                  <div className="prose prose-gray dark:prose-invert max-w-none">
                    <p className="text-brand-secondary dark:text-gray-300 leading-relaxed text-lg mb-6">
                      {localisedIndustry.summary_content}
                    </p>
                    
                    {/* Summary Content Image */}
                    {localisedIndustry.summary_content_image_url && (
                      <div className="relative aspect-video w-full overflow-hidden rounded-lg shadow-lg">
                        <Image
                          src={localisedIndustry.summary_content_image_url}
                          alt={`${localisedIndustry.industry_name} industry overview`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Industry Sections */}
            {localisedIndustry.sections && localisedIndustry.sections.length > 0 ? (
              <div className="space-y-8">
                {localisedIndustry.sections.map((section, index) => (
                  <IndustrySection
                    key={index}
                    section={section}
                    index={index}
                  />
                ))}
              </div>
            ) : localisedIndustry.content && (
              // Fallback to old content structure if no new sections available
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mb-12"
              >
                <div className="bg-white dark:bg-black/50 rounded-2xl p-6 md:p-8 shadow-lg border border-gray-100 dark:border-gray-700/50 backdrop-blur-sm">
                  <div className="flex items-center gap-3 mb-6">
                    <motion.div 
                      initial={{ scale: 0.8, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2, duration: 0.4 }}
                      className="p-2 rounded-lg bg-gradient-to-br from-brand-primary to-brand-primary/80"
                    >
                      <FileText className="h-5 w-5 text-white" />
                    </motion.div>
                    <h2 className="text-2xl md:text-3xl font-bold text-brand-dark dark:text-white">
                      {t('industries.summary')}
                    </h2>
                  </div>
                  
                  <div className="prose prose-gray dark:prose-invert max-w-none">
                    <div className="text-brand-secondary dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
                      {localisedIndustry.content}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* No Content Fallback */}
            {!localisedIndustry.summary_content && !localisedIndustry.sections && !localisedIndustry.content && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center py-16"
              >
                <div className="bg-white dark:bg-black/50 rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-gray-700/50 backdrop-blur-sm">
                  <FileText className="h-12 w-12 text-brand-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-brand-dark dark:text-white mb-2">
                    {t('industries.summary')}
                  </h3>
                  <p className="text-brand-secondary dark:text-gray-300">
                    {t('industries.noSectionsAvailable')}
                  </p>
                </div>
              </motion.div>
            )}
          </div>
        </section>
      )}

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <RelatedProducts relatedProducts={relatedProducts} />
      )}

      {/* CTA Section */}
      <section className="w-full pt-6 pb-8 md:pt-6 md:pb-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden bg-gradient-to-br from-white via-gray-50/50 to-white dark:from-black/50 dark:via-gray-900/50 dark:to-black/50 border border-gray-100 dark:border-gray-700/50 rounded-2xl p-6 md:p-8 backdrop-blur-sm shadow-xl">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-grid-primary/[0.02] [mask-image:radial-gradient(white,transparent_70%)]" />
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-brand-primary/10 to-brand-primary/10 rounded-full blur-2xl" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-brand-primary/10 to-brand-primary/10 rounded-full blur-2xl" />
            
            {/* Content */}
            <div className="relative text-center max-w-3xl mx-auto">
              {/* Badge */}
              <div className="inline-flex items-center mb-4 rounded-full bg-gradient-to-r from-brand-primary/10 to-brand-primary/10 px-4 py-2 text-sm border border-brand-primary/20 backdrop-blur-sm">
                <Shield className="mr-2 h-4 w-4 text-brand-primary" />
                <span className="text-brand-dark dark:text-white font-medium">
                  {t('industryCta.badge')}
                </span>
              </div>

              {/* Title */}
              <h2 className="text-2xl md:text-3xl font-bold text-brand-dark dark:text-white mb-4 leading-relaxed">
                {t('industryCta.title')}{' '}
                <span className="text-brand-primary">
                  {localisedIndustry.industry_name}
                </span>
                {' '}?
              </h2>

              {/* Description */}
              <p className="text-brand-secondary dark:text-gray-300 max-w-2xl mx-auto mb-6">
                {t('industryCta.description').replace('{industry}', localisedIndustry.industry_name.toLowerCase())}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
                <Button 
                  variant="default" 
                  size="lg" 
                  className="bg-brand-primary hover:bg-brand-primary/90 text-white font-medium transition-all duration-300 hover:scale-105 hover:shadow-xl transform"
                  asChild
                >
                    <Link href="/products#product-grid" className="flex items-center gap-2">
                    <Package className="h-5 w-5" />
                    {t('industryCta.buttons.browseProducts')}
                  </Link>
                </Button>
                
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-brand-primary/30 text-brand-primary hover:bg-gray-700 hover:text-white hover:border-gray-700 transition-all duration-300"
                  asChild
                >
                  <Link href="/contact" className="flex items-center gap-2">
                    <Mail className="h-5 w-5" />
                    {t('industryCta.buttons.contactUs')}
                  </Link>
                </Button>
              </div>

              {/* Trust Indicator */}
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <p className="text-sm text-brand-secondary dark:text-gray-400">
                  {t('industryCta.trustIndicator').replace('{industry}', localisedIndustry.industry_name.toLowerCase())}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
} 