"use client";

import { useLanguage } from "@/lib/context/language-context";
import { Product } from "@/lib/products-service";
import { Badge } from "@/components/ui/badge";
import { Shield, HardHat, Snowflake } from "lucide-react";

export function HeadStandards({ product }: { product: Product }) {
  const { t } = useLanguage();
  const std: any = (product as any).head_standards || {};

  const hasEN397 = Boolean(std?.en397?.present || std?.en397 === true);
  const en397 = std?.en397 || {};
  const opt = en397?.optional || {};

  const additional: Array<{ code: string; labelKey: string }> = [];
  if (std?.en50365) additional.push({ code: 'EN 50365', labelKey: 'productPage.stdLabel.en50365' });
  if (std?.en12492) additional.push({ code: 'EN 12492', labelKey: 'productPage.stdLabel.en12492' });

  const optChips: Array<{ key: 'low_temperature' | 'high_temperature' | 'electrical_insulation' | 'lateral_deformation' | 'molten_metal'; label: string; enabled: boolean }> = [];
  // Low temperature (string like "-30°C")
  optChips.push({ key: 'low_temperature', label: String(opt?.low_temperature || '-'), enabled: Boolean(opt?.low_temperature) });
  // High temperature (optional boolean/string if present)
  optChips.push({ key: 'high_temperature', label: String(opt?.high_temperature || '-'), enabled: Boolean(opt?.high_temperature) });
  // Electrical insulation – reflect EN 50365 if present
  optChips.push({ key: 'electrical_insulation', label: std?.en50365 ? '✓' : '-', enabled: Boolean(std?.en50365) });
  // Lateral deformation (LD)
  optChips.push({ key: 'lateral_deformation', label: 'LD', enabled: Boolean(opt?.lateral_deformation) });
  // Molten metals (MM)
  optChips.push({ key: 'molten_metal', label: 'MM', enabled: Boolean(opt?.molten_metal) });

  return (
    <div className="space-y-4">
      {/* EN 397 core */}
      {hasEN397 && (
        <div className="group relative overflow-hidden rounded-lg border bg-white dark:bg-black/50 shadow-sm transition-all duration-300 hover:shadow-md border-brand-primary/10 dark:border-brand-primary/20 backdrop-blur-sm p-4">
          <div className="flex items-center gap-3 mb-4">
            <HardHat className="h-5 w-5 text-brand-primary" />
            <h3 className="font-medium text-brand-dark dark:text-white">EN 397</h3>
            <div className="text-sm text-brand-secondary dark:text-gray-300">{t('productPage.stdLabel.en397') || ''}</div>
          </div>
          {/* Two rows: 3 tiles top, 2 tiles bottom */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {/* Low temperature */}
            <div>
              <div className="text-xs text-brand-secondary dark:text-gray-400 mb-1">{t('productPage.lowTemperature')}</div>
              <div className={`h-14 flex items-center justify-center rounded-lg border text-sm font-bold ${optChips[0].enabled ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-700 dark:text-green-300' : 'bg-gray-100 dark:bg-black/40 border-gray-300 dark:border-gray-700 text-gray-500 dark:text-gray-400'}`}>
                <div className="inline-flex items-center gap-1.5">
                  <Snowflake className={`h-4 w-4 ${optChips[0].enabled ? 'text-green-600 dark:text-green-400' : 'text-gray-400 dark:text-gray-500'}`} />
                  <span className="font-mono tracking-tight">{optChips[0].label}</span>
                </div>
              </div>
            </div>
            {/* High temperature */}
            <div>
              <div className="text-xs text-brand-secondary dark:text-gray-400 mb-1">{t('productPage.highTemperature') || 'High temperature'}</div>
              <div className={`h-14 flex items-center justify-center rounded-lg border text-sm font-bold ${optChips[1].enabled ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-700 dark:text-green-300' : 'bg-gray-100 dark:bg-black/40 border-gray-300 dark:border-gray-700 text-gray-500 dark:text-gray-400'}`}>
                <span className="font-mono tracking-tight">{optChips[1].label}</span>
              </div>
            </div>
            {/* Electrical insulation (via EN 50365) */}
            <div>
              <div className="text-xs text-brand-secondary dark:text-gray-400 mb-1">{t('productPage.electricalInsulation')}</div>
              <div className={`h-14 flex items-center justify-center rounded-lg border text-sm font-bold ${optChips[2].enabled ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-700 dark:text-green-300' : 'bg-gray-100 dark:bg-black/40 border-gray-300 dark:border-gray-700 text-gray-500 dark:text-gray-400'}`}>
                <span className="font-mono tracking-tight">{optChips[2].label}</span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-2 gap-4 mt-4">
            {/* Lateral deformation */}
            <div>
              <div className="text-xs text-brand-secondary dark:text-gray-400 mb-1">{t('productPage.lateralDeformation')}</div>
              <div className={`h-14 flex items-center justify-center rounded-lg border text-sm font-bold ${optChips[3].enabled ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-700 dark:text-green-300' : 'bg-gray-100 dark:bg-black/40 border-gray-300 dark:border-gray-700 text-gray-500 dark:text-gray-400'}`}>
                <span className="font-mono tracking-tight">{optChips[3].label}</span>
              </div>
            </div>
            {/* Molten metals */}
            <div>
              <div className="text-xs text-brand-secondary dark:text-gray-400 mb-1">{t('products.filters.moltenMetalSplash') || 'Molten metals (MM)'}</div>
              <div className={`h-14 flex items-center justify-center rounded-lg border text-sm font-bold ${optChips[4].enabled ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-700 dark:text-green-300' : 'bg-gray-100 dark:bg-black/40 border-gray-300 dark:border-gray-700 text-gray-500 dark:text-gray-400'}`}>
                <span className="font-mono tracking-tight">{optChips[4].label}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* EN 812 dedicated box */}
      {std?.en812 && (
        <div className="group relative overflow-hidden rounded-lg border bg-white dark:bg-black/50 shadow-sm transition-all duration-300 hover:shadow-md border-brand-primary/10 dark:border-brand-primary/20 backdrop-blur-sm p-4">
          <div className="flex items-center gap-3">
            <Shield className="h-5 w-5 text-brand-primary" />
            <h3 className="font-medium text-brand-dark dark:text-white">EN 812</h3>
            <div className="text-sm text-brand-secondary dark:text-gray-300">{t('productPage.stdLabel.en812') || ''}</div>
          </div>
        </div>
      )}

      {/* Additional head standards */}
      {additional.length > 0 && (
        <div className="group relative overflow-hidden rounded-lg border bg-white dark:bg-black/50 shadow-sm transition-all duration-300 hover:shadow-md border-brand-primary/10 dark:border-brand-primary/20 backdrop-blur-sm p-4">
          <div className="flex items-center gap-3 mb-3">
            <Shield className="h-5 w-5 text-brand-primary" />
            <h3 className="font-medium text-brand-dark dark:text-white">{t('productPage.additionalStandards')}</h3>
          </div>
          <div className="space-y-3">
            {additional.map((s) => (
              <div key={s.code} className="flex items-center gap-3">
                <Shield className="h-5 w-5 text-brand-primary" />
                <div className="font-medium text-brand-dark dark:text-white min-w-[90px] md:min-w-[120px]">{s.code}</div>
                <div className="text-sm md:text-base font-semibold text-brand-dark dark:text-white">{t(s.labelKey) || ''}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}


