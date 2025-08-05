"use client";

import React from 'react';
import Image from 'next/image';
import { Badge } from "@/components/ui/badge";
import { 
  Tags, 
  Package, 
  Ruler, 
  Shield, 
  CheckCircle, 
  Clock, 
  AlertTriangle,
  XCircle
} from "lucide-react";
import { AvailabilityStatus } from "@/lib/products-service";
import { useLanguage } from "@/lib/context/language-context";

interface ProductInfoDisplayProps {
  brands: string[];
  tags_locales: Record<string, string[]>;
  size_locales?: Record<string, string> | null;
  length_cm?: number | null;
  ce_category?: string | null;
  availability_status: AvailabilityStatus;
  coming_soon: boolean;
  className?: string;
}

// Brand logo mapping
const getBrandLogo = (brandName: string) => {
  switch (brandName) {
    case 'Hand Line':
      return '/brands/HLC_Scritta.png';
    case 'ProGloves Heat':
      return '/brands/proheat.png';
    case 'ProGloves Cut':
      return '/brands/procut.png';
    default:
      return null;
  }
};

// Availability status configuration
const getAvailabilityConfig = (status: AvailabilityStatus, coming_soon: boolean) => {
  if (coming_soon) {
    return {
      icon: <Clock className="h-3 w-3" />,
      label: 'Coming Soon',
      className: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800'
    };
  }
  
  switch (status) {
    case 'in_stock':
      return {
        icon: <CheckCircle className="h-3 w-3" />,
        label: 'In Stock',
        className: 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800'
      };
    case 'made_to_order':
      return {
        icon: <Package className="h-3 w-3" />,
        label: 'Made to Order',
        className: 'bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400 dark:border-yellow-800'
      };
    case 'out_of_stock':
      return {
        icon: <XCircle className="h-3 w-3" />,
        label: 'Out of Stock',
        className: 'bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800'
      };
    case 'coming_soon':
      return {
        icon: <Clock className="h-3 w-3" />,
        label: 'Coming Soon',
        className: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800'
      };
    default:
      return {
        icon: <AlertTriangle className="h-3 w-3" />,
        label: 'Unknown',
        className: 'bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-900/20 dark:text-gray-400 dark:border-gray-800'
      };
  }
};

export const ProductInfoDisplay: React.FC<ProductInfoDisplayProps> = ({
  brands,
  tags_locales,
  size_locales,
  length_cm,
  ce_category,
  availability_status,
  coming_soon,
  className = ""
}) => {
  const { t, language } = useLanguage();
  
  // Get localised tags
  const tags = tags_locales?.[language] || tags_locales?.en || [];
  const size = size_locales?.[language] || size_locales?.en || null;
  const availabilityConfig = getAvailabilityConfig(availability_status, coming_soon);
  
  // Determine if we have multiple brands to adjust layout
  const hasMultipleBrands = brands.length > 1;
  const hasManyBrands = brands.length > 2; // Added for new layout
  
  return (
    <div className={`bg-white dark:bg-black/50 rounded-lg border border-brand-primary/10 dark:border-brand-primary/20 p-4 ${className}`}>
      {/* 12-column grid for proper spacing */}
      <div className="grid grid-cols-12 gap-4">
        {/* Headers Row */}
        <div className="col-span-3 flex items-center gap-1">
          <Package className="h-3 w-3 text-brand-primary" />
          <span className="text-xs font-medium text-brand-dark dark:text-white">{t('productPage.productInfo.availability')}</span>
        </div>

        <div className="col-span-3 flex items-center gap-1">
          <Shield className="h-3 w-3 text-brand-primary" />
          <span className="text-xs font-medium text-brand-dark dark:text-white">{t('productPage.productInfo.brand')}</span>
        </div>

        <div className="col-span-3 flex items-center gap-1">
          <Ruler className="h-3 w-3 text-brand-primary" />
          <span className="text-xs font-medium text-brand-dark dark:text-white">{t('productPage.productInfo.size')}</span>
        </div>

        <div className="col-span-3 flex items-center gap-1">
          <Ruler className="h-3 w-3 text-brand-primary" />
          <span className="text-xs font-medium text-brand-dark dark:text-white">{t('productPage.productInfo.length')}</span>
        </div>
        
        {/* Values Row */}
        <div className="col-span-3 flex justify-start">
          <Badge className={`${availabilityConfig.className} flex items-center gap-1 text-xs py-1 px-2`}>
            {availabilityConfig.icon}
            {availabilityConfig.label}
          </Badge>
        </div>
        
        <div className="col-span-3 flex justify-start">
          {brands.length > 0 ? (
            <div className="flex items-center gap-1.5 flex-wrap w-full">
              {brands.map((brand, index) => {
                const logoPath = getBrandLogo(brand);
                
                if (logoPath) {
                  return (
                    <div 
                      key={index}
                      className="relative flex items-center bg-white dark:bg-gray-800 border border-brand-primary/20 rounded px-2 py-1 h-6 w-auto"
                    >
                      <Image
                        src={logoPath}
                        alt={brand}
                        width={60}
                        height={20}
                        className="object-contain dark:invert"
                      />
                    </div>
                  );
                } else {
                  return (
                    <Badge 
                      key={index}
                      variant="outline" 
                      className="text-xs py-1 px-2 bg-brand-primary/5 border-brand-primary/20 text-brand-dark dark:text-white"
                    >
                      {brand}
                    </Badge>
                  );
                }
              })}
            </div>
          ) : (
            <span className="text-xs text-brand-secondary dark:text-gray-400">-</span>
          )}
        </div>
        
        <div className="col-span-3 flex justify-start">
          {size ? (
            <Badge 
              variant="outline" 
              className="text-xs py-0.5 px-2 bg-brand-primary/5 border-brand-primary/20"
            >
              {size}
            </Badge>
          ) : (
            <span className="text-xs text-brand-secondary dark:text-gray-400">-</span>
          )}
        </div>
        
        <div className="col-span-3 flex justify-start">
          {length_cm ? (
            <Badge 
              variant="outline" 
              className="text-xs py-0.5 px-2 bg-brand-primary/5 border-brand-primary/20"
            >
              {length_cm} cm
            </Badge>
          ) : (
            <span className="text-xs text-brand-secondary dark:text-gray-400">-</span>
          )}
        </div>
      </div>
    </div>
  );
}; 