import { Metadata } from "next";
import { ProductsHero } from "@/components/website/products/hero";
import { CategoryInfo } from "@/components/website/products/category-info";
import { GlovesCategories } from "@/components/website/products/gloves-categories";
import { getAllProducts } from "@/lib/products-service";
import { GlovesProductsSection } from "./GlovesProductsSection";

export const metadata: Metadata = {
  title: "Safety Gloves | Hand Line",
  description: "Browse our range of high-performance industrial safety gloves including heat-resistant, cut-resistant, and general purpose gloves.",
};

export const revalidate = 0;

export default async function GlovesPage() {
  const { products } = await getAllProducts();

  return (
    <main className="bg-brand-light dark:bg-background">
      <ProductsHero showDescription={false} />
      
      <CategoryInfo categoryType="gloves" />
      
      <GlovesCategories />

      <GlovesProductsSection products={products} />
    </main>
  );
}