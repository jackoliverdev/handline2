"use client";

import { Product } from "@/lib/products-service";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/lib/context/language-context";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export function FootwearSpecs({ product }: { product: Product }) {
  const { t, language } = useLanguage();
  const mats = product.materials_locales?.[language] || product.materials_locales?.en || [];
  const explicitSize = product.size_locales?.[language] || product.size_locales?.en;
  const inferSizeFromRange = () => {
    const fattr: any = (product as any).footwear_attributes || {};
    const min = typeof fattr.size_min === 'number' ? fattr.size_min : undefined;
    const max = typeof fattr.size_max === 'number' ? fattr.size_max : undefined;
    return (min !== undefined && max !== undefined) ? `${min} - ${max}` : undefined;
  };
  const size = explicitSize || inferSizeFromRange() || '-';
  const fattr: any = (product as any).footwear_attributes || {};
  const fstd: any = (product as any).footwear_standards || {};
  const codes: string[] = Array.isArray(fstd.en_iso_20345_2022) ? fstd.en_iso_20345_2022 : [];
  const classVal: string | null = fattr.class || null;
  const slip: string | null = typeof fstd.slip_resistance === 'string' ? fstd.slip_resistance : null;
  const metalFree: boolean | null = typeof fattr.metal_free === 'boolean' ? fattr.metal_free : null;
  const widthFit: number[] = Array.isArray(fattr.width_fit) ? fattr.width_fit : [];

  const humanise = (val: string) => val.replace(/_/g, ' ').replace(/\b\w/g, (m) => m.toUpperCase());
  const hasSlipInCodes = codes.includes('SRC') || codes.includes('SR');
  const stdChips = Array.from(new Set(codes.filter(Boolean)));

  const chip = (content: string) => (
    <Badge variant="outline" className="bg-brand-primary/5 border-brand-primary/20" key={content}>
      {content}
    </Badge>
  );

  return (
    <TooltipProvider>
    <div className="space-y-5">
      {/* Row 1: Materials | Size | Class */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="group relative overflow-hidden rounded-lg border bg-white dark:bg-black/50 shadow-sm transition-all duration-300 hover:shadow-md border-brand-primary/10 dark:border-brand-primary/20 backdrop-blur-sm p-4">
          <h4 className="font-medium text-brand-dark dark:text-white mb-2">{t('productPage.materials')}</h4>
          <div className="text-center">
            {Array.isArray(mats) && mats.length > 0 ? (
              <>
                <div className="text-brand-dark dark:text-white font-medium text-md">{mats[0]}</div>
                {mats.length > 1 && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button type="button" className="text-sm text-brand-secondary dark:text-gray-300 cursor-help inline-block">+{mats.length - 1} more</button>
                    </TooltipTrigger>
                    <TooltipContent className="bg-white dark:bg-black/90 text-brand-dark dark:text-white shadow-lg border border-brand-primary/20 max-w-sm">
                      <div className="text-sm">
                        {mats.slice(1).map((m, i) => (
                          <div key={i} className="leading-relaxed">{m}</div>
                        ))}
                      </div>
                    </TooltipContent>
                  </Tooltip>
                )}
              </>
            ) : (
              <span>-</span>
            )}
          </div>
        </div>
        <div className="group relative overflow-hidden rounded-lg border bg-white dark:bg-black/50 shadow-sm transition-all duration-300 hover:shadow-md border-brand-primary/10 dark:border-brand-primary/20 backdrop-blur-sm p-4">
          <h4 className="font-medium text-brand-dark dark:text-white mb-2">{t('productPage.size')}</h4>
          <p className="text-brand-dark dark:text-white">{size || '-'}</p>
        </div>
        <div className="group relative overflow-hidden rounded-lg border bg-white dark:bg-black/50 shadow-sm transition-all duration-300 hover:shadow-md border-brand-primary/10 dark:border-brand-primary/20 backdrop-blur-sm p-4">
          <h4 className="font-medium text-brand-dark dark:text-white mb-2">{t('products.filters.footwearClass')}</h4>
          <div className="flex flex-wrap gap-1.5">
            {classVal ? (
              <Badge variant="outline" className="bg-white dark:bg-black/40 border border-brand-primary/20 rounded px-2 py-0.5">
                {classVal}
              </Badge>
            ) : (
              <span>-</span>
            )}
          </div>
        </div>
      </div>

      {/* Row 2: CE | Standards | Attributes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="group relative overflow-hidden rounded-lg border bg-white dark:bg-black/50 shadow-sm transition-all duration-300 hover:shadow-md border-brand-primary/10 dark:border-brand-primary/20 backdrop-blur-sm p-4">
          <h4 className="font-medium text-brand-dark dark:text-white mb-2">{t('productPage.ceCategory')}</h4>
          <p className="text-brand-dark dark:text-white">{product.ce_category || '-'}</p>
        </div>
        <div className="group relative overflow-hidden rounded-lg border bg-white dark:bg-black/50 shadow-sm transition-all duration-300 hover:shadow-md border-brand-primary/10 dark:border-brand-primary/20 backdrop-blur-sm p-4">
          <h4 className="font-medium text-brand-dark dark:text-white mb-2">EN ISO 20345</h4>
          <div className="flex flex-wrap gap-1.5">
            {stdChips.map((c) => chip(c))}
          </div>
        </div>
        <div className="group relative overflow-hidden rounded-lg border bg-white dark:bg-black/50 shadow-sm transition-all duration-300 hover:shadow-md border-brand-primary/10 dark:border-brand-primary/20 backdrop-blur-sm p-4">
          <h4 className="font-medium text-brand-dark dark:text-white mb-3">{t('productPage.attributes') || 'Attributes'}</h4>
          <div className="grid grid-cols-2 gap-3">
            {typeof fattr.esd === 'boolean' && (
              <div>
                <div className="text-xs text-brand-secondary dark:text-gray-300">{t('products.filters.esd')}</div>
                <div className="text-sm font-medium text-brand-dark dark:text-white">{fattr.esd ? (t('productPage.yes') || 'Yes') : (t('productPage.no') || 'No')}</div>
              </div>
            )}
            {typeof metalFree === 'boolean' && (
              <div>
                <div className="text-xs text-brand-secondary dark:text-gray-300">{t('productPage.metalFree') || 'Metal-free'}</div>
                <div className="text-sm font-medium text-brand-dark dark:text-white">{metalFree ? (t('productPage.yes') || 'Yes') : (t('productPage.no') || 'No')}</div>
              </div>
            )}
            {fattr.toe_cap && (
              <div>
                <div className="text-xs text-brand-secondary dark:text-gray-300">{t('products.filters.toeCap')}</div>
                <div className="text-sm font-medium text-brand-dark dark:text-white">{humanise(String(fattr.toe_cap))}</div>
              </div>
            )}
            {widthFit.length > 0 && (
              <div>
                <div className="text-xs text-brand-secondary dark:text-gray-300">{t('products.filters.widthFit')}</div>
                <div className="text-sm font-medium text-brand-dark dark:text-white">{widthFit.join(', ')}</div>
              </div>
            )}
            {slip && !hasSlipInCodes && (
              <div>
                <div className="text-xs text-brand-secondary dark:text-gray-300">{t('productPage.slipResistance') || 'Slip'}</div>
                <div className="text-sm font-medium text-brand-dark dark:text-white">{slip}</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
    </TooltipProvider>
  );
}


