"use client";
import React from 'react';
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/lib/context/language-context";
import { useAnalytics } from "@/hooks/useAnalytics";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { ChevronLeft, Flame, Scissors, User2, Mail, Download, ListChecks, ChevronRight, Shield, Home, Package, Ruler, Hammer, Settings, Snowflake, Layers, Move } from "lucide-react";
import { ProductImageGallery } from "@/components/website/products/product-image-gallery";
import { ProductCard } from "@/components/website/products/product-card";
import { SampleModal } from "@/components/website/products/sample-modal";
import { ContactModal } from "@/components/website/products/contact-modal";
import { SafetyStandardsDisplay } from "@/components/website/products/safety-standards-display";
import { EnvironmentPictogramsDisplay } from "@/components/website/products/environment-pictograms";
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

// Brand logo mapping
const getBrandLogo = (brandName: string) => {
  const normalizedBrand = brandName.toLowerCase();
  
  if (normalizedBrand.includes('hand line') || normalizedBrand.includes('handline')) {
    return '/brands/HL_word_logo.PNG';
  }
  
  if (normalizedBrand.includes('progloves heat') || (normalizedBrand.includes('proglov') && normalizedBrand.includes('heat'))) {
    return '/brands/proheatnobg.png';
  }
  
  if (normalizedBrand.includes('progloves cut') || (normalizedBrand.includes('proglov') && normalizedBrand.includes('cut'))) {
    return '/brands/procutnobg.png';
  }
  
  return null;
};

