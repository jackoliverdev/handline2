"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { X, User, Shield, Menu, ChevronRight, Search, Loader2, ChevronDown, FileText, Users, Factory, Flame, Scissors, Settings } from "lucide-react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useLanguage } from "@/lib/context/language-context";

type SidebarProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function WebsiteSidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname() || "";
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
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

  // Handle search input changes with debounce
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    
    if (query.length < 2) {
      return;
    }
    
    setIsSearching(true);
    
    searchTimeoutRef.current = setTimeout(() => {
      setIsSearching(false);
    }, 300);
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
          fixed inset-y-0 left-0 z-[1001] w-[250px] bg-[#111111] dark:bg-[#111111]
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="flex items-center justify-between p-3 border-b border-[#222222]">
          <div className="flex items-center">
            <Link href="/">
              <div className="flex items-center">
                <Image 
                  src="/handline-logo.png" 
                  alt="Hand Line"
                  width={32} 
                  height={32}
                  className="h-8 w-8 mr-2" 
                />
                <h2 className="text-base font-bold text-white">
                  Hand <span className="text-[#F28C38]">Line</span>
                </h2>
              </div>
            </Link>
          </div>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        {/* Search Input */}
        <div className="p-2">
          <div className="relative">
            <input
              type="text"
              placeholder={t('navbar.searchPlaceholder')}
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full py-1.5 px-3 pl-8 bg-[#222222] border border-[#333333] text-white rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-[#F28C38]"
            />
            <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none">
              {isSearching ? (
                <Loader2 className="h-4 w-4 text-slate-400 animate-spin" />
              ) : (
                <Search className="h-4 w-4 text-slate-400" />
              )}
            </div>
          </div>
        </div>
        
        <div className="overflow-y-auto h-[calc(100vh-200px)] pb-16">
          {/* Category links */}
          <div className="mt-2">
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-3 mb-1.5">{t('sidebar.categories')}</h3>

            {/* Heat Protection */}
            <div>
              <div
                className="flex items-center justify-between px-3 py-1.5 text-slate-300 hover:bg-[#222222] transition-colors cursor-pointer"
                onClick={() => toggleCategory('heat')}
              >
                <div className="flex items-center">
                  <div className="w-7 h-7 bg-gradient-to-br from-[#F28C38] to-[#E67A2C] text-white rounded-full flex items-center justify-center mr-2.5">
                    <Flame className="h-4 w-4" />
                  </div>
                  <span className="text-sm">{t('expertise.features.heatProtection.title')}</span>
                </div>
                {expandedCategory === 'heat' ? (
                  <ChevronDown className="h-3.5 w-3.5 text-slate-500" />
                ) : (
                  <ChevronRight className="h-3.5 w-3.5 text-slate-500" />
                )}
              </div>
              
              {expandedCategory === 'heat' && (
                <div className="ml-10 pl-2 border-l border-[#333333]">
                  <Link 
                    href="/products?category=heat-resistant&type=gloves"
                    className="block py-1.5 text-xs text-slate-400 hover:text-white"
                    onClick={onClose}
                  >
                    {t('products.categories.heatResistantGloves')}
                  </Link>
                  <Link 
                    href="/products?category=heat-resistant&type=sleeves"
                    className="block py-1.5 text-xs text-slate-400 hover:text-white"
                    onClick={onClose}
                  >
                    {t('products.categories.heatResistantSleeves')}
                  </Link>
                </div>
              )}
            </div>

            {/* Cut Resistance */}
            <div>
              <div
                className="flex items-center justify-between px-3 py-1.5 text-slate-300 hover:bg-[#222222] transition-colors cursor-pointer"
                onClick={() => toggleCategory('cut')}
              >
                <div className="flex items-center">
                  <div className="w-7 h-7 bg-gradient-to-br from-[#F28C38] via-[#E67A2C] to-[#D96920] text-white rounded-full flex items-center justify-center mr-2.5">
                    <Scissors className="h-4 w-4" />
                  </div>
                  <span className="text-sm">{t('expertise.features.cutResistance.title')}</span>
                </div>
                {expandedCategory === 'cut' ? (
                  <ChevronDown className="h-3.5 w-3.5 text-slate-500" />
                ) : (
                  <ChevronRight className="h-3.5 w-3.5 text-slate-500" />
                )}
              </div>
              
              {expandedCategory === 'cut' && (
                <div className="ml-10 pl-2 border-l border-[#333333]">
                  <Link 
                    href="/products?category=cut-resistant&type=gloves"
                    className="block py-1.5 text-xs text-slate-400 hover:text-white"
                    onClick={onClose}
                  >
                    {t('products.categories.cutResistantGloves')}
                  </Link>
                  <Link 
                    href="/products?category=cut-resistant&type=sleeves"
                    className="block py-1.5 text-xs text-slate-400 hover:text-white"
                    onClick={onClose}
                  >
                    {t('products.categories.cutResistantSleeves')}
                  </Link>
                </div>
              )}
            </div>

            {/* Customisation */}
            <div>
              <div
                className="flex items-center justify-between px-3 py-1.5 text-slate-300 hover:bg-[#222222] transition-colors cursor-pointer"
                onClick={() => toggleCategory('custom')}
              >
                <div className="flex items-center">
                  <div className="w-7 h-7 bg-gradient-to-br from-[#E67A2C] to-[#D96920] text-white rounded-full flex items-center justify-center mr-2.5">
                    <Settings className="h-4 w-4" />
                  </div>
                  <span className="text-sm">{t('expertise.features.customisation.title')}</span>
                </div>
                {expandedCategory === 'custom' ? (
                  <ChevronDown className="h-3.5 w-3.5 text-slate-500" />
                ) : (
                  <ChevronRight className="h-3.5 w-3.5 text-slate-500" />
                )}
              </div>
              
              {expandedCategory === 'custom' && (
                <div className="ml-10 pl-2 border-l border-[#333333]">
                  <Link 
                    href="/products?category=customisation&type=corporate"
                    className="block py-1.5 text-xs text-slate-400 hover:text-white"
                    onClick={onClose}
                  >
                    {t('products.categories.corporateCustomisation')}
                  </Link>
                  <Link 
                    href="/products?category=customisation&type=industrial"
                    className="block py-1.5 text-xs text-slate-400 hover:text-white"
                    onClick={onClose}
                  >
                    {t('products.categories.industrialCustomisation')}
                  </Link>
                </div>
              )}
            </div>
          </div>
          
          {/* Industries section */}
          <div className="mt-3 pt-2 border-t border-[#222222]">
            <div 
              className="flex items-center justify-between px-3 py-1.5 text-slate-300 hover:bg-[#222222] transition-colors cursor-pointer"
              onClick={() => toggleSection('industries')}
            >
              <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{t('sidebar.industries')}</h3>
              {expandedSection === 'industries' ? (
                <ChevronDown className="h-3.5 w-3.5 text-slate-500" />
              ) : (
                <ChevronRight className="h-3.5 w-3.5 text-slate-500" />
              )}
            </div>
            
            {expandedSection === 'industries' && (
              <div className="mt-1">
                <Link 
                  href="/industries/manufacturing" 
                  className="flex items-center px-3 py-1.5 text-slate-300 hover:bg-[#222222] transition-colors"
                  onClick={onClose}
                >
                  <Factory className="h-4 w-4 mr-3 text-slate-400" />
                  <span className="text-sm">{t('industries.manufacturing')}</span>
                </Link>
                {/* Add more industries as needed */}
              </div>
            )}
          </div>
          
          {/* Resources section */}
          <div className="mt-3 pt-2 border-t border-[#222222]">
            <div 
              className="flex items-center justify-between px-3 py-1.5 text-slate-300 hover:bg-[#222222] transition-colors cursor-pointer"
              onClick={() => toggleSection('resources')}
            >
              <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{t('sidebar.resources')}</h3>
              {expandedSection === 'resources' ? (
                <ChevronDown className="h-3.5 w-3.5 text-slate-500" />
              ) : (
                <ChevronRight className="h-3.5 w-3.5 text-slate-500" />
              )}
            </div>
            
            {expandedSection === 'resources' && (
              <div className="mt-1">
                <Link 
                  href="/resources/blog" 
                  className="flex items-center px-3 py-1.5 text-slate-300 hover:bg-[#222222] transition-colors"
                  onClick={onClose}
                >
                  <FileText className="h-4 w-4 mr-3 text-slate-400" />
                  <span className="text-sm">{t('navbar.blog')}</span>
                </Link>
                <Link 
                  href="/about" 
                  className="flex items-center px-3 py-1.5 text-slate-300 hover:bg-[#222222] transition-colors"
                  onClick={onClose}
                >
                  <Users className="h-4 w-4 mr-3 text-slate-400" />
                  <span className="text-sm">{t('navbar.about')}</span>
                </Link>
              </div>
            )}
          </div>
        </div>
        
        {/* Contact button */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-[#111111] border-t border-[#222222]">
          <Link
            href="/contact"
            className="flex items-center justify-center py-3 px-4 bg-gradient-to-r from-[#F28C38] to-[#E67A2C] hover:from-[#E67A2C] hover:to-[#D96920] text-white font-medium rounded-md shadow-md transition-all"
            onClick={onClose}
          >
            <Shield className="h-5 w-5 mr-2" />
            <span>{t('navbar.contact')}</span>
          </Link>
        </div>
      </div>
    </>
  );
} 