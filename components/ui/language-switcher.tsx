"use client";

import React from 'react';
import { Button } from "@/components/ui/button";
import { FlagIcon } from "@/components/theme/flag-icon";
import { LANGUAGE_META, SUPPORTED_LANGUAGES, type Language } from "@/lib/i18n/config";

interface LanguageSwitcherProps {
  currentLanguage: Language;
  onLanguageChange: (language: Language) => void;
  className?: string;
}

export function LanguageSwitcher({ currentLanguage, onLanguageChange, className = "" }: LanguageSwitcherProps) {
  return (
    <div className={`flex flex-wrap items-center gap-1 p-1 bg-gray-100 dark:bg-gray-800 rounded-lg ${className}`}>
      {SUPPORTED_LANGUAGES.map((code) => {
        const meta = LANGUAGE_META[code];
        const isActive = currentLanguage === code;

        return (
          <Button
            key={code}
            type="button"
            variant={isActive ? 'default' : 'ghost'}
            size="sm"
            onClick={() => onLanguageChange(code)}
            className="flex items-center gap-1.5 h-auto px-2 py-1.5"
            aria-label={meta.nativeName}
            title={meta.nativeName}
          >
            <FlagIcon country={meta.flag} className="h-4 w-4" />
            <span className="text-[11px] font-medium">{code.toUpperCase()}</span>
          </Button>
        );
      })}
    </div>
  );
}
