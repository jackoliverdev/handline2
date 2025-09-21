"use client";

import { Product } from "@/lib/products-service";
import { useLanguage } from "@/lib/context/language-context";
import { Badge } from "@/components/ui/badge";
import { Shield, Footprints } from "lucide-react";

export function FootwearStandards({ product }: { product: Product }) {
  const { t } = useLanguage();
  const fstd: any = (product as any).footwear_standards || {};

  const codes2011: string[] = Array.isArray(fstd.en_iso_20345_2011) ? fstd.en_iso_20345_2011 : [];
  const codes2022: string[] = Array.isArray(fstd.en_iso_20345_2022) ? fstd.en_iso_20345_2022 : [];
  const slip: string | null = typeof fstd.slip_resistance === 'string' ? fstd.slip_resistance : null;

  const unique = (arr: string[]) => Array.from(new Set(arr.filter(Boolean)));

  return (
    <div className="space-y-4">
      {(codes2011.length > 0 || codes2022.length > 0) && (
        <div className="group relative overflow-hidden rounded-lg border bg-white dark:bg-black/50 shadow-sm transition-all duration-300 hover:shadow-md border-brand-primary/10 dark:border-brand-primary/20 backdrop-blur-sm p-4">
          <div className="flex items-center gap-3 mb-2">
            <Footprints className="h-5 w-5 text-brand-primary" />
            <h3 className="font-medium text-brand-dark dark:text-white">{t('productPage.enIso20345') || 'EN ISO 20345'}</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <div className="text-xs text-brand-secondary dark:text-gray-400 mb-1">{t('productPage.enIso20345_2011')}</div>
              <div className="flex flex-wrap gap-2">
                {unique(codes2011).length > 0 ? unique(codes2011).map((c) => (
                  <Badge key={c} variant="outline" className="bg-brand-primary/5 border-brand-primary/20">{c}</Badge>
                )) : <span className="text-sm text-brand-secondary dark:text-gray-300">-</span>}
              </div>
            </div>
            <div>
              <div className="text-xs text-brand-secondary dark:text-gray-400 mb-1">{t('productPage.enIso20345_2022')}</div>
              <div className="flex flex-wrap gap-2">
                {unique(codes2022).length > 0 ? unique(codes2022).map((c) => (
                  <Badge key={c} variant="outline" className="bg-brand-primary/5 border-brand-primary/20">{c}</Badge>
                )) : <span className="text-sm text-brand-secondary dark:text-gray-300">-</span>}
              </div>
            </div>
          </div>
        </div>
      )}

      {(slip) && (
        <div className="group relative overflow-hidden rounded-lg border bg-white dark:bg-black/50 shadow-sm transition-all duration-300 hover:shadow-md border-brand-primary/10 dark:border-brand-primary/20 backdrop-blur-sm p-4">
          <div className="flex items-center gap-3 mb-2">
            <Shield className="h-5 w-5 text-brand-primary" />
            <h3 className="font-medium text-brand-dark dark:text-white">{t('productPage.slipResistance') || 'Slip resistance'}</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="bg-brand-primary/5 border-brand-primary/20">{slip}</Badge>
          </div>
        </div>
      )}
    </div>
  );
}


