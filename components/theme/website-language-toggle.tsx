"use client";

import React from "react";
import { useLanguage } from "@/lib/context/language-context";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface LanguageToggleProps {
  className?: string;
}

// Flag components for better cross-browser compatibility
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

export function WebsiteLanguageToggle({ className }: LanguageToggleProps) {
  const { t, language, setLanguage } = useLanguage();
  
  const currentFlag = language === 'en' ? 'GB' : 'IT';
  const currentLanguage = language === 'en' ? t('navbar.language.en') : t('navbar.language.it');
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size="icon" 
          className={`bg-white dark:bg-black border-slate-200 dark:border-slate-700 hover:bg-brand-primary dark:hover:bg-brand-primary hover:border-brand-primary dark:hover:border-brand-primary transition-all duration-300 hover:scale-105 hover:shadow-xl group !focus:ring-0 !focus:ring-offset-0 !focus-visible:ring-0 !focus-visible:ring-offset-0 !focus-visible:outline-none !focus:outline-none !outline-none [&:focus]:outline-none [&:focus-visible]:outline-none [&:focus]:ring-0 [&:focus-visible]:ring-0 ${className}`}
          aria-label={`Current language: ${currentLanguage}. Click to change language`}
          tabIndex={0}
          style={{ 
            outline: 'none !important', 
            boxShadow: 'none !important',
            border: 'none !important' 
          }}
          data-no-focus-ring="true"
        >
          <FlagIcon 
            country={currentFlag} 
            className="h-[1.2rem] w-[1.2rem] transition-all duration-300 group-hover:scale-110" 
          />
          <span className="sr-only">Toggle language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="bg-white/100 dark:bg-black/100 border-slate-200 dark:border-[#333333] shadow-xl"
      >
        <DropdownMenuItem 
          onClick={() => setLanguage('en')} 
          className={`text-slate-900 dark:text-white hover:bg-slate-100/100 dark:hover:bg-slate-800/100 transition-colors cursor-pointer ${
            language === 'en' ? 'bg-brand-primary/10 text-brand-primary' : ''
          }`}
        >
          <FlagIcon country="GB" className="w-4 h-4 mr-2" />
          {t('navbar.language.en')}
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setLanguage('it')} 
          className={`text-slate-900 dark:text-white hover:bg-slate-100/100 dark:hover:bg-slate-800/100 transition-colors cursor-pointer ${
            language === 'it' ? 'bg-brand-primary/10 text-brand-primary' : ''
          }`}
        >
          <FlagIcon country="IT" className="w-4 h-4 mr-2" />
          {t('navbar.language.it')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
} 