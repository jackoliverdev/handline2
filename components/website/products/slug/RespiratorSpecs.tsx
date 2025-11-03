"use client";

import { Shield, Ruler, Layers, Move, Hammer, Package, Users, Gauge, Award, Link, Wind, FlaskConical, Zap } from "lucide-react";
import { useLanguage } from "@/lib/context/language-context";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Product } from "@/lib/products-service";

export function RespiratorSpecs({ product }: { product: Product }) {
  const { t, language } = useLanguage();
  const currentMaterials = product.materials_locales?.[language] || [];
  const size = product.size_locales?.[language] || product.size_locales?.en || null;
  const p: any = product as any;
  const std: any = (product as any).respiratory_standards || {};

  // Extract EN standards for display
  const enStandards: string[] = [];
  if (std?.en149?.enabled) enStandards.push('EN 149');
  if (std?.en143?.enabled) enStandards.push('EN 143');
  if (std?.en166?.enabled) enStandards.push('EN 166');
  if (std?.en136?.enabled) enStandards.push('EN 136');
  if (std?.en140?.enabled) enStandards.push('EN 140');
  if (std?.en14387?.enabled) enStandards.push('EN 14387');
  if (std?.din_3181_3?.enabled) enStandards.push('DIN 3181-3');

  return (
    <TooltipProvider>
    <div className="space-y-5">
      {/* Main grid: Materials spans 2 rows, other tiles in specific layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Materials (full height - row span 2) */}
        <div className="group relative overflow-hidden rounded-lg border bg-white dark:bg-black/50 shadow-sm transition-all duration-300 hover:shadow-md border-brand-primary/10 dark:border-brand-primary/20 backdrop-blur-sm p-4 md:row-span-2">
          <div className="flex items-center gap-2 mb-2">
            <Layers className="h-5 w-5 text-brand-primary" />
            <h4 className="font-medium text-brand-dark dark:text-white">{t('productPage.materials')}</h4>
          </div>
          <div className="space-y-1">
            {currentMaterials && currentMaterials.length > 0 ? (
              currentMaterials.map((material, idx) => (
                <div key={idx} className="text-brand-dark dark:text-white font-medium">{material}</div>
              ))
            ) : (
              <div className="text-brand-dark dark:text-white font-medium">-</div>
            )}
          </div>
        </div>

        {/* Size (Col 2, Row 1) */}
        <div className="group relative overflow-hidden rounded-lg border bg-white dark:bg-black/50 shadow-sm transition-all duration-300 hover:shadow-md border-brand-primary/10 dark:border-brand-primary/20 backdrop-blur-sm p-4">
          <div className="flex items-center gap-2 mb-2">
            <Move className="h-5 w-5 text-brand-primary" />
            <h4 className="font-medium text-brand-dark dark:text-white">{t('productPage.productInfo.size')}</h4>
          </div>
          <div className="text-brand-dark dark:text-white font-medium">{size || '-'}</div>
        </div>

        {/* Protection Class (Col 3, Row 1) */}
        <div className="group relative overflow-hidden rounded-lg border bg-white dark:bg-black/50 shadow-sm transition-all duration-300 hover:shadow-md border-brand-primary/10 dark:border-brand-primary/20 backdrop-blur-sm p-4">
          <div className="flex items-center gap-2 mb-2">
            <Shield className="h-5 w-5 text-brand-primary" />
            <h4 className="font-medium text-brand-dark dark:text-white">{t('products.filters.protectionClass') || 'Protection class'}</h4>
          </div>
          <div className="text-brand-dark dark:text-white font-medium">{p.protection_class || '-'}</div>
        </div>

        {/* Connection (Col 2, Row 2) */}
        <div className="group relative overflow-hidden rounded-lg border bg-white dark:bg-black/50 shadow-sm transition-all duration-300 hover:shadow-md border-brand-primary/10 dark:border-brand-primary/20 backdrop-blur-sm p-4">
          <div className="flex items-center gap-2 mb-2">
            <Link className="h-5 w-5 text-brand-primary" />
            <h4 className="font-medium text-brand-dark dark:text-white">{t('products.filters.connection') || 'Connection'}</h4>
          </div>
          <div className="text-brand-dark dark:text-white font-medium">
            {p.connections && p.connections.length > 0 ? p.connections.join(', ') : '-'}
          </div>
        </div>

        {/* NPF (Col 3, Row 2) */}
        <div className="group relative overflow-hidden rounded-lg border bg-white dark:bg-black/50 shadow-sm transition-all duration-300 hover:shadow-md border-brand-primary/10 dark:border-brand-primary/20 backdrop-blur-sm p-4">
          <div className="flex items-center gap-2 mb-2">
            <Gauge className="h-5 w-5 text-brand-primary" />
            <h4 className="font-medium text-brand-dark dark:text-white">{t('productPage.npf') || 'NPF'}</h4>
          </div>
          <div className="text-brand-dark dark:text-white font-medium">{p.npf || '-'}</div>
        </div>
      </div>

      {/* Third row: Compatible with, CE Category, EN Standards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Compatible with */}
        <div className="group relative overflow-hidden rounded-lg border bg-white dark:bg-black/50 shadow-sm transition-all duration-300 hover:shadow-md border-brand-primary/10 dark:border-brand-primary/20 backdrop-blur-sm p-4">
          <div className="flex items-center gap-2 mb-2">
            <Users className="h-5 w-5 text-brand-primary" />
            <h4 className="font-medium text-brand-dark dark:text-white">{t('productPage.compatibleWith') || 'Compatible with'}</h4>
          </div>
          <div className="text-brand-dark dark:text-white font-medium">
            {p.compatible_with && p.compatible_with.length > 0 ? p.compatible_with.join(', ') : '-'}
          </div>
        </div>

        {/* CE Category */}
        <div className="group relative overflow-hidden rounded-lg border bg-white dark:bg-black/50 shadow-sm transition-all duration-300 hover:shadow-md border-brand-primary/10 dark:border-brand-primary/20 backdrop-blur-sm p-4">
          <div className="flex items-center gap-2 mb-2">
            <Award className="h-5 w-5 text-brand-primary" />
            <h4 className="font-medium text-brand-dark dark:text-white">{t('productPage.ceCategory')}</h4>
          </div>
          <div className="text-brand-dark dark:text-white font-medium">{product.ce_category ? `${t('productPage.category')} ${product.ce_category}` : '-'}</div>
        </div>

        {/* EN Standards */}
        <div className="group relative overflow-hidden rounded-lg border bg-white dark:bg-black/50 shadow-sm transition-all duration-300 hover:shadow-md border-brand-primary/10 dark:border-brand-primary/20 backdrop-blur-sm p-4">
          <div className="flex items-center gap-2 mb-2">
            <Shield className="h-5 w-5 text-brand-primary" />
            <h4 className="font-medium text-brand-dark dark:text-white">{t('productPage.standards')}</h4>
          </div>
          <div className="text-brand-dark dark:text-white font-medium">
            {enStandards.length > 0 ? enStandards.join(', ') : '-'}
          </div>
        </div>
      </div>

      {/* Protection (filters fitted) - title and grid */}
      <h3 className="text-lg font-semibold text-brand-dark dark:text-white mb-4">
        {t('productPage.protection')} ({t('productPage.filtersFitted')})
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { 
            key: 'dust', 
            enabled: Boolean((product as any).respiratory_standards?.has_dust), 
            Icon: Wind,
            label: t('productPage.dust')
          },
          { 
            key: 'gasesVapours', 
            enabled: Boolean((product as any).respiratory_standards?.has_gases_vapours), 
            Icon: FlaskConical,
            label: t('productPage.gasesVapours')
          },
          { 
            key: 'combined', 
            enabled: Boolean((product as any).respiratory_standards?.has_combined), 
            Icon: Zap,
            label: t('productPage.combined')
          },
        ].map((item) => {
          const { Icon } = item;
          return (
            <div
              key={item.key}
              className={`group relative overflow-hidden rounded-lg border shadow-sm transition-all duration-300 hover:shadow-md backdrop-blur-sm p-4 ${
                item.enabled
                  ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
                  : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Icon className={`h-5 w-5 ${item.enabled ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`} />
                  <h4 className={`font-medium ${item.enabled ? 'text-green-800 dark:text-green-200' : 'text-red-800 dark:text-red-200'}`}>
                    {item.label}
                  </h4>
                </div>
                <div className={`text-sm font-bold ${item.enabled ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'}`}>
                  {item.enabled ? t('productPage.yes') : t('productPage.no')}
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </div>
    </TooltipProvider>
  );
}


