BEGIN;

DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'products'
             AND policyname <> 'Public read published products') THEN
    RAISE EXCEPTION 'Unexpected existing policy on products. Stop and send the pre-flight output.';
  END IF;
END $$;

ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public read published products" ON public.products;
CREATE POLICY "Public read published products" ON public.products
  FOR SELECT TO anon, authenticated USING (published = true);
REVOKE INSERT, UPDATE, DELETE, TRUNCATE ON TABLE public.products FROM anon, authenticated;

COMMIT;
