"use client";

import React from "react";
import { useParams } from "next/navigation";
import dynamic from "next/dynamic";

const CategoryProductCreate = dynamic(() => import("@/components/admins/prodmanagement/CategoryProductCreate"), { ssr: false });

export default function ProdManagementCategoryCreatePage() {
  const params = useParams() as { slug?: string | string[] } | null;
  const slug = params && Array.isArray(params.slug) ? params.slug[0] : String((params && params.slug) || 'gloves');
  return <CategoryProductCreate slug={slug} />;
}


