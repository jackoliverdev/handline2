BEGIN;

DO $$
DECLARE
  p record;
BEGIN
  FOR p IN
    SELECT policyname
    FROM pg_policies
    WHERE schemaname = 'storage' AND tablename = 'objects'
      AND cmd IN ('INSERT','UPDATE','DELETE','ALL')
      AND roles && ARRAY['public','anon','authenticated']::name[]
      AND (
        (coalesce(qual,'') || ' ' || coalesce(with_check,'')) ~ '''(products|technical-sheets|ppehub|blog-covers|industries|blog|website)'''
        OR (coalesce(qual,'') || ' ' || coalesce(with_check,'')) !~ 'bucket_id'
      )
  LOOP
    EXECUTE format('DROP POLICY %I ON storage.objects', p.policyname);
    RAISE NOTICE 'Dropped storage policy %', p.policyname;
  END LOOP;
END $$;

COMMIT;
