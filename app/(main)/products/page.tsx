import { Metadata } from "next";
import { getAllProducts } from "@/lib/products-service";
import { ProductsHero } from "@/components/website/products/hero";
import { ProductGrid } from "@/components/website/products/product-grid";

export const metadata: Metadata = {
  title: "Safety Gloves | HandLine Company",
  description: "Browse our range of high-performance industrial safety gloves designed for superior protection in demanding environments.",
};

// Disable static generation for this page
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function ProductsPage() {
  // Get the latest products from Supabase
  const { products } = await getAllProducts();
  return (
    <main className="bg-brand-light dark:bg-background">
      <ProductsHero />
      <section id="product-categories" className="pt-8 pb-16">
        <div className="container mx-auto px-4 sm:px-6">
          <ProductGrid products={products} />
        </div>
      </section>
    </main>
  );
}