BEGIN;
DROP POLICY IF EXISTS "Public read published blog posts" ON public.blog_posts;
ALTER TABLE public.blog_posts DISABLE ROW LEVEL SECURITY;
GRANT SELECT, INSERT, UPDATE, DELETE, TRUNCATE ON TABLE public.blog_posts TO anon, authenticated;

DROP POLICY IF EXISTS "Public read published careers" ON public.careers;
ALTER TABLE public.careers DISABLE ROW LEVEL SECURITY;
GRANT SELECT, INSERT, UPDATE, DELETE, TRUNCATE ON TABLE public.careers TO anon, authenticated;
COMMIT;
