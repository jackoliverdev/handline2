"use client";

import { Product } from "@/lib/products-service";
import { useLanguage } from "@/lib/context/language-context";

export function FootwearComfortFeatures({ product }: { product: Product }) {
  const { t, language } = useLanguage();
  const items = (product as any).footwear_comfort_features_locales?.[language]
    || (product as any).footwear_comfort_features_locales?.en || [];
  if (!Array.isArray(items) || items.length === 0) return null;
  return (
    <div className="group relative overflow-hidden rounded-lg border bg-white dark:bg-black/50 shadow-sm transition-all duration-300 hover:shadow-md border-brand-primary/10 dark:border-brand-primary/20 backdrop-blur-sm p-4">
      <h3 className="font-medium text-brand-dark dark:text-white mb-2">{t('productPage.comfortFeatures')}</h3>
      <ul className="list-disc list-inside space-y-1 text-brand-secondary dark:text-gray-300">
        {items.map((it: string, i: number) => (
          <li key={i}>{it}</li>
        ))}
      </ul>
    </div>
  );
}


