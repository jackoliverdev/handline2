import { Metadata } from "next";
import { getAllProducts } from "@/lib/products-service";
import { GlovesHero } from "@/components/website/products/hero-gloves";
import { CategoryInfo } from "@/components/website/products/category-info";
import { ProductGrid } from "@/components/website/products/product-grid";

export const metadata: Metadata = {
  title: "Heat-Resistant Gloves | HandLine Company",
  description: "Advanced thermal protection gloves for high-temperature environments up to 350°C. Superior heat resistance with comfort and dexterity.",
};

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function HeatGlovesPage() {
  // Get all products and filter for heat-resistant gloves
  const { products } = await getAllProducts();
  
  // Filter products for heat category (you may need to adjust this based on your product data structure)
  const heatProducts = products.filter(product => 
    product.category?.toLowerCase().includes('heat') || 
    product.sub_category?.toLowerCase().includes('heat') ||
    product.name?.toLowerCase().includes('heat') ||
    product.features?.some(feature => feature.toLowerCase().includes('heat'))
  );

  return (
    <main className="bg-brand-light dark:bg-background">
      <GlovesHero />
      
      <CategoryInfo
        title="Heat-Resistant Gloves"
        description="Our heat-resistant gloves provide exceptional thermal protection for workers in high-temperature environments. Engineered with advanced materials and tested to withstand temperatures up to 350°C, these gloves offer superior protection without compromising dexterity. Perfect for glass manufacturing, metalworking, welding, and other high-heat industrial applications."
        imageSrc="https://bsrdkfjapuvbzultcela.supabase.co/storage/v1/object/public/products/Categories/heat_resistant_gloves.png"
        imageAlt="Heat-Resistant Safety Gloves"
      />
      
      <section id="products" className="py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-dark dark:text-white font-heading mb-4">
              Heat-Resistant Products
            </h2>
            <p className="text-lg text-brand-secondary dark:text-gray-300 max-w-2xl mx-auto">
              Browse our complete range of heat-resistant gloves designed for extreme temperature protection.
            </p>
          </div>
          
          <ProductGrid products={heatProducts} initialCategory="Heat Resistant Gloves" />
        </div>
      </section>
    </main>
  );
} 