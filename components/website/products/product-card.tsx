"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Flame, Scissors, ArrowRight, Eye, ListChecks, Shield, Hammer, Snowflake } from "lucide-react";
import { Product } from "@/lib/products-service";
import { ProductPreviewModal } from "./product-preview-modal";
import { useLanguage } from "@/lib/context/language-context";

// Green color scheme function for safety standards (scaled down version)
const getGreenPerformanceColour = (value: number | string | null): string => {
  if (value === null || value === 'X' || value === '') {
    return 'bg-white border border-gray-300 text-gray-900'; // White background with grey border for X
  }
  
  // Handle letter grades A-F for EN388 ISO 13997: F is highest protection (darkest), A is lowest (lightest)
  if (typeof value === 'string' && /^[A-F]$/.test(value)) {
    switch (value) {
      case 'A':
        return 'bg-emerald-200 text-white';
      case 'B':
        return 'bg-emerald-300 text-white';
      case 'C':
        return 'bg-emerald-400 text-white';
      case 'D':
        return 'bg-emerald-500 text-white';
      case 'E':
        return 'bg-emerald-600 text-white';
      case 'F':
        return 'bg-emerald-700 text-white'; // Darkest green for highest performance
      default:
        return 'bg-gray-400 text-white';
    }
  }
  
  const numValue = typeof value === 'number' ? value : parseInt(value.toString());
  if (isNaN(numValue)) {
    return 'bg-gray-400 text-white';
  }
  
  // Professional green color scheme - higher levels get darker green
  switch (numValue) {
    case 1:
      return 'bg-emerald-200 text-white'; // Light professional green
    case 2:
      return 'bg-emerald-300 text-white'; 
    case 3:
      return 'bg-emerald-500 text-white'; // Medium green
    case 4:
      return 'bg-emerald-600 text-white';
    case 5:
      return 'bg-emerald-700 text-white'; // Darkest green for highest performance
    default:
      if (numValue > 5) return 'bg-emerald-800 text-white'; // Even darker for values above 5
      return 'bg-emerald-200 text-white'; // Default to light green
  }
};

// Parse EN388 values from string like "EN388: 3544CX"
const parseEN388 = (cutLevel: string): (string | number)[] => {
  const match = cutLevel.match(/EN388:\s*(\d|X)(\d|X)(\d|X)(\d|X)([A-F]|X)?([A-F]|X)?/);
  if (match) {
    return [
      match[1] === 'X' ? 'X' : parseInt(match[1]), // abrasion
      match[2] === 'X' ? 'X' : parseInt(match[2]), // cut
      match[3] === 'X' ? 'X' : parseInt(match[3]), // tear
      match[4] === 'X' ? 'X' : parseInt(match[4]), // puncture
      match[5] || 'X', // iso_13997
      match[6] || 'X'  // impact
    ];
  }
  return [];
};

// Parse EN407 values from string like "EN407: 422241"
const parseEN407 = (heatLevel: string): (string | number)[] => {
  const match = heatLevel.match(/EN407:\s*(\d|X)(\d|X)(\d|X)(\d|X)(\d|X)?(\d|X)?/);
  if (match) {
    return [
      match[1] === 'X' ? 'X' : parseInt(match[1]), // flame
      match[2] === 'X' ? 'X' : parseInt(match[2]), // contact
      match[3] === 'X' ? 'X' : parseInt(match[3]), // convective
      match[4] === 'X' ? 'X' : parseInt(match[4]), // radiant
      match[5] === 'X' ? 'X' : parseInt(match[5] || '0'), // small splashes
      match[6] === 'X' ? 'X' : parseInt(match[6] || '0')  // large splashes
    ];
  }
  return [];
};

