BEGIN;
DROP POLICY IF EXISTS "Public read published case studies" ON public.case_studies;
ALTER TABLE public.case_studies DISABLE ROW LEVEL SECURITY;
GRANT SELECT, INSERT, UPDATE, DELETE, TRUNCATE ON TABLE public.case_studies TO anon, authenticated;

DROP POLICY IF EXISTS "Public read published en resources" ON public.en_resources;
ALTER TABLE public.en_resources DISABLE ROW LEVEL SECURITY;
GRANT SELECT, INSERT, UPDATE, DELETE, TRUNCATE ON TABLE public.en_resources TO anon, authenticated;

DROP POLICY IF EXISTS "Public read published legal documents" ON public.legal_documents;
ALTER TABLE public.legal_documents DISABLE ROW LEVEL SECURITY;
GRANT SELECT, INSERT, UPDATE, DELETE, TRUNCATE ON TABLE public.legal_documents TO anon, authenticated;

DROP POLICY IF EXISTS "Public read published legal sections" ON public.legal_sections;
ALTER TABLE public.legal_sections DISABLE ROW LEVEL SECURITY;
GRANT SELECT, INSERT, UPDATE, DELETE, TRUNCATE ON TABLE public.legal_sections TO anon, authenticated;
COMMIT;
