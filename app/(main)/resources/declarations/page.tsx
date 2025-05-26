import { Metadata } from "next";
import { DeclarationsHero } from "@/components/website/resources/declarations/hero";
import { ProductList } from "@/components/website/resources/declarations/product-list";
import { getAllProducts } from "@/lib/products-service";

export const metadata: Metadata = {
  title: "Compliance Declarations | HandLine",
  description: "Access official declarations of conformity for HandLine products certifying compliance with European health, safety, and environmental protection standards.",
};

export default async function DeclarationsPage() {
  // Fetch all products from the products service
  const { products } = await getAllProducts();
  
  return (
    <main className="flex flex-col min-h-screen">
      <DeclarationsHero language="en" />
      
      <section className="py-16 md:py-24 bg-[#F5EFE0]/80 dark:bg-transparent">
        <div className="container mx-auto px-4 md:px-6">
          <div id="declarations-list" className="max-w-4xl mx-auto" style={{ scrollMarginTop: "80px" }}>
            <ProductList products={products} />
          </div>
        </div>
      </section>
    </main>
  );
} 