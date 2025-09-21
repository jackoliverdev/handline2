"use client";

import { Product } from "@/lib/products-service";
import { useLanguage } from "@/lib/context/language-context";

export function HearingSpecs({ product }: { product: Product }) {
  const { t, language } = useLanguage();
  const materials = product.materials_locales?.[language] || product.materials_locales?.en || [];
  const size = product.size_locales?.[language] || product.size_locales?.en || '';
  const hs: any = (product as any).hearing_standards;
  const ha: any = (product as any).hearing_attributes;
  const snr: number | null = hs?.en352?.snr_db ?? null;
  const parts: string[] = Array.isArray(hs?.en352?.parts) ? hs.en352.parts : [];
  const reusable = typeof ha?.reusable === 'boolean' ? (ha.reusable ? 'R' : 'NR') : null;
  const mount = ha?.mount || null;
  const bt = typeof ha?.bluetooth === 'boolean' ? ha.bluetooth : null;

  const Tile = ({ title, children }: { title: string; children: any }) => (
    <div className="rounded-xl border border-brand-primary/10 dark:border-brand-primary/20 bg-white dark:bg-black/50 p-4 shadow-sm">
      <p className="text-xs text-brand-secondary dark:text-gray-400 mb-1">{title}</p>
      <div className="text-sm font-medium text-brand-dark dark:text-white">{children}</div>
    </div>
  );

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <Tile title={t('productPage.materials')}>
          {materials && materials.length ? materials.join(', ') : '-'}
        </Tile>
        <Tile title={t('productPage.productInfo.size')}>
          {size || '-'}
        </Tile>
        <Tile title="SNR">{snr ? `${snr} dB` : '-'}</Tile>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <Tile title="EN 352 parts">{parts.length ? parts.join(', ') : '-'}</Tile>
        <Tile title={t('products.filters.reusable') || 'Reusable'}>{reusable || '-'}</Tile>
        <Tile title={t('products.filters.mountType') || 'Mount type'}>{mount || '-'}</Tile>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <Tile title={t('products.filters.bluetooth') || 'Bluetooth'}>{bt === null ? '-' : (bt ? t('productPage.yes') || 'Yes' : t('productPage.no') || 'No')}</Tile>
        <Tile title={t('productPage.ceCategory')}>{product.ce_category || '-'}</Tile>
      </div>
    </div>
  );
}


