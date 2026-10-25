BEGIN;
DROP POLICY IF EXISTS "Public read published ppe categories" ON public.ppe_categories;
ALTER TABLE public.ppe_categories DISABLE ROW LEVEL SECURITY;
GRANT SELECT, INSERT, UPDATE, DELETE, TRUNCATE ON TABLE public.ppe_categories TO anon, authenticated;

DROP POLICY IF EXISTS "Public read published ppe sections" ON public.ppe_sections;
ALTER TABLE public.ppe_sections DISABLE ROW LEVEL SECURITY;
GRANT SELECT, INSERT, UPDATE, DELETE, TRUNCATE ON TABLE public.ppe_sections TO anon, authenticated;

DROP POLICY IF EXISTS "Public read standard icons" ON public.standard_icons;
ALTER TABLE public.standard_icons DISABLE ROW LEVEL SECURITY;
GRANT SELECT, INSERT, UPDATE, DELETE, TRUNCATE ON TABLE public.standard_icons TO anon, authenticated;
COMMIT;
