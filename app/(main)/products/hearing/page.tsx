import { Metadata } from "next";
import { getAllProducts } from "@/lib/products-service";
import { ProductsHero } from "@/components/website/products/hero";
import { CategoryInfo } from "@/components/website/products/category-info";
import { HearingProductsSection } from "./HearingProductsSection";

export const metadata: Metadata = {
  title: "Hearing Protection | Hand Line",
  description: "Hearing protection devices for noisy industrial environments. Ear plugs and earmuffs designed to EN 352.",
};

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function HearingProductsPage() {
  const { products } = await getAllProducts();
  return (
    <main className="bg-brand-light dark:bg-background">
      <ProductsHero showDescription={false} />
      <CategoryInfo categoryType="hearing" />
      <HearingProductsSection products={products as any} />
    </main>
  );
}


