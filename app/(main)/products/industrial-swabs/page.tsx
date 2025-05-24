import { Metadata } from "next";
import { getAllProducts } from "@/lib/products-service";
import { IndustrialSwabsHero } from "@/components/website/products/hero-industrial-swabs";
import { CategoryInfo } from "@/components/website/products/category-info";
import { ProductGrid } from "@/components/website/products/product-grid";

export const metadata: Metadata = {
  title: "Industrial Swabs | HandLine Company",
  description: "Specialised cleaning and maintenance solutions for industrial environments. High-quality swabs for precision cleaning tasks.",
};

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function IndustrialSwabsPage() {
  // Get all products
  const { products } = await getAllProducts();

  return (
    <main className="bg-brand-light dark:bg-background">
      <IndustrialSwabsHero />
      
      <CategoryInfo
        title="Industrial Swabs"
        description="Our industrial swabs provide specialised cleaning and maintenance solutions for demanding industrial environments. Designed for precision cleaning tasks, these high-quality swabs are essential for electronics manufacturing, automotive assembly, aerospace applications, and general industrial maintenance where cleanliness and precision are critical."
        imageSrc="https://bsrdkfjapuvbzultcela.supabase.co/storage/v1/object/public/products/Categories/Industrial_swabs.png"
        imageAlt="Industrial Cleaning Swabs"
      />
      
      <section id="products" className="py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-dark dark:text-white font-heading mb-4">
              Industrial Swab Products
            </h2>
            <p className="text-lg text-brand-secondary dark:text-gray-300 max-w-2xl mx-auto">
              Explore our range of specialised cleaning solutions designed for industrial applications.
            </p>
          </div>
          
          <ProductGrid products={products} initialCategory="Industrial Swabs" />
        </div>
      </section>
    </main>
  );
} 