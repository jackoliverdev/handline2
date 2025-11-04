"use client";

import { Product } from "@/lib/products-service";
import { useLanguage } from "@/lib/context/language-context";
import { Badge } from "@/components/ui/badge";
import { Ear, Shield } from "lucide-react";

export function HearingStandards({ product }: { product: Product }) {
  const { t } = useLanguage();
  const hs: any = (product as any).hearing_standards || {};

  const parts: string[] = Array.isArray(hs?.en352?.parts) ? hs.en352.parts : [];
  const snr: number | null = typeof hs?.en352?.snr_db === 'number' ? hs.en352.snr_db : null;
  const hml = hs?.en352?.hml || {};
  const additional: string[] = Array.isArray(hs?.en352?.additional) ? hs.en352.additional : [];

  // Map for translating EN 352 additional requirement codes to translation keys
  const additionalRequirementLabels: Record<string, string> = {
    'W': 'productPage.hearingAttributes.waterResistance',
    'S': 'productPage.hearingAttributes.extremeTemperature', 
    'V': 'productPage.hearingAttributes.mechanicalStress',
    'X': 'productPage.hearingAttributes.electricalInsulation',
    'E1': 'productPage.hearingAttributes.specialElectrical',
    'A': 'productPage.hearingAttributes.adjustments',
    'B': 'productPage.hearingAttributes.biohazard',
    'C': 'productPage.hearingAttributes.compatibility',
    'D': 'productPage.hearingAttributes.decontamination',
    'F': 'productPage.hearingAttributes.flame',
    'L': 'productPage.hearingAttributes.lowTemperature',
    'M': 'productPage.hearingAttributes.mhNoise',
    'R': 'productPage.hearingAttributes.radioFrequency',
    'T': 'productPage.hearingAttributes.temperatureWater'
  };

  // Only create attributes for codes that are actually present in the data
  const protectionAttributes = additional.map(code => ({
    key: code,
    labelKey: additionalRequirementLabels[code] || 'productPage.hearingAttributes.waterResistance',
    enabled: true // Always true since we only show present ones
  }));


  return (
    <div className="space-y-4">
      {/* EN 352 Main Standard */}
      <div className="group relative overflow-hidden rounded-lg border bg-white dark:bg-black/50 shadow-sm transition-all duration-300 hover:shadow-md border-brand-primary/10 dark:border-brand-primary/20 backdrop-blur-sm p-4">
        <div className="flex items-center gap-3 mb-4">
          <Ear className="h-5 w-5 text-brand-primary" />
          <h3 className="font-medium text-brand-dark dark:text-white">EN 352</h3>
          <div className="text-sm text-brand-secondary dark:text-gray-300">{t('navbar.hearingProtection')}</div>
        </div>
        
        {/* Top row: EN 352 parts, SNR, H/M/L */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <div className="text-xs text-brand-secondary dark:text-gray-400 mb-1">{t('productPage.en352Parts') || 'EN 352 Parts'}</div>
            <div className="flex flex-wrap gap-2">
              {parts.length ? parts.map((p) => (
                <Badge key={p} variant="outline" className="bg-brand-primary/5 border-brand-primary/20">{p}</Badge>
              )) : <span className="text-sm text-brand-secondary dark:text-gray-300">-</span>}
            </div>
          </div>
          <div>
            <div className="text-xs text-brand-secondary dark:text-gray-400 mb-1">SNR</div>
            <div className="text-brand-dark dark:text-white font-semibold text-lg">{snr !== null ? `${snr} dB` : '-'}</div>
          </div>
          <div>
            <div className="text-xs text-brand-secondary dark:text-gray-400 mb-1">H / M / L</div>
            <div className="text-brand-dark dark:text-white font-semibold text-lg">{(hml?.h ?? '-')}/{(hml?.m ?? '-')}/{(hml?.l ?? '-')} dB</div>
          </div>
        </div>

        {/* Additional requirements - only show if there are any */}
        {protectionAttributes.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {protectionAttributes.map((attr) => (
              <div key={attr.key}>
                <div className="text-xs text-brand-secondary dark:text-gray-400 mb-1">{t(attr.labelKey)}</div>
                <div className="h-12 flex items-center justify-center rounded-lg border text-sm font-bold bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-700 dark:text-green-300">
                  <span className="font-mono tracking-tight">{attr.key}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Additional Standards - Each in its own box like EN ISO 21420 */}
      {hs?.en_421 && (
        <div className="group relative overflow-hidden rounded-lg border bg-white dark:bg-black/50 shadow-sm transition-all duration-300 hover:shadow-md border-brand-primary/10 dark:border-brand-primary/20 backdrop-blur-sm p-4">
          <div className="flex items-center gap-3 md:gap-4 flex-wrap">
            <Shield className="h-5 w-5 text-brand-primary" />
            <h3 className="font-medium text-brand-dark dark:text-white">EN 421</h3>
            <span className="text-sm md:text-base font-semibold text-brand-dark dark:text-white">{t('productPage.stdLabel.en421')}</span>
          </div>
        </div>
      )}
      {hs?.en_659 && (
        <div className="group relative overflow-hidden rounded-lg border bg-white dark:bg-black/50 shadow-sm transition-all duration-300 hover:shadow-md border-brand-primary/10 dark:border-brand-primary/20 backdrop-blur-sm p-4">
          <div className="flex items-center gap-3 md:gap-4 flex-wrap">
            <Shield className="h-5 w-5 text-brand-primary" />
            <h3 className="font-medium text-brand-dark dark:text-white">EN 659</h3>
            <span className="text-sm md:text-base font-semibold text-brand-dark dark:text-white">{t('productPage.stdLabel.en659')}</span>
          </div>
        </div>
      )}
      {hs?.food_grade && (
        <div className="group relative overflow-hidden rounded-lg border bg-white dark:bg-black/50 shadow-sm transition-all duration-300 hover:shadow-md border-brand-primary/10 dark:border-brand-primary/20 backdrop-blur-sm p-4">
          <div className="flex items-center gap-3 md:gap-4 flex-wrap">
            <Shield className="h-5 w-5 text-brand-primary" />
            <h3 className="font-medium text-brand-dark dark:text-white">{t('productPage.stdLabel.foodGrade')}</h3>
          </div>
        </div>
      )}
      {hs?.ionising_radiation && (
        <div className="group relative overflow-hidden rounded-lg border bg-white dark:bg-black/50 shadow-sm transition-all duration-300 hover:shadow-md border-brand-primary/10 dark:border-brand-primary/20 backdrop-blur-sm p-4">
          <div className="flex items-center gap-3 md:gap-4 flex-wrap">
            <Shield className="h-5 w-5 text-brand-primary" />
            <h3 className="font-medium text-brand-dark dark:text-white">{t('productPage.stdLabel.ionisingRadiation')}</h3>
          </div>
        </div>
      )}
      {hs?.radioactive_contamination && (
        <div className="group relative overflow-hidden rounded-lg border bg-white dark:bg-black/50 shadow-sm transition-all duration-300 hover:shadow-md border-brand-primary/10 dark:border-brand-primary/20 backdrop-blur-sm p-4">
          <div className="flex items-center gap-3 md:gap-4 flex-wrap">
            <Shield className="h-5 w-5 text-brand-primary" />
            <h3 className="font-medium text-brand-dark dark:text-white">{t('productPage.stdLabel.radioactiveContamination')}</h3>
          </div>
        </div>
      )}
    </div>
  );
}


