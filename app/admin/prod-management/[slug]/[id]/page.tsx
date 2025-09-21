"use client";

import React from "react";
import { useParams } from "next/navigation";
import dynamic from "next/dynamic";

const CategoryProductEdit = dynamic(() => import("@/components/admins/prodmanagement/CategoryProductEdit"), { ssr: false });

export default function ProdManagementCategoryEditPage() {
  const params = useParams() as { slug?: string | string[]; id?: string | string[] } | null;
  const slug = params && Array.isArray(params.slug) ? params.slug[0] : String((params && params.slug) || 'gloves');
  const id = params && Array.isArray(params.id) ? params.id[0] : String((params && params.id) || '');
  return <CategoryProductEdit id={id} slug={slug} />;
}


