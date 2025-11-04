import { Metadata } from "next";
import { getAllProducts } from "@/lib/products-service";
import { ProductsHero } from "@/components/website/products/hero";
import { CategoryInfo } from "@/components/website/products/category-info";
import { ClothingProductsSection } from "./ClothingProductsSection";
import { ClothingCategories } from "@/components/website/products/ClothingCategories";

export const metadata: Metadata = {
  title: "Protective Clothing | Hand Line",
  description: "High-visibility and multi-risk protective clothing for professional environments.",
};

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function ClothingProductsPage() {
  const { products } = await getAllProducts();
  return (
    <main className="bg-brand-light dark:bg-background">
      <ProductsHero showDescription={false} />
      <CategoryInfo categoryType="clothing" />
      <ClothingCategories />
      <ClothingProductsSection products={products as any} />
    </main>
  );
}


