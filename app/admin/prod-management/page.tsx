"use client";

import React from "react";
import dynamic from "next/dynamic";

const CategoryOverview = dynamic(() => import("@/components/admins/prodmanagement/CategoryOverview"), { ssr: false });

export default function ProdManagementPage() {
  return <CategoryOverview />;
}


