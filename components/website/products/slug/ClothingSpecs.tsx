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
  const caLocales: any = (product as any).clothing_attributes_locales || {};
  const fit = caLocales[language]?.fit || caLocales.en?.fit || ca?.fit;

  const hiVis = cs?.en_iso_20471?.class;
  const has11612 = !!cs?.en_iso_11612;
  const en11611 = cs?.en_iso_11611?.class;
  const arc = cs?.iec_61482_2?.class;
  const antistatic = !!cs?.en_1149_5;
  const type13034 = cs?.en_13034 as string | undefined;
  const hasEn343 = Boolean(cs?.en_343 && (cs.en_343.water || cs.en_343.breath));
  const uvStandard = !!cs?.uv_standard_801;

  const rightChips: string[] = [];
  if (hiVis) rightChips.push(`EN ISO 20471 ${hiVis}`);
  if (has11612) rightChips.push('EN ISO 11612');
  if (en11611) rightChips.push(`EN ISO 11611 ${en11611}`);
  if (arc) rightChips.push(`IEC 61482-2 ${arc}`);
  if (hasEn343) rightChips.push('EN 343');
  if (antistatic) rightChips.push('EN 1149-5');
  if (type13034) rightChips.push(`EN 13034 ${type13034}`);
  if (uvStandard) rightChips.push('UV Standard 801');

  return (
    <TooltipProvider>
    <div className="space-y-5">
      {/* Unified grid: Materials spans 2 rows; 2x2 grid for other specs */}
      <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-4">
        {/* Materials - Column 1, Rows 1-2 (full height) */}
        <div className="group relative overflow-hidden rounded-lg border bg-white dark:bg-black/50 shadow-sm transition-all duration-300 hover:shadow-md border-brand-primary/10 dark:border-brand-primary/20 backdrop-blur-sm p-4 md:row-span-2 flex flex-col">
          <div className="flex items-center gap-2 mb-2">
            <Package className="h-5 w-5 text-brand-primary" />
            <h4 className="font-medium text-brand-dark dark:text-white">{t('productPage.materials')}</h4>
          </div>
          {Array.isArray(materials) && materials.length > 0 ? (
            <div className="space-y-1 flex-1">
              {materials.map((m: string, i: number) => (
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
            <Ruler className="h-5 w-5 text-brand-primary" />
            <h4 className="font-medium text-brand-dark dark:text-white">{t('productPage.size')}</h4>
          </div>
          <div className="text-brand-dark dark:text-white font-medium">{size || '-'}</div>
        </div>

        {/* Fit - Column 3, Row 1 */}
        <div className="group relative overflow-hidden rounded-lg border bg-white dark:bg-black/50 shadow-sm transition-all duration-300 hover:shadow-md border-brand-primary/10 dark:border-brand-primary/20 backdrop-blur-sm p-4">
          <div className="flex items-center gap-2 mb-2">
            <Users className="h-5 w-5 text-brand-primary" />
            <h4 className="font-medium text-brand-dark dark:text-white">{t('productPage.fit')}</h4>
          </div>
          <div className="text-brand-dark dark:text-white font-medium capitalize">{fit || '-'}</div>
        </div>

        {/* CE Category - Column 2, Row 2 */}
        <div className="group relative overflow-hidden rounded-lg border bg-white dark:bg-black/50 shadow-sm transition-all duration-300 hover:shadow-md border-brand-primary/10 dark:border-brand-primary/20 backdrop-blur-sm p-4">
          <div className="flex items-center gap-2 mb-2">
            <Award className="h-5 w-5 text-brand-primary" />
            <h4 className="font-medium text-brand-dark dark:text-white">{t('productPage.ceCategory')}</h4>
          </div>
          <div className="text-brand-dark dark:text-white font-medium">{product.ce_category || '-'}</div>
        </div>

        {/* EN Standards - Column 3, Row 2 */}
        <div className="group relative overflow-hidden rounded-lg border bg-white dark:bg-black/50 shadow-sm transition-all duration-300 hover:shadow-md border-brand-primary/10 dark:border-brand-primary/20 backdrop-blur-sm p-4">
          <div className="flex items-center gap-2 mb-2">
            <Shield className="h-5 w-5 text-brand-primary" />
            <h4 className="font-medium text-brand-dark dark:text-white">{t('productPage.clothingStandards.enStandards')}</h4>
          </div>
          <div className="text-brand-dark dark:text-white font-medium">
            {rightChips.length > 0 ? rightChips.join(', ') : '-'}
          </div>
        </div>
      </div>
    </div>
    </TooltipProvider>
  );
}


