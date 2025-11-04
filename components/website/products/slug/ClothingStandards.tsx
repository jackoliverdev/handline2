"use client";

import { useLanguage } from "@/lib/context/language-context";
import { Product } from "@/lib/products-service";
import { Shield, Flame, Zap, Droplets } from "lucide-react";

type ClothingStandards = {
  en_iso_20471?: { class?: string | number | null };
  en_iso_11612?: { a1?: string | null; a2?: string | null; b?: string | null; c?: string | null; d?: string | null; e?: string | null; f?: string | null };
  en_iso_11611?: { class?: string | null };
  iec_61482_2?: { class?: string | null };
  en_1149_5?: boolean;
  en_13034?: string;
  en_343?: { water?: string | null; breath?: string | null };
  uv_standard_801?: boolean;
};

export function ClothingStandards({ product }: { product: Product }) {
  const { t } = useLanguage();
  const std: ClothingStandards = (product as any).clothing_standards || {};

  const hasEn11612 = Boolean(std.en_iso_11612 && Object.keys(std.en_iso_11612).length > 0);
  const hasEn11611 = Boolean(std.en_iso_11611?.class);
  const hasEn343 = Boolean(std.en_343 && (std.en_343.water || std.en_343.breath));

  // Helper function to render EN 11612 attribute tiles
  const renderEn11612Attribute = (label: string, value: string | boolean | number, isActive: boolean = true) => {
    const baseClasses = "h-12 flex items-center justify-center rounded-lg border text-sm font-bold min-w-[60px] px-3";
    const activeClasses = isActive 
      ? "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-700 dark:text-green-300"
      : "bg-gray-50 dark:bg-gray-800/20 border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400";
    
    return (
      <div key={label}>
        <div className="text-xs text-brand-secondary dark:text-gray-400 mb-1">{label}</div>
        <div className={`${baseClasses} ${activeClasses}`}>
          <span className="font-mono tracking-tight">
            {typeof value === 'boolean' ? (value ? '✓' : '–') : value || '–'}
          </span>
        </div>
      </div>
    );
  };

  // Build standards list in desired display order (excluding EN 11612, EN 11611, and EN 343 which get special treatment)
  const standards: Array<{ code: string; label: string }> = [];

  // EN ISO 20471
  if (std.en_iso_20471?.class) {
    standards.push({ code: "EN ISO 20471", label: String(std.en_iso_20471.class) });
  }

  // IEC 61482-2
  if (std.iec_61482_2?.class) {
    standards.push({ code: "IEC 61482-2", label: String(std.iec_61482_2.class) });
  }

  // EN 1149-5
  if (std.en_1149_5) {
    standards.push({ code: "EN 1149-5", label: "Antistatic" });
  }

  // EN 13034
  if (std.en_13034) {
    standards.push({ code: "EN 13034", label: std.en_13034 });
  }


  // UV Standard 801
  if (std.uv_standard_801) {
    standards.push({ code: "UV Standard 801", label: "UV Protection" });
  }

  // Don't render if no standards are present
  if (!hasEn11612 && !hasEn11611 && !hasEn343 && standards.length === 0) return null;

  return (
    <div className="space-y-4">
      {/* EN ISO 11612 Special Section (3x2 grid) */}
      {hasEn11612 && (
        <div className="group relative overflow-hidden rounded-lg border bg-white dark:bg-black/50 shadow-sm transition-all duration-300 hover:shadow-md border-brand-primary/10 dark:border-brand-primary/20 backdrop-blur-sm p-4">
          <div className="flex items-center gap-3 mb-3">
            <Flame className="h-5 w-5 text-brand-primary" />
            <h3 className="font-medium text-brand-dark dark:text-white">EN ISO 11612</h3>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {/* Row 1 */}
            {renderEn11612Attribute(t('productPage.clothingStandards.flameSpread'), 
              (() => {
                const s = std.en_iso_11612!;
                const labels: string[] = [];
                if (s.a1) labels.push(String(s.a1));
                if (s.a2) labels.push(String(s.a2));
                return labels.join("+") || false;
              })(), 
              Boolean(std.en_iso_11612?.a1 || std.en_iso_11612?.a2)
            )}
            {renderEn11612Attribute(t('productPage.clothingStandards.convectiveHeat'), 
              std.en_iso_11612?.b || false,
              Boolean(std.en_iso_11612?.b)
            )}
            {renderEn11612Attribute(t('productPage.clothingStandards.radiantHeat'), 
              std.en_iso_11612?.c || false,
              Boolean(std.en_iso_11612?.c)
            )}
            
            {/* Row 2 */}
            {renderEn11612Attribute(t('productPage.clothingStandards.moltenAluminium'), 
              std.en_iso_11612?.d || false,
              Boolean(std.en_iso_11612?.d)
            )}
            {renderEn11612Attribute(t('productPage.clothingStandards.moltenIron'), 
              std.en_iso_11612?.e || false,
              Boolean(std.en_iso_11612?.e)
            )}
            {renderEn11612Attribute(t('productPage.clothingStandards.contactHeat'), 
              std.en_iso_11612?.f || false,
              Boolean(std.en_iso_11612?.f)
            )}
          </div>
        </div>
      )}

      {/* EN ISO 11611 Special Section (2 columns) */}
      {hasEn11611 && (
        <div className="group relative overflow-hidden rounded-lg border bg-white dark:bg-black/50 shadow-sm transition-all duration-300 hover:shadow-md border-brand-primary/10 dark:border-brand-primary/20 backdrop-blur-sm p-4">
          <div className="flex items-center gap-3 mb-3">
            <Zap className="h-5 w-5 text-brand-primary" />
            <h3 className="font-medium text-brand-dark dark:text-white">EN ISO 11611</h3>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {renderEn11612Attribute(t('productPage.clothingStandards.class'), 
              std.en_iso_11611?.class || false,
              Boolean(std.en_iso_11611?.class)
            )}
            {renderEn11612Attribute(t('productPage.clothingStandards.protection'), 
              t('productPage.clothingStandards.welding'),
              Boolean(std.en_iso_11611?.class)
            )}
          </div>
        </div>
      )}

      {/* EN 343 Special Section (2 columns) */}
      {hasEn343 && (
        <div className="group relative overflow-hidden rounded-lg border bg-white dark:bg-black/50 shadow-sm transition-all duration-300 hover:shadow-md border-brand-primary/10 dark:border-brand-primary/20 backdrop-blur-sm p-4">
          <div className="flex items-center gap-3 mb-3">
            <Droplets className="h-5 w-5 text-brand-primary" />
            <h3 className="font-medium text-brand-dark dark:text-white">EN 343</h3>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {renderEn11612Attribute(t('productPage.clothingStandards.waterPenetration'), 
              std.en_343?.water || false,
              Boolean(std.en_343?.water)
            )}
            {renderEn11612Attribute(t('productPage.clothingStandards.breathability'), 
              std.en_343?.breath || false,
              Boolean(std.en_343?.breath)
            )}
          </div>
        </div>
      )}

      {/* Other standards in a single compact block */}
      {standards.length > 0 && (
        <div className="group relative overflow-hidden rounded-lg border bg-white dark:bg-black/50 shadow-sm transition-all duration-300 hover:shadow-md border-brand-primary/10 dark:border-brand-primary/20 backdrop-blur-sm p-4">
          <div className="space-y-3">
            {standards.map((s) => (
              <div key={s.code} className="flex items-center gap-3">
                <Shield className="h-5 w-5 text-brand-primary" />
                <div className="font-medium text-brand-dark dark:text-white min-w-[90px] md:min-w-[120px]">{s.code}</div>
                <div className="text-sm md:text-base font-semibold text-brand-dark dark:text-white">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}


