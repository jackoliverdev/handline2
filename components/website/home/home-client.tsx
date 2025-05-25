"use client";

import { Hero } from "@/components/website/home/hero";
import { ExpertiseSection } from "@/components/website/home/expertise-section";
import { IndustrySolutions } from "@/components/website/home/industry-solutions";
import { FeaturedProducts } from "@/components/website/home/featured-products";

export function HomeClient() {
  return (
    <>
      <Hero />
      <ExpertiseSection />
      <FeaturedProducts />
      <IndustrySolutions />
    </>
  );
} 