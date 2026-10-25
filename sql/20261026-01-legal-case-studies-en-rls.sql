BEGIN;

DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname = 'public'
      AND (
        (tablename = 'case_studies' AND policyname <> 'Public read published case studies')
        OR (tablename = 'en_resources' AND policyname <> 'Public read published en resources')
        OR (tablename = 'legal_documents' AND policyname <> 'Public read published legal documents')
        OR (tablename = 'legal_sections' AND policyname <> 'Public read published legal sections')
      )
  ) THEN
    RAISE EXCEPTION 'Unexpected existing policy. Stop and send the pre-flight output.';
  END IF;
END $$;

ALTER TABLE public.case_studies ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public read published case studies" ON public.case_studies;
CREATE POLICY "Public read published case studies" ON public.case_studies
  FOR SELECT TO anon, authenticated USING (is_published = true);
REVOKE INSERT, UPDATE, DELETE, TRUNCATE ON TABLE public.case_studies FROM anon, authenticated;

ALTER TABLE public.en_resources ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public read published en resources" ON public.en_resources;
CREATE POLICY "Public read published en resources" ON public.en_resources
  FOR SELECT TO anon, authenticated USING (published = true);
REVOKE INSERT, UPDATE, DELETE, TRUNCATE ON TABLE public.en_resources FROM anon, authenticated;

ALTER TABLE public.legal_documents ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public read published legal documents" ON public.legal_documents;
CREATE POLICY "Public read published legal documents" ON public.legal_documents
  FOR SELECT TO anon, authenticated USING (published = true);
REVOKE INSERT, UPDATE, DELETE, TRUNCATE ON TABLE public.legal_documents FROM anon, authenticated;

ALTER TABLE public.legal_sections ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public read published legal sections" ON public.legal_sections;
CREATE POLICY "Public read published legal sections" ON public.legal_sections
  FOR SELECT TO anon, authenticated USING (published = true);
REVOKE INSERT, UPDATE, DELETE, TRUNCATE ON TABLE public.legal_sections FROM anon, authenticated;

COMMIT;
