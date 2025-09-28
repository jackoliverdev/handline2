"use client";

import { useLanguage } from "@/lib/context/language-context";
import { Product } from "@/lib/products-service";
import { Badge } from "@/components/ui/badge";
import { SafetyStandardsDisplay } from "@/components/website/products/safety-standards-display";
import { Shield } from "lucide-react";

export function ArmStandards({ product }: { product: Product }) {
  const { t } = useLanguage();
  const safety: any = (product as any).safety || {};
  const has21420 = Boolean(safety?.en_iso_21420);
  // Avoid duplicating EN ISO 21420 in the generic safety block
  const filteredSafety = { ...safety } as any;
  if (filteredSafety.en_iso_21420) {
    delete filteredSafety.en_iso_21420;
  }

  return (
    <div className="space-y-4">
      {/* Title rendered by ProductDetail once for all standards. */}
      {has21420 && (
        <div className="group relative overflow-hidden rounded-lg border bg-white dark:bg-black/50 shadow-sm transition-all duration-300 hover:shadow-md border-brand-primary/10 dark:border-brand-primary/20 backdrop-blur-sm p-4">
          <div className="flex items-center gap-3 md:gap-4 flex-wrap">
            <Shield className="h-5 w-5 text-brand-primary" />
            <h3 className="font-medium text-brand-dark dark:text-white">{t('productPage.enIso21420') || 'EN ISO 21420'}</h3>
            <span className="text-sm md:text-base font-semibold text-brand-dark dark:text-white">{t('productPage.stdLabel.en_iso_21420') || 'General requirements'}</span>
          </div>
        </div>
      )}

      {/* Reuse existing gloves safety display for EN388/EN407/EN511 */}
      {product.safety && (
        <SafetyStandardsDisplay safety={filteredSafety as any} hideTitle />
      )}
    </div>
  );
}


