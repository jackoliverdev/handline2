"use client";

import { useMemo, useState } from "react";
import { Product } from "@/lib/products-service";
import { ProductGrid } from "@/components/website/products/product-grid";

// Head filters (desktop/mobile)
import { BrimLengthFilter } from "@/components/website/products/filters/head/BrimLengthFilter";
import { BrimLengthFilterMobile } from "@/components/website/products/filters/head/BrimLengthFilterMobile";
import { LowTemperatureFilter } from "@/components/website/products/filters/head/LowTemperatureFilter";
import { LowTemperatureFilterMobile } from "@/components/website/products/filters/head/LowTemperatureFilterMobile";
import { ElectricalInsulationFilter } from "@/components/website/products/filters/head/ElectricalInsulationFilter";
import { ElectricalInsulationFilterMobile } from "@/components/website/products/filters/head/ElectricalInsulationFilterMobile";
import { MoltenMetalFilter } from "@/components/website/products/filters/head/MoltenMetalFilter";
import { MoltenMetalFilterMobile } from "@/components/website/products/filters/head/MoltenMetalFilterMobile";
import { VentilationFilter } from "@/components/website/products/filters/head/VentilationFilter";
import { VentilationFilterMobile } from "@/components/website/products/filters/head/VentilationFilterMobile";
import { EnStandardFilter } from "@/components/website/products/filters/head/EnStandardFilter";
import { EnStandardFilterMobile } from "@/components/website/products/filters/head/EnStandardFilterMobile";
import { FilterSection } from "@/components/website/products/filters/FilterSection";

export function HeadProductsSection({ products }: { products: Product[] }) {
  const headProducts = useMemo(() => {
    return products.filter((p) => {
      const cat = (p.category || '').toLowerCase();
      const sub = (p.sub_category || '').toLowerCase();
      const itCat = (p.category_locales?.it || '').toLowerCase();
      const itSub = (p.sub_category_locales?.it || '').toLowerCase();
      return cat.includes('head') || sub.includes('helmet') || sub.includes('bump') || itCat.includes('testa') || itSub.includes('caschi') || itSub.includes('berretti');
    });
  }, [products]);

  // Build option sets
  const brimOptions = useMemo(() => {
    const s = new Set<string>();
    (headProducts as any[]).forEach((p: any) => { const v = p.head_attributes?.brim_length; if (v) s.add(String(v)); });
    return Array.from(s).sort();
  }, [headProducts]);

  // UI state
  const [selectedBrims, setSelectedBrims] = useState<string[]>([]);
  const [ltOnly, setLtOnly] = useState<boolean>(false);
  const [e50365, setE50365] = useState<boolean>(false);
  const [mmOnly, setMmOnly] = useState<boolean>(false);
  const [ventOnly, setVentOnly] = useState<boolean>(false);
  const [stds, setStds] = useState<string[]>([]); // EN 397 / EN 50365 / EN 12492 / EN 812

  const extraFilters = (
    <>
      {/* EN Standards directly under Sub-Category */}
      <EnStandardFilter selected={stds} onToggle={(opt) => setStds(prev => prev.includes(opt) ? prev.filter(x => x !== opt) : [...prev, opt])} />
      <FilterSection title="Features" defaultExpanded={false}>
        <BrimLengthFilter options={brimOptions} selected={selectedBrims} onToggle={(opt) => setSelectedBrims(prev => prev.includes(opt) ? prev.filter(x => x !== opt) : [...prev, opt])} />
        <LowTemperatureFilter value={ltOnly} onChange={setLtOnly} withDivider={false} />
        <ElectricalInsulationFilter value={e50365} onChange={setE50365} withDivider={false} />
        <MoltenMetalFilter value={mmOnly} onChange={setMmOnly} withDivider={false} />
        <VentilationFilter value={ventOnly} onChange={setVentOnly} withDivider={false} />
      </FilterSection>
    </>
  );

  const extraFiltersMobile = (
    <>
      {/* EN Standards directly under Sub-Category (mobile) */}
      <EnStandardFilterMobile selected={stds} onToggle={(opt) => setStds(prev => prev.includes(opt) ? prev.filter(x => x !== opt) : [...prev, opt])} />
      <FilterSection title="Features" defaultExpanded={false} variant="mobile">
        <BrimLengthFilterMobile options={brimOptions} selected={selectedBrims} onToggle={(opt) => setSelectedBrims(prev => prev.includes(opt) ? prev.filter(x => x !== opt) : [...prev, opt])} />
        <LowTemperatureFilterMobile value={ltOnly} onChange={setLtOnly} />
        <ElectricalInsulationFilterMobile value={e50365} onChange={setE50365} />
        <MoltenMetalFilterMobile value={mmOnly} onChange={setMmOnly} />
        <VentilationFilterMobile value={ventOnly} onChange={setVentOnly} />
      </FilterSection>
    </>
  );

  const predicate = (p: Product) => {
    const hst: any = (p as any).head_standards || {};
    const hat: any = (p as any).head_attributes || {};
    const brim = hat?.brim_length as string | undefined;
    const lt = hst?.en397?.optional?.low_temperature;
    const mm = hst?.en397?.optional?.molten_metal as boolean | undefined;
    const en50365 = hst?.en50365 as boolean | undefined;
    const vent = hat?.ventilation as boolean | undefined;

    const stdFlags: string[] = [];
    if (hst?.en397?.present) stdFlags.push('EN 397');
    if (hst?.en50365) stdFlags.push('EN 50365');
    if (hst?.en12492) stdFlags.push('EN 12492');
    if (hst?.en812) stdFlags.push('EN 812');

    const brimOk = selectedBrims.length === 0 ? true : (!!brim && selectedBrims.includes(brim));
    const ltOk = ltOnly ? !!lt : true;
    const eOk = e50365 ? !!(en50365) : true;
    const mmOk = mmOnly ? !!mm : true;
    const vOk = ventOnly ? !!vent : true;
    const stdOk = stds.length === 0 ? true : stds.some(s => stdFlags.includes(s));
    return brimOk && ltOk && eOk && mmOk && vOk && stdOk;
  };

  return (
    <section id="products" className="py-10">
      <div className="container mx-auto px-4 sm:px-6">
        <ProductGrid
          products={headProducts}
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


