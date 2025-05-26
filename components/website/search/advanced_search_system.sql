-- ==========================================
-- HANDLINE ADVANCED SEARCH SYSTEM
-- ==========================================

-- Enable required extensions for advanced search
CREATE EXTENSION IF NOT EXISTS pg_trgm;
CREATE EXTENSION IF NOT EXISTS unaccent;
CREATE EXTENSION IF NOT EXISTS btree_gin;

-- Drop existing search view
DROP VIEW IF EXISTS unified_search;

-- ==========================================
-- HELPER FUNCTIONS FOR SEARCH
-- ==========================================

-- Function to extract all text values from JSONB locale objects
CREATE OR REPLACE FUNCTION extract_locale_text(locale_json JSONB)
RETURNS TEXT AS $$
BEGIN
    IF locale_json IS NULL THEN
        RETURN '';
    END IF;
    
    RETURN COALESCE(
        CONCAT_WS(' ',
            locale_json->>'en',
            locale_json->>'es', 
            locale_json->>'fr',
            locale_json->>'it'
        ), ''
    );
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- Function to extract text from arrays 
CREATE OR REPLACE FUNCTION array_to_text_safe(arr TEXT[])
RETURNS TEXT AS $$
BEGIN
    IF arr IS NULL THEN
        RETURN '';
    END IF;
    RETURN array_to_string(arr, ' ');
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- Function to create comprehensive search text
CREATE OR REPLACE FUNCTION create_search_text(
    base_text TEXT DEFAULT '',
    locale_texts JSONB[] DEFAULT '{}',
    array_texts TEXT[][] DEFAULT '{}',
    extra_texts TEXT[] DEFAULT '{}'
)
RETURNS TEXT AS $$
DECLARE
    result TEXT := COALESCE(base_text, '');
    locale_json JSONB;
    text_array TEXT[];
    extra_text TEXT;
BEGIN
    -- Add locale texts
    FOREACH locale_json IN ARRAY locale_texts
    LOOP
        result := result || ' ' || extract_locale_text(locale_json);
    END LOOP;
    
    -- Add array texts
    FOREACH text_array IN ARRAY array_texts
    LOOP
        result := result || ' ' || array_to_text_safe(text_array);
    END LOOP;
    
    -- Add extra texts
    FOREACH extra_text IN ARRAY extra_texts
    LOOP
        result := result || ' ' || COALESCE(extra_text, '');
    END LOOP;
    
    RETURN TRIM(result);
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- ==========================================
-- COMPREHENSIVE SEARCH VIEW
-- ==========================================

CREATE VIEW unified_search AS
-- PRODUCTS
SELECT 
    'product'::TEXT as content_type,
    id::TEXT,
    COALESCE(name, '')::TEXT as title,
    COALESCE(description, short_description, '')::TEXT as description,
    image_url::TEXT as image_url,
    CASE 
        WHEN name IS NOT NULL THEN ('/products/' || name)::TEXT
        ELSE ('/products/' || id::text)::TEXT
    END as url,
    COALESCE(category, 'product')::TEXT as category,
    COALESCE(sub_category, '')::TEXT as subcategory,
    -- Simple search text
    (COALESCE(name, '') || ' ' || 
    COALESCE(description, '') || ' ' || 
    COALESCE(short_description, '') || ' ' ||
    COALESCE(category, '') || ' ' ||
    COALESCE(sub_category, ''))::TEXT as search_text,
    -- Simple tsvector
    to_tsvector('english', 
        COALESCE(name, '') || ' ' || 
        COALESCE(description, '') || ' ' || 
        COALESCE(short_description, '')
    ) as search_vector,
    name_locales,
    description_locales,
    created_at,
    updated_at,
    CASE WHEN is_featured = true THEN 1 ELSE 0 END as boost_score
FROM products
WHERE name IS NOT NULL

UNION ALL

