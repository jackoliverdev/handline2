-- SEO product URLs: add stable, unique slugs generated from English product names.
-- Run manually in the Supabase SQL editor before deploying the slug-based routes.

ALTER TABLE public.products
  ADD COLUMN IF NOT EXISTS slug TEXT;

WITH base_slugs AS (
  SELECT
    id,
    NULLIF(
      trim(both '-' FROM regexp_replace(lower(name), '[^a-z0-9]+', '-', 'g')),
      ''
    ) AS base_slug
  FROM public.products
),
ranked_slugs AS (
  SELECT
    id,
    COALESCE(base_slug, 'product') AS base_slug,
    row_number() OVER (
      PARTITION BY COALESCE(base_slug, 'product')
      ORDER BY id
    ) AS duplicate_number
  FROM base_slugs
)
UPDATE public.products AS product
SET slug = CASE
  WHEN ranked.duplicate_number = 1 THEN ranked.base_slug
  ELSE ranked.base_slug || '-' || ranked.duplicate_number
END
FROM ranked_slugs AS ranked
WHERE product.id = ranked.id
  AND (product.slug IS NULL OR product.slug = '');

ALTER TABLE public.products
  ALTER COLUMN slug SET NOT NULL;

CREATE UNIQUE INDEX IF NOT EXISTS products_slug_unique_idx
  ON public.products (slug);
