"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

const SPRING_CONFIG = { stiffness: 100, damping: 30, mass: 1 };

interface ResourcesCategoryCardProps {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  href: string;
  index: number;
}

export const ResourcesCategoryCard = ({ title, description, imageSrc, imageAlt, href, index }: ResourcesCategoryCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ...SPRING_CONFIG, delay: index * 0.1 }}
      className="group"
    >
      <Link href={href} className="block">
        <div className="relative bg-white dark:bg-black/50 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 dark:border-gray-700/50 group-hover:border-brand-primary/30 backdrop-blur-sm h-full">
          {/* Image */}
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            {/* Hover overlay with brand color tint */}
            <div className="absolute inset-0 bg-brand-primary/0 group-hover:bg-brand-primary/10 transition-colors duration-500" />
          </div>
          
          {/* Content */}
          <div className="p-6">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h3 className="text-xl font-bold text-brand-dark dark:text-white font-heading mb-3 group-hover:text-brand-primary transition-colors duration-300">
                  {title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                  {description}
                </p>
              </div>
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-brand-primary/10 group-hover:bg-brand-primary group-hover:scale-110 transition-all duration-300 flex-shrink-0">
                <ChevronRight className="h-5 w-5 text-brand-primary group-hover:text-white transition-all duration-300" />
              </div>
            </div>
          </div>
          
          {/* Enhanced hover effect overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/0 to-brand-primary/0 group-hover:from-brand-primary/5 group-hover:to-transparent transition-all duration-500 pointer-events-none rounded-2xl" />
        </div>
      </Link>
    </motion.div>
  );
}; 