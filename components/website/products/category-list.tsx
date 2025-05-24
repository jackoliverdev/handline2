"use client";

import { CategoryCard } from "./category-card";

export const CategoryList = () => {
  const categories = [
    {
      title: "Safety Gloves",
      description: "High-performance protective gloves for all industrial applications",
      imageSrc: "https://bsrdkfjapuvbzultcela.supabase.co/storage/v1/object/public/products/Categories/Safety_Gloves.png",
      imageAlt: "Safety Gloves",
      href: "/products/gloves"
    },
    {
      title: "Industrial Swabs",
      description: "Specialised cleaning and maintenance solutions for industrial environments",
      imageSrc: "https://bsrdkfjapuvbzultcela.supabase.co/storage/v1/object/public/products/Categories/Industrial_swabs.png", 
      imageAlt: "Industrial Swabs",
      href: "/products/industrial-swabs"
    },
    {
      title: "Respiratory Protection",
      description: "Advanced respiratory protection equipment for hazardous environments",
      imageSrc: "https://bsrdkfjapuvbzultcela.supabase.co/storage/v1/object/public/products/Categories/respiratory_protection.png",
      imageAlt: "Respiratory Protection",
      href: "/products/respiratory"
    }
  ];

  return (
    <section id="product-categories" className="py-16">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-dark dark:text-white font-heading mb-4">
            Product Categories
          </h2>
          <p className="text-lg text-brand-secondary dark:text-gray-300 max-w-2xl mx-auto">
            Explore our comprehensive range of industrial safety products designed to protect workers across various industries.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <CategoryCard
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
      </div>
    </section>
  );
}; 