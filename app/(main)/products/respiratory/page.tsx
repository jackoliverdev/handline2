import { Metadata } from "next";
import { getAllProducts } from "@/lib/products-service";
import { RespiratoryHero } from "@/components/website/products/hero-respiratory";
import { CategoryInfo } from "@/components/website/products/category-info";
import { ProductGrid } from "@/components/website/products/product-grid";

export const metadata: Metadata = {
  title: "Respiratory Protection | HandLine Company",
  description: "Advanced respiratory protection equipment for hazardous environments. Professional-grade masks and breathing apparatus.",
};

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function RespiratoryPage() {
  // Get all products
  const { products } = await getAllProducts();

  return (
    <main className="bg-brand-light dark:bg-background">
      <RespiratoryHero />
      
      <CategoryInfo
        title="Respiratory Protection"
        description="Our respiratory protection equipment provides advanced protection against airborne hazards in industrial environments. From dust masks to full-face respirators, our products are designed to meet the highest safety standards whilst ensuring comfort during extended use. Essential for construction, manufacturing, chemical processing, and any environment with airborne contaminants."
        imageSrc="https://bsrdkfjapuvbzultcela.supabase.co/storage/v1/object/public/products/Categories/respiratory_protection.png"
        imageAlt="Respiratory Protection Equipment"
      />
      
      <section id="products" className="py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-dark dark:text-white font-heading mb-4">
              Respiratory Protection Products
            </h2>
            <p className="text-lg text-brand-secondary dark:text-gray-300 max-w-2xl mx-auto">
              Browse our complete range of respiratory protection equipment for hazardous environments.
            </p>
          </div>
          
          <ProductGrid products={products} initialCategory="Respiratory Protection" />
        </div>
      </section>
    </main>
  );
} 