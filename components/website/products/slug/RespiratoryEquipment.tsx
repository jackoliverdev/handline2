"use client";

import { useLanguage } from "@/lib/context/language-context";
import { Product } from "@/lib/products-service";
import { Settings } from "lucide-react";

export function RespiratoryEquipment({ product }: { product: Product }) {
  const { t, language } = useLanguage();
  const locales: any = (product as any).respiratory_equipment_locales || {};
  const items: string[] = Array.isArray(locales?.[language]) ? locales[language] : Array.isArray(locales?.en) ? locales.en : [];
  if (!Array.isArray(items) || items.length === 0) return null;
  return (
    <div className="group relative overflow-hidden rounded-lg border bg-white dark:bg-black/50 shadow-sm transition-all duration-300 hover:shadow-md border-brand-primary/10 dark:border-brand-primary/20 backdrop-blur-sm p-4">
      <div className="flex items-center gap-2 mb-2">
        <Settings className="h-5 w-5 text-brand-primary" />
        <h3 className="font-medium text-brand-dark dark:text-white">{t('productPage.equipment')}</h3>
      </div>
      <ul className="list-disc list-inside space-y-1 text-brand-secondary dark:text-gray-300">
        {items.map((it, idx) => (<li key={idx}>{it}</li>))}
      </ul>
    </div>
  );
}
