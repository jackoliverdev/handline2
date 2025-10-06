"use client";
import React from 'react';
import Link from "next/link";
import Image from "next/image";
import { ArmSpecs } from "@/components/website/products/slug/ArmSpecs";
import { GlovesSpecs } from "@/components/website/products/slug/GlovesSpecs";
import { SwabsSpecs } from "@/components/website/products/slug/SwabsSpecs";
import { RespiratorSpecs } from "@/components/website/products/slug/RespiratorSpecs";
import { HearingSpecs } from "@/components/website/products/slug/HearingSpecs";
import { EyeFaceSpecs } from "@/components/website/products/slug/EyeFaceSpecs";
import { FootwearSpecs } from "@/components/website/products/slug/FootwearSpecs";
import { HeadSpecs } from "@/components/website/products/slug/HeadSpecs";
import { ClothingSpecs } from "@/components/website/products/slug/ClothingSpecs";
import { useLanguage } from "@/lib/context/language-context";
import { useRouter } from "next/navigation";
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
import { EyeFaceStandards } from "@/components/website/products/slug/EyeFaceStandards";
import { HeadStandards } from "@/components/website/products/slug/HeadStandards";
import { FootwearStandards } from "@/components/website/products/slug/FootwearStandards";
import { ArmStandards } from "@/components/website/products/slug/ArmStandards";
import { HearingStandards } from "@/components/website/products/slug/HearingStandards";
import { RespiratoryStandards } from "@/components/website/products/slug/RespiratoryStandards";
import { ClothingStandards } from "@/components/website/products/slug/ClothingStandards";
import { EnvironmentPictogramsDisplay } from "@/components/website/products/environment-pictograms";
import { EyeFaceEnvironment } from "./EyeFaceEnvironment";
import { Product } from "@/lib/products-service";
import { EyeFaceComfortFeatures } from "@/components/website/products/slug/EyeFaceComfortFeatures";
import { HeadComfortFeatures } from "@/components/website/products/slug/HeadComfortFeatures";
import { HeadOtherDetails } from "@/components/website/products/slug/HeadOtherDetails";
import { HeadEquipment } from "@/components/website/products/slug/HeadEquipment";
import { EyeFaceEquipment } from "@/components/website/products/slug/EyeFaceEquipment";
import { FootwearComfortFeatures } from "@/components/website/products/slug/FootwearComfortFeatures";
import { HearingComfortFeatures } from "@/components/website/products/slug/HearingComfortFeatures";
import { HearingOtherDetails } from "@/components/website/products/slug/HearingOtherDetails";
import { HearingEquipment } from "@/components/website/products/slug/HearingEquipment";
import { RespiratoryComfortFeatures } from "@/components/website/products/slug/RespiratoryComfortFeatures";
import { RespiratoryOtherDetails } from "@/components/website/products/slug/RespiratoryOtherDetails";
import { RespiratoryEquipment } from "@/components/website/products/slug/RespiratoryEquipment";
import { ClothingComfortFeatures } from "@/components/website/products/slug/ClothingComfortFeatures";
import { ClothingOtherDetails } from "@/components/website/products/slug/ClothingOtherDetails";
import { ClothingEnvironment } from "@/components/website/products/slug/ClothingEnvironment";
import { ProductDeclarations } from "@/components/website/products/slug/ProductDeclarations";
import { useBrands } from "@/lib/context/brands-context";

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

// Brand logo mapping - fully dynamic system
const getBrandLogo = (brandName: string, brands: any[], isDarkMode = false) => {
  const brand = brands.find(b => b.name.toLowerCase() === brandName.toLowerCase());
  if (!brand) return null;
  
  // Use dark mode logo if available and in dark mode, otherwise use light mode logo
  if (isDarkMode && brand.dark_mode_logo_url) {
    return brand.dark_mode_logo_url;
  }
  
  return brand.logo_url || null;
};

