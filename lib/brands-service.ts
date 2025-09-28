import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

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

/**
 * Create a new brand
 */
export async function createBrand(name: string, logoUrl?: string, darkModeLogoUrl?: string): Promise<Brand> {
  const supabase = createClientComponentClient();
  const { data, error } = await supabase
    .from('brands')
    .insert({ name, logo_url: logoUrl, dark_mode_logo_url: darkModeLogoUrl })
    .select()
    .single();
  
  if (error) {
    console.error('Error creating brand:', error);
    throw error;
  }
  
  return data;
}

/**
 * Update an existing brand
 */
export async function updateBrand(id: string, updates: Partial<Pick<Brand, 'name' | 'logo_url' | 'dark_mode_logo_url'>>): Promise<Brand> {
  const supabase = createClientComponentClient();
  const { data, error } = await supabase
    .from('brands')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();
  
  if (error) {
    console.error('Error updating brand:', error);
    throw error;
  }
  
  return data;
}

/**
 * Delete a brand
 */
export async function deleteBrand(id: string): Promise<void> {
  const supabase = createClientComponentClient();
  const { error } = await supabase
    .from('brands')
    .delete()
    .eq('id', id);
  
  if (error) {
    console.error('Error deleting brand:', error);
    throw error;
  }
}

/**
 * Upload brand logo to Supabase storage
 */
export async function uploadBrandLogo(file: File): Promise<string> {
  const supabase = createClientComponentClient();
  
  // Generate unique filename
  const fileExt = file.name.split('.').pop();
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
  const filePath = `brands/${fileName}`;
  
  // Upload to Supabase storage
  const { data, error } = await supabase.storage
    .from('products')
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false
    });
  
  if (error) {
    console.error('Error uploading brand logo:', error);
    throw error;
  }
  
  // Get public URL
  const { data: { publicUrl } } = supabase.storage
    .from('products')
    .getPublicUrl(filePath);
  
  return publicUrl;
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
  
  // Check file size (max 5MB)
  const maxSize = 5 * 1024 * 1024; // 5MB
  if (file.size > maxSize) {
    return 'Logo file must be less than 5MB';
  }
  
  return null;
}
