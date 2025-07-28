"use client";
import React from 'react';
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/lib/context/language-context";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { ChevronLeft, Flame, Scissors, User2, Mail, Download, ListChecks, ChevronRight, Shield, Home, Package, Ruler } from "lucide-react";
import { ProductImageGallery } from "@/components/website/products/product-image-gallery";
import { ProductCard } from "@/components/website/products/product-card";
import { SampleModal } from "@/components/website/products/sample-modal";
import { ContactModal } from "@/components/website/products/contact-modal";
import { SafetyStandardsDisplay } from "@/components/website/products/safety-standards-display";
import { EnvironmentPictogramsDisplay } from "@/components/website/products/environment-pictograms";
import { ProductInfoDisplay } from "@/components/website/products/product-info-display";
import { Product } from "@/lib/products-service";

// Flag components for flag icons
const FlagIcon = ({ country, className }: { country: 'GB' | 'IT', className?: string }) => {
  const flags = {
    GB: (
      <svg className={className} viewBox="0 0 640 480" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <clipPath id="a">
            <path fillOpacity=".7" d="M-85.3 0h682.6v512h-682.6z"/>
          </clipPath>
        </defs>
        <g clipPath="url(#a)" transform="translate(80) scale(.94)">
          <g strokeWidth="1pt">
            <path fill="#006" d="M-256 0H768v512H-256z"/>
            <path fill="#fff" d="M-256 0v57.2L653.5 512H768v-57.2L-141.5 0H-256zM768 0v57.2L-141.5 512H-256v-57.2L653.5 0H768z"/>
            <path fill="#fff" d="M170.7 0v512h170.6V0H170.7zM-256 170.7v170.6H768V170.7H-256z"/>
            <path fill="#c8102e" d="M-256 204.8v102.4H768V204.8H-256zM204.8 0v512h102.4V0H204.8zM-256 512L85.3 341.3h76.4L-256 512zM-256 0L85.3 170.7H9L-256 0zM768 0L426.7 170.7h76.3L768 0zM768 512L426.7 341.3H503L768 512z"/>
          </g>
        </g>
      </svg>
    ),
    IT: (
      <svg className={className} viewBox="0 0 640 480" xmlns="http://www.w3.org/2000/svg">
        <g fillRule="evenodd" strokeWidth="1pt">
          <path fill="#fff" d="M0 0h640v480H0z"/>
          <path fill="#009246" d="M0 0h213.3v480H0z"/>
          <path fill="#ce2b37" d="M426.7 0H640v480H426.7z"/>
        </g>
      </svg>
    )
  };
  
  return flags[country];
};

