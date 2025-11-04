"use client";

import { Product } from "@/lib/products-service";
import { Badge } from "@/components/ui/badge";
import { Sun, Sparkles, Flame, Hammer, Shield, Eye, Glasses } from "lucide-react";
import { useLanguage } from "@/lib/context/language-context";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export function EyeFaceSpecs({ product }: { product: Product }) {
  const { t, language } = useLanguage();
  const attrs: any = (product as any).eye_face_attributes || {};
  const std: any = (product as any).eye_face_standards || {};

  const materials = product.materials_locales?.[language] || [];
  const opticalClass = std?.en166?.optical_class;
  const mech = std?.en166?.mechanical_strength;
  // Read from new coatings_locales with fallback to old coatings field
  const coatingsLocales = (product as any).coatings_locales?.[language] || (product as any).coatings_locales?.en;
  const coatings: string[] = Array.isArray(coatingsLocales) 
    ? coatingsLocales 
    : Array.isArray(attrs?.coatings) ? attrs.coatings : [];
  
  // Read from new eye_face_materials_locales only (no fallback to old attributes)
  const materialsLocale = (product as any).eye_face_materials_locales?.[language] || (product as any).eye_face_materials_locales?.en;
  const lensMaterial = materialsLocale?.lens;
  const frameMaterial = materialsLocale?.frame;
  const armMaterial = materialsLocale?.arm;
  const headbandMaterial = materialsLocale?.headband;

  const stdChips: Array<{ label: string; icon: any; color: string }> = [];
  if (std?.en166) stdChips.push({ label: 'EN 166', icon: Eye, color: 'text-brand-primary' });
  if (std?.en169) stdChips.push({ label: 'EN 169', icon: Flame, color: 'text-orange-500' });
  if (std?.en170) stdChips.push({ label: 'EN 170', icon: Shield, color: 'text-yellow-500' });
  if (std?.en172) stdChips.push({ label: 'EN 172', icon: Sun, color: 'text-blue-500' });

  const protChips: string[] = [];
  if (attrs?.has_ir) protChips.push('IR');
  if (attrs?.has_uv) protChips.push(attrs?.uv_code ? attrs.uv_code : 'UV');
  if (attrs?.has_arc) protChips.push('Arc');

  return (
    <TooltipProvider>
    <div className="space-y-5">
      {/* Unified grid: Materials spans 2 rows; no CE Category for Eye & Face */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Materials (full height - row span 2) */}
        <div className="group relative overflow-hidden rounded-lg border bg-white dark:bg-black/50 shadow-sm transition-all duration-300 hover:shadow-md border-brand-primary/10 dark:border-brand-primary/20 backdrop-blur-sm p-4 md:row-span-2">
          <div className="flex items-center gap-2 mb-2">
            <Eye className="h-4 w-4 text-brand-primary" />
            <h4 className="font-medium text-brand-dark dark:text-white">{t('productPage.materials')}</h4>
          </div>
          <div className="space-y-3 text-brand-dark dark:text-white">
            <div className="flex items-center justify-between">
              <span>{t('productPage.lens')}</span>
              <span className="font-medium">{lensMaterial ? String(lensMaterial) : '-'}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>{t('productPage.frame')}</span>
              <span className="font-medium">{frameMaterial ? String(frameMaterial) : '-'}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>{t('productPage.arm')}</span>
              <span className="font-medium">{armMaterial ? String(armMaterial) : '-'}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>{t('productPage.headband')}</span>
              <span className="font-medium">{headbandMaterial ? String(headbandMaterial) : '-'}</span>
            </div>
          </div>
        </div>
        {/* Coating */}
        <div className="group relative overflow-hidden rounded-lg border bg-white dark:bg-black/50 shadow-sm transition-all duration-300 hover:shadow-md border-brand-primary/10 dark:border-brand-primary/20 backdrop-blur-sm p-4">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="h-4 w-4 text-brand-primary" />
            <h4 className="font-medium text-brand-dark dark:text-white">{t('productPage.coating')}</h4>
          </div>
          <div className="text-brand-dark dark:text-white font-medium">
            {coatings.length > 0 ? coatings.join(', ') : '-'}
          </div>
        </div>
        {/* Optical class */}
        <div className="group relative overflow-hidden rounded-lg border bg-white dark:bg-black/50 shadow-sm transition-all duration-300 hover:shadow-md border-brand-primary/10 dark:border-brand-primary/20 backdrop-blur-sm p-4">
          <div className="flex items-center gap-2 mb-2">
            <Glasses className="h-4 w-4 text-brand-primary" />
            <h4 className="font-medium text-brand-dark dark:text-white">{t('productPage.opticalClass')}</h4>
          </div>
          <div className="text-brand-dark dark:text-white font-medium">{opticalClass ? `Class ${opticalClass}` : '-'}</div>
        </div>
        {/* Standards */}
        <div className="group relative overflow-hidden rounded-lg border bg-white dark:bg-black/50 shadow-sm transition-all duration-300 hover:shadow-md border-brand-primary/10 dark:border-brand-primary/20 backdrop-blur-sm p-4">
          <div className="flex items-center gap-2 mb-2">
            <Shield className="h-4 w-4 text-brand-primary" />
            <h4 className="font-medium text-brand-dark dark:text-white">{t('productPage.standards')}</h4>
          </div>
          <div className="text-brand-dark dark:text-white font-medium">
            {stdChips.length > 0 ? stdChips.map(c => c.label).join(', ') : '-'}
          </div>
        </div>
        {/* Attributes */}
        <div className="group relative overflow-hidden rounded-lg border bg-white dark:bg-black/50 shadow-sm transition-all duration-300 hover:shadow-md border-brand-primary/10 dark:border-brand-primary/20 backdrop-blur-sm p-4">
          <div className="flex items-center gap-2 mb-2">
            <Shield className="h-4 w-4 text-brand-primary" />
            <h4 className="font-medium text-brand-dark dark:text-white">{t('productPage.attributes')}</h4>
          </div>
          <div className="text-brand-dark dark:text-white font-medium">
            {protChips.length > 0 ? protChips.join(', ') : '-'}
          </div>
        </div>
      </div>

      {/* Protective filters - title (no card) */}
      <h3 className="text-lg font-semibold text-brand-dark dark:text-white mb-4">{t('productPage.protectiveFilters')}</h3>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {[
          { key: 'sun', enabled: Boolean(attrs?.has_sun), Icon: Sun },
          { key: 'glare', enabled: Boolean(attrs?.has_glare), Icon: Sparkles },
          { key: 'ir', enabled: Boolean(attrs?.has_ir), Icon: Flame },
          { key: 'welding', enabled: Boolean(attrs?.has_welding), Icon: Hammer },
          { key: 'uv', enabled: Boolean(attrs?.has_uv), Icon: Shield },
        ].map((item) => {
          const { Icon } = item;
          return (
            <div
              key={item.key}
              className={`group relative overflow-hidden rounded-lg border shadow-sm transition-all duration-300 hover:shadow-md backdrop-blur-sm p-3 ${
                item.enabled
                  ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
                  : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <Icon className={`h-4 w-4 ${item.enabled ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`} />
                  <h4 className={`font-medium text-sm ${item.enabled ? 'text-green-800 dark:text-green-200' : 'text-red-800 dark:text-red-200'}`}>{t(`productPage.${item.key}` as any)}</h4>
                </div>
                <div className={`text-sm font-bold ${item.enabled ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'}`}>
                  {item.enabled ? t('productPage.yes') : t('productPage.no')}
                </div>
              </div>
              {/* Removed duplicated explanatory lines for IR/UV to avoid double "IR No" display */}
            </div>
          );
        })}
      </div>
    </div>
    </TooltipProvider>
  );
}


