-- Item 13: add the structured standards already stated in KAIOS's description.
-- Run manually in the Supabase SQL editor after deploying the EN 12941 code changes.

UPDATE public.products
SET respiratory_standards = jsonb_set(
  jsonb_set(
    COALESCE(respiratory_standards, '{}'::jsonb),
    '{en12941}',
    '{"enabled": true, "class": "TH3"}'::jsonb,
    true
  ),
  '{en143}',
  '{"enabled": true, "class": "P3", "r": false, "nr": false}'::jsonb,
  true
)
WHERE name = 'KAIOS'
  AND category ILIKE '%respir%';