export function ProductDetail({ product, relatedProducts }: { product: Product, relatedProducts: any[] }) {
  const { t, language } = useLanguage();
  const { trackProductView, trackSampleRequest, trackContactSubmission, trackDownload } = useAnalytics();
  
  // Get localized content based on current language
  const currentFeatures = product.features_locales?.[language] || product.features || [];
  const currentApplications = product.applications_locales?.[language] || product.applications || [];
  const currentIndustries = product.industries_locales?.[language] || product.industries || [];
  const currentMaterials = product.materials_locales?.[language] || [];

  // Modal state variables
  const [isSampleModalOpen, setIsSampleModalOpen] = React.useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = React.useState(false);

  // Get localised size and other info
  const size = product.size_locales?.[language] || product.size_locales?.en || null;

  // Track product view on component mount
  React.useEffect(() => {
    if (product) {
      trackProductView(
        product.name_locales?.[language] || product.name || '',
        product.id
      );
    }
  }, [product, language, trackProductView]);

  // Handle sample request with analytics
  const handleSampleRequest = () => {
    setIsSampleModalOpen(true);
    trackSampleRequest(product.name_locales?.[language] || product.name || '');
  };

  // Handle contact request with analytics
  const handleContactRequest = () => {
    setIsContactModalOpen(true);
    trackContactSubmission('product_inquiry');
  };

  // Handle document download with analytics
  const handleDocumentDownload = (url: string, fileName: string, fileType: string) => {
    trackDownload(fileName, fileType);
    // The actual download is handled by the link
  };

  return (
    <main className="bg-brand-light dark:bg-background min-h-screen pt-11">
      {/* Breadcrumb */}
      <div className="bg-brand-light dark:bg-background border-b border-brand-primary/10 dark:border-brand-primary/20">
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
              href="/products#product-grid" 
              className="inline-flex items-center gap-1.5 text-brand-secondary hover:text-brand-primary dark:text-gray-400 dark:hover:text-brand-primary transition-colors duration-200 group"
            >
              <Package className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
              <span className="font-medium">{t('navbar.products')}</span>
            </Link>
            <ChevronRight className="h-4 w-4 text-brand-primary/60" />
            <span className="text-brand-dark dark:text-white font-semibold bg-brand-primary/10 dark:bg-brand-primary/20 px-3 py-1 rounded-full text-xs uppercase tracking-wide">
              {product.name_locales?.[language] || product.name || ''}
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
          <Link href="/products#product-grid" className="flex items-center gap-2">
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
            productName={product.name_locales?.[language] || product.name || ''}
            isFeatured={product.is_featured}
            isNew={new Date(product.created_at).getTime() > Date.now() - (30 * 24 * 60 * 60 * 1000)}
            outOfStock={product.out_of_stock}
          />
          
          {/* Product info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2 overflow-x-auto pb-1 scrollbar-hide max-w-full">
                <Badge variant="outline" className="border-brand-primary/30 text-brand-secondary dark:text-gray-300 whitespace-nowrap flex-shrink-0">
                  {product.category_locales?.[language] || product.category || ''}
                </Badge>
                {product.sub_category && (
                  <Badge variant="outline" className="border-brand-primary/30 text-brand-secondary dark:text-gray-300 whitespace-nowrap flex-shrink-0">
                    {product.sub_category_locales?.[language] || product.sub_category}
                  </Badge>
                )}
              </div>
              
              {/* Product title with brand positioned inline right-aligned */}
              <div className="flex items-start justify-between gap-4 mb-4">
                <h1 className="text-3xl font-bold tracking-tight md:text-4xl text-brand-dark dark:text-white flex-1">{product.name_locales?.[language] || product.name || ''}</h1>
                
                {/* Brand display - right aligned */}
                {product.brands && product.brands.length > 0 && (
                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    {product.brands.map((brand, index) => {
                      const logoPath = getBrandLogo(brand);
                      
                      if (logoPath) {
                        return (
                          <div 
                            key={index}
                            className="relative flex items-center bg-white dark:bg-black/50 border border-brand-primary/20 rounded px-2 py-1 h-8"
                          >
                            {/* Light mode image */}
                            <Image
                              src={logoPath}
                              alt={brand}
                              width={60}
                              height={24}
                              className="object-contain block dark:hidden"
                            />
                            {/* Dark mode image with partial invert */}
                            <div className="hidden dark:block relative">
                              <Image
                                src={logoPath}
                                alt={brand}
                                width={60}
                                height={24}
                                className="object-contain"
                              />
                              {/* Invert overlay for left 55% */}
                              <div 
                                className="absolute inset-0 invert"
                                style={{
                                  clipPath: 'inset(0 45% 0 0)',
                                  width: '60px',
                                  height: '24px'
                                }}
                              >
                                <Image
                                  src={logoPath}
                                  alt={brand}
                                  width={60}
                                  height={24}
                                  className="object-contain"
                                />
                              </div>
                            </div>
                          </div>
                        );
                      } else {
                        return (
                          <Badge 
                            key={index}
                            variant="outline" 
                            className="text-sm py-1 px-2 bg-brand-primary/5 border-brand-primary/20 text-brand-dark dark:text-white"
                          >
                            {brand}
                          </Badge>
                        );
                      }
                    })}
                  </div>
                )}
              </div>
            </div>
            
            <div className="pt-0.5">
              <p className="text-brand-secondary dark:text-gray-300 leading-relaxed">
                {product.description_locales?.[language] || product.description || ''}
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
                    {/* Technical Specifications - New 3-tile layout */}
                    <h3 className="text-lg font-semibold text-brand-dark dark:text-white mb-4">
                      {t('productPage.technicalSpecifications')}
                    </h3>
                    <div className="grid grid-cols-3 gap-4">
                      {/* Materials Tile */}
                      <div className="group relative overflow-hidden rounded-lg border bg-white dark:bg-black/50 shadow-sm transition-all duration-300 hover:shadow-md border-brand-primary/10 dark:border-brand-primary/20 backdrop-blur-sm p-4">
                        <div className="flex items-center justify-center gap-2 mb-2">
                          <Layers className="h-5 w-5 text-brand-primary hidden sm:block" />
                          <h3 className="text-sm font-medium text-brand-dark dark:text-white">{t('productPage.materials')}</h3>
                        </div>
                        <div className="flex items-center justify-center">
                          {currentMaterials && currentMaterials.length > 0 ? (
                            <div className="text-center">
                              <div className="text-brand-dark dark:text-white font-medium text-md">
                                {currentMaterials[0]}
                              </div>
                              {currentMaterials.length > 1 && (
                                <div className="text-sm text-brand-secondary dark:text-gray-300">
                                  +{currentMaterials.length - 1} more
                                </div>
                              )}
                            </div>
                          ) : (
                            <span className="text-brand-dark dark:text-white font-medium text-md">-</span>
                          )}
                        </div>
                      </div>
                      
                      {/* Size */}
                      <div className="group relative overflow-hidden rounded-lg border bg-white dark:bg-black/50 shadow-sm transition-all duration-300 hover:shadow-md border-brand-primary/10 dark:border-brand-primary/20 backdrop-blur-sm p-4">
                        <div className="flex items-center justify-center gap-2 mb-2">
                          <Move className="h-5 w-5 text-brand-primary hidden sm:block" />
                          <h3 className="text-sm font-medium text-brand-dark dark:text-white">{t('productPage.productInfo.size')}</h3>
                        </div>
                        <div className="flex items-center justify-center">
                          <span className="text-brand-dark dark:text-white font-medium text-md">
                            {size || '-'}
                          </span>
                        </div>
                      </div>

                      {/* Length */}
                      <div className="group relative overflow-hidden rounded-lg border bg-white dark:bg-black/50 shadow-sm transition-all duration-300 hover:shadow-md border-brand-primary/10 dark:border-brand-primary/20 backdrop-blur-sm p-4">
                        <div className="flex items-center justify-center gap-2 mb-2">
                          <Ruler className="h-5 w-5 text-brand-primary hidden sm:block" />
                          <h3 className="text-sm font-medium text-brand-dark dark:text-white">{t('productPage.productInfo.length')}</h3>
                        </div>
                        <div className="flex items-center justify-center">
                          <span className="text-brand-dark dark:text-white font-medium text-md">
                            {product.length_cm ? `${product.length_cm} cm` : '-'}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    {/* CE Category and EN Standards */}
                    <div className="space-y-4">
                      {/* CE Category and EN Standard - Side by Side Tiles */}
                      <div className="grid grid-cols-2 gap-4">
                        {product.ce_category && (
                          <div className="group relative overflow-hidden rounded-lg border bg-white dark:bg-black/50 shadow-sm transition-all duration-300 hover:shadow-md border-brand-primary/10 dark:border-brand-primary/20 backdrop-blur-sm p-4 flex flex-col">
                            <div className="flex items-center justify-center gap-2 mb-2">
                              <Shield className="h-5 w-5 text-brand-primary" />
                              <h3 className="text-sm font-medium text-brand-dark dark:text-white">{t('productPage.ceCategory')}</h3>
                            </div>
                          <div className="flex-1 flex items-center justify-center">
                            <span className="text-brand-dark dark:text-white font-medium text-md">{t('productPage.category')} {product.ce_category}</span>
                          </div>
                          </div>
                        )}
                        
                        {/* EN Standards from Safety JSON */}
                        {product.safety && (product.safety.en_388?.enabled || product.safety.en_407?.enabled || product.safety.en_511?.enabled) && (
                          <div className="group relative overflow-hidden rounded-lg border bg-white dark:bg-black/50 shadow-sm transition-all duration-300 hover:shadow-md border-brand-primary/10 dark:border-brand-primary/20 backdrop-blur-sm p-4">
                            <div className="flex items-center justify-center gap-2 mb-2">
                              <Shield className="h-5 w-5 text-brand-primary" />
                              <h3 className="text-sm font-medium text-brand-dark dark:text-white">EN Standards</h3>
                            </div>
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-3">
                              {/* EN 388 - Mechanical Risks */}
                              {product.safety.en_388?.enabled && (
                                <div className="flex items-center gap-1">
                                  <Image
                                    src="/images/standards/EN388.png"
                                    alt="EN388"
                                    width={20}
                                    height={20}
                                    className="object-contain"
                                  />
                                  <span className="text-brand-dark dark:text-white font-medium text-md">EN388</span>
                                </div>
                              )}
                              
                              {/* EN 407 - Thermal Risks */}
                              {product.safety.en_407?.enabled && (
                                <>
                                  {product.safety.en_388?.enabled && <span className="text-brand-secondary dark:text-gray-400 hidden sm:inline">•</span>}
                                  <div className="flex items-center gap-1">
                                    <Image
                                      src="/images/standards/EN407.png"
                                      alt="EN407"
                                      width={20}
                                      height={20}
                                      className="object-contain"
                                    />
                                    <span className="text-brand-dark dark:text-white font-medium text-md">EN407</span>
                                  </div>
                                </>
                              )}
                              
                              {/* EN 511 - Cold Risks */}
                              {product.safety.en_511?.enabled && (
                                <>
                                  {(product.safety.en_388?.enabled || product.safety.en_407?.enabled) && <span className="text-brand-secondary dark:text-gray-400 hidden sm:inline">•</span>}
                                  <div className="flex items-center gap-1">
                                    <Snowflake className="h-5 w-5 text-blue-500" />
                                    <span className="text-brand-dark dark:text-white font-medium text-md">EN511</span>
                                  </div>
                                </>
                              )}
                            </div>
                          </div>
                        )}
                        
                        {/* Fallback when safety exists but no standards are enabled, or when no safety data exists */}
                        {((product.safety && !product.safety.en_388?.enabled && !product.safety.en_407?.enabled && !product.safety.en_511?.enabled) || !product.safety) && product.en_standard && (
                          <div className="group relative overflow-hidden rounded-lg border bg-white dark:bg-black/50 shadow-sm transition-all duration-300 hover:shadow-md border-brand-primary/10 dark:border-brand-primary/20 backdrop-blur-sm p-4">
                            <div className="flex items-center justify-center gap-2 mb-2">
                              <Shield className="h-5 w-5 text-brand-primary" />
                              <h3 className="text-sm font-medium text-brand-dark dark:text-white">EN Standard</h3>
                            </div>
                            <div className="flex items-center justify-center">
                              <span className="text-brand-dark dark:text-white font-medium text-md">{product.en_standard}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* Work Environment Suitability */}
                    {product.environment_pictograms && (
                      <EnvironmentPictogramsDisplay environment_pictograms={product.environment_pictograms} />
                    )}
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
                        {currentFeatures && currentFeatures.length > 0 ? (
                          currentFeatures.map((feature: string, idx: number) => (
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
                    {/* Applications */}
                    <div className="group relative overflow-hidden rounded-lg border bg-white dark:bg-black/50 shadow-sm transition-all duration-300 hover:shadow-md border-brand-primary/10 dark:border-brand-primary/20 backdrop-blur-sm p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <ListChecks className="h-5 w-5 text-brand-primary" />
                        <h3 className="font-medium text-brand-dark dark:text-white">{t('productPage.applications')}</h3>
                      </div>
                      <ul className="list-disc list-inside space-y-1 text-brand-secondary dark:text-gray-300">
                        {currentApplications && currentApplications.length > 0 ? (
                          currentApplications.map((application: string, idx: number) => (
                            <li key={idx}>{application}</li>
                          ))
                        ) : (
                          <li>-</li>
                        )}
                      </ul>
                    </div>
                    
                    {/* Key Industries - Moved from Specifications tab */}
                    {/* Key Industries Section */}
                    {currentIndustries && currentIndustries.length > 0 && (
                      <div className="group relative overflow-hidden rounded-lg border bg-white dark:bg-black/50 shadow-sm transition-all duration-300 hover:shadow-md border-brand-primary/10 dark:border-brand-primary/20 backdrop-blur-sm p-4">
                        <div className="flex items-center gap-2 mb-4">
                          <User2 className="h-5 w-5 text-brand-primary" />
                          <h3 className="font-medium text-brand-dark dark:text-white">
                            {t('productPage.keyIndustries')}
                          </h3>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {currentIndustries.map((industry: string) => (
                            <Badge key={industry} variant="outline" className="bg-brand-primary/5 border-brand-primary/20">
                              {industry}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </TabsContent>
                
                {(product.safety) && (
                  <TabsContent value="safety" className="mt-0">
                    <div className="space-y-6">
                      {/* Safety Standards - Environment pictograms moved to specifications */}
                      {product.safety && (
                        <SafetyStandardsDisplay safety={product.safety} />
                      )}
                    </div>
                  </TabsContent>
                )}
                
                <TabsContent value="documentation" className="mt-0">
                  <div className="space-y-4">
                    {/* Technical Sheet - Dynamic language display */}
                    {((language === 'en' && product.technical_sheet_url) || (language === 'it' && product.technical_sheet_url_it)) && (
                      <div className="space-y-3">
                        <h3 className="text-lg font-semibold text-brand-dark dark:text-white">{t('productPage.technicalSheets')}</h3>
                        <div className="grid gap-3">
                          {language === 'en' && product.technical_sheet_url && (
                            <Button
                              variant="outline"
                              size="lg"
                              className="w-full border-brand-primary text-brand-primary hover:bg-white hover:text-brand-primary hover:border-brand-primary hover:shadow-lg hover:scale-105 transition-all duration-300 transform group"
                              asChild
                            >
                              <a 
                                href={product.technical_sheet_url} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="flex items-center justify-center gap-2"
                                onClick={() => handleDocumentDownload(product.technical_sheet_url!, 'Technical Sheet (EN)', 'technical_sheet')}
                              >
                                <Download className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-1" />
                                {t('productPage.download')}
                              </a>
                            </Button>
                          )}
                          
                          {language === 'it' && product.technical_sheet_url_it && (
                            <Button
                              variant="outline"
                              size="lg"
                              className="w-full border-brand-primary text-brand-primary hover:bg-white hover:text-brand-primary hover:border-brand-primary hover:shadow-lg hover:scale-105 transition-all duration-300 transform group"
                              asChild
                            >
                              <a 
                                href={product.technical_sheet_url_it} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="flex items-center justify-center gap-2"
                                onClick={() => handleDocumentDownload(product.technical_sheet_url_it!, 'Technical Sheet (IT)', 'technical_sheet')}
                              >
                                <Download className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-1" />
                                {t('productPage.download')}
                              </a>
                            </Button>
                          )}
                        </div>
                      </div>
                    )}
                    
                    {/* Declaration of Conformity - Dynamic language display */}
                    {((language === 'en' && product.declaration_sheet_url) || (language === 'it' && product.declaration_sheet_url_it)) && (
                      <div className="space-y-3">
                        <h3 className="text-lg font-semibold text-brand-dark dark:text-white">{t('productPage.productDeclarations')}</h3>
                        <div className="grid gap-3">
                          {language === 'en' && product.declaration_sheet_url && (
                            <Button
                              variant="outline"
                              size="lg"
                              className="w-full border-brand-primary text-brand-primary hover:bg-white hover:text-brand-primary hover:border-brand-primary hover:shadow-lg hover:scale-105 transition-all duration-300 transform group"
                              asChild
                            >
                              <a 
                                href={product.declaration_sheet_url} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="flex items-center justify-center gap-2"
                                onClick={() => handleDocumentDownload(product.declaration_sheet_url!, 'Declaration of Conformity (EN)', 'declaration')}
                              >
                                <Download className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-1" />
                                {t('productPage.download')}
                              </a>
                            </Button>
                          )}
                          
                          {language === 'it' && product.declaration_sheet_url_it && (
                            <Button
                              variant="outline"
                              size="lg"
                              className="w-full border-brand-primary text-brand-primary hover:bg-white hover:text-brand-primary hover:border-brand-primary hover:shadow-lg hover:scale-105 transition-all duration-300 transform group"
                              asChild
                            >
                              <a 
                                href={product.declaration_sheet_url_it} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="flex items-center justify-center gap-2"
                                onClick={() => handleDocumentDownload(product.declaration_sheet_url_it!, 'Declaration of Conformity (IT)', 'declaration')}
                              >
                                <Download className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-1" />
                                {t('productPage.download')}
                              </a>
                            </Button>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Manufacturers Instruction - Dynamic language display */}
                    {((language === 'en' && product.manufacturers_instruction_url) || (language === 'it' && product.manufacturers_instruction_url_it)) && (
                      <div className="space-y-3">
                        <h3 className="text-lg font-semibold text-brand-dark dark:text-white">{t('productPage.manufacturersInstruction')}</h3>
                        <div className="grid gap-3">
                          {language === 'en' && product.manufacturers_instruction_url && (
                            <Button
                              variant="outline"
                              size="lg"
                              className="w-full border-brand-primary text-brand-primary hover:bg-white hover:text-brand-primary hover:border-brand-primary hover:shadow-lg hover:scale-105 transition-all duration-300 transform group"
                              asChild
                            >
                              <a 
                                href={product.manufacturers_instruction_url} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="flex items-center justify-center gap-2"
                                onClick={() => handleDocumentDownload(product.manufacturers_instruction_url!, 'Manufacturers Instruction (EN)', 'instruction')}
                              >
                                <Download className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-1" />
                                {t('productPage.download')}
                              </a>
                            </Button>
                          )}
                          
                          {language === 'it' && product.manufacturers_instruction_url_it && (
                            <Button
                              variant="outline"
                              size="lg"
                              className="w-full border-brand-primary text-brand-primary hover:bg-white hover:text-brand-primary hover:border-brand-primary hover:shadow-lg hover:scale-105 transition-all duration-300 transform group"
                              asChild
                            >
                              <a 
                                href={product.manufacturers_instruction_url_it} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="flex items-center justify-center gap-2"
                                onClick={() => handleDocumentDownload(product.manufacturers_instruction_url_it!, 'Manufacturers Instruction (IT)', 'instruction')}
                              >
                                <Download className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-1" />
                                {t('productPage.download')}
                              </a>
                            </Button>
                          )}
                        </div>
                      </div>
                    )}
                    
                    {/* Show message if no documents available */}
                    {!((language === 'en' && (product.technical_sheet_url || product.declaration_sheet_url || product.manufacturers_instruction_url)) || 
                        (language === 'it' && (product.technical_sheet_url_it || product.declaration_sheet_url_it || product.manufacturers_instruction_url_it))) && (
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
                onClick={handleContactRequest}
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
                onClick={handleSampleRequest}
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