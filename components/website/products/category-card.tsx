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
      className="group h-full"
    >
      <Link href={href} className="block h-full">
        <div className="relative bg-white dark:bg-black/50 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 dark:border-gray-700/50 group-hover:border-brand-primary/50 backdrop-blur-sm h-full flex flex-col">
          {/* Image */}
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              className="object-contain p-4 transition-transform duration-700 group-hover:scale-105"
            />
            {/* Brand gradient overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </div>
          
          {/* Content */}
          <div className="p-6 flex-1 flex flex-col">
            <div className="flex items-start justify-between gap-4 flex-1">
              <div className="flex-1 flex flex-col h-full">
                <h3 className="text-lg font-bold text-brand-dark dark:text-white font-heading mb-3 group-hover:text-brand-primary transition-colors duration-300 leading-tight">
                  {title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed flex-1 line-clamp-3">
                  {description}
                </p>
              </div>
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-brand-primary/10 group-hover:bg-brand-primary group-hover:scale-110 transition-all duration-300 flex-shrink-0 mt-1">
                <ChevronRight className="h-4 w-4 text-brand-primary group-hover:text-white transition-all duration-300" />
              </div>
            </div>
          </div>
          
          {/* Enhanced hover effect overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/0 via-transparent to-brand-primary/0 group-hover:from-brand-primary/5 group-hover:to-brand-primary/5 transition-all duration-500 pointer-events-none rounded-2xl" />
          
          {/* Bottom accent line */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-primary/0 via-brand-primary to-brand-primary/0 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center" />
        </div>
      </Link>
    </motion.div>
  );
}; 