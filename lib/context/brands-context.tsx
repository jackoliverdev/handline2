"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Brand, getAllBrands } from '@/lib/brands-service';

interface BrandsContextType {
  brands: Brand[];
  loading: boolean;
  error: string | null;
  refreshBrands: () => Promise<void>;
}

const BrandsContext = createContext<BrandsContextType | undefined>(undefined);

interface BrandsProviderProps {
  children: ReactNode;
}

export function BrandsProvider({ children }: BrandsProviderProps) {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refreshBrands = async () => {
    try {
      setLoading(true);
      setError(null);
      const fetchedBrands = await getAllBrands();
      setBrands(fetchedBrands);
    } catch (err) {
      console.error('Failed to fetch brands:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch brands');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshBrands();
  }, []);

  const value: BrandsContextType = {
    brands,
    loading,
    error,
    refreshBrands,
  };

  return (
    <BrandsContext.Provider value={value}>
      {children}
    </BrandsContext.Provider>
  );
}

export function useBrands(): BrandsContextType {
  const context = useContext(BrandsContext);
  if (context === undefined) {
    throw new Error('useBrands must be used within a BrandsProvider');
  }
  return context;
}
