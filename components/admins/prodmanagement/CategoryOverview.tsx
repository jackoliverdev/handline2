"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/lib/context/language-context";

type CategoryInfo = {
  key: string;
  title: string;
  imageSrc: string;
  href: string;
};

const categoryImageMap: Record<string, string> = {
  gloves: "/glovecats/49K-C_A.webp",
  industrialSwabs: "/images/HLC_SWABS_main.jpg",
  respiratory: "/images/products/categories/respirator.jpeg",
  armProtection: "/images/products/categories/armppe.webp",
  hearing: "/images/products/categories/single use ear plugs.webp",
  footwear: "/images/products/categories/safetyboot.png",
  eyeFace: "/images/products/categories/metalfreeglasses.jpg",
  head: "/images/products/categories/Safety helmet suitable for low temperatures and splash protection.webp",
  clothing: "/images/products/categories/High-Vis, Jacket High-Vis.webp",
};

export default function CategoryOverview() {
  const { t } = useLanguage();
  const [counts, setCounts] = React.useState<Record<string, number>>({});
  const [loading, setLoading] = React.useState(true);

  const items: CategoryInfo[] = [
    { key: "gloves", title: t("products.categories.main.gloves.title"), imageSrc: categoryImageMap.gloves, href: "/admin/prod-management/gloves" },
    { key: "industrialSwabs", title: t("products.categories.main.industrialSwabs.title"), imageSrc: categoryImageMap.industrialSwabs, href: "/admin/prod-management/industrial-swabs" },
    { key: "respiratory", title: t("products.categories.main.respiratory.title"), imageSrc: categoryImageMap.respiratory, href: "/admin/prod-management/respiratory" },
    { key: "hearing", title: t("products.categories.main.hearing.title"), imageSrc: categoryImageMap.hearing, href: "/admin/prod-management/hearing" },
    { key: "armProtection", title: t("products.categories.main.armProtection.title"), imageSrc: categoryImageMap.armProtection, href: "/admin/prod-management/arm-protection" },
    { key: "footwear", title: t("products.categories.main.footwear.title"), imageSrc: categoryImageMap.footwear, href: "/admin/prod-management/footwear" },
    { key: "eyeFace", title: t("products.categories.main.eyeFace.title"), imageSrc: categoryImageMap.eyeFace, href: "/admin/prod-management/eye-face" },
    { key: "head", title: t("products.categories.main.head.title"), imageSrc: categoryImageMap.head, href: "/admin/prod-management/head" },
    { key: "clothing", title: t("products.categories.main.clothing.title"), imageSrc: categoryImageMap.clothing, href: "/admin/prod-management/clothing" },
  ];

  React.useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/products');
        const data = res.ok ? await res.json() : [];

        const nextCounts: Record<string, number> = {
          gloves: 0,
          industrialSwabs: 0,
          respiratory: 0,
          armProtection: 0,
          hearing: 0,
          footwear: 0,
          eyeFace: 0,
          head: 0,
          clothing: 0,
        };

        const otherSet = new Set<string>();
        const published = (data as any[]).filter((p) => p?.published);

        for (const p of published) {
          const id = String(p.id);
          const cat = (p.category || '').toLowerCase();
          const sub = (p.sub_category || '').toLowerCase();

          const isSwab = cat.includes('swab');
          const isResp = cat.includes('respir');
          const isArm = cat.includes('arm') || sub.includes('sleeve');
          const isHear = cat.includes('hearing') || sub.includes('ear');
          const isFw = cat.includes('footwear') || sub.includes('boot') || sub.includes('insol');
          const isEye = cat.includes('eye') || cat.includes('face') || sub.includes('glasses') || sub.includes('goggle') || sub.includes('visor') || sub.includes('face shield');
          const isHead = cat.includes('head') || sub.includes('helmet') || sub.includes('bump');
          const isCloth = cat.includes('clothing') || sub.includes('jacket');

          if (isSwab) { nextCounts.industrialSwabs++; otherSet.add(id); }
          if (isResp) { nextCounts.respiratory++; otherSet.add(id); }
          if (isArm) { nextCounts.armProtection++; otherSet.add(id); }
          if (isHear) { nextCounts.hearing++; otherSet.add(id); }
          if (isFw) { nextCounts.footwear++; otherSet.add(id); }
          if (isEye) { nextCounts.eyeFace++; otherSet.add(id); }
          if (isHead) { nextCounts.head++; otherSet.add(id); }
          if (isCloth) { nextCounts.clothing++; otherSet.add(id); }
        }

        const totalPublished = published.length;
        const uniqueOther = otherSet.size;
        const gloveCount = Math.max(0, totalPublished - uniqueOther);
        nextCounts.gloves = gloveCount;

        setCounts(nextCounts);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Product Management</CardTitle>
          <CardDescription>Overview by category. Published counts shown per category.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.map((item) => (
              <Link key={item.key} href={item.href} className="block">
                <div className="rounded-lg border hover:shadow-md transition overflow-hidden bg-white dark:bg-[#0f0f0f]">
                  <div className="relative h-36 bg-muted">
                    <Image src={item.imageSrc} alt={item.title} fill className="object-cover" />
                    <div className="absolute top-2 left-2">
                      <Badge variant="secondary" className="bg-[#F5EFE0] text-[#1E1E1E]">
                        {loading ? "…" : (counts[item.key] ?? 0)} published
                      </Badge>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-sm md:text-base">{item.title}</h3>
                    <p className="text-xs text-muted-foreground mt-1">Manage products in this category</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}


