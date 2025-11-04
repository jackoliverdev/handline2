import { Metadata } from "next";
import { getAllProducts } from "@/lib/products-service";
import { ProductsHero } from "@/components/website/products/hero";
import { CategoryInfo } from "@/components/website/products/category-info";
import { ClothingProductsSection } from "../ClothingProductsSection";

export const metadata: Metadata = {
  title: "Welding Clothing | Hand Line",
  description: "Specialised welding clothing with heat and spatter protection.",
};

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function WeldingClothingPage() {
  const { products } = await getAllProducts();
  return (
    <main className="bg-brand-light dark:bg-background">
      <ProductsHero showDescription={false} />
      <CategoryInfo categoryType="clothing-welding" />
      <ClothingProductsSection products={products as any} pinnedClothingType="welding" />
    </main>
  );
}


