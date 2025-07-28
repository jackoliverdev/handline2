import { supabase } from './supabase';
import type { Language } from './context/language-context';

// Safety Standards interfaces
export interface SafetyEN388 {
  enabled: boolean;
  abrasion: number | null;
  cut: number | null;
  tear: number | null;
  puncture: number | null;
  iso_13997: string | null;
  impact_en_13594: string | null;
}

export interface SafetyEN407 {
  enabled: boolean;
  contact_heat: number | null;
  radiant_heat: number | null;
  convective_heat: number | null;
  limited_flame_spread: number | null;
  small_splashes_molten_metal: number | null;
  large_quantities_molten_metal: string | null;
}

export interface SafetyEN511 {
  enabled: boolean;
  contact_cold: number | null;
  convective_cold: number | null;
  water_permeability: number | null;
}

export interface SafetyEN374_1 {
  enabled: boolean;
  type: string | null;
  chemicals_tested: string[] | null;
}

export interface SafetyStandards {
  en_388?: SafetyEN388;
  en_407?: SafetyEN407;
  en_421?: boolean;
  en_511?: SafetyEN511;
  en_659?: boolean;
  en_12477?: boolean;
  en_16350?: boolean;
  en_374_1?: SafetyEN374_1;
  en_374_5?: boolean;
  en_381_7?: boolean;
  en_60903?: boolean;
  en_1082_1?: boolean;
  food_grade?: boolean;
  en_iso_21420?: boolean;
  ionising_radiation?: string | null;
  radioactive_contamination?: string | null;
}

export interface EnvironmentPictograms {
  dry?: boolean;
  wet?: boolean;
  dust?: boolean;
  chemical?: boolean;
  biological?: boolean;
  oily_grease?: boolean;
}

export type AvailabilityStatus = 'in_stock' | 'made_to_order' | 'out_of_stock' | 'coming_soon';

export interface Product {
  id: string;
  name: string;
  description: string;
  short_description: string;
  category: string;
  sub_category?: string | null;
  temperature_rating?: number | null;
  cut_resistance_level?: string | null;
  en_standard?: 'EN388' | 'EN407' | null;
  features: string[];
  applications: string[];
  industries: string[];
  image_url?: string | null;
  image2_url?: string | null;
  image3_url?: string | null;
  image4_url?: string | null;
  image5_url?: string | null;
  additional_images?: string[] | null;
  technical_sheet_url?: string | null;
  declaration_sheet_url?: string | null;
  technical_sheet_url_it?: string | null;
  declaration_sheet_url_it?: string | null;
  is_featured: boolean;
  out_of_stock: boolean;
  order_priority: number;
  related_product_id_1?: string | null;
  related_product_id_2?: string | null;
  related_product_id_3?: string | null;
  related_product_id_4?: string | null;
  created_at: string;
  updated_at: string;
  // New extended fields
  brands: string[];
  tags_locales: Record<string, string[]>;
  size_locales?: Record<string, string> | null;
  length_cm?: number | null;
  ce_category?: string | null;
  published: boolean;
  coming_soon: boolean;
  availability_status: AvailabilityStatus;
  safety: SafetyStandards;
  environment_pictograms: EnvironmentPictograms;
  // Locales fields (optional for typing)
  name_locales?: Record<string, string>;
  description_locales?: Record<string, string>;
  short_description_locales?: Record<string, string>;
  category_locales?: Record<string, string>;
  sub_category_locales?: Record<string, string>;
  features_locales?: Record<string, string[]>;
  applications_locales?: Record<string, string[]>;
  industries_locales?: Record<string, string[]>;
}

export function localiseProduct(product: Product, language: Language): Product {
  return {
    ...product,
    name: product.name_locales?.[language] || product.name_locales?.en || product.name,
    description: product.description_locales?.[language] || product.description_locales?.en || product.description,
    short_description: product.short_description_locales?.[language] || product.short_description_locales?.en || product.short_description,
    category: product.category_locales?.[language] || product.category_locales?.en || product.category,
    sub_category: product.sub_category_locales?.[language] || product.sub_category_locales?.en || product.sub_category,
    features: product.features_locales?.[language] || product.features_locales?.en || product.features,
    applications: product.applications_locales?.[language] || product.applications_locales?.en || product.applications,
    industries: product.industries_locales?.[language] || product.industries_locales?.en || product.industries,
    // New localised fields
    tags_locales: {
      [language]: product.tags_locales?.[language] || product.tags_locales?.en || []
    },
    size_locales: product.size_locales ? {
      [language]: product.size_locales?.[language] || product.size_locales?.en || ''
    } : null,
  };
}

