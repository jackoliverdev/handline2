"use client";

import { Product } from "@/lib/products-service";
import { ProductGrid } from "@/components/website/products/product-grid";
import { useMemo, useState } from "react";
import { ArmLengthFilter } from "@/components/website/products/filters/arms/ArmLengthFilter";
import { ArmLengthFilterMobile } from "@/components/website/products/filters/arms/ArmLengthFilterMobile";
import { ThumbLoopFilter } from "@/components/website/products/filters/arms/ThumbLoopFilter";
import { ThumbLoopFilterMobile } from "@/components/website/products/filters/arms/ThumbLoopFilterMobile";
import { ClosureTypeFilter } from "@/components/website/products/filters/arms/ClosureTypeFilter";
import { ClosureTypeFilterMobile } from "@/components/website/products/filters/arms/ClosureTypeFilterMobile";

interface ArmProductsSectionProps {
  products: Product[];
}

export function ArmProductsSection({ products }: ArmProductsSectionProps) {
  const armProducts = useMemo(() => {
    return products.filter((p) => {
      const cat = (p.category || '').toLowerCase();
      const sub = (p.sub_category || '').toLowerCase();
      return cat.includes('arm') || sub.includes('sleeve');
    });
  }, [products]);

  // Derive options
  const lengthOptions = useMemo(() => {
    const set = new Set<string>();
    armProducts.forEach((p) => {
      if (typeof p.length_cm === 'number') set.add(`${p.length_cm} cm`);
    });
    return Array.from(set).sort((a, b) => parseInt(a) - parseInt(b));
  }, [armProducts]);

  const closureOptions = useMemo(() => {
    const set = new Set<string>();
    armProducts.forEach((p: any) => {
      const closure = p.arm_attributes?.closure;
      if (closure) set.add(String(closure));
    });
    return Array.from(set).sort();
  }, [armProducts]);

  const [selectedLengths, setSelectedLengths] = useState<string[]>([]);
  const [selectedThumbLoop, setSelectedThumbLoop] = useState<boolean>(false);
  const [selectedClosures, setSelectedClosures] = useState<string[]>([]);

  // Inline simple filter UIs reusing same visual style as Swabs filters
  const extraFilters = (
    <>
      <ArmLengthFilter options={lengthOptions} selected={selectedLengths} onToggle={(opt) => setSelectedLengths(prev => prev.includes(opt) ? prev.filter(x => x !== opt) : [...prev, opt])} />
      <ThumbLoopFilter value={selectedThumbLoop} onChange={setSelectedThumbLoop} />
      <ClosureTypeFilter options={closureOptions} selected={selectedClosures} onToggle={(opt) => setSelectedClosures(prev => prev.includes(opt) ? prev.filter(x => x !== opt) : [...prev, opt])} />
    </>
  );

  const extraFiltersMobile = (
    <>
      <ArmLengthFilterMobile options={lengthOptions} selected={selectedLengths} onToggle={(opt) => setSelectedLengths(prev => prev.includes(opt) ? prev.filter(x => x !== opt) : [...prev, opt])} />
      <ThumbLoopFilterMobile value={selectedThumbLoop} onChange={setSelectedThumbLoop} />
      <ClosureTypeFilterMobile options={closureOptions} selected={selectedClosures} onToggle={(opt) => setSelectedClosures(prev => prev.includes(opt) ? prev.filter(x => x !== opt) : [...prev, opt])} />
    </>
  );

  const predicate = (p: Product) => {
    const lenLabel = typeof p.length_cm === 'number' ? `${p.length_cm} cm` : undefined;
    const lengthOk = selectedLengths.length === 0 ? true : (!!lenLabel && selectedLengths.includes(lenLabel));
    const thumb = (p as any).arm_attributes?.thumb_loop as boolean | undefined;
    const loopOk = !selectedThumbLoop ? true : (typeof thumb === 'boolean' && thumb === selectedThumbLoop);
    const closure = (p as any).arm_attributes?.closure as string | undefined;
    const closureOk = selectedClosures.length === 0 ? true : (!!closure && selectedClosures.includes(closure));
    return lengthOk && loopOk && closureOk;
  };

  return (
    <section id="products" className="py-10">
      <div className="container mx-auto px-4 sm:px-6">
        <ProductGrid
          products={armProducts}
          initialCategory="Arm protection"
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


