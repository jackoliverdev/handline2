"use client";

import React from "react";
import { useParams } from "next/navigation";
import dynamic from "next/dynamic";

const CategoryProductGrid = dynamic(() => import("@/components/admins/prodmanagement/CategoryProductGrid"), { ssr: false });

export default function ProdManagementCategoryPage() {
  const params = useParams() as { slug?: string | string[] } | null;
  const slug = params && Array.isArray(params.slug) ? params.slug[0] : String((params && params.slug) || 'gloves');
  return <CategoryProductGrid slug={slug} />;
}


