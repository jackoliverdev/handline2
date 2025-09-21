"use client";

import { Product } from "@/lib/products-service";
import { useLanguage } from "@/lib/context/language-context";
import { Badge } from "@/components/ui/badge";
import { Shield, Wind } from "lucide-react";

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
  const hasEn14387 = Boolean(std?.en14387?.enabled);

  const renderChip = (label: string, active: boolean = true) => (
    <Badge
      key={label}
      variant="outline"
      className={
        active
          ? "bg-brand-primary/5 border-brand-primary/30 text-brand-dark dark:text-white"
          : "bg-white dark:bg-black/30 border-brand-primary/10 text-brand-secondary/70"
      }
    >
      {label}
    </Badge>
  );

  return (
    <div className="space-y-4">
      {/* EN 149 block */}
      {hasEn149 && (
        <div className="group relative overflow-hidden rounded-lg border bg-white dark:bg-black/50 shadow-sm transition-all duration-300 hover:shadow-md border-brand-primary/10 dark:border-brand-primary/20 backdrop-blur-sm p-4">
          <div className="flex items-center gap-3 mb-3">
            <Wind className="h-5 w-5 text-brand-primary" />
            <h3 className="font-medium text-brand-dark dark:text-white">EN 149</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {std.en149?.class ? renderChip(std.en149.class, true) : null}
            {std.en149?.r ? renderChip("R", true) : null}
            {std.en149?.nr ? renderChip("NR", true) : null}
            {std.en149?.d ? renderChip("D", true) : null}
          </div>
        </div>
      )}

      {/* EN 14387 - Gases and class */}
      {hasEn14387 && (
        <div className="group relative overflow-hidden rounded-lg border bg-white dark:bg-black/50 shadow-sm transition-all duration-300 hover:shadow-md border-brand-primary/10 dark:border-brand-primary/20 backdrop-blur-sm p-4">
          <div className="flex items-center gap-3 mb-3">
            <Shield className="h-5 w-5 text-brand-primary" />
            <h3 className="font-medium text-brand-dark dark:text-white">EN 14387</h3>
          </div>
          <div className="flex flex-wrap gap-2 mb-2">
            {std.en14387?.class ? renderChip(std.en14387.class, true) : null}
          </div>
          <div className="flex flex-wrap gap-2">
            {Object.entries(std.en14387?.gases || {}).map(([code, active]) => renderChip(code.toUpperCase(), Boolean(active)))}
          </div>
        </div>
      )}

      {/* Additional standards (compact tiles) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {std.en143?.enabled && (
          <div className="border border-brand-primary/20 rounded px-3 py-2 bg-white dark:bg-black/40">
            <div className="text-xs text-brand-secondary dark:text-gray-400 mb-1">EN 143</div>
            <div className="flex flex-wrap gap-2">
              {std.en143.class ? renderChip(std.en143.class, true) : null}
              {std.en143.r ? renderChip("R", true) : null}
              {std.en143.nr ? renderChip("NR", true) : null}
            </div>
          </div>
        )}
        {std.en136?.enabled && (
          <div className="border border-brand-primary/20 rounded px-3 py-2 bg-white dark:bg-black/40">
            <div className="text-xs text-brand-secondary dark:text-gray-400 mb-1">EN 136</div>
            <div className="flex flex-wrap gap-2">
              {std.en136.class ? renderChip(std.en136.class, true) : null}
            </div>
          </div>
        )}
        {std.en166?.enabled && (
          <div className="border border-brand-primary/20 rounded px-3 py-2 bg-white dark:bg-black/40">
            <div className="text-xs text-brand-secondary dark:text-gray-400 mb-1">EN 166</div>
            <div className="flex flex-wrap gap-2">
              {std.en166.class ? renderChip(std.en166.class, true) : null}
            </div>
          </div>
        )}
        {std.en140?.enabled && (
          <div className="border border-brand-primary/20 rounded px-3 py-2 bg-white dark:bg-black/40">
            <div className="text-xs text-brand-secondary dark:text-gray-400 mb-1">EN 140</div>
            <div className="flex flex-wrap gap-2">
              {renderChip("EN", true)}
            </div>
          </div>
        )}
        {std.din_3181_3?.enabled && (
          <div className="border border-brand-primary/20 rounded px-3 py-2 bg-white dark:bg-black/40">
            <div className="text-xs text-brand-secondary dark:text-gray-400 mb-1">DIN 3181-3</div>
            <div className="flex flex-wrap gap-2">
              {renderChip("EN", true)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


