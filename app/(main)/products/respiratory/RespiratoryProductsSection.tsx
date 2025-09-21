"use client";

import { Product } from "@/lib/products-service";
import { ProductGrid } from "@/components/website/products/product-grid";
import { useLanguage } from "@/lib/context/language-context";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import { ConnectionFilter } from "@/components/website/products/filters/respiratory/ConnectionFilter";
import { FilterTypeFilter } from "@/components/website/products/filters/respiratory/FilterTypeFilter";
import { ProtectionClassFilter } from "@/components/website/products/filters/respiratory/ProtectionClassFilter";
import { ConnectionFilterMobile } from "@/components/website/products/filters/respiratory/ConnectionFilterMobile";
import { FilterTypeFilterMobile } from "@/components/website/products/filters/respiratory/FilterTypeFilterMobile";
import { ProtectionClassFilterMobile } from "@/components/website/products/filters/respiratory/ProtectionClassFilterMobile";

interface RespiratoryProductsSectionProps {
  products: Product[];
}

export function RespiratoryProductsSection({ products }: RespiratoryProductsSectionProps) {
  const { t, language } = useLanguage();
  const [initialCategory, setInitialCategory] = useState<string | undefined>(undefined);

  // Category scoping (same strict logic as before)
  const respiratoryProducts = useMemo(() => {
    return products.filter(product => {
      const explicitRespiratoryTerms =
        product.category?.toLowerCase().includes('respiratory') ||
        product.category?.toLowerCase().includes('respirator') ||
        product.category?.toLowerCase().includes('mask') ||
        product.category?.toLowerCase().includes('masks') ||
        product.category_locales?.it?.toLowerCase().includes('respiratorio') ||
        product.category_locales?.it?.toLowerCase().includes('respiratoria') ||
        product.category_locales?.it?.toLowerCase().includes('respiratore') ||
        product.category_locales?.it?.toLowerCase().includes('maschera') ||
        product.category_locales?.it?.toLowerCase().includes('maschere') ||
        product.sub_category?.toLowerCase().includes('respiratory') ||
        product.sub_category?.toLowerCase().includes('respirator') ||
        product.sub_category?.toLowerCase().includes('mask') ||
        product.sub_category_locales?.it?.toLowerCase().includes('respiratorio') ||
        product.sub_category_locales?.it?.toLowerCase().includes('respiratore') ||
        product.sub_category_locales?.it?.toLowerCase().includes('maschera');

      if (explicitRespiratoryTerms) {
        const notOtherProtection =
          !product.category?.toLowerCase().includes('glove') &&
          !product.category_locales?.it?.toLowerCase().includes('guant') &&
          !product.category?.toLowerCase().includes('swab') &&
          !product.category_locales?.it?.toLowerCase().includes('tampone');
        return notOtherProtection;
      }
      return false;
    });
  }, [products]);

  // Compute initial category for the filter chip
  useEffect(() => {
    if (!respiratoryProducts.length) return;
    const first = respiratoryProducts[0];
    setInitialCategory(language === 'it' ? (first.category_locales?.it || first.category) : first.category);
  }, [language, respiratoryProducts.length]);

  // Respirator-specific filter state
  const [selectedConnections, setSelectedConnections] = useState<string[]>([]);
  const [selectedFilterTypes, setSelectedFilterTypes] = useState<string[]>([]);
  const [selectedProtectionClasses, setSelectedProtectionClasses] = useState<string[]>([]);

  // Option builders
  const connectionOptions = useMemo(() => {
    const set = new Set<string>();
    respiratoryProducts.forEach(p => {
      (p.connections || []).forEach(c => c && set.add(c));
    });
    return Array.from(set).sort();
  }, [respiratoryProducts]);

  const filterTypeOptions = useMemo(() => {
    const set = new Set<string>();
    respiratoryProducts.forEach(p => { if (p.filter_type) set.add(p.filter_type); });
    return Array.from(set).sort();
  }, [respiratoryProducts]);

  const protectionClassOptions = useMemo(() => {
    const set = new Set<string>();
    respiratoryProducts.forEach(p => { if (p.protection_class) set.add(p.protection_class); });
    return Array.from(set).sort();
  }, [respiratoryProducts]);

  // Toggle helpers
  const toggle = (arr: string[], setArr: (v: string[]) => void, value: string) => {
    const next: string[] = arr.includes(value) ? arr.filter((x: string) => x !== value) : [...arr, value];
    setArr(next);
  };

  return (
    <section id="products" className="py-10">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Match gloves page: remove pill and subtitle; tighter spacing */}
        <div className="mb-4" />

        <ProductGrid
          products={respiratoryProducts}
          initialCategory={initialCategory}
          extraFiltersRender={(
            <>
              <ConnectionFilter
                options={connectionOptions}
                selected={selectedConnections}
                onToggle={(opt) => toggle(selectedConnections, setSelectedConnections, opt)}
              />
              <FilterTypeFilter
                options={filterTypeOptions}
                selected={selectedFilterTypes}
                onToggle={(opt) => toggle(selectedFilterTypes, setSelectedFilterTypes, opt)}
              />
              <ProtectionClassFilter
                options={protectionClassOptions}
                selected={selectedProtectionClasses}
                onToggle={(opt) => toggle(selectedProtectionClasses, setSelectedProtectionClasses, opt)}
              />
            </>
          )}
          extraFiltersRenderMobile={(
            <>
              <ConnectionFilterMobile
                options={connectionOptions}
                selected={selectedConnections}
                onToggle={(opt) => toggle(selectedConnections, setSelectedConnections, opt)}
              />
              <FilterTypeFilterMobile
                options={filterTypeOptions}
                selected={selectedFilterTypes}
                onToggle={(opt) => toggle(selectedFilterTypes, setSelectedFilterTypes, opt)}
              />
              <ProtectionClassFilterMobile
                options={protectionClassOptions}
                selected={selectedProtectionClasses}
                onToggle={(opt) => toggle(selectedProtectionClasses, setSelectedProtectionClasses, opt)}
              />
            </>
          )}
          hideDefaultFilters={true}
          extraFilterPredicate={(p: Product) => {
            const hasSel = selectedConnections.length + selectedFilterTypes.length + selectedProtectionClasses.length > 0;
            if (!hasSel) return true;

            const connOk = selectedConnections.length === 0 || (!!p.connections && p.connections.some((c: string) => selectedConnections.includes(c)));
            const typeOk = selectedFilterTypes.length === 0 || (!!p.filter_type && selectedFilterTypes.includes(p.filter_type));
            const classOk = selectedProtectionClasses.length === 0 || (!!p.protection_class && selectedProtectionClasses.includes(p.protection_class));
            return connOk && typeOk && classOk;
          }}
        />
      </div>
    </section>
  );
}