"use client";

import { Shield, Ruler, Layers, Move, Hammer, Package } from "lucide-react";
import { useLanguage } from "@/lib/context/language-context";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Product } from "@/lib/products-service";

export function RespiratorSpecs({ product }: { product: Product }) {
  const { t, language } = useLanguage();
  const currentMaterials = product.materials_locales?.[language] || [];
  const size = product.size_locales?.[language] || product.size_locales?.en || null;
  const p: any = product as any;

  const isMask = (product.sub_category || '')
    .toLowerCase()
    .includes('mask');
  const isFilter = (product.sub_category || '')
    .toLowerCase()
    .includes('filter');

  return (
    <TooltipProvider>
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-4">
        <div className="group relative overflow-hidden rounded-lg border bg-white dark:bg-black/50 shadow-sm transition-all duration-300 hover:shadow-md border-brand-primary/10 dark:border-brand-primary/20 backdrop-blur-sm p-4">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Layers className="h-5 w-5 text-brand-primary hidden sm:block" />
            <h3 className="text-sm font-medium text-brand-dark dark:text-white">{t('productPage.materials')}</h3>
          </div>
          <div className="flex items-center justify-center">
            {currentMaterials && currentMaterials.length > 0 ? (
              <div className="text-center">
                <div className="text-brand-dark dark:text-white font-medium text-md">{currentMaterials[0]}</div>
                {currentMaterials.length > 1 && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button type="button" className="text-sm text-brand-secondary dark:text-gray-300 cursor-help inline-block">
                        +{currentMaterials.length - 1} more
                      </button>
                    </TooltipTrigger>
                    <TooltipContent className="bg-white dark:bg-black/90 text-brand-dark dark:text-white shadow-lg border border-brand-primary/20 max-w-sm">
                      <div className="text-sm">
                        {currentMaterials.slice(1).map((m, i) => (
                          <div key={i} className="leading-relaxed">{m}</div>
                        ))}
                      </div>
                    </TooltipContent>
                  </Tooltip>
                )}
              </div>
            ) : (
              <span className="text-brand-dark dark:text-white font-medium text-md">-</span>
            )}
          </div>
        </div>

        <div className="group relative overflow-hidden rounded-lg border bg-white dark:bg-black/50 shadow-sm transition-all duration-300 hover:shadow-md border-brand-primary/10 dark:border-brand-primary/20 backdrop-blur-sm p-4">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Move className="h-5 w-5 text-brand-primary hidden sm:block" />
            <h3 className="text-sm font-medium text-brand-dark dark:text-white">{t('productPage.productInfo.size')}</h3>
          </div>
          <div className="flex items-center justify-center">
            <span className="text-brand-dark dark:text-white font-medium text-md">{size || '-'}</span>
          </div>
        </div>

        {isFilter ? (
          <div className="group relative overflow-hidden rounded-lg border bg-white dark:bg-black/50 shadow-sm transition-all duration-300 hover:shadow-md border-brand-primary/10 dark:border-brand-primary/20 backdrop-blur-sm p-4">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Hammer className="h-5 w-5 text-brand-primary hidden sm:block" />
              <h3 className="text-sm font-medium text-brand-dark dark:text-white">{t('products.filters.filterType') || 'Filter type'}</h3>
            </div>
            <div className="flex items-center justify-center">
              <span className="text-brand-dark dark:text-white font-medium text-md">{p.filter_type || '-'}</span>
            </div>
          </div>
        ) : (
          <div className="group relative overflow-hidden rounded-lg border bg-white dark:bg-black/50 shadow-sm transition-all duration-300 hover:shadow-md border-brand-primary/10 dark:border-brand-primary/20 backdrop-blur-sm p-4">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Ruler className="h-5 w-5 text-brand-primary hidden sm:block" />
              <h3 className="text-sm font-medium text-brand-dark dark:text-white">{t('productPage.productInfo.length')}</h3>
            </div>
            <div className="flex items-center justify-center">
              <span className="text-brand-dark dark:text-white font-medium text-md">{product.length_cm ? `${product.length_cm} cm` : '-'}</span>
            </div>
          </div>
        )}
      </div>

      {/* Secondary info */}
      {isMask && p.connections && p.connections.length > 0 && (
        <div className="grid grid-cols-3 gap-4">
          <div className="group relative overflow-hidden rounded-lg border bg-white dark:bg-black/50 shadow-sm transition-all duration-300 hover:shadow-md border-brand-primary/10 dark:border-brand-primary/20 backdrop-blur-sm p-4">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Package className="h-5 w-5 text-brand-primary hidden sm:block" />
              <h3 className="text-sm font-medium text-brand-dark dark:text-white">{t('products.filters.connection') || 'Connection'}</h3>
            </div>
            <div className="flex flex-wrap gap-1 justify-center">
              {p.connections.map((c: string) => (
                <span key={c} className="text-xs bg-brand-primary/5 border border-brand-primary/20 text-brand-dark dark:text-white rounded px-2 py-0.5">{c}</span>
              ))}
            </div>
          </div>
        </div>
      )}

      {isFilter && (Boolean(p.protection_codes?.length) || Boolean(product.ce_category)) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {p.protection_codes && p.protection_codes.length > 0 && (
            <div className="group relative overflow-hidden rounded-lg border bg-white dark:bg-black/50 shadow-sm transition-all duration-300 hover:shadow-md border-brand-primary/10 dark:border-brand-primary/20 backdrop-blur-sm p-4">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Hammer className="h-5 w-5 text-brand-primary hidden sm:block" />
                <h3 className="text-sm font-medium text-brand-dark dark:text-white">{t('productPage.protectionCodes') || 'Protection codes'}</h3>
              </div>
              <div className="flex flex-wrap gap-1 justify-center">
                {p.protection_codes.map((c: string) => (
                  <span key={c} className="text-xs bg-brand-primary/5 border border-brand-primary/20 text-brand-dark dark:text-white rounded px-2 py-0.5">{c}</span>
                ))}
              </div>
            </div>
          )}
          {product.ce_category && (
            <div className="group relative overflow-hidden rounded-lg border bg-white dark:bg-black/50 shadow-sm transition-all duration-300 hover:shadow-md border-brand-primary/10 dark:border-brand-primary/20 backdrop-blur-sm p-4">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Shield className="h-5 w-5 text-brand-primary hidden sm:block" />
                <h3 className="text-sm font-medium text-brand-dark dark:text-white">{t('productPage.ceCategory')}</h3>
              </div>
              <div className="flex items-center justify-center">
                <span className="text-brand-dark dark:text-white font-medium text-md">{t('productPage.category')} {product.ce_category}</span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Paired row: Compatible with + CE Category */}
      {isMask && (product.ce_category || (p.compatible_with && p.compatible_with.length > 0) || p.protection_class) && (
        <div className="grid grid-cols-2 gap-4">
          {isMask && p.compatible_with && p.compatible_with.length > 0 ? (
            <div className="group relative overflow-hidden rounded-lg border bg-white dark:bg-black/50 shadow-sm transition-all duration-300 hover:shadow-md border-brand-primary/10 dark:border-brand-primary/20 backdrop-blur-sm p-4">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Package className="h-5 w-5 text-brand-primary hidden sm:block" />
                <h3 className="text-sm font-medium text-brand-dark dark:text-white">{t('productPage.compatibleWith') || 'Compatible with'}</h3>
              </div>
              <div className="flex flex-wrap gap-1 justify-center">
                {p.compatible_with.map((c: string) => (
                  <span key={c} className="text-xs bg-brand-primary/5 border border-brand-primary/20 text-brand-dark dark:text-white rounded px-2 py-0.5">{c}</span>
                ))}
              </div>
            </div>
          ) : (
            p.protection_class ? (
              <div className="group relative overflow-hidden rounded-lg border bg-white dark:bg-black/50 shadow-sm transition-all duration-300 hover:shadow-md border-brand-primary/10 dark:border-brand-primary/20 backdrop-blur-sm p-4">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Hammer className="h-5 w-5 text-brand-primary hidden sm:block" />
                  <h3 className="text-sm font-medium text-brand-dark dark:text-white">{t('products.filters.protectionClass') || 'Protection class'}</h3>
                </div>
                <div className="flex items-center justify-center">
                  <span className="text-brand-dark dark:text-white font-medium text-md">{p.protection_class}</span>
                </div>
              </div>
            ) : null
          )}

          {product.ce_category && (
            <div className="group relative overflow-hidden rounded-lg border bg-white dark:bg-black/50 shadow-sm transition-all duration-300 hover:shadow-md border-brand-primary/10 dark:border-brand-primary/20 backdrop-blur-sm p-4">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Shield className="h-5 w-5 text-brand-primary hidden sm:block" />
                <h3 className="text-sm font-medium text-brand-dark dark:text-white">{t('productPage.ceCategory')}</h3>
              </div>
              <div className="flex items-center justify-center">
                <span className="text-brand-dark dark:text-white font-medium text-md">{t('productPage.category')} {product.ce_category}</span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
    </TooltipProvider>
  );
}


