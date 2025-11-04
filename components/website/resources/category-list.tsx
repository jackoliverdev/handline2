"use client";

import { ResourcesCategoryCard } from "./category-card";
import { useLanguage } from "@/lib/context/language-context";
import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";
import Link from "next/link";

export const ResourcesCategoryList = () => {
  const { t } = useLanguage();
  
  const categories = [
    {
      title: "Blog & Articles",
      description: "Expert insights about industrial safety gloves, protective equipment, and best practices for workplace hand protection.",
      imageSrc: "https://bsrdkfjapuvbzultcela.supabase.co/storage/v1/object/public/industries//General_Use.png",
      imageAlt: "Blog Articles",
      href: "/resources/blog"
    },
    {
      title: "Case Studies",
      description: "Real-world examples of how our safety solutions have transformed workplace protection across various industries.",
      imageSrc: "https://bsrdkfjapuvbzultcela.supabase.co/storage/v1/object/public/industries//Merallurgy&Foundry.png",
      imageAlt: "Case Studies",
      href: "/resources/case-studies"
    },
    {
      title: `${t('standards.hero.title')} ${t('standards.hero.titleAccent')}`,
      description: t('standards.hero.description'),
      imageSrc: "https://bsrdkfjapuvbzultcela.supabase.co/storage/v1/object/public/industries//Glass_Manufacturing.png",
      imageAlt: t('standards.grid.badge'),
      href: "/resources/ppe-standards"
    },
    {
      title: "Compliance Declarations",
      description: "Official declarations of conformity certifying that our products meet all European health, safety, and environmental protection standards.",
      imageSrc: "https://bsrdkfjapuvbzultcela.supabase.co/storage/v1/object/public/industries//Construction.png",
      imageAlt: "Compliance Declarations",
      href: "/resources/declarations"
    },
    {
      title: "Product Disclaimer",
      description: "Important information regarding the proper use, limitations, and care of Hand Line safety gloves and protective equipment.",
      imageSrc: "https://bsrdkfjapuvbzultcela.supabase.co/storage/v1/object/public/industries//chemical.png",
      imageAlt: "Product Disclaimer",
      href: "/resources/product-disclaimer"
    }
  ];

  return (
    <section id="resource-categories" className="pt-4 pb-12">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Hero pill, title and subtitle removed per brief */}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.slice(0, 3).map((category, index) => (
            <ResourcesCategoryCard
              key={category.href}
              title={category.title}
              description={category.description}
              imageSrc={category.imageSrc}
              imageAlt={category.imageAlt}
              href={category.href}
              index={index}
            />
          ))}
        </div>
        
        {/* Second row with 2 cards centered */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 max-w-4xl mx-auto">
          {categories.slice(3).map((category, index) => (
            <ResourcesCategoryCard
              key={category.href}
              title={category.title}
              description={category.description}
              imageSrc={category.imageSrc}
              imageAlt={category.imageAlt}
              href={category.href}
              index={index + 3}
            />
          ))}
        </div>
      </div>
    </section>
  );
}; 