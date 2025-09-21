"use client";

import { Product } from "@/lib/products-service";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/lib/context/language-context";

export function EyeFaceSpecs({ product }: { product: Product }) {
  const { t, language } = useLanguage();
  const attrs: any = (product as any).eye_face_attributes || {};
  const std: any = (product as any).eye_face_standards || {};

  const materials = product.materials_locales?.[language] || [];
  const opticalClass = std?.en166?.optical_class;
  const mech = std?.en166?.mechanical_strength;

  const stdChips: string[] = [];
  if (std?.en166) stdChips.push('EN 166');
  if (std?.en169) stdChips.push('EN 169');
  if (std?.en170) stdChips.push('EN 170');
  if (std?.en172) stdChips.push('EN 172');
  if (std?.gs_et_29) stdChips.push('GS-ET 29');

  const protChips: string[] = [];
  if (attrs?.has_ir) protChips.push('IR');
  if (attrs?.has_uv) protChips.push(attrs?.uv_code ? attrs.uv_code : 'UV');
  if (attrs?.has_arc) protChips.push('Arc');

  return (
    <div className="space-y-5">
      {/* Row 1: Materials | Optical class | Mechanical strength */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="group relative overflow-hidden rounded-lg border bg-white dark:bg-black/50 shadow-sm transition-all duration-300 hover:shadow-md border-brand-primary/10 dark:border-brand-primary/20 backdrop-blur-sm p-4">
          <h4 className="font-medium text-brand-dark dark:text-white mb-2">{t('productPage.materials')}</h4>
          <div className="flex flex-wrap gap-1.5">
            {(materials || []).length > 0 ? (
              materials.map((m, idx) => (
                <Badge key={idx} variant="outline" className="bg-brand-primary/5 border-brand-primary/20">{m}</Badge>
              ))
            ) : (
              <span>-</span>
            )}
          </div>
        </div>
        <div className="group relative overflow-hidden rounded-lg border bg-white dark:bg-black/50 shadow-sm transition-all duration-300 hover:shadow-md border-brand-primary/10 dark:border-brand-primary/20 backdrop-blur-sm p-4">
          <h4 className="font-medium text-brand-dark dark:text-white mb-2">Optical class</h4>
          <p className="text-brand-dark dark:text-white">{opticalClass ?? '-'}</p>
        </div>
        <div className="group relative overflow-hidden rounded-lg border bg-white dark:bg-black/50 shadow-sm transition-all duration-300 hover:shadow-md border-brand-primary/10 dark:border-brand-primary/20 backdrop-blur-sm p-4">
          <h4 className="font-medium text-brand-dark dark:text-white mb-2">Mechanical</h4>
          <p className="text-brand-dark dark:text-white">{mech ?? '-'}</p>
        </div>
      </div>

      {/* Row 2: CE | Standards | Protection */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="group relative overflow-hidden rounded-lg border bg-white dark:bg-black/50 shadow-sm transition-all duration-300 hover:shadow-md border-brand-primary/10 dark:border-brand-primary/20 backdrop-blur-sm p-4">
          <h4 className="font-medium text-brand-dark dark:text-white mb-2">CE</h4>
          <p className="text-brand-dark dark:text-white">{product.ce_category || '-'}</p>
        </div>
        <div className="group relative overflow-hidden rounded-lg border bg-white dark:bg-black/50 shadow-sm transition-all duration-300 hover:shadow-md border-brand-primary/10 dark:border-brand-primary/20 backdrop-blur-sm p-4">
          <h4 className="font-medium text-brand-dark dark:text-white mb-2">Standards</h4>
          <div className="flex flex-wrap gap-1.5">
            {stdChips.length > 0 ? stdChips.map((c, idx) => (
              <span key={idx} className="bg-white dark:bg-black/40 text-brand-dark dark:text-white border border-brand-primary/20 rounded px-2 py-0.5 text-xs">{c}</span>
            )) : <span>-</span>}
          </div>
        </div>
        <div className="group relative overflow-hidden rounded-lg border bg-white dark:bg-black/50 shadow-sm transition-all duration-300 hover:shadow-md border-brand-primary/10 dark:border-brand-primary/20 backdrop-blur-sm p-4">
          <h4 className="font-medium text-brand-dark dark:text-white mb-2">{t('productPage.attributes')}</h4>
          <div className="flex flex-wrap gap-1.5">
            {protChips.length > 0 ? protChips.map((c, idx) => (
              <span key={idx} className="bg-white dark:bg-black/40 text-brand-dark dark:text-white border border-brand-primary/20 rounded px-2 py-0.5 text-xs">{c}</span>
            )) : <span>-</span>}
          </div>
        </div>
      </div>
    </div>
  );
}


