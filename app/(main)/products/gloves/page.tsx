import { Metadata } from "next";
import { ProductsHero } from "@/components/website/products/hero";
import { CategoryInfo } from "@/components/website/products/category-info";
import { GlovesCategories } from "@/components/website/products/gloves-categories";

export const metadata: Metadata = {
  title: "Safety Gloves | Hand Line",
  description: "Browse our range of high-performance industrial safety gloves including heat-resistant, cut-resistant, and general purpose gloves.",
};

export default function GlovesPage() {
  return (
    <main className="bg-brand-light dark:bg-background">
      <ProductsHero />
      
      <CategoryInfo categoryType="gloves" />
      
      <GlovesCategories />
    </main>
  );
} 