import { Metadata } from "next";
import { getAllProducts } from "@/lib/products-service";
import { ProductsHero } from "@/components/website/products/hero";
import { CategoryInfo } from "@/components/website/products/category-info";
import { ArmProductsSection } from "./ArmProductsSection";

export const metadata: Metadata = {
  title: "Arm Protection | Hand Line",
  description: "Cut-resistant sleeves and arm protection for industrial environments.",
};

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function ArmProtectionPage() {
  const { products } = await getAllProducts();
  return (
    <main className="bg-brand-light dark:bg-background">
      <ProductsHero showDescription={false} />
      <CategoryInfo categoryType="armProtection" />
      <ArmProductsSection products={products} />
    </main>
  );
}


