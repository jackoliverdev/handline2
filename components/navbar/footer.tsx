"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/lib/context/language-context";

export function Footer() {
  const pathname = usePathname();
  const { t } = useLanguage();
  
  // State for collapsible sections
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isIndustriesOpen, setIsIndustriesOpen] = useState(false);
  const [isCompanyOpen, setIsCompanyOpen] = useState(false);
  const [isGlovesOpen, setIsGlovesOpen] = useState(false);
  
  // Don't render the footer on dashboard routes
  if (pathname?.startsWith('/dashboard')) {
    return null;
  }
  
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white/100 dark:bg-black/100 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 py-6">
        {/* Single row layout */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          
          {/* Left side - Company info */}
          <div className="lg:flex-1 lg:max-w-md">
            <div className="flex items-center gap-3">
              <div className="relative h-14 w-14">
                <Image 
                  src="/faviconBLACK.png" 
                  alt="Hand Line Logo" 
                  fill
                  className="object-contain block dark:hidden"
                />
                <Image 
                  src="/favicon.png" 
                  alt="Hand Line Logo" 
                  fill
                  className="object-contain hidden dark:block"
                />
              </div>
              <div>
                <h3 className="font-bold text-lg tracking-tight">
                  <span className="text-slate-900 dark:text-white">Hand Line</span>
                </h3>
                <p className="text-xs text-gray-600 dark:text-gray-400">{t('footer.address')}</p>
                <a href="https://www.linkedin.com/company/hand-line/?originalSubdomain=it" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs text-gray-600 dark:text-gray-400 hover:text-brand-primary dark:hover:text-brand-primary transition-colors duration-200 mt-0.5">
                  <svg className="h-3 w-3 transition-transform duration-200 hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  LinkedIn
                </a>
              </div>
            </div>
          </div>

          {/* Right side - Collapsible Links - Grouped together */}
          <div className="flex flex-row gap-8 lg:justify-end">
            
            {/* Products */}
            <div className="min-w-[100px]">
              <button 
                onClick={() => setIsProductsOpen(!isProductsOpen)}
                className="flex items-center gap-2 font-semibold text-gray-900 dark:text-white hover:text-brand-primary dark:hover:text-brand-primary transition-colors duration-200 text-sm sm:text-base group"
              >
                {t('footer.sections.products.title')}
                {isProductsOpen ? <ChevronUp className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" /> : <ChevronDown className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" />}
              </button>
              {isProductsOpen && (
                <div className="mt-2 flex flex-col gap-1 text-sm animate-in slide-in-from-top-2 duration-200">
                  <div className="mb-1">
                    <button 
                      onClick={() => setIsGlovesOpen(!isGlovesOpen)}
                      className="flex items-center gap-2 font-medium text-gray-700 dark:text-gray-300 hover:text-brand-primary dark:hover:text-brand-primary transition-colors duration-200 group"
                    >
                      {t('footer.sections.products.links.safetyGloves')}
                      {isGlovesOpen ? <ChevronUp className="h-3 w-3 transition-transform duration-200 group-hover:scale-110" /> : <ChevronDown className="h-3 w-3 transition-transform duration-200 group-hover:scale-110" />}
                    </button>
                    {isGlovesOpen && (
                      <div className="ml-2 mt-1 flex flex-col gap-1 animate-in slide-in-from-top-2 duration-200">
                        <Link href="/products/gloves/heat" className="text-gray-600 dark:text-gray-400 hover:text-brand-primary dark:hover:text-brand-primary transition-colors duration-200 hover:translate-x-1 transform">
                          {t('footer.sections.products.links.heatResistant')}
                        </Link>
                        <Link href="/products/gloves/cut" className="text-gray-600 dark:text-gray-400 hover:text-brand-primary dark:hover:text-brand-primary transition-colors duration-200 hover:translate-x-1 transform">
                          {t('footer.sections.products.links.cutResistant')}
                        </Link>
                        <Link href="/products/gloves/general" className="text-gray-600 dark:text-gray-400 hover:text-brand-primary dark:hover:text-brand-primary transition-colors duration-200 hover:translate-x-1 transform">
                          {t('footer.sections.products.links.generalPurpose')}
                        </Link>
                        <Link href="/products/gloves/mechanical" className="text-gray-600 dark:text-gray-400 hover:text-brand-primary dark:hover:text-brand-primary transition-colors duration-200 hover:translate-x-1 transform">
                          {t('footer.sections.products.links.mechanical')}
                        </Link>
                        <Link href="/products/gloves/welding" className="text-gray-600 dark:text-gray-400 hover:text-brand-primary dark:hover:text-brand-primary transition-colors duration-200 hover:translate-x-1 transform">
                          {t('footer.sections.products.links.welding')}
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
              
            {/* Industries */}
            <div className="min-w-[100px]">
              <button 
                onClick={() => setIsIndustriesOpen(!isIndustriesOpen)}
                className="flex items-center gap-2 font-semibold text-gray-900 dark:text-white hover:text-brand-primary dark:hover:text-brand-primary transition-colors duration-200 text-sm sm:text-base group"
              >
                {t('footer.sections.industries.title')}
                {isIndustriesOpen ? <ChevronUp className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" /> : <ChevronDown className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" />}
              </button>
              {isIndustriesOpen && (
                <div className="mt-2 flex flex-col gap-1 text-sm animate-in slide-in-from-top-2 duration-200">
                  <Link href="/industries/glass-manufacturing" className="text-gray-600 dark:text-gray-400 hover:text-brand-primary dark:hover:text-brand-primary transition-colors duration-200 hover:translate-x-1 transform">
                    {t('footer.sections.industries.links.glassManufacturing')}
                  </Link>
                </div>
              )}
            </div>
              
            {/* Company */}
            <div className="min-w-[100px]">
              <button 
                onClick={() => setIsCompanyOpen(!isCompanyOpen)}
                className="flex items-center gap-2 font-semibold text-gray-900 dark:text-white hover:text-brand-primary dark:hover:text-brand-primary transition-colors duration-200 text-sm sm:text-base group"
              >
                {t('footer.sections.company.title')}
                {isCompanyOpen ? <ChevronUp className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" /> : <ChevronDown className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" />}
              </button>
              {isCompanyOpen && (
                <div className="mt-2 flex flex-col gap-1 text-sm animate-in slide-in-from-top-2 duration-200">
                  <Link href="/about" className="text-gray-600 dark:text-gray-400 hover:text-brand-primary dark:hover:text-brand-primary transition-colors duration-200 hover:translate-x-1 transform">
                    {t('footer.sections.company.links.about')}
                  </Link>
                  <Link href="/contact" className="text-gray-600 dark:text-gray-400 hover:text-brand-primary dark:hover:text-brand-primary transition-colors duration-200 hover:translate-x-1 transform">
                    {t('footer.sections.company.links.contactUs')}
                  </Link>
                  <Link href="/about/esg" className="text-gray-600 dark:text-gray-400 hover:text-brand-primary dark:hover:text-brand-primary transition-colors duration-200 hover:translate-x-1 transform">
                    {t('footer.sections.company.links.esg')}
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Bottom copyright line */}
        <div className="border-t border-gray-200 dark:border-gray-800 mt-4 pt-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            &copy; {currentYear} Hand Line Company S.r.l. {t('footer.legal.copyright')}
          </p>
          <div className="flex gap-4 text-sm">
            <Link href="/legal?tab=privacy" className="text-gray-500 dark:text-gray-400 hover:text-brand-primary dark:hover:text-brand-primary transition-colors duration-200 hover:underline underline-offset-2">
              {t('footer.legal.links.privacy')}
            </Link>
            <Link href="/legal?tab=terms" className="text-gray-500 dark:text-gray-400 hover:text-brand-primary dark:hover:text-brand-primary transition-colors duration-200 hover:underline underline-offset-2">
              {t('footer.legal.links.terms')}
            </Link>
            <Link href="/legal?tab=cookies" className="text-gray-500 dark:text-gray-400 hover:text-brand-primary dark:hover:text-brand-primary transition-colors duration-200 hover:underline underline-offset-2">
              {t('footer.legal.links.cookies')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
