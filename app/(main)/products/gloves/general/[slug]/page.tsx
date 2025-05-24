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
      title: "Product Not Found | HandLine Company",
      description: "The requested product could not be found.",
    };
  }
  
  return {
    title: `${product.name} | General Purpose Gloves | HandLine Company`,
    description: product.short_description || product.description.substring(0, 160),
  };
}

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function GeneralGloveProductPage({ params }: ProductPageProps) {
  // Decode the slug to get the original product name
  const decodedSlug = decodeURIComponent(params.slug);
  const { product } = await getProductBySlug(decodedSlug);
  
  if (!product) {
    notFound();
  }
  
  // Filter related products to general purpose gloves
  const { relatedProducts } = await getRelatedProducts(product.id);
  const generalRelatedProducts = relatedProducts.filter(p => 
    p.category?.toLowerCase().includes('general') ||
    p.sub_category?.toLowerCase().includes('general') ||
    // Include products that are not specifically heat or cut focused
    (!p.category?.toLowerCase().includes('heat') && 
     !p.category?.toLowerCase().includes('cut') &&
     !p.sub_category?.toLowerCase().includes('heat') &&
     !p.sub_category?.toLowerCase().includes('cut'))
  );

  return (
    <>
      <ProductDetail product={product} relatedProducts={generalRelatedProducts} />
      <RelatedProducts relatedProducts={generalRelatedProducts} />
    </>
  );
} 