import { Metadata } from "next";
import { getAllProducts } from "@/lib/products-service";
import { IndustrialSwabsHero } from "@/components/website/products/hero-industrial-swabs";
import { CategoryInfo } from "@/components/website/products/category-info";
import { IndustrialSwabsProductsSection } from "./IndustrialSwabsProductsSection";

export const metadata: Metadata = {
  title: "Industrial Swabs | HandLine Company",
  description: "Specialised cleaning and maintenance solutions for industrial environments. High-quality swabs for precision cleaning tasks.",
};

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function IndustrialSwabsPage() {
  // Get all products
  const { products } = await getAllProducts();

  return (
    <main className="bg-brand-light dark:bg-background">
      <IndustrialSwabsHero />
      
      <CategoryInfo categoryType="industrialSwabs" />
      
      <IndustrialSwabsProductsSection products={products} />
    </main>
  );
} 