/**
 * Fetch all products from Supabase
 */
export async function getAllProducts(): Promise<{ products: Product[] }> {
  try {
    console.log('Fetching all products from Supabase...', new Date().toISOString());
    
    // Add cache busting by using a fresh query each time
    const { data, error } = await supabase
      .from('products')
      .select('*', { head: false, count: 'exact' })
      .order('is_featured', { ascending: false })
      .order('order_priority', { ascending: false })
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching products:', error);
      return { products: [] };
    }

    // Parse JSONB fields
    const products = data.map(product => ({
      ...product,
      features: Array.isArray(product.features) ? product.features : [],
      applications: Array.isArray(product.applications) ? product.applications : [],
      industries: Array.isArray(product.industries) ? product.industries : [],
      additional_images: Array.isArray(product.additional_images) ? product.additional_images : [],
      // New extended fields with proper defaults
      brands: Array.isArray(product.brands) ? product.brands : [],
      tags_locales: product.tags_locales && typeof product.tags_locales === 'object' ? product.tags_locales : {},
      size_locales: product.size_locales && typeof product.size_locales === 'object' ? product.size_locales : null,
      length_cm: product.length_cm || null,
      ce_category: product.ce_category || null,
      published: product.published ?? false,
      coming_soon: product.coming_soon ?? false,
      availability_status: product.availability_status || 'in_stock',
      safety: product.safety && typeof product.safety === 'object' ? product.safety : {},
      environment_pictograms: product.environment_pictograms && typeof product.environment_pictograms === 'object' ? product.environment_pictograms : {}
    }));
    
    console.log(`Fetched ${products.length} products at ${new Date().toISOString()}`);
    return { products };
  } catch (error) {
    console.error('Error in getAllProducts:', error);
    return { products: [] };
  }
}

/**
 * Fetch featured products from Supabase
 */
export async function getFeaturedProducts(language: Language): Promise<{ products: Product[] }> {
  try {
    console.log('Fetching featured products from Supabase...');
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('is_featured', true)
      .order('order_priority', { ascending: false })
      .order('created_at', { ascending: false });
    if (error) {
      console.error('Error fetching featured products:', error);
      return { products: [] };
    }
    // Parse JSONB fields and localise
    const products = data.map(product => localiseProduct({
      ...product,
      features: Array.isArray(product.features) ? product.features : [],
      applications: Array.isArray(product.applications) ? product.applications : [],
      industries: Array.isArray(product.industries) ? product.industries : [],
      additional_images: Array.isArray(product.additional_images) ? product.additional_images : []
    }, language));
    console.log(`Fetched ${products.length} featured products`);
    return { products };
  } catch (error) {
    console.error('Error in getFeaturedProducts:', error);
    return { products: [] };
  }
}

/**
 * Fetch a single product by slug
 */
export async function getProductBySlug(slug: string): Promise<{ product: Product | null }> {
  try {
    console.log(`Fetching product with slug: ${slug}...`, new Date().toISOString());
    
    // We need to use the name field as the slug since our new schema doesn't have a slug field
    const { data, error } = await supabase
      .from('products')
      .select('*', { head: false })
      .eq('name', slug)
      .single();
    
    if (error) {
      console.error(`Error fetching product with slug ${slug}:`, error);
      return { product: null };
    }

    // Parse JSONB fields 
    const product = {
      ...data,
      features: Array.isArray(data.features) ? data.features : [],
      applications: Array.isArray(data.applications) ? data.applications : [],
      industries: Array.isArray(data.industries) ? data.industries : [],
      additional_images: Array.isArray(data.additional_images) ? data.additional_images : [],
      // New extended fields with proper defaults
      brands: Array.isArray(data.brands) ? data.brands : [],
      tags_locales: data.tags_locales && typeof data.tags_locales === 'object' ? data.tags_locales : {},
      size_locales: data.size_locales && typeof data.size_locales === 'object' ? data.size_locales : null,
      length_cm: data.length_cm || null,
      ce_category: data.ce_category || null,
      published: data.published ?? false,
      coming_soon: data.coming_soon ?? false,
      availability_status: data.availability_status || 'in_stock',
      safety: data.safety && typeof data.safety === 'object' ? data.safety : {},
      environment_pictograms: data.environment_pictograms && typeof data.environment_pictograms === 'object' ? data.environment_pictograms : {}
    };
    
    console.log(`Fetched product: ${product.name} at ${new Date().toISOString()}`);
    return { product };
  } catch (error) {
    console.error(`Error in getProductBySlug for ${slug}:`, error);
    return { product: null };
  }
}

