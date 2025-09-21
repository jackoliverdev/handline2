"use client";

import { Product } from "@/lib/products-service";
import { useLanguage } from "@/lib/context/language-context";

export function ClothingSpecs({ product }: { product: Product }) {
  const { t, language } = useLanguage();
  const materials = product.materials_locales?.[language] || product.materials_locales?.en || [];
  const size = product.size_locales?.[language] || product.size_locales?.en || null;
  const cs: any = (product as any).clothing_standards || {};

  const hiVis = cs?.en_iso_20471?.class as number | undefined;
  const has11612 = !!cs?.en_iso_11612;
  const en11611 = cs?.en_iso_11611?.class as number | undefined;
  const arc = cs?.iec_61482_2?.class as number | undefined;
  const antistatic = !!cs?.en_1149_5;
  const type13034 = cs?.en_13034 as string | undefined;

  const rightChips: string[] = [];
  if (typeof hiVis === 'number') rightChips.push(`EN ISO 20471 C${hiVis}`);
  if (has11612) {
    const v = cs.en_iso_11612;
    const parts: string[] = [];
    if (v?.a1) parts.push('A1');
    if (v?.a2) parts.push('A2');
    if (typeof v?.b === 'number') parts.push(`B${v.b}`);
    if (typeof v?.c === 'number') parts.push(`C${v.c}`);
    if (typeof v?.d === 'number') parts.push(`D${v.d}`);
    if (typeof v?.e === 'number') parts.push(`E${v.e}`);
    if (typeof v?.f === 'number') parts.push(`F${v.f}`);
    if (parts.length) rightChips.push(`EN ISO 11612 ${parts.join('/')}`);
  }
  if (typeof en11611 === 'number') rightChips.push(`EN ISO 11611 C${en11611}`);
  if (typeof arc === 'number') rightChips.push(`IEC 61482-2 C${arc}`);
  if (antistatic) rightChips.push('EN 1149-5');
  if (type13034) rightChips.push(`EN 13034 ${type13034}`);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Row 1 */}
      <div className="bg-white dark:bg-black/30 rounded-lg p-4 border border-brand-primary/10 dark:border-brand-primary/20">
        <h4 className="text-sm font-semibold text-brand-dark dark:text-white mb-2">{t('productPage.materials')}</h4>
        <div className="text-sm text-brand-secondary dark:text-gray-300 space-y-1">
          {Array.isArray(materials) && materials.length > 0 ? materials.map((m: string, i: number) => (
            <div key={i}>{m}</div>
          )) : <div>-</div>}
        </div>
      </div>
      <div className="bg-white dark:bg-black/30 rounded-lg p-4 border border-brand-primary/10 dark:border-brand-primary/20">
        <h4 className="text-sm font-semibold text-brand-dark dark:text-white mb-2">{t('productPage.size')}</h4>
        <div className="text-sm text-brand-secondary dark:text-gray-300">{size || '-'}</div>
      </div>
      <div className="bg-white dark:bg-black/30 rounded-lg p-4 border border-brand-primary/10 dark:border-brand-primary/20">
        <h4 className="text-sm font-semibold text-brand-dark dark:text-white mb-2">{t('productPage.attributes')}</h4>
        <div className="flex flex-wrap gap-1.5">
          {(product as any).clothing_attributes?.fit && (
            <span className="text-xs px-2 py-0.5 rounded border border-brand-primary/20 bg-white dark:bg-black/40">{(product as any).clothing_attributes.fit}</span>
          )}
          {(product as any).clothing_attributes?.gender && (
            <span className="text-xs px-2 py-0.5 rounded border border-brand-primary/20 bg-white dark:bg-black/40">{(product as any).clothing_attributes.gender}</span>
          )}
          {Array.isArray((product as any).clothing_attributes?.colours) && (product as any).clothing_attributes.colours.map((c: string, i: number) => (
            <span key={i} className="text-xs px-2 py-0.5 rounded border border-brand-primary/20 bg-white dark:bg-black/40">{c}</span>
          ))}
          {(product as any).clothing_attributes?.uv_protection && (
            <span className="text-xs px-2 py-0.5 rounded border border-brand-primary/20 bg-white dark:bg-black/40">UV 801</span>
          )}
        </div>
      </div>

      {/* Row 2 */}
      <div className="bg-white dark:bg-black/30 rounded-lg p-4 border border-brand-primary/10 dark:border-brand-primary/20">
        <h4 className="text-sm font-semibold text-brand-dark dark:text-white mb-2">{t('productPage.ceCategory')}</h4>
        <div className="text-sm text-brand-secondary dark:text-gray-300">{product.ce_category || '-'}</div>
      </div>
      <div className="md:col-span-2 bg-white dark:bg-black/30 rounded-lg p-4 border border-brand-primary/10 dark:border-brand-primary/20">
        <h4 className="text-sm font-semibold text-brand-dark dark:text-white mb-2">EN</h4>
        <div className="flex flex-wrap gap-1.5">
          {rightChips.length > 0 ? rightChips.map((c, idx) => (
            <span key={idx} className="text-xs px-2 py-0.5 rounded border border-brand-primary/20 bg-white dark:bg-black/40">{c}</span>
          )) : <span className="text-sm text-brand-secondary dark:text-gray-300">-</span>}
        </div>
      </div>
    </div>
  );
}


