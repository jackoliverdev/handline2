'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { Product, localiseProduct } from '@/lib/products-service';
import { useLanguage } from '@/lib/context/language-context';
import { motion } from 'framer-motion';

interface ProductListProps {
  products: Product[];
}

export function ProductList({ products }: ProductListProps) {
  const { t, language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');

  // Localise all products
  const localizedProducts = products.map(product => localiseProduct(product, language));

  // Filter products that have a technical sheet URL (declaration document)
  const productsWithDeclarations = localizedProducts.filter(product => product.technical_sheet_url);

  // Filter by search query if provided
  const filteredProducts = productsWithDeclarations.filter(product => 
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (product.short_description && product.short_description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="space-y-8">
      {/* Search Input */}
      <div className="relative max-w-md mx-auto mb-8">
        <input
          type="text"
          placeholder={t('products.searchPlaceholder')}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 rounded-md border border-brand-primary/20 focus:outline-none focus:ring-2 focus:ring-brand-primary/40 bg-white/70 dark:bg-gray-800/30 dark:text-white"
        />
      </div>

      {filteredProducts.length > 0 ? (
        <motion.div 
          className="space-y-4"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {filteredProducts.map((product) => (
            <motion.div 
              key={product.id}
              className="rounded-lg bg-white/50 dark:bg-gray-800/30 border border-brand-primary/10 dark:border-brand-primary/20 backdrop-blur-sm dark:backdrop-blur-none transition-all duration-300 hover:shadow-md overflow-hidden"
              variants={item}
            >
              <div className="flex gap-4 p-4">
                {/* Product Image */}
                <div className="relative flex-shrink-0 h-16 w-16 rounded-md overflow-hidden bg-gray-100 dark:bg-gray-900">
                  {product.image_url ? (
                    <Image
                      src={product.image_url}
                      alt={product.name}
                      fill
                      className="object-contain"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <span className="text-gray-400 dark:text-gray-600 text-xs">No image</span>
                    </div>
                  )}
                </div>
              
                <div className="flex-grow flex flex-col">
                  {/* Title row with Category and Download button */}
                  <div className="flex items-center justify-between w-full mb-2">
                    <div className="flex items-baseline gap-3">
                      <h3 className="text-lg font-semibold text-brand-dark dark:text-white">{product.name}</h3>
                      {product.category && (
                        <span className="text-brand-primary text-sm font-medium">
                          {product.category}
                        </span>
                      )}
                    </div>
                    
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="border-brand-primary/30 text-brand-primary hover:bg-brand-primary/10 hover:text-brand-primary hover:border-brand-primary transition-all duration-300 gap-2"
                      asChild
                    >
                      <a href={product.technical_sheet_url || '#'} target="_blank" rel="noopener noreferrer" download>
                        <span>{t('standards.download')}</span>
                        <Download className="h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                  
                  {/* Description */}
                  <p className="text-sm text-brand-secondary dark:text-gray-300">
                    {product.short_description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="rounded-full bg-brand-primary/10 p-3 mb-4">
            <Download className="h-6 w-6 text-brand-primary" />
          </div>
          <h3 className="text-xl font-semibold text-brand-dark dark:text-white mb-2">
            No declarations found
          </h3>
          <p className="text-brand-secondary dark:text-gray-300 max-w-md">
            {searchQuery 
              ? "No product declarations match your search. Try different keywords."
              : "There are currently no product declarations available."}
          </p>
        </div>
      )}
    </div>
  );
} 