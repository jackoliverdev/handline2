import { Metadata } from "next";
import { ProductsHero } from "@/components/website/products/hero";
import { DesignPrinciples } from "@/components/website/products/design-principles";
import { CategoryList } from "@/components/website/products/category-list";
import { ProductGrid } from "@/components/website/products/product-grid";
import { getAllProducts } from "@/lib/products-service";

export const metadata: Metadata = {
  title: "Product Categories | Hand Line",
  description: "Explore our comprehensive range of industrial safety products including safety gloves, industrial swabs, and respiratory protection.",
};

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function ProductsPage() {
  // Get all products for the product grid
  const { products } = await getAllProducts();

  return (
    <main className="bg-brand-light dark:bg-background">
      <ProductsHero />
      <DesignPrinciples />
      <CategoryList />
      
      {/* Product Grid Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <ProductGrid products={products} />
        </div>
      </section>
    </main>
  );
}