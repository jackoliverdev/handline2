import { Metadata } from "next";
import { getAllProducts } from "@/lib/products-service";
import { ProductsHero } from "@/components/website/products/hero";
import { CategoryInfo } from "@/components/website/products/category-info";
import { HeadProductsSection } from "./HeadProductsSection";

export const metadata: Metadata = {
  title: "Head Protection | Hand Line",
  description: "Safety helmets and bump caps engineered for industrial environments with EN 397, EN 50365 and EN 812 compliance.",
};

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function HeadProductsPage() {
  const { products } = await getAllProducts();
  return (
    <main>
      <ProductsHero showDescription={false} />
      <CategoryInfo categoryType="head" />
      <HeadProductsSection products={products} />
    </main>
  );
}


