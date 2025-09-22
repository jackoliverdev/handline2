"use client";

import { Product } from "@/lib/products-service";
import { ProductGrid } from "@/components/website/products/product-grid";
import { useMemo, useState } from "react";
import { HiVisClassFilter } from "@/components/website/products/filters/clothing/HiVisClassFilter";
import { FlameStandardFilter } from "@/components/website/products/filters/clothing/FlameStandardFilter";
import { ArcClassFilter } from "@/components/website/products/filters/clothing/ArcClassFilter";
import { AntistaticFilter } from "@/components/website/products/filters/clothing/AntistaticFilter";
import { HiVisClassFilterMobile } from "@/components/website/products/filters/clothing/HiVisClassFilterMobile";
import { ArcClassFilterMobile } from "@/components/website/products/filters/clothing/ArcClassFilterMobile";
import { FlameStandardFilterMobile } from "@/components/website/products/filters/clothing/FlameStandardFilterMobile";
import { AntistaticFilterMobile } from "@/components/website/products/filters/clothing/AntistaticFilterMobile";
import { ClothingTypeFilter } from "@/components/website/products/filters/clothing/ClothingTypeFilter";
import { ClothingTypeFilterMobile } from "@/components/website/products/filters/clothing/ClothingTypeFilterMobile";
import { ClothingCategoryFilter } from "@/components/website/products/filters/clothing/ClothingCategoryFilter";
import { ClothingCategoryFilterMobile } from "@/components/website/products/filters/clothing/ClothingCategoryFilterMobile";
import { CLOTHING_TYPE_TO_CATEGORIES } from "@/content/clothing-categories";

// Clothing – targeted filters (few and focused)
// We'll add small inline filter UIs here to avoid creating many files.

function FilterChip({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`text-xs rounded px-2 py-1 border transition-colors ${active ? 'bg-brand-primary text-white border-brand-primary' : 'bg-white dark:bg-black/40 text-brand-dark dark:text-white border-brand-primary/30 hover:border-brand-primary'}`}
    >
      {label}
    </button>
  );
}

function ToggleRow({ label, value, onChange }: { label: string; value: boolean; onChange: (v: boolean) => void }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-brand-primary/10 dark:border-brand-primary/20">
      <span className="text-sm text-brand-dark dark:text-white">{label}</span>
      <input aria-label={label} type="checkbox" checked={value} onChange={(e) => onChange(e.target.checked)} className="h-4 w-4" />
    </div>
  );
}

interface ClothingProductsSectionProps {
  products: Product[];
  pinnedClothingType?: 'welding' | 'high-visibility' | 'safety-workwear';
}

