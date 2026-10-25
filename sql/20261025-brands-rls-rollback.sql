-- Restores the previous brands behaviour: the anon and authenticated roles
-- can read and write public.brands directly. Run only to undo the pilot.
-- Does not change storage policies.

DROP POLICY IF EXISTS "Public read brands" ON public.brands;
ALTER TABLE public.brands DISABLE ROW LEVEL SECURITY;

GRANT SELECT, INSERT, UPDATE, DELETE, TRUNCATE ON TABLE public.brands TO anon, authenticated;
