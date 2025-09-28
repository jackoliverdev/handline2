import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductBySlug, getAllProducts, getRelatedProducts } from "@/lib/products-service";
import { ProductDetail } from "@/components/website/products/slug/ProductDetail";
import { RelatedProducts } from "@/components/website/products/slug/RelatedProducts";
import { BrandsProvider } from "@/lib/context/brands-context";

interface ProductPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  // Decode the slug to get the original product name
  const decodedSlug = decodeURIComponent(params.slug);
  const { product } = await getProductBySlug(decodedSlug);
  
  if (!product) {
    return {
      title: "Product Not Found | Hand Line",
      description: "The requested product could not be found.",
    };
  }
  
  return {
    title: `${product.name} | Industrial Swabs | Hand Line`,
    description: product.short_description || product.description.substring(0, 160),
  };
}

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function SwabProductPage({ params }: ProductPageProps) {
  // Decode the slug to get the original product name
  const decodedSlug = decodeURIComponent(params.slug);
  const { product } = await getProductBySlug(decodedSlug);
  
  if (!product) {
    notFound();
  }
  
  // Filter related products to swabs category
  const { relatedProducts } = await getRelatedProducts(product.id);
  const swabRelatedProducts = relatedProducts.filter(p => 
    p.category?.toLowerCase().includes('swab') ||
    p.name?.toLowerCase().includes('swab') ||
    p.category?.toLowerCase().includes('cleaning') ||
    p.name?.toLowerCase().includes('cleaning')
  );

  return (
    <BrandsProvider>
      <ProductDetail product={product} relatedProducts={swabRelatedProducts} />
      <RelatedProducts relatedProducts={swabRelatedProducts} />
    </BrandsProvider>
  );
} 