"use client";

import { useMemo, useState } from "react";
import { Product } from "@/lib/products-service";
import { ProductGrid } from "@/components/website/products/product-grid";
import { ProtectionTypeFilter } from "@/components/website/products/filters/eyeface/ProtectionTypeFilter";
import { ProtectionTypeFilterMobile } from "@/components/website/products/filters/eyeface/ProtectionTypeFilterMobile";
import { LensTintFilter } from "@/components/website/products/filters/eyeface/LensTintFilter";
import { LensTintFilterMobile } from "@/components/website/products/filters/eyeface/LensTintFilterMobile";
import { CoatingFilter } from "@/components/website/products/filters/eyeface/CoatingFilter";
import { CoatingFilterMobile } from "@/components/website/products/filters/eyeface/CoatingFilterMobile";
import { UvCodeFilter } from "@/components/website/products/filters/eyeface/UvCodeFilter";
import { UvCodeFilterMobile } from "@/components/website/products/filters/eyeface/UvCodeFilterMobile";

export function EyeFaceProductsSection({ products }: { products: Product[] }) {
  const scoped = useMemo(() => {
    return products.filter((p) => {
      const cat = (p.category || '').toLowerCase();
      const sub = (p.sub_category || '').toLowerCase();
      const itCat = (p.category_locales as any)?.it?.toLowerCase?.() || '';
      const itSub = (p.sub_category_locales as any)?.it?.toLowerCase?.() || '';
      const isEyeFace = (
        cat.includes('eye') || cat.includes('face') ||
        sub.includes('glasses') || sub.includes('goggle') || sub.includes('visor') || sub.includes('face shield') ||
        itCat.includes('occhi') || itCat.includes('viso') ||
        itSub.includes('occhiali') || itSub.includes('visier') || itSub.includes('schermo')
      );
      return isEyeFace;
    });
  }, [products]);

  // Build options from attributes JSON
  const [protTypes, setProtTypes] = useState<string[]>([]); // values: IR, UV, Arc
  const [tints, setTints] = useState<string[]>([]);
  const [coatings, setCoatings] = useState<string[]>([]);
  const [uvCodes, setUvCodes] = useState<string[]>([]);

  const tintOptions = useMemo(() => {
    const s = new Set<string>();
    (scoped as any[]).forEach((p: any) => { const v = p.eye_face_attributes?.lens_tint; if (v) s.add(String(v)); });
    return Array.from(s).sort();
  }, [scoped]);
  const coatingOptions = useMemo(() => {
    const s = new Set<string>();
    (scoped as any[]).forEach((p: any) => { (p.eye_face_attributes?.coatings || []).forEach((c: string) => c && s.add(c)); });
    return Array.from(s).sort();
  }, [scoped]);
  const uvOptions = useMemo(() => {
    const s = new Set<string>();
    (scoped as any[]).forEach((p: any) => { const v = p.eye_face_attributes?.uv_code; if (v) s.add(String(v)); });
    return Array.from(s).sort();
  }, [scoped]);

  const extraFilters = (
    <>
      <ProtectionTypeFilter selected={protTypes} onToggle={(v) => setProtTypes(prev => prev.includes(v) ? prev.filter(x => x !== v) : [...prev, v])} />
      <LensTintFilter options={tintOptions} selected={tints} onToggle={(v) => setTints(prev => prev.includes(v) ? prev.filter(x => x !== v) : [...prev, v])} />
      <CoatingFilter options={coatingOptions} selected={coatings} onToggle={(v) => setCoatings(prev => prev.includes(v) ? prev.filter(x => x !== v) : [...prev, v])} />
      <UvCodeFilter options={uvOptions} selected={uvCodes} onToggle={(v) => setUvCodes(prev => prev.includes(v) ? prev.filter(x => x !== v) : [...prev, v])} />
    </>
  );

  const extraFiltersMobile = (
    <>
      <ProtectionTypeFilterMobile selected={protTypes} onToggle={(v) => setProtTypes(prev => prev.includes(v) ? prev.filter(x => x !== v) : [...prev, v])} />
      <LensTintFilterMobile options={tintOptions} selected={tints} onToggle={(v) => setTints(prev => prev.includes(v) ? prev.filter(x => x !== v) : [...prev, v])} />
      <CoatingFilterMobile options={coatingOptions} selected={coatings} onToggle={(v) => setCoatings(prev => prev.includes(v) ? prev.filter(x => x !== v) : [...prev, v])} />
      <UvCodeFilterMobile options={uvOptions} selected={uvCodes} onToggle={(v) => setUvCodes(prev => prev.includes(v) ? prev.filter(x => x !== v) : [...prev, v])} />
    </>
  );

  const predicate = (p: Product) => {
    const attrs: any = (p as any).eye_face_attributes || {};
    const hasIR = !!attrs?.has_ir;
    const hasUV = !!attrs?.has_uv;
    const hasArc = !!attrs?.has_arc;
    const coatingsArr: string[] = Array.isArray(attrs?.coatings) ? attrs.coatings : [];
    const lensTint: string | undefined = attrs?.lens_tint ? String(attrs.lens_tint) : undefined;
    const uvCode: string | undefined = attrs?.uv_code ? String(attrs.uv_code) : undefined;

    const protOk = protTypes.length === 0 ? true : (
      (protTypes.includes('IR') && hasIR) ||
      (protTypes.includes('UV') && hasUV) ||
      (protTypes.includes('Arc') && hasArc)
    );
    const tintOk = tints.length === 0 ? true : (!!lensTint && tints.includes(lensTint));
    const coatOk = coatings.length === 0 ? true : coatings.every(c => coatingsArr.includes(c)) || coatings.some(c => coatingsArr.includes(c));
    const uvOk = uvCodes.length === 0 ? true : (!!uvCode && uvCodes.includes(uvCode));
    return protOk && tintOk && coatOk && uvOk;
  };

  return (
    <section id="products" className="py-10">
      <div className="container mx-auto px-4 sm:px-6">
        <ProductGrid
          products={scoped}
          extraFiltersRender={extraFilters}
          extraFiltersRenderMobile={extraFiltersMobile}
          extraFilterPredicate={predicate}
          hideDefaultFilters={true}
        />
      </div>
    </section>
  );
}


