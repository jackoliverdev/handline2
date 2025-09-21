"use client";

import { Product } from "@/lib/products-service";
import { useLanguage } from "@/lib/context/language-context";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export function ClothingSpecs({ product }: { product: Product }) {
  const { t, language } = useLanguage();
  const materials = product.materials_locales?.[language] || product.materials_locales?.en || [];
  const size = product.size_locales?.[language] || product.size_locales?.en || null;
  const cs: any = (product as any).clothing_standards || {};
  const ca: any = (product as any).clothing_attributes || {};

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
    <TooltipProvider>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Row 1 */}
      <div className="bg-white dark:bg-black/30 rounded-lg p-4 border border-brand-primary/10 dark:border-brand-primary/20">
        <h4 className="text-sm font-semibold text-brand-dark dark:text-white mb-2">{t('productPage.materials')}</h4>
        <div className="text-sm text-brand-secondary dark:text-gray-300">
          {Array.isArray(materials) && materials.length > 0 ? (
            <div className="text-center">
              <div className="text-brand-dark dark:text-white font-medium text-md">{materials[0]}</div>
              {materials.length > 1 && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button type="button" className="text-sm text-brand-secondary dark:text-gray-300 cursor-help inline-block">
                      +{materials.length - 1} more
                    </button>
                  </TooltipTrigger>
                  <TooltipContent className="bg-white dark:bg-black/90 text-brand-dark dark:text-white shadow-lg border border-brand-primary/20 max-w-sm">
                    <div className="text-sm">
                      {materials.slice(1).map((m: string, i: number) => (
                        <div key={i} className="leading-relaxed">{m}</div>
                      ))}
                    </div>
                  </TooltipContent>
                </Tooltip>
              )}
            </div>
          ) : (
            <div>-</div>
          )}
        </div>
      </div>
      <div className="bg-white dark:bg-black/30 rounded-lg p-4 border border-brand-primary/10 dark:border-brand-primary/20">
        <h4 className="text-sm font-semibold text-brand-dark dark:text-white mb-2">{t('productPage.size')}</h4>
        <div className="text-sm text-brand-secondary dark:text-gray-300">{size || '-'}</div>
      </div>
      <div className="bg-white dark:bg-black/30 rounded-lg p-4 border border-brand-primary/10 dark:border-brand-primary/20">
        <h4 className="text-sm font-semibold text-brand-dark dark:text-white mb-2">{t('productPage.fit')}</h4>
        <div className="text-sm text-brand-secondary dark:text-gray-300">{ca?.fit || '-'}</div>
      </div>

      {/* Row 2 */}
      <div className="bg-white dark:bg-black/30 rounded-lg p-4 border border-brand-primary/10 dark:border-brand-primary/20">
        <h4 className="text-sm font-semibold text-brand-dark dark:text-white mb-2">{t('productPage.gender')}</h4>
        <div className="text-sm text-brand-secondary dark:text-gray-300">{ca?.gender || '-'}</div>
      </div>
      <div className="bg-white dark:bg-black/30 rounded-lg p-4 border border-brand-primary/10 dark:border-brand-primary/20">
        <h4 className="text-sm font-semibold text-brand-dark dark:text-white mb-2">{t('productPage.colours')}</h4>
        <div className="flex flex-wrap gap-1.5">
          {Array.isArray(ca?.colours) && ca.colours.length > 0 ? ca.colours.map((c: string, idx: number) => (
            <span key={idx} className="text-xs px-2 py-0.5 rounded border border-brand-primary/20 bg-white dark:bg-black/40">{c}</span>
          )) : <span className="text-sm text-brand-secondary dark:text-gray-300">-</span>}
        </div>
      </div>
      <div className="bg-white dark:bg-black/30 rounded-lg p-4 border border-brand-primary/10 dark:border-brand-primary/20">
        <h4 className="text-sm font-semibold text-brand-dark dark:text-white mb-2">{t('productPage.uvProtection')}</h4>
        <div className="text-sm text-brand-secondary dark:text-gray-300">{ca?.uv_protection ? 'UV 801' : '-'}</div>
      </div>

      {/* Row 3 */}
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
    </TooltipProvider>
  );
}


