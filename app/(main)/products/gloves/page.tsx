import { Metadata } from "next";
import { GlovesHero } from "@/components/website/products/hero-gloves";
import { CategoryInfo } from "@/components/website/products/category-info";
import { GlovesCategories } from "@/components/website/products/gloves-categories";

export const metadata: Metadata = {
  title: "Safety Gloves | HandLine Company",
  description: "Browse our range of high-performance industrial safety gloves including heat-resistant, cut-resistant, and general purpose gloves.",
};

export default function GlovesPage() {
  return (
    <main className="bg-brand-light dark:bg-background">
      <GlovesHero />
      
      <CategoryInfo
        title="Safety Gloves"
        description="Our comprehensive range of safety gloves provides superior protection across all industrial applications. From extreme heat resistance to advanced cut protection, our gloves are designed with precision engineering and tested to exceed industry standards. Each category is specifically tailored to meet the unique challenges of different work environments while maintaining comfort and dexterity."
        imageSrc="https://bsrdkfjapuvbzultcela.supabase.co/storage/v1/object/public/products/Categories/Safety_Gloves.png"
        imageAlt="Hand Line Safety Gloves"
      />
      
      <GlovesCategories />
    </main>
  );
} 