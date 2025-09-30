"use client";

import { useLanguage } from "@/lib/context/language-context";
import { Product } from "@/lib/products-service";
import { Badge } from "@/components/ui/badge";
import { Shield, Eye } from "lucide-react";

export function EyeFaceStandards({ product }: { product: Product }) {
  const { t } = useLanguage();
  const std: any = (product as any).eye_face_standards || {};

  const hasEn166 = Boolean(std?.en166);
  const en166 = std?.en166 || {};

  type StdItem = { code: string, labelKey: string };
  // Build other standards list (everything except EN 166) in desired display order
  const otherStandards: StdItem[] = [];
  if (std?.en170) otherStandards.push({ code: "EN 170", labelKey: 'productPage.stdLabel.en170' });
  if (std?.gs_et_29) otherStandards.push({ code: "GS ET-29", labelKey: 'productPage.stdLabel.gset29' });
  if (std?.en169) otherStandards.push({ code: "EN 169", labelKey: 'productPage.stdLabel.en169' });
  if (std?.en172) otherStandards.push({ code: "EN 172", labelKey: 'productPage.stdLabel.en172' });
  if (std?.en175) otherStandards.push({ code: "EN 175", labelKey: 'productPage.stdLabel.en175' });

  return (
    <div className="space-y-4">
      {/* EN 166 block */}
      {hasEn166 && (
        <div className="group relative overflow-hidden rounded-lg border bg-white dark:bg-black/50 shadow-sm transition-all duration-300 hover:shadow-md border-brand-primary/10 dark:border-brand-primary/20 backdrop-blur-sm p-4">
          <div className="flex items-center gap-3 mb-3">
            <Eye className="h-5 w-5 text-brand-primary" />
            <h3 className="font-medium text-brand-dark dark:text-white">EN 166</h3>
          </div>

          {/* Simplified layout: only Frame and Lens marks */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="min-w-0">
              <div className="text-sm font-semibold text-brand-dark dark:text-white mb-1">{t('productPage.frame') || 'Frame'}</div>
              <div className="text-base text-brand-dark dark:text-white font-mono tracking-tight whitespace-nowrap overflow-x-auto max-w-full">
                {en166.frame_mark || '-'}
              </div>
            </div>
            <div className="min-w-0">
              <div className="text-sm font-semibold text-brand-dark dark:text-white mb-1">{t('productPage.lens') || 'Lens'}</div>
              <div className="text-base text-brand-dark dark:text-white font-mono tracking-tight whitespace-nowrap overflow-x-auto max-w-full">
                {en166.lens_mark || '-'}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Other standards (EN 170, GS ET-29, EN 169, EN 172, EN 175) in a single compact block */}
      {(otherStandards.length > 0) && (
        <div className="group relative overflow-hidden rounded-lg border bg-white dark:bg-black/50 shadow-sm transition-all duration-300 hover:shadow-md border-brand-primary/10 dark:border-brand-primary/20 backdrop-blur-sm p-4">
          <div className="space-y-3">
            {otherStandards.map((s) => (
              <div key={s.code} className="flex items-center gap-3">
                <Shield className="h-5 w-5 text-brand-primary" />
                <div className="font-medium text-brand-dark dark:text-white min-w-[90px] md:min-w-[120px]">{s.code}</div>
                <div className="text-sm md:text-base font-semibold text-brand-dark dark:text-white">{t(s.labelKey)}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}


