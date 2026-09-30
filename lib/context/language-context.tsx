"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import enTranslations from '../translations/en.json';
import itTranslations from '../translations/it.json';
import frTranslations from '../translations/fr.json';
import deTranslations from '../translations/de.json';
import esTranslations from '../translations/es.json';
import {
  DEFAULT_LANGUAGE,
  parseLanguage,
  persistLanguageCookie,
  type Language,
} from '@/lib/i18n/config';

export type { Language };

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, unknown> = {
  en: enTranslations,
  it: itTranslations,
  fr: frTranslations,
  de: deTranslations,
  es: esTranslations,
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

function lookupTranslation(tree: unknown, key: string): string | undefined {
  const keys = key.split('.');
  let value: unknown = tree;

  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = (value as Record<string, unknown>)[k];
    } else {
      return undefined;
    }
  }

  return typeof value === 'string' ? value : undefined;
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>(DEFAULT_LANGUAGE);
  const [isHydrated, setIsHydrated] = useState(false);

  const setLanguage = useCallback((lang: Language) => {
    const next = parseLanguage(lang);
    setLanguageState(next);
    if (typeof window !== 'undefined') {
      localStorage.setItem('language', next);
      persistLanguageCookie(next);
    }
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const savedLanguage = parseLanguage(localStorage.getItem('language'));
    setLanguageState(savedLanguage);
    persistLanguageCookie(savedLanguage);
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated || typeof window === 'undefined') return;
    localStorage.setItem('language', language);
    persistLanguageCookie(language);
  }, [language, isHydrated]);

  const t = (key: string): string => {
    return lookupTranslation(translations[language], key)
      ?? lookupTranslation(translations.en, key)
      ?? key;
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

export function getCurrentLanguage(): Language {
  if (typeof window !== 'undefined') {
    try {
      return parseLanguage(localStorage.getItem('language'));
    } catch {
      return DEFAULT_LANGUAGE;
    }
  }
  return DEFAULT_LANGUAGE;
}
