-- Availability enum
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'product_availability') THEN
    CREATE TYPE product_availability AS ENUM
      ('in_stock','made_to_order','out_of_stock','coming_soon');
  END IF;
END $$;

-- Columns
ALTER TABLE public.products
  ADD COLUMN IF NOT EXISTS brands                  text[]        NOT NULL DEFAULT ARRAY[]::text[],
  ADD COLUMN IF NOT EXISTS tags_locales            jsonb         NOT NULL DEFAULT '{}'::jsonb,
  ADD COLUMN IF NOT EXISTS size_locales            jsonb,
  ADD COLUMN IF NOT EXISTS length_cm               integer,
  ADD COLUMN IF NOT EXISTS ce_category             text,
  ADD COLUMN IF NOT EXISTS published               boolean       NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS coming_soon             boolean       NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS availability_status     product_availability NOT NULL DEFAULT 'in_stock',
  ADD COLUMN IF NOT EXISTS safety                  jsonb         NOT NULL DEFAULT '{}'::jsonb,
  ADD COLUMN IF NOT EXISTS environment_pictograms  jsonb         NOT NULL DEFAULT '{}'::jsonb;

-- Indexes
CREATE INDEX IF NOT EXISTS products_availability_status_idx ON public.products (availability_status);
CREATE INDEX IF NOT EXISTS products_tags_locales_gin       ON public.products USING gin (tags_locales);
CREATE INDEX IF NOT EXISTS products_safety_gin             ON public.products USING gin (safety);
CREATE INDEX IF NOT EXISTS products_env_pictos_gin         ON public.products USING gin (environment_pictograms);


ALTER TABLE public.products
  ADD COLUMN IF NOT EXISTS technical_sheet_url_it  varchar,
  ADD COLUMN IF NOT EXISTS declaration_sheet_url_it text;

-- (optional docs)
COMMENT ON COLUMN public.products.technical_sheet_url_it  IS 'Italian URL for the technical sheet';
COMMENT ON COLUMN public.products.declaration_sheet_url_it IS 'Italian URL for the declaration sheet';
