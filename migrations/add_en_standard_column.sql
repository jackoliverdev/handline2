-- Add EN standard column to products table
-- This allows products to specify whether they follow EN388 (cut resistance) or EN407 (heat resistance) standards

ALTER TABLE products ADD COLUMN en_standard TEXT CHECK (en_standard IN ('EN388', 'EN407')); 