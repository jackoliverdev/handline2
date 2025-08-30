"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { X, User, Shield, Menu, ChevronRight, ChevronDown, FileText, Users, Factory, Flame, Scissors, Settings, Briefcase, Globe, Newspaper, BookOpen, FileCheck, LayoutDashboard, MessageCircle, Home } from "lucide-react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useLanguage } from "@/lib/context/language-context";
import { SearchDropdown } from "@/components/website/search/search-dropdown";

type SidebarProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function WebsiteSidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname() || "";
  const { t, language, setLanguage } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  // Expanded category states
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  // Toggle category expansion
  const toggleCategory = (categoryId: string) => {
    if (expandedCategory === categoryId) {
      setExpandedCategory(null);
    } else {
      setExpandedCategory(categoryId);
    }
  };

  // Toggle section expansion
  const toggleSection = (sectionId: string) => {
    if (expandedSection === sectionId) {
      setExpandedSection(null);
    } else {
      setExpandedSection(sectionId);
    }
  };

  return (
    <>
      {/* Full-screen overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[1000] md:hidden" 
          onClick={onClose}
        />
      )}
      
      {/* Sidebar panel */}
      <div 
        className={`
          fixed inset-y-0 left-0 z-[1001] w-[280px] bg-white/100 dark:bg-black/100
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="flex items-center justify-between p-3 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <Link href="/">
              <div className="flex items-center">
                <Image 
                  src="/Logo-HLC.png" 
                  alt="Hand Line"
                  width={32} 
                  height={32}
                  className="h-8 w-8 mr-2" 
                />
                <h2 className="text-base font-bold text-slate-900 dark:text-white">
                  Hand <span className="text-[#F28C38]">Line</span>
                </h2>
              </div>
            </Link>
          </div>
          <button 
            onClick={onClose}
            className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        {/* Search Input */}
        <div className="p-2">
          <SearchDropdown
            query={searchQuery}
            onQueryChange={setSearchQuery}
            isOpen={isSearchOpen}
            onOpenChange={setIsSearchOpen}
            className="w-full"
            placeholder={t('search.sidebarSearchPlaceholder')}
          />
        </div>
        
        <div className="overflow-y-auto h-[calc(100vh-200px)] pb-16">
          {/* Main navigation sections */}
          <div className="mt-2">
            {/* Home Section */}
            <div className="px-3 py-1.5 text-slate-700 dark:text-slate-300 hover:bg-white/60 dark:hover:bg-black/60 transition-colors">
              <Link 
                href="/"
                className="flex items-center"
                onClick={onClose}
              >
                <div className="w-7 h-7 bg-gradient-to-br from-[#F28C38] to-[#E67A2C] text-white rounded-full flex items-center justify-center mr-2.5">
                  <Home className="h-4 w-4" />
                </div>
                <span className="text-sm">{t('navbar.home')}</span>
              </Link>
            </div>

            {/* Products Section */}
            <div>
              <div
                className="flex items-center justify-between px-3 py-1.5 text-slate-700 dark:text-slate-300 hover:bg-white/60 dark:hover:bg-black/60 transition-colors cursor-pointer"
                onClick={() => toggleSection('products')}
              >
                <div className="flex items-center">
                  <div className="w-7 h-7 bg-gradient-to-br from-[#F28C38] to-[#E67A2C] text-white rounded-full flex items-center justify-center mr-2.5">
                    <LayoutDashboard className="h-4 w-4" />
                  </div>
                  <span className="text-sm">{t('navbar.products')}</span>
                </div>
                {expandedSection === 'products' ? (
                  <ChevronDown className="h-3.5 w-3.5 text-slate-500" />
                ) : (
                  <ChevronRight className="h-3.5 w-3.5 text-slate-500" />
                )}
              </div>
              
              {expandedSection === 'products' && (
                <div className="ml-10 pl-2 border-l border-gray-300 dark:border-gray-600">
                  {/* All Products */}
                  <div className="py-1.5 text-slate-700 dark:text-slate-300 hover:bg-white/60 dark:hover:bg-black/60 transition-colors">
                    <Link 
                      href="/products"
                      className="flex items-center"
                      onClick={onClose}
                    >
                      <LayoutDashboard className="h-4 w-4 text-slate-500 dark:text-slate-400 mr-2" />
                      <span className="text-sm">{t('navbar.allProducts')}</span>
                    </Link>
                  </div>

                  {/* Gloves */}
                  <div
                    className="flex items-center justify-between py-1.5 text-slate-700 dark:text-slate-300 hover:bg-white/60 dark:hover:bg-black/60 transition-colors cursor-pointer"
                    onClick={() => toggleCategory('gloves')}
                  >
                    <div className="flex items-center">
                      <Shield className="h-4 w-4 text-slate-500 dark:text-slate-400 mr-2" />
                      <span className="text-sm">{t('navbar.safetyGloves')}</span>
                    </div>
                    {expandedCategory === 'gloves' ? (
                      <ChevronDown className="h-3.5 w-3.5 text-slate-500" />
                    ) : (
                      <ChevronRight className="h-3.5 w-3.5 text-slate-500" />
                    )}
                  </div>
                  
                  {expandedCategory === 'gloves' && (
                    <div className="ml-6 pl-2 border-l border-gray-300 dark:border-gray-600">
                      <Link 
                        href="/products/gloves"
                        className="block py-1.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                        onClick={onClose}
                      >
                        {t('navbar.allGloves')}
                      </Link>
                      <Link 
                        href="/products/gloves/heat"
                        className="block py-1.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                        onClick={onClose}
                      >
                        {t('navbar.heatResistant')}
                      </Link>
                      <Link 
                        href="/products/gloves/cut"
                        className="block py-1.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                        onClick={onClose}
                      >
                        {t('navbar.cutResistant')}
                      </Link>
                      <Link 
                        href="/products/gloves/general"
                        className="block py-1.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                        onClick={onClose}
                      >
                        {t('navbar.generalPurpose')}
                      </Link>
                      <Link 
                        href="/products/gloves/mechanical"
                        className="block py-1.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                        onClick={onClose}
                      >
                        {t('navbar.mechanicalHazards')}
                      </Link>
                      <Link 
                        href="/products/gloves/welding"
                        className="block py-1.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                        onClick={onClose}
                      >
                        {t('navbar.welding')}
                      </Link>
                    </div>
                  )}

                  {/* Industrial Swabs */}
                  <div className="py-1.5 text-slate-700 dark:text-slate-300 hover:bg-white/60 dark:hover:bg-black/60 transition-colors">
                    <Link 
                      href="/products/industrial-swabs"
                      className="flex items-center"
                      onClick={onClose}
                    >
                      <Scissors className="h-4 w-4 text-slate-500 dark:text-slate-400 mr-2" />
                      <span className="text-sm">{t('navbar.industrialSwabs')}</span>
                    </Link>
                  </div>

                  {/* Respiratory Protection */}
                  <div className="py-1.5 text-slate-700 dark:text-slate-300 hover:bg-white/60 dark:hover:bg-black/60 transition-colors">
                    <Link 
                      href="/products/respiratory"
                      className="flex items-center"
                      onClick={onClose}
                    >
                      <Shield className="h-4 w-4 text-slate-500 dark:text-slate-400 mr-2" />
                      <span className="text-sm">{t('navbar.respiratoryProtection')}</span>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Industries Section */}
            <div className="px-3 py-1.5 text-slate-700 dark:text-slate-300 hover:bg-white/60 dark:hover:bg-black/60 transition-colors">
              <Link 
                href="/industries"
                className="flex items-center"
                onClick={onClose}
              >
                <div className="w-7 h-7 bg-gradient-to-br from-[#E67A2C] to-[#D96920] text-white rounded-full flex items-center justify-center mr-2.5">
                  <Factory className="h-4 w-4" />
                </div>
                <span className="text-sm">{t('navbar.industries')}</span>
              </Link>
            </div>

            {/* About Section */}
            <div>
              <div
                className="flex items-center justify-between px-3 py-1.5 text-slate-700 dark:text-slate-300 hover:bg-white/60 dark:hover:bg-black/60 transition-colors cursor-pointer"
                onClick={() => toggleSection('about')}
              >
                <div className="flex items-center">
                  <div className="w-7 h-7 bg-gradient-to-br from-[#F28C38] via-[#E67A2C] to-[#D96920] text-white rounded-full flex items-center justify-center mr-2.5">
                    <Users className="h-4 w-4" />
                  </div>
                  <span className="text-sm">{t('navbar.about')}</span>
                </div>
                {expandedSection === 'about' ? (
                  <ChevronDown className="h-3.5 w-3.5 text-slate-500" />
                ) : (
                  <ChevronRight className="h-3.5 w-3.5 text-slate-500" />
                )}
              </div>
              
              {expandedSection === 'about' && (
                <div className="ml-10 pl-2 border-l border-gray-300 dark:border-gray-600">
                  <Link 
                    href="/about" 
                    className="flex items-center py-1.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    onClick={onClose}
                  >
                    <span>{t('navbar.aboutDropdown.ourCompany')}</span>
                  </Link>
                  <Link 
                    href="/about/esg" 
                    className="flex items-center py-1.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    onClick={onClose}
                  >
                    <span>{t('navbar.aboutDropdown.esg')}</span>
                  </Link>
                </div>
              )}
            </div>

            {/* Partners Section */}
            <div>
              <Link 
                href="/partners" 
                className="flex items-center px-3 py-1.5 text-slate-700 dark:text-slate-300 hover:bg-white/60 dark:hover:bg-black/60 transition-colors"
                onClick={onClose}
              >
                <div className="w-7 h-7 bg-gradient-to-br from-[#E67A2C] to-[#D96920] text-white rounded-full flex items-center justify-center mr-2.5">
                  <Briefcase className="h-4 w-4" />
                </div>
                <span className="text-sm">{t('navbar.partners')}</span>
              </Link>
            </div>
            
            {/* Resources section */}
            <div>
              <div 
                className="flex items-center justify-between px-3 py-1.5 text-slate-700 dark:text-slate-300 hover:bg-white/60 dark:hover:bg-black/60 transition-colors cursor-pointer"
                onClick={() => toggleSection('resources')}
              >
                <div className="flex items-center">
                  <div className="w-7 h-7 bg-gradient-to-br from-[#F28C38] to-[#E67A2C] text-white rounded-full flex items-center justify-center mr-2.5">
                    <BookOpen className="h-4 w-4" />
                  </div>
                  <span className="text-sm">{t('navbar.resources')}</span>
                </div>
                {expandedSection === 'resources' ? (
                  <ChevronDown className="h-3.5 w-3.5 text-slate-500" />
                ) : (
                  <ChevronRight className="h-3.5 w-3.5 text-slate-500" />
                )}
              </div>
              
              {expandedSection === 'resources' && (
                <div className="ml-10 pl-2 border-l border-gray-300 dark:border-gray-600">
                  <Link 
                    href="/resources/blog" 
                    className="flex items-center py-1.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    onClick={onClose}
                  >
                    <span>{t('navbar.resourcesDropdown.blog')}</span>
                  </Link>
                  <Link 
                    href="/resources/case-studies" 
                    className="flex items-center py-1.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    onClick={onClose}
                  >
                    <span>{t('navbar.resourcesDropdown.caseStudies')}</span>
                  </Link>
                  <Link 
                    href="/resources/en-resource-centre" 
                    className="flex items-center py-1.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    onClick={onClose}
                  >
                    <span>{t('navbar.resourcesDropdown.enResourceCentre')}</span>
                  </Link>
                  <Link 
                    href="/resources/product-disclaimer" 
                    className="flex items-center py-1.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    onClick={onClose}
                  >
                    <span>{t('navbar.resourcesDropdown.productDisclaimer')}</span>
                  </Link>
                  <Link 
                    href="/resources/declarations" 
                    className="flex items-center py-1.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    onClick={onClose}
                  >
                    <span>{t('navbar.resourcesDropdown.declarations')}</span>
                  </Link>
                </div>
              )}
            </div>
          </div>
          
          {/* Language Selector */}
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 px-3">
            <div className="flex items-center text-slate-700 dark:text-slate-300">
              <Globe className="h-4 w-4 mr-2 text-slate-500 dark:text-slate-400" />
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-500 uppercase tracking-wider">
                {t('navbar.language.toggleLabel')}
              </span>
            </div>
            <div className="mt-2 pl-6">
              <button 
                onClick={() => setLanguage('en')}
                className={`block py-1.5 text-xs ${language === 'en' ? 'text-slate-900 dark:text-white' : 'text-slate-600 dark:text-slate-400'} hover:text-[#F28C38] transition-colors`}
              >
                <span role="img" aria-label="English" className="mr-2">🇬🇧</span> {t('navbar.language.en')}
              </button>
              <button 
                onClick={() => setLanguage('it')}
                className={`block py-1.5 text-xs ${language === 'it' ? 'text-slate-900 dark:text-white' : 'text-slate-600 dark:text-slate-400'} hover:text-[#F28C38] transition-colors`}
              >
                <span role="img" aria-label="Italian" className="mr-2">🇮🇹</span> {t('navbar.language.it')}
              </button>
            </div>
          </div>
        </div>
        
        {/* Contact button */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-white/90 dark:bg-black/90 border-t border-gray-200 dark:border-gray-700">
          <Link
            href="/contact"
            className="flex items-center justify-center py-3 px-4 bg-gradient-to-r from-[#F28C38] to-[#E67A2C] hover:from-[#E67A2C] hover:to-[#D96920] text-white font-medium rounded-md shadow-md transition-all"
            onClick={onClose}
          >
            <MessageCircle className="h-5 w-5 mr-2" />
            <span>{t('navbar.contact')}</span>
          </Link>
        </div>
      </div>
    </>
  );
} 