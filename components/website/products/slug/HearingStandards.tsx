"use client";

import { Product } from "@/lib/products-service";
import { useLanguage } from "@/lib/context/language-context";
import { Badge } from "@/components/ui/badge";
import { Ear, Shield } from "lucide-react";

export function HearingStandards({ product }: { product: Product }) {
  const { t } = useLanguage();
  const hs: any = (product as any).hearing_standards || {};
  const ha: any = (product as any).hearing_attributes || {};

  const parts: string[] = Array.isArray(hs?.en352?.parts) ? hs.en352.parts : [];
  const snr: number | null = typeof hs?.en352?.snr_db === 'number' ? hs.en352.snr_db : null;
  const hml = hs?.en352?.hml || {};
  const additional: string[] = Array.isArray(hs?.en352?.additional) ? hs.en352.additional : [];

  return (
    <div className="space-y-4">
      {/* Title rendered by ProductDetail once for all standards. */}

      <div className="group relative overflow-hidden rounded-lg border bg-white dark:bg-black/50 shadow-sm transition-all duration-300 hover:shadow-md border-brand-primary/10 dark:border-brand-primary/20 backdrop-blur-sm p-4">
        <div className="flex items-center gap-3 mb-2">
          <Ear className="h-5 w-5 text-brand-primary" />
          <h3 className="font-medium text-brand-dark dark:text-white">EN 352</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <div className="text-xs text-brand-secondary dark:text-gray-400 mb-1">{t('productPage.en352Parts') || 'EN 352 parts'}</div>
            <div className="flex flex-wrap gap-2">
              {parts.length ? parts.map((p) => (
                <Badge key={p} variant="outline" className="bg-brand-primary/5 border-brand-primary/20">{p}</Badge>
              )) : <span className="text-sm text-brand-secondary dark:text-gray-300">-</span>}
            </div>
          </div>
          <div>
            <div className="text-xs text-brand-secondary dark:text-gray-400 mb-1">SNR</div>
            <div className="text-brand-dark dark:text-white font-semibold">{snr !== null ? `${snr} dB` : '-'}</div>
          </div>
          <div>
            <div className="text-xs text-brand-secondary dark:text-gray-400 mb-1">H / M / L</div>
            <div className="text-brand-dark dark:text-white font-semibold">{(hml?.h ?? '-')}/{(hml?.m ?? '-')}/{(hml?.l ?? '-')} dB</div>
          </div>
        </div>

        {(additional && additional.length > 0) && (
          <div className="mt-4">
            <div className="text-xs text-brand-secondary dark:text-gray-400 mb-1">{t('productPage.additionalRequirements')}</div>
            <div className="flex flex-wrap gap-2">
              {additional.map((a) => (
                <Badge key={a} variant="outline" className="bg-brand-primary/5 border-brand-primary/20">{a}</Badge>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Attribute cues (compact) */}
      {(typeof ha?.reusable === 'boolean' || ha?.mount || typeof ha?.bluetooth === 'boolean') && (
        <div className="group relative overflow-hidden rounded-lg border bg-white dark:bg-black/50 shadow-sm transition-all duration-300 hover:shadow-md border-brand-primary/10 dark:border-brand-primary/20 backdrop-blur-sm p-4">
          <div className="flex items-center gap-3 mb-2">
            <Shield className="h-5 w-5 text-brand-primary" />
            <h3 className="font-medium text-brand-dark dark:text-white">{t('productPage.attributes')}</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {typeof ha?.reusable === 'boolean' && (
              <Badge variant="outline" className="bg-brand-primary/5 border-brand-primary/20">
                {ha.reusable ? (t('productPage.yes') || 'Yes') : (t('productPage.no') || 'No')} R
              </Badge>
            )}
            {ha?.mount && (
              <Badge variant="outline" className="bg-brand-primary/5 border-brand-primary/20">{ha.mount}</Badge>
            )}
            {typeof ha?.bluetooth === 'boolean' && (
              <Badge variant="outline" className="bg-brand-primary/5 border-brand-primary/20">{t('productPage.bluetooth') || 'Bluetooth'}: {ha.bluetooth ? (t('productPage.yes') || 'Yes') : (t('productPage.no') || 'No')}</Badge>
            )}
          </div>
        </div>
      )}
    </div>
  );
}


