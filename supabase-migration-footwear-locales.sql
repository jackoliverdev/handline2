-- Add footwear_materials_locales and footwear_special_features_locales columns
-- Run this in your Supabase SQL Editor

ALTER TABLE public.products 
ADD COLUMN IF NOT EXISTS footwear_materials_locales jsonb NOT NULL DEFAULT '{}'::jsonb;

ALTER TABLE public.products 
ADD COLUMN IF NOT EXISTS footwear_special_features_locales jsonb NOT NULL DEFAULT '{}'::jsonb;

-- Create indexes for the new columns for better performance
CREATE INDEX IF NOT EXISTS products_footwear_materials_locales_gin 
ON public.products USING gin (footwear_materials_locales);

CREATE INDEX IF NOT EXISTS products_footwear_special_features_locales_gin 
ON public.products USING gin (footwear_special_features_locales);

-- Verify the columns were added
SELECT column_name, data_type, column_default 
FROM information_schema.columns 
WHERE table_name = 'products' 
AND column_name IN ('footwear_materials_locales', 'footwear_special_features_locales');

