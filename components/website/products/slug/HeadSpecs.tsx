"use client";

import { Product } from "@/lib/products-service";
import { useLanguage } from "@/lib/context/language-context";
import { Layers, Scale, Shield, FileText, Wind, Zap, Ruler } from "lucide-react";

export function HeadSpecs({ product }: { product: Product }) {
  const { t, language } = useLanguage();
  const attrs: any = (product as any).head_attributes || {};
  const std: any = (product as any).head_standards || {};
  const techSpecs = (product as any).head_tech_specs_locales?.[language] || (product as any).head_tech_specs_locales?.en || {};

  const materials = product.materials_locales?.[language] || [];
  const size = product.size_locales?.[language] || product.size_locales?.en || null;
  const weight = typeof attrs.weight_g === 'number' ? `${attrs.weight_g} g` : null;
  const colours: string[] = Array.isArray(techSpecs.colours) ? techSpecs.colours : [];

  const stdChips: string[] = [];
  if (std?.en397?.present) stdChips.push('EN 397');
  if (std?.en50365) stdChips.push('EN 50365');
  if (std?.en12492) stdChips.push('EN 12492');
  if (std?.en812) stdChips.push('EN 812');

  const isEmpty = (val: any) => val === null || val === undefined || (Array.isArray(val) && val.length === 0) || (typeof val === 'string' && val.trim() === '');

  return (
    <div className="space-y-4">
      {/* Main grid: Materials spans 2 rows on left, other specs in 2 columns on right */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Materials (2 rows height) */}
        {!isEmpty(materials) && (
          <div className="group relative overflow-hidden rounded-lg border bg-white dark:bg-black/50 shadow-sm transition-all duration-300 hover:shadow-md border-brand-primary/10 dark:border-brand-primary/20 backdrop-blur-sm p-4 md:row-span-2">
            <div className="flex items-center gap-2 mb-2">
              <Layers className="h-5 w-5 text-brand-primary" />
              <h4 className="font-medium text-brand-dark dark:text-white">{t('productPage.materials')}</h4>
            </div>
            {Array.isArray(materials) && materials.length > 0 ? (
              <div className="space-y-2">
                {materials.map((m: string, i: number) => (
                  <div key={i} className="text-brand-dark dark:text-white font-medium">{m}</div>
                ))}
              </div>
            ) : (
              <div className="text-brand-dark dark:text-white font-medium">-</div>
            )}
          </div>
        )}

        {/* Size */}
        {!isEmpty(size) && (
          <div className="group relative overflow-hidden rounded-lg border bg-white dark:bg-black/50 shadow-sm transition-all duration-300 hover:shadow-md border-brand-primary/10 dark:border-brand-primary/20 backdrop-blur-sm p-4">
            <div className="flex items-center gap-2 mb-2">
              <Ruler className="h-5 w-5 text-brand-primary" />
              <h4 className="font-medium text-brand-dark dark:text-white">{t('productPage.size')}</h4>
            </div>
            <div className="text-brand-dark dark:text-white font-medium">{size}</div>
          </div>
        )}

        {/* Standards */}
        {stdChips.length > 0 && (
          <div className="group relative overflow-hidden rounded-lg border bg-white dark:bg-black/50 shadow-sm transition-all duration-300 hover:shadow-md border-brand-primary/10 dark:border-brand-primary/20 backdrop-blur-sm p-4">
            <div className="flex items-center gap-2 mb-2">
              <FileText className="h-5 w-5 text-brand-primary" />
              <h4 className="font-medium text-brand-dark dark:text-white">{t('productPage.standards')}</h4>
            </div>
            <div className="text-brand-dark dark:text-white font-medium">{stdChips.join(', ')}</div>
          </div>
        )}

        {/* Colours */}
        {!isEmpty(colours) && colours.length > 0 && (
          <div className="group relative overflow-hidden rounded-lg border bg-white dark:bg-black/50 shadow-sm transition-all duration-300 hover:shadow-md border-brand-primary/10 dark:border-brand-primary/20 backdrop-blur-sm p-4">
            <div className="flex items-center gap-2 mb-2">
              <Layers className="h-5 w-5 text-brand-primary" />
              <h4 className="font-medium text-brand-dark dark:text-white">{t('productPage.colours')}</h4>
            </div>
            <div className="text-brand-dark dark:text-white font-medium">{colours.join(', ')}</div>
          </div>
        )}

        {/* CE Category - goes in the 4th slot */}
        {!isEmpty(product.ce_category) && (
          <div className="group relative overflow-hidden rounded-lg border bg-white dark:bg-black/50 shadow-sm transition-all duration-300 hover:shadow-md border-brand-primary/10 dark:border-brand-primary/20 backdrop-blur-sm p-4">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="h-5 w-5 text-brand-primary" />
              <h4 className="font-medium text-brand-dark dark:text-white">{t('productPage.ceCategory')}</h4>
            </div>
            <div className="text-brand-dark dark:text-white font-medium">{product.ce_category ? `${t('productPage.category')} ${product.ce_category}` : '-'}</div>
          </div>
        )}
      </div>

      {/* Head Attributes Section */}
      <h3 className="text-lg font-semibold text-brand-dark dark:text-white mb-4">{t('productPage.attributes')}</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {[
          { 
            key: 'lowTemp', 
            enabled: Boolean(std?.en397?.optional?.low_temperature), 
            Icon: Shield,
            label: t('products.filters.lowTemperature')
          },
          { 
            key: 'highTemp', 
            enabled: Boolean(std?.en397?.optional?.high_temperature), 
            Icon: Shield,
            label: t('productPage.highTemperature') || 'High Temperature'
          },
          { 
            key: 'electricalIns', 
            enabled: Boolean(std?.en397?.optional?.electrical_insulation), 
            Icon: Zap,
            label: t('productPage.electricalInsulation') || 'Electrical Insulation'
          },
          { 
            key: 'moltenMetal', 
            enabled: Boolean(std?.en397?.optional?.molten_metal), 
            Icon: Shield,
            label: 'MM - ' + (t('products.filters.moltenMetalSplash') || 'Molten Metal')
          },
          { 
            key: 'lateralDef', 
            enabled: Boolean(std?.en397?.optional?.lateral_deformation), 
            Icon: Shield,
            label: 'LD - Lateral Deformation'
          },
          { 
            key: 'ventilation', 
            enabled: Boolean(attrs?.ventilation), 
            Icon: Wind,
            label: t('products.filters.ventilation') || 'Ventilation'
          },
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
                  <h4 className={`font-medium text-sm ${item.enabled ? 'text-green-800 dark:text-green-200' : 'text-red-800 dark:text-red-200'}`}>{item.label}</h4>
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
  );
}
