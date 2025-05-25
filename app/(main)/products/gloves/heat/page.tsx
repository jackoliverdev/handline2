import { Metadata } from "next";
import { getAllProducts } from "@/lib/products-service";
import { GlovesHero } from "@/components/website/products/hero-gloves";
import { CategoryInfo } from "@/components/website/products/category-info";
import { ProductGrid } from "@/components/website/products/product-grid";

export const metadata: Metadata = {
  title: "Heat-Resistant Gloves | HandLine Company",
  description: "Advanced thermal protection gloves for high-temperature environments up to 350°C. Superior heat resistance with comfort and dexterity.",
};

export const dynamic = 'force-dynamic';
export const revalidate = 0;

// Create a client component for the localized products section
import { HeatProductsSection } from "./HeatProductsSection";

export default async function HeatGlovesPage() {
  // Get all products
  const { products } = await getAllProducts();

  return (
    <main className="bg-brand-light dark:bg-background">
      <GlovesHero />
      
      <CategoryInfo categoryType="heat" />
      
      <HeatProductsSection products={products} />
    </main>
  );
} 