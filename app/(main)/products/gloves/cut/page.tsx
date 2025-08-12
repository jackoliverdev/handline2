import { Metadata } from "next";
import { getAllProducts } from "@/lib/products-service";
import { ProductsHero } from "@/components/website/products/hero";
import { CategoryInfo } from "@/components/website/products/category-info";
import { CutProductsSection } from "./CutProductsSection";

export const metadata: Metadata = {
  title: "Cut-Resistant Gloves | Hand Line",
  description: "Superior cut protection gloves with Level 5 resistance. Advanced materials for maximum safety without compromising dexterity.",
};

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function CutGlovesPage() {
  // Get all products
  const { products } = await getAllProducts();

  return (
    <main className="bg-brand-light dark:bg-background">
      <ProductsHero />
      
      <CategoryInfo categoryType="cut" />
      
      <CutProductsSection products={products} />
    </main>
  );
} 