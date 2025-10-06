"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Download, ChevronDown } from 'lucide-react';
import { useLanguage } from '@/lib/context/language-context';
import { Product } from '@/lib/products-service';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';

interface ProductDeclarationsProps {
  product: Product;
  onDocumentDownload?: (url: string, filename: string, type: string) => void;
}

// Language options for EU declarations (matching the declarations page)
const DECLARATION_LANGUAGES = [
  { value: 'en-GB', label: 'GB English' },
  { value: 'de-DE', label: 'DE Deutsch' },
  { value: 'fr-FR', label: 'FR Français' },
  { value: 'it-IT', label: 'IT Italiano' },
  { value: 'lv-LV', label: 'LV Latviešu' },
  { value: 'hu-HU', label: 'HU Magyar' },
  { value: 'bg-BG', label: 'BG Български' },
  { value: 'cs-CZ', label: 'CS Čeština' },
  { value: 'da-DK', label: 'DA Dansk' },
  { value: 'el-GR', label: 'EL Ελληνικά' },
  { value: 'es-ES', label: 'ES Español' },
  { value: 'et-EE', label: 'ET Eesti' },
  { value: 'fi-FI', label: 'FI Suomi' },
  { value: 'hr-HR', label: 'HR Hrvatski' },
  { value: 'lt-LT', label: 'LT Lietuvių' },
  { value: 'nl-NL', label: 'NL Nederlands' },
  { value: 'pl-PL', label: 'PL Polski' },
  { value: 'pt-PT', label: 'PT Português' },
  { value: 'ro-RO', label: 'RO Română' },
  { value: 'sk-SK', label: 'SK Slovenčina' },
  { value: 'sl-SI', label: 'SL Slovenščina' },
  { value: 'sv-SE', label: 'SV Svenska' },
];

export function ProductDeclarations({ product, onDocumentDownload }: ProductDeclarationsProps) {
  const { t, language } = useLanguage();
  const [selectedEuLanguage, setSelectedEuLanguage] = useState<string>('en-GB');

  // Get EU declaration URLs from the new JSON structure
  const getEuDeclarationUrl = (localeCode: string): string | null => {
    const entries = Array.isArray((product as any).declaration_docs_locales)
      ? (product as any).declaration_docs_locales
      : [];
    const exact = entries.find((e: any) => e && e.kind === 'eu' && e.locale === localeCode);
    return exact ? exact.url : null;
  };

  // Get UKCA declaration URL
  const getUkcaDeclarationUrl = (): string | null => {
    return (product as any).ukca_declaration_url || null;
  };

  // Get available EU languages for this product
  const getAvailableEuLanguages = (): string[] => {
    const entries = Array.isArray((product as any).declaration_docs_locales)
      ? (product as any).declaration_docs_locales
      : [];
    return entries
      .filter((e: any) => e && e.kind === 'eu' && typeof e.locale === 'string' && e.locale.trim().length > 0)
      .map((e: any) => e.locale);
  };

  // Determine preferred language based on current site language
  const getPreferredLanguage = (): string => {
    const availableLanguages = getAvailableEuLanguages();
    const ordered = language === 'it' ? ['it-IT', 'en-GB'] : ['en-GB', 'it-IT'];
    for (const lang of ordered) {
      if (availableLanguages.includes(lang)) return lang;
    }
    return availableLanguages[0] || 'en-GB';
  };

  // Initialize selected language
  React.useEffect(() => {
    const preferred = getPreferredLanguage();
    setSelectedEuLanguage(preferred);
  }, [product, language]);

  const availableEuLanguages = getAvailableEuLanguages();
  const ukcaUrl = getUkcaDeclarationUrl();
  const currentEuUrl = getEuDeclarationUrl(selectedEuLanguage);

  // Don't render if no declarations are available
  if (availableEuLanguages.length === 0 && !ukcaUrl) {
    return null;
  }

  const handleDownload = (url: string, filename: string, type: string) => {
    if (onDocumentDownload) {
      onDocumentDownload(url, filename, type);
    }
  };

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold text-brand-dark dark:text-white">
        {t('productPage.declarationsOfConformity')}
      </h3>
      
      <div className="grid gap-3">
        {/* UKCA Declaration */}
        {ukcaUrl && (
          <Button
            variant="outline"
            size="lg"
            className="w-full border-brand-primary text-brand-primary"
            asChild
          >
            <a 
              href={ukcaUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center justify-center gap-2"
              onClick={() => handleDownload(ukcaUrl, 'UKCA Declaration of Conformity', 'ukca_declaration')}
            >
              <Download className="h-4 w-4" />
              UKCA DoC
            </a>
          </Button>
        )}

        {/* EU Declaration with Language Dropdown */}
        {availableEuLanguages.length > 0 && (
          <div className="flex w-full">
            <Button
              variant="outline"
              size="lg"
              className="flex-1 rounded-r-none border-brand-primary text-brand-primary"
              asChild
              disabled={!currentEuUrl}
            >
              <a 
                href={currentEuUrl || '#'} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center justify-center gap-2"
                onClick={() => currentEuUrl && handleDownload(currentEuUrl, `EU Declaration of Conformity (${selectedEuLanguage})`, 'eu_declaration')}
              >
                <Download className="h-4 w-4" />
                EU DoC
              </a>
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="rounded-l-none px-3 border-brand-primary text-brand-primary"
                  aria-label="Select EU DoC language"
                >
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-60 max-h-96 overflow-y-auto">
                <DropdownMenuLabel>Language</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {DECLARATION_LANGUAGES.map((lang) => {
                  const url = getEuDeclarationUrl(lang.value);
                  const isAvailable = !!url;
                  const isSelected = selectedEuLanguage === lang.value;
                  
                  return (
                    <DropdownMenuItem 
                      key={lang.value} 
                      className={`cursor-pointer ${isSelected ? 'bg-brand-primary/10 text-brand-primary' : ''}`} 
                      disabled={!isAvailable}
                      onClick={() => setSelectedEuLanguage(lang.value)}
                    >
                      <span className="flex-1">{lang.label}</span>
                      {isAvailable ? (
                        <a 
                          className="text-brand-primary hover:underline" 
                          href={url || '#'} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          download
                          onClick={(e) => e.stopPropagation()}
                        >
                          Download
                        </a>
                      ) : (
                        <span className="text-gray-400">N/A</span>
                      )}
                    </DropdownMenuItem>
                  );
                })}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </div>
    </div>
  );
}
