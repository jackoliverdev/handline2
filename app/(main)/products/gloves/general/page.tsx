import { Metadata } from "next";
import { getAllProducts } from "@/lib/products-service";
import { GlovesHero } from "@/components/website/products/hero-gloves";
import { CategoryInfo } from "@/components/website/products/category-info";
import { ProductGrid } from "@/components/website/products/product-grid";

export const metadata: Metadata = {
  title: "General Purpose Gloves | HandLine Company",
  description: "Versatile protective gloves for everyday industrial tasks and construction work. Reliable protection with superior comfort.",
};

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function GeneralGlovesPage() {
  // Get all products and filter for general purpose gloves
  const { products } = await getAllProducts();
  
  // Filter products for general category
  const generalProducts = products.filter(product => 
    product.category?.toLowerCase().includes('general') || 
    product.sub_category?.toLowerCase().includes('general') ||
    product.name?.toLowerCase().includes('general') ||
    product.features?.some(feature => feature.toLowerCase().includes('general')) ||
    // Include products that are not specifically heat or cut focused
    (!product.category?.toLowerCase().includes('heat') && 
     !product.category?.toLowerCase().includes('cut') &&
     !product.sub_category?.toLowerCase().includes('heat') &&
     !product.sub_category?.toLowerCase().includes('cut'))
  );

  return (
    <main className="bg-brand-light dark:bg-background">
      <GlovesHero />
      
      <CategoryInfo
        title="General Purpose Gloves"
        description="Our general purpose gloves provide reliable protection for everyday industrial tasks and construction work. Designed for versatility and comfort, these gloves offer excellent grip, durability, and protection for a wide range of applications including assembly work, material handling, maintenance tasks, and general construction activities."
        imageSrc="https://bsrdkfjapuvbzultcela.supabase.co/storage/v1/object/public/products/Categories/general_purpose_gloves.png"
        imageAlt="General Purpose Safety Gloves"
      />
      
      <section id="products" className="py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-dark dark:text-white font-heading mb-4">
              General Purpose Products
            </h2>
            <p className="text-lg text-brand-secondary dark:text-gray-300 max-w-2xl mx-auto">
              Browse our complete range of versatile gloves designed for everyday industrial protection.
            </p>
          </div>
          
          <ProductGrid products={generalProducts} initialCategory="General Purpose Gloves" />
        </div>
      </section>
    </main>
  );
} 