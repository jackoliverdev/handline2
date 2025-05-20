"use client";

import React from "react";
import { Mail, Phone, MapPin, ArrowRight, ChevronRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/lib/context/language-context";

export function Footer() {
  const pathname = usePathname();
  const { t } = useLanguage();
  
  // Don't render the footer on dashboard routes
  if (pathname?.startsWith('/dashboard')) {
    return null;
  }
  
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-brand-light dark:bg-background border-t border-brand-primary/10 dark:border-brand-primary/20">
      <div className="container py-10 sm:py-12 md:py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4 lg:gap-10">
          {/* Company Info */}
          <div className="space-y-4 sm:space-y-5">
            <div className="flex items-center space-x-2">
              <div className="relative h-9 w-9 sm:h-10 sm:w-10 overflow-hidden rounded-full">
                <Image 
                  src="/handline-logo.png" 
                  alt="HandLine Logo" 
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-lg sm:text-xl font-bold text-brand-dark dark:text-white">HandLine Company</span>
            </div>
            <p className="text-sm sm:text-base text-brand-secondary dark:text-gray-300 max-w-md">
              {t('footer.companyDescription')}
            </p>
            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-start space-x-2 sm:space-x-3">
                <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-brand-primary mt-0.5" />
                <p className="text-sm sm:text-base text-brand-secondary dark:text-gray-300">
                  {t('footer.address')}
                </p>
              </div>
              <div className="flex items-center space-x-2 sm:space-x-3">
                <Phone className="h-4 w-4 sm:h-5 sm:w-5 text-brand-primary" />
                <p className="text-sm sm:text-base text-brand-secondary dark:text-gray-300">
                  {t('footer.phone')}
                </p>
              </div>
              <div className="flex items-center space-x-2 sm:space-x-3">
                <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-brand-primary" />
                <p className="text-sm sm:text-base text-brand-secondary dark:text-gray-300">
                  {t('footer.email')}
                </p>
              </div>
            </div>
            <div className="flex space-x-3 sm:space-x-4 pt-1 sm:pt-2">
              {/* LinkedIn */}
              <a href="#" aria-label="LinkedIn" className="bg-white dark:bg-gray-800 h-8 w-8 sm:h-10 sm:w-10 rounded-full flex items-center justify-center shadow-sm hover:shadow-md transition-all duration-300 group">
                <svg className="h-4 w-4 sm:h-5 sm:w-5 text-brand-primary group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
              {/* Facebook */}
              <a href="#" aria-label="Facebook" className="bg-white dark:bg-gray-800 h-8 w-8 sm:h-10 sm:w-10 rounded-full flex items-center justify-center shadow-sm hover:shadow-md transition-all duration-300 group">
                <svg className="h-4 w-4 sm:h-5 sm:w-5 text-brand-primary group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z" />
                </svg>
              </a>
              {/* Instagram */}
              <a href="#" aria-label="Instagram" className="bg-white dark:bg-gray-800 h-8 w-8 sm:h-10 sm:w-10 rounded-full flex items-center justify-center shadow-sm hover:shadow-md transition-all duration-300 group">
                <svg className="h-4 w-4 sm:h-5 sm:w-5 text-brand-primary group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Links Sections - Mobile Friendly with Grid */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div className="space-y-4">
                <h3 className="text-base sm:text-lg font-bold text-brand-dark dark:text-white">{t('footer.sections.products.title')}</h3>
                <ul className="space-y-2 sm:space-y-3">
                  <li>
                    <Link href="/products/heat-resistant" className="inline-flex items-center text-sm sm:text-base text-brand-secondary dark:text-gray-300 hover:text-brand-primary dark:hover:text-brand-primary transition-colors">
                      <ChevronRight className="h-3 w-3 mr-1 text-brand-primary/70" />
                      {t('footer.sections.products.links.heatResistant')}
                    </Link>
                  </li>
                  <li>
                    <Link href="/products/cut-resistant" className="inline-flex items-center text-sm sm:text-base text-brand-secondary dark:text-gray-300 hover:text-brand-primary dark:hover:text-brand-primary transition-colors">
                      <ChevronRight className="h-3 w-3 mr-1 text-brand-primary/70" />
                      {t('footer.sections.products.links.cutResistant')}
                    </Link>
                  </li>
                  <li>
                    <Link href="/products/welding" className="inline-flex items-center text-sm sm:text-base text-brand-secondary dark:text-gray-300 hover:text-brand-primary dark:hover:text-brand-primary transition-colors">
                      <ChevronRight className="h-3 w-3 mr-1 text-brand-primary/70" />
                      {t('footer.sections.products.links.welding')}
                    </Link>
                  </li>
                  <li>
                    <Link href="/products/chemical-resistant" className="inline-flex items-center text-sm sm:text-base text-brand-secondary dark:text-gray-300 hover:text-brand-primary dark:hover:text-brand-primary transition-colors">
                      <ChevronRight className="h-3 w-3 mr-1 text-brand-primary/70" />
                      {t('footer.sections.products.links.chemical')}
                    </Link>
                  </li>
                </ul>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-base sm:text-lg font-bold text-brand-dark dark:text-white">{t('footer.sections.industries.title')}</h3>
                <ul className="space-y-2 sm:space-y-3">
                  <li>
                    <Link href="/industries/glass" className="inline-flex items-center text-sm sm:text-base text-brand-secondary dark:text-gray-300 hover:text-brand-primary dark:hover:text-brand-primary transition-colors">
                      <ChevronRight className="h-3 w-3 mr-1 text-brand-primary/70" />
                      {t('footer.sections.industries.links.glass')}
                    </Link>
                  </li>
                  <li>
                    <Link href="/industries/metal" className="inline-flex items-center text-sm sm:text-base text-brand-secondary dark:text-gray-300 hover:text-brand-primary dark:hover:text-brand-primary transition-colors">
                      <ChevronRight className="h-3 w-3 mr-1 text-brand-primary/70" />
                      {t('footer.sections.industries.links.metalworking')}
                    </Link>
                  </li>
                  <li>
                    <Link href="/industries/welding" className="inline-flex items-center text-sm sm:text-base text-brand-secondary dark:text-gray-300 hover:text-brand-primary dark:hover:text-brand-primary transition-colors">
                      <ChevronRight className="h-3 w-3 mr-1 text-brand-primary/70" />
                      {t('footer.sections.industries.links.welding')}
                    </Link>
                  </li>
                  <li>
                    <Link href="/industries/automotive" className="inline-flex items-center text-sm sm:text-base text-brand-secondary dark:text-gray-300 hover:text-brand-primary dark:hover:text-brand-primary transition-colors">
                      <ChevronRight className="h-3 w-3 mr-1 text-brand-primary/70" />
                      {t('footer.sections.industries.links.automotive')}
                    </Link>
                  </li>
                </ul>
              </div>
              
              <div className="space-y-4 col-span-2 md:col-span-1">
                <h3 className="text-base sm:text-lg font-bold text-brand-dark dark:text-white">{t('footer.sections.company.title')}</h3>
                <ul className="space-y-2 sm:space-y-3">
                  <li>
                    <Link href="/about" className="inline-flex items-center text-sm sm:text-base text-brand-secondary dark:text-gray-300 hover:text-brand-primary dark:hover:text-brand-primary transition-colors">
                      <ChevronRight className="h-3 w-3 mr-1 text-brand-primary/70" />
                      {t('footer.sections.company.links.about')}
                    </Link>
                  </li>
                  <li>
                    <Link href="/about#certifications" className="inline-flex items-center text-sm sm:text-base text-brand-secondary dark:text-gray-300 hover:text-brand-primary dark:hover:text-brand-primary transition-colors">
                      <ChevronRight className="h-3 w-3 mr-1 text-brand-primary/70" />
                      {t('footer.sections.company.links.certifications')}
                    </Link>
                  </li>
                  <li>
                    <Link href="/resources/blog" className="inline-flex items-center text-sm sm:text-base text-brand-secondary dark:text-gray-300 hover:text-brand-primary dark:hover:text-brand-primary transition-colors">
                      <ChevronRight className="h-3 w-3 mr-1 text-brand-primary/70" />
                      {t('footer.sections.company.links.blog')}
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact" className="inline-flex items-center text-sm sm:text-base text-brand-secondary dark:text-gray-300 hover:text-brand-primary dark:hover:text-brand-primary transition-colors">
                      <ChevronRight className="h-3 w-3 mr-1 text-brand-primary/70" />
                      {t('footer.sections.company.links.contact')}
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="mt-8 sm:mt-10 pt-6 sm:pt-8 border-t border-brand-primary/10 dark:border-brand-primary/20">
          <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
            <p className="text-xs sm:text-sm text-brand-secondary dark:text-gray-400">
              &copy; {currentYear} HandLine Company. {t('footer.legal.copyright')}
            </p>
            <div className="flex flex-wrap gap-x-4 sm:gap-x-6 gap-y-2">
              <Link href="/legal?tab=privacy" className="text-xs sm:text-sm text-brand-secondary dark:text-gray-400 hover:text-brand-primary dark:hover:text-brand-primary transition-colors">
                {t('footer.legal.links.privacy')}
              </Link>
              <Link href="/legal?tab=terms" className="text-xs sm:text-sm text-brand-secondary dark:text-gray-400 hover:text-brand-primary dark:hover:text-brand-primary transition-colors">
                {t('footer.legal.links.terms')}
              </Link>
              <Link href="/legal?tab=cookies" className="text-xs sm:text-sm text-brand-secondary dark:text-gray-400 hover:text-brand-primary dark:hover:text-brand-primary transition-colors">
                {t('footer.legal.links.cookies')}
              </Link>
              <Link href="/legal?tab=standards" className="text-xs sm:text-sm text-brand-secondary dark:text-gray-400 hover:text-brand-primary dark:hover:text-brand-primary transition-colors">
                {t('footer.legal.links.standards')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
