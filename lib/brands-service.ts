import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { adminFetch, AdminApiError } from '@/lib/admin-api';

export interface Brand {
  id: string;
  name: string;
  logo_url?: string | null;
  dark_mode_logo_url?: string | null;
  created_at: string;
  updated_at: string;
}

export interface BrandWithLogo extends Brand {
  logo_path?: string; // Computed path for display
}

/**
 * Fetch all brands from the database
 */
export async function getAllBrands(): Promise<Brand[]> {
  const supabase = createClientComponentClient();
  const { data, error } = await supabase
    .from('brands')
    .select('*')
    .order('name');
  
  if (error) {
    console.error('Error fetching brands:', error);
    throw error;
  }
  
  return data || [];
}

function toBrandError(error: unknown): Error {
  if (error instanceof AdminApiError) {
    if (error.code === "BRAND_EXISTS") return new Error("A brand with that name already exists.");
    if (error.code === "NOT_FOUND") return new Error("That brand could not be found.");
    if (error.code === "INVALID_LOGO") return new Error("The logo must be a JPEG, PNG, GIF or WebP image under 4 MB.");
    if (error.status === 401) return new Error("Please sign in again.");
    if (error.status === 403) return new Error("You do not have permission to manage brands.");
    return new Error(error.message);
  }

  return error instanceof Error ? error : new Error("The request could not be completed. Try again.");
}

/**
 * Create a new brand through the admin server route.
 */
export async function createBrand(name: string, logoUrl?: string, darkModeLogoUrl?: string): Promise<Brand> {
  try {
    const result = await adminFetch<{ brand: Brand }>("/api/admin/brands", {
      method: "POST",
      body: JSON.stringify({
        name,
        logo_url: logoUrl ?? null,
        dark_mode_logo_url: darkModeLogoUrl ?? null,
      }),
    });
    return result.brand;
  } catch (error) {
    console.error("Error creating brand:", error);
    throw toBrandError(error);
  }
}

/**
 * Update an existing brand through the admin server route.
 */
export async function updateBrand(id: string, updates: Partial<Pick<Brand, 'name' | 'logo_url' | 'dark_mode_logo_url'>>): Promise<Brand> {
  try {
    const result = await adminFetch<{ brand: Brand }>(`/api/admin/brands/${id}`, {
      method: "PATCH",
      body: JSON.stringify(updates),
    });
    return result.brand;
  } catch (error) {
    console.error("Error updating brand:", error);
    throw toBrandError(error);
  }
}

/**
 * Delete a brand through the admin server route.
 */
export async function deleteBrand(id: string): Promise<void> {
  try {
    await adminFetch<{ ok: true }>(`/api/admin/brands/${id}`, { method: "DELETE" });
  } catch (error) {
    console.error("Error deleting brand:", error);
    throw toBrandError(error);
  }
}

/**
 * Upload a brand logo through the admin server route.
 * The file is stored in the products bucket under brands/.
 */
export async function uploadBrandLogo(file: File): Promise<string> {
  try {
    const body = new FormData();
    body.set("file", file);
    const result = await adminFetch<{ logo_url: string }>("/api/admin/brands/logo", {
      method: "POST",
      body,
    });
    return result.logo_url;
  } catch (error) {
    console.error("Error uploading brand logo:", error);
    throw toBrandError(error);
  }
}

/**
 * Get brand logo path for a given brand name
 */
export function getBrandLogoPath(brandName: string, brands: Brand[]): string | null {
  const brand = brands.find(b => b.name.toLowerCase() === brandName.toLowerCase());
  return brand?.logo_url || null;
}

/**
 * Validate brand name (unique, not empty, reasonable length)
 */
export function validateBrandName(name: string, existingBrands: Brand[], excludeId?: string): string | null {
  if (!name || name.trim().length === 0) {
    return 'Brand name is required';
  }
  
  if (name.trim().length > 100) {
    return 'Brand name must be less than 100 characters';
  }
  
  const trimmedName = name.trim();
  const existingBrand = existingBrands.find(b => 
    b.name.toLowerCase() === trimmedName.toLowerCase() && b.id !== excludeId
  );
  
  if (existingBrand) {
    return 'Brand name already exists';
  }
  
  return null;
}

/**
 * Validate uploaded logo file
 */
export function validateLogoFile(file: File): string | null {
  // Check file type
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
  if (!allowedTypes.includes(file.type)) {
    return 'Logo must be a valid image file (JPEG, PNG, GIF, or WebP)';
  }
  
  // The upload now goes through the app server, whose request body limit is 4.5 MB.
  const maxSize = 4 * 1024 * 1024;
  if (file.size > maxSize) {
    return 'Logo file must be less than 4 MB';
  }
  
  return null;
}
