"use client";

import { Product } from "@/lib/products-service";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/lib/context/language-context";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Layers, Ruler, Snowflake, Flame, Move, Shield } from "lucide-react";

export function HeadSpecs({ product }: { product: Product }) {
  const { t, language } = useLanguage();
  const attrs: any = (product as any).head_attributes || {};
  const std: any = (product as any).head_standards || {};

  const materials = product.materials_locales?.[language] || [];
  const size = product.size_locales?.[language] || product.size_locales?.en || null;
  const weight = typeof attrs.weight_g === 'number' ? `${attrs.weight_g} g` : null;
  const colours: string[] = Array.isArray(attrs?.colours) ? attrs.colours : [];

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

  const isEmpty = (val: any) => val === null || val === undefined || (Array.isArray(val) && val.length === 0) || (typeof val === 'string' && val.trim() === '');

  function ChipList({
    items,
    maxVisible = 4,
    getTooltipLabel,
  }: {
    items: string[];
    maxVisible?: number;
    getTooltipLabel?: (item: string) => string;
  }) {
    if (!items || items.length === 0) return <span className="text-sm text-brand-secondary dark:text-gray-300">-</span>;
    const visible = items.slice(0, maxVisible);
    const hidden = items.slice(maxVisible);
    return (
      <div className="flex flex-wrap gap-2">
        {visible.map((c) => (
          <Tooltip key={c}>
            <TooltipTrigger asChild>
              <span>
                <Badge
                  variant="outline"
                  className="bg-brand-primary/5 border-brand-primary/20 max-w-[180px] truncate"
                  aria-label={getTooltipLabel ? getTooltipLabel(c) : c}
                  title={getTooltipLabel ? getTooltipLabel(c) : c}
                >
                  {c}
                </Badge>
              </span>
            </TooltipTrigger>
            <TooltipContent className="bg-white dark:bg-black/90 text-brand-dark dark:text-white shadow-lg border border-brand-primary/20">
              <div className="text-sm leading-relaxed">
                {getTooltipLabel ? getTooltipLabel(c) : c}
              </div>
            </TooltipContent>
          </Tooltip>
        ))}
        {hidden.length > 0 && (
          <Tooltip>
            <TooltipTrigger asChild>
              <button type="button" className="text-xs px-2 py-1 rounded-full bg-brand-primary/10 text-brand-primary border border-brand-primary/20">
                +{hidden.length}
              </button>
            </TooltipTrigger>
            <TooltipContent className="bg-white dark:bg-black/90 text-brand-dark dark:text-white shadow-lg border border-brand-primary/20 max-w-sm">
              <div className="text-sm space-y-1">
                {hidden.map((m) => (
                  <div key={m}>{getTooltipLabel ? getTooltipLabel(m) : m}</div>
                ))}
              </div>
            </TooltipContent>
          </Tooltip>
        )}
      </div>
    );
  }

  return (
    <TooltipProvider>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Row 1 */}
      {!isEmpty(materials) && (
        <div className="group relative overflow-hidden rounded-lg border bg-white dark:bg-black/50 shadow-sm transition-all duration-300 hover:shadow-md border-brand-primary/10 dark:border-brand-primary/20 backdrop-blur-sm p-4">
          <div className="flex items-center gap-2 mb-2">
            <Layers className="h-4 w-4 text-brand-primary" />
            <h4 className="font-medium text-brand-dark dark:text-white">{t('productPage.materials')}</h4>
          </div>
          <div className="text-center">
            {Array.isArray(materials) && materials.length > 0 ? (
              <>
                <div className="text-brand-dark dark:text-white font-medium text-md truncate" title={materials[0]}>{materials[0]}</div>
                {materials.length > 1 && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button type="button" className="text-sm text-brand-secondary dark:text-gray-300 cursor-help inline-block">+{materials.length - 1}</button>
                    </TooltipTrigger>
                    <TooltipContent className="bg-white dark:bg-black/90 text-brand-dark dark:text-white shadow-lg border border-brand-primary/20 max-w-sm">
                      <div className="text-sm">
                        {materials.slice(1).map((m: string, i: number) => (
                          <div key={i} className="leading-relaxed break-words">{m}</div>
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
      )}

      {!isEmpty(size) && (
        <div className="group relative overflow-hidden rounded-lg border bg-white dark:bg-black/50 shadow-sm transition-all duration-300 hover:shadow-md border-brand-primary/10 dark:border-brand-primary/20 backdrop-blur-sm p-4">
          <div className="flex items-center gap-2 mb-2">
            <Ruler className="h-4 w-4 text-brand-primary" />
            <h4 className="font-medium text-brand-dark dark:text-white">{t('productPage.size')}</h4>
          </div>
          <p className="text-sm text-brand-secondary dark:text-gray-300">{size}</p>
        </div>
      )}

      {!isEmpty(weight) && (
        <div className="group relative overflow-hidden rounded-lg border bg-white dark:bg-black/50 shadow-sm transition-all duration-300 hover:shadow-md border-brand-primary/10 dark:border-brand-primary/20 backdrop-blur-sm p-4">
          <div className="flex items-center gap-2 mb-2">
            {/* Intentionally no icon for weight to avoid library mismatch */}
            <h4 className="font-medium text-brand-dark dark:text-white">{t('productPage.weight')}</h4>
          </div>
          <p className="text-sm text-brand-secondary dark:text-gray-300">{weight}</p>
        </div>
      )}

      {/* Row 2 */}
      {!isEmpty(product.ce_category) && (
        <div className="group relative overflow-hidden rounded-lg border bg-white dark:bg-black/50 shadow-sm transition-all duration-300 hover:shadow-md border-brand-primary/10 dark:border-brand-primary/20 backdrop-blur-sm p-4">
          <div className="flex items-center gap-2 mb-2">
            <Shield className="h-4 w-4 text-brand-primary" />
            <h4 className="font-medium text-brand-dark dark:text-white">{t('productPage.ceCategory')}</h4>
          </div>
          <Badge variant="outline" className="bg-brand-primary/5 border-brand-primary/20">
            {product.ce_category}
          </Badge>
        </div>
      )}

      {stdChips.length > 0 && (
        <div className="group relative overflow-hidden rounded-lg border bg-white dark:bg-black/50 shadow-sm transition-all duration-300 hover:shadow-md border-brand-primary/10 dark:border-brand-primary/20 backdrop-blur-sm p-4">
          <div className="flex items-center gap-2 mb-2">
            <h4 className="font-medium text-brand-dark dark:text-white">{t('productPage.standards')}</h4>
          </div>
          <ChipList items={stdChips} maxVisible={4} />
        </div>
      )}

      {(!isEmpty(colours) && colours.length > 0) && (
        <div className="group relative overflow-hidden rounded-lg border bg-white dark:bg-black/50 shadow-sm transition-all duration-300 hover:shadow-md border-brand-primary/10 dark:border-brand-primary/20 backdrop-blur-sm p-4">
          <div className="flex items-center gap-2 mb-2">
            <h4 className="font-medium text-brand-dark dark:text-white">{t('productPage.colours')}</h4>
          </div>
          <ChipList items={colours} maxVisible={4} />
        </div>
      )}
    </div>
    {/* Attributes moved below, full width in a compact grid style */}
    {optChips.length > 0 && (
      <div className="mt-4 group relative overflow-hidden rounded-lg border bg-white dark:bg-black/50 shadow-sm transition-all duration-300 hover:shadow-md border-brand-primary/10 dark:border-brand-primary/20 backdrop-blur-sm p-4">
        <div className="flex items-center gap-2 mb-3">
          <h4 className="font-medium text-brand-dark dark:text-white">{t('productPage.attributes')}</h4>
        </div>
        <ChipList
          items={optChips}
          maxVisible={8}
          getTooltipLabel={(item) => {
            if (item === 'MM') return t('products.filters.moltenMetalSplash') || 'Molten metal splash (MM)';
            if (item === 'LD') return 'Lateral deformation (LD)';
            if (item === String(std?.en397?.optional?.low_temperature)) return t('products.filters.lowTemperature') || item;
            if (item === (t('products.filters.ventilation') || 'Ventilation')) return t('products.filters.ventilation') || item;
            if (item === t('productPage.closedShell')) return t('productPage.electricalInsulation') || item;
            return item;
          }}
        />
      </div>
    )}
    </TooltipProvider>
  );
}


