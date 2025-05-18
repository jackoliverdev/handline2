"use client";

import { useLanguage } from "@/lib/context/language-context";
import { Product } from "@/lib/products-service";
import { ProductCard } from "@/components/website/products/product-card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface RelatedProductsProps {
  relatedProducts: Product[];
}

export const RelatedProducts = ({ relatedProducts }: RelatedProductsProps) => {
  const { t, language } = useLanguage();
  const hasRelatedProducts = relatedProducts && relatedProducts.length > 0;

  return (
    <section className="py-16 bg-brand-light dark:bg-background">
      <div className="container mx-auto px-4 sm:px-6">
        <h2 className="text-2xl font-bold text-center mb-8 text-brand-dark dark:text-white">
          {t('relatedProducts.title')}
        </h2>
        {hasRelatedProducts ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 mb-10">
            {relatedProducts.map((product) => {
              const name = product.name_locales?.[language] || product.name;
              const description = product.description_locales?.[language] || product.description;
              const short_description = product.short_description_locales?.[language] || product.short_description;
              const category = product.category_locales?.[language] || product.category;
              const sub_category = product.sub_category_locales?.[language] || product.sub_category;
              const features = product.features_locales?.[language] || product.features;
              const applications = product.applications_locales?.[language] || product.applications;
              const industries = product.industries_locales?.[language] || product.industries;
              return (
                <ProductCard
                  key={product.id}
                  product={{
                    ...product,
                    name,
                    description,
                    short_description,
                    category,
                    sub_category,
                    features,
                    applications,
                    industries,
                  }}
                />
              );
            })}
          </div>
        ) : (
          <p className="text-center text-brand-secondary dark:text-gray-300 mb-8">
            {t('featuredProducts.noProducts')}
          </p>
        )}
        <div className="text-center">
          <Button asChild className="bg-brand-primary hover:bg-brand-primary/90 text-white transition-all duration-300 group">
            <Link href="/products" className="flex items-center justify-center gap-2">
              {t('featuredProducts.viewAll')}
              <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}; 