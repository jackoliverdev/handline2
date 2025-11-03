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
      {/* Unified grid: Materials spans 2 rows; 2x2 grid for other specs */}
      <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-4">
        {/* Materials - Column 1, Rows 1-2 (full height) */}
        <div className="group relative overflow-hidden rounded-lg border bg-white dark:bg-black/50 shadow-sm transition-all duration-300 hover:shadow-md border-brand-primary/10 dark:border-brand-primary/20 backdrop-blur-sm p-4 md:row-span-2 flex flex-col">
          <div className="flex items-center gap-2 mb-2">
            <Layers className="h-5 w-5 text-brand-primary" />
            <h4 className="font-medium text-brand-dark dark:text-white">{t('productPage.materials')}</h4>
          </div>
          {Array.isArray(currentMaterials) && currentMaterials.length > 0 ? (
            <div className="space-y-1 flex-1">
              {currentMaterials.map((m: string, i: number) => (
                <div key={i} className="text-brand-dark dark:text-white font-medium">{m}</div>
              ))}
            </div>
          ) : (
            <div className="text-brand-dark dark:text-white font-medium">-</div>
          )}
        </div>

        {/* Size - Column 2, Row 1 */}
        <div className="group relative overflow-hidden rounded-lg border bg-white dark:bg-black/50 shadow-sm transition-all duration-300 hover:shadow-md border-brand-primary/10 dark:border-brand-primary/20 backdrop-blur-sm p-4">
          <div className="flex items-center gap-2 mb-2">
            <Move className="h-5 w-5 text-brand-primary" />
            <h4 className="font-medium text-brand-dark dark:text-white">{t('productPage.productInfo.size')}</h4>
          </div>
          <div className="text-brand-dark dark:text-white font-medium">{size || '-'}</div>
        </div>

        {/* Length - Column 3, Row 1 */}
        <div className="group relative overflow-hidden rounded-lg border bg-white dark:bg-black/50 shadow-sm transition-all duration-300 hover:shadow-md border-brand-primary/10 dark:border-brand-primary/20 backdrop-blur-sm p-4">
          <div className="flex items-center gap-2 mb-2">
            <Ruler className="h-5 w-5 text-brand-primary" />
            <h4 className="font-medium text-brand-dark dark:text-white">{t('productPage.productInfo.length')}</h4>
          </div>
          <div className="text-brand-dark dark:text-white font-medium">{product.length_cm ? `${product.length_cm} cm` : '-'}</div>
        </div>

        {/* CE Category - Column 2, Row 2 */}
        <div className="group relative overflow-hidden rounded-lg border bg-white dark:bg-black/50 shadow-sm transition-all duration-300 hover:shadow-md border-brand-primary/10 dark:border-brand-primary/20 backdrop-blur-sm p-4">
          <div className="flex items-center gap-2 mb-2">
            <Shield className="h-5 w-5 text-brand-primary" />
            <h4 className="font-medium text-brand-dark dark:text-white">{t('productPage.ceCategory')}</h4>
          </div>
          <div className="text-brand-dark dark:text-white font-medium">{product.ce_category ? `${t('productPage.category')} ${product.ce_category}` : '-'}</div>
        </div>

        {/* EN Standards - Column 3, Row 2 */}
        <div className="group relative overflow-hidden rounded-lg border bg-white dark:bg-black/50 shadow-sm transition-all duration-300 hover:shadow-md border-brand-primary/10 dark:border-brand-primary/20 backdrop-blur-sm p-4">
          <div className="flex items-center gap-2 mb-2">
            <Shield className="h-5 w-5 text-brand-primary" />
            <h4 className="font-medium text-brand-dark dark:text-white">{t('products.enStandards')}</h4>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {product.safety && (p.safety?.en_388?.enabled || p.safety?.en_iso_21420?.enabled) ? (
              <>
                {p.safety?.en_388?.enabled && (
                  <span className="flex items-center gap-1 text-xs px-2 py-0.5 rounded border border-brand-primary/20 bg-white dark:bg-black/40 text-brand-dark dark:text-white">
                    <Image src="/images/standards/EN388.png" alt="EN388" width={14} height={14} className="object-contain" />
                    EN388
                  </span>
                )}
                {p.safety?.en_iso_21420?.enabled && (
                  <span className="flex items-center gap-1 text-xs px-2 py-0.5 rounded border border-brand-primary/20 bg-white dark:bg-black/40 text-brand-dark dark:text-white">
                    <Shield className="h-3 w-3 text-brand-primary" />
                    EN ISO 21420
                  </span>
                )}
              </>
            ) : product.en_standard ? (
              <span className="text-xs px-2 py-0.5 rounded border border-brand-primary/20 bg-white dark:bg-black/40 text-brand-dark dark:text-white">{product.en_standard}</span>
            ) : (
              <span className="text-sm text-brand-secondary dark:text-gray-300">-</span>
            )}
          </div>
        </div>
      </div>
    </div>
    </TooltipProvider>
  );
}


