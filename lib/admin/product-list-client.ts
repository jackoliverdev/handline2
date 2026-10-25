"use client";

import { adminFetch } from "@/lib/admin-api";
import type { Product } from "@/lib/products-service";

export async function getAdminProductList(): Promise<Product[]> {
  const { products } = await adminFetch<{ products: Product[] }>("/api/admin/products/list");
  return products;
}
