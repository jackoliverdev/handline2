import { Metadata } from "next";
import { Hero } from "@/components/website/home/hero";
import { ExpertiseSection } from "@/components/website/home/expertise-section";
import { IndustrySolutions } from "@/components/website/home/industry-solutions";
import { FeaturedProducts } from "@/components/website/home/featured-products";

export const metadata: Metadata = {
  title: "HandLine Company | Industrial Safety Gloves",
  description: "Italian manufacturer of high-performance safety gloves for industrial settings. 40+ years of expertise in heat-resistant and cut-resistant hand protection.",
};

export default async function HomePage() {
  return (
    <>
      <Hero />
      <ExpertiseSection />
      <FeaturedProducts />
      <IndustrySolutions />
    </>
  );
} 