export function ProductDetail({ product, relatedProducts }: { product: Product, relatedProducts: any[] }) {
  const { t, language } = useLanguage();
  const router = useRouter();
  const { trackProductView, trackSampleRequest, trackContactSubmission, trackDownload } = useAnalytics();
  const { brands } = useBrands();
  
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

  // Compute pad size display if available (primarily for Industrial Swabs)
  const padSizeDisplay: string | null = React.useMemo(() => {
    const raw = (product as any).pad_size_json;
    if (!raw || typeof raw !== 'object') return null;
    const locale = raw[language] || raw.en;
    if (!locale || typeof locale !== 'object') return null;
    const diameter = locale.diameter_mm ?? locale.diametro_mm ?? null;
    const length = locale.length_mm ?? locale.lunghezza_mm ?? null;
    if (diameter && length) return `Ø ${diameter} × ${length} mm`;
    return null;
  }, [product, language]);

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

  // Derive category link for breadcrumb navigation
  const categoryLabel = product.category_locales?.[language] || product.category || '';
  const categoryHref: string | null = React.useMemo(() => {
    const cat = (product.category || '').toLowerCase();
    const sub = (product.sub_category || '').toLowerCase();
    if (cat.includes('respir')) return '/products/respiratory';
    if (cat.includes('swab')) return '/products/industrial-swabs';
    if (cat.includes('hearing') || sub.includes('ear')) return '/products/hearing';
    if (cat.includes('footwear') || sub.includes('boot') || sub.includes('insol')) return '/products/footwear';
    if (cat.includes('eye') || cat.includes('face') || sub.includes('goggle') || sub.includes('glasses') || sub.includes('visor')) return '/products/eye-face';
    if (cat.includes('head') || sub.includes('helmet') || sub.includes('bump')) return '/products/head';
    if (cat.includes('cloth') || sub.includes('jacket')) return '/products/clothing';
    if (cat.includes('arm') || sub.includes('sleeve')) return '/products/arm-protection';
    // Default to gloves
    if (cat.includes('hand') || cat.includes('glove')) return '/products/gloves';
    return null;
  }, [product]);

  // Back button behaviour: return to previous in-site page if possible, else fallback
  const handleBackNav = React.useCallback(() => {
    if (typeof window !== 'undefined') {
      const ref = document.referrer;
      const fromSameOrigin = ref && ref.startsWith(window.location.origin);
      if (fromSameOrigin) {
        router.back();
        return;
      }
      // Fallback when there is no referrer or external source
      router.push('/products#product-grid');
    }
  }, [router]);

  // Swabs never have EN standards → hide the EN Standards tab for swab products
  const isSwab = ((product.category || '').toLowerCase().includes('swab')) || ((product.sub_category || '').toLowerCase().includes('swab'));
  const isEyeFace = ((product.category || '').toLowerCase().includes('eye') || (product.category || '').toLowerCase().includes('face') || (product.sub_category || '').toLowerCase().includes('goggle') || (product.sub_category || '').toLowerCase().includes('glasses') || (product.sub_category || '').toLowerCase().includes('visor'));
  const isHead = ((product.category || '').toLowerCase().includes('head')) || ((product.sub_category || '').toLowerCase().includes('helmet')) || ((product.sub_category || '').toLowerCase().includes('bump'));
  const isHearing = ((product.category || '').toLowerCase().includes('hearing') || (product.sub_category || '').toLowerCase().includes('ear plug') || (product.sub_category || '').toLowerCase().includes('defender'));
  const isRespiratory = ((product.category || '').toLowerCase().includes('respir'));
  const isClothing = ((product.category || '').toLowerCase().includes('cloth') || (product.sub_category || '').toLowerCase().includes('jacket'));

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
            {categoryHref && (
              <>
                <ChevronRight className="h-4 w-4 text-brand-primary/60" />
                <Link
                  href={categoryHref}
                  className="inline-flex items-center gap-1.5 text-brand-secondary hover:text-brand-primary dark:text-gray-400 dark:hover:text-brand-primary transition-colors duration-200 group"
                >
                  <span className="font-medium">{categoryLabel}</span>
                </Link>
              </>
            )}
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
          className="mb-6 bg-white/90 dark:bg-black/70 hover:bg-white dark:hover:bg-black/90 border-brand-primary/30 dark:border-brand-primary/50 hover:border-brand-primary text-brand-primary hover:text-brand-primary transition-all duration-300 hover:scale-105 hover:shadow-lg backdrop-blur-sm group"
          onClick={handleBackNav}
        >
          <span className="flex items-center gap-2">
            <ChevronLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
            <Package className="h-4 w-4" />
            <span className="font-medium">{t('productPage.backToProducts')}</span>
          </span>
        </Button>
        
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Product images */}
          <ProductImageGallery
            mainImage={product.image_url || ''}
            image2={product.image2_url}
            image3={product.image3_url}
            image4={product.image4_url}
            image5={product.image5_url}
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
                      const lightLogoPath = getBrandLogo(brand, brands, false);
                      const darkLogoPath = getBrandLogo(brand, brands, true);
                      
                      if (lightLogoPath) {
                        return (
                          <div 
                            key={index}
                            className="relative flex items-center bg-white dark:bg-black/50 border border-brand-primary/20 rounded px-2 py-1 h-8"
                          >
                            {/* Light mode image */}
                            <Image
                              src={lightLogoPath}
                              alt={brand}
                              width={60}
                              height={24}
                              className="object-contain block dark:hidden"
                            />
                            {/* Dark mode image */}
                            <Image
                              src={darkLogoPath || lightLogoPath}
                              alt={brand}
                              width={60}
                              height={24}
                              className="object-contain hidden dark:block"
                            />
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
                  {((product.safety || product.environment_pictograms) && !isSwab) && (
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
                  {((product.safety || product.environment_pictograms) && !isSwab) && (
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
                    {/* Category-specific isolated specs */}
                    {(product.category?.toLowerCase().includes('respir') || (product as any).filter_type || (((product as any).connections || []).length > 0)) ? (
                      <RespiratorSpecs product={product} />
                    ) : ((product.category || '').toLowerCase().includes('footwear') || (product.sub_category || '').toLowerCase().includes('boot') || (product.sub_category || '').toLowerCase().includes('insol')) ? (
                      <FootwearSpecs product={product} />
                    ) : ((((product as any).hearing_standards && Object.keys((product as any).hearing_standards || {}).length > 0) && !!(product as any).hearing_standards.en352) || (product.category || '').toLowerCase().includes('hearing') || (product.sub_category || '').toLowerCase().includes('ear')) ? (
                      <HearingSpecs product={product} />
                    ) : (((product as any).head_standards && Object.keys((product as any).head_standards || {}).length > 0) || (product.category || '').toLowerCase().includes('head') || (product.sub_category || '').toLowerCase().includes('helmet') || (product.sub_category || '').toLowerCase().includes('bump')) ? (
                      <HeadSpecs product={product} />
                    ) : ((((product as any).eye_face_standards && Object.keys((product as any).eye_face_standards || {}).length > 0) || ((product as any).eye_face_attributes && Object.keys((product as any).eye_face_attributes || {}).length > 0)) || (product.category || '').toLowerCase().includes('eye') || (product.category || '').toLowerCase().includes('face') || (product.sub_category || '').toLowerCase().includes('goggle') || (product.sub_category || '').toLowerCase().includes('visor') || (product.sub_category || '').toLowerCase().includes('glasses')) ? (
                      <EyeFaceSpecs product={product} />
                    ) : (((product as any).clothing_standards && Object.keys((product as any).clothing_standards || {}).length > 0) || (product.category || '').toLowerCase().includes('clothing') || (product.sub_category || '').toLowerCase().includes('jacket')) ? (
                      <ClothingSpecs product={product} />
                    ) : (product.category?.toLowerCase().includes('swab') || product.sub_category?.toLowerCase().includes('swab')) ? (
                      <SwabsSpecs product={product} />
                    ) : ((product.category || '').toLowerCase().includes('arm') || (product.sub_category || '').toLowerCase().includes('sleeve')) ? (
                      <ArmSpecs product={product} />
                    ) : (
                      <GlovesSpecs product={product} />
                    )}
                    
                    {/* Work Environment Suitability */}
                    {product.environment_pictograms && !isEyeFace && !isHead && !isHearing && !isRespiratory && !isClothing && !((product.category || '').toLowerCase().includes('footwear') || (product.sub_category || '').toLowerCase().includes('boot') || (product.sub_category || '').toLowerCase().includes('insol')) && (
                      <EnvironmentPictogramsDisplay environment_pictograms={product.environment_pictograms} />
                    )}
                    {product.environment_pictograms && isEyeFace && (
                      // Lazy import pattern isn't supported in JSX directly; static import component instead
                      // @ts-ignore - module exists
                      <EyeFaceEnvironment environment_pictograms={product.environment_pictograms as any} />
                    )}
                    {product.environment_pictograms && isClothing && (
                      <ClothingEnvironment environment_pictograms={product.environment_pictograms} />
                    )}
                  </div>
                </TabsContent>
                
                <TabsContent value="features" className="mt-0">
                  <div className="space-y-4">
                    {/* Comfort & fit features: Eye & Face, Head, Footwear, Hearing */}
                    {isEyeFace && (<EyeFaceComfortFeatures product={product} />)}
                    {((product.category || '').toLowerCase().includes('footwear') || (product.sub_category || '').toLowerCase().includes('boot') || (product.sub_category || '').toLowerCase().includes('insol')) && (
                      <FootwearComfortFeatures product={product} />
                    )}
                    {((product.category || '').toLowerCase().includes('head') || (product.sub_category || '').toLowerCase().includes('helmet') || (product.sub_category || '').toLowerCase().includes('bump')) && (
                      <HeadComfortFeatures product={product} />
                    )}
                    {isHearing && (
                      <HearingComfortFeatures product={product} />
                    )}
                    {isRespiratory && (
                      <RespiratoryComfortFeatures product={product} />
                    )}
                    {isClothing && (
                      <ClothingComfortFeatures product={product} />
                    )}
                    {/* Equipment blocks */}
                    {isEyeFace && (
                      <EyeFaceEquipment product={product} />
                    )}
                    {isHearing && (
                      <HearingEquipment product={product} />
                    )}
                    {isRespiratory && (
                      <RespiratoryEquipment product={product} />
                    )}
                    <div className="group relative overflow-hidden rounded-lg border bg-white dark:bg-black/50 shadow-sm transition-all duration-300 hover:shadow-md border-brand-primary/10 dark:border-brand-primary/20 backdrop-blur-sm p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <ListChecks className="h-5 w-5 text-brand-primary" />
                        <h3 className="font-medium text-brand-dark dark:text-white">{(isEyeFace || isHead || isHearing || isRespiratory || isClothing || (product.category || '').toLowerCase().includes('footwear') || (product.sub_category || '').toLowerCase().includes('boot') || (product.sub_category || '').toLowerCase().includes('insol')) ? t('productPage.safetyFeatures') : t('productPage.features')}</h3>
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
                    {/* Other details blocks - after Safety features */}
                    {((product.category || '').toLowerCase().includes('head') || (product.sub_category || '').toLowerCase().includes('helmet') || (product.sub_category || '').toLowerCase().includes('bump')) && (
                      <HeadOtherDetails product={product} />
                    )}
                    {isHearing && (
                      <HearingOtherDetails product={product} />
                    )}
                    {isRespiratory && (
                      <RespiratoryOtherDetails product={product} />
                    )}
                    {isClothing && (
                      <ClothingOtherDetails product={product} />
                    )}

                    {/* Equipment blocks - last */}
                    {((product.category || '').toLowerCase().includes('head') || (product.sub_category || '').toLowerCase().includes('helmet') || (product.sub_category || '').toLowerCase().includes('bump')) && (
                      <HeadEquipment product={product} />
                    )}
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
                
                {!isSwab && (product.safety || (product as any).eye_face_standards || (product as any).respiratory_standards) && (
                  <TabsContent value="safety" className="mt-0">
                    <div className="space-y-6">
                      {/* Safety Standards - Environment pictograms moved to specifications */}
                      {/* Generic gloves safety display unless a category-specific standards component is shown below */}
                      {product.safety && !(((product as any).eye_face_standards && Object.keys((product as any).eye_face_standards || {}).length > 0) || ((product as any).head_standards && Object.keys((product as any).head_standards || {}).length > 0) || ((product as any).footwear_standards && Object.keys((product as any).footwear_standards || {}).length > 0) || ((product as any).arm_attributes && Object.keys((product as any).arm_attributes || {}).length > 0) || ((product as any).safety?.en_iso_21420) || ((product as any).hearing_standards && Object.keys((product as any).hearing_standards || {}).length > 0) || ((product as any).respiratory_standards && Object.keys((product as any).respiratory_standards || {}).length > 0)) && (
                        <SafetyStandardsDisplay safety={product.safety} hideTitle />
                      )}
                      {/* Eye & Face dedicated standards */
                      }
                      {((product as any).eye_face_standards && Object.keys((product as any).eye_face_standards || {}).length > 0) && (
                        <EyeFaceStandards product={product} />
                      )}
                      {/* Respiratory dedicated standards */}
                      {((product as any).respiratory_standards && Object.keys((product as any).respiratory_standards || {}).length > 0) && (
                        <RespiratoryStandards product={product} />
                      )}
                      {/* Head dedicated standards */}
                      {((product as any).head_standards && Object.keys((product as any).head_standards || {}).length > 0) && (
                        <HeadStandards product={product} />
                      )}
                      {/* Footwear dedicated standards */}
                      {((product as any).footwear_standards && Object.keys((product as any).footwear_standards || {}).length > 0) && (
                        <FootwearStandards product={product} />
                      )}
                      {/* Arm dedicated standards (EN ISO 21420 + reuse EN chips) */}
                      {((product as any).arm_attributes || (product as any).safety?.en_iso_21420) && (
                        <ArmStandards product={product} />
                      )}
                      {/* Hearing dedicated standards */}
                      {((product as any).hearing_standards && Object.keys((product as any).hearing_standards || {}).length > 0) && (
                        <HearingStandards product={product} />
                      )}
                      {/* Clothing dedicated standards */}
                      {((product as any).clothing_standards && Object.keys((product as any).clothing_standards || {}).length > 0) && (
                        <ClothingStandards product={product} />
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
                    
                    {/* Declarations of Conformity - Enhanced with UKCA and EU language dropdown */}
                    <ProductDeclarations 
                      product={product} 
                      onDocumentDownload={handleDocumentDownload}
                    />

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