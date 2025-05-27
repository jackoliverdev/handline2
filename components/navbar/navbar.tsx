"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { WebsiteThemeToggle } from "@/components/theme/website-theme-toggle";
import { useLanguage } from "@/lib/context/language-context";
import { Globe, Menu, Search, Shield, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
      { href: "/products/industrial-swabs", label: t("navbar.industrialSwabs") },
      { href: "/products/respiratory", label: t("navbar.respiratoryProtection") },
    ]
  },
  { href: "/industries", label: t("navbar.industries") },
  { 
    href: "/about", 
    label: t("navbar.about"),
    hasDropdown: true,
    dropdownItems: [
      { href: "/about", label: t("navbar.aboutDropdown.ourCompany") },
      { href: "/careers", label: t("navbar.aboutDropdown.careers") },
    ]
  },
  { 
    href: "/partners", 
    label: t("navbar.partners"),
    hasDropdown: true,
    dropdownItems: [
      { href: "/partners/partnerships", label: t("navbar.partnersDropdown.partnerships") },
      { href: "/partners/distribution", label: t("navbar.partnersDropdown.distribution") },
    ]
  },
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
  { href: "/contact", label: t("navbar.contact") },
];

export const NavBar = () => {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { t, language, setLanguage } = useLanguage();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
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

  return (
    <header className="fixed w-full z-50 top-0 left-0 right-0">
      <nav className={`w-full transition-all duration-300 ${
        scrolled 
          ? "bg-white/100 dark:bg-black/100 shadow-lg"
          : "bg-white/100 dark:bg-black/100"
      }`}>
        {/* Announcement bar */}
        <div className="w-full bg-[#F28C38] text-white py-1.5 text-center font-medium flex items-center justify-center whitespace-nowrap px-4">
          <Shield className="h-3 w-3 md:h-4 md:w-4 mr-1.5 flex-shrink-0" /> 
          <span className="text-sm md:text-base">{t('navbar.announcement')}</span>
        </div>

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
              
              <div className="flex items-center space-x-2 flex-shrink-0">
                <Link href="/" className="flex-shrink-0">
                  <div className="flex items-center justify-center">
                    <Image 
                      src="/Logo-HLC.png" 
                      alt="Hand Line"
                      width={32} 
                      height={32}
                      className="h-8 w-8 block dark:hidden" 
                    />
                    <Image 
                      src="/LogoWHITE.png" 
                      alt="Hand Line"
                      width={32} 
                      height={32}
                      className="h-8 w-8 hidden dark:block" 
                    />
                  </div>
                </Link>
                
                <Link href="/" className="font-bold text-lg tracking-tight">
                  <span className="text-[#F28C38]">Hand</span>
                  <span className="text-slate-900 dark:text-white"> Line</span>
                </Link>
              </div>
              
              <div className="flex items-center space-x-4">
                <WebsiteThemeToggle variant="ghost" className={scrolled ? 'text-slate-900 dark:text-white' : 'text-slate-900 dark:text-white'} />
                <DropdownMenu>
                  <DropdownMenuTrigger className="text-slate-900 dark:text-white">
                    <Globe className="h-5 w-5" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-white/100 dark:bg-slate-900/100 border-slate-200 dark:border-slate-800">
                    <DropdownMenuItem onClick={() => setLanguage('en')} className="text-slate-900 dark:text-white hover:bg-slate-100/100 dark:hover:bg-slate-800/100">
                      <span role="img" aria-label="English" className="mr-2">🇬🇧</span> {t('navbar.language.en')}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setLanguage('it')} className="text-slate-900 dark:text-white hover:bg-slate-100/100 dark:hover:bg-slate-800/100">
                      <span role="img" aria-label="Italian" className="mr-2">🇮🇹</span> {t('navbar.language.it')}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {/* Mobile Search Bar */}
            <div className="mt-2 lg:hidden">
              <SearchDropdown
                query={searchQuery}
                onQueryChange={setSearchQuery}
                isOpen={isSearchOpen}
                onOpenChange={setIsSearchOpen}
                className="w-full"
              />
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center justify-between py-2">
              <div className="flex items-center space-x-3">
                <Link href="/" className="flex-shrink-0">
                  <div className="flex items-center justify-center">
                    <Image 
                      src="/Logo-HLC.png" 
                      alt="Hand Line"
                      width={40} 
                      height={40}
                      className="h-10 w-10 block dark:hidden" 
                    />
                    <Image 
                      src="/LogoWHITE.png" 
                      alt="Hand Line"
                      width={40} 
                      height={40}
                      className="h-10 w-10 hidden dark:block" 
                    />
                  </div>
                </Link>
                
                <Link href="/" className="font-bold text-xl tracking-tight">
                  <span className="text-[#F28C38]">Hand</span>
                  <span className="text-slate-900 dark:text-white"> Line</span>
                </Link>
              </div>

              {/* Menu Button */}
              <button 
                className={`hidden lg:flex items-center px-3 py-1.5 ml-8 rounded-lg border ${
                  scrolled 
                    ? 'text-slate-900 dark:text-white border-slate-200 dark:border-[#333333] hover:bg-slate-100/90 dark:hover:bg-black/95' 
                    : 'text-slate-900 dark:text-white border-slate-200 dark:border-[#333333] hover:bg-slate-100/90 dark:hover:bg-black/95'
                } transition-colors`}
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              >
                <Menu className="h-5 w-5 mr-2" />
                <span className="text-sm font-medium">{t('navbar.menu')}</span>
              </button>

              {/* Desktop Search Bar */}
              <div className="flex-1 max-w-4xl mx-6">
                <SearchDropdown
                  query={searchQuery}
                  onQueryChange={setSearchQuery}
                  isOpen={isSearchOpen}
                  onOpenChange={setIsSearchOpen}
                  className="w-full"
                />
              </div>

              {/* Navigation Items */}
              <nav className="flex items-center space-x-6">
                {NAV_ITEMS.map((item) => (
                  <div key={item.href} className="relative group">
                    <Link
                      href={item.href}
                      className={`
                        text-sm font-medium transition-colors flex items-center
                        ${isNavItemActive(item) 
                          ? "text-[#F28C38]" 
                          : "text-slate-900 dark:text-white hover:text-[#F28C38] dark:hover:text-[#F28C38]"
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
                                  ? "text-[#F28C38]" 
                                  : "text-slate-900 dark:text-white hover:text-[#F28C38] dark:hover:text-[#F28C38]"
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

                <div className="flex items-center space-x-4 ml-6">
                  <WebsiteThemeToggle variant="ghost" className="text-slate-900 dark:text-white" />
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger className="text-slate-900 dark:text-white">
                      <Globe className="h-5 w-5" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-white/100 dark:bg-slate-900/100 border-slate-200 dark:border-slate-800">
                      <DropdownMenuItem onClick={() => setLanguage('en')} className="text-slate-900 dark:text-white hover:bg-slate-100/100 dark:hover:bg-slate-800/100">
                        <span role="img" aria-label="English" className="mr-2">🇬🇧</span> {t('navbar.language.en')}
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setLanguage('it')} className="text-slate-900 dark:text-white hover:bg-slate-100/100 dark:hover:bg-slate-800/100">
                        <span role="img" aria-label="Italian" className="mr-2">🇮🇹</span> {t('navbar.language.it')}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <WebsiteSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
    </header>
  );
};
