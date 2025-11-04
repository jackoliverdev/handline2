"use client";

import { Product } from "@/lib/products-service";
import { ProductGrid } from "@/components/website/products/product-grid";
import { useLanguage } from "@/lib/context/language-context";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface GlovesProductsSectionProps {
  products: Product[];
}

export function GlovesProductsSection({ products }: GlovesProductsSectionProps) {
  const { t, language } = useLanguage();
  const [initialCategory, setInitialCategory] = useState<string | undefined>(undefined);

  // Filter products for gloves (hand protection) categories
  const gloveProducts = products.filter((product) => {
    const cat = product.category?.toLowerCase() || "";
    const catIt = product.category_locales?.it?.toLowerCase() || "";
    const sub = product.sub_category?.toLowerCase() || "";
    const subIt = product.sub_category_locales?.it?.toLowerCase() || "";

    const isGloveCategory =
      cat.includes("glove") ||
      catIt.includes("guant") ||
      (cat.includes("hand") && cat.includes("protect"));

    const gloveSubsEn = [
      "heat resistant gloves",
      "cut resistant gloves",
      "gloves for general use",
      "mechanical hazards gloves",
      "welding glove",
    ];

    const isGloveSub =
      gloveSubsEn.includes(product.sub_category || "") ||
      subIt.includes("guant");

    const isNonGloveCategory =
      cat.includes("swab") ||
      catIt.includes("tampone") ||
      cat.includes("respiratory") ||
      catIt.includes("respiratorio") ||
      cat.includes("mask") ||
      catIt.includes("maschera");

    return (isGloveCategory || isGloveSub) && !isNonGloveCategory;
  });

  // Determine initial category label for the grid filter
  const getCategoryForFilter = () => {
    if (gloveProducts.length === 0) return undefined;

    const gloveProduct = gloveProducts.find((p) => {
      const category = language === "it" ? p.category_locales?.it || p.category : p.category;
      const lc = (category || "").toLowerCase();
      if (language === "it") {
        return lc.includes("guant") || lc.includes("mani") || lc.includes("protezione");
      } else {
        return lc.includes("glove") || (lc.includes("hand") && lc.includes("protect"));
      }
    });

    if (gloveProduct) {
      return language === "it" ? gloveProduct.category_locales?.it || gloveProduct.category : gloveProduct.category;
    }

    // Fallback to first product's category
    const firstProduct = gloveProducts[0];
    return language === "it" ? firstProduct.category_locales?.it || firstProduct.category : firstProduct.category;
  };

  useEffect(() => {
    setInitialCategory(getCategoryForFilter());
  }, [language, gloveProducts.length]);

  return (
    <section id="gloves-products" className="pt-6 pb-12">
      <div className="container mx-auto px-4 sm:px-6">
        <ProductGrid products={gloveProducts} initialCategory={initialCategory} hideMainCategoryFilter showGloveFiltersExpanded />
      </div>
    </section>
  );
}


