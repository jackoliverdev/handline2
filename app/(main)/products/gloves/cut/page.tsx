import { Metadata } from "next";
import { getAllProducts } from "@/lib/products-service";
import { GlovesHero } from "@/components/website/products/hero-gloves";
import { CategoryInfo } from "@/components/website/products/category-info";
import { ProductGrid } from "@/components/website/products/product-grid";

export const metadata: Metadata = {
  title: "Cut-Resistant Gloves | HandLine Company",
  description: "Superior cut protection gloves with Level 5 resistance. Advanced materials for maximum safety without compromising dexterity.",
};

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function CutGlovesPage() {
  // Get all products and filter for cut-resistant gloves
  const { products } = await getAllProducts();
  
  // Filter products for cut category
  const cutProducts = products.filter(product => 
    product.category?.toLowerCase().includes('cut') || 
    product.sub_category?.toLowerCase().includes('cut') ||
    product.name?.toLowerCase().includes('cut') ||
    product.features?.some(feature => feature.toLowerCase().includes('cut')) ||
    product.cut_resistance_level !== null
  );

  return (
    <main className="bg-brand-light dark:bg-background">
      <GlovesHero />
      
      <CategoryInfo
        title="Cut-Resistant Gloves"
        description="Our cut-resistant gloves provide superior protection against cuts and lacerations whilst maintaining exceptional dexterity and comfort. Engineered with advanced materials and tested to achieve Level 5 cut resistance, these gloves are essential for workers handling sharp materials, glass, metal fabrication, and precision assembly operations."
        imageSrc="https://bsrdkfjapuvbzultcela.supabase.co/storage/v1/object/public/products/Categories/cut_resistant_gloves.png"
        imageAlt="Cut-Resistant Safety Gloves"
      />
      
      <section id="products" className="py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-dark dark:text-white font-heading mb-4">
              Cut-Resistant Products
            </h2>
            <p className="text-lg text-brand-secondary dark:text-gray-300 max-w-2xl mx-auto">
              Explore our complete range of cut-resistant gloves designed for maximum protection against sharp objects.
            </p>
          </div>
          
          <ProductGrid products={cutProducts} initialCategory="Cut Resistant Gloves" />
        </div>
      </section>
    </main>
  );
} 