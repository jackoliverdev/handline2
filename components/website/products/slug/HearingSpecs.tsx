"use client";

import { Product } from "@/lib/products-service";
import { useLanguage } from "@/lib/context/language-context";
import { Layers, Move, Volume2, Mic, Settings, Shield, Droplets, Thermometer, Zap, Users, Bluetooth } from "lucide-react";

export function HearingSpecs({ product }: { product: Product }) {
  const { t, language } = useLanguage();
  const materials = product.materials_locales?.[language] || product.materials_locales?.en || [];
  const size = product.size_locales?.[language] || product.size_locales?.en || '';
  const hs: any = (product as any).hearing_standards;
  const ha: any = (product as any).hearing_attributes;
  const snr: number | null = hs?.en352?.snr_db ?? null;
  const parts: string[] = Array.isArray(hs?.en352?.parts) ? hs.en352.parts : [];
  const reusable = typeof ha?.reusable === 'boolean' ? (ha.reusable ? 'R' : 'NR') : null;
  const mount = ha?.mount || null;
  const bt = typeof ha?.bluetooth === 'boolean' ? ha.bluetooth : null;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-4">
        {/* Row 1: Materials, Size, SNR */}
        <div className="group relative overflow-hidden rounded-lg border bg-white dark:bg-black/50 shadow-sm transition-all duration-300 hover:shadow-md border-brand-primary/10 dark:border-brand-primary/20 backdrop-blur-sm p-4">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Layers className="h-5 w-5 text-brand-primary hidden sm:block" />
            <h3 className="text-sm font-medium text-brand-dark dark:text-white">{t('productPage.materials')}</h3>
          </div>
          <div className="flex items-center justify-center">
            {materials && materials.length > 0 ? (
              <div className="text-center">
                <div className="text-brand-dark dark:text-white font-medium text-md">{materials[0]}</div>
                {materials.length > 1 && (
                  <div className="text-sm text-brand-secondary dark:text-gray-300">+{materials.length - 1} more</div>
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
            <Volume2 className="h-5 w-5 text-brand-primary hidden sm:block" />
            <h3 className="text-sm font-medium text-brand-dark dark:text-white">{t('productPage.snr') || 'SNR'}</h3>
          </div>
          <div className="flex items-center justify-center">
            <span className="text-brand-dark dark:text-white font-medium text-md">{snr ? `${snr} dB` : '-'}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {/* Row 2: EN 352 Parts, Mount type, CE Category */}
        <div className="group relative overflow-hidden rounded-lg border bg-white dark:bg-black/50 shadow-sm transition-all duration-300 hover:shadow-md border-brand-primary/10 dark:border-brand-primary/20 backdrop-blur-sm p-4">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Mic className="h-5 w-5 text-brand-primary hidden sm:block" />
            <h3 className="text-sm font-medium text-brand-dark dark:text-white">{t('productPage.en352Parts') || 'EN 352 Parts'}</h3>
          </div>
          <div className="flex items-center justify-center">
            <span className="text-brand-dark dark:text-white font-medium text-md">{parts.length ? parts.join(', ') : '-'}</span>
          </div>
        </div>

        <div className="group relative overflow-hidden rounded-lg border bg-white dark:bg-black/50 shadow-sm transition-all duration-300 hover:shadow-md border-brand-primary/10 dark:border-brand-primary/20 backdrop-blur-sm p-4">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Settings className="h-5 w-5 text-brand-primary hidden sm:block" />
            <h3 className="text-sm font-medium text-brand-dark dark:text-white">{t('products.filters.mountType') || 'Mount type'}</h3>
          </div>
          <div className="flex items-center justify-center">
            <span className="text-brand-dark dark:text-white font-medium text-md">{mount || '-'}</span>
          </div>
        </div>

        <div className="group relative overflow-hidden rounded-lg border bg-white dark:bg-black/50 shadow-sm transition-all duration-300 hover:shadow-md border-brand-primary/10 dark:border-brand-primary/20 backdrop-blur-sm p-4">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Shield className="h-5 w-5 text-brand-primary" />
            <h3 className="text-sm font-medium text-brand-dark dark:text-white">{t('productPage.ceCategory')}</h3>
          </div>
          <div className="flex items-center justify-center">
            <span className="text-brand-dark dark:text-white font-medium text-md">{product.ce_category || '-'}</span>
          </div>
        </div>
      </div>

      {/* Hearing Attributes Section */}
      <h3 className="text-lg font-semibold text-brand-dark dark:text-white mb-4">{t('productPage.attributes')}</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {[
          { 
            key: 'reusable', 
            enabled: Boolean(ha?.reusable), 
            Icon: Settings,
            label: t('products.filters.reusable')
          },
          { 
            key: 'waterResistant', 
            enabled: Boolean(ha?.water_resistance), 
            Icon: Droplets,
            label: t('productPage.hearingAttributes.waterResistance')
          },
          { 
            key: 'highTemperatures', 
            enabled: Boolean(ha?.extreme_temperature), 
            Icon: Thermometer,
            label: t('productPage.hearingAttributes.extremeTemperature')
          },
          { 
            key: 'electricalInsulation', 
            enabled: Boolean(ha?.electrical_insulation), 
            Icon: Zap,
            label: t('productPage.hearingAttributes.electricalInsulation')
          },
          { 
            key: 'compatibleWithOtherPPE', 
            enabled: Boolean(ha?.compatible_with && ha.compatible_with.length > 0), 
            Icon: Users,
            label: t('productPage.hearingAttributes.compatibility')
          },
          { 
            key: 'bluetooth', 
            enabled: Boolean(ha?.bluetooth), 
            Icon: Bluetooth,
            label: t('products.filters.bluetooth')
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


