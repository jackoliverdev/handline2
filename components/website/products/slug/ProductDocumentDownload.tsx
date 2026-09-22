"use client";

import React from "react";
import { ChevronDown, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Language } from "@/lib/i18n/config";
import {
  availableDocumentLanguages,
  defaultDocumentLanguage,
  documentLanguageLabel,
  type DocumentLocales,
} from "@/lib/product-documents";

interface ProductDocumentDownloadProps {
  id: string;
  title: string;
  downloadLabel: string;
  locales: DocumentLocales;
  browsingLanguage: string;
  fileLabel: string;
  analyticsType: string;
  onDownload?: (url: string, filename: string, type: string) => void;
}

export function ProductDocumentDownload({
  id,
  title,
  downloadLabel,
  locales,
  browsingLanguage,
  fileLabel,
  analyticsType,
  onDownload,
}: ProductDocumentDownloadProps) {
  const available = availableDocumentLanguages(locales);
  const signature = available.map((lang) => `${lang}:${locales[lang]}`).join("|");
  const [selected, setSelected] = React.useState<Language | null>(
    defaultDocumentLanguage(browsingLanguage, locales)
  );

  React.useEffect(() => {
    setSelected(defaultDocumentLanguage(browsingLanguage, locales));
  }, [browsingLanguage, signature]);

  if (!selected || available.length === 0) return null;

  const url = locales[selected];
  const filename = `${fileLabel} (${selected.toUpperCase()})`;

  const download = (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-center gap-2"
      onClick={() => onDownload?.(url, filename, analyticsType)}
    >
      <Download className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-1" />
      {downloadLabel}
    </a>
  );

  return (
    <div id={id} className="space-y-3">
      <h3 className="text-lg font-semibold text-brand-dark dark:text-white">{title}</h3>
      {available.length === 1 ? (
        <Button
          variant="outline"
          size="lg"
          className="w-full border-brand-primary text-brand-primary hover:bg-white hover:text-brand-primary hover:border-brand-primary hover:shadow-lg hover:scale-105 transition-all duration-300 transform group"
          asChild
        >
          {download}
        </Button>
      ) : (
        <div className="flex w-full">
          <Button
            variant="outline"
            size="lg"
            className="flex-1 rounded-r-none border-brand-primary text-brand-primary hover:bg-white hover:text-brand-primary hover:border-brand-primary group"
            asChild
          >
            {download}
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="lg"
                className="rounded-l-none px-3 border-brand-primary text-brand-primary"
                aria-label={`Select ${title} language`}
              >
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              {available.map((lang) => (
                <DropdownMenuItem
                  key={lang}
                  className={`cursor-pointer ${selected === lang ? "bg-brand-primary/10 text-brand-primary" : ""}`}
                  onClick={() => setSelected(lang)}
                >
                  {documentLanguageLabel(lang)}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
    </div>
  );
}
