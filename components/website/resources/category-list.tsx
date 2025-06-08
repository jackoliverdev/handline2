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
      title: "EN Resource Centre",
      description: "Access comprehensive information on European safety standards that ensure our products meet the highest quality requirements.",
      imageSrc: "https://bsrdkfjapuvbzultcela.supabase.co/storage/v1/object/public/industries//Glass_Manufacturing.png",
      imageAlt: "EN Standards",
      href: "/resources/en-resource-centre"
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
    <section id="resource-categories" className="py-16">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <div className="flex flex-col items-center">
            <Link href="/resources" className="inline-block transition-transform duration-300 mb-4">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="inline-flex items-center rounded-full bg-white dark:bg-black/50 px-4 py-2 text-xs sm:text-sm border border-gray-100 dark:border-gray-700/50 backdrop-blur-sm cursor-pointer shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 group"
              >
                <BookOpen className="mr-1.5 h-3 w-3 sm:mr-2 sm:h-4 sm:w-4 text-brand-primary group-hover:scale-110 transition-transform duration-300" />
                <span className="text-brand-dark dark:text-white font-medium font-heading">
                  Knowledge Resources
                </span>
              </motion.div>
            </Link>
            <div className="inline-flex items-center justify-center mb-4">
              <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: "2.5rem" }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="h-1 w-10 bg-brand-primary rounded-full mr-3"
              ></motion.div>
              <h2 className="text-3xl md:text-4xl font-bold text-brand-dark dark:text-white font-heading">
                Resource Categories
              </h2>
              <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: "2.5rem" }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="h-1 w-10 bg-brand-primary rounded-full ml-3"
              ></motion.div>
            </div>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-lg text-brand-secondary dark:text-gray-300 max-w-2xl mx-auto"
            >
              Explore our comprehensive library of safety resources, standards, and expert knowledge to enhance workplace protection.
            </motion.p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 max-w-4xl mx-auto">
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