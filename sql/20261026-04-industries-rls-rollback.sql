BEGIN;
DROP POLICY IF EXISTS "Public read industry solutions" ON public.industry_solutions;
ALTER TABLE public.industry_solutions DISABLE ROW LEVEL SECURITY;
GRANT SELECT, INSERT, UPDATE, DELETE, TRUNCATE ON TABLE public.industry_solutions TO anon, authenticated;
COMMIT;
