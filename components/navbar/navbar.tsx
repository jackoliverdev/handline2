"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { WebsiteThemeToggle } from "@/components/theme/website-theme-toggle";
import { WebsiteLanguageToggle } from "@/components/theme/website-language-toggle";
import { WebsiteSearchToggle } from "@/components/theme/website-search-toggle";
import { useLanguage } from "@/lib/context/language-context";
import { Menu, ChevronDown } from "lucide-react";
import WebsiteSidebar from "@/components/website/sidebar";
import { SearchDropdown } from "@/components/website/search/search-dropdown";

// Define navigation items structure
const getNavItems = (t: any) => [
  { href: "/", label: t("navbar.home") },
  { 
    href: "/products", 
    label: t("navbar.products"),
    hasDropdown: true,
    dropdownItems: [
      { href: "/products", label: t("navbar.allProducts") },
      { href: "/products/gloves", label: t("navbar.safetyGloves") },
      // { href: "/products/industrial-swabs", label: t("navbar.industrialSwabs") },
      // { href: "/products/respiratory", label: t("navbar.respiratoryProtection") },
    ]
  },
  { href: "/industries", label: t("navbar.industries") },
  { 
    href: "/about", 
    label: t("navbar.about"),
    hasDropdown: true,
    dropdownItems: [
      { href: "/about", label: t("navbar.aboutDropdown.ourCompany") },
      { href: "/about/esg", label: t("navbar.aboutDropdown.esg") },
      // { href: "/careers", label: t("navbar.aboutDropdown.careers") },
    ]
  },
  { 
    href: "/partners", 
    label: t("navbar.partners")
  },
  /*
  { 
    href: "/resources", 
    label: t("navbar.resources"),
    hasDropdown: true,
    dropdownItems: [
      { href: "/resources/blog", label: t("navbar.resourcesDropdown.blog") },
      { href: "/resources/case-studies", label: t("navbar.resourcesDropdown.caseStudies") },
      { href: "/resources/en-resource-centre", label: t("navbar.resourcesDropdown.enResourceCentre") },
      { href: "/resources/product-disclaimer", label: t("navbar.resourcesDropdown.productDisclaimer") },
      { href: "/resources/declarations", label: t("navbar.resourcesDropdown.declarations") },
    ]
  },
  */
  { href: "/contact", label: t("navbar.contact") },
];

