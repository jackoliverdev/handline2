"use client";

import { Product } from "@/lib/products-service";
import { useLanguage } from "@/lib/context/language-context";
import { Shield, Check, X } from "lucide-react";

export function ArmProtectionAttributes({ product }: { product: Product }) {
  const { t } = useLanguage();
  const armAttrs: any = (product as any).arm_attributes || {};
  
  // Check if we have any attributes to display
  const hasThumbLoop = typeof armAttrs.thumb_loop === 'boolean';
  const hasClosure = armAttrs.closure && armAttrs.closure !== '';
  
  // If no attributes are set, don't render anything
  if (!hasThumbLoop && !hasClosure) return null;

  return (
    <div className="group relative overflow-hidden rounded-lg border bg-white dark:bg-black/50 shadow-sm transition-all duration-300 hover:shadow-md border-brand-primary/10 dark:border-brand-primary/20 backdrop-blur-sm p-4">
      <div className="flex items-center gap-2 mb-3">
        <Shield className="h-5 w-5 text-brand-primary" />
        <h3 className="font-medium text-brand-dark dark:text-white">Arm Protection Attributes</h3>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Thumb Loop */}
        {hasThumbLoop && (
          <div className="flex items-center justify-between px-3 py-2 rounded-md bg-gradient-to-r from-brand-light/30 to-transparent dark:from-brand-primary/5 dark:to-transparent">
            <span className="text-sm font-medium text-brand-dark dark:text-white">Thumb Loop</span>
            <div className="flex items-center gap-1.5">
              {armAttrs.thumb_loop ? (
                <>
                  <Check className="h-4 w-4 text-green-600 dark:text-green-400" />
                  <span className="text-sm font-semibold text-green-600 dark:text-green-400">Yes</span>
                </>
              ) : (
                <>
                  <X className="h-4 w-4 text-brand-secondary/60 dark:text-gray-500" />
                  <span className="text-sm font-medium text-brand-secondary/80 dark:text-gray-400">No</span>
                </>
              )}
            </div>
          </div>
        )}

        {/* Closure Type */}
        {hasClosure && (
          <div className="flex items-center justify-between px-3 py-2 rounded-md bg-gradient-to-r from-brand-light/30 to-transparent dark:from-brand-primary/5 dark:to-transparent">
            <span className="text-sm font-medium text-brand-dark dark:text-white">Closure Type</span>
            <span className="text-sm font-semibold text-brand-primary capitalize">
              {armAttrs.closure}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

