"use client";

import { Shield, Ruler, Layers, Move, Hammer, Package, Users, Gauge, Award, Link } from "lucide-react";
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
  if (std?.en149) enStandards.push('EN 149');
  if (std?.en166) enStandards.push('EN 166');
  if (std?.en136) enStandards.push('EN 136');
  if (std?.en14387) enStandards.push('EN 14387');
  if (std?.en143) enStandards.push('EN 143');
  if (std?.din_3181_3) enStandards.push('DIN 3181-3');

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
          <div className="space-y-1 text-brand-dark dark:text-white">
            {currentMaterials && currentMaterials.length > 0 ? (
              currentMaterials.map((material, idx) => (
                <div key={idx} className="text-sm leading-relaxed">{material}</div>
              ))
            ) : (
              <div className="text-sm">-</div>
            )}
          </div>
        </div>

        {/* Size (Col 2, Row 1) */}
        <div className="group relative overflow-hidden rounded-lg border bg-white dark:bg-black/50 shadow-sm transition-all duration-300 hover:shadow-md border-brand-primary/10 dark:border-brand-primary/20 backdrop-blur-sm p-4">
          <div className="flex items-center gap-2 mb-2">
            <Move className="h-5 w-5 text-brand-primary" />
            <h4 className="font-medium text-brand-dark dark:text-white">{t('productPage.productInfo.size')}</h4>
          </div>
          <p className="text-brand-dark dark:text-white">{size || '-'}</p>
        </div>

        {/* Protection Class (Col 3, Row 1) */}
        <div className="group relative overflow-hidden rounded-lg border bg-white dark:bg-black/50 shadow-sm transition-all duration-300 hover:shadow-md border-brand-primary/10 dark:border-brand-primary/20 backdrop-blur-sm p-4">
          <div className="flex items-center gap-2 mb-2">
            <Shield className="h-5 w-5 text-brand-primary" />
            <h4 className="font-medium text-brand-dark dark:text-white">{t('products.filters.protectionClass') || 'Protection class'}</h4>
          </div>
          <p className="text-brand-dark dark:text-white">{p.protection_class || '-'}</p>
        </div>

        {/* Connection (Col 2, Row 2) */}
        <div className="group relative overflow-hidden rounded-lg border bg-white dark:bg-black/50 shadow-sm transition-all duration-300 hover:shadow-md border-brand-primary/10 dark:border-brand-primary/20 backdrop-blur-sm p-4">
          <div className="flex items-center gap-2 mb-2">
            <Link className="h-5 w-5 text-brand-primary" />
            <h4 className="font-medium text-brand-dark dark:text-white">{t('products.filters.connection') || 'Connection'}</h4>
          </div>
          <div className="flex flex-wrap gap-1">
            {p.connections && p.connections.length > 0 ? (
              p.connections.map((c: string, idx: number) => (
                <span key={idx} className="bg-brand-primary/10 text-brand-primary border border-brand-primary/20 rounded-full px-2 py-0.5 text-xs">{c}</span>
              ))
            ) : (
              <span className="text-brand-dark dark:text-white">-</span>
            )}
          </div>
        </div>

        {/* NPF (Col 3, Row 2) */}
        <div className="group relative overflow-hidden rounded-lg border bg-white dark:bg-black/50 shadow-sm transition-all duration-300 hover:shadow-md border-brand-primary/10 dark:border-brand-primary/20 backdrop-blur-sm p-4">
          <div className="flex items-center gap-2 mb-2">
            <Gauge className="h-5 w-5 text-brand-primary" />
            <h4 className="font-medium text-brand-dark dark:text-white">{t('productPage.npf') || 'NPF'}</h4>
          </div>
          <p className="text-brand-dark dark:text-white">{p.npf || '-'}</p>
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
          <div className="flex flex-wrap gap-1">
            {p.compatible_with && p.compatible_with.length > 0 ? (
              p.compatible_with.map((c: string, idx: number) => (
                <span key={idx} className="bg-brand-primary/10 text-brand-primary border border-brand-primary/20 rounded-full px-2 py-0.5 text-xs">{c}</span>
              ))
            ) : (
              <span className="text-brand-dark dark:text-white">-</span>
            )}
          </div>
        </div>

        {/* CE Category */}
        <div className="group relative overflow-hidden rounded-lg border bg-white dark:bg-black/50 shadow-sm transition-all duration-300 hover:shadow-md border-brand-primary/10 dark:border-brand-primary/20 backdrop-blur-sm p-4">
          <div className="flex items-center gap-2 mb-2">
            <Award className="h-5 w-5 text-brand-primary" />
            <h4 className="font-medium text-brand-dark dark:text-white">{t('productPage.ceCategory')}</h4>
          </div>
          <p className="text-brand-dark dark:text-white">{product.ce_category ? `${t('productPage.category')} ${product.ce_category}` : '-'}</p>
        </div>

        {/* EN Standards */}
        <div className="group relative overflow-hidden rounded-lg border bg-white dark:bg-black/50 shadow-sm transition-all duration-300 hover:shadow-md border-brand-primary/10 dark:border-brand-primary/20 backdrop-blur-sm p-4">
          <div className="flex items-center gap-2 mb-2">
            <Shield className="h-5 w-5 text-brand-primary" />
            <h4 className="font-medium text-brand-dark dark:text-white">{t('productPage.standards')}</h4>
          </div>
          <div className="flex flex-wrap gap-1">
            {enStandards.length > 0 ? (
              enStandards.map((std, idx) => (
                <span key={idx} className="bg-white dark:bg-black/40 text-brand-dark dark:text-white border border-brand-primary/20 rounded px-2 py-0.5 text-xs">{std}</span>
              ))
            ) : (
              <span className="text-brand-dark dark:text-white">-</span>
            )}
          </div>
        </div>
      </div>

    </div>
    </TooltipProvider>
  );
}


