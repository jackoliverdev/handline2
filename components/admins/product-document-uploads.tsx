"use client";

import { useRef, useState } from "react";
import { Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { SUPPORTED_LANGUAGES, type Language } from "@/lib/i18n/config";
import { documentLanguageLabel, type DocumentLocales } from "@/lib/product-documents";

type DocumentKind = "technical" | "manufacturers";

interface ProductDocumentUploadsProps {
  kind: DocumentKind;
  title: string;
  locales: DocumentLocales;
  onChange: (lang: Language, url: string | null) => void;
  onUpload: (file: File, lang: Language) => Promise<string | null>;
  onUseForAllLanguages?: (url: string) => void;
  /** One PDF for every language. Used for manufacturer notes. */
  single?: boolean;
}

export function ProductDocumentUploads({
  kind,
  title,
  locales,
  onChange,
  onUpload,
  onUseForAllLanguages,
  single = false,
}: ProductDocumentUploadsProps) {
  const [uploadingLang, setUploadingLang] = useState<Language | null>(null);
  const inputs = useRef<Partial<Record<Language, HTMLInputElement | null>>>({});

  const handleFile = async (lang: Language, file: File | undefined) => {
    if (!file) return;
    if (file.type !== "application/pdf") {
      toast({ title: "Invalid file type", description: "Please select a PDF file", variant: "destructive" });
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      toast({ title: "File too large", description: "PDF must be less than 10MB", variant: "destructive" });
      return;
    }

    try {
      setUploadingLang(lang);
      const url = await onUpload(file, lang);
      if (url) {
        if (single && onUseForAllLanguages) onUseForAllLanguages(url);
        else onChange(lang, url);
        toast({ title: "Success", description: "Document uploaded successfully!" });
      }
    } catch (error) {
      console.error("Error uploading document:", error);
      toast({ title: "Error", description: "Failed to upload document.", variant: "destructive" });
    } finally {
      setUploadingLang(null);
    }
  };

  const sharedUrl = locales.en.trim()
    || SUPPORTED_LANGUAGES.map((lang) => locales[lang].trim()).find(Boolean)
    || "";

  const applyShared = (url: string | null) => {
    if (onUseForAllLanguages) {
      onUseForAllLanguages(url ?? "");
      return;
    }
    onChange("en", url);
  };

  if (single) {
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        <input
          ref={(node) => { inputs.current.en = node; }}
          type="file"
          accept="application/pdf,.pdf"
          className="hidden"
          onChange={(event) => {
            void handleFile("en", event.target.files?.[0]);
            event.target.value = "";
          }}
        />
        {sharedUrl ? (
          <div className="border rounded-lg p-3 bg-gray-50 dark:bg-gray-800">
            <div className="flex items-center justify-between gap-2">
              <p className="text-sm font-medium truncate">
                {decodeURIComponent(sharedUrl.split("/").pop() || "PDF")}
              </p>
              <div className="flex items-center gap-2 shrink-0">
                <a href={sharedUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 text-sm">
                  Download
                </a>
                <Button type="button" variant="destructive" size="sm" onClick={() => applyShared(null)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div
            className="border-2 border-dashed rounded-md p-6 text-center cursor-pointer hover:bg-muted/50 transition-colors"
            onClick={() => inputs.current.en?.click()}
          >
            {uploadingLang === "en" ? (
              <p className="text-sm text-muted-foreground">Uploading...</p>
            ) : (
              <>
                <Upload className="mx-auto h-8 w-8 text-muted-foreground" />
                <p className="mt-2 text-sm text-muted-foreground">Click to upload a PDF</p>
                <p className="text-xs text-muted-foreground">PDF up to 10MB. One file for every language.</p>
              </>
            )}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">{title}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {SUPPORTED_LANGUAGES.map((lang) => {
          const url = locales[lang];
          return (
            <div key={`${kind}-${lang}`} className="space-y-2">
              <Label>{documentLanguageLabel(lang)}</Label>
              <input
                ref={(node) => { inputs.current[lang] = node; }}
                type="file"
                accept="application/pdf,.pdf"
                className="hidden"
                onChange={(event) => {
                  void handleFile(lang, event.target.files?.[0]);
                  event.target.value = "";
                }}
              />
              {url ? (
                <div className="border rounded-lg p-3 bg-gray-50 dark:bg-gray-800 space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-medium truncate">
                      {decodeURIComponent(url.split("/").pop() || "PDF")}
                    </p>
                    <div className="flex items-center gap-2 shrink-0">
                      <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 text-sm">
                        Download
                      </a>
                      <Button type="button" variant="destructive" size="sm" onClick={() => onChange(lang, null)}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  {onUseForAllLanguages && (
                    <Button type="button" variant="outline" size="sm" onClick={() => onUseForAllLanguages(url)}>
                      Use this file for all languages
                    </Button>
                  )}
                </div>
              ) : (
                <div
                  className="border-2 border-dashed rounded-md p-4 text-center cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={() => inputs.current[lang]?.click()}
                >
                  {uploadingLang === lang ? (
                    <p className="text-sm text-muted-foreground">Uploading...</p>
                  ) : (
                    <>
                      <Upload className="mx-auto h-6 w-6 text-muted-foreground" />
                      <p className="mt-2 text-xs text-muted-foreground">PDF up to 10MB</p>
                    </>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
