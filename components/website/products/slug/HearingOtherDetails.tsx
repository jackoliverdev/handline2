"use client";

import { useLanguage } from "@/lib/context/language-context";
import { Product } from "@/lib/products-service";
import { ListChecks, Users, Package } from "lucide-react";

export function HearingOtherDetails({ product }: { product: Product }) {
  const { t, language } = useLanguage();
  const locales: any = (product as any).hearing_other_details_locales || {};
  const items: string[] = Array.isArray(locales?.[language]) ? locales[language] : Array.isArray(locales?.en) ? locales.en : [];
  
  // Get compatible with and accessories from hearing_attributes (locale-aware)
  const ha: any = (product as any).hearing_attributes || {};
  const compatibleLocales: any = ha?.compatible_with_locales || {};
  const compatibleWith: string[] = Array.isArray(compatibleLocales?.[language]) 
    ? compatibleLocales[language] 
    : (Array.isArray(compatibleLocales?.en) ? compatibleLocales.en : []);
  
  const accessoriesLocales: any = ha?.accessories_locales || {};
  const accessories: string[] = Array.isArray(accessoriesLocales?.[language]) 
    ? accessoriesLocales[language] 
    : (Array.isArray(accessoriesLocales?.en) ? accessoriesLocales.en : []);

  // Only show if there's content
  const hasOtherDetails = items.length > 0;
  const hasCompatibleWith = compatibleWith.length > 0;
  const hasAccessories = accessories.length > 0;

  if (!hasOtherDetails && !hasCompatibleWith && !hasAccessories) return null;

  return (
    <>
      {/* Other Details */}
      {hasOtherDetails && (
        <div className="group relative overflow-hidden rounded-lg border bg-white dark:bg-black/50 shadow-sm transition-all duration-300 hover:shadow-md border-brand-primary/10 dark:border-brand-primary/20 backdrop-blur-sm p-4">
          <div className="flex items-center gap-2 mb-2">
            <ListChecks className="h-5 w-5 text-brand-primary" />
            <h3 className="font-medium text-brand-dark dark:text-white">{t('productPage.otherDetails')}</h3>
          </div>
          <ul className="list-disc list-inside space-y-1 text-brand-secondary dark:text-gray-300">
            {items.map((it, idx) => (<li key={idx}>{it}</li>))}
          </ul>
        </div>
      )}

      {/* Compatible With */}
      {hasCompatibleWith && (
        <div className="group relative overflow-hidden rounded-lg border bg-white dark:bg-black/50 shadow-sm transition-all duration-300 hover:shadow-md border-brand-primary/10 dark:border-brand-primary/20 backdrop-blur-sm p-4">
          <div className="flex items-center gap-2 mb-2">
            <Users className="h-5 w-5 text-brand-primary" />
            <h3 className="font-medium text-brand-dark dark:text-white">
              {t('productPage.compatibleWith') || 'Compatible With'}
            </h3>
          </div>
          <ul className="list-disc list-inside space-y-1 text-brand-secondary dark:text-gray-300">
            {compatibleWith.map((item, idx) => (<li key={idx}>{item}</li>))}
          </ul>
        </div>
      )}

      {/* Accessories */}
      {hasAccessories && (
        <div className="group relative overflow-hidden rounded-lg border bg-white dark:bg-black/50 shadow-sm transition-all duration-300 hover:shadow-md border-brand-primary/10 dark:border-brand-primary/20 backdrop-blur-sm p-4">
          <div className="flex items-center gap-2 mb-2">
            <Package className="h-5 w-5 text-brand-primary" />
            <h3 className="font-medium text-brand-dark dark:text-white">
              Accessories
            </h3>
          </div>
          <ul className="list-disc list-inside space-y-1 text-brand-secondary dark:text-gray-300">
            {accessories.map((item, idx) => (<li key={idx}>{item}</li>))}
          </ul>
        </div>
      )}
    </>
  );
}
