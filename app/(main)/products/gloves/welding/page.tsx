import { Metadata } from "next";
import { getAllProducts } from "@/lib/products-service";
import { ProductsHero } from "@/components/website/products/hero";
import { CategoryInfo } from "@/components/website/products/category-info";
import { ProductGrid } from "@/components/website/products/product-grid";

export const metadata: Metadata = {
  title: "Welding Gloves | Hand Line",
  description: "Specialised protection for welding and high-heat metalworking tasks with superior durability and comfort.",
};

export const dynamic = 'force-dynamic';
export const revalidate = 0;

// Create a client component for the localized products section
import { WeldingProductsSection } from "./WeldingProductsSection";

export default async function WeldingGlovesPage() {
  // Get all products
  const { products } = await getAllProducts();

  return (
    <main className="bg-brand-light dark:bg-background">
      <ProductsHero showDescription={false} />
      
      <CategoryInfo categoryType="welding" />
      
      <WeldingProductsSection products={products} />
    </main>
  );
} 