"use client";

import { Product } from "@/lib/products-service";
import { useLanguage } from "@/lib/context/language-context";
import { Wind, Shield } from "lucide-react";

type RespiratoryStandardsJson = {
  en149?: { enabled?: boolean; class?: string; nr?: boolean; r?: boolean; d?: boolean };
  en136?: { enabled?: boolean; class?: string };
  en140?: { enabled?: boolean };
  en166?: { enabled?: boolean; class?: string };
  en143?: { enabled?: boolean; class?: string; nr?: boolean; r?: boolean };
  en14387?: { enabled?: boolean; class?: string; gases?: Record<string, boolean> };
  din_3181_3?: { enabled?: boolean };
};

export function RespiratoryStandards({ product }: { product: Product }) {
  const { t } = useLanguage();
  const std: RespiratoryStandardsJson = (product as any).respiratory_standards || {};

  const hasEn149 = Boolean(std?.en149?.enabled);
  const hasEn166 = Boolean(std?.en166?.enabled);
  const hasEn136 = Boolean(std?.en136?.enabled);
  const hasEn14387 = Boolean(std?.en14387?.enabled);
  const hasEn143 = Boolean(std?.en143?.enabled);
  const hasDin31813 = Boolean(std?.din_3181_3?.enabled);

  // Helper function to get class color based on numeric value
  const getClassColor = (className: string) => {
    const numericClass = parseInt(className.replace(/[^\d]/g, ''));
    if (numericClass >= 3) return 'bg-green-700 dark:bg-green-600'; // Darker green for higher numbers
    if (numericClass === 2) return 'bg-green-500 dark:bg-green-500'; 
    if (numericClass === 1) return 'bg-green-300 dark:bg-green-400'; // Lighter green for lower numbers
    return 'bg-green-500 dark:bg-green-500'; // Default green
  };

  // Helper function to render attribute chips
  const renderAttribute = (label: string, value: boolean | string, isActive: boolean = true) => {
    const baseClasses = "h-12 flex items-center justify-center rounded-lg border text-sm font-bold min-w-[60px] px-3";
    const activeClasses = isActive 
      ? "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-700 dark:text-green-300"
      : "bg-gray-50 dark:bg-gray-800/20 border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400";
    
    return (
      <div key={label}>
        <div className="text-xs text-brand-secondary dark:text-gray-400 mb-1">{label}</div>
        <div className={`${baseClasses} ${activeClasses}`}>
          <span className="font-mono tracking-tight">
            {typeof value === 'boolean' ? (value ? '✓' : '–') : value}
          </span>
        </div>
      </div>
    );
  };

  // Helper function to render class with dynamic color
  const renderClassTile = (label: string, className: string) => {
    const colorClass = getClassColor(className);
    return (
      <div key={label}>
        <div className="text-xs text-brand-secondary dark:text-gray-400 mb-1">{label}</div>
        <div className={`h-12 flex items-center justify-center rounded-lg border text-sm font-bold text-white ${colorClass} border-green-200 dark:border-green-800`}>
          <span className="font-mono tracking-tight">{className}</span>
        </div>
      </div>
    );
  };

  // Helper function to get gas filter color based on EN 14387 official colors
  const getGasFilterColor = (gasType: string) => {
    const colors: Record<string, string> = {
      'a': 'bg-amber-700', // Brown for organic gases
      'b': 'bg-gray-500',  // Grey for inorganic gases  
      'e': 'bg-yellow-500', // Yellow for acid gases
      'k': 'bg-green-600',  // Green for ammonia
      'ax': 'bg-amber-600', // Brown variant for organic gas < 65°C
      'hg': 'bg-red-600',   // Red for mercury
      'no': 'bg-blue-600',  // Blue for nitrous gas
      'sx': 'bg-orange-600', // Orange for specific gas
      'co': 'bg-black',     // Black for carbon monoxide
      'p': 'bg-gray-100'    // White/light grey for dust
    };
    return colors[gasType] || 'bg-gray-400';
  };

  // Helper function to render gas filter chip
  const renderGasFilterChip = (gasType: string, isPresent: boolean) => {
    const gasLabel = t(`productPage.respiratoryStandards.gases.${gasType}`);
    const colorClass = getGasFilterColor(gasType);
    const textColorClass = ['a', 'ax', 'hg', 'no', 'k', 'sx', 'co'].includes(gasType) ? 'text-white' : 'text-black';
    
    return (
      <div key={gasType}>
        <div className="text-xs text-brand-secondary dark:text-gray-400 mb-1">{gasLabel}</div>
        <div className={`h-12 flex items-center justify-center rounded-lg border text-sm font-bold min-w-[60px] px-3 ${
          isPresent 
            ? `${colorClass} ${textColorClass} border-gray-300`
            : 'bg-gray-50 dark:bg-gray-800/20 border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400'
        }`}>
          <span className="font-mono tracking-tight">
            {isPresent ? gasType.toUpperCase() : '–'}
          </span>
        </div>
      </div>
    );
  };

  // Don't render if no standards are present
  if (!hasEn149 && !hasEn166 && !hasEn136 && !hasEn14387 && !hasEn143 && !hasDin31813) return null;

  return (
    <div className="space-y-4">
      {/* Row 1: EN 149 (Full width if present) */}
      {hasEn149 && (
        <div className="group relative overflow-hidden rounded-lg border bg-white dark:bg-black/50 shadow-sm transition-all duration-300 hover:shadow-md border-brand-primary/10 dark:border-brand-primary/20 backdrop-blur-sm p-4">
          <div className="flex items-center gap-3 mb-3">
            <Wind className="h-5 w-5 text-brand-primary" />
            <h3 className="font-medium text-brand-dark dark:text-white">EN 149</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {renderClassTile(t('productPage.respiratoryStandards.class'), std.en149?.class || '')}
            {renderAttribute(t('productPage.respiratoryStandards.nonReusable'), std.en149?.nr || false, std.en149?.nr)}
            {renderAttribute(t('productPage.respiratoryStandards.reusable'), std.en149?.r || false, std.en149?.r)}
            {renderAttribute(t('productPage.respiratoryStandards.highDust'), std.en149?.d || false, std.en149?.d)}
          </div>
        </div>
      )}

      {/* Row 2: EN 166 and EN 136 (Two columns) */}
      {(hasEn166 || hasEn136) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* EN 166 */}
          {hasEn166 && (
            <div className="group relative overflow-hidden rounded-lg border bg-white dark:bg-black/50 shadow-sm transition-all duration-300 hover:shadow-md border-brand-primary/10 dark:border-brand-primary/20 backdrop-blur-sm p-4">
              <div className="flex items-center gap-3 mb-3">
                <Shield className="h-5 w-5 text-brand-primary" />
                <h3 className="font-medium text-brand-dark dark:text-white">EN 166</h3>
              </div>
              <div className="grid grid-cols-1 gap-3">
                {renderClassTile(t('productPage.respiratoryStandards.class'), `Class ${std.en166?.class || ''}`)}
              </div>
            </div>
          )}

          {/* EN 136 */}
          {hasEn136 && (
            <div className="group relative overflow-hidden rounded-lg border bg-white dark:bg-black/50 shadow-sm transition-all duration-300 hover:shadow-md border-brand-primary/10 dark:border-brand-primary/20 backdrop-blur-sm p-4">
              <div className="flex items-center gap-3 mb-3">
                <Shield className="h-5 w-5 text-brand-primary" />
                <h3 className="font-medium text-brand-dark dark:text-white">EN 136</h3>
              </div>
              <div className="grid grid-cols-1 gap-3">
                {renderClassTile(t('productPage.respiratoryStandards.class'), std.en136?.class || '')}
              </div>
            </div>
          )}
        </div>
      )}

      {/* EN 14387 Gas Filters Section */}
      {hasEn14387 && (
        <div className="group relative overflow-hidden rounded-lg border bg-white dark:bg-black/50 shadow-sm transition-all duration-300 hover:shadow-md border-brand-primary/10 dark:border-brand-primary/20 backdrop-blur-sm p-4">
          <div className="flex items-center gap-3 mb-3">
            <Shield className="h-5 w-5 text-brand-primary" />
            <h3 className="font-medium text-brand-dark dark:text-white">EN 14387</h3>
          </div>
          
          {/* 4 columns, 3 rows grid with class as first tile */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {/* Row 1: Class, Organic gas, Inorganic gas, Acid gas */}
            {renderClassTile(t('productPage.respiratoryStandards.class'), std.en14387?.class || '')}
            {renderGasFilterChip('a', Boolean(std.en14387?.gases?.a))}
            {renderGasFilterChip('b', Boolean(std.en14387?.gases?.b))}
            {renderGasFilterChip('e', Boolean(std.en14387?.gases?.e))}
            
            {/* Row 2: Ammonia, Organic gas < 65°C, Mercury, Nitrous gas */}
            {renderGasFilterChip('k', Boolean(std.en14387?.gases?.k))}
            {renderGasFilterChip('ax', Boolean(std.en14387?.gases?.ax))}
            {renderGasFilterChip('hg', Boolean(std.en14387?.gases?.hg))}
            {renderGasFilterChip('no', Boolean(std.en14387?.gases?.no))}
            
            {/* Row 3: Specific gas, Carbon monoxide, Dust, Empty cell */}
            {renderGasFilterChip('sx', Boolean(std.en14387?.gases?.sx))}
            {renderGasFilterChip('co', Boolean(std.en14387?.gases?.co))}
            {renderGasFilterChip('p', Boolean(std.en14387?.gases?.p))}
            {/* Empty cell for 4x3 grid */}
            <div></div>
          </div>
        </div>
      )}

      {/* Other standards (EN 143, DIN 3181-3) in a single compact block */}
      {(hasEn143 || hasDin31813) && (
        <div className="group relative overflow-hidden rounded-lg border bg-white dark:bg-black/50 shadow-sm transition-all duration-300 hover:shadow-md border-brand-primary/10 dark:border-brand-primary/20 backdrop-blur-sm p-4">
          <div className="space-y-3">
            {hasEn143 && (
              <div className="flex items-center gap-3">
                <Shield className="h-5 w-5 text-brand-primary" />
                <div className="font-medium text-brand-dark dark:text-white min-w-[90px] md:min-w-[120px]">EN 143</div>
                <div className="text-sm md:text-base font-semibold text-brand-dark dark:text-white">{t('productPage.stdLabel.en143')}</div>
              </div>
            )}
            {hasDin31813 && (
              <div className="flex items-center gap-3">
                <Shield className="h-5 w-5 text-brand-primary" />
                <div className="font-medium text-brand-dark dark:text-white min-w-[90px] md:min-w-[120px]">DIN 3181-3</div>
                <div className="text-sm md:text-base font-semibold text-brand-dark dark:text-white">{t('productPage.stdLabel.din31813')}</div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}


