import { Metadata } from "next";
import { getAllProducts } from "@/lib/products-service";
import { ProductsHero } from "@/components/website/products/hero";
import { CategoryInfo } from "@/components/website/products/category-info";
import { GeneralProductsSection } from "./GeneralProductsSection";

export const metadata: Metadata = {
  title: "General Purpose Gloves | Hand Line",
  description: "Versatile protective gloves for everyday industrial tasks and construction work. Reliable protection with superior comfort.",
};

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function GeneralGlovesPage() {
  // Get all products
  const { products } = await getAllProducts();

  return (
    <main className="bg-brand-light dark:bg-background">
      <ProductsHero showDescription={false} />
      
      <CategoryInfo categoryType="general" />
      
      <GeneralProductsSection products={products} />
    </main>
  );
} 