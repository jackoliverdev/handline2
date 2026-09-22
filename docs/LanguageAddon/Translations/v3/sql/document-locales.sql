-- Five-language technical sheets and manufacturer notes.
-- Fills only empty JSON keys. Does not copy a TDS into FR/DE/ES.
-- Copies a manufacturer note into FR/DE/ES only when EN and IT are the same
-- file under /manufacturing-notes/. Does not attach HLC_MN_158.
-- Does not touch declaration columns. Does not set updated_at.

BEGIN;

ALTER TABLE public.products
  ADD COLUMN IF NOT EXISTS technical_sheet_locales jsonb NOT NULL DEFAULT '{}'::jsonb,
  ADD COLUMN IF NOT EXISTS manufacturers_instruction_locales jsonb NOT NULL DEFAULT '{}'::jsonb;

UPDATE public.products
SET technical_sheet_locales =
  COALESCE(technical_sheet_locales, '{}'::jsonb)
  || CASE
    WHEN COALESCE(technical_sheet_locales->>'en', '') = ''
      AND COALESCE(technical_sheet_url, '') <> ''
    THEN jsonb_build_object('en', technical_sheet_url)
    ELSE '{}'::jsonb
  END
  || CASE
    WHEN COALESCE(technical_sheet_locales->>'it', '') = ''
      AND COALESCE(technical_sheet_url_it, '') <> ''
    THEN jsonb_build_object('it', technical_sheet_url_it)
    ELSE '{}'::jsonb
  END
WHERE (
  COALESCE(technical_sheet_locales->>'en', '') = ''
  AND COALESCE(technical_sheet_url, '') <> ''
) OR (
  COALESCE(technical_sheet_locales->>'it', '') = ''
  AND COALESCE(technical_sheet_url_it, '') <> ''
);

UPDATE public.products
SET manufacturers_instruction_locales =
  COALESCE(manufacturers_instruction_locales, '{}'::jsonb)
  || CASE
    WHEN COALESCE(manufacturers_instruction_locales->>'en', '') = ''
      AND COALESCE(manufacturers_instruction_url, '') <> ''
    THEN jsonb_build_object('en', manufacturers_instruction_url)
    ELSE '{}'::jsonb
  END
  || CASE
    WHEN COALESCE(manufacturers_instruction_locales->>'it', '') = ''
      AND COALESCE(manufacturers_instruction_url_it, '') <> ''
    THEN jsonb_build_object('it', manufacturers_instruction_url_it)
    ELSE '{}'::jsonb
  END
  || CASE
    WHEN COALESCE(manufacturers_instruction_url, '') <> ''
      AND manufacturers_instruction_url = manufacturers_instruction_url_it
      AND manufacturers_instruction_url LIKE '%/manufacturing-notes/%'
      AND COALESCE(manufacturers_instruction_locales->>'fr', '') = ''
    THEN jsonb_build_object('fr', manufacturers_instruction_url)
    ELSE '{}'::jsonb
  END
  || CASE
    WHEN COALESCE(manufacturers_instruction_url, '') <> ''
      AND manufacturers_instruction_url = manufacturers_instruction_url_it
      AND manufacturers_instruction_url LIKE '%/manufacturing-notes/%'
      AND COALESCE(manufacturers_instruction_locales->>'de', '') = ''
    THEN jsonb_build_object('de', manufacturers_instruction_url)
    ELSE '{}'::jsonb
  END
  || CASE
    WHEN COALESCE(manufacturers_instruction_url, '') <> ''
      AND manufacturers_instruction_url = manufacturers_instruction_url_it
      AND manufacturers_instruction_url LIKE '%/manufacturing-notes/%'
      AND COALESCE(manufacturers_instruction_locales->>'es', '') = ''
    THEN jsonb_build_object('es', manufacturers_instruction_url)
    ELSE '{}'::jsonb
  END
WHERE (
  COALESCE(manufacturers_instruction_locales->>'en', '') = ''
  AND COALESCE(manufacturers_instruction_url, '') <> ''
) OR (
  COALESCE(manufacturers_instruction_locales->>'it', '') = ''
  AND COALESCE(manufacturers_instruction_url_it, '') <> ''
) OR (
  COALESCE(manufacturers_instruction_url, '') <> ''
  AND manufacturers_instruction_url = manufacturers_instruction_url_it
  AND manufacturers_instruction_url LIKE '%/manufacturing-notes/%'
  AND (
    COALESCE(manufacturers_instruction_locales->>'fr', '') = ''
    OR COALESCE(manufacturers_instruction_locales->>'de', '') = ''
    OR COALESCE(manufacturers_instruction_locales->>'es', '') = ''
  )
);

COMMIT;