/**
 * Fetch a single product by ID
 */
export async function getProductById(id: string): Promise<{ product: Product | null }> {
  try {
    console.log(`Fetching product with ID: ${id}...`);
    
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      console.error(`Error fetching product with ID ${id}:`, error);
      return { product: null };
    }

    // Parse JSONB fields
    const product = {
      ...data,
      features: Array.isArray(data.features) ? data.features : [],
      applications: Array.isArray(data.applications) ? data.applications : [],
      industries: Array.isArray(data.industries) ? data.industries : [],
      additional_images: Array.isArray(data.additional_images) ? data.additional_images : [],
      // New extended fields with proper defaults
      brands: Array.isArray(data.brands) ? data.brands : [],
      tags_locales: data.tags_locales && typeof data.tags_locales === 'object' ? data.tags_locales : {},
      size_locales: data.size_locales && typeof data.size_locales === 'object' ? data.size_locales : null,
      length_cm: data.length_cm || null,
      ce_category: data.ce_category || null,
      published: data.published ?? false,
      coming_soon: data.coming_soon ?? false,
      availability_status: data.availability_status || 'in_stock',
      safety: data.safety && typeof data.safety === 'object' ? data.safety : {},
      environment_pictograms: data.environment_pictograms && typeof data.environment_pictograms === 'object' ? data.environment_pictograms : {}
    };
    
    console.log(`Fetched product: ${product.name}`);
    return { product };
  } catch (error) {
    console.error(`Error in getProductById for ${id}:`, error);
    return { product: null };
  }
}

/**
 * Fetch products by category
 */
export async function getProductsByCategory(category: string): Promise<{ products: Product[] }> {
  try {
    console.log(`Fetching products in category: ${category}...`);
    
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('category', category)
      .order('order_priority', { ascending: false })
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error(`Error fetching products in category ${category}:`, error);
      return { products: [] };
    }

    // Parse JSONB fields
    const products = data.map(product => ({
      ...product,
      features: Array.isArray(product.features) ? product.features : [],
      applications: Array.isArray(product.applications) ? product.applications : [],
      industries: Array.isArray(product.industries) ? product.industries : [],
      additional_images: Array.isArray(product.additional_images) ? product.additional_images : []
    }));
    
    console.log(`Fetched ${products.length} products in category ${category}`);
    return { products };
  } catch (error) {
    console.error(`Error in getProductsByCategory for ${category}:`, error);
    return { products: [] };
  }
}

/**
 * Fetch products by industry
 */
export async function getProductsByIndustry(industry: string): Promise<{ products: Product[] }> {
  try {
    console.log(`Fetching products for industry: ${industry}...`);
    
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .contains('industries', [industry])
      .order('order_priority', { ascending: false })
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error(`Error fetching products for industry ${industry}:`, error);
      return { products: [] };
    }

    // Parse JSONB fields
    const products = data.map(product => ({
      ...product,
      features: Array.isArray(product.features) ? product.features : [],
      applications: Array.isArray(product.applications) ? product.applications : [],
      industries: Array.isArray(product.industries) ? product.industries : [],
      additional_images: Array.isArray(product.additional_images) ? product.additional_images : []
    }));
    
    console.log(`Fetched ${products.length} products for industry ${industry}`);
    return { products };
  } catch (error) {
    console.error(`Error in getProductsByIndustry for ${industry}:`, error);
    return { products: [] };
  }
}

/**
 * Create a new product
 */
