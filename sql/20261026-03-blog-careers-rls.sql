BEGIN;

DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname = 'public'
      AND (
        (tablename = 'blog_posts' AND policyname <> 'Public read published blog posts')
        OR (tablename = 'careers' AND policyname <> 'Public read published careers')
      )
  ) THEN
    RAISE EXCEPTION 'Unexpected existing policy. Stop and send the pre-flight output.';
  END IF;
END $$;

ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public read published blog posts" ON public.blog_posts;
CREATE POLICY "Public read published blog posts" ON public.blog_posts
  FOR SELECT TO anon, authenticated USING (is_published = true);
REVOKE INSERT, UPDATE, DELETE, TRUNCATE ON TABLE public.blog_posts FROM anon, authenticated;

ALTER TABLE public.careers ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public read published careers" ON public.careers;
CREATE POLICY "Public read published careers" ON public.careers
  FOR SELECT TO anon, authenticated USING (is_published = true);
REVOKE INSERT, UPDATE, DELETE, TRUNCATE ON TABLE public.careers FROM anon, authenticated;

COMMIT;