-- BLOG POSTS
SELECT 
    'blog'::TEXT as content_type,
    id::TEXT,
    COALESCE(title, '')::TEXT as title,
    COALESCE(summary, '')::TEXT as description,
    COALESCE(featured_image_url, image_url)::TEXT as image_url,
    ('/resources/blog/' || slug)::TEXT as url,
    'blog'::TEXT as category,
    COALESCE(author, '')::TEXT as subcategory,
    -- Simple search text
    (COALESCE(title, '') || ' ' || 
    COALESCE(summary, '') || ' ' || 
    COALESCE(content, '') || ' ' ||
    COALESCE(author, ''))::TEXT as search_text,
    -- Simple tsvector
    to_tsvector('english',
        COALESCE(title, '') || ' ' || 
        COALESCE(summary, '') || ' ' || 
        COALESCE(content, '')
    ) as search_vector,
    title_locales as name_locales,
    summary_locales as description_locales,
    created_at,
    updated_at,
    0 as boost_score
FROM blog_posts
WHERE title IS NOT NULL AND is_published = true

UNION ALL

-- CASE STUDIES
SELECT 
    'case_study'::TEXT as content_type,
    id::TEXT,
    COALESCE(title, '')::TEXT as title,
    COALESCE(summary, '')::TEXT as description,
    featured_image_url::TEXT as image_url,
    ('/resources/case-studies/' || slug)::TEXT as url,
    'case_study'::TEXT as category,
    COALESCE(industry, '')::TEXT as subcategory,
    -- Simple search text
    (COALESCE(title, '') || ' ' || 
    COALESCE(summary, '') || ' ' || 
    COALESCE(content, '') || ' ' ||
    COALESCE(author, '') || ' ' ||
    COALESCE(client_name, '') || ' ' ||
    COALESCE(industry, ''))::TEXT as search_text,
    -- Simple tsvector
    to_tsvector('english',
        COALESCE(title, '') || ' ' || 
        COALESCE(summary, '') || ' ' || 
        COALESCE(content, '')
    ) as search_vector,
    title_locales as name_locales,
    summary_locales as description_locales,
    created_at,
    updated_at,
    0 as boost_score
FROM case_studies
WHERE title IS NOT NULL AND is_published = true

UNION ALL

-- CAREERS
SELECT 
    'career'::TEXT as content_type,
    id::TEXT,
    COALESCE(title, '')::TEXT as title,
    COALESCE(summary, '')::TEXT as description,
    NULL::TEXT as image_url,
    ('/careers/' || slug)::TEXT as url,
    'career'::TEXT as category,
    COALESCE(department, '')::TEXT as subcategory,
    -- Simple search text
    (COALESCE(title, '') || ' ' || 
    COALESCE(summary, '') || ' ' || 
    COALESCE(description, '') || ' ' ||
    COALESCE(department, '') || ' ' ||
    COALESCE(location, '') || ' ' ||
    COALESCE(job_type, ''))::TEXT as search_text,
    -- Simple tsvector
    to_tsvector('english',
        COALESCE(title, '') || ' ' || 
        COALESCE(summary, '') || ' ' || 
        COALESCE(description, '')
    ) as search_vector,
    title_locales as name_locales,
    summary_locales as description_locales,
    created_at,
    updated_at,
    CASE WHEN is_featured = true THEN 1 ELSE 0 END as boost_score
FROM careers
WHERE title IS NOT NULL AND is_published = true

UNION ALL

-- EN RESOURCES
SELECT 
    'en_resource'::TEXT as content_type,
    id::TEXT,
    COALESCE(title, '')::TEXT as title,
    COALESCE(summary, '')::TEXT as description,
    image_url::TEXT as image_url,
    ('/resources/en-resource-centre/' || slug)::TEXT as url,
    'en_resource'::TEXT as category,
    COALESCE(category, '')::TEXT as subcategory,
    -- Simple search text
    (COALESCE(title, '') || ' ' || 
    COALESCE(summary, '') || ' ' || 
    COALESCE(content, '') || ' ' ||
    COALESCE(category, '') || ' ' ||
    COALESCE(standard_code, ''))::TEXT as search_text,
    -- Simple tsvector
    to_tsvector('english',
        COALESCE(title, '') || ' ' || 
        COALESCE(summary, '') || ' ' || 
        COALESCE(content, '')
    ) as search_vector,
    title_locales as name_locales,
    summary_locales as description_locales,
    created_at,
    updated_at,
    CASE WHEN featured = true THEN 1 ELSE 0 END as boost_score
