"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Factory, Shield } from "lucide-react";
import { Industry as IndustryType } from "@/lib/industries-service";
import { motion } from "framer-motion";

export interface IndustryCardProps {
  industry: IndustryType;
  t: (key: string) => string;
  index?: number;
}

export const IndustryCard: React.FC<IndustryCardProps> = ({ industry, t, index = 0 }) => {
  // Use localised features array, fallback to contact message if empty
  const features = industry.features && industry.features.length > 0 ? industry.features : [t('industries.contactForDetails')];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: Math.min(index * 0.1, 0.8),
        duration: 0.5,
        ease: [0.21, 0.47, 0.32, 0.98]
      }}
      className="group relative overflow-hidden rounded-2xl bg-white dark:bg-black/50 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-gray-700/50 backdrop-blur-sm h-full flex flex-col"
    >
      {/* Industry Image */}
      <Link href={`/industries/${industry.slug}`} className="block overflow-hidden">
        <div className="relative h-48 w-full overflow-hidden">
          {industry.image_url ? (
            <Image
              src={industry.image_url}
              alt={industry.industry_name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-gray-100 dark:bg-black/30">
              <Factory className="h-16 w-16 text-gray-400 dark:text-gray-500" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          <div className="absolute inset-0 bg-brand-primary/0 group-hover:bg-brand-primary/10 transition-colors duration-300" />
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h3 className="text-xl font-bold text-white drop-shadow-lg">
              {industry.industry_name}
            </h3>
          </div>
        </div>
      </Link>
      
      {/* Industry Details */}
      <div className="p-6 flex-1 flex flex-col space-y-4">
        <p className="text-sm text-brand-secondary dark:text-gray-300 leading-relaxed line-clamp-3">
          {industry.description.split('\n\n')[0] || industry.description}
        </p>
        
        {/* Key Features */}
        {features && features.length > 0 && (
          <div className="flex-1">
            <h4 className="text-sm font-semibold text-brand-dark dark:text-white mb-3 flex items-center">
              <div className="mr-2 p-1.5 bg-brand-primary/10 rounded-full">
                <Shield className="h-4 w-4 text-brand-primary" />
              </div>
              <span>{t('industries.keyFeatures')}</span>
            </h4>
            <div className="flex flex-wrap gap-2">
              {features.slice(0, 3).map((feature, index) => (
                <Badge 
                  key={index} 
                  variant="outline" 
                  className="text-xs border-brand-primary/30 text-brand-primary bg-brand-primary/5 hover:bg-brand-primary/10 transition-colors"
                >
                  {feature.length > 30 ? feature.substring(0, 30) + '...' : feature}
                </Badge>
              ))}
              {features.length > 3 && (
                <Badge variant="outline" className="text-xs border-gray-300 text-gray-600">
                  +{features.length - 3}
                </Badge>
              )}
            </div>
          </div>
        )}
        
        {/* Button */}
        <Button 
          variant="default" 
          size="sm" 
          className="mt-auto w-full bg-[#F28C38] hover:bg-[#F28C38]/90 text-white font-medium transition-all duration-300 hover:scale-105 hover:shadow-xl transform"
          asChild
        >
          <Link href={`/industries/${industry.slug}`} className="flex items-center justify-center">
            <span>{t('industries.viewSolutions')}</span>
            <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </div>

      {/* Hover Effect Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/0 to-brand-primary/0 group-hover:from-brand-primary/5 group-hover:to-transparent transition-all duration-500 pointer-events-none rounded-2xl" />
    </motion.div>
  );
}; 