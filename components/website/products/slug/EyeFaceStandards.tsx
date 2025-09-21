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
  const additional: StdItem[] = [];
  if (std?.en169) additional.push({ code: "EN 169", labelKey: 'productPage.stdLabel.en169' });
  if (std?.en170) additional.push({ code: "EN 170", labelKey: 'productPage.stdLabel.en170' });
  if (std?.en172) additional.push({ code: "EN 172", labelKey: 'productPage.stdLabel.en172' });
  if (std?.en175) additional.push({ code: "EN 175", labelKey: 'productPage.stdLabel.en175' });
  if (std?.gs_et_29) additional.push({ code: "GS-ET 29", labelKey: 'productPage.stdLabel.gset29' });

  return (
    <div className="space-y-4">
      {/* EN 166 block */}
      {hasEn166 && (
        <div className="group relative overflow-hidden rounded-lg border bg-white dark:bg-black/50 shadow-sm transition-all duration-300 hover:shadow-md border-brand-primary/10 dark:border-brand-primary/20 backdrop-blur-sm p-4">
          <div className="flex items-center gap-3 mb-3">
            <Eye className="h-5 w-5 text-brand-primary" />
            <h3 className="font-medium text-brand-dark dark:text-white">EN 166</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
            <div className="md:col-span-2">
              <div className="text-xs text-brand-secondary dark:text-gray-400 mb-1">{t('productPage.opticalClass')}</div>
              <div className="text-brand-dark dark:text-white font-semibold">{en166.optical_class ?? '-'}</div>
            </div>
            <div className="md:col-span-2">
              <div className="text-xs text-brand-secondary dark:text-gray-400 mb-1">{t('productPage.mechanical')}</div>
              <div className="text-brand-dark dark:text-white font-semibold">{en166.mechanical_strength ?? '-'}</div>
            </div>
            <div className="md:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="min-w-0">
                <div className="text-xs text-brand-secondary dark:text-gray-400 mb-1">{t('productPage.frameMark') || 'Frame mark'}</div>
                <div className="text-sm bg-white dark:bg-black/40 border border-brand-primary/20 rounded px-3 py-1.5 text-brand-dark dark:text-white font-mono tracking-tight whitespace-nowrap inline-flex items-center overflow-x-auto max-w-full">
                  {en166.frame_mark || '-'}
                </div>
              </div>
              <div className="min-w-0">
                <div className="text-xs text-brand-secondary dark:text-gray-400 mb-1">{t('productPage.lensMark') || 'Lens mark'}</div>
                <div className="text-sm bg-white dark:bg-black/40 border border-brand-primary/20 rounded px-3 py-1.5 text-brand-dark dark:text-white font-mono tracking-tight whitespace-nowrap inline-flex items-center overflow-x-auto max-w-full">
                  {en166.lens_mark || '-'}
                </div>
              </div>
            </div>
          </div>

          {(en166.additional_marking) && (
            <div className="mt-4">
              <div className="text-xs text-brand-secondary dark:text-gray-400 mb-1">{t('productPage.additionalMarking') || 'Additional marking'}</div>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="bg-brand-primary/5 border-brand-primary/20">{String(en166.additional_marking)}</Badge>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Additional standards */}
      {(additional.length > 0) && (
        <div className="group relative overflow-hidden rounded-lg border bg-white dark:bg-black/50 shadow-sm transition-all duration-300 hover:shadow-md border-brand-primary/10 dark:border-brand-primary/20 backdrop-blur-sm p-4">
          <div className="flex items-center gap-3 mb-3">
            <Shield className="h-5 w-5 text-brand-primary" />
            <h3 className="font-medium text-brand-dark dark:text-white">{t('productPage.standards')}</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {additional.map((s) => (
              <div key={s.code} className="flex items-center justify-between gap-3 border border-brand-primary/20 rounded px-3 py-2 bg-white dark:bg-black/40">
                <Badge variant="outline" className="bg-brand-primary/5 border-brand-primary/20 text-xs">{s.code}</Badge>
                <div className="text-xs text-brand-secondary dark:text-gray-300">{t(s.labelKey) || ''}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}


