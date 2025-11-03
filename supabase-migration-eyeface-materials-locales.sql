-- Migration: Add locale-aware materials for eye-face products
-- Date: 2025-11-02

-- Add the eye_face_materials_locales column
ALTER TABLE public.products
ADD COLUMN IF NOT EXISTS eye_face_materials_locales jsonb NOT NULL DEFAULT '{}'::jsonb;

-- Create GIN index for efficient querying
CREATE INDEX IF NOT EXISTS products_eye_face_materials_locales_gin 
ON public.products USING gin (eye_face_materials_locales);

-- Example structure for reference:
-- {
--   "en": {
--     "lens": "PC",
--     "frame": "plastic",
--     "arm": "plastic",
--     "headband": "fabric"
--   },
--   "it": {
--     "lens": "PC",
--     "frame": "plastica",
--     "arm": "plastica",
--     "headband": "tessuto"
--   }
-- }

