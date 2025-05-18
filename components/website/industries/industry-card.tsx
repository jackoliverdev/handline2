"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Factory, Shield } from "lucide-react";
import { Industry as IndustryType } from "@/lib/industries-service";

export interface IndustryCardProps {
  industry: IndustryType;
  t: (key: string) => string;
}

export const IndustryCard: React.FC<IndustryCardProps> = ({ industry, t }) => {
  // Use localised features array, fallback to contact message if empty
  const features = industry.features && industry.features.length > 0 ? industry.features : [t('industries.contactForDetails')];

  return (
    <div className="group relative overflow-hidden rounded-lg border bg-[#F5EFE0]/80 dark:bg-transparent shadow-sm transition-all duration-300 hover:shadow-md border-brand-primary/10 dark:border-brand-primary/20 backdrop-blur-sm dark:backdrop-blur-none h-full flex flex-col">
      {/* Industry Image */}
      <Link href={`/industries/${industry.slug}`} className="block overflow-hidden">
        <div className="relative h-48 w-full overflow-hidden bg-white dark:bg-transparent">
          {industry.image_url ? (
            <Image
              src={industry.image_url}
              alt={industry.industry_name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-gray-100 dark:bg-transparent">
              <Factory className="h-16 w-16 text-gray-400 dark:text-gray-500" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h3 className="text-xl font-bold text-white drop-shadow-sm">
              {industry.industry_name}
            </h3>
          </div>
        </div>
      </Link>
      
      {/* Industry Details */}
      <div className="p-4 flex-1 flex flex-col">
        <p className="mb-4 text-sm text-brand-secondary dark:text-gray-300 line-clamp-3">
          {industry.description.split('\n\n')[0] || industry.description}
        </p>
        
        {/* Key Features */}
        {features && features.length > 0 && (
          <div className="mb-4 mt-auto">
            <h4 className="text-sm font-medium text-brand-dark dark:text-white mb-2 flex items-center">
              <Shield className="mr-1 h-4 w-4 text-brand-primary" />
              <span>{t('industries.keyFeatures')}</span>
            </h4>
            <div className="flex flex-wrap gap-1">
              {features.slice(0, 3).map((feature, index) => (
                <Badge key={index} variant="outline" className="text-xs bg-brand-primary/5 border-brand-primary/20">
                  {feature.length > 30 ? feature.substring(0, 30) + '...' : feature}
                </Badge>
              ))}
              {features.length > 3 && (
                <Badge variant="outline" className="text-xs bg-brand-primary/5 border-brand-primary/20">
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
          className="mt-auto w-full flex items-center justify-between bg-brand-primary text-white hover:bg-brand-primary/90"
          asChild
        >
          <Link href={`/industries/${industry.slug}`}>
            <span>{t('industries.viewSolutions')}</span>
            <ArrowRight className="h-4 w-4 ml-1" />
          </Link>
        </Button>
      </div>
    </div>
  );
}; 