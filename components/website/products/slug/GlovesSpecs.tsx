"use client";

import Image from "next/image";
import { Hammer, Ruler, Layers, Move, Snowflake, Flame, Shield } from "lucide-react";
import { useLanguage } from "@/lib/context/language-context";
import { Product } from "@/lib/products-service";

export function GlovesSpecs({ product }: { product: Product }) {
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
      {/* Unified grid: Materials spans 2 rows; 2x2 grid for other specs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Materials (full height - row span 2) */}
        <div className="group relative overflow-hidden rounded-lg border bg-white dark:bg-black/50 shadow-sm transition-all duration-300 hover:shadow-md border-brand-primary/10 dark:border-brand-primary/20 backdrop-blur-sm p-4 md:row-span-2">
          <div className="flex items-center gap-2 mb-2">
            <Layers className="h-5 w-5 text-brand-primary" />
            <h4 className="font-medium text-brand-dark dark:text-white">{t('productPage.materials')}</h4>
          </div>
          {Array.isArray(currentMaterials) && currentMaterials.length > 0 ? (
            <div className="space-y-1">
              {currentMaterials.map((m: string, i: number) => (
                <div key={i} className="text-brand-dark dark:text-white font-medium">{m}</div>
              ))}
            </div>
          ) : (
            <div className="text-brand-dark dark:text-white font-medium">-</div>
          )}
        </div>

        {/* Column 2: Size (top) and CE Category (bottom) */}
        <div className="space-y-4">
          {/* Size */}
          <div className="group relative overflow-hidden rounded-lg border bg-white dark:bg-black/50 shadow-sm transition-all duration-300 hover:shadow-md border-brand-primary/10 dark:border-brand-primary/20 backdrop-blur-sm p-4">
            <div className="flex items-center gap-2 mb-2">
              <Move className="h-5 w-5 text-brand-primary" />
              <h4 className="font-medium text-brand-dark dark:text-white">{t('productPage.productInfo.size')}</h4>
            </div>
            <div className="text-brand-dark dark:text-white font-medium">{size || '-'}</div>
          </div>

          {/* CE Category */}
          <div className="group relative overflow-hidden rounded-lg border bg-white dark:bg-black/50 shadow-sm transition-all duration-300 hover:shadow-md border-brand-primary/10 dark:border-brand-primary/20 backdrop-blur-sm p-4">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="h-5 w-5 text-brand-primary" />
              <h4 className="font-medium text-brand-dark dark:text-white">{t('productPage.ceCategory')}</h4>
            </div>
            <div className="text-brand-dark dark:text-white font-medium">{product.ce_category ? `${t('productPage.category')} ${product.ce_category}` : '-'}</div>
          </div>
        </div>

        {/* Column 3: Length (top) and EN Standards (bottom) */}
        <div className="space-y-4">
          {/* Length */}
          <div className="group relative overflow-hidden rounded-lg border bg-white dark:bg-black/50 shadow-sm transition-all duration-300 hover:shadow-md border-brand-primary/10 dark:border-brand-primary/20 backdrop-blur-sm p-4">
            <div className="flex items-center gap-2 mb-2">
              <Ruler className="h-5 w-5 text-brand-primary" />
              <h4 className="font-medium text-brand-dark dark:text-white">{t('productPage.productInfo.length')}</h4>
            </div>
            <div className="text-brand-dark dark:text-white font-medium">{product.length_cm ? `${product.length_cm} cm` : '-'}</div>
          </div>

          {/* EN Standards */}
          <div className="group relative overflow-hidden rounded-lg border bg-white dark:bg-black/50 shadow-sm transition-all duration-300 hover:shadow-md border-brand-primary/10 dark:border-brand-primary/20 backdrop-blur-sm p-4">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="h-5 w-5 text-brand-primary" />
              <h4 className="font-medium text-brand-dark dark:text-white">{t('products.enStandards')}</h4>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {product.safety && (product.safety.en_388?.enabled || product.safety.en_407?.enabled || product.safety.en_511?.enabled) ? (
                <>
                  {product.safety.en_388?.enabled && (
                    <span className="flex items-center gap-1 text-xs px-2 py-0.5 rounded border border-brand-primary/20 bg-white dark:bg-black/40 text-brand-dark dark:text-white">
                      <Hammer className="h-4 w-4 text-brand-primary" />
                      EN388
                    </span>
                  )}
                  {product.safety.en_407?.enabled && (
                    <span className="flex items-center gap-1 text-xs px-2 py-0.5 rounded border border-brand-primary/20 bg-white dark:bg-black/40 text-brand-dark dark:text-white">
                      <Flame className="h-4 w-4 text-orange-500" />
                      EN407
                    </span>
                  )}
                  {product.safety.en_511?.enabled && (
                    <span className="flex items-center gap-1 text-xs px-2 py-0.5 rounded border border-brand-primary/20 bg-white dark:bg-black/40 text-brand-dark dark:text-white">
                      <Snowflake className="h-4 w-4 text-blue-500" />
                      EN511
                    </span>
                  )}
                </>
              ) : padSizeDisplay ? (
                <span className="text-xs px-2 py-0.5 rounded border border-brand-primary/20 bg-white dark:bg-black/40 text-brand-dark dark:text-white">{padSizeDisplay}</span>
              ) : product.en_standard ? (
                <span className="text-xs px-2 py-0.5 rounded border border-brand-primary/20 bg-white dark:bg-black/40 text-brand-dark dark:text-white">{product.en_standard}</span>
              ) : (
                <span className="text-sm text-brand-secondary dark:text-gray-300">-</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}



