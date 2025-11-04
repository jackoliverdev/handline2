-- Add dark_mode_logo_url column to brands table
ALTER TABLE public.brands 
ADD COLUMN IF NOT EXISTS dark_mode_logo_url text;

-- Add index for performance (optional)
CREATE INDEX IF NOT EXISTS brands_dark_mode_logo_url_idx ON public.brands (dark_mode_logo_url);
