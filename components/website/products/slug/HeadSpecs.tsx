"use client";

import { Product } from "@/lib/products-service";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/lib/context/language-context";

export function HeadSpecs({ product }: { product: Product }) {
  const { t, language } = useLanguage();
  const attrs: any = (product as any).head_attributes || {};
  const std: any = (product as any).head_standards || {};

  const materials = product.materials_locales?.[language] || [];
  const size = product.size_locales?.[language] || product.size_locales?.en || null;
  const weight = typeof attrs.weight_g === 'number' ? `${attrs.weight_g} g` : null;

  const stdChips: string[] = [];
  if (std?.en397?.present) stdChips.push('EN 397');
  if (std?.en50365) stdChips.push('EN 50365');
  if (std?.en12492) stdChips.push('EN 12492');
  if (std?.en812) stdChips.push('EN 812');

  const optChips: string[] = [];
  if (std?.en397?.optional?.low_temperature) optChips.push(String(std.en397.optional.low_temperature));
  if (std?.en397?.optional?.molten_metal) optChips.push('MM');
  if (std?.en397?.optional?.lateral_deformation) optChips.push('LD');
  if (attrs?.ventilation) optChips.push(t('products.filters.ventilation') || 'Ventilation');
  if (attrs?.closed_shell) optChips.push('Closed shell');

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Row 1 */}
      <div className="group relative overflow-hidden rounded-lg border bg-white dark:bg-black/50 shadow-sm transition-all duration-300 hover:shadow-md border-brand-primary/10 dark:border-brand-primary/20 backdrop-blur-sm p-4">
        <h4 className="font-medium text-brand-dark dark:text-white mb-2">{t('productPage.materials')}</h4>
        <div className="flex flex-wrap gap-2">
          {(materials || []).length > 0 ? materials.map((m: string) => (
            <Badge key={m} variant="outline" className="bg-brand-primary/5 border-brand-primary/20">{m}</Badge>
          )) : <span className="text-sm text-brand-secondary dark:text-gray-300">-</span>}
        </div>
      </div>
      <div className="group relative overflow-hidden rounded-lg border bg-white dark:bg-black/50 shadow-sm transition-all duration-300 hover:shadow-md border-brand-primary/10 dark:border-brand-primary/20 backdrop-blur-sm p-4">
        <h4 className="font-medium text-brand-dark dark:text-white mb-2">{t('productPage.size')}</h4>
        <p className="text-sm text-brand-secondary dark:text-gray-300">{size || '-'}</p>
      </div>
      <div className="group relative overflow-hidden rounded-lg border bg-white dark:bg-black/50 shadow-sm transition-all duration-300 hover:shadow-md border-brand-primary/10 dark:border-brand-primary/20 backdrop-blur-sm p-4">
        <h4 className="font-medium text-brand-dark dark:text-white mb-2">Weight</h4>
        <p className="text-sm text-brand-secondary dark:text-gray-300">{weight || '-'}</p>
      </div>

      {/* Row 2 */}
      <div className="group relative overflow-hidden rounded-lg border bg-white dark:bg-black/50 shadow-sm transition-all duration-300 hover:shadow-md border-brand-primary/10 dark:border-brand-primary/20 backdrop-blur-sm p-4">
        <h4 className="font-medium text-brand-dark dark:text-white mb-2">{t('productPage.ceCategory')}</h4>
        <p className="text-sm text-brand-secondary dark:text-gray-300">{product.ce_category || '-'}</p>
      </div>
      <div className="group relative overflow-hidden rounded-lg border bg-white dark:bg-black/50 shadow-sm transition-all duration-300 hover:shadow-md border-brand-primary/10 dark:border-brand-primary/20 backdrop-blur-sm p-4 md:col-span-2">
        <h4 className="font-medium text-brand-dark dark:text-white mb-2">EN</h4>
        <div className="flex flex-wrap gap-2">
          {stdChips.map((c) => (
            <Badge key={c} variant="outline" className="bg-brand-primary/5 border-brand-primary/20">{c}</Badge>
          ))}
          {optChips.map((c) => (
            <Badge key={c} variant="outline" className="bg-brand-primary/5 border-brand-primary/20">{c}</Badge>
          ))}
          {stdChips.length === 0 && optChips.length === 0 && <span className="text-sm text-brand-secondary dark:text-gray-300">-</span>}
        </div>
      </div>
    </div>
  );
}


