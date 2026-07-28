-- Review this output before assigning any values.
-- Do not infer a product's Clothing Type or Clothing Category from its name,
-- description, or legacy sub_category value.

SELECT
  id,
  name,
  slug,
  category,
  sub_category,
  clothing_type,
  clothing_category
FROM public.products
WHERE lower(coalesce(category, '')) LIKE '%clothing%'
  AND (
    nullif(trim(coalesce(clothing_type, '')), '') IS NULL
    OR nullif(trim(coalesce(clothing_category, '')), '') IS NULL
  )
ORDER BY name;

-- After reviewing the rows above, add explicit product IDs below and run the
-- update. Keep Clothing Category compatible with the selected Clothing Type.
--
-- UPDATE public.products
-- SET
--   clothing_type = CASE id
--     WHEN '<welding-product-id>' THEN 'welding'
--     WHEN '<high-visibility-product-id>' THEN 'high-visibility'
--     WHEN '<safety-workwear-product-id>' THEN 'safety-workwear'
--   END,
--   clothing_category = CASE id
--     WHEN '<welding-product-id>' THEN 'Welding Jackets'
--     WHEN '<high-visibility-product-id>' THEN 'Hi-Vis Jackets'
--     WHEN '<safety-workwear-product-id>' THEN 'Work Jackets'
--   END
-- WHERE id IN (
--   '<welding-product-id>',
--   '<high-visibility-product-id>',
--   '<safety-workwear-product-id>'
-- );
