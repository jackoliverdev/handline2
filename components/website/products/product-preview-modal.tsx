"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Flame, Scissors, ArrowRight, X, Snowflake, Move, Shield, Hammer } from "lucide-react";
import { Product } from "@/lib/products-service";
import { useLanguage } from "@/lib/context/language-context";

// Professional green color scheme function (same as safety standards display)
const getGreenPerformanceColour = (value: number | string | null | undefined, maxLevel: number = 5): string => {
  if (value === null || value === undefined || value === 'X' || value === '') {
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
  
  const numValue = typeof value === 'number' ? value : parseInt(String(value));
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

interface ProductPreviewModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

export const ProductPreviewModal: React.FC<ProductPreviewModalProps> = ({
  product,
  isOpen,
  onClose,
}) => {
  const { t, language } = useLanguage();
  
  // Always build URLs from the English name to keep slugs stable across locales
  const encodedProductName = encodeURIComponent((product as any).name_locales?.en || product.name);
  
  // Function to clean and validate image URLs
  const cleanImageUrl = (url: string | null | undefined): string | null => {
    if (!url) return null;
    // Remove any trailing curly braces or other invalid characters
    const cleaned = url.replace(/[{}]/g, '').trim();
    // Validate it's a proper URL
    try {
      new URL(cleaned);
      return cleaned;
    } catch {
      return null;
    }
  };
  
  // Collect all available images with cleaning
  const allImages = [
    cleanImageUrl(product.image_url),
    cleanImageUrl(product.image2_url),
    cleanImageUrl(product.image3_url),
    cleanImageUrl(product.image4_url),
    cleanImageUrl(product.image5_url)
  ].filter(Boolean) as string[];
  
  // State to track the currently selected image
  const [selectedImage, setSelectedImage] = useState(allImages[0] || "");

  // Respiratory standards quick badges (compact)
  const renderRespiratoryStandards = () => {
    const rs: any = (product as any).respiratory_standards;
    if (!rs || typeof rs !== 'object') return null;

    const chips: { label: string; value?: string; sub?: string }[] = [];
    if (rs.en149?.enabled) chips.push({ label: 'EN149', value: rs.en149.class, sub: [rs.en149.nr ? 'NR' : null, rs.en149.r ? 'R' : null, rs.en149.d ? 'D' : null].filter(Boolean).join('/') });
    if (rs.en143?.enabled) chips.push({ label: 'EN143', value: rs.en143.class, sub: rs.en143.r ? 'R' : (rs.en143.nr ? 'NR' : undefined) });
    
    // EN 14387 - Build full marking with gas types
    if (rs.en14387?.enabled) {
      let en14387Text = `EN 14387${rs.en14387.class ? ` ${rs.en14387.class}` : ''}`;
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
          en14387Text += ` ${gasTypes.join('')}`;
        }
      }
      chips.push({ label: en14387Text });
    }
    
    if (rs.en136?.enabled) chips.push({ label: 'EN136', value: rs.en136.class });
    if (rs.en140?.enabled) chips.push({ label: 'EN140' });
    if (rs.en166?.enabled) chips.push({ label: 'EN166', value: rs.en166.class });
    if (chips.length === 0) return null;

    return (
      <div className="flex flex-wrap gap-1.5">
        {chips.map((c, idx) => (
          <span key={idx} className="bg-white dark:bg-black/40 text-brand-dark dark:text-white border border-brand-primary/20 rounded px-2 py-0.5 text-xs">
            {c.label}{c.value ? ` ${c.value}` : ''}{c.sub ? ` ${c.sub}` : ''}
          </span>
        ))}
      </div>
    );
  };

  // Hearing standards - now handled in specifications section below
  const renderHearingStandards = () => {
    return null; // Removed - now showing in specifications section
  };

  // Footwear quick badges (compact)
  const renderFootwearChips = () => {
    const fs: any = (product as any).footwear_standards;
    const fa: any = (product as any).footwear_attributes;
    if (!fs && !fa) return null;
    const chips: string[] = [];
    const codes: string[] = Array.isArray(fs?.en_iso_20345_2022) ? fs.en_iso_20345_2022 : [];
    if (codes.length) chips.push(...codes);
    if (typeof fa?.class === 'string' && fa.class) chips.push(fa.class);
    if (typeof fa?.esd === 'boolean') chips.push(fa.esd ? 'ESD' : 'Non-ESD');
    if (!chips.length) return null;
    return (
      <div className="flex flex-wrap gap-1.5">
        {chips.map((c, idx) => (
          <span key={idx} className="bg-white dark:bg-black/40 text-brand-dark dark:text-white border border-brand-primary/20 rounded px-2 py-0.5 text-xs">
            {c}
          </span>
        ))}
      </div>
    );
  };

  // Eye & Face quick badges (compact)
  const renderEyeFaceChips = () => {
    const std: any = (product as any).eye_face_standards;
    const attrs: any = (product as any).eye_face_attributes;
    if (!std && !attrs) return null;
    const chips: string[] = [];
    if (std?.en166) chips.push('EN 166');
    if (std?.en170) chips.push('EN 170');
    if (std?.gs_et_29) chips.push('GS-ET 29');
    if (attrs?.has_ir) chips.push('IR');
    if (attrs?.has_uv) chips.push(attrs?.uv_code ? attrs.uv_code : 'UV');
    if (attrs?.has_arc) chips.push('Arc');
    if (!chips.length) return null;
    return (
      <div className="flex flex-wrap gap-1.5">
        {chips.map((c, idx) => (
          <span key={idx} className="bg-white dark:bg-black/40 text-brand-dark dark:text-white border border-brand-primary/20 rounded px-2 py-0.5 text-xs">
            {c}
          </span>
        ))}
      </div>
    );
  };

  // Head protection quick badges (compact)
  const renderHeadChips = () => {
    const hs: any = (product as any).head_standards;
    const ha: any = (product as any).head_attributes;
    if (!hs && !ha) return null;
    const chips: string[] = [];
    if (hs?.en397?.present) chips.push('EN 397');
    if (hs?.en50365) chips.push('EN 50365');
    if (hs?.en12492) chips.push('EN 12492');
    if (hs?.en812) chips.push('EN 812');
    if (!chips.length) return null;
    return (
      <div className="flex flex-wrap gap-1.5">
        {chips.map((c, idx) => (
          <span key={idx} className="bg-white dark:bg-black/40 text-brand-dark dark:text-white border border-brand-primary/20 rounded px-2 py-0.5 text-xs">
            {c}
          </span>
        ))}
      </div>
    );
  };

  // Clothing quick badges (compact)
  const renderClothingChips = () => {
    const cs: any = (product as any).clothing_standards;
    if (!cs) return null;
    const chips: string[] = [];
    if (typeof cs?.en_iso_20471?.class === 'number') chips.push(`EN ISO 20471 C${cs.en_iso_20471.class}`);
    if (cs?.en_iso_11612) {
      const v = cs.en_iso_11612;
      const parts: string[] = [];
      if (v?.a1) parts.push('A1');
      if (v?.a2) parts.push('A2');
      if (typeof v?.b === 'number') parts.push(`B${v.b}`);
      if (typeof v?.c === 'number') parts.push(`C${v.c}`);
      if (typeof v?.d === 'number') parts.push(`D${v.d}`);
      if (typeof v?.e === 'number') parts.push(`E${v.e}`);
      if (typeof v?.f === 'number') parts.push(`F${v.f}`);
      if (parts.length) chips.push(`EN ISO 11612 ${parts.join('/')}`);
    }
    if (typeof cs?.en_iso_11611?.class === 'number') chips.push(`EN ISO 11611 C${cs.en_iso_11611.class}`);
    if (typeof cs?.iec_61482_2?.class === 'number') chips.push(`IEC 61482-2 C${cs.iec_61482_2.class}`);
    if (cs?.en_1149_5) chips.push('EN 1149-5');
    if (cs?.en_13034) chips.push(`EN 13034 ${cs.en_13034}`);
    if (!chips.length) return null;
    return (
      <div className="flex flex-wrap gap-1.5">
        {chips.map((c, idx) => (
          <span key={idx} className="bg-white dark:bg-black/40 text-brand-dark dark:text-white border border-brand-primary/20 rounded px-2 py-0.5 text-xs">
            {c}
          </span>
        ))}
      </div>
    );
  };

  // Arm protection quick badges (compact) - same as gloves
  const renderArmChips = () => {
    const safety: any = (product as any).safety;
    const armAttrs: any = (product as any).arm_attributes;
    if (!safety && !armAttrs) return null;
    const chips: string[] = [];
    // Don't add EN 388 here as it's already shown in the detailed badges above with performance levels
    if (safety?.en_iso_21420?.enabled) chips.push('EN ISO 21420');
    // Removed thumb_loop and closure as they are attributes, not standards
    if (!chips.length) return null;
    return (
      <div className="flex flex-wrap gap-1.5">
        {chips.map((c, idx) => (
          <span key={idx} className="bg-white dark:bg-black/40 text-brand-dark dark:text-white border border-brand-primary/20 rounded px-2 py-0.5 text-xs">
            {c}
          </span>
        ))}
      </div>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] max-w-[95vw] p-0 gap-0 bg-white dark:bg-black/100 backdrop-blur-sm border border-gray-100 dark:border-gray-700/50 shadow-2xl max-h-[85vh] overflow-y-auto">
        
        {/* Header with title and badges */}
        <div className="p-6 pb-4 border-b border-gray-100 dark:border-gray-700/50">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            {/* Featured Badge - Better contrast */}
            {product.is_featured && (
              <div className="bg-brand-primary text-white py-1 px-3 rounded-lg text-sm font-bold shadow-lg border-2 border-brand-primary">
                {t('products.featured')}
              </div>
            )}
            
            {/* Category Badge */}
            {product.category && (
              <div className="bg-white/90 dark:bg-gray-900/90 text-brand-primary py-1 px-3 rounded-lg text-sm font-medium shadow-md border border-brand-primary/20 backdrop-blur-sm">
                {product.category}
              </div>
            )}
            
            {product.sub_category && (
              <div className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 py-1 px-3 rounded-lg text-sm font-medium border border-gray-200 dark:border-gray-700">
                {product.sub_category}
              </div>
            )}
            
            {product.out_of_stock && (
              <div className="bg-gradient-to-r from-red-500 to-red-600 text-white py-1 px-3 rounded-lg text-sm font-medium shadow-lg">
                {t('products.outOfStock')}
              </div>
            )}
          </div>
          
          <h2 className="text-xl font-bold text-brand-dark dark:text-white font-heading">
            {product.name}
          </h2>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
          {/* Left side - Images */}
          <div className="space-y-3">
            {/* Main Image */}
            <div className="relative aspect-square bg-white dark:bg-black/30 rounded-xl overflow-hidden border border-gray-100 dark:border-gray-700/50 shadow-md group">
              <Image
                src={selectedImage}
                alt={product.name}
                fill
                className="object-contain p-3 transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 350px"
              />
              <div className="absolute inset-0 bg-brand-primary/0 group-hover:bg-brand-primary/5 transition-colors duration-300" />
            </div>
            
            {/* Thumbnails */}
            {allImages.length > 1 && (
              <div className="flex space-x-2">
                {allImages.map((image, index) => (
                  <button
                    key={index}
                    className={`relative h-12 w-12 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                      selectedImage === image 
                        ? 'border-brand-primary shadow-md scale-105' 
                        : 'border-gray-200 dark:border-gray-700 opacity-70 hover:opacity-100 hover:scale-105'
                    }`}
                    onClick={() => setSelectedImage(image)}
                  >
                    <Image
                      src={image}
                      alt={`${product.name} - View ${index + 1}`}
                      fill
                      className="object-contain p-1"
                      sizes="48px"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right side - Details */}
          <div className="space-y-4">
            {/* Description */}
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-3 border border-gray-100 dark:border-gray-700/50">
              <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                {product.short_description || product.description}
              </p>
            </div>

            {/* Specifications - Compact */}
            {(() => {
              const isSwab = product.category?.toLowerCase().includes('swab') || product.sub_category?.toLowerCase().includes('swab');
              const swabSize = product.size_locales?.[language] || product.size_locales?.en || null;
              const hasSwabContent = isSwab && swabSize;
              
              // For swabs: only show if size exists
              if (isSwab && !hasSwabContent) {
                return null;
              }
              
              return (
                <div className="space-y-3">
                  <h4 className="text-base font-semibold text-brand-dark dark:text-white font-heading">{t('productPage.specifications')}</h4>
                  
                  <div className="space-y-2">
                    {/* Special handling for swabs - show size if available */}
                    {isSwab && swabSize ? (
                      <div className="flex items-center bg-white dark:bg-black/30 rounded-lg p-3 border border-gray-100 dark:border-gray-700/50 shadow-sm">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-primary/10 mr-3">
                          <Move className="h-4 w-4 text-brand-primary" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-600 dark:text-gray-400">{t('productPage.productInfo.size')}</p>
                          <p className="text-sm font-semibold text-gray-900 dark:text-white">{swabSize}</p>
                        </div>
                      </div>
                    ) : null}
                    
                    {/* Hearing Protection Specifications */}
                    {!isSwab && (product as any).hearing_standards?.en352 ? (
                      <>
                        {/* Specifications Box */}
                        <div className="bg-white dark:bg-black/30 rounded-lg p-3 border border-gray-100 dark:border-gray-700/50 shadow-sm">
                          <div className="space-y-2">
                            {/* H, M, L Frequency Attenuation */}
                            {(product as any).hearing_standards.en352.hml && (
                              <div className="flex items-center justify-between">
                                <span className="text-xs text-gray-600 dark:text-gray-400">Attenuation (H, M, L)</span>
                                <span className="text-sm font-semibold text-brand-dark dark:text-white">
                                  {(product as any).hearing_standards.en352.hml.h}, {(product as any).hearing_standards.en352.hml.m}, {(product as any).hearing_standards.en352.hml.l} dB
                                </span>
                              </div>
                            )}
                            {/* Mount Type */}
                            {(product as any).hearing_attributes?.mount && (product as any).hearing_attributes.mount !== 'none' && (
                              <div className="flex items-center justify-between">
                                <span className="text-xs text-gray-600 dark:text-gray-400">Mount</span>
                                <span className="text-sm font-semibold text-brand-dark dark:text-white capitalize">
                                  {(product as any).hearing_attributes.mount}
                                </span>
                              </div>
                            )}
                            {/* Reusable Status */}
                            {typeof (product as any).hearing_attributes?.reusable === 'boolean' && (
                              <div className="flex items-center justify-between">
                                <span className="text-xs text-gray-600 dark:text-gray-400">Type</span>
                                <span className="text-sm font-semibold text-brand-dark dark:text-white">
                                  {(product as any).hearing_attributes.reusable ? 'Reusable' : 'Disposable'}
                                </span>
                              </div>
                            )}
                            {/* SNR Value */}
                            {typeof (product as any).hearing_standards.en352.snr_db === 'number' && (
                              <div className="flex items-center justify-between">
                                <span className="text-xs text-gray-600 dark:text-gray-400">SNR</span>
                                <span className="text-sm font-semibold text-brand-dark dark:text-white">
                                  {(product as any).hearing_standards.en352.snr_db} dB
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                        
                        {/* EN 352 Standards Box */}
                        <div className="bg-white dark:bg-black/30 rounded-lg p-3 border border-gray-100 dark:border-gray-700/50 shadow-sm">
                          <div className="flex items-center gap-3">
                            <Shield className="h-5 w-5 text-brand-primary" />
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="text-xs font-medium text-brand-dark dark:text-white">EN 352</span>
                              {(() => {
                                const parts: string[] = Array.isArray((product as any).hearing_standards.en352.parts) ? (product as any).hearing_standards.en352.parts : [];
                                const additional: string[] = Array.isArray((product as any).hearing_standards.en352.additional) ? (product as any).hearing_standards.en352.additional : [];
                                const allCodes = [...parts, ...additional];
                                return allCodes.length > 0 ? (
                                  <div className="flex flex-wrap gap-1">
                                    {allCodes.map((code, idx) => (
                                      <span
                                        key={idx}
                                        className="text-xs px-2 py-0.5 rounded bg-white dark:bg-black/40 text-brand-dark dark:text-white border border-brand-primary/20 font-medium"
                                      >
                                        {code}
                                      </span>
                                    ))}
                                  </div>
                                ) : null;
                              })()}
                            </div>
                          </div>
                        </div>
                      </>
                    ) : null}
                    
                    {/* EN Standards from Safety JSON with performance numbers */}
                    {!isSwab && !(product as any).hearing_standards?.en352 && product.safety && ((product.safety as any).en_388?.enabled || (product.safety as any).en388?.enabled || (product.safety as any).en_407?.enabled || (product.safety as any).en407?.enabled || product.safety.en_511?.enabled) ? (
                  <div className="bg-white dark:bg-black/30 rounded-lg p-3 border border-gray-100 dark:border-gray-700/50 shadow-sm">
                    <div className="space-y-3">
                      {/* EN 388 - Mechanical Risks */}
                      {((product.safety as any).en_388?.enabled || (product.safety as any).en388?.enabled) && (
                        <div className="flex items-center gap-3">
                          <Hammer className="h-5 w-5 text-brand-primary" />
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-medium text-brand-dark dark:text-white">EN 388</span>
                            <div className="flex gap-1">
                              {(() => {
                                const en388Data = (product.safety as any).en_388 || (product.safety as any).en388;
                                if (!en388Data) return [];
                                return [
                                  en388Data.abrasion ?? null,
                                  en388Data.cut ?? null,
                                  en388Data.tear ?? null,
                                  en388Data.puncture ?? null,
                                  en388Data.iso_13997 || en388Data.iso_cut || null,
                                  en388Data.impact_en_13594 ?? null
                                ];
                              })().map((value, index) => (
                                <span
                                  key={index}
                                  className={`text-xs px-1 py-0.5 rounded w-6 h-6 flex items-center justify-center font-medium ${getGreenPerformanceColour(value)}`}
                                >
                                  {value || 'X'}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {/* EN 407 - Thermal Risks */}
                      {((product.safety as any).en_407?.enabled || (product.safety as any).en407?.enabled) && (
                        <div className="flex items-center gap-3">
                          <Flame className="h-5 w-5 text-orange-500" />
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-medium text-brand-dark dark:text-white">EN 407</span>
                            <div className="flex gap-1">
                              {(() => {
                                const en407Data = (product.safety as any).en_407 || (product.safety as any).en407;
                                if (!en407Data) return [];
                                return [
                                  en407Data.limited_flame_spread ?? null,
                                  en407Data.contact_heat ?? null,
                                  en407Data.convective_heat ?? null,
                                  en407Data.radiant_heat ?? null,
                                  en407Data.small_splashes_molten_metal ?? null,
                                  en407Data.large_quantities_molten_metal ?? null
                                ];
                              })().map((value, index) => (
                                <span
                                  key={index}
                                  className={`text-xs px-1 py-0.5 rounded w-6 h-6 flex items-center justify-center font-medium ${getGreenPerformanceColour(value, 4)}`}
                                >
                                  {value || 'X'}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {/* EN 511 - Cold Risks */}
                      {product.safety.en_511?.enabled && (
                        <div className="flex items-center gap-3">
                          <Snowflake className="h-5 w-5 text-blue-500" />
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-medium text-brand-dark dark:text-white">EN 511</span>
                            <div className="flex gap-1">
                              {[
                                product.safety.en_511.convective_cold,
                                product.safety.en_511.contact_cold,
                                product.safety.en_511.water_permeability
                              ].map((value, index) => (
                                <span
                                  key={index}
                                  className={`text-xs px-1 py-0.5 rounded w-6 h-6 flex items-center justify-center font-medium ${getGreenPerformanceColour(value, 4)}`}
                                >
                                  {value || 'X'}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  // Fallback for products without safety JSON
                  <>
                    {product.temperature_rating && (
                      <div className="flex items-center bg-white dark:bg-black/30 rounded-lg p-3 border border-gray-100 dark:border-gray-700/50 shadow-sm">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-primary/10 mr-3">
                          <Flame className="h-4 w-4 text-brand-primary" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-600 dark:text-gray-400">Temperature Resistance</p>
                          <p className="text-sm font-semibold text-gray-900 dark:text-white">{product.temperature_rating}°C</p>
                        </div>
                      </div>
                    )}
                    
                    {product.cut_resistance_level && product.en_standard && (
                      <div className="flex items-center bg-white dark:bg-black/30 rounded-lg p-3 border border-gray-100 dark:border-gray-700/50 shadow-sm">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-primary/10 mr-3">
                          <div className="relative w-5 h-5">
                            <Image
                              src={`/images/standards/${product.en_standard}.png`}
                              alt={product.en_standard}
                              fill
                              className="object-contain dark:invert"
                            />
                          </div>
                        </div>
                        <div>
                          <p className="text-xs text-gray-600 dark:text-gray-400">EN Standards</p>
                          <p className="text-sm font-semibold text-gray-900 dark:text-white">{product.en_standard}</p>
                        </div>
                      </div>
                    )}
                  </>
                )}
                    {/* Respiratory standards compact chips */}
                    {!isSwab && renderRespiratoryStandards()}
                    {!isSwab && renderHearingStandards()}
                    {!isSwab && renderFootwearChips()}
                    {!isSwab && renderEyeFaceChips()}
                    {!isSwab && renderHeadChips()}
                    {!isSwab && renderClothingChips()}
                    {!isSwab && renderArmChips()}
                  </div>
                </div>
              );
            })()}

            {/* Key Features - Compact */}
            {(() => {
              const currentFeatures = product.features_locales?.[language] || product.features || [];
              return currentFeatures.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-base font-semibold text-brand-dark dark:text-white font-heading">{t('products.keyFeatures')}</h4>
                  <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-3 border border-gray-100 dark:border-gray-700/50">
                    <ul className="space-y-1">
                      {currentFeatures.slice(0, 3).map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <div className="w-1.5 h-1.5 bg-brand-primary rounded-full mt-1.5 mr-2 flex-shrink-0"></div>
                          <span className="text-gray-700 dark:text-gray-300 text-sm">{feature}</span>
                        </li>
                      ))}
                      {currentFeatures.length > 3 && (
                        <li className="text-brand-primary text-sm font-medium">
                          +{currentFeatures.length - 3} more
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
              );
            })()}

            {/* Industries - Compact */}
            {(() => {
              const currentIndustries = product.industries_locales?.[language] || product.industries || [];
              return currentIndustries.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-base font-semibold text-brand-dark dark:text-white font-heading">{t('productPage.industries')}</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {currentIndustries.map((industry) => (
                      <div key={industry} className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 py-1 px-2 rounded text-xs font-medium border border-gray-200 dark:border-gray-700">
                        {industry}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })()}
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 pt-0 border-t border-gray-100 dark:border-gray-700/50">
          <Button 
            variant="default"
            className="bg-gradient-to-r from-brand-primary to-brand-primary hover:from-brand-primary/90 hover:to-brand-primary/90 text-white font-medium transition-all duration-300 hover:scale-[1.02] hover:shadow-lg w-full py-2.5 text-sm rounded-lg shadow-md" 
            asChild
          >
            <Link href={`/products/${encodedProductName}`} className="flex items-center justify-center">
              <span className="font-semibold">{t('products.viewFullDetails')}</span>
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}; 