"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

const SPRING_CONFIG = { stiffness: 100, damping: 30, mass: 1 };

interface CategoryCardProps {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  href: string;
  index: number;
}

export const CategoryCard = ({ title, description, imageSrc, imageAlt, href, index }: CategoryCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ...SPRING_CONFIG, delay: index * 0.1 }}
      className="group"
    >
      <Link href={href} className="block">
        <div className="relative bg-[#F5EFE0]/80 dark:bg-transparent rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-brand-primary/10 dark:border-brand-primary/20 group-hover:border-brand-primary/20 backdrop-blur-sm dark:backdrop-blur-none">
          {/* Image */}
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
          
          {/* Content */}
          <div className="p-6">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h3 className="text-xl font-bold text-brand-dark dark:text-white font-heading mb-2 group-hover:text-brand-primary transition-colors duration-300">
                  {title}
                </h3>
                <p className="text-brand-secondary dark:text-gray-300 text-sm leading-relaxed">
                  {description}
                </p>
              </div>
              <ChevronRight className="h-5 w-5 text-brand-primary opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300 flex-shrink-0 mt-1" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}; 