export async function createProduct(productData: Partial<Product>): Promise<{ product: Product | null }> {
  try {
    console.log('Creating new product:', productData.name);
    
    const { data, error } = await supabase
      .from('products')
      .insert([productData])
      .select()
      .single();
    
    if (error) {
      console.error('Error creating product:', error);
      return { product: null };
    }
    
    // Parse JSONB fields
    const product = {
      ...data,
      features: Array.isArray(data.features) ? data.features : [],
      applications: Array.isArray(data.applications) ? data.applications : [],
      industries: Array.isArray(data.industries) ? data.industries : [],
      additional_images: Array.isArray(data.additional_images) ? data.additional_images : []
    };
    
    console.log(`Created product: ${product.name} with ID: ${product.id}`);
    
    // Clear cache
    await clearProductCache();
    
    return { product };
  } catch (error) {
    console.error('Error in createProduct:', error);
    return { product: null };
  }
}

/**
 * Update an existing product
 */
export async function updateProduct(id: string, updates: Partial<Product>): Promise<{ product: Product | null }> {
  try {
    console.log(`Updating product with ID: ${id}`);
    
    const { data, error } = await supabase
      .from('products')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      console.error(`Error updating product with ID ${id}:`, error);
      return { product: null };
    }
    
    // Parse JSONB fields
    const product = {
      ...data,
      features: Array.isArray(data.features) ? data.features : [],
      applications: Array.isArray(data.applications) ? data.applications : [],
      industries: Array.isArray(data.industries) ? data.industries : [],
      additional_images: Array.isArray(data.additional_images) ? data.additional_images : []
    };
    
    console.log(`Updated product: ${product.name}`);
    
    // Clear cache
    await clearProductCache();
    
    return { product };
  } catch (error) {
    console.error(`Error in updateProduct for ${id}:`, error);
    return { product: null };
  }
}

/**
 * Delete a product
 */
export async function deleteProduct(id: string): Promise<{ success: boolean }> {
  try {
    console.log(`Deleting product with ID: ${id}`);
    
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error(`Error deleting product with ID ${id}:`, error);
      return { success: false };
    }
    
    console.log(`Successfully deleted product with ID: ${id}`);
    
    // Clear cache
    await clearProductCache();
    
    return { success: true };
  } catch (error) {
    console.error(`Error in deleteProduct for ${id}:`, error);
    return { success: false };
  }
}

/**
 * Toggle the featured status of a product
 */
export async function toggleProductFeatured(id: string): Promise<{ product: Product | null }> {
  try {
    console.log(`Toggling featured status for product with ID: ${id}`);
    
    // First get the current featured status
    const { product: currentProduct } = await getProductById(id);
    
    if (!currentProduct) {
      console.error(`Product with ID ${id} not found`);
      return { product: null };
    }
    
    // Toggle the featured status
    const newFeaturedStatus = !currentProduct.is_featured;
    
    const { data, error } = await supabase
      .from('products')
      .update({ is_featured: newFeaturedStatus })
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      console.error(`Error toggling featured status for product with ID ${id}:`, error);
      return { product: null };
    }
    
    // Parse JSONB fields
    const product = {
      ...data,
      features: Array.isArray(data.features) ? data.features : [],
      applications: Array.isArray(data.applications) ? data.applications : [],
      industries: Array.isArray(data.industries) ? data.industries : [],
      additional_images: Array.isArray(data.additional_images) ? data.additional_images : []
    };
    
    console.log(`Updated featured status to ${newFeaturedStatus} for product: ${product.name}`);
    
    // Clear cache
    await clearProductCache();
    
    return { product };
  } catch (error) {
    console.error(`Error in toggleProductFeatured for ${id}:`, error);
    return { product: null };
  }
}

/**
 * Toggle the out_of_stock status of a product
 */
