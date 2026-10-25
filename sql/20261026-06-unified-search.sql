BEGIN;

DO $$
BEGIN
  IF current_setting('server_version_num')::int < 150000 THEN
    RAISE EXCEPTION 'security_invoker needs Postgres 15 or later. Nothing was changed.';
  END IF;
END $$;

DROP VIEW public.unified_search;

CREATE VIEW public.unified_search WITH (security_invoker = true) AS
SELECT
    'product'::TEXT AS content_type,
    id::TEXT,
    COALESCE(name, '')::TEXT AS title,
    COALESCE(description, short_description, '')::TEXT AS description,
    image_url::TEXT AS image_url,
    ('/products/' || COALESCE(NULLIF(slug, ''), id::text))::TEXT AS url,
    COALESCE(category, 'product')::TEXT AS category,
    COALESCE(sub_category, '')::TEXT AS subcategory,
    (COALESCE(name, '') || ' ' ||
     COALESCE(description, '') || ' ' ||
     COALESCE(short_description, '') || ' ' ||
     COALESCE(category, '') || ' ' ||
     COALESCE(sub_category, ''))::TEXT AS search_text,
    to_tsvector('english',
        COALESCE(name, '') || ' ' ||
        COALESCE(description, '') || ' ' ||
        COALESCE(short_description, '')
    ) AS search_vector,
    name_locales,
    description_locales,
    created_at,
    updated_at,
    CASE WHEN is_featured = true THEN 1 ELSE 0 END AS boost_score
FROM public.products
WHERE name IS NOT NULL AND published = true

UNION ALL

SELECT
    'blog'::TEXT AS content_type,
    id::TEXT,
    COALESCE(title, '')::TEXT AS title,
    COALESCE(summary, '')::TEXT AS description,
    COALESCE(featured_image_url, image_url)::TEXT AS image_url,
    ('/resources/blog/' || slug)::TEXT AS url,
    'blog'::TEXT AS category,
    COALESCE(author, '')::TEXT AS subcategory,
    (COALESCE(title, '') || ' ' ||
     COALESCE(summary, '') || ' ' ||
     COALESCE(content, '') || ' ' ||
     COALESCE(author, ''))::TEXT AS search_text,
    to_tsvector('english',
        COALESCE(title, '') || ' ' ||
        COALESCE(summary, '') || ' ' ||
        COALESCE(content, '')
    ) AS search_vector,
    title_locales AS name_locales,
    summary_locales AS description_locales,
    created_at,
    updated_at,
    0 AS boost_score
FROM public.blog_posts
WHERE title IS NOT NULL AND is_published = true

UNION ALL

SELECT
    'case_study'::TEXT AS content_type,
    id::TEXT,
    COALESCE(title, '')::TEXT AS title,
    COALESCE(summary, '')::TEXT AS description,
    featured_image_url::TEXT AS image_url,
    ('/resources/case-studies/' || slug)::TEXT AS url,
    'case_study'::TEXT AS category,
    COALESCE(industry, '')::TEXT AS subcategory,
    (COALESCE(title, '') || ' ' ||
     COALESCE(summary, '') || ' ' ||
     COALESCE(content, '') || ' ' ||
     COALESCE(author, '') || ' ' ||
     COALESCE(client_name, '') || ' ' ||
     COALESCE(industry, ''))::TEXT AS search_text,
    to_tsvector('english',
        COALESCE(title, '') || ' ' ||
        COALESCE(summary, '') || ' ' ||
        COALESCE(content, '')
    ) AS search_vector,
    title_locales AS name_locales,
    summary_locales AS description_locales,
    created_at,
    updated_at,
    0 AS boost_score
FROM public.case_studies
WHERE title IS NOT NULL AND is_published = true

UNION ALL

SELECT
    'career'::TEXT AS content_type,
    id::TEXT,
    COALESCE(title, '')::TEXT AS title,
    COALESCE(summary, '')::TEXT AS description,
    NULL::TEXT AS image_url,
    ('/careers/' || slug)::TEXT AS url,
    'career'::TEXT AS category,
    COALESCE(department, '')::TEXT AS subcategory,
    (COALESCE(title, '') || ' ' ||
     COALESCE(summary, '') || ' ' ||
     COALESCE(description, '') || ' ' ||
     COALESCE(department, '') || ' ' ||
     COALESCE(location, '') || ' ' ||
     COALESCE(job_type, ''))::TEXT AS search_text,
    to_tsvector('english',
        COALESCE(title, '') || ' ' ||
        COALESCE(summary, '') || ' ' ||
        COALESCE(description, '')
    ) AS search_vector,
    title_locales AS name_locales,
    summary_locales AS description_locales,
    created_at,
    updated_at,
    CASE WHEN is_featured = true THEN 1 ELSE 0 END AS boost_score
FROM public.careers
WHERE title IS NOT NULL AND is_published = true

UNION ALL

SELECT
    'en_resource'::TEXT AS content_type,
    id::TEXT,
    COALESCE(title, '')::TEXT AS title,
    COALESCE(summary, '')::TEXT AS description,
    image_url::TEXT AS image_url,
    ('/resources/en-resource-centre/' || slug)::TEXT AS url,
    'en_resource'::TEXT AS category,
    COALESCE(category, '')::TEXT AS subcategory,
    (COALESCE(title, '') || ' ' ||
     COALESCE(summary, '') || ' ' ||
     COALESCE(content, '') || ' ' ||
     COALESCE(category, '') || ' ' ||
     COALESCE(standard_code, ''))::TEXT AS search_text,
    to_tsvector('english',
        COALESCE(title, '') || ' ' ||
        COALESCE(summary, '') || ' ' ||
        COALESCE(content, '')
    ) AS search_vector,
    title_locales AS name_locales,
    summary_locales AS description_locales,
    created_at,
    updated_at,
    CASE WHEN featured = true THEN 1 ELSE 0 END AS boost_score
FROM public.en_resources
WHERE title IS NOT NULL AND published = true

UNION ALL

SELECT
    'industry_solution'::TEXT AS content_type,
    id::TEXT,
    COALESCE(industry_name, '')::TEXT AS title,
    COALESCE(description, '')::TEXT AS description,
    COALESCE(image_url, feature_image_url)::TEXT AS image_url,
    ('/industries/' || regexp_replace(regexp_replace(lower(industry_name), '[^a-z0-9_[:space:]]', '', 'g'), '[[:space:]]+', '-', 'g'))::TEXT AS url,
    'industry'::TEXT AS category,
    ''::TEXT AS subcategory,
    (COALESCE(industry_name, '') || ' ' ||
     COALESCE(description, '') || ' ' ||
     COALESCE(content, '') || ' ' ||
     COALESCE(feature_text, '') || ' ' ||
     COALESCE(showcase_description, ''))::TEXT AS search_text,
    to_tsvector('english',
        COALESCE(industry_name, '') || ' ' ||
        COALESCE(description, '') || ' ' ||
        COALESCE(content, '')
    ) AS search_vector,
    industry_name_locales AS name_locales,
    description_locales,
    created_at,
    updated_at,
    CASE WHEN is_featured = true THEN 1 ELSE 0 END AS boost_score
FROM public.industry_solutions
WHERE industry_name IS NOT NULL;

GRANT SELECT ON public.unified_search TO anon, authenticated;

COMMIT;
