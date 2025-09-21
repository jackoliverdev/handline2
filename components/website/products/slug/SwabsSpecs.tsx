"use client";

import { Shield, Ruler, Layers, Move } from "lucide-react";
import { useLanguage } from "@/lib/context/language-context";
import { Product } from "@/lib/products-service";

export function SwabsSpecs({ product }: { product: Product }) {
  const { t, language } = useLanguage();
  const currentMaterials = product.materials_locales?.[language] || [];
  const size = product.size_locales?.[language] || product.size_locales?.en || null;

  const padSizeDisplay: string | null = (() => {
    const raw: any = (product as any).pad_size_json;
    if (!raw || typeof raw !== 'object') return null;
    const locale = raw[language] || raw.en;
    if (!locale || typeof locale !== 'object') return null;
    const diameter = locale.diameter_mm ?? locale.diametro_mm ?? null;
    const length = locale.length_mm ?? locale.lunghezza_mm ?? null;
    if (diameter && length) return `Ø ${diameter} × ${length} mm`;
    return null;
  })();

  return (
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
                  <div className="text-sm text-brand-secondary dark:text-gray-300">+{currentMaterials.length - 1} more</div>
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

        {padSizeDisplay ? (
          <div className="group relative overflow-hidden rounded-lg border bg-white dark:bg-black/50 shadow-sm transition-all duration-300 hover:shadow-md border-brand-primary/10 dark:border-brand-primary/20 backdrop-blur-sm p-4">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Ruler className="h-5 w-5 text-brand-primary" />
              <h3 className="text-sm font-medium text-brand-dark dark:text-white">{t('productPage.padSize')}</h3>
            </div>
            <div className="flex items-center justify-center">
              <span className="text-brand-dark dark:text-white font-medium text-md">{padSizeDisplay}</span>
            </div>
          </div>
        ) : product.en_standard ? (
          <div className="group relative overflow-hidden rounded-lg border bg-white dark:bg-black/50 shadow-sm transition-all duration-300 hover:shadow-md border-brand-primary/10 dark:border-brand-primary/20 backdrop-blur-sm p-4">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Shield className="h-5 w-5 text-brand-primary" />
              <h3 className="text-sm font-medium text-brand-dark dark:text-white">EN Standard</h3>
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
  );
}