export async function toggleProductStock(id: string): Promise<{ product: Product | null }> {
  try {
    console.log(`Toggling stock status for product with ID: ${id}`);
    
    // First get the current stock status
    const { product: currentProduct } = await getProductById(id);
    
    if (!currentProduct) {
      console.error(`Product with ID ${id} not found`);
      return { product: null };
    }
    
    // Toggle the stock status
    const newStockStatus = !currentProduct.out_of_stock;
    
    const { data, error } = await supabase
      .from('products')
      .update({ out_of_stock: newStockStatus })
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      console.error(`Error toggling stock status for product with ID ${id}:`, error);
      return { product: null };
    }
    
    // Parse JSONB fields
    const product = {
      ...data,
      features: Array.isArray(data.features) ? data.features : [],
      applications: Array.isArray(data.applications) ? data.applications : [],
      industries: Array.isArray(data.industries) ? data.industries : [],
      additional_images: Array.isArray(data.additional_images) ? data.additional_images : []
    };
    
    console.log(`Updated stock status to ${newStockStatus} for product: ${product.name}`);
    
    // Clear cache
    await clearProductCache();
    
    return { product };
  } catch (error) {
    console.error(`Error in toggleProductStock for ${id}:`, error);
    return { product: null };
  }
}

/**
 * Upload a product image to Supabase storage
 */
export async function uploadProductImage(productId: string, file: File): Promise<{ url: string | null }> {
  try {
    if (!productId) {
      throw new Error("Product ID is required for image upload");
    }

    console.log("Uploading product image:", file.name, "type:", file.type, "size:", file.size);
    
    // Create file path
    const fileExt = file.name.split('.').pop();
    const fileName = `${productId}/${Date.now()}.${fileExt}`;
    
    console.log("Uploading to:", fileName);
    
    // Upload to storage
    const { data, error } = await supabase.storage
      .from('products')
      .upload(fileName, file);
      
    if (error) {
      console.error("Error uploading product image:", error);
      return { url: null };
    }
    
    console.log("Image uploaded successfully:", data);
    
    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('products')
      .getPublicUrl(fileName);
      
    console.log("Image public URL:", publicUrl);
    
    return { url: publicUrl };
  } catch (error) {
    console.error('Error uploading product image:', error);
    return { url: null };
  }
}

/**
 * Clear Next.js cache for product pages
 */
export async function clearProductCache(): Promise<void> {
  if (typeof window === 'undefined') {
    try {
      // Only run on server
      console.log('Attempting to clear product cache...');
      
      // If in development, we don't need to do anything as pages aren't cached
      if (process.env.NODE_ENV === 'development') {
        console.log('In development mode, no cache clearing needed');
        return;
      }
      
      // In production, use the revalidate tag API if available
      if ('revalidatePath' in (global as any)) {
        console.log('Revalidating product paths...');
        (global as any).revalidatePath('/products');
        (global as any).revalidatePath('/products/[slug]');
        console.log('Product paths revalidated');
      } else {
        console.log('revalidatePath not available in this Next.js version');
      }
    } catch (error) {
      console.error('Error clearing product cache:', error);
    }
  }
}

/**
 * Fetch related products for a specific product
 */
export async function getRelatedProducts(productId: string): Promise<{ relatedProducts: Product[] }> {
  try {
    console.log(`Fetching related products for product ID: ${productId}...`);
    
    // First, get the product to access its related product IDs
    const { product } = await getProductById(productId);
    
    if (!product) {
      console.error(`Product with ID ${productId} not found`);
      return { relatedProducts: [] };
    }
    
    // Collect all related product IDs
    const relatedIds = [
      product.related_product_id_1,
      product.related_product_id_2,
      product.related_product_id_3,
      product.related_product_id_4
    ].filter(Boolean) as string[]; // Filter out null/undefined values
    
    if (relatedIds.length === 0) {
      console.log(`No related products found for product ID: ${productId}`);
      return { relatedProducts: [] };
    }
    
    // Fetch all related products
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .in('id', relatedIds);
    
    if (error) {
      console.error(`Error fetching related products for product ID ${productId}:`, error);
      return { relatedProducts: [] };
    }
    
    // Parse JSONB fields
    const relatedProducts = data.map(product => ({
      ...product,
      features: Array.isArray(product.features) ? product.features : [],
      applications: Array.isArray(product.applications) ? product.applications : [],
      industries: Array.isArray(product.industries) ? product.industries : [],
      additional_images: Array.isArray(product.additional_images) ? product.additional_images : []
    }));
    
    console.log(`Fetched ${relatedProducts.length} related products for product ID: ${productId}`);
    return { relatedProducts };
  } catch (error) {
    console.error(`Error in getRelatedProducts for ${productId}:`, error);
    return { relatedProducts: [] };
  }
} 