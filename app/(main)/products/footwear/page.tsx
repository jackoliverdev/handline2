import { Metadata } from "next";
import { getAllProducts } from "@/lib/products-service";
import { ProductsHero } from "@/components/website/products/hero";
import { CategoryInfo } from "@/components/website/products/category-info";
import { FootwearProductsSection } from "./FootwearProductsSection";

export const metadata: Metadata = {
  title: "Safety Footwear | Hand Line",
  description: "Professional safety boots and accessories engineered to EN ISO 20345 standards.",
};

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function FootwearPage() {
  const { products } = await getAllProducts();
  return (
    <main className="bg-brand-light dark:bg-background">
      <ProductsHero showDescription={false} />
      <CategoryInfo categoryType="footwear" />
      <FootwearProductsSection products={products as any} />
    </main>
  );
}


