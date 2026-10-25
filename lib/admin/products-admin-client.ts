"use client";

import { adminFetch, AdminApiError } from "@/lib/admin-api";
import { adminUploadFile } from "@/lib/admin/upload-client";
import type { Product } from "@/lib/products-service";

export async function createProduct(productData: Partial<Product>): Promise<{ product: Product | null; error?: string }> {
  try {
    const result = await adminFetch<{ product: Product }>("/api/admin/products", {
      method: "POST",
      body: JSON.stringify(productData),
    });
    return { product: result.product };
  } catch (error) {
    console.error("Error creating product:", error);
    if (error instanceof AdminApiError) {
      return { product: null, error: error.message };
    }
    return { product: null, error: error instanceof Error ? error.message : "Unable to create product." };
  }
}

export async function updateProduct(id: string, updates: Partial<Product>): Promise<{ product: Product | null }> {
  try {
    const result = await adminFetch<{ product: Product }>(`/api/admin/products/${id}`, {
      method: "PATCH",
      body: JSON.stringify(updates),
    });
    return { product: result.product };
  } catch (error) {
    console.error(`Error updating product with ID ${id}:`, error);
    return { product: null };
  }
}

export async function deleteProduct(id: string): Promise<{ success: boolean }> {
  try {
    await adminFetch<{ ok: true }>(`/api/admin/products/${id}`, { method: "DELETE" });
    return { success: true };
  } catch (error) {
    console.error(`Error in deleteProduct for ${id}:`, error);
    return { success: false };
  }
}

export async function toggleProductFeatured(id: string): Promise<{ product: Product | null }> {
  try {
    const result = await adminFetch<{ product: Product }>(`/api/admin/products/${id}/toggle`, {
      method: "POST",
      body: JSON.stringify({ field: "is_featured" }),
    });
    return { product: result.product };
  } catch (error) {
    console.error(`Error in toggleProductFeatured for ${id}:`, error);
    return { product: null };
  }
}

export async function toggleProductStock(id: string): Promise<{ product: Product | null }> {
  try {
    const result = await adminFetch<{ product: Product }>(`/api/admin/products/${id}/toggle`, {
      method: "POST",
      body: JSON.stringify({ field: "out_of_stock" }),
    });
    return { product: result.product };
  } catch (error) {
    console.error(`Error in toggleProductStock for ${id}:`, error);
    return { product: null };
  }
}

export async function getAdminProduct(id: string): Promise<{ product: Product | null }> {
  try {
    const result = await adminFetch<{ product: Product }>(`/api/admin/products/${id}`);
    return { product: result.product ?? null };
  } catch (error) {
    console.error(`Error fetching product with ID ${id}:`, error);
    return { product: null };
  }
}

export async function isProductNameTaken(name: string): Promise<boolean> {
  const params = new URLSearchParams({ name });
  const result = await adminFetch<{ taken: boolean }>(`/api/admin/products/name-check?${params.toString()}`);
  return result.taken;
}

export async function uploadProductImage(file: File, productId: string): Promise<{ url: string | null }> {
  const fileExt = file.name.split(".").pop();
  const url = await adminUploadFile("products", `${productId}/${Date.now()}.${fileExt}`, file);
  return { url };
}
