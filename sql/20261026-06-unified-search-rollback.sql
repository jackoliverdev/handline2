BEGIN;
DROP VIEW public.unified_search;
CREATE VIEW public.unified_search AS
-- paste the exact pg_get_viewdef text saved in pre-flight P3 here
;
GRANT SELECT ON public.unified_search TO anon, authenticated;
COMMIT;
