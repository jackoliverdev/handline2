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
import { ENStandardFilter } from "@/components/website/products/filters/ENStandardFilter";
import { ENStandardFilterMobile } from "@/components/website/products/filters/ENStandardFilterMobile";
import { WorkEnvironmentFilter } from "@/components/website/products/filters/WorkEnvironmentFilter";
import { WorkEnvironmentFilterMobile } from "@/components/website/products/filters/WorkEnvironmentFilterMobile";
import { ClothingSizeRangeFilter } from "@/components/website/products/filters/clothing/ClothingSizeRangeFilter";
import { ClothingSizeRangeFilterMobile } from "@/components/website/products/filters/clothing/ClothingSizeRangeFilterMobile";
import { CLOTHING_TYPE_TO_CATEGORIES, GARMENT_TYPES } from "@/content/clothing-categories";
import { getUniqueENStandards, matchesENStandards } from "@/lib/product-utils";
import { matchesWorkEnvironment } from "@/content/workenvironmentfilters";

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
      const isClothingProduct = (
        cat.includes('clothing') || itCat.includes('abbigliament') ||
        sub.includes('jacket') || itSub.includes('giacch')
      );
      const matchesPinnedType = !pinnedClothingType ||
        (p.clothing_type || '').toLowerCase() === pinnedClothingType;

      return isClothingProduct && matchesPinnedType;
    });
  }, [products, pinnedClothingType]);

  // Filter state
  const [selectedClothingTypes, setSelectedClothingTypes] = useState<string[]>([]);
  const [clothingCategories, setClothingCategories] = useState<string[]>([]);
  const [garmentTypes, setGarmentTypes] = useState<string[]>([]);
  const [selectedENStandards, setSelectedENStandards] = useState<string[]>([]);
  const [selectedWorkEnvironments, setSelectedWorkEnvironments] = useState<string[]>([]);
  const [sizeRange, setSizeRange] = useState<{ min?: number; max?: number }>({});
  const [hiVisClasses, setHiVisClasses] = useState<number[]>([]); // 1/2/3
  const [hasFlameStd, setHasFlameStd] = useState<boolean>(false); // EN ISO 11612
  const [arcClasses, setArcClasses] = useState<number[]>([]); // IEC 61482-2 class
  const [antistatic, setAntistatic] = useState<boolean>(false); // EN 1149-5

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

  const clothingCategoryOptions = useMemo(() => {
    if (pinnedClothingType) {
      return CLOTHING_TYPE_TO_CATEGORIES[pinnedClothingType];
    }

    const s = new Set<string>();
    clothingProducts.forEach(p => {
      const category = p.clothing_category;
      if (category && category.trim()) s.add(category.trim());
    });
    return Array.from(s).sort();
  }, [clothingProducts, pinnedClothingType]);

  const clothingTypeOptions = useMemo(() => Object.keys(CLOTHING_TYPE_TO_CATEGORIES), []);
  const garmentTypeOptions = useMemo(() => Array.from(GARMENT_TYPES), []);

  const enStandards = useMemo(() => getUniqueENStandards(clothingProducts), [clothingProducts]);

  const sizeBounds = useMemo(() => {
    let min = Infinity, max = -Infinity;
    clothingProducts.forEach((p: any) => {
      const sizeMin = p.clothing_attributes?.size_min;
      const sizeMax = p.clothing_attributes?.size_max;
      if (typeof sizeMin === 'number') min = Math.min(min, sizeMin);
      if (typeof sizeMax === 'number') max = Math.max(max, sizeMax);
    });
    if (!isFinite(min) || !isFinite(max)) return null;
    return { min, max };
  }, [clothingProducts]);

  const [enStandardExpanded, setEnStandardExpanded] = useState(false);
  const [enStandardMobileExpanded, setEnStandardMobileExpanded] = useState(false);
  const [workEnvExpanded, setWorkEnvExpanded] = useState(false);
  const [sizeExpanded, setSizeExpanded] = useState(false);

  const extraFilters = (
    <>
      {!pinnedClothingType && (
        <ClothingTypeFilter
          options={clothingTypeOptions}
          selected={selectedClothingTypes}
          onToggle={(value) => setSelectedClothingTypes(prev => prev.includes(value) ? prev.filter(type => type !== value) : [...prev, value])}
          defaultOpen={false}
        />
      )}
      <ClothingCategoryFilter
        options={clothingCategoryOptions}
        selected={clothingCategories}
        onToggle={(value) => setClothingCategories(prev => prev.includes(value) ? prev.filter(category => category !== value) : [...prev, value])}
        defaultOpen={false}
      />
      <ClothingTypeFilter
        options={garmentTypeOptions}
        selected={garmentTypes}
        onToggle={(value) => setGarmentTypes(prev => prev.includes(value) ? prev.filter(type => type !== value) : [...prev, value])}
        defaultOpen={false}
        titleKey="products.filters.garmentType"
        optionLabelKeyPrefix="products.filters.garmentTypes"
      />
      {pinnedClothingType === 'high-visibility' && (
        <HiVisClassFilter options={hiVisOptions} selected={hiVisClasses} onToggle={(c) => setHiVisClasses(prev => prev.includes(c) ? prev.filter(x => x !== c) : [...prev, c])} />
      )}
      {(!pinnedClothingType || pinnedClothingType === 'safety-workwear') && (
        <ENStandardFilter 
          standards={enStandards} 
          selectedStandards={selectedENStandards} 
          toggleStandard={(v) => setSelectedENStandards(prev => prev.includes(v) ? prev.filter(x => x !== v) : [...prev, v])} 
          isExpanded={enStandardExpanded} 
          toggleSection={() => setEnStandardExpanded(!enStandardExpanded)} 
        />
      )}
      <WorkEnvironmentFilter 
        selectedWorkEnvironments={selectedWorkEnvironments} 
        toggleWorkEnvironment={(v) => setSelectedWorkEnvironments(prev => prev.includes(v) ? prev.filter(x => x !== v) : [...prev, v])} 
        isExpanded={workEnvExpanded} 
        toggleSection={() => setWorkEnvExpanded(!workEnvExpanded)} 
      />
      <ClothingSizeRangeFilter 
        bounds={sizeBounds} 
        value={sizeRange} 
        onChange={setSizeRange}
        isExpanded={sizeExpanded}
        toggleSection={() => setSizeExpanded(!sizeExpanded)}
      />
    </>
  );

  const extraFiltersMobile = (
    <>
      {!pinnedClothingType && (
        <ClothingTypeFilterMobile
          options={clothingTypeOptions}
          selected={selectedClothingTypes}
          onToggle={(value) => setSelectedClothingTypes(prev => prev.includes(value) ? prev.filter(type => type !== value) : [...prev, value])}
        />
      )}
      <ClothingCategoryFilterMobile
        options={clothingCategoryOptions}
        selected={clothingCategories}
        onToggle={(value) => setClothingCategories(prev => prev.includes(value) ? prev.filter(category => category !== value) : [...prev, value])}
      />
      <ClothingTypeFilterMobile
        options={garmentTypeOptions}
        selected={garmentTypes}
        onToggle={(value) => setGarmentTypes(prev => prev.includes(value) ? prev.filter(type => type !== value) : [...prev, value])}
        titleKey="products.filters.garmentType"
        optionLabelKeyPrefix="products.filters.garmentTypes"
      />
      {pinnedClothingType === 'high-visibility' && (
        <HiVisClassFilterMobile options={hiVisOptions} selected={hiVisClasses} onToggle={(c) => setHiVisClasses(prev => prev.includes(c) ? prev.filter(x => x !== c) : [...prev, c])} />
      )}
      {(!pinnedClothingType || pinnedClothingType === 'safety-workwear') && (
        <ENStandardFilterMobile 
          standards={enStandards} 
          selectedStandards={selectedENStandards} 
          toggleStandard={(v: string) => setSelectedENStandards(prev => prev.includes(v) ? prev.filter(x => x !== v) : [...prev, v])} 
          isExpanded={enStandardMobileExpanded} 
          toggleSection={() => setEnStandardMobileExpanded(!enStandardMobileExpanded)} 
        />
      )}
      <WorkEnvironmentFilterMobile 
        selectedWorkEnvironments={selectedWorkEnvironments} 
        toggleWorkEnvironment={(v: string) => setSelectedWorkEnvironments(prev => prev.includes(v) ? prev.filter(x => x !== v) : [...prev, v])} 
      />
      <ClothingSizeRangeFilterMobile 
        bounds={sizeBounds} 
        value={sizeRange} 
        onChange={setSizeRange}
      />
    </>
  );

  const predicate = (p: Product) => {
    const cs: any = (p as any).clothing_standards || {};
    const vis = cs?.en_iso_20471?.class as number | undefined;
    const fl = cs?.en_iso_11612 as Record<string, any> | undefined;
    const arc = cs?.iec_61482_2?.class as number | undefined;
    const anti = cs?.en_1149_5 as boolean | undefined;

    const clothingTypeOk = selectedClothingTypes.length === 0 ||
      selectedClothingTypes.includes((p.clothing_type || '').toLowerCase());
    const clothingCategoryOk = clothingCategories.length === 0 ||
      clothingCategories.includes(p.clothing_category || '');
    const garmentTypeOk = garmentTypes.length === 0 ? true : (() => {
      const sub = (p.sub_category || '').toLowerCase();
      return garmentTypes.some(type => sub.includes(type.toLowerCase()));
    })();
    const enStdOk = selectedENStandards.length === 0 ? true : matchesENStandards(p, selectedENStandards);
    const workEnvOk = selectedWorkEnvironments.length === 0 || selectedWorkEnvironments.some((environment) =>
      matchesWorkEnvironment(p.environment_pictograms, environment)
    );
    const sizeOk = (!sizeRange.min && !sizeRange.max) ? true : (
      (typeof (p as any).clothing_attributes?.size_min === 'number' && 
       typeof (p as any).clothing_attributes?.size_max === 'number') &&
      (sizeRange.min ? (p as any).clothing_attributes.size_max >= sizeRange.min : true) &&
      (sizeRange.max ? (p as any).clothing_attributes.size_min <= sizeRange.max : true)
    );
    const visOk = hiVisClasses.length === 0 ? true : (typeof vis === 'number' && hiVisClasses.includes(vis));
    const flOk = hasFlameStd ? !!fl : true;
    const arcOk = arcClasses.length === 0 ? true : (typeof arc === 'number' && arcClasses.includes(arc));
    const antiOk = antistatic ? !!anti : true;
    return clothingTypeOk && clothingCategoryOk && garmentTypeOk && enStdOk && workEnvOk && sizeOk && visOk && flOk && arcOk && antiOk;
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


