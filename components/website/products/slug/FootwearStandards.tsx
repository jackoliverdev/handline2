"use client";

import { Product } from "@/lib/products-service";
import { useLanguage } from "@/lib/context/language-context";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Footprints, AlertTriangle } from "lucide-react";

export function FootwearStandards({ product }: { product: Product }) {
  const { t } = useLanguage();
  const fstd: any = (product as any).footwear_standards || {};

  const codes2011: string[] = Array.isArray(fstd.en_iso_20345_2011) ? fstd.en_iso_20345_2011 : [];
  const codes2022: string[] = Array.isArray(fstd.en_iso_20345_2022) ? fstd.en_iso_20345_2022 : [];

  // Check if we have any additional standards to display
  const hasAdditionalStandards = fstd.en_421 || fstd.en_659 || fstd.food_grade || fstd.ionising_radiation || fstd.radioactive_contamination;

  const unique = (arr: string[]) => Array.from(new Set(arr.filter(Boolean)));

  // Helpers to detect class codes and compute a green intensity similar to gloves levels
  const isClassCode = (code: string) => /^S(?:B|[1-7]L?|[1-7]P?L?)$/i.test(code);
  const classRank = (code: string): number => {
    const c = code.toUpperCase();
    const table: Record<string, number> = {
      SB: 1,
      S1: 2,
      S1P: 3,
      S2: 3,
      S3: 4,
      S3L: 5,
      S4: 3,
      S5: 4,
      S6: 5,
      S7: 6,
      S7L: 7,
    };
    return table[c] ?? 1;
  };
  const classColour = (rank: number): string => {
    switch (rank) {
      case 1: return "bg-emerald-200 text-white";
      case 2: return "bg-emerald-300 text-white";
      case 3: return "bg-emerald-400 text-white";
      case 4: return "bg-emerald-500 text-white";
      case 5: return "bg-emerald-600 text-white";
      case 6: return "bg-emerald-700 text-white";
      default: return "bg-emerald-800 text-white";
    }
  };

  const renderStandardBox = (title: string, codes: string[]) => {
    const uniq = unique(codes);
    const classCodes = uniq.filter(isClassCode);
    const otherCodes = uniq.filter((c) => !isClassCode(c));
    const bestClass = classCodes.sort((a, b) => classRank(b) - classRank(a))[0];
    const rank = bestClass ? classRank(bestClass) : 0;
    return (
      <div className="group relative overflow-hidden rounded-lg border bg-white dark:bg-black/50 shadow-sm transition-all duration-300 hover:shadow-md border-brand-primary/10 dark:border-brand-primary/20 backdrop-blur-sm p-4">
        <div className="flex items-center gap-3 mb-3">
          <Footprints className="h-5 w-5 text-brand-primary" />
          <h3 className="font-medium text-brand-dark dark:text-white">{title}</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div>
            <div className="text-xs text-brand-secondary dark:text-gray-400 mb-1">Class</div>
            {bestClass ? (
              <span className={`inline-flex items-center rounded px-2 py-0.5 text-xs font-semibold ${classColour(rank)}`}>{bestClass.toUpperCase()}</span>
            ) : (
              <span className="text-sm text-brand-secondary dark:text-gray-300">-</span>
            )}
          </div>
          <div className="md:col-span-2">
            <div className="text-xs text-brand-secondary dark:text-gray-400 mb-1">Codes</div>
            <div className="flex flex-wrap gap-2">
              {otherCodes.length > 0 ? (
                otherCodes.map((c) => (
                  <span key={c} className="inline-flex items-center rounded px-2 py-0.5 text-xs font-semibold bg-emerald-500 text-white">
                    {c.toUpperCase()}
                  </span>
                ))
              ) : (
                <span className="text-sm text-brand-secondary dark:text-gray-300">-</span>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      {(codes2011.length > 0) && renderStandardBox(t('productPage.enIso20345_2011') || 'EN ISO 20345:2011', codes2011)}
      {(codes2022.length > 0) && renderStandardBox(t('productPage.enIso20345_2022') || 'EN ISO 20345:2022', codes2022)}
      
      {/* Additional footwear standards */}
      {hasAdditionalStandards && (
        <Card className="border-brand-primary/10 dark:border-brand-primary/20">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-brand-primary" />
              <h3 className="font-medium text-brand-dark dark:text-white">
                {t('productPage.additionalStandards')}
              </h3>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {fstd.en_421 && (
                <Badge className="bg-brand-primary/10 text-brand-primary hover:bg-brand-primary/10 text-sm px-3 py-1">
                  EN 421 - {t('productPage.stdLabel.en421')}
                </Badge>
              )}
              {fstd.en_659 && (
                <Badge className="bg-brand-primary/10 text-brand-primary hover:bg-brand-primary/10 text-sm px-3 py-1">
                  EN 659 - {t('productPage.stdLabel.en659')}
                </Badge>
              )}
              {fstd.food_grade && (
                <Badge className="bg-brand-primary/10 text-brand-primary hover:bg-brand-primary/10 text-sm px-3 py-1">
                  {t('productPage.stdLabel.foodGrade')}
                </Badge>
              )}
              {fstd.ionising_radiation && (
                <Badge className="bg-brand-primary/10 text-brand-primary hover:bg-brand-primary/10 text-sm px-3 py-1">
                  {t('productPage.stdLabel.ionisingRadiation')}
                </Badge>
              )}
              {fstd.radioactive_contamination && (
                <Badge className="bg-brand-primary/10 text-brand-primary hover:bg-brand-primary/10 text-sm px-3 py-1">
                  {t('productPage.stdLabel.radioactiveContamination')}
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}


