"use client";

import { Product } from "@/lib/products-service";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/lib/context/language-context";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

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
  if (attrs?.closed_shell) optChips.push(t('productPage.closedShell'));
  if (attrs?.brim_length === 'short') optChips.push(t('productPage.brimShort'));
  if (attrs?.brim_length === 'long') optChips.push(t('productPage.brimLong'));

  return (
    <TooltipProvider>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Row 1 */}
      <div className="group relative overflow-hidden rounded-lg border bg-white dark:bg-black/50 shadow-sm transition-all duration-300 hover:shadow-md border-brand-primary/10 dark:border-brand-primary/20 backdrop-blur-sm p-4">
        <h4 className="font-medium text-brand-dark dark:text-white mb-2">{t('productPage.materials')}</h4>
        <div className="text-center">
          {Array.isArray(materials) && materials.length > 0 ? (
            <>
              <div className="text-brand-dark dark:text-white font-medium text-md">{materials[0]}</div>
              {materials.length > 1 && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button type="button" className="text-sm text-brand-secondary dark:text-gray-300 cursor-help inline-block">+{materials.length - 1} more</button>
                  </TooltipTrigger>
                  <TooltipContent className="bg-white dark:bg-black/90 text-brand-dark dark:text-white shadow-lg border border-brand-primary/20 max-w-sm">
                    <div className="text-sm">
                      {materials.slice(1).map((m: string, i: number) => (
                        <div key={i} className="leading-relaxed">{m}</div>
                      ))}
                    </div>
                  </TooltipContent>
                </Tooltip>
              )}
            </>
          ) : (
            <span className="text-sm text-brand-secondary dark:text-gray-300">-</span>
          )}
        </div>
      </div>
      <div className="group relative overflow-hidden rounded-lg border bg-white dark:bg-black/50 shadow-sm transition-all duration-300 hover:shadow-md border-brand-primary/10 dark:border-brand-primary/20 backdrop-blur-sm p-4">
        <h4 className="font-medium text-brand-dark dark:text-white mb-2">{t('productPage.size')}</h4>
        <p className="text-sm text-brand-secondary dark:text-gray-300">{size || '-'}</p>
      </div>
      <div className="group relative overflow-hidden rounded-lg border bg-white dark:bg-black/50 shadow-sm transition-all duration-300 hover:shadow-md border-brand-primary/10 dark:border-brand-primary/20 backdrop-blur-sm p-4">
        <h4 className="font-medium text-brand-dark dark:text-white mb-2">{t('productPage.weight')}</h4>
        <p className="text-sm text-brand-secondary dark:text-gray-300">{weight || '-'}</p>
      </div>

      {/* Row 2 */}
      <div className="group relative overflow-hidden rounded-lg border bg-white dark:bg-black/50 shadow-sm transition-all duration-300 hover:shadow-md border-brand-primary/10 dark:border-brand-primary/20 backdrop-blur-sm p-4">
        <h4 className="font-medium text-brand-dark dark:text-white mb-2">{t('productPage.ceCategory')}</h4>
        <p className="text-sm text-brand-secondary dark:text-gray-300">{product.ce_category || '-'}</p>
      </div>
      <div className="group relative overflow-hidden rounded-lg border bg-white dark:bg-black/50 shadow-sm transition-all duration-300 hover:shadow-md border-brand-primary/10 dark:border-brand-primary/20 backdrop-blur-sm p-4">
        <h4 className="font-medium text-brand-dark dark:text-white mb-2">{t('productPage.standards')}</h4>
        <div className="flex flex-wrap gap-2">
          {stdChips.map((c) => (
            <Badge key={c} variant="outline" className="bg-brand-primary/5 border-brand-primary/20">{c}</Badge>
          ))}
          {stdChips.length === 0 && <span className="text-sm text-brand-secondary dark:text-gray-300">-</span>}
        </div>
      </div>

      <div className="group relative overflow-hidden rounded-lg border bg-white dark:bg-black/50 shadow-sm transition-all duration-300 hover:shadow-md border-brand-primary/10 dark:border-brand-primary/20 backdrop-blur-sm p-4">
        <h4 className="font-medium text-brand-dark dark:text-white mb-2">{t('productPage.attributes')}</h4>
        <div className="flex flex-wrap gap-2">
          {optChips.map((c) => (
            <Badge key={c} variant="outline" className="bg-brand-primary/5 border-brand-primary/20">{c}</Badge>
          ))}
          {optChips.length === 0 && <span className="text-sm text-brand-secondary dark:text-gray-300">-</span>}
        </div>
      </div>
    </div>
    </TooltipProvider>
  );
}


