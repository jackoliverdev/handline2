"use client";

import { useState, useEffect } from "react";
import { ProductGrid } from "@/components/website/products/product-grid";
import { Product, getAllProducts } from "@/lib/products-service";
import { Loader2 } from "lucide-react";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true);
        const { products } = await getAllProducts();
        setProducts(products);
      } catch (error) {
        console.error("Error loading products:", error);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Product Catalogue</h1>
        <p className="text-muted-foreground">
          Browse our full range of HandLine safety gloves and protective equipment
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="h-8 w-8 animate-spin text-[#F28C38]" />
            <p className="text-muted-foreground">Loading product catalogue...</p>
          </div>
        </div>
      ) : (
        <div className="pb-12">
          <ProductGrid products={products} />
          
          <div className="mt-12 bg-[#F5EFE0] dark:bg-gray-800/20 rounded-lg p-6 border border-[#F28C38]/20">
            <h2 className="text-xl font-semibold mb-4">Need Custom Products?</h2>
            <p className="mb-4 text-muted-foreground">
              HandLine offers custom safety solutions for specific industry needs. Contact our specialists to discuss your requirements.
            </p>
            <p className="mb-2 font-medium">Options include:</p>
            <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
              <li>Custom sizing and fit</li>
              <li>Specialty materials for extreme environments</li>
              <li>Bulk ordering with volume discounts</li>
              <li>Branded products with your company logo</li>
              <li>Specialised testing and certification packages</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
} 