"use client";
import React from 'react';
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/lib/context/language-context";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { ChevronLeft, Flame, Scissors, User2, Mail, Download, ListChecks, ChevronRight, Shield, Home, Package } from "lucide-react";
import { ProductImageGallery } from "@/components/website/products/product-image-gallery";
import { ProductCard } from "@/components/website/products/product-card";
import { SampleModal } from "@/components/website/products/sample-modal";

export function ProductDetail({ product, relatedProducts }: { product: any, relatedProducts: any[] }) {
  const { t, language } = useLanguage();
  
  // Localise product fields
  const name = product.name_locales?.[language] || product.name;
  const description = product.description_locales?.[language] || product.description;
  const short_description = product.short_description_locales?.[language] || product.short_description;
  const category = product.category_locales?.[language] || product.category;
  const sub_category = product.sub_category_locales?.[language] || product.sub_category;
  const features = product.features_locales?.[language] || product.features;
  const applications = product.applications_locales?.[language] || product.applications;
  const industries = product.industries_locales?.[language] || product.industries;
  // Check if the product is new (created within the last 30 days)
  const isNew = new Date(product.created_at).getTime() > Date.now() - (30 * 24 * 60 * 60 * 1000);
  const hasRelatedProducts = relatedProducts && relatedProducts.length > 0;
  const [isSampleModalOpen, setIsSampleModalOpen] = React.useState(false);

  return (
    <main className="bg-brand-light dark:bg-background min-h-screen pt-16">
      {/* Breadcrumb */}
      <div className="bg-white/50 dark:bg-black/30 border-b border-brand-primary/10 dark:border-brand-primary/20 mt-6 backdrop-blur-sm">
        <div className="container py-4">
          <nav className="flex items-center space-x-2 text-sm">
            <Link 
              href="/" 
              className="inline-flex items-center gap-1.5 text-brand-secondary hover:text-brand-primary dark:text-gray-400 dark:hover:text-brand-primary transition-colors duration-200 group"
            >
              <Home className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
              <span className="font-medium">Home</span>
            </Link>
            <ChevronRight className="h-4 w-4 text-brand-primary/60" />
            <Link 
              href="/products" 
              className="inline-flex items-center gap-1.5 text-brand-secondary hover:text-brand-primary dark:text-gray-400 dark:hover:text-brand-primary transition-colors duration-200 group"
            >
              <Package className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
              <span className="font-medium">{t('navbar.products')}</span>
            </Link>
            <ChevronRight className="h-4 w-4 text-brand-primary/60" />
            <span className="text-brand-dark dark:text-white font-semibold bg-brand-primary/10 dark:bg-brand-primary/20 px-3 py-1 rounded-full text-xs uppercase tracking-wide">
              {name}
            </span>
          </nav>
        </div>
      </div>
      {/* Product main content */}
      <section className="container py-8 md:py-12">
        <Button 
          variant="outline" 
          size="sm" 
          asChild 
          className="mb-6 bg-white/90 dark:bg-black/70 hover:bg-white dark:hover:bg-black/90 border-brand-primary/30 dark:border-brand-primary/50 hover:border-brand-primary text-brand-primary hover:text-brand-primary transition-all duration-300 hover:scale-105 hover:shadow-lg backdrop-blur-sm group"
        >
          <Link href="/products" className="flex items-center gap-2">
            <ChevronLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
            <Package className="h-4 w-4" />
            <span className="font-medium">{t('productPage.backToProducts')}</span>
          </Link>
        </Button>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Product images */}
          <ProductImageGallery
            mainImage={product.image_url || ''}
            image2={product.image2_url}
            image3={product.image3_url}
            image4={product.image4_url}
            additionalImages={product.additional_images}
            productName={name}
            isFeatured={product.is_featured}
            isNew={isNew}
            outOfStock={product.out_of_stock}
          />
          {/* Product info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2 overflow-x-auto pb-1 scrollbar-hide max-w-full">
                <Badge variant="outline" className="border-brand-primary/30 text-brand-secondary dark:text-gray-300 whitespace-nowrap flex-shrink-0">
                  {category}
                </Badge>
                {sub_category && (
                  <Badge variant="outline" className="border-brand-primary/30 text-brand-secondary dark:text-gray-300 whitespace-nowrap flex-shrink-0">
                    {sub_category}
                  </Badge>
                )}
              </div>
              <h1 className="text-3xl font-bold tracking-tight md:text-4xl text-brand-dark dark:text-white">{name}</h1>
            </div>
            <div className="pt-2">
              <p className="text-brand-secondary dark:text-gray-300 leading-relaxed">
                {short_description || description}
              </p>
            </div>
            <Separator className="my-6 border-brand-primary/10 dark:border-brand-primary/20" />
            {/* Product details tabs */}
            <div className="pt-2">
              <Tabs defaultValue="specifications" className="w-full">
                {/* Mobile: Vertical stacked tabs */}
                <TabsList className="flex flex-col h-auto w-full bg-white dark:bg-black/50 mb-4 border border-brand-primary/10 dark:border-brand-primary/20 rounded-lg shadow-sm backdrop-blur-sm gap-1 p-2 md:hidden">
                  <TabsTrigger 
                    value="specifications" 
                    className="w-full rounded-lg px-4 py-3 data-[state=active]:bg-brand-primary data-[state=active]:text-white text-left justify-start"
                  >
                    {t('productPage.specifications')}
                  </TabsTrigger>
                  <TabsTrigger 
                    value="features" 
                    className="w-full rounded-lg px-4 py-3 data-[state=active]:bg-brand-primary data-[state=active]:text-white text-left justify-start"
                  >
                    {t('productPage.features')}
                  </TabsTrigger>
                  <TabsTrigger 
                    value="applications" 
                    className="w-full rounded-lg px-4 py-3 data-[state=active]:bg-brand-primary data-[state=active]:text-white text-left justify-start"
                  >
                    {t('productPage.applications')}
                  </TabsTrigger>
                  <TabsTrigger 
                    value="documentation" 
                    className="w-full rounded-lg px-4 py-3 data-[state=active]:bg-brand-primary data-[state=active]:text-white text-left justify-start"
                  >
                    Documentation
                  </TabsTrigger>
                </TabsList>
                
                {/* Desktop: Horizontal tabs */}
                <TabsList className="hidden md:flex w-full justify-start bg-white dark:bg-black/50 mb-4 border border-brand-primary/10 dark:border-brand-primary/20 rounded-lg shadow-sm backdrop-blur-sm gap-2 p-2">
                  <TabsTrigger 
                    value="specifications" 
                    className="rounded-lg px-4 py-2 data-[state=active]:bg-brand-primary data-[state=active]:text-white"
                  >
                    {t('productPage.specifications')}
                  </TabsTrigger>
                  <TabsTrigger 
                    value="features" 
                    className="rounded-lg px-4 py-2 data-[state=active]:bg-brand-primary data-[state=active]:text-white"
                  >
                    {t('productPage.features')}
                  </TabsTrigger>
                  <TabsTrigger 
                    value="applications" 
                    className="rounded-lg px-4 py-2 data-[state=active]:bg-brand-primary data-[state=active]:text-white"
                  >
                    {t('productPage.applications')}
                  </TabsTrigger>
                  <TabsTrigger 
                    value="documentation" 
                    className="rounded-lg px-4 py-2 data-[state=active]:bg-brand-primary data-[state=active]:text-white"
                  >
                    Documentation
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="specifications" className="mt-0">
                  <div className="space-y-4">
                    {/* Product Description */}
                    <div className="group relative overflow-hidden rounded-lg border bg-white dark:bg-black/50 shadow-sm transition-all duration-300 hover:shadow-md border-brand-primary/10 dark:border-brand-primary/20 backdrop-blur-sm p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <ListChecks className="h-5 w-5 text-brand-primary" />
                        <h3 className="font-medium text-brand-dark dark:text-white">{t('productPage.productDetails')}</h3>
                      </div>
                      <p className="text-brand-secondary dark:text-gray-300">{description}</p>
                    </div>
                    {/* Technical Specifications */}
                    <h4 className="text-lg font-medium text-brand-dark dark:text-white mt-4 mb-2">{t('productPage.technicalSpecifications')}</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {product.temperature_rating && (
                        <div className="group relative overflow-hidden rounded-lg border bg-white dark:bg-black/50 shadow-sm transition-all duration-300 hover:shadow-md border-brand-primary/10 dark:border-brand-primary/20 backdrop-blur-sm p-4">
                          <div className="flex items-center justify-center gap-2 mb-3">
                            <Flame className="h-5 w-5 text-brand-primary" />
                            <h3 className="font-medium text-brand-dark dark:text-white">{t('productPage.temperatureRating')}</h3>
                          </div>
                          <div className="flex items-center justify-center h-12">
                            <p className="text-brand-secondary dark:text-gray-300 font-medium text-lg">{product.temperature_rating}°C</p>
                          </div>
                        </div>
                      )}
                      {product.cut_resistance_level && product.en_standard && (
                        <div className="group relative overflow-hidden rounded-lg border bg-white dark:bg-black/50 shadow-sm transition-all duration-300 hover:shadow-md border-brand-primary/10 dark:border-brand-primary/20 backdrop-blur-sm p-4">
                          <div className="flex items-center justify-center gap-3 mb-3">
                            <Shield className="h-5 w-5 text-brand-primary" />
                            <h3 className="font-medium text-brand-dark dark:text-white">
                              EN Standards
                            </h3>
                          </div>
                          <div className="flex items-center justify-center gap-3 h-12">
                            <div className="relative w-12 h-12 flex-shrink-0">
                              <Image
                                src={`/images/standards/${product.en_standard}.png`}
                                alt={product.en_standard}
                                fill
                                className="object-contain dark:invert"
                              />
                            </div>
                            <div>
                              <p className="text-brand-secondary dark:text-gray-300 font-medium text-lg">
                                {product.en_standard}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="group relative overflow-hidden rounded-lg border bg-white dark:bg-black/50 shadow-sm transition-all duration-300 hover:shadow-md border-brand-primary/10 dark:border-brand-primary/20 backdrop-blur-sm p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <User2 className="h-5 w-5 text-brand-primary" />
                        <h3 className="font-medium text-brand-dark dark:text-white">{t('productPage.industries')}</h3>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {industries && industries.length > 0 ? (
                          industries.map((industry: string) => (
                            <Badge key={industry} variant="outline" className="bg-brand-primary/5 border-brand-primary/20">
                              {industry}
                            </Badge>
                          ))
                        ) : (
                          <span className="text-brand-secondary dark:text-gray-400">-</span>
                        )}
                      </div>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="features" className="mt-0">
                  <div className="space-y-4">
                    <div className="group relative overflow-hidden rounded-lg border bg-white dark:bg-black/50 shadow-sm transition-all duration-300 hover:shadow-md border-brand-primary/10 dark:border-brand-primary/20 backdrop-blur-sm p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <ListChecks className="h-5 w-5 text-brand-primary" />
                        <h3 className="font-medium text-brand-dark dark:text-white">{t('productPage.features')}</h3>
                      </div>
                      <ul className="list-disc list-inside space-y-1 text-brand-secondary dark:text-gray-300">
                        {features && features.length > 0 ? (
                          features.map((feature: string, idx: number) => (
                            <li key={idx}>{feature}</li>
                          ))
                        ) : (
                          <li>-</li>
                        )}
                      </ul>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="applications" className="mt-0">
                  <div className="space-y-4">
                    <div className="group relative overflow-hidden rounded-lg border bg-white dark:bg-black/50 shadow-sm transition-all duration-300 hover:shadow-md border-brand-primary/10 dark:border-brand-primary/20 backdrop-blur-sm p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <ListChecks className="h-5 w-5 text-brand-primary" />
                        <h3 className="font-medium text-brand-dark dark:text-white">{t('productPage.applications')}</h3>
                      </div>
                      <ul className="list-disc list-inside space-y-1 text-brand-secondary dark:text-gray-300">
                        {applications && applications.length > 0 ? (
                          applications.map((application: string, idx: number) => (
                            <li key={idx}>{application}</li>
                          ))
                        ) : (
                          <li>-</li>
                        )}
                      </ul>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="documentation" className="mt-0">
                  <div className="space-y-4">
                    {/* Technical Sheet */}
                    {product.technical_sheet_url && (
                      <Button
                        variant="outline"
                        size="lg"
                        className="w-full border-brand-primary text-brand-primary hover:bg-white hover:text-brand-primary hover:border-brand-primary hover:shadow-lg hover:scale-105 transition-all duration-300 transform group"
                        asChild
                      >
                        <a href={product.technical_sheet_url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                          <Download className="h-5 w-5 transition-transform duration-300 group-hover:translate-y-1" />
                          Download Technical Sheet
                        </a>
                      </Button>
                    )}
                    
                    {/* Declaration Sheet */}
                    {product.declaration_sheet_url && (
                      <Button
                        variant="outline"
                        size="lg"
                        className="w-full border-brand-primary text-brand-primary hover:bg-white hover:text-brand-primary hover:border-brand-primary hover:shadow-lg hover:scale-105 transition-all duration-300 transform group"
                        asChild
                      >
                        <a href={product.declaration_sheet_url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                          <Download className="h-5 w-5 transition-transform duration-300 group-hover:translate-y-1" />
                          Download Product Declaration
                        </a>
                      </Button>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
            {/* Contact and Sample Request Buttons */}
            <div className="pt-4 flex flex-col sm:grid sm:grid-cols-2 gap-4">
              <Button
                variant="outline"
                size="lg"
                className="w-full border-brand-primary text-brand-primary hover:bg-white hover:text-brand-primary hover:border-brand-primary hover:shadow-lg hover:scale-105 transition-all duration-300 transform group"
                asChild
              >
                <Link href="/contact" className="flex items-center justify-center gap-2">
                  <Mail className="h-5 w-5 transition-transform duration-300 group-hover:rotate-45" />
                  {t('productPage.contactUs')}
                </Link>
              </Button>
              <Button
                variant="default"
                size="lg"
                className="w-full bg-[#F28C38] text-white hover:bg-[#F28C38]/90 hover:shadow-lg hover:scale-105 transition-all duration-300 transform group"
                onClick={() => setIsSampleModalOpen(true)}
              >
                <span className="flex items-center justify-center gap-2">
                  <Download className="h-5 w-5 transition-transform duration-300 group-hover:translate-y-1" />
                  {t('productPage.requestSample')}
                </span>
              </Button>
            </div>
          </div>
        </div>
      </section>
      <SampleModal
        product={product}
        isOpen={isSampleModalOpen}
        onClose={() => setIsSampleModalOpen(false)}
      />
    </main>
  );
} 