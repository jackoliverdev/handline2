BEGIN;

DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'industry_solutions'
             AND policyname <> 'Public read industry solutions') THEN
    RAISE EXCEPTION 'Unexpected existing policy on industry_solutions. Stop and send the pre-flight output.';
  END IF;
END $$;

ALTER TABLE public.industry_solutions ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public read industry solutions" ON public.industry_solutions;
CREATE POLICY "Public read industry solutions" ON public.industry_solutions
  FOR SELECT TO anon, authenticated USING (true);
REVOKE INSERT, UPDATE, DELETE, TRUNCATE ON TABLE public.industry_solutions FROM anon, authenticated;

COMMIT;
