import { Metadata } from "next";
import { getAllProducts } from "@/lib/products-service";
import { GlovesHero } from "@/components/website/products/hero-gloves";
import { CategoryInfo } from "@/components/website/products/category-info";
import { CutProductsSection } from "./CutProductsSection";

export const metadata: Metadata = {
  title: "Cut-Resistant Gloves | HandLine Company",
  description: "Superior cut protection gloves with Level 5 resistance. Advanced materials for maximum safety without compromising dexterity.",
};

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function CutGlovesPage() {
  // Get all products
  const { products } = await getAllProducts();

  return (
    <main className="bg-brand-light dark:bg-background">
      <GlovesHero />
      
      <CategoryInfo categoryType="cut" />
      
      <CutProductsSection products={products} />
    </main>
  );
} 