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
      {/* Main grid: Materials spans 3 rows on left, 5 other specs in 2 columns on right */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Materials (full height - spans 3 rows) */}
        <div className="group relative overflow-hidden rounded-lg border bg-white dark:bg-black/50 shadow-sm transition-all duration-300 hover:shadow-md border-brand-primary/10 dark:border-brand-primary/20 backdrop-blur-sm p-4 md:row-span-3">
          <div className="flex items-center gap-2 mb-2">
            <Layers className="h-5 w-5 text-brand-primary" />
            <h4 className="font-medium text-brand-dark dark:text-white">{t('productPage.materials')}</h4>
          </div>
          {materials && materials.length > 0 ? (
            <div className="space-y-1">
              {materials.map((m: string, i: number) => (
                <div key={i} className="text-brand-dark dark:text-white font-medium">{m}</div>
              ))}
            </div>
          ) : (
            <div className="text-brand-dark dark:text-white font-medium">-</div>
          )}
        </div>

        {/* Size */}
        <div className="group relative overflow-hidden rounded-lg border bg-white dark:bg-black/50 shadow-sm transition-all duration-300 hover:shadow-md border-brand-primary/10 dark:border-brand-primary/20 backdrop-blur-sm p-4">
          <div className="flex items-center gap-2 mb-2">
            <Move className="h-5 w-5 text-brand-primary" />
            <h4 className="font-medium text-brand-dark dark:text-white">{t('productPage.productInfo.size')}</h4>
          </div>
          <div className="text-brand-dark dark:text-white font-medium">{size || '-'}</div>
        </div>

        {/* SNR */}
        <div className="group relative overflow-hidden rounded-lg border bg-white dark:bg-black/50 shadow-sm transition-all duration-300 hover:shadow-md border-brand-primary/10 dark:border-brand-primary/20 backdrop-blur-sm p-4">
          <div className="flex items-center gap-2 mb-2">
            <Volume2 className="h-5 w-5 text-brand-primary" />
            <h4 className="font-medium text-brand-dark dark:text-white">{t('productPage.snr') || 'SNR'}</h4>
          </div>
          <div className="text-brand-dark dark:text-white font-medium">{snr ? `${snr} dB` : '-'}</div>
        </div>

        {/* EN 352 Parts */}
        <div className="group relative overflow-hidden rounded-lg border bg-white dark:bg-black/50 shadow-sm transition-all duration-300 hover:shadow-md border-brand-primary/10 dark:border-brand-primary/20 backdrop-blur-sm p-4">
          <div className="flex items-center gap-2 mb-2">
            <Shield className="h-5 w-5 text-brand-primary" />
            <h4 className="font-medium text-brand-dark dark:text-white">{t('productPage.en352Parts') || 'EN 352 Parts'}</h4>
          </div>
          <div className="text-brand-dark dark:text-white font-medium">{parts.length ? parts.join(', ') : '-'}</div>
        </div>

        {/* Mount type */}
        <div className="group relative overflow-hidden rounded-lg border bg-white dark:bg-black/50 shadow-sm transition-all duration-300 hover:shadow-md border-brand-primary/10 dark:border-brand-primary/20 backdrop-blur-sm p-4">
          <div className="flex items-center gap-2 mb-2">
            <Settings className="h-5 w-5 text-brand-primary" />
            <h4 className="font-medium text-brand-dark dark:text-white">{t('products.filters.mountType') || 'Mount type'}</h4>
          </div>
          <div className="text-brand-dark dark:text-white font-medium capitalize">{mount || '-'}</div>
        </div>

        {/* CE Category - spans 2 columns */}
        <div className="group relative overflow-hidden rounded-lg border bg-white dark:bg-black/50 shadow-sm transition-all duration-300 hover:shadow-md border-brand-primary/10 dark:border-brand-primary/20 backdrop-blur-sm p-4 md:col-span-2">
          <div className="flex items-center gap-2 mb-2">
            <Shield className="h-5 w-5 text-brand-primary" />
            <h4 className="font-medium text-brand-dark dark:text-white">{t('productPage.ceCategory')}</h4>
          </div>
          <div className="text-brand-dark dark:text-white font-medium">{product.ce_category ? `${t('productPage.category')} ${product.ce_category}` : '-'}</div>
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


