"use client";

import { Product } from "@/lib/products-service";
import { ProductGrid } from "@/components/website/products/product-grid";
import * as React from "react";
import { useLanguage } from "@/lib/context/language-context";
import { ClassFilter } from "@/components/website/products/filters/footwear/ClassFilter";
import { ClassFilterMobile } from "@/components/website/products/filters/footwear/ClassFilterMobile";
import { ESDFilter } from "@/components/website/products/filters/footwear/ESDFilter";
import { ESDFilterMobile } from "@/components/website/products/filters/footwear/ESDFilterMobile";
import { WidthFilter } from "@/components/website/products/filters/footwear/WidthFilter";
import { WidthFilterMobile } from "@/components/website/products/filters/footwear/WidthFilterMobile";
import { SizeRangeFilter } from "@/components/website/products/filters/footwear/SizeRangeFilter";
import { SizeRangeFilterMobile } from "@/components/website/products/filters/footwear/SizeRangeFilterMobile";
import { ToeCapFilter } from "@/components/website/products/filters/footwear/ToeCapFilter";
import { ToeCapFilterMobile } from "@/components/website/products/filters/footwear/ToeCapFilterMobile";
import { SoleMaterialFilter } from "@/components/website/products/filters/footwear/SoleMaterialFilter";
import { SoleMaterialFilterMobile } from "@/components/website/products/filters/footwear/SoleMaterialFilterMobile";
import { StandardCodeFilter } from "@/components/website/products/filters/footwear/StandardCodeFilter";
import { StandardCodeFilterMobile } from "@/components/website/products/filters/footwear/StandardCodeFilterMobile";

interface FootwearProductsSectionProps {
  products: Product[];
}

