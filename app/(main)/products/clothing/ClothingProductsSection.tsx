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
import { SubCategoryFilter } from "@/components/website/products/filters/SubCategoryFilter";
import { SubCategoryFilterMobile } from "@/components/website/products/filters/SubCategoryFilterMobile";
import { ENStandardFilter } from "@/components/website/products/filters/ENStandardFilter";
import { ENStandardFilterMobile } from "@/components/website/products/filters/ENStandardFilterMobile";
import { WorkEnvironmentFilter } from "@/components/website/products/filters/WorkEnvironmentFilter";
import { WorkEnvironmentFilterMobile } from "@/components/website/products/filters/WorkEnvironmentFilterMobile";
import { SizeFilter } from "@/components/website/products/filters/clothing/SizeFilter";
import { SizeFilterMobile } from "@/components/website/products/filters/clothing/SizeFilterMobile";
import { GARMENT_TYPES } from "@/content/clothing-categories";
import { getUniqueENStandards, matchesENStandards } from "@/lib/product-utils";
import { workEnvironmentFilters } from "@/content/workenvironmentfilters";

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
  const [subCategories, setSubCategories] = useState<string[]>([]);
  const [clothingTypes, setClothingTypes] = useState<string[]>([]);
  const [selectedENStandards, setSelectedENStandards] = useState<string[]>([]);
  const [selectedWorkEnvironments, setSelectedWorkEnvironments] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
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

  const subCategoryOptions = useMemo(() => {
    const s = new Set<string>();
    clothingProducts.forEach(p => {
      const sub = p.sub_category;
      if (sub && sub.trim()) s.add(sub.trim());
    });
    return Array.from(s).sort();
  }, [clothingProducts]);

  const clothingTypeOptions = useMemo(() => Array.from(GARMENT_TYPES), []);

  const enStandards = useMemo(() => getUniqueENStandards(clothingProducts), [clothingProducts]);

  const sizeOptions = useMemo(() => {
    const s = new Set<string>();
    clothingProducts.forEach(p => {
      const sizeRange = (p as any).clothing_attributes?.size_range;
      if (sizeRange && typeof sizeRange === 'string' && sizeRange.trim()) {
        s.add(sizeRange.trim());
      }
    });
    return Array.from(s).sort();
  }, [clothingProducts]);

  const [enStandardExpanded, setEnStandardExpanded] = useState(false);
  const [enStandardMobileExpanded, setEnStandardMobileExpanded] = useState(false);
  const [workEnvExpanded, setWorkEnvExpanded] = useState(false);
  const [sizeExpanded, setSizeExpanded] = useState(false);

  const extraFilters = (
    <>
      {!pinnedClothingType && (
        <>
          <SubCategoryFilter subCategories={subCategoryOptions} selectedSubCategories={subCategories} toggleSubCategory={(v) => setSubCategories(prev => prev.includes(v) ? prev.filter(x => x !== v) : [...prev, v])} isExpanded={false} toggleSection={() => {}} />
        </>
      )}
      <ClothingTypeFilter options={clothingTypeOptions} selected={clothingTypes} onToggle={(v: string)=> setClothingTypes(prev => prev.includes(v) ? prev.filter((x: string)=>x!==v) : [...prev, v])} defaultOpen={false} />
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
      <SizeFilter 
        options={sizeOptions} 
        selected={selectedSizes} 
        onToggle={(v) => setSelectedSizes(prev => prev.includes(v) ? prev.filter(x => x !== v) : [...prev, v])} 
        isExpanded={sizeExpanded} 
        toggleSection={() => setSizeExpanded(!sizeExpanded)} 
        defaultOpen={false} 
      />
    </>
  );

  const extraFiltersMobile = (
    <>
      {!pinnedClothingType && (
        <SubCategoryFilterMobile 
          subCategories={subCategoryOptions} 
          selectedSubCategories={subCategories} 
          toggleSubCategory={(v: string) => setSubCategories(prev => prev.includes(v) ? prev.filter(x => x !== v) : [...prev, v])} 
        />
      )}
      <ClothingTypeFilterMobile options={clothingTypeOptions} selected={clothingTypes} onToggle={(v: string)=> setClothingTypes(prev => prev.includes(v) ? prev.filter((x: string)=>x!==v) : [...prev, v])} />
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
      <SizeFilterMobile 
        options={sizeOptions} 
        selected={selectedSizes} 
        onToggle={(v: string) => setSelectedSizes(prev => prev.includes(v) ? prev.filter(x => x !== v) : [...prev, v])} 
      />
    </>
  );

  const predicate = (p: Product) => {
    const cs: any = (p as any).clothing_standards || {};
    const vis = cs?.en_iso_20471?.class as number | undefined;
    const fl = cs?.en_iso_11612 as Record<string, any> | undefined;
    const arc = cs?.iec_61482_2?.class as number | undefined;
    const anti = cs?.en_1149_5 as boolean | undefined;

    const subCatOk = subCategories.length === 0 ? true : subCategories.includes(p.sub_category || '');
    const typeOk = clothingTypes.length === 0 ? true : (() => {
      const sub = (p.sub_category || '').toLowerCase();
      return clothingTypes.some(ct => sub.includes(ct.toLowerCase()));
    })();
    const enStdOk = selectedENStandards.length === 0 ? true : matchesENStandards(p, selectedENStandards);
    const workEnvOk = selectedWorkEnvironments.length === 0 ? true : (() => {
      const envs = (p as any).work_environment_suitability || [];
      return selectedWorkEnvironments.some((env: string) => envs.includes(env));
    })();
    const sizeOk = selectedSizes.length === 0 ? true : (() => {
      const sizeRange = (p as any).clothing_attributes?.size_range;
      return selectedSizes.includes(sizeRange);
    })();
    const visOk = hiVisClasses.length === 0 ? true : (typeof vis === 'number' && hiVisClasses.includes(vis));
    const flOk = hasFlameStd ? !!fl : true;
    const arcOk = arcClasses.length === 0 ? true : (typeof arc === 'number' && arcClasses.includes(arc));
    const antiOk = antistatic ? !!anti : true;
    return subCatOk && typeOk && enStdOk && workEnvOk && sizeOk && visOk && flOk && arcOk && antiOk;
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


