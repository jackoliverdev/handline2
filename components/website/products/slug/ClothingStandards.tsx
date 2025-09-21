"use client";

import { Product } from "@/lib/products-service";
import { Badge } from "@/components/ui/badge";

type ClothingStandards = {
  en_iso_20471?: { class?: number };
  en_iso_11612?: { a?: number | boolean; a1?: boolean; a2?: boolean; b?: number; c?: number; d?: number; e?: number; f?: number };
  en_iso_11611?: { class?: number };
  iec_61482_2?: { class?: number };
  en_1149_5?: boolean;
  en_13034?: string;
  en_343?: { water?: number; breath?: number };
  uv_standard_801?: boolean;
};

export function ClothingStandards({ product }: { product: Product }) {
  const std: ClothingStandards = (product as any).clothing_standards || {};

  const renderChip = (label: string) => (
    <Badge key={label} variant="outline" className="bg-brand-primary/5 border-brand-primary/30 text-brand-dark dark:text-white">
      {label}
    </Badge>
  );

  const has11612 = Boolean(std.en_iso_11612 && Object.keys(std.en_iso_11612!).length > 0);

  const renderCard = (title: string, chips: string[]) => {
    if (chips.length === 0) return null;
    return (
      <div className="group relative overflow-hidden rounded-lg border bg-white dark:bg-black/50 shadow-sm transition-all duration-300 hover:shadow-md border-brand-primary/10 dark:border-brand-primary/20 backdrop-blur-sm p-4">
        <h3 className="font-medium text-brand-dark dark:text-white mb-2">{title}</h3>
        <div className="flex flex-wrap gap-2">
          {chips.map((c) => renderChip(c))}
        </div>
      </div>
    );
  };

  const chips20471: string[] = [];
  if (std.en_iso_20471?.class) chips20471.push(`Class ${std.en_iso_20471.class}`);

  const chips11612: string[] = [];
  if (has11612) {
    const s = std.en_iso_11612!;
    if (s.a1) chips11612.push("A1");
    if ((s as any).a2) chips11612.push("A2");
    if (typeof s.b === 'number') chips11612.push(`B${s.b}`);
    if (typeof s.c === 'number') chips11612.push(`C${s.c}`);
    if (typeof s.d === 'number') chips11612.push(`D${s.d}`);
    if (typeof s.e === 'number') chips11612.push(`E${s.e}`);
    if (typeof s.f === 'number') chips11612.push(`F${s.f}`);
  }

  const chips11611: string[] = [];
  if (std.en_iso_11611?.class) chips11611.push(`Class ${std.en_iso_11611.class}`);

  const chipsArc: string[] = [];
  if (std.iec_61482_2?.class) chipsArc.push(`Class ${std.iec_61482_2.class}`);

  const chipsAntistatic: string[] = [];
  if (std.en_1149_5) chipsAntistatic.push("EN 1149-5");

  const chips13034: string[] = [];
  if (std.en_13034) chips13034.push(std.en_13034);

  const chips343: string[] = [];
  if (std.en_343) {
    if (typeof std.en_343.water === 'number') chips343.push(`W${std.en_343.water}`);
    if (typeof std.en_343.breath === 'number') chips343.push(`B${std.en_343.breath}`);
  }

  const chipsUV: string[] = [];
  if (std.uv_standard_801) chipsUV.push("UV 801");

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {renderCard("EN ISO 20471", chips20471)}
        {renderCard("EN ISO 11612", chips11612)}
        {renderCard("EN ISO 11611", chips11611)}
        {renderCard("IEC 61482-2", chipsArc)}
        {renderCard("EN 1149-5", chipsAntistatic)}
        {renderCard("EN 13034", chips13034)}
        {renderCard("EN 343", chips343)}
        {renderCard("UV Standard 801", chipsUV)}
      </div>
    </div>
  );
}


