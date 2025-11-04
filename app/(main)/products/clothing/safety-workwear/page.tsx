import { Metadata } from "next";
import { getAllProducts } from "@/lib/products-service";
import { ProductsHero } from "@/components/website/products/hero";
import { CategoryInfo } from "@/components/website/products/category-info";
import { ClothingProductsSection } from "../ClothingProductsSection";

export const metadata: Metadata = {
  title: "Safety Clothing & Workwear | Hand Line",
  description: "Durable workwear and multi‑risk protective clothing for industry.",
};

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function SafetyWorkwearClothingPage() {
  const { products } = await getAllProducts();
  return (
    <main className="bg-brand-light dark:bg-background">
      <ProductsHero showDescription={false} />
      <CategoryInfo categoryType="clothing-safetyWorkwear" />
      <ClothingProductsSection products={products as any} pinnedClothingType="safety-workwear" />
    </main>
  );
}