export function ClothingProductsSection({ products, pinnedClothingType }: ClothingProductsSectionProps) {
  // Scope: clothing by EN/IT category/subcategory
  const clothingProducts = useMemo(() => {
    return products.filter((p) => {
      const cat = (p.category || '').toLowerCase();
      const sub = (p.sub_category || '').toLowerCase();
      const itCat = (p.category_locales?.it || '').toLowerCase();
      const itSub = (p.sub_category_locales?.it || '').toLowerCase();
      return (
        cat.includes('clothing') || itCat.includes('abbigliament') ||
        sub.includes('jacket') || itSub.includes('giacch')
      );
    });
  }, [products]);

  // Filter state
  const [hiVisClasses, setHiVisClasses] = useState<number[]>([]); // 1/2/3
  const [hasFlameStd, setHasFlameStd] = useState<boolean>(false); // EN ISO 11612
  const [arcClasses, setArcClasses] = useState<number[]>([]); // IEC 61482-2 class
  const [antistatic, setAntistatic] = useState<boolean>(false); // EN 1149-5
  const [clothingTypes, setClothingTypes] = useState<string[]>(pinnedClothingType ? [pinnedClothingType] : []);
  const [clothingCategories, setClothingCategories] = useState<string[]>([]);

  // Build options from dataset
  const hiVisOptions = useMemo(() => {
    const s = new Set<number>();
    (clothingProducts as any[]).forEach((p: any) => {
      const c = p.clothing_standards?.en_iso_20471?.class;
      if (typeof c === 'number') s.add(c);
    });
    return Array.from(s).sort((a,b)=>a-b);
  }, [clothingProducts]);

  const arcOptions = useMemo(() => {
    const s = new Set<number>();
    (clothingProducts as any[]).forEach((p: any) => {
      const c = p.clothing_standards?.iec_61482_2?.class;
      if (typeof c === 'number') s.add(c);
    });
    return Array.from(s).sort((a,b)=>a-b);
  }, [clothingProducts]);

  const clothingTypeOptions = useMemo(() => ['welding','high-visibility','safety-workwear'], []);
  const clothingCategoryOptions = useMemo(() => {
    const types = (clothingTypes.length > 0 ? clothingTypes : ['welding','high-visibility','safety-workwear']) as Array<'welding'|'high-visibility'|'safety-workwear'>;
    if (pinnedClothingType) return CLOTHING_TYPE_TO_CATEGORIES[pinnedClothingType];
    const s = new Set<string>();
    types.forEach(t => CLOTHING_TYPE_TO_CATEGORIES[t].forEach(c => s.add(c)));
    return Array.from(s);
  }, [clothingTypes, pinnedClothingType]);

  const extraFilters = (
    <>
      {!pinnedClothingType && (
        <ClothingTypeFilter options={clothingTypeOptions} selected={clothingTypes} onToggle={(v: string)=> setClothingTypes(prev => prev.includes(v) ? prev.filter((x: string)=>x!==v) : [...prev, v])} defaultOpen={!pinnedClothingType} />
      )}
      <ClothingCategoryFilter options={clothingCategoryOptions} selected={clothingCategories} onToggle={(v: string)=> setClothingCategories(prev => prev.includes(v) ? prev.filter((x: string)=>x!==v) : [...prev, v])} defaultOpen={!!pinnedClothingType} />
      <HiVisClassFilter options={hiVisOptions} selected={hiVisClasses} onToggle={(c) => setHiVisClasses(prev => prev.includes(c) ? prev.filter(x => x !== c) : [...prev, c])} />
      <FlameStandardFilter value={hasFlameStd} onChange={setHasFlameStd} />
      <ArcClassFilter options={arcOptions} selected={arcClasses} onToggle={(c) => setArcClasses(prev => prev.includes(c) ? prev.filter(x => x !== c) : [...prev, c])} />
      <AntistaticFilter value={antistatic} onChange={setAntistatic} />
    </>
  );

  const extraFiltersMobile = (
    <>
      {!pinnedClothingType && (
        <ClothingTypeFilterMobile options={clothingTypeOptions} selected={clothingTypes} onToggle={(v: string)=> setClothingTypes(prev => prev.includes(v) ? prev.filter((x: string)=>x!==v) : [...prev, v])} />
      )}
      <ClothingCategoryFilterMobile options={clothingCategoryOptions} selected={clothingCategories} onToggle={(v: string)=> setClothingCategories(prev => prev.includes(v) ? prev.filter((x: string)=>x!==v) : [...prev, v])} />
      <HiVisClassFilterMobile options={hiVisOptions} selected={hiVisClasses} onToggle={(c) => setHiVisClasses(prev => prev.includes(c) ? prev.filter(x => x !== c) : [...prev, c])} />
      <FlameStandardFilterMobile value={hasFlameStd} onChange={setHasFlameStd} />
      <ArcClassFilterMobile options={arcOptions} selected={arcClasses} onToggle={(c) => setArcClasses(prev => prev.includes(c) ? prev.filter(x => x !== c) : [...prev, c])} />
      <AntistaticFilterMobile value={antistatic} onChange={setAntistatic} />
    </>
  );

  const predicate = (p: Product) => {
    const cs: any = (p as any).clothing_standards || {};
    const vis = cs?.en_iso_20471?.class as number | undefined;
    const fl = cs?.en_iso_11612 as Record<string, any> | undefined;
    const arc = cs?.iec_61482_2?.class as number | undefined;
    const anti = cs?.en_1149_5 as boolean | undefined;

    const visOk = hiVisClasses.length === 0 ? true : (typeof vis === 'number' && hiVisClasses.includes(vis));
    const flOk = hasFlameStd ? !!fl : true;
    const arcOk = arcClasses.length === 0 ? true : (typeof arc === 'number' && arcClasses.includes(arc));
    const antiOk = antistatic ? !!anti : true;
    const typeOk = clothingTypes.length === 0 ? true : clothingTypes.includes(((p as any).clothing_type || '').toLowerCase());
    const catOk = clothingCategories.length === 0 ? true : clothingCategories.includes(((p as any).clothing_category || ''));
    return visOk && flOk && arcOk && antiOk && typeOk && catOk;
  };

  return (
    <section id="products" className="py-10">
      <div className="container mx-auto px-4 sm:px-6">
        <ProductGrid
          products={clothingProducts}
          hideCategoryFilters={true}
          categoryExpandedDefault={false}
          subCategoryExpandedDefault={false}
          extraFiltersRender={extraFilters}
          extraFiltersRenderMobile={extraFiltersMobile}
          extraFilterPredicate={predicate}
          hideDefaultFilters={true}
        />
      </div>
    </section>
  );
}


