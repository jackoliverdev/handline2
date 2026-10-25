-- Brands pilot. Run in the Supabase SQL editor only after the admin brand
-- routes are deployed and creating, editing, deleting and logo upload work.
-- This script locks public.brands. It does not change storage policies.

ALTER TABLE public.brands ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public read brands" ON public.brands;
CREATE POLICY "Public read brands"
  ON public.brands
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- TRUNCATE is included because row-level security does not apply to it.
REVOKE INSERT, UPDATE, DELETE, TRUNCATE ON TABLE public.brands FROM anon, authenticated;
