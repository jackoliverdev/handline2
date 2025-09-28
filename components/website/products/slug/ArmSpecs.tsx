"use client";

import { Shield, Ruler, Layers, Move } from "lucide-react";
import Image from "next/image";
import { useLanguage } from "@/lib/context/language-context";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Product } from "@/lib/products-service";

export function ArmSpecs({ product }: { product: Product }) {
  const { t, language } = useLanguage();
  const currentMaterials = product.materials_locales?.[language] || [];
  const size = product.size_locales?.[language] || product.size_locales?.en || null;
  const p: any = product as any;

  return (
    <TooltipProvider>
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-4">
        <div className="group relative overflow-hidden rounded-lg border bg-white dark:bg-black/50 shadow-sm transition-all duration-300 hover:shadow-md border-brand-primary/10 dark:border-brand-primary/20 backdrop-blur-sm p-4">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Layers className="h-5 w-5 text-brand-primary hidden sm:block" />
            <h3 className="text-sm font-medium text-brand-dark dark:text-white">{t('productPage.materials')}</h3>
          </div>
          <div className="flex items-center justify-center">
            {currentMaterials && currentMaterials.length > 0 ? (
              <div className="text-center">
                <div className="text-brand-dark dark:text-white font-medium text-md">{currentMaterials[0]}</div>
                {currentMaterials.length > 1 && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button type="button" className="text-sm text-brand-secondary dark:text-gray-300 cursor-help inline-block">
                        +{currentMaterials.length - 1} more
                      </button>
                    </TooltipTrigger>
                    <TooltipContent className="bg-white dark:bg-black/90 text-brand-dark dark:text-white shadow-lg border border-brand-primary/20 max-w-sm">
                      <div className="text-sm">
                        {currentMaterials.slice(1).map((m, i) => (
                          <div key={i} className="leading-relaxed">{m}</div>
                        ))}
                      </div>
                    </TooltipContent>
                  </Tooltip>
                )}
              </div>
            ) : (
              <span className="text-brand-dark dark:text-white font-medium text-md">-</span>
            )}
          </div>
        </div>

        <div className="group relative overflow-hidden rounded-lg border bg-white dark:bg-black/50 shadow-sm transition-all duration-300 hover:shadow-md border-brand-primary/10 dark:border-brand-primary/20 backdrop-blur-sm p-4">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Move className="h-5 w-5 text-brand-primary hidden sm:block" />
            <h3 className="text-sm font-medium text-brand-dark dark:text-white">{t('productPage.productInfo.size')}</h3>
          </div>
          <div className="flex items-center justify-center">
            <span className="text-brand-dark dark:text-white font-medium text-md">{size || '-'}</span>
          </div>
        </div>

        <div className="group relative overflow-hidden rounded-lg border bg-white dark:bg-black/50 shadow-sm transition-all duration-300 hover:shadow-md border-brand-primary/10 dark:border-brand-primary/20 backdrop-blur-sm p-4">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Ruler className="h-5 w-5 text-brand-primary hidden sm:block" />
            <h3 className="text-sm font-medium text-brand-dark dark:text-white">{t('productPage.productInfo.length')}</h3>
          </div>
          <div className="flex items-center justify-center">
            <span className="text-brand-dark dark:text-white font-medium text-md">{product.length_cm ? `${product.length_cm} cm` : '-'}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {product.ce_category && (
          <div className="group relative overflow-hidden rounded-lg border bg-white dark:bg-black/50 shadow-sm transition-all duration-300 hover:shadow-md border-brand-primary/10 dark:border-brand-primary/20 backdrop-blur-sm p-4">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Shield className="h-5 w-5 text-brand-primary" />
              <h3 className="text-sm font-medium text-brand-dark dark:text-white">{t('productPage.ceCategory')}</h3>
            </div>
            <div className="flex items-center justify-center">
              <span className="text-brand-dark dark:text-white font-medium text-md">{t('productPage.category')} {product.ce_category}</span>
            </div>
          </div>
        )}

        {/* EN Standards tile - same as gloves */}
        {product.safety && (p.safety?.en_388?.enabled || p.safety?.en_iso_21420?.enabled) ? (
          <div className="group relative overflow-hidden rounded-lg border bg-white dark:bg-black/50 shadow-sm transition-all duration-300 hover:shadow-md border-brand-primary/10 dark:border-brand-primary/20 backdrop-blur-sm p-4">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Shield className="h-5 w-5 text-brand-primary" />
              <h3 className="text-sm font-medium text-brand-dark dark:text-white">{t('products.enStandards')}</h3>
            </div>
            <div className="flex flex-wrap gap-2 justify-center">
              {p.safety?.en_388?.enabled && (
                <div className="flex items-center gap-1.5">
                  <Image src="/images/standards/EN388.png" alt="EN388" width={16} height={16} className="object-contain" />
                  <span className="text-brand-dark dark:text-white font-medium text-sm">EN388</span>
                </div>
              )}
              {p.safety?.en_iso_21420?.enabled && (
                <div className="flex items-center gap-1.5">
                  <Shield className="h-4 w-4 text-brand-primary" />
                  <span className="text-brand-dark dark:text-white font-medium text-sm">EN ISO 21420</span>
                </div>
              )}
            </div>
          </div>
        ) : product.en_standard ? (
          <div className="group relative overflow-hidden rounded-lg border bg-white dark:bg-black/50 shadow-sm transition-all duration-300 hover:shadow-md border-brand-primary/10 dark:border-brand-primary/20 backdrop-blur-sm p-4">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Shield className="h-5 w-5 text-brand-primary" />
              <h3 className="text-sm font-medium text-brand-dark dark:text-white">{t('products.enStandards')}</h3>
            </div>
            <div className="flex items-center justify-center">
              <span className="text-brand-dark dark:text-white font-medium text-md">{product.en_standard}</span>
            </div>
          </div>
        ) : (
          <div />
        )}
      </div>
    </div>
    </TooltipProvider>
  );
}