export const NavBar = () => {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { t, language, setLanguage } = useLanguage();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const searchOverlayRef = useRef<HTMLDivElement>(null);
  const searchButtonRef = useRef<HTMLDivElement>(null);
  
  // Generate navigation items with translation
  const NAV_ITEMS = getNavItems(t);

  // Helper function to determine if a nav item is active
  const isNavItemActive = (item: any) => {
    if (!pathname) return false;
    
    // Exact match for home
    if (item.href === "/" && pathname === "/") return true;
    
    // For other items, check if pathname starts with the base path
    if (item.href !== "/" && pathname.startsWith(item.href)) return true;
    
    // Special cases for nested routes
    if (item.href === "/about" && pathname.startsWith("/careers")) return true;
    if (item.href === "/resources" && (
      pathname.startsWith("/resources/blog") || 
      pathname.startsWith("/resources/case-studies") || 
      pathname.startsWith("/resources/en-resource-centre") ||
      pathname.startsWith("/resources/product-disclaimer") ||
      pathname.startsWith("/resources/declarations")
    )) return true;
    
    return false;
  };

  // Helper function to determine if a dropdown item is active
  const isDropdownItemActive = (dropdownItem: any) => {
    if (!pathname) return false;
    
    // Exact match
    if (dropdownItem.href === pathname) return true;
    
    // Special case for "All Products" - should only be active on exact /products page
    if (dropdownItem.href === "/products" && pathname !== "/products") return false;
    
    // Special case for "Our Company" - should only be active on exact /about page
    if (dropdownItem.href === "/about" && pathname !== "/about") return false;
    
    // For non-root paths, check if pathname starts with the href
    if (dropdownItem.href !== "/" && pathname.startsWith(dropdownItem.href)) return true;
    
    return false;
  };

  // Don't render the navbar on dashboard routes
  if (pathname?.startsWith('/dashboard') || pathname?.startsWith('/app')) {
    return null;
  }

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled]);

  // Handle click outside search overlay
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      
      // Don't close if clicking on the search overlay or desktop search button
      if (searchOverlayRef.current && !searchOverlayRef.current.contains(target) &&
          searchButtonRef.current && !searchButtonRef.current.contains(target)) {
        setIsSearchOpen(false);
      }
    };

    if (isSearchOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isSearchOpen]);

  // Handle escape key to close search
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isSearchOpen]);

  return (
    <header className="fixed w-full z-50 top-0 left-0 right-0">
      <nav className={`w-full transition-all duration-300 ${
        scrolled 
          ? "bg-white/100 dark:bg-black/100 shadow-lg"
          : "bg-white/100 dark:bg-black/100"
      }`}>
        {/* Main navbar content */}
        <div className="container mx-auto px-4">
          <div className="py-3">
            {/* Mobile Navigation */}
            <div className="flex items-center justify-between lg:hidden">
              <button 
                className={`flex items-center px-1 ${scrolled ? 'text-slate-900 dark:text-white' : 'text-slate-900 dark:text-white'}`}
                aria-label="Open Menu"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              >
                <Menu className="h-6 w-6" />
                <span className="text-xs uppercase ml-1">{t('navbar.menu')}</span>
              </button>
              
              <div className="flex items-center space-x-1 flex-shrink-0">
                <Link href="/" className="flex-shrink-0">
                  <div className="flex items-center justify-center">
                    <Image 
                      src="/faviconBLACK.png" 
                      alt="Hand Line"
                      width={40} 
                      height={40}
                      className="h-10 w-10 block dark:hidden" 
                    />
                    <Image 
                      src="/favicon.png" 
                      alt="Hand Line"
                      width={40} 
                      height={40}
                      className="h-10 w-10 hidden dark:block" 
                    />
                  </div>
                </Link>
                
                <Link href="/" className="font-bold text-lg tracking-tight">
                  <span className="text-slate-900 dark:text-white">Hand Line</span>
                </Link>
              </div>
              
              <div className="flex items-center space-x-4">
                <WebsiteThemeToggle variant="ghost" className={scrolled ? 'text-slate-900 dark:text-white' : 'text-slate-900 dark:text-white'} />
                <WebsiteLanguageToggle className={scrolled ? 'text-slate-900 dark:text-white' : 'text-slate-900 dark:text-white'} />
              </div>
            </div>

            {/* Mobile Search Bar */}
            {/* Search is now only available in the mobile sidebar menu */}

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center justify-between py-2">
              <div className="flex items-center space-x-1">
                <Link href="/" className="flex-shrink-0">
                  <div className="flex items-center justify-center">
                    <Image 
                      src="/faviconBLACK.png" 
                      alt="Hand Line"
                      width={40} 
                      height={40}
                      className="h-10 w-10 block dark:hidden" 
                    />
                    <Image 
                      src="/favicon.png" 
                      alt="Hand Line"
                      width={40} 
                      height={40}
                      className="h-10 w-10 hidden dark:block" 
                    />
                  </div>
                </Link>
                
                <Link href="/" className="font-bold text-xl tracking-tight">
                  <span className="text-slate-900 dark:text-white">Hand Line</span>
                </Link>
              </div>

              {/* Navigation Items */}
              <nav className="flex items-center space-x-8">
                {NAV_ITEMS.map((item) => (
                  <div key={item.href} className="relative group">
                    <Link
                      href={item.href}
                      className={`
                        text-sm font-medium transition-colors flex items-center
                        ${isNavItemActive(item) 
                          ? "text-brand-primary" 
                          : "text-slate-900 dark:text-white hover:text-brand-primary dark:hover:text-brand-primary"
                        }
                      `}
                    >
                      {item.label}
                      {item.hasDropdown && <ChevronDown className="h-4 w-4 ml-1" />}
                    </Link>
                    
                    {item.hasDropdown && (
                      <div className="absolute left-0 mt-1 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-in-out">
                        <div className="bg-white/100 dark:bg-black/100 rounded-lg shadow-lg py-1 border border-slate-200 dark:border-[#333333]">
                          {item.dropdownItems?.map((dropdownItem) => (
                            <Link
                              key={dropdownItem.href}
                              href={dropdownItem.href}
                              className={`
                                block px-4 py-2 text-sm transition-colors font-medium
                                ${isDropdownItemActive(dropdownItem) 
                                  ? "text-brand-primary" 
                                  : "text-slate-900 dark:text-white hover:text-brand-primary dark:hover:text-brand-primary"
                                }
                              `}
                            >
                              {dropdownItem.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </nav>

              {/* Right Side Actions */}
              <div className="flex items-center space-x-4">
                {/* Search */}
                <div ref={searchButtonRef}>
                  <WebsiteSearchToggle 
                    className="text-slate-900 dark:text-white" 
                    isOpen={isSearchOpen}
                    onToggle={() => setIsSearchOpen(!isSearchOpen)}
                  />
                </div>
                
                {/* Settings Group */}
                <div className="flex items-center space-x-2 pl-4 border-l border-slate-200 dark:border-[#333333]">
                  <WebsiteThemeToggle variant="ghost" className="text-slate-900 dark:text-white" />
                  <WebsiteLanguageToggle className="text-slate-900 dark:text-white" />
                </div>
              </div>
            </div>

            {/* Desktop Search Dropdown - positioned absolutely when open */}
            {isSearchOpen && (
              <div 
                ref={searchOverlayRef}
                className="hidden lg:block absolute top-full left-0 right-0 bg-[#F5EFE0]/95 dark:bg-[#121212]/95 backdrop-blur-sm border-b border-slate-200 dark:border-[#333333] shadow-lg"
              >
                <div className="container mx-auto px-4 py-4">
                  <SearchDropdown
                    query={searchQuery}
                    onQueryChange={setSearchQuery}
                    isOpen={true}
                    onOpenChange={() => {}} // Don't let SearchDropdown close the navbar overlay
                    className="w-full max-w-2xl mx-auto"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <WebsiteSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
    </header>
  );
};