export interface ProductCardProps {
  product: Product;
  onProductClick?: (product: Product) => void;
  index?: number;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onProductClick, index = 0 }) => {
  // Check if the product is new (created within the last 30 days)
  const isNew = new Date(product.created_at).getTime() > Date.now() - (30 * 24 * 60 * 60 * 1000);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const { t } = useLanguage();
  
  const handlePreviewClick = () => {
    setShowPreviewModal(true);
  };
  
  const handleModalClose = () => {
    setShowPreviewModal(false);
  };

  // Always build URLs from the English name to keep slugs stable across locales
  const slugSource = (product as any).name_locales?.en || product.name;
  const encodedProductName = encodeURIComponent(slugSource);

  // Get applications with conditional limit based on number of standards shown
  const hasMultipleStandards = !!(product.cut_resistance_level && product.heat_resistance_level);
  const applicationsLimit = hasMultipleStandards ? 3 : 4;
  const topApplications = product.applications ? product.applications.slice(0, applicationsLimit) : [];

  // Head protection standards row (icons + labels) – matches glove standards row compact styling
  const renderHeadStandardsRow = () => {
    const hs: any = (product as any).head_standards;
    const categoryLower = (product.category || '').toLowerCase();
    const subCategoryLower = (product.sub_category || '').toLowerCase();
    const isHead = categoryLower.includes('head') || categoryLower.includes('testa') || 
                   subCategoryLower.includes('helmet') || subCategoryLower.includes('casco') || 
                   subCategoryLower.includes('bump') || subCategoryLower.includes('berretto');
    if (!isHead || !hs) return null;
    const standards: { code: string }[] = [];
    if (hs?.en397?.present) standards.push({ code: 'EN 397' });
    if (hs?.en50365) standards.push({ code: 'EN 50365' });
    if (hs?.en12492) standards.push({ code: 'EN 12492' });
    if (hs?.en812) standards.push({ code: 'EN 812' });
    if (!standards.length) return null;
    return (
      <div className="flex flex-wrap gap-2">
        {standards.map(({ code }) => (
          <div key={code} className="flex items-center gap-1.5">
            <Shield className="h-3 w-3 text-brand-primary" />
            <span className="text-xs font-semibold text-gray-700 dark:text-gray-300 whitespace-nowrap">{code}</span>
          </div>
        ))}
      </div>
    );
  };

  const renderFootwearStandardsRow = () => {
    const fs: any = (product as any).footwear_standards;
    const fa: any = (product as any).footwear_attributes;
    const categoryLower = (product.category || '').toLowerCase();
    const subCategoryLower = (product.sub_category || '').toLowerCase();
    const isFootwear = categoryLower.includes('footwear') || categoryLower.includes('calzature') ||
                       subCategoryLower.includes('boot') || subCategoryLower.includes('stivali') || subCategoryLower.includes('scarponi') ||
                       subCategoryLower.includes('insol') || subCategoryLower.includes('solette');
    if (!isFootwear || (!fs && !fa)) return null;
    
    // Build the EN ISO 20345 marking string
    const codes: string[] = [];
    
    // Add class from attributes
    if (fa?.class) {
      codes.push(fa.class);
    }
    
    // Add codes from EN ISO 20345:2022 standards
    if (Array.isArray(fs?.en_iso_20345_2022)) {
      codes.push(...fs.en_iso_20345_2022.filter((code: string) => code !== fa?.class));
    }
    
    if (!codes.length) return null;
    
    const markingText = `EN ISO 20345 ${codes.join(' ')}`;
    
    return (
      <div className="flex items-center gap-1.5">
        <div className="flex h-3 w-3 items-center justify-center">
          <div className="relative w-3 h-3">
            <Image
              src="/icons/EN-ISO-20345.png"
              alt="EN ISO 20345"
              fill
              className="object-contain dark:invert"
            />
          </div>
        </div>
        <span className="text-xs font-semibold text-gray-700 dark:text-gray-300 whitespace-nowrap">{markingText}</span>
      </div>
    );
  };

  const renderHearingStandardsRow = () => {
    const hs: any = (product as any).hearing_standards;
    const cat = (product.category || '').toLowerCase();
    const sub = (product.sub_category || '').toLowerCase();
    // English and Italian keywords for hearing protection
    const isHearing = cat.includes('hearing') || cat.includes('uditiv') || cat.includes('protezione uditiva') || 
                      sub.includes('ear') || sub.includes('orecch') || sub.includes('tappi') || sub.includes('cuffie');
    if (!isHearing || !hs?.en352) return null;
    
    // Build the EN 352 marking string
    const codes: string[] = [];
    
    // Add EN 352 parts (e.g., "EN 352-2")
    if (Array.isArray(hs.en352.parts)) {
      codes.push(...hs.en352.parts);
    }
    
    // Add additional requirements (e.g., "S", "V", "W", "E1")
    if (Array.isArray(hs.en352.additional)) {
      codes.push(...hs.en352.additional);
    }
    
    if (!codes.length) return null;
    
    const markingText = codes.join(' ');
    
    return (
      <div className="flex items-center gap-1.5">
        <Shield className="h-3 w-3 text-brand-primary" />
        <span className="text-xs font-semibold text-gray-700 dark:text-gray-300 whitespace-nowrap">{markingText}</span>
      </div>
    );
  };

  const renderRespiratoryStandardsRow = () => {
    const rs: any = (product as any).respiratory_standards;
    const isRespiratory = ((product.category || '').toLowerCase().includes('respir'));
    if (!isRespiratory || !rs) return null;
    
    const standards: string[] = [];
    
    // EN 149 - FFP masks (e.g., "EN 149 FFP3 NR")
    if (rs.en149?.enabled) {
      let en149Text = 'EN 149';
      if (rs.en149.class) {
        en149Text += ` ${rs.en149.class}`;
      }
      // Add reusability indicators
      if (rs.en149.nr === true) en149Text += ' NR';
      if (rs.en149.r === true) en149Text += ' R';
      if (rs.en149.d === true) en149Text += ' D';
      standards.push(en149Text);
    }
    
    // EN 166 - Eye protection (e.g., "EN 166 Class 2")
    if (rs.en166?.enabled) {
      let en166Text = 'EN 166';
      if (rs.en166.class) {
        en166Text += ` Class ${rs.en166.class}`;
      }
      standards.push(en166Text);
    }
    
    // EN 14387 - Gas filters (e.g., "EN 14387 Class 2 A B E K Hg NO")
    if (rs.en14387?.enabled) {
      let en14387Text = 'EN 14387';
      if (rs.en14387.class) {
        en14387Text += ` ${rs.en14387.class}`;
      }
      // Add gas types
      if (rs.en14387.gases) {
        const gasTypes: string[] = [];
        if (rs.en14387.gases.a) gasTypes.push('A');
        if (rs.en14387.gases.b) gasTypes.push('B');
        if (rs.en14387.gases.e) gasTypes.push('E');
        if (rs.en14387.gases.k) gasTypes.push('K');
        if (rs.en14387.gases.ax) gasTypes.push('AX');
        if (rs.en14387.gases.hg) gasTypes.push('Hg');
        if (rs.en14387.gases.no) gasTypes.push('NO');
        if (rs.en14387.gases.p) gasTypes.push('P');
        if (rs.en14387.gases.sx) gasTypes.push('SX');
        if (rs.en14387.gases.co) gasTypes.push('CO');
        if (gasTypes.length > 0) {
          en14387Text += ` ${gasTypes.join(' ')}`;
        }
      }
      standards.push(en14387Text);
    }
    
    if (!standards.length) return null;
    
    return (
      <div className="space-y-1">
        {standards.map((standard, index) => (
          <div key={index} className="flex items-center gap-1.5">
            <Shield className="h-3 w-3 text-brand-primary" />
            <span className="text-xs font-semibold text-gray-700 dark:text-gray-300 whitespace-nowrap">{standard}</span>
          </div>
        ))}
      </div>
    );
  };

  const renderClothingStandardsRow = () => {
    const cs: any = (product as any).clothing_standards;
    const categoryLower = (product.category || '').toLowerCase();
    const subCategoryLower = (product.sub_category || '').toLowerCase();
    const isClothing = (
      categoryLower.includes('cloth') || 
      categoryLower.includes('abbigliamento') || 
      subCategoryLower.includes('jacket') ||
      subCategoryLower.includes('giacc')
    );
    if (!isClothing || !cs) return null;
    
    const standards: string[] = [];
    
    // EN ISO 20471 - High visibility
    if (cs.en_iso_20471?.class) {
      standards.push('EN ISO 20471');
    }
    
    // EN ISO 11612 - Flame resistant
    if (cs.en_iso_11612 && Object.keys(cs.en_iso_11612).length > 0) {
      standards.push('EN ISO 11612');
    }
    
    // EN ISO 11611 - Welding
    if (cs.en_iso_11611?.class) {
      standards.push('EN ISO 11611');
    }
    
    // IEC 61482-2 - Arc protection
    if (cs.iec_61482_2?.class) {
      standards.push('IEC 61482-2');
    }
    
    // EN 1149-5 - Antistatic
    if (cs.en_1149_5) {
      standards.push('EN 1149-5');
    }
    
    // EN 13034 - Chemical protection
    if (cs.en_13034) {
      standards.push('EN 13034');
    }
    
    // EN 343 - Weather protection
    if (cs.en_343 && (cs.en_343.water || cs.en_343.breath)) {
      standards.push('EN 343');
    }
    
    // UV Standard 801
    if (cs.uv_standard_801) {
      standards.push('UV Standard 801');
    }
    
    if (!standards.length) return null;
    
    return (
      <div className="flex items-start gap-1.5">
        <Shield className="h-3 w-3 text-brand-primary mt-0.5 flex-shrink-0" />
        <span className="text-xs font-semibold text-gray-700 dark:text-gray-300 leading-tight break-words">{standards.join(', ')}</span>
      </div>
    );
  };

  const renderArmStandardsRow = () => {
    const categoryLower = (product.category || '').toLowerCase();
    const subCategoryLower = (product.sub_category || '').toLowerCase();
    const isArm = categoryLower.includes('arm') || categoryLower.includes('bracci') || 
                  subCategoryLower.includes('sleeve') || subCategoryLower.includes('manich');
    
    if (!isArm || !product.safety) return null;
    
    const standards: string[] = [];
    
    // EN ISO 21420 - General requirements for protective gloves
    if ((product.safety as any).en_iso_21420?.enabled) {
      standards.push('EN ISO 21420');
    }
    
    // EN 388 - Mechanical risks
    if ((product.safety as any).en388?.enabled) {
      standards.push('EN 388');
    }
    
    if (!standards.length) return null;
    
    const markingText = standards.join(' ');
    
    return (
      <div className="flex items-center gap-1.5">
        <Shield className="h-3 w-3 text-brand-primary" />
        <span className="text-xs font-semibold text-gray-700 dark:text-gray-300 whitespace-nowrap">{markingText}</span>
      </div>
    );
  };

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
      {/* Badges container - stacked vertically */}
      <div className="absolute right-3 top-3 z-20 flex flex-col gap-1">
        {/* Out of Stock Badge */}
        {product.out_of_stock && (
          <Badge className="bg-gradient-to-r from-red-500 to-red-600 text-white font-medium px-2 py-1 shadow-lg text-xs">
            {t('products.outOfStock')}
          </Badge>
        )}
        
        {/* New Badge */}
        {isNew && (
          <Badge className="bg-gradient-to-r from-brand-primary to-brand-primary text-white font-medium px-2 py-1 shadow-lg text-xs">
            {t('products.new')}
          </Badge>
        )}
      </div>
      
      {/* Product Image */}
      <Link href={`/products/${encodedProductName}`} className="block overflow-hidden">
        <div className="relative h-36 w-full overflow-hidden">
          {product.image_url ? (
            <Image
              src={product.image_url}
              alt={product.name}
              fill
              className="object-contain p-3 transition-transform duration-700 group-hover:scale-110"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-gray-100 dark:bg-gray-800">
              <span className="text-gray-400 dark:text-gray-500 font-medium text-sm">No image</span>
            </div>
          )}
          <div className="absolute inset-0 bg-brand-primary/0 group-hover:bg-brand-primary/5 transition-colors duration-300" />
        </div>
      </Link>
      
      {/* Product Details */}
      <div className="p-4 flex-1 flex flex-col space-y-2">
        {/* Category Badge */}
        <div className="flex items-center justify-between">
          <Badge 
            variant="outline" 
            className="text-xs border-brand-primary/30 text-gray-800 dark:text-brand-primary bg-brand-primary/10 hover:bg-brand-primary/20 transition-colors font-medium"
          >
            {product.category}
          </Badge>
        </div>
        
        {/* Product Name */}
        <Link href={`/products/${encodedProductName}`}>
          <h3 className="text-lg font-bold leading-tight text-gray-900 dark:text-white hover:text-brand-primary dark:hover:text-brand-primary transition-colors duration-200 line-clamp-2 group-hover:text-brand-primary">
            {product.name}
          </h3>
        </Link>
        
        {/* Safety Standards with Green Squares (Gloves) and EN166 (Eye & Face) */}
        <div className="space-y-2">
          {/* Head protection standards row (EN 397/50365/12492/812) */}
          {renderHeadStandardsRow()}
          
          {/* Footwear protection standards row (EN ISO 20345) */}
          {renderFootwearStandardsRow()}

          {/* Hearing protection standards row (EN 352) */}
          {renderHearingStandardsRow()}

          {/* Respiratory protection standards row (EN 149/166/14387) */}
          {renderRespiratoryStandardsRow()}

          {/* Clothing protection standards row (EN ISO 20471/11612/11611/13034/etc) */}
          {renderClothingStandardsRow()}

          {/* Arm protection standards row (EN ISO 21420/EN 388) */}
          {renderArmStandardsRow()}

          {(product.cut_resistance_level || product.heat_resistance_level) && (
            <>
              {/* EN Standards - Stacked vertically */}
              <div className="space-y-1.5">
                {/* EN388 Standard */}
                {product.cut_resistance_level && (
                  <div className="flex items-center gap-1.5">
                    <Hammer className="h-3 w-3 text-brand-primary flex-shrink-0" />
                    <span className="text-[10px] font-medium text-gray-700 dark:text-gray-300 min-w-[32px]">
                      EN388
                    </span>
                    <div className="flex gap-0.5">
                      {parseEN388(product.cut_resistance_level).map((value, index) => (
                        <span
                          key={index}
                          className={`text-[9px] px-0.5 py-0.5 rounded w-3 h-3 flex items-center justify-center font-medium ${getGreenPerformanceColour(value)}`}
                        >
                          {value}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* EN407 Standard */}
                {product.heat_resistance_level && (
                  <div className="flex items-center gap-1.5">
                    <Flame className="h-3 w-3 text-orange-500 flex-shrink-0" />
                    <span className="text-[10px] font-medium text-gray-700 dark:text-gray-300 min-w-[32px]">
                      EN407
                    </span>
                    <div className="flex gap-0.5">
                      {parseEN407(product.heat_resistance_level).map((value, index) => (
                        <span
                          key={index}
                          className={`text-[9px] px-0.5 py-0.5 rounded w-3 h-3 flex items-center justify-center font-medium ${getGreenPerformanceColour(value)}`}
                        >
                          {value}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </>
          )}

          {/* EN166 (Eye & Face) - Frame/Lens markings */}
          {(() => {
            const std = (product as any).eye_face_standards;
            const en166 = std?.en166;
            const categoryLower = (product.category || '').toLowerCase();
            const subCategoryLower = (product.sub_category || '').toLowerCase();
            const isEyeFace = (
              categoryLower.includes('eye') || categoryLower.includes('face') || 
              categoryLower.includes('occhi') || categoryLower.includes('viso') ||
              subCategoryLower.includes('goggle') || subCategoryLower.includes('visor') || subCategoryLower.includes('glasses') ||
              subCategoryLower.includes('occhiali') || subCategoryLower.includes('visiera') || subCategoryLower.includes('schermo')
            );
            const hasMarks = !!(en166 && (en166.frame_mark || en166.lens_mark));
            if (!isEyeFace || !hasMarks) return null;
            return (
              <div className="space-y-1.5">
                <div className="flex items-center gap-1.5">
                  <Eye className="h-3 w-3 text-brand-primary" />
                  <span className="text-[10px] font-medium text-gray-700 dark:text-gray-300 min-w-[32px]">EN166</span>
                </div>
                {en166?.frame_mark && (
                  <div className="min-w-0">
                    <span className="text-[11px] font-mono font-bold text-gray-900 dark:text-white truncate block" title={en166.frame_mark}>{en166.frame_mark}</span>
                  </div>
                )}
                {en166?.lens_mark && (
                  <div className="min-w-0">
                    <span className="text-[11px] font-mono font-bold text-gray-900 dark:text-white truncate block" title={en166.lens_mark}>{en166.lens_mark}</span>
                  </div>
                )}
              </div>
            );
          })()}
        </div>

        {/* Top 2 Applications */}
        {topApplications.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center gap-1">
              <ListChecks className="h-3 w-3 text-brand-primary" />
              <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">{t('products.applications')}</p>
            </div>
            <ul className="space-y-1">
              {topApplications.map((application, index) => (
                <li key={index} className="text-xs text-gray-600 dark:text-gray-300 flex items-start">
                  <span className="text-brand-primary mr-1">•</span>
                  <span className="line-clamp-1">{application}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        
        {/* Spacer to push buttons to bottom */}
        <div className="flex-1" />
        
        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-gray-200 dark:border-gray-700">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center justify-center border-brand-primary text-brand-primary hover:bg-white hover:text-brand-primary hover:border-brand-primary hover:shadow-lg hover:scale-105 transition-all duration-300 transform h-8"
            onClick={handlePreviewClick}
          >
            <Eye className="h-4 w-4 mr-1.5" />
            <span className="text-xs">{t('products.preview')}</span>
          </Button>
          
          <Button 
            variant="default" 
            size="sm" 
            className="bg-brand-primary hover:bg-brand-primary/90 text-white font-medium transition-all duration-300 hover:scale-105 hover:shadow-xl transform h-8"
            asChild
          >
            <Link href={`/products/${encodedProductName}`} className="flex items-center justify-center w-full">
              <span className="text-xs transition-all duration-300">{t('products.details')}</span>
              <ArrowRight className="h-3 w-3 ml-1.5 transition-all duration-300 group-hover:translate-x-2 group-hover:scale-110" />
            </Link>
          </Button>
        </div>
        
        {/* Preview Modal */}
        {showPreviewModal && (
          <ProductPreviewModal 
            product={product} 
            isOpen={showPreviewModal} 
            onClose={handleModalClose} 
          />
        )}
      </div>

      {/* Hover Effect Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/0 to-brand-primary/0 group-hover:from-brand-primary/5 group-hover:to-transparent transition-all duration-500 pointer-events-none rounded-2xl" />
    </motion.div>
  );
}; 