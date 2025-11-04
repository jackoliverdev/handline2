"use client";

import { Product } from "@/lib/products-service";
import { ProductGrid } from "@/components/website/products/product-grid";
import { useMemo, useState } from "react";
import { SnrFilter } from "@/components/website/products/filters/hearing/SnrFilter";
import { SnrFilterMobile } from "@/components/website/products/filters/hearing/SnrFilterMobile";
import { En352PartFilter } from "@/components/website/products/filters/hearing/En352PartFilter";
import { En352PartFilterMobile } from "@/components/website/products/filters/hearing/En352PartFilterMobile";
import { ReusableFilter } from "@/components/website/products/filters/hearing/ReusableFilter";
import { ReusableFilterMobile } from "@/components/website/products/filters/hearing/ReusableFilterMobile";
import { MountTypeFilter } from "@/components/website/products/filters/hearing/MountTypeFilter";
import { MountTypeFilterMobile } from "@/components/website/products/filters/hearing/MountTypeFilterMobile";
import { BluetoothFilter } from "@/components/website/products/filters/hearing/BluetoothFilter";
import { BluetoothFilterMobile } from "@/components/website/products/filters/hearing/BluetoothFilterMobile";

// Hearing filters will be added later into components/website/products/filters/hearing/*
// For now, wire state and placeholders to keep the structure consistent.

interface HearingProductsSectionProps {
  products: Product[];
}

export function HearingProductsSection({ products }: HearingProductsSectionProps) {
  const hearingProducts = useMemo(() => {
    return products.filter((p) => {
      const cat = (p.category || '').toLowerCase();
      const sub = (p.sub_category || '').toLowerCase();
      const itCat = (p.category_locales?.it || '').toLowerCase();
      const itSub = (p.sub_category_locales?.it || '').toLowerCase();
      const isHearing = cat.includes('hearing') || sub.includes('ear plug') || sub.includes('defender') || itCat.includes('uditiv') || itSub.includes('orecch') || itSub.includes('rumore');
      return isHearing;
    });
  }, [products]);

  // Filter states (to be connected to UI components)
  const [selectedSnrs, setSelectedSnrs] = useState<number[]>([]);
  const [selectedParts, setSelectedParts] = useState<string[]>([]);
  const [reusable, setReusable] = useState<boolean>(false);
  const [mountTypes, setMountTypes] = useState<string[]>([]);
  const [bluetooth, setBluetooth] = useState<boolean>(false);

  // Build options
  const snrOptions = useMemo(() => {
    const set = new Set<number>();
    hearingProducts.forEach((p: any) => { const v = p.hearing_standards?.en352?.snr_db; if (typeof v === 'number') set.add(v); });
    return Array.from(set).sort((a, b) => a - b);
  }, [hearingProducts]);
  const partOptions = useMemo(() => {
    const set = new Set<string>();
    hearingProducts.forEach((p: any) => { (p.hearing_standards?.en352?.parts || []).forEach((x: string) => x && set.add(x)); });
    return Array.from(set).sort();
  }, [hearingProducts]);
  const mountOptions = useMemo(() => {
    const set = new Set<string>();
    hearingProducts.forEach((p: any) => { const m = p.hearing_attributes?.mount; if (m) set.add(String(m)); });
    return Array.from(set).sort();
  }, [hearingProducts]);

  const extraFilters = (
    <>
      <SnrFilter options={snrOptions} selected={selectedSnrs} onToggle={(n) => setSelectedSnrs(prev => prev.includes(n) ? prev.filter(x => x !== n) : [...prev, n])} />
      <En352PartFilter options={partOptions} selected={selectedParts} onToggle={(s) => setSelectedParts(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s])} />
      <ReusableFilter value={reusable} onChange={setReusable} />
      <MountTypeFilter options={mountOptions} selected={mountTypes} onToggle={(s) => setMountTypes(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s])} />
      <BluetoothFilter value={bluetooth} onChange={setBluetooth} />
    </>
  );
  const extraFiltersMobile = (
    <>
      <SnrFilterMobile options={snrOptions} selected={selectedSnrs} onToggle={(n) => setSelectedSnrs(prev => prev.includes(n) ? prev.filter(x => x !== n) : [...prev, n])} />
      <En352PartFilterMobile options={partOptions} selected={selectedParts} onToggle={(s) => setSelectedParts(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s])} />
      <ReusableFilterMobile value={reusable} onChange={setReusable} />
      <MountTypeFilterMobile options={mountOptions} selected={mountTypes} onToggle={(s) => setMountTypes(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s])} />
      <BluetoothFilterMobile value={bluetooth} onChange={setBluetooth} />
    </>
  );

  const predicate = (p: Product) => {
    const hs: any = (p as any).hearing_standards;
    const ha: any = (p as any).hearing_attributes;
    const snr = hs?.en352?.snr_db as number | undefined;
    const parts: string[] = Array.isArray(hs?.en352?.parts) ? hs.en352.parts : [];
    const pReusable: boolean | undefined = typeof ha?.reusable === 'boolean' ? ha.reusable : undefined;
    const pMount: string | undefined = ha?.mount;
    const pBt: boolean | undefined = typeof ha?.bluetooth === 'boolean' ? ha.bluetooth : undefined;

    const snrOk = selectedSnrs.length === 0 ? true : (typeof snr === 'number' && selectedSnrs.includes(snr));
    const partOk = selectedParts.length === 0 ? true : parts.some((pt) => selectedParts.includes(pt));
    const reuseOk = !reusable ? true : (typeof pReusable === 'boolean' && pReusable === true);
    const mountOk = mountTypes.length === 0 ? true : (!!pMount && mountTypes.includes(pMount));
    const btOk = !bluetooth ? true : (typeof pBt === 'boolean' && pBt === true);
    return snrOk && partOk && reuseOk && mountOk && btOk;
  };

  return (
    <section id="products" className="py-10">
      <div className="container mx-auto px-4 sm:px-6">
        <ProductGrid
          products={hearingProducts}
          extraFiltersRender={extraFilters}
          extraFiltersRenderMobile={extraFiltersMobile}
          extraFilterPredicate={predicate}
          hideDefaultFilters={true}
          hideMainCategoryFilter
        />
      </div>
    </section>
  );
}


