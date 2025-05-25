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
      
      <CategoryInfo categoryType="gloves" />
      
      <GlovesCategories />
    </main>
  );
} 