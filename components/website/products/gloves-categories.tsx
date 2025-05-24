"use client";

import React from "react";
import { CategoryCard } from "./category-card";

export const GlovesCategories = () => {
  const subcategories = [
    {
      title: "Heat-Resistant Gloves",
      description: "Advanced thermal protection for high-temperature environments up to 350°C",
      imageSrc: "https://bsrdkfjapuvbzultcela.supabase.co/storage/v1/object/public/products/Categories/heat_resistant_gloves.png",
      imageAlt: "Heat-Resistant Gloves",
      href: "/products/gloves/heat"
    },
    {
      title: "Cut-Resistant Gloves",
      description: "Superior protection against cuts and lacerations with Level 5 resistance",
      imageSrc: "https://bsrdkfjapuvbzultcela.supabase.co/storage/v1/object/public/products/Categories/cut_resistant_gloves.png",
      imageAlt: "Cut-Resistant Gloves", 
      href: "/products/gloves/cut"
    },
    {
      title: "General Purpose Gloves",
      description: "Versatile protection for everyday industrial tasks and construction work",
      imageSrc: "https://bsrdkfjapuvbzultcela.supabase.co/storage/v1/object/public/products/Categories/general_purpose_gloves.png",
      imageAlt: "General Purpose Gloves",
      href: "/products/gloves/general"
    }
  ];

  return (
    <section id="glove-categories" className="py-12 md:py-16">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-dark dark:text-white font-heading mb-4">
            Glove Categories
          </h2>
          <p className="text-lg text-brand-secondary dark:text-gray-400 max-w-2xl mx-auto">
            Choose the right protection for your specific workplace hazards and requirements.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {subcategories.map((subcategory, index) => (
            <CategoryCard
              key={subcategory.href}
              title={subcategory.title}
              description={subcategory.description}
              imageSrc={subcategory.imageSrc}
              imageAlt={subcategory.imageAlt}
              href={subcategory.href}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}; 