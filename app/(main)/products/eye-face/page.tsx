import { Metadata } from "next";
import { getAllProducts } from "@/lib/products-service";
import { ProductsHero } from "@/components/website/products/hero";
import { CategoryInfo } from "@/components/website/products/category-info";
import { EyeFaceProductsSection } from "./EyeFaceProductsSection";

export const metadata: Metadata = {
  title: "Eye & Face Protection | Hand Line",
  description: "Protective eyewear and visors for industrial environments. Safety glasses, sealed goggles and arc‑rated visors designed to EN 166 and related standards.",
};

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function EyeFaceProductsPage() {
  const { products } = await getAllProducts();
  return (
    <main className="bg-brand-light dark:bg-background">
      <ProductsHero showDescription={false} />
      <CategoryInfo categoryType="eyeFace" />
      <EyeFaceProductsSection products={products as any} />
    </main>
  );
}


