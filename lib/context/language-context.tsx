"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import enTranslations from '../translations/en.json';
import itTranslations from '../translations/it.json';

type Language = 'en' | 'it';
export type { Language };
type Translations = typeof enTranslations;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: enTranslations,
  it: itTranslations,
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');
  const [isHydrated, setIsHydrated] = useState(false);

  // Load language preference from localStorage on mount (client-side only)
  useEffect(() => {
    // Ensure we're on the client side
    if (typeof window !== 'undefined') {
      const savedLanguage = localStorage.getItem('language') as Language;
      if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'it')) {
        setLanguage(savedLanguage);
      }
      setIsHydrated(true);
    }
  }, []);

  // Save language preference to localStorage when it changes (client-side only)
  useEffect(() => {
    if (isHydrated && typeof window !== 'undefined') {
      localStorage.setItem('language', language);
      console.log('Language saved to localStorage:', language);
    }
  }, [language, isHydrated]);

  // Translation function
  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[language];

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        console.warn(`Translation key not found: ${key}`);
        return key;
      }
    }

    return typeof value === 'string' ? value : key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

// Helper to get the current language (for server components or SSR)
export function getCurrentLanguage(): Language {
  if (typeof window !== 'undefined') {
    try {
      const savedLanguage = localStorage.getItem('language') as Language;
      if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'it')) {
        return savedLanguage;
      }
    } catch (error) {
      console.warn('Failed to read from localStorage:', error);
    }
  }
  // Default to English if localStorage is not available or contains invalid data
  return 'en';
} 