FROM en_resources
WHERE title IS NOT NULL AND published = true

UNION ALL

-- INDUSTRY SOLUTIONS
SELECT 
    'industry_solution'::TEXT as content_type,
    id::TEXT,
    COALESCE(industry_name, '')::TEXT as title,
    COALESCE(description, '')::TEXT as description,
    COALESCE(image_url, feature_image_url)::TEXT as image_url,
    ('/industries/' || id)::TEXT as url,
    'industry'::TEXT as category,
    ''::TEXT as subcategory,
    -- Simple search text
    (COALESCE(industry_name, '') || ' ' || 
    COALESCE(description, '') || ' ' || 
    COALESCE(content, '') || ' ' ||
    COALESCE(feature_text, '') || ' ' ||
    COALESCE(showcase_description, ''))::TEXT as search_text,
    -- Simple tsvector
    to_tsvector('english',
        COALESCE(industry_name, '') || ' ' || 
        COALESCE(description, '') || ' ' || 
        COALESCE(content, '')
    ) as search_vector,
    industry_name_locales as name_locales,
    description_locales,
    created_at,
    updated_at,
    CASE WHEN is_featured = true THEN 1 ELSE 0 END as boost_score
FROM industry_solutions
WHERE industry_name IS NOT NULL;

-- ==========================================
-- ADVANCED SEARCH FUNCTION
-- ==========================================

CREATE OR REPLACE FUNCTION advanced_search(
    search_query TEXT,
    content_filter TEXT[] DEFAULT NULL,
    category_filter TEXT DEFAULT NULL,
    locale_preference TEXT DEFAULT 'en',
    limit_results INTEGER DEFAULT 50,
    min_similarity NUMERIC DEFAULT 0.1
)
RETURNS TABLE(
    content_type TEXT,
    id TEXT,
    title TEXT,
    description TEXT,
    image_url TEXT,
    url TEXT,
    category TEXT,
    subcategory TEXT,
    relevance_score NUMERIC,
    match_type TEXT
) AS $$
BEGIN
    RETURN QUERY
    WITH search_results AS (
        SELECT 
            s.content_type,
            s.id,
            s.title,
            s.description,
            s.image_url,
            s.url,
            s.category,
            s.subcategory,
            -- Simplified relevance scoring
            (
                -- Full-text search score
                COALESCE(ts_rank(s.search_vector, plainto_tsquery('english', search_query)), 0) * 10 +
                -- Exact matches get highest score
                CASE 
                    WHEN s.title ILIKE '%' || search_query || '%' THEN 20
                    WHEN s.description ILIKE '%' || search_query || '%' THEN 15
                    WHEN s.search_text ILIKE '%' || search_query || '%' THEN 10
                    ELSE 0
                END +
                -- Prefix matching (starts with)
                CASE 
                    WHEN s.title ILIKE search_query || '%' THEN 25
                    WHEN s.search_text ILIKE search_query || '%' THEN 15
                    ELSE 0
                END +
                -- Boost score for featured items
                s.boost_score * 5
            ) as relevance_score,
            -- Determine match type
            CASE 
                WHEN s.title ILIKE search_query || '%' THEN 'prefix_exact'::TEXT
                WHEN s.title ILIKE '%' || search_query || '%' THEN 'contains_exact'::TEXT
                WHEN s.search_vector @@ plainto_tsquery('english', search_query) THEN 'fulltext'::TEXT
                ELSE 'partial'::TEXT
            END as match_type
        FROM unified_search s
        WHERE 
            -- Simplified search strategies
            (
                -- Full-text search
                s.search_vector @@ plainto_tsquery('english', search_query) OR
                -- Partial text matching (after 1 character)
                (length(search_query) >= 1 AND (
                    s.title ILIKE '%' || search_query || '%' OR
                    s.description ILIKE '%' || search_query || '%' OR
                    s.search_text ILIKE '%' || search_query || '%'
                ))
            )
            -- Content type filter
            AND (content_filter IS NULL OR s.content_type = ANY(content_filter))
            -- Category filter
            AND (category_filter IS NULL OR s.category ILIKE '%' || category_filter || '%')
    )
    SELECT 
        r.content_type,
        r.id,
        r.title,
        r.description,
        r.image_url,
        r.url,
        r.category,
        r.subcategory,
        r.relevance_score,
        r.match_type
    FROM search_results r
    WHERE r.relevance_score > 0
    ORDER BY 
        r.relevance_score DESC,
        CASE r.match_type
            WHEN 'prefix_exact' THEN 1
            WHEN 'contains_exact' THEN 2
            WHEN 'fulltext' THEN 3
            ELSE 4
        END,
        r.title
    LIMIT limit_results;