export function FootwearProductsSection({ products }: FootwearProductsSectionProps) {
  const { language } = useLanguage();

  // Locale‑agnostic scoping to footwear
  const footwearProducts = React.useMemo(() => {
    return (products || []).filter((p: any) => {
      const catEn = (p.category || '').toLowerCase();
      const subEn = (p.sub_category || '').toLowerCase();
      const catIt = (p.category_locales?.it || '').toLowerCase();
      const subIt = (p.sub_category_locales?.it || '').toLowerCase();
      const isFoot = catEn.includes('footwear') || subEn.includes('boot') || subEn.includes('insol');
      const isFootIt = catIt.includes('calzatur') || subIt.includes('stivali') || subIt.includes('plantar');
      return isFoot || isFootIt;
    });
  }, [products]);

  // Don't set initial category for footwear - show all footwear products
  const initialCategory = "all";

  // Facet state
  const [selectedClasses, setSelectedClasses] = React.useState<string[]>([]);
  const [esd, setEsd] = React.useState<boolean>(false);
  const [selectedWidths, setSelectedWidths] = React.useState<number[]>([]);
  const [sizeRange, setSizeRange] = React.useState<{ min?: number; max?: number }>({});
  const [toeCaps, setToeCaps] = React.useState<string[]>([]);
  const [soles, setSoles] = React.useState<string[]>([]);
  const [stdCodes, setStdCodes] = React.useState<string[]>([]);

  // Build options
  const classOptions = React.useMemo(() => {
    const s = new Set<string>();
    footwearProducts.forEach((p: any) => {
      if (p.footwear_attributes?.class) s.add(String(p.footwear_attributes.class));
      const c2011: string[] = p.footwear_standards?.en_iso_20345_2011 || [];
      const c2022: string[] = p.footwear_standards?.en_iso_20345_2022 || [];
      // Only include actual safety classes (SB, S1-S5), not slip resistance codes (SC, SR, SRC)
      [...c2011, ...c2022].forEach((c) => {
        if (c && String(c).match(/^S[B1-5]$/i)) s.add(String(c));
      });
    });
    return Array.from(s).sort();
  }, [footwearProducts]);

  const widthOptions = React.useMemo(() => {
    const s = new Set<number>();
    footwearProducts.forEach((p: any) => (p.footwear_attributes?.width_fit || []).forEach((n: number) => typeof n === 'number' && s.add(n)));
    return Array.from(s).sort((a, b) => a - b);
  }, [footwearProducts]);

  const sizeBounds = React.useMemo(() => {
    let min = Infinity, max = -Infinity;
    footwearProducts.forEach((p: any) => {
      const mi = p.footwear_attributes?.size_min; const ma = p.footwear_attributes?.size_max;
      if (typeof mi === 'number') min = Math.min(min, mi);
      if (typeof ma === 'number') max = Math.max(max, ma);
    });
    if (!isFinite(min) || !isFinite(max)) return null;
    return { min, max };
  }, [footwearProducts]);

  const toeOptions = React.useMemo(() => {
    const s = new Set<string>();
    footwearProducts.forEach((p: any) => { const v = p.footwear_attributes?.toe_cap; if (v) s.add(String(v)); });
    return Array.from(s).sort();
  }, [footwearProducts]);

  const soleOptions = React.useMemo(() => {
    const s = new Set<string>();
    footwearProducts.forEach((p: any) => { const v = p.footwear_attributes?.sole_material; if (v) s.add(String(v)); });
    return Array.from(s).sort();
  }, [footwearProducts]);

  const stdCodeOptions = React.useMemo(() => {
    const s = new Set<string>();
    footwearProducts.forEach((p: any) => {
      const c2011: string[] = p.footwear_standards?.en_iso_20345_2011 || [];
      const c2022: string[] = p.footwear_standards?.en_iso_20345_2022 || [];
      // Include slip resistance codes (SC, SR, SRC) and other additional codes (PL, HI, CI, etc.)
      [...c2011, ...c2022].forEach((c: string) => {
        if (c && !String(c).match(/^S[B1-5]$/i)) s.add(c);
      });
    });
    return Array.from(s).sort();
  }, [footwearProducts]);

  const extraFilters = (
    <>
      <ClassFilter options={classOptions} selected={selectedClasses} onToggle={(opt) => setSelectedClasses(prev => prev.includes(opt) ? prev.filter(x => x !== opt) : [...prev, opt])} />
      <StandardCodeFilter options={stdCodeOptions} selected={stdCodes} onToggle={(opt) => setStdCodes(prev => prev.includes(opt) ? prev.filter(x => x !== opt) : [...prev, opt])} />
      <ESDFilter value={esd} onChange={setEsd} />
      <WidthFilter options={widthOptions} selected={selectedWidths} onToggle={(opt) => setSelectedWidths(prev => prev.includes(opt) ? prev.filter(x => x !== opt) : [...prev, opt])} />
      <SizeRangeFilter bounds={sizeBounds} value={sizeRange} onChange={setSizeRange} />
      <ToeCapFilter options={toeOptions} selected={toeCaps} onToggle={(opt) => setToeCaps(prev => prev.includes(opt) ? prev.filter(x => x !== opt) : [...prev, opt])} />
      <SoleMaterialFilter options={soleOptions} selected={soles} onToggle={(opt) => setSoles(prev => prev.includes(opt) ? prev.filter(x => x !== opt) : [...prev, opt])} />
    </>
  );
  const extraFiltersMobile = (
    <>
      <ClassFilterMobile options={classOptions} selected={selectedClasses} onToggle={(opt) => setSelectedClasses(prev => prev.includes(opt) ? prev.filter(x => x !== opt) : [...prev, opt])} />
      <StandardCodeFilterMobile options={stdCodeOptions} selected={stdCodes} onToggle={(opt) => setStdCodes(prev => prev.includes(opt) ? prev.filter(x => x !== opt) : [...prev, opt])} />
      <ESDFilterMobile value={esd} onChange={setEsd} />
      <WidthFilterMobile options={widthOptions} selected={selectedWidths} onToggle={(opt) => setSelectedWidths(prev => prev.includes(opt) ? prev.filter(x => x !== opt) : [...prev, opt])} />
      <SizeRangeFilterMobile bounds={sizeBounds} value={sizeRange} onChange={setSizeRange} />
      <ToeCapFilterMobile options={toeOptions} selected={toeCaps} onToggle={(opt) => setToeCaps(prev => prev.includes(opt) ? prev.filter(x => x !== opt) : [...prev, opt])} />
      <SoleMaterialFilterMobile options={soleOptions} selected={soles} onToggle={(opt) => setSoles(prev => prev.includes(opt) ? prev.filter(x => x !== opt) : [...prev, opt])} />
    </>
  );

  const predicate = (p: Product) => {
    const fp: any = p;
    const fattr = fp.footwear_attributes || {};
    const fstd = fp.footwear_standards || {};
    const classes = [fattr.class, ...((fstd.en_iso_20345_2011 || []) as string[]), ...((fstd.en_iso_20345_2022 || []) as string[])].filter(Boolean);
    const classOk = selectedClasses.length === 0 ? true : classes.some((c: string) => selectedClasses.includes(String(c)));
    const esdOk = !esd ? true : (typeof fattr.esd === 'boolean' && fattr.esd === true);
    const widthOk = selectedWidths.length === 0 ? true : Array.isArray(fattr.width_fit) && fattr.width_fit.some((n: number) => selectedWidths.includes(n));
    const sizeOk = (!sizeRange.min && !sizeRange.max) ? true : (
      (typeof fattr.size_min === 'number' && typeof fattr.size_max === 'number') &&
      (sizeRange.min ? fattr.size_max >= sizeRange.min : true) &&
      (sizeRange.max ? fattr.size_min <= sizeRange.max : true)
    );
    const toeOk = toeCaps.length === 0 ? true : (!!fattr.toe_cap && toeCaps.includes(String(fattr.toe_cap)));
    const soleOk = soles.length === 0 ? true : (!!fattr.sole_material && soles.includes(String(fattr.sole_material)));
    const codes: string[] = [...((fstd.en_iso_20345_2011 || []) as string[]), ...((fstd.en_iso_20345_2022 || []) as string[])];
    const codeOk = stdCodes.length === 0 ? true : codes.some((c) => stdCodes.includes(c));
    return classOk && esdOk && widthOk && sizeOk && toeOk && soleOk && codeOk;
  };

  return (
    <section id="products" className="py-10">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="mb-4" />
        <ProductGrid
          products={footwearProducts as any}
          initialCategory={initialCategory}
          extraFiltersRender={extraFilters}
          extraFiltersRenderMobile={extraFiltersMobile}
          hideDefaultFilters={true}
          extraFilterPredicate={predicate}
          hideMainCategoryFilter
        />
      </div>
    </section>
  );
}


