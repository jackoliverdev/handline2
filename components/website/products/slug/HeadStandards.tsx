"use client";

import { useLanguage } from "@/lib/context/language-context";
import { Product } from "@/lib/products-service";
import { Badge } from "@/components/ui/badge";
import { Shield, HardHat } from "lucide-react";

export function HeadStandards({ product }: { product: Product }) {
  const { t } = useLanguage();
  const std: any = (product as any).head_standards || {};

  const hasEN397 = Boolean(std?.en397?.present || std?.en397 === true);
  const en397 = std?.en397 || {};
  const opt = en397?.optional || {};

  const additional: Array<{ code: string; labelKey: string }> = [];
  if (std?.en50365) additional.push({ code: 'EN 50365', labelKey: 'productPage.stdLabel.en50365' });
  if (std?.en12492) additional.push({ code: 'EN 12492', labelKey: 'productPage.stdLabel.en12492' });
  if (std?.en812) additional.push({ code: 'EN 812', labelKey: 'productPage.stdLabel.en812' });

  const optChips: string[] = [];
  if (opt?.low_temperature) optChips.push(String(opt.low_temperature));
  if (opt?.molten_metal) optChips.push('MM');
  if (opt?.lateral_deformation) optChips.push(t('productPage.lateralDeformation') || 'Lateral deformation');

  return (
    <div className="space-y-4">
      {/* EN 397 core */}
      {hasEN397 && (
        <div className="group relative overflow-hidden rounded-lg border bg-white dark:bg-black/50 shadow-sm transition-all duration-300 hover:shadow-md border-brand-primary/10 dark:border-brand-primary/20 backdrop-blur-sm p-4">
          <div className="flex items-center gap-3 mb-3">
            <HardHat className="h-5 w-5 text-brand-primary" />
            <h3 className="font-medium text-brand-dark dark:text-white">EN 397</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {optChips.length > 0 ? (
              optChips.map((c) => (
                <Badge key={c} variant="outline" className="bg-brand-primary/5 border-brand-primary/20">{c}</Badge>
              ))
            ) : (
              <span className="text-sm text-brand-secondary dark:text-gray-300">-</span>
            )}
          </div>
        </div>
      )}

      {/* Additional head standards */}
      {additional.length > 0 && (
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


