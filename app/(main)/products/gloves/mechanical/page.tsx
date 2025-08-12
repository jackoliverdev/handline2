import { Metadata } from "next";
import { getAllProducts } from "@/lib/products-service";
import { ProductsHero } from "@/components/website/products/hero";
import { CategoryInfo } from "@/components/website/products/category-info";
import { ProductGrid } from "@/components/website/products/product-grid";

export const metadata: Metadata = {
  title: "Mechanical Hazards Gloves | Hand Line",
  description: "Superior protection against mechanical risks and general workplace hazards with comfort and dexterity.",
};

export const dynamic = 'force-dynamic';
export const revalidate = 0;

// Create a client component for the localized products section
import { MechanicalProductsSection } from "./MechanicalProductsSection";

export default async function MechanicalGlovesPage() {
  // Get all products
  const { products } = await getAllProducts();

  return (
    <main className="bg-brand-light dark:bg-background">
      <ProductsHero />
      
      <CategoryInfo categoryType="mechanical" />
      
      <MechanicalProductsSection products={products} />
    </main>
  );
} 