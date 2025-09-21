"use client";

import { Shield, Ruler, Layers, Move, Settings, Hammer, Package } from "lucide-react";
import { useLanguage } from "@/lib/context/language-context";
import { Product } from "@/lib/products-service";

export function RespiratorSpecs({ product }: { product: Product }) {
  const { t, language } = useLanguage();
  const currentMaterials = product.materials_locales?.[language] || [];
  const size = product.size_locales?.[language] || product.size_locales?.en || null;
  const p: any = product as any;

  return (
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
                  <div className="text-sm text-brand-secondary dark:text-gray-300">+{currentMaterials.length - 1} more</div>
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

        <div className="group relative overflow-hidden rounded-lg border bg-white dark:bg-black/50 shadow-sm transition-all duration-300 hover:shadow-md border-brand-primary/10 dark:border-brand-primary/20 backdrop-blur-sm p-4">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Ruler className="h-5 w-5 text-brand-primary hidden sm:block" />
            <h3 className="text-sm font-medium text-brand-dark dark:text-white">{t('productPage.productInfo.length')}</h3>
          </div>
          <div className="flex items-center justify-center">
            <span className="text-brand-dark dark:text-white font-medium text-md">{product.length_cm ? `${product.length_cm} cm` : '-'}</span>
          </div>
        </div>
      </div>

      {/* Secondary info tiles (3-col) */}
      <div className="grid grid-cols-3 gap-4">
        {p.filter_type && (
          <div className="group relative overflow-hidden rounded-lg border bg-white dark:bg-black/50 shadow-sm transition-all duration-300 hover:shadow-md border-brand-primary/10 dark:border-brand-primary/20 backdrop-blur-sm p-4">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Move className="h-5 w-5 text-brand-primary hidden sm:block" />
              <h3 className="text-sm font-medium text-brand-dark dark:text-white">{t('products.filters.filterType') || 'Filter type'}</h3>
            </div>
            <div className="flex items-center justify-center">
              <span className="text-brand-dark dark:text-white font-medium text-md">{p.filter_type}</span>
            </div>
          </div>
        )}

        {p.connections && p.connections.length > 0 && (
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
        )}

        {p.protection_codes && p.protection_codes.length > 0 && (
          <div className="group relative overflow-hidden rounded-lg border bg-white dark:bg-black/50 shadow-sm transition-all duration-300 hover:shadow-md border-brand-primary/10 dark:border-brand-primary/20 backdrop-blur-sm p-4">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Hammer className="h-5 w-5 text-brand-primary hidden sm:block" />
              <h3 className="text-sm font-medium text-brand-dark dark:text-white">Protection codes</h3>
            </div>
            <div className="flex flex-wrap gap-1 justify-center">
              {p.protection_codes.map((c: string) => (
                <span key={c} className="text-xs bg-brand-primary/5 border border-brand-primary/20 text-brand-dark dark:text-white rounded px-2 py-0.5">{c}</span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Paired row: Compatible with + CE Category */}
      {(product.ce_category || (p.compatible_with && p.compatible_with.length > 0)) && (
        <div className="grid grid-cols-2 gap-4">
          {p.compatible_with && p.compatible_with.length > 0 && (
            <div className="group relative overflow-hidden rounded-lg border bg-white dark:bg-black/50 shadow-sm transition-all duration-300 hover:shadow-md border-brand-primary/10 dark:border-brand-primary/20 backdrop-blur-sm p-4">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Package className="h-5 w-5 text-brand-primary hidden sm:block" />
                <h3 className="text-sm font-medium text-brand-dark dark:text-white">Compatible with</h3>
              </div>
              <div className="flex flex-wrap gap-1 justify-center">
                {p.compatible_with.map((c: string) => (
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
    </div>
  );
}