export function ProductDetail({ product, relatedProducts }: { product: Product, relatedProducts: any[] }) {
  const { t, language } = useLanguage();
  
  // Get localized product content
  const name = product.name_locales?.[language] || product.name || '';
  const description = product.description_locales?.[language] || product.description || '';
  const features = product.features_locales?.[language] || product.features || [];
  const applications = product.applications_locales?.[language] || product.applications || [];
  const industries = product.industries_locales?.[language] || product.industries || [];
  
  // Map category names to translation keys
  const getCategoryTranslation = (category: string) => {
    const categoryMap: Record<string, string> = {
      'Hand protection': 'productCategories.handProtection',
      'Heat resistant gloves': 'productCategories.heatResistantGloves',
      'Cut resistant gloves': 'productCategories.cutResistantGloves', 
      'General purpose gloves': 'productCategories.generalPurposeGloves',
      'Welding gloves': 'productCategories.weldingGloves',
      'Mechanical hazards gloves': 'productCategories.mechanicalHazardsGloves',
      'Industrial swabs': 'productCategories.industrialSwabs',
      'Respiratory protection': 'productCategories.respiratoryProtection'
    };
    
    return categoryMap[category] ? t(categoryMap[category]) : category;
  };
  
  const category = getCategoryTranslation(product.category || '');
  const sub_category = product.sub_category ? getCategoryTranslation(product.sub_category) : null;
  
  // Check if the product is new (created within the last 30 days)
  const isNew = new Date(product.created_at).getTime() > Date.now() - (30 * 24 * 60 * 60 * 1000);
  const hasRelatedProducts = relatedProducts && relatedProducts.length > 0;
  const [isSampleModalOpen, setIsSampleModalOpen] = React.useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = React.useState(false);

  // Check if extended data is available
  const hasExtendedData = product.safety || product.environment_pictograms || product.brands?.length > 0;

  return (
    <main className="bg-brand-light dark:bg-background min-h-screen pt-11">
      {/* Breadcrumb */}
      <div className="bg-white/50 dark:bg-black/30 border-b border-brand-primary/10 dark:border-brand-primary/20 backdrop-blur-sm">
        <div className="container py-2">
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
            
            <div className="pt-0.5">
              <p className="text-brand-secondary dark:text-gray-300 leading-relaxed">
                {description}
              </p>
            </div>
            
            {/* Extended Product Information - Back on right side */}
            {hasExtendedData && (
              <ProductInfoDisplay
                brands={product.brands || []}
                tags_locales={product.tags_locales || {}}
                size_locales={product.size_locales}
                length_cm={product.length_cm}
                ce_category={product.ce_category}
                availability_status={product.availability_status}
                coming_soon={product.coming_soon}
              />
            )}

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
                  {(product.safety || product.environment_pictograms) && (
                    <TabsTrigger 
                      value="safety" 
                      className="w-full rounded-lg px-4 py-3 data-[state=active]:bg-brand-primary data-[state=active]:text-white text-left justify-start"
                    >
                      {t('productPage.safety')}
                    </TabsTrigger>
                  )}
                  <TabsTrigger 
                    value="documentation" 
                    className="w-full rounded-lg px-4 py-3 data-[state=active]:bg-brand-primary data-[state=active]:text-white text-left justify-start"
                  >
                    {t('productPage.documentation')}
                  </TabsTrigger>
                </TabsList>
                
                {/* Desktop: Horizontal tabs */}
                <TabsList className="hidden md:flex w-full justify-between bg-white dark:bg-black/50 mb-4 border border-brand-primary/10 dark:border-brand-primary/20 rounded-lg shadow-sm backdrop-blur-sm p-2">
                  <TabsTrigger 
                    value="specifications" 
                    className="flex-1 rounded-lg px-4 py-2 data-[state=active]:bg-brand-primary data-[state=active]:text-white"
                  >
                    {t('productPage.specifications')}
                  </TabsTrigger>
                  <TabsTrigger 
                    value="features" 
                    className="flex-1 rounded-lg px-4 py-2 data-[state=active]:bg-brand-primary data-[state=active]:text-white"
                  >
                    {t('productPage.features')}
                  </TabsTrigger>
                  <TabsTrigger 
                    value="applications" 
                    className="flex-1 rounded-lg px-4 py-2 data-[state=active]:bg-brand-primary data-[state=active]:text-white"
                  >
                    {t('productPage.applications')}
                  </TabsTrigger>
                  {(product.safety || product.environment_pictograms) && (
                    <TabsTrigger 
                      value="safety" 
                      className="flex-1 rounded-lg px-4 py-2 data-[state=active]:bg-brand-primary data-[state=active]:text-white"
                    >
                      {t('productPage.safety')}
                    </TabsTrigger>
                  )}
                  <TabsTrigger 
                    value="documentation" 
                    className="flex-1 rounded-lg px-4 py-2 data-[state=active]:bg-brand-primary data-[state=active]:text-white"
                  >
                    {t('productPage.documentation')}
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="specifications" className="mt-0">
                  <div className="space-y-4">
                    {/* Technical Specifications */}
                    <h4 className="text-lg font-medium text-brand-dark dark:text-white mt-4 mb-2">{t('productPage.technicalSpecifications')}</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {product.temperature_rating && (
                        <div className="group relative overflow-hidden rounded-lg border bg-white dark:bg-black/50 shadow-sm transition-all duration-300 hover:shadow-md border-brand-primary/10 dark:border-brand-primary/20 backdrop-blur-sm p-4">
                          <div className="flex items-center justify-center gap-2 mb-3">
                            <Flame className="h-5 w-5 text-brand-primary" />
                            <h3 className="text-sm font-medium text-brand-dark dark:text-white">{t('productPage.temperatureRating')}</h3>
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
                            <h3 className="text-sm font-medium text-brand-dark dark:text-white">
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

                      {/* CE Category */}
                      {product.ce_category && (
                        <div className="group relative overflow-hidden rounded-lg border bg-white dark:bg-black/50 shadow-sm transition-all duration-300 hover:shadow-md border-brand-primary/10 dark:border-brand-primary/20 backdrop-blur-sm p-4">
                          <div className="flex items-center justify-center gap-2 mb-3">
                            <Shield className="h-5 w-5 text-brand-primary" />
                            <h3 className="text-sm font-medium text-brand-dark dark:text-white">{t('productPage.ceCategory')}</h3>
                          </div>
                          <div className="flex items-center justify-center h-12">
                            <Badge 
                              variant="outline" 
                              className="bg-brand-primary/10 border-brand-primary/30 text-brand-primary font-bold text-lg"
                            >
                              Category {product.ce_category}
                            </Badge>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="group relative overflow-hidden rounded-lg border bg-white dark:bg-black/50 shadow-sm transition-all duration-300 hover:shadow-md border-brand-primary/10 dark:border-brand-primary/20 backdrop-blur-sm p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <User2 className="h-5 w-5 text-brand-primary" />
                        <h3 className="text-sm font-medium text-brand-dark dark:text-white">{t('productPage.industries')}</h3>
                      </div>
                      
                      {/* Product Tags */}
                      {product.tags_locales?.[language]?.length > 0 || product.tags_locales?.en?.length > 0 && (
                        <div className="mb-3">
                          <h4 className="text-sm font-medium text-brand-secondary dark:text-gray-400 mb-2">Product Tags</h4>
                          <div className="flex flex-wrap gap-1 mb-3">
                            {(product.tags_locales?.[language] || product.tags_locales?.en || []).map((tag: string, index: number) => (
                              <Badge key={index} variant="outline" className="text-xs bg-brand-primary/5 border-brand-primary/20">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {/* Industries */}
                      <div>
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
                
                {(product.safety || product.environment_pictograms) && (
                  <TabsContent value="safety" className="mt-0">
                    <div className="space-y-6">
                      {/* Safety Standards */}
                      {product.safety && (
                        <SafetyStandardsDisplay safety={product.safety} />
                      )}
                      
                      {/* Environment Pictograms */}
                      {product.environment_pictograms && (
                        <EnvironmentPictogramsDisplay environment={product.environment_pictograms} />
                      )}
                    </div>
                  </TabsContent>
                )}
                
                <TabsContent value="documentation" className="mt-0">
                  <div className="space-y-4">
                    {/* Technical Sheets */}
                    {(product.technical_sheet_url || product.technical_sheet_url_it) && (
                      <div className="space-y-3">
                        <h4 className="text-md font-medium text-brand-dark dark:text-white">{t('productPage.technicalSheets')}</h4>
                        <div className="grid gap-3 md:grid-cols-2">
                          {/* English Technical Sheet */}
                          {product.technical_sheet_url && (
                            <Button
                              variant="outline"
                              size="lg"
                              className="w-full border-brand-primary text-brand-primary hover:bg-white hover:text-brand-primary hover:border-brand-primary hover:shadow-lg hover:scale-105 transition-all duration-300 transform group"
                              asChild
                            >
                              <a href={product.technical_sheet_url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                                <FlagIcon country="GB" className="h-4 w-4" />
                                <Download className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-1" />
                                {t('productPage.englishDocument')}
                              </a>
                            </Button>
                          )}
                          
                          {/* Italian Technical Sheet */}
                          {product.technical_sheet_url_it && (
                            <Button
                              variant="outline"
                              size="lg"
                              className="w-full border-brand-primary text-brand-primary hover:bg-white hover:text-brand-primary hover:border-brand-primary hover:shadow-lg hover:scale-105 transition-all duration-300 transform group"
                              asChild
                            >
                              <a href={product.technical_sheet_url_it} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                                <FlagIcon country="IT" className="h-4 w-4" />
                                <Download className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-1" />
                                {t('productPage.italianDocument')}
                              </a>
                            </Button>
                          )}
                        </div>
                      </div>
                    )}
                    
                    {/* Declaration Sheets */}
                    {(product.declaration_sheet_url || product.declaration_sheet_url_it) && (
                      <div className="space-y-3">
                        <h4 className="text-md font-medium text-brand-dark dark:text-white">{t('productPage.productDeclarations')}</h4>
                        <div className="grid gap-3 md:grid-cols-2">
                          {/* English Declaration Sheet */}
                          {product.declaration_sheet_url && (
                            <Button
                              variant="outline"
                              size="lg"
                              className="w-full border-brand-primary text-brand-primary hover:bg-white hover:text-brand-primary hover:border-brand-primary hover:shadow-lg hover:scale-105 transition-all duration-300 transform group"
                              asChild
                            >
                              <a href={product.declaration_sheet_url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                                <FlagIcon country="GB" className="h-4 w-4" />
                                <Download className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-1" />
                                {t('productPage.englishDocument')}
                              </a>
                            </Button>
                          )}
                          
                          {/* Italian Declaration Sheet */}
                          {product.declaration_sheet_url_it && (
                            <Button
                              variant="outline"
                              size="lg"
                              className="w-full border-brand-primary text-brand-primary hover:bg-white hover:text-brand-primary hover:border-brand-primary hover:shadow-lg hover:scale-105 transition-all duration-300 transform group"
                              asChild
                            >
                              <a href={product.declaration_sheet_url_it} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                                <FlagIcon country="IT" className="h-4 w-4" />
                                <Download className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-1" />
                                {t('productPage.italianDocument')}
                              </a>
                            </Button>
                          )}
                        </div>
                      </div>
                    )}
                    
                    {/* Show message if no documents available */}
                    {!product.technical_sheet_url && !product.technical_sheet_url_it && !product.declaration_sheet_url && !product.declaration_sheet_url_it && (
                      <div className="text-center py-8 text-brand-secondary dark:text-gray-400">
                        <Download className="h-8 w-8 mx-auto mb-2 opacity-50" />
                        <p>No documentation available for this product.</p>
                      </div>
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
                onClick={() => setIsContactModalOpen(true)}
              >
                <span className="flex items-center justify-center gap-2">
                  <Mail className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                  {t('productPage.contactUs')}
                </span>
              </Button>
              <Button
                variant="default"
                size="lg"
                className="w-full bg-brand-primary text-white hover:bg-brand-primary/90 hover:shadow-lg hover:scale-105 transition-all duration-300 transform group"
                onClick={() => setIsSampleModalOpen(true)}
              >
                <span className="flex items-center justify-center gap-2">
                  <Package className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
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
      <ContactModal
        product={product}
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
    </main>
  );
} 