"use client";

import { Product } from "@/lib/products-service";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/lib/context/language-context";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Shield, Zap, Waves, Droplets, FlaskConical, HardHat } from "lucide-react";

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

  // Parse materials into specific components like EyeFace does
  const upperMaterial = mats.find((m: string) => m.toLowerCase().includes('upper:'))?.replace(/upper:\s*/i, '') || '-';
  const liningMaterial = mats.find((m: string) => m.toLowerCase().includes('lining:'))?.replace(/lining:\s*/i, '') || '-';
  const soleMaterial = mats.find((m: string) => m.toLowerCase().includes('sole:'))?.replace(/sole:\s*/i, '') || '-';
  const insoleMaterial = mats.find((m: string) => m.toLowerCase().includes('insole:'))?.replace(/insole:\s*/i, '') || '-';
  const toeCapMaterial = mats.find((m: string) => m.toLowerCase().includes('toe cap:'))?.replace(/toe cap:\s*/i, '') || '-';

  return (
    <TooltipProvider>
    <div className="space-y-5">
      {/* Unified grid: Materials spans 2 rows; 2x2 grid for other specs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Materials (full height - row span 2) */}
        <div className="group relative overflow-hidden rounded-lg border bg-white dark:bg-black/50 shadow-sm transition-all duration-300 hover:shadow-md border-brand-primary/10 dark:border-brand-primary/20 backdrop-blur-sm p-4 md:row-span-2">
          <h4 className="font-medium text-brand-dark dark:text-white mb-2">{t('productPage.materials')}</h4>
          <div className="divide-y divide-gray-200 dark:divide-gray-700 text-brand-dark dark:text-white">
            <div className="flex items-center justify-between py-2"><span>Upper material</span><span className="font-medium">{upperMaterial}</span></div>
            <div className="flex items-center justify-between py-2"><span>Lining material</span><span className="font-medium">{liningMaterial}</span></div>
            <div className="flex items-center justify-between py-2"><span>Sole material</span><span className="font-medium">{soleMaterial}</span></div>
            <div className="flex items-center justify-between py-2"><span>Insole material</span><span className="font-medium">{insoleMaterial}</span></div>
            <div className="flex items-center justify-between py-2"><span>Toe cap material</span><span className="font-medium">{toeCapMaterial}</span></div>
          </div>
        </div>
        {/* Size - Col 2, Row 1 */}
        <div className="group relative overflow-hidden rounded-lg border bg-white dark:bg-black/50 shadow-sm transition-all duration-300 hover:shadow-md border-brand-primary/10 dark:border-brand-primary/20 backdrop-blur-sm p-4">
          <h4 className="font-medium text-brand-dark dark:text-white mb-2">{t('productPage.size')}</h4>
          <p className="text-brand-dark dark:text-white">{size || '-'}</p>
        </div>
        {/* Width/Fit - Col 3, Row 1 */}
        <div className="group relative overflow-hidden rounded-lg border bg-white dark:bg-black/50 shadow-sm transition-all duration-300 hover:shadow-md border-brand-primary/10 dark:border-brand-primary/20 backdrop-blur-sm p-4">
          <h4 className="font-medium text-brand-dark dark:text-white mb-2">{t('products.filters.widthFit') || 'Width / Fit'}</h4>
          <div className="flex flex-wrap gap-1.5">
            {widthFit.length > 0 ? widthFit.map((width, idx) => (
              <span key={idx} className="bg-white dark:bg-black/40 text-brand-dark dark:text-white border border-brand-primary/20 rounded px-2 py-0.5 text-xs">{width}</span>
            )) : <span>-</span>}
          </div>
        </div>
        {/* EN Standards - Col 2, Row 2 */}
        <div className="group relative overflow-hidden rounded-lg border bg-white dark:bg-black/50 shadow-sm transition-all duration-300 hover:shadow-md border-brand-primary/10 dark:border-brand-primary/20 backdrop-blur-sm p-4">
          <h4 className="font-medium text-brand-dark dark:text-white mb-2">{t('products.enStandards')}</h4>
          <div className="space-y-2">
            {Array.isArray(fstd.en_iso_20345_2011) && fstd.en_iso_20345_2011.length > 0 && (
              <div>
                <span className="bg-white dark:bg-black/40 text-brand-dark dark:text-white border border-brand-primary/20 rounded px-2 py-0.5 text-xs">
                  EN ISO 20345:2011
                </span>
              </div>
            )}
            {Array.isArray(fstd.en_iso_20345_2022) && fstd.en_iso_20345_2022.length > 0 && (
              <div>
                <span className="bg-white dark:bg-black/40 text-brand-dark dark:text-white border border-brand-primary/20 rounded px-2 py-0.5 text-xs">
                  EN ISO 20345:2022
                </span>
              </div>
            )}
            {(!fstd.en_iso_20345_2011?.length && !fstd.en_iso_20345_2022?.length) && (
              <span>-</span>
            )}
          </div>
        </div>
        {/* CE Category - Col 3, Row 2 */}
        <div className="group relative overflow-hidden rounded-lg border bg-white dark:bg-black/50 shadow-sm transition-all duration-300 hover:shadow-md border-brand-primary/10 dark:border-brand-primary/20 backdrop-blur-sm p-4">
          <h4 className="font-medium text-brand-dark dark:text-white mb-2">{t('productPage.ceCategory')}</h4>
          <p className="text-brand-dark dark:text-white">{product.ce_category || '-'}</p>
        </div>
      </div>

      {/* Footwear Attributes - 3x2 grid */}
      <h3 className="text-lg font-semibold text-brand-dark dark:text-white mb-4">{t('productPage.attributes')}</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {[
          { 
            key: 'metalFree', 
            enabled: metalFree === true, 
            Icon: Shield,
            label: t('productPage.footwearAttributes.metalFree')
          },
          { 
            key: 'esd', 
            enabled: Boolean(fattr.esd), 
            Icon: Zap,
            label: t('productPage.footwearAttributes.esd')
          },
          { 
            key: 'slipResistance', 
            enabled: Boolean(slip || hasSlipInCodes), 
            Icon: Waves,
            label: t('productPage.footwearAttributes.slipResistance')
          },
          { 
            key: 'waterResistance', 
            enabled: Boolean(fattr.water_resistance), 
            Icon: Droplets,
            label: t('productPage.footwearAttributes.waterResistance')
          },
          { 
            key: 'chemicalExposure', 
            enabled: Boolean(fattr.chemical_resistance), 
            Icon: FlaskConical,
            label: t('productPage.footwearAttributes.chemicalExposure')
          },
          { 
            key: 'metatarsalProtection', 
            enabled: Boolean(fattr.special && Array.isArray(fattr.special) && fattr.special.includes('metatarsal_protection')), 
            Icon: HardHat,
            label: t('productPage.footwearAttributes.metatarsalProtection')
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
    </TooltipProvider>
  );
}


