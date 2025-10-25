"use client";

import { Product } from "@/lib/products-service";
import { useLanguage } from "@/lib/context/language-context";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Package, Ruler, Users, Award, Shield } from "lucide-react";

export function ClothingSpecs({ product }: { product: Product }) {
  const { t, language } = useLanguage();
  const materials = product.materials_locales?.[language] || product.materials_locales?.en || [];
  const size = product.size_locales?.[language] || product.size_locales?.en || null;
  const cs: any = (product as any).clothing_standards || {};
  const ca: any = (product as any).clothing_attributes || {};

  const hiVis = cs?.en_iso_20471?.class as number | undefined;
  const has11612 = !!cs?.en_iso_11612;
  const en11611 = cs?.en_iso_11611?.class as number | undefined;
  const arc = cs?.iec_61482_2?.class as number | undefined;
  const antistatic = !!cs?.en_1149_5;
  const type13034 = cs?.en_13034 as string | undefined;

  const rightChips: string[] = [];
  if (typeof hiVis === 'number') rightChips.push(`EN ISO 20471 C${hiVis}`);
  if (has11612) {
    const v = cs.en_iso_11612;
    const parts: string[] = [];
    if (v?.a1) parts.push('A1');
    if (v?.a2) parts.push('A2');
    if (typeof v?.b === 'number') parts.push(`B${v.b}`);
    if (typeof v?.c === 'number') parts.push(`C${v.c}`);
    if (typeof v?.d === 'number') parts.push(`D${v.d}`);
    if (typeof v?.e === 'number') parts.push(`E${v.e}`);
    if (typeof v?.f === 'number') parts.push(`F${v.f}`);
    if (parts.length) rightChips.push(`EN ISO 11612 ${parts.join('/')}`);
  }
  if (typeof en11611 === 'number') rightChips.push(`EN ISO 11611 C${en11611}`);
  if (typeof arc === 'number') rightChips.push(`IEC 61482-2 C${arc}`);
  if (antistatic) rightChips.push('EN 1149-5');
  if (type13034) rightChips.push(`EN 13034 ${type13034}`);

  return (
    <TooltipProvider>
    <div className="space-y-5">
      {/* Unified grid: Materials spans 2 rows; 3 columns total */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Materials (full height - row span 2) */}
        <div className="group relative overflow-hidden rounded-lg border bg-white dark:bg-black/50 shadow-sm transition-all duration-300 hover:shadow-md border-brand-primary/10 dark:border-brand-primary/20 backdrop-blur-sm p-4 md:row-span-2">
          <div className="flex items-center gap-2 mb-3">
            <Package className="h-5 w-5 text-brand-primary" />
            <h4 className="font-medium text-brand-dark dark:text-white">{t('productPage.materials')}</h4>
          </div>
          <div className="space-y-1">
            {Array.isArray(materials) && materials.length > 0 ? (
              materials.map((m: string, i: number) => (
                <div key={i} className="text-brand-dark dark:text-white font-medium">{m}</div>
              ))
            ) : (
              <div className="text-brand-dark dark:text-white font-medium">-</div>
            )}
          </div>
        </div>

        {/* Column 2: Size (top) and CE Category (bottom) */}
        <div className="space-y-4">
          {/* Size */}
          <div className="group relative overflow-hidden rounded-lg border bg-white dark:bg-black/50 shadow-sm transition-all duration-300 hover:shadow-md border-brand-primary/10 dark:border-brand-primary/20 backdrop-blur-sm p-4">
            <div className="flex items-center gap-2 mb-2">
              <Ruler className="h-5 w-5 text-brand-primary" />
              <h4 className="font-medium text-brand-dark dark:text-white">{t('productPage.size')}</h4>
            </div>
            <div className="text-brand-dark dark:text-white font-medium">{size || '-'}</div>
          </div>

          {/* CE Category */}
          <div className="group relative overflow-hidden rounded-lg border bg-white dark:bg-black/50 shadow-sm transition-all duration-300 hover:shadow-md border-brand-primary/10 dark:border-brand-primary/20 backdrop-blur-sm p-4">
            <div className="flex items-center gap-2 mb-2">
              <Award className="h-5 w-5 text-brand-primary" />
              <h4 className="font-medium text-brand-dark dark:text-white">{t('productPage.ceCategory')}</h4>
            </div>
            <div className="text-brand-dark dark:text-white font-medium">{product.ce_category || '-'}</div>
          </div>
        </div>

        {/* Column 3: Fit (top) and EN Standards (bottom) */}
        <div className="space-y-4">
          {/* Fit */}
          <div className="group relative overflow-hidden rounded-lg border bg-white dark:bg-black/50 shadow-sm transition-all duration-300 hover:shadow-md border-brand-primary/10 dark:border-brand-primary/20 backdrop-blur-sm p-4">
            <div className="flex items-center gap-2 mb-2">
              <Users className="h-5 w-5 text-brand-primary" />
              <h4 className="font-medium text-brand-dark dark:text-white">{t('productPage.fit')}</h4>
            </div>
            <div className="text-brand-dark dark:text-white font-medium capitalize">{ca?.fit || '-'}</div>
          </div>

          {/* EN Standards */}
          <div className="group relative overflow-hidden rounded-lg border bg-white dark:bg-black/50 shadow-sm transition-all duration-300 hover:shadow-md border-brand-primary/10 dark:border-brand-primary/20 backdrop-blur-sm p-4">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="h-5 w-5 text-brand-primary" />
              <h4 className="font-medium text-brand-dark dark:text-white">{t('productPage.clothingStandards.enStandards')}</h4>
            </div>
            <div className="space-y-1">
              {rightChips.length > 0 ? (
                rightChips.map((chip, idx) => (
                  <div key={idx} className="text-brand-dark dark:text-white font-medium">{chip}</div>
                ))
              ) : (
                <div className="text-brand-dark dark:text-white font-medium">-</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
    </TooltipProvider>
  );
}


