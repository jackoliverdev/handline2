BEGIN;
DROP POLICY IF EXISTS "Public read published products" ON public.products;
ALTER TABLE public.products DISABLE ROW LEVEL SECURITY;
GRANT SELECT, INSERT, UPDATE, DELETE, TRUNCATE ON TABLE public.products TO anon, authenticated;
COMMIT;
