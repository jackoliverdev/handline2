"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, Shield } from "lucide-react";
import { useLanguage } from "@/lib/context/language-context";
import { localiseIndustry } from "@/lib/industries-service";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProductCard } from "@/components/website/products/product-card";
import { MarkdownContent } from "@/components/website/blog/markdown-content";

export function IndustryDetail({ industry, relatedProducts }: { industry: any, relatedProducts: any[] }) {
  const { t, language } = useLanguage();
  const localisedIndustry = localiseIndustry(industry, language);

  // Extract main description
  const mainDescription = localisedIndustry.description.split('\n\n')[0] || localisedIndustry.description;
  // Use features array if present
  const features = localisedIndustry.features && localisedIndustry.features.length > 0
    ? localisedIndustry.features
    : [];

  // Tags (optional, fallback to industry name)
  const tags = [localisedIndustry.industry_name];

  return (
    <main className="flex flex-col min-h-[100dvh] bg-[#F5EFE0]/80 dark:bg-transparent pt-8 md:pt-12">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="bg-grid-primary/[0.02] absolute inset-0 [mask-image:radial-gradient(white,transparent_85%)]" />
        <div className="absolute -top-1/3 right-0 -z-10 h-[600px] w-[600px] rounded-full bg-brand-primary/5 blur-[100px]" />
        <div className="absolute bottom-0 left-0 -z-10 h-[300px] w-[300px] rounded-full bg-brand-primary/10 blur-[100px]" />
      </div>

      {/* Hero Section */}
      <section className="relative w-full pt-4 pb-8 md:py-12">
        <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-2 border-b border-brand-primary/10">
          {/* Back Button */}
          <div className="mb-6">
            <Button variant="outline" size="sm" asChild className="bg-[#F5EFE0]/90 hover:bg-[#F5EFE0] dark:bg-transparent dark:hover:bg-black/20 border-brand-primary/20 hover:border-brand-primary/40 dark:border-brand-primary/30 dark:hover:border-brand-primary/50 transition-all duration-200">
              <Link href="/industries" className="flex items-center gap-1.5 text-brand-dark dark:text-gray-200 hover:text-brand-primary dark:hover:text-brand-primary">
                <ChevronLeft className="h-4 w-4 text-brand-primary" />
                {t('navbar.industries')}
              </Link>
            </Button>
          </div>

          <div className="space-y-6">
            {/* Tags */}
            {tags && tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {tags.map((tag: string) => (
                  <Badge key={tag} variant="outline" className="bg-brand-primary/10 text-brand-primary hover:bg-brand-primary/20 border-brand-primary">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}

            {/* Featured Image */}
            {localisedIndustry.image_url && (
              <div className="relative aspect-[21/9] w-full overflow-hidden rounded-xl">
                <Image
                  src={localisedIndustry.image_url}
                  alt={localisedIndustry.industry_name}
                  fill
                  priority
                  className="object-cover transition-all duration-500 hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 70vw"
                />
                <div className="absolute inset-0 rounded-xl border border-brand-primary/10 bg-gradient-to-t from-background/50 via-transparent to-transparent" />
              </div>
            )}

            {/* Title */}
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-brand-dark dark:text-white">
              {localisedIndustry.industry_name}
            </h1>

            {/* Industry Description */}
            <div className="text-lg text-brand-secondary dark:text-gray-300 max-w-3xl">
              <p>{mainDescription}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      {localisedIndustry.content && (
        <section className="w-full pt-0 md:pt-0 pb-12 md:pb-16">
          <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div>
              <MarkdownContent content={localisedIndustry.content} />
            </div>
          </div>
        </section>
      )}

      {/* Features Section - Display only if content is NOT available */}
      {!localisedIndustry.content && features.length > 0 && (
        <section className="w-full py-8 md:py-12">
          <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl md:text-3xl font-bold text-brand-dark dark:text-white mb-6">
              {t('industries.keyFeatures')}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-start p-4 rounded-lg bg-white/50 dark:bg-black/20 border border-brand-primary/10 backdrop-blur-sm"
                >
                  <Shield className="h-5 w-5 text-brand-primary mr-3 mt-0.5 flex-shrink-0" />
                  <p className="text-brand-secondary dark:text-gray-300">{feature}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="py-8 md:py-10">
          <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-4">
              <h2 className="text-2xl font-bold mb-2 text-brand-dark dark:text-white">{t('relatedProducts.title')}</h2>
              <p className="text-brand-secondary dark:text-gray-300">
                {t('industries.keyFeatures')} {localisedIndustry.industry_name}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((product) => {
                const name = product.name_locales?.[language] || product.name;
                const description = product.description_locales?.[language] || product.description;
                const short_description = product.short_description_locales?.[language] || product.short_description;
                const category = product.category_locales?.[language] || product.category;
                const sub_category = product.sub_category_locales?.[language] || product.sub_category;
                const features = product.features_locales?.[language] || product.features;
                const applications = product.applications_locales?.[language] || product.applications;
                const industries = product.industries_locales?.[language] || product.industries;
                return (
                  <ProductCard
                    key={product.id}
                    product={{
                      ...product,
                      name,
                      description,
                      short_description,
                      category,
                      sub_category,
                      features,
                      applications,
                      industries,
                    }}
                  />
                );
              })}
            </div>

            <div className="mt-8 text-center">
              <Button
                variant="outline"
                size="lg"
                className="border-brand-primary text-brand-primary hover:bg-brand-primary/10"
                asChild
              >
                <Link href="/products">
                  {t('products.browseTitle')}
                </Link>
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="w-full py-8 md:py-12">
        <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-brand-primary/10 border border-brand-primary/20 rounded-xl p-6 md:p-8 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-brand-dark dark:text-white mb-4">
              {t('industries.viewSolutions')}
            </h2>
            <p className="text-brand-secondary dark:text-gray-300 max-w-2xl mx-auto mb-6">
              {t('industries.sectorsDescription')}
            </p>
            <Button
              variant="default"
              size="lg"
              className="bg-brand-primary text-white hover:bg-brand-primary/90"
              asChild
            >
              <Link href="/contact">
                {t('navbar.contact')}
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
} 