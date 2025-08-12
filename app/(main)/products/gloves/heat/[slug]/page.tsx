import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductBySlug, getAllProducts, getRelatedProducts } from "@/lib/products-service";
import { ProductDetail } from "@/components/website/products/slug/ProductDetail";
import { RelatedProducts } from "@/components/website/products/slug/RelatedProducts";

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
    title: `${product.name} | Heat-Resistant Gloves | Hand Line`,
    description: product.short_description || product.description.substring(0, 160),
  };
}

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function HeatGloveProductPage({ params }: ProductPageProps) {
  // Decode the slug to get the original product name
  const decodedSlug = decodeURIComponent(params.slug);
  const { product } = await getProductBySlug(decodedSlug);
  
  if (!product) {
    notFound();
  }
  
  // Filter related products to heat-resistant gloves
  const { relatedProducts } = await getRelatedProducts(product.id);
  const heatRelatedProducts = relatedProducts.filter(p => 
    p.category?.toLowerCase().includes('heat') ||
    p.sub_category?.toLowerCase().includes('heat') ||
    p.name?.toLowerCase().includes('heat') ||
    p.features?.some(feature => feature.toLowerCase().includes('heat'))
  );

  return (
    <>
      <ProductDetail product={product} relatedProducts={heatRelatedProducts} />
      <RelatedProducts relatedProducts={heatRelatedProducts} />
    </>
  );
} 