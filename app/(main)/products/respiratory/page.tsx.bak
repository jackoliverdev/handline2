import { Metadata } from "next";
import { getAllProducts } from "@/lib/products-service";
import { RespiratoryHero } from "@/components/website/products/hero-respiratory";
import { CategoryInfo } from "@/components/website/products/category-info";
import { RespiratoryProductsSection } from "./RespiratoryProductsSection";

export const metadata: Metadata = {
  title: "Respiratory Protection | Hand Line",
  description: "Advanced respiratory protection equipment for hazardous environments. Professional-grade masks and breathing apparatus.",
};

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function RespiratoryPage() {
  // Get all products
  const { products } = await getAllProducts();

  return (
    <main className="bg-brand-light dark:bg-background">
      <RespiratoryHero />
      
      <CategoryInfo categoryType="respiratory" />
      
      <RespiratoryProductsSection products={products} />
    </main>
  );
} 