END;
$$ LANGUAGE plpgsql;

-- ==========================================
-- SEARCH SUGGESTION FUNCTION
-- ==========================================

CREATE OR REPLACE FUNCTION get_search_suggestions(
    partial_query TEXT,
    suggestion_limit INTEGER DEFAULT 10
)
RETURNS TABLE(
    suggestion TEXT,
    content_type TEXT,
    match_count BIGINT
) AS $$
BEGIN
    RETURN QUERY
    WITH distinct_suggestions AS (
        -- Get exact title matches
        SELECT 
            title as suggestion,
            unified_search.content_type,
            1::BIGINT as match_count
        FROM unified_search
        WHERE title IS NOT NULL 
        AND title ILIKE partial_query || '%'
        
        UNION
        
        -- Get category matches
        SELECT 
            category as suggestion,
            'category'::TEXT as content_type,
            1::BIGINT as match_count
        FROM unified_search
        WHERE category IS NOT NULL 
        AND category ILIKE partial_query || '%'
    )
    SELECT 
        s.suggestion,
        s.content_type,
        COUNT(*) as match_count
    FROM distinct_suggestions s
    WHERE length(s.suggestion) > 1
    GROUP BY s.suggestion, s.content_type
    ORDER BY match_count DESC, s.suggestion
    LIMIT suggestion_limit;
END;
$$ LANGUAGE plpgsql;

-- ==========================================
-- CREATE INDEXES FOR PERFORMANCE
-- ==========================================

-- Create indexes on the base tables for better performance
CREATE INDEX IF NOT EXISTS idx_products_search_gin 
ON products USING gin(to_tsvector('english', COALESCE(name, '') || ' ' || COALESCE(description, '') || ' ' || COALESCE(short_description, '')));

CREATE INDEX IF NOT EXISTS idx_products_trigram 
ON products USING gin(name gin_trgm_ops, description gin_trgm_ops);

CREATE INDEX IF NOT EXISTS idx_blog_posts_search_gin 
ON blog_posts USING gin(to_tsvector('english', COALESCE(title, '') || ' ' || COALESCE(summary, '') || ' ' || COALESCE(content, '')));

CREATE INDEX IF NOT EXISTS idx_blog_posts_trigram 
ON blog_posts USING gin(title gin_trgm_ops, summary gin_trgm_ops);

CREATE INDEX IF NOT EXISTS idx_case_studies_search_gin 
ON case_studies USING gin(to_tsvector('english', COALESCE(title, '') || ' ' || COALESCE(summary, '') || ' ' || COALESCE(content, '')));

CREATE INDEX IF NOT EXISTS idx_case_studies_trigram 
ON case_studies USING gin(title gin_trgm_ops, summary gin_trgm_ops);

-- ==========================================
-- EXAMPLE USAGE
-- ==========================================

/*
-- Example searches:

-- Basic search
SELECT * FROM advanced_search('heat');

-- Search with filters
SELECT * FROM advanced_search('glove', ARRAY['product'], 'Heat Resistant Gloves');

-- Search in Italian locale
SELECT * FROM advanced_search('calore', NULL, NULL, 'it');

-- Get suggestions
SELECT * FROM get_search_suggestions('he');

-- Fuzzy search with very low similarity (finds more results)
SELECT * FROM advanced_search('heatr', NULL, NULL, 'en', 20, 0.05);
*/ 