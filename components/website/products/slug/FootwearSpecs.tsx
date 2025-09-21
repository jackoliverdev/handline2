"use client";

import { Product } from "@/lib/products-service";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/lib/context/language-context";

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

  return (
    <div className="space-y-5">
      {/* Row 1: Materials | Size | Class */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="group relative overflow-hidden rounded-lg border bg-white dark:bg-black/50 shadow-sm transition-all duration-300 hover:shadow-md border-brand-primary/10 dark:border-brand-primary/20 backdrop-blur-sm p-4">
          <h4 className="font-medium text-brand-dark dark:text-white mb-2">{t('productPage.materials')}</h4>
          <div className="flex flex-wrap gap-1.5">
            {(mats || []).map((m, idx) => (
              <Badge key={idx} variant="outline" className="bg-brand-primary/5 border-brand-primary/20">
                {m}
              </Badge>
            ))}
            {(!mats || mats.length === 0) && <span>-</span>}
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
          <h4 className="font-medium text-brand-dark dark:text-white mb-2">CE</h4>
          <p className="text-brand-dark dark:text-white">{product.ce_category || '-'}</p>
        </div>
        <div className="group relative overflow-hidden rounded-lg border bg-white dark:bg-black/50 shadow-sm transition-all duration-300 hover:shadow-md border-brand-primary/10 dark:border-brand-primary/20 backdrop-blur-sm p-4">
          <h4 className="font-medium text-brand-dark dark:text-white mb-2">EN ISO 20345</h4>
          <div className="flex flex-wrap gap-1.5">
            {stdChips.map((c, idx) => (
              <span key={idx} className="bg-white dark:bg-black/40 text-brand-dark dark:text-white border border-brand-primary/20 rounded px-2 py-0.5 text-xs">
                {c}
              </span>
            ))}
          </div>
        </div>
        <div className="group relative overflow-hidden rounded-lg border bg-white dark:bg-black/50 shadow-sm transition-all duration-300 hover:shadow-md border-brand-primary/10 dark:border-brand-primary/20 backdrop-blur-sm p-4">
          <h4 className="font-medium text-brand-dark dark:text-white mb-2">{t('productPage.attributes') || 'Attributes'}</h4>
          <div className="flex flex-wrap gap-1.5">
            {typeof fattr.esd === 'boolean' && (
              <span className="bg-white dark:bg-black/40 text-brand-dark dark:text-white border border-brand-primary/20 rounded px-2 py-0.5 text-xs">
                {t('products.filters.esd')}: {fattr.esd ? 'Yes' : 'No'}
              </span>
            )}
            {typeof metalFree === 'boolean' && (
              <span className="bg-white dark:bg-black/40 text-brand-dark dark:text-white border border-brand-primary/20 rounded px-2 py-0.5 text-xs">
                Metal-free: {metalFree ? 'Yes' : 'No'}
              </span>
            )}
            {fattr.toe_cap && (
              <span className="bg-white dark:bg-black/40 text-brand-dark dark:text-white border border-brand-primary/20 rounded px-2 py-0.5 text-xs">
                {t('products.filters.toeCap')}: {humanise(String(fattr.toe_cap))}
              </span>
            )}
            {slip && !hasSlipInCodes && (
              <span className="bg-white dark:bg-black/40 text-brand-dark dark:text-white border border-brand-primary/20 rounded px-2 py-0.5 text-xs">
                Slip: {slip}
              </span>
            )}
            {widthFit.length > 0 && (
              <span className="bg-white dark:bg-black/40 text-brand-dark dark:text-white border border-brand-primary/20 rounded px-2 py-0.5 text-xs">
                {t('products.filters.widthFit')}: {widthFit.join(', ')}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}


