BEGIN;

DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname = 'public'
      AND (
        (tablename = 'ppe_categories' AND policyname <> 'Public read published ppe categories')
        OR (tablename = 'ppe_sections' AND policyname <> 'Public read published ppe sections')
        OR (tablename = 'standard_icons' AND policyname <> 'Public read standard icons')
      )
  ) THEN
    RAISE EXCEPTION 'Unexpected existing policy. Stop and send the pre-flight output.';
  END IF;
END $$;

ALTER TABLE public.ppe_categories ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public read published ppe categories" ON public.ppe_categories;
CREATE POLICY "Public read published ppe categories" ON public.ppe_categories
  FOR SELECT TO anon, authenticated USING (published = true);
REVOKE INSERT, UPDATE, DELETE, TRUNCATE ON TABLE public.ppe_categories FROM anon, authenticated;

ALTER TABLE public.ppe_sections ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public read published ppe sections" ON public.ppe_sections;
CREATE POLICY "Public read published ppe sections" ON public.ppe_sections
  FOR SELECT TO anon, authenticated USING (published = true);
REVOKE INSERT, UPDATE, DELETE, TRUNCATE ON TABLE public.ppe_sections FROM anon, authenticated;

ALTER TABLE public.standard_icons ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public read standard icons" ON public.standard_icons;
CREATE POLICY "Public read standard icons" ON public.standard_icons
  FOR SELECT TO anon, authenticated USING (true);
REVOKE INSERT, UPDATE, DELETE, TRUNCATE ON TABLE public.standard_icons FROM anon, authenticated;

COMMIT;
