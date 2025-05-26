import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  try {
    console.log('=== COMPREHENSIVE SEARCH API ROUTE CALLED ===');
    console.log('Request URL:', request.url);
    
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || '';
    const content_types = searchParams.get('content_types');
    const category = searchParams.get('category');
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');
    const language = searchParams.get('language') || 'en';

    console.log('Comprehensive search request:', { query, content_types, category, limit, offset, language });

    if (!query.trim()) {
      return NextResponse.json({ 
        results: [], 
        total: 0,
        hasMore: false 
      });
    }

    const searchPattern = query.trim();
    // Parse content types - handle both JSON arrays and comma-separated strings
    let contentTypesArray: string[] = [];
    if (content_types) {
      try {
        // Try parsing as JSON first (new format)
        contentTypesArray = JSON.parse(content_types);
      } catch {
        // Fall back to comma-separated format for backwards compatibility
        contentTypesArray = content_types.split(',');
      }
    }
    let allResults: any[] = [];

    // Search Products
    if (contentTypesArray.length === 0 || contentTypesArray.includes('product')) {
      console.log('Searching products...');
      
      // First query - search in English fields
      let productQuery = supabase
        .from('products')
        .select('id, name, description, short_description, category, image_url, created_at, name_locales, description_locales, category_locales')
        .or(`name.ilike.%${searchPattern}%,description.ilike.%${searchPattern}%,category.ilike.%${searchPattern}%`);

      if (category) {
        productQuery = productQuery.eq('category', category);
      }

      const { data: products, error: productsError } = await productQuery
        .order('created_at', { ascending: false })
        .limit(limit);

      console.log('Products query result:', { products: products?.length, error: productsError });

      // For non-English languages, also search in localized content client-side
      let localizedProducts: any[] = [];
      if (language !== 'en') {
        console.log('Searching localized product content...');
        
        // Get all products with localized content to search client-side
        const { data: allProducts, error: allProductsError } = await supabase
          .from('products')
          .select('id, name, description, short_description, category, image_url, created_at, name_locales, description_locales, category_locales')
          .not('name_locales', 'is', null)
          .limit(500); // Reasonable limit for client-side search

        if (allProducts) {
          localizedProducts = allProducts.filter(product => {
            const localizedName = product.name_locales?.[language] || '';
            const localizedDescription = product.description_locales?.[language] || '';
            const localizedCategory = product.category_locales?.[language] || '';
            
            return localizedName.toLowerCase().includes(searchPattern.toLowerCase()) ||
                   localizedDescription.toLowerCase().includes(searchPattern.toLowerCase()) ||
                   localizedCategory.toLowerCase().includes(searchPattern.toLowerCase());
          });
          
          console.log(`Found ${localizedProducts.length} products matching localized content`);
        }
      }

      // Combine and deduplicate results
      const allProductResults = [...(products || []), ...localizedProducts];
      const uniqueProducts = allProductResults.filter((product, index, self) => 
        index === self.findIndex(p => p.id === product.id)
      );

      if (uniqueProducts.length > 0) {
        allResults.push(...uniqueProducts.map((product: any) => {
          // Extract localized content
          const localizedName = language !== 'en' && product.name_locales?.[language] 
            ? product.name_locales[language] 
            : product.name;
          const localizedDescription = language !== 'en' && product.description_locales?.[language] 
            ? product.description_locales[language] 
            : product.description;
          const localizedCategory = language !== 'en' && product.category_locales?.[language] 
            ? product.category_locales[language] 
            : product.category;

          return {
            id: product.id,
            content_type: 'product',
            title: localizedName,
            description: localizedDescription?.substring(0, 200) + '...' || product.short_description || product.description?.substring(0, 200) + '...',
            url: `/products/${encodeURIComponent(product.name)}`,
            image_url: product.image_url,
            category: localizedCategory,
            published_at: product.created_at,
            relevance_score: localizedName?.toLowerCase().includes(searchPattern.toLowerCase()) ? 1 : 0
          };
        }));
      }
    }

    // Search Blog Posts
    if (contentTypesArray.length === 0 || contentTypesArray.includes('blog')) {
      console.log('Searching blog posts...');
      
      let blogQuery = supabase
        .from('blog_posts')
        .select('id, title, summary, content, slug, image_url, featured_image_url, published_at, title_locales, summary_locales, content_locales')
        .eq('is_published', true)
        .or(`title.ilike.%${searchPattern}%,summary.ilike.%${searchPattern}%,content.ilike.%${searchPattern}%`);

      const { data: blogPosts, error: blogError } = await blogQuery
        .order('published_at', { ascending: false })
        .limit(limit);

      console.log('Blog posts query result:', { blogPosts: blogPosts?.length, error: blogError });

      if (blogPosts) {
        allResults.push(...blogPosts.map((post: any) => {
          const localizedTitle = language !== 'en' && post.title_locales?.[language] 
            ? post.title_locales[language] 
            : post.title;
          const localizedSummary = language !== 'en' && post.summary_locales?.[language] 
            ? post.summary_locales[language] 
            : post.summary;

          return {
            id: post.id,
            content_type: 'blog',
            title: localizedTitle,
            description: localizedSummary || post.content?.substring(0, 200) + '...',
            url: `/resources/blog/${post.slug}`,
            image_url: post.featured_image_url || post.image_url,
            published_at: post.published_at,
            relevance_score: localizedTitle?.toLowerCase().includes(searchPattern.toLowerCase()) ? 1 : 0
          };
        }));
      }
    }

    // Search Case Studies
    if (contentTypesArray.length === 0 || contentTypesArray.includes('case_study')) {
      console.log('Searching case studies...');
      
      let caseStudyQuery = supabase
        .from('case_studies')
        .select('id, title, summary, content, slug, featured_image_url, published_at, title_locales, summary_locales, content_locales')
        .eq('is_published', true)
        .or(`title.ilike.%${searchPattern}%,summary.ilike.%${searchPattern}%,content.ilike.%${searchPattern}%`);

      const { data: caseStudies, error: caseStudiesError } = await caseStudyQuery
        .order('published_at', { ascending: false })
        .limit(limit);

      console.log('Case studies query result:', { caseStudies: caseStudies?.length, error: caseStudiesError });

      if (caseStudies) {
        allResults.push(...caseStudies.map((study: any) => {
          const localizedTitle = language !== 'en' && study.title_locales?.[language] 
            ? study.title_locales[language] 
            : study.title;
          const localizedSummary = language !== 'en' && study.summary_locales?.[language] 
            ? study.summary_locales[language] 
            : study.summary;

          return {
            id: study.id,
            content_type: 'case_study',
            title: localizedTitle,
            description: localizedSummary || study.content?.substring(0, 200) + '...',
            url: `/resources/case-studies/${study.slug}`,
            image_url: study.featured_image_url,
            published_at: study.published_at,
            relevance_score: localizedTitle?.toLowerCase().includes(searchPattern.toLowerCase()) ? 1 : 0
          };
        }));
      }
    }

    // Search Industry Solutions
    if (contentTypesArray.length === 0 || contentTypesArray.includes('industry_solution')) {
      console.log('Searching industry solutions...');
      
      let industryQuery = supabase
        .from('industry_solutions')
        .select('id, industry_name, description, content, image_url, feature_image_url, created_at, industry_name_locales, description_locales, content_locales')
        .or(`industry_name.ilike.%${searchPattern}%,description.ilike.%${searchPattern}%,content.ilike.%${searchPattern}%`);

      const { data: industrySolutions, error: industryError } = await industryQuery
        .order('created_at', { ascending: false })
        .limit(limit);

      console.log('Industry solutions query result:', { industrySolutions: industrySolutions?.length, error: industryError });

      if (industrySolutions) {
        allResults.push(...industrySolutions.map((solution: any) => {
          const localizedName = language !== 'en' && solution.industry_name_locales?.[language] 
            ? solution.industry_name_locales[language] 
            : solution.industry_name;
          const localizedDescription = language !== 'en' && solution.description_locales?.[language] 
            ? solution.description_locales[language] 
            : solution.description;

          return {
            id: solution.id,
            content_type: 'industry_solution',
            title: localizedName,
            description: localizedDescription || solution.content?.substring(0, 200) + '...',
            url: `/industries/${encodeURIComponent(solution.industry_name.toLowerCase().replace(/\s+/g, '-'))}`,
            image_url: solution.feature_image_url || solution.image_url,
            published_at: solution.created_at,
            relevance_score: localizedName?.toLowerCase().includes(searchPattern.toLowerCase()) ? 1 : 0
          };
        }));
      }
    }

    // Search EN Resources
    if (contentTypesArray.length === 0 || contentTypesArray.includes('en_resource')) {
      console.log('Searching EN resources...');
      
      let enResourceQuery = supabase
        .from('en_resources')
        .select('id, title, summary, content, slug, image_url, published_at, category, standard_code, title_locales, summary_locales, content_locales, category_locales')
        .eq('published', true)
        .or(`title.ilike.%${searchPattern}%,summary.ilike.%${searchPattern}%,content.ilike.%${searchPattern}%,standard_code.ilike.%${searchPattern}%`);

      const { data: enResources, error: enResourcesError } = await enResourceQuery
        .order('published_at', { ascending: false })
        .limit(limit);

      console.log('EN resources query result:', { enResources: enResources?.length, error: enResourcesError });

      if (enResources) {
        allResults.push(...enResources.map((resource: any) => {
          const localizedTitle = language !== 'en' && resource.title_locales?.[language] 
            ? resource.title_locales[language] 
            : resource.title;
          const localizedSummary = language !== 'en' && resource.summary_locales?.[language] 
            ? resource.summary_locales[language] 
            : resource.summary;
          const localizedCategory = language !== 'en' && resource.category_locales?.[language] 
            ? resource.category_locales[language] 
            : resource.category;

          return {
            id: resource.id,
            content_type: 'en_resource',
            title: localizedTitle,
            description: localizedSummary || resource.content?.substring(0, 200) + '...',
            url: `/resources/en-resource-centre/${resource.slug}`,
            image_url: resource.image_url,
            category: localizedCategory,
            published_at: resource.published_at,
            relevance_score: localizedTitle?.toLowerCase().includes(searchPattern.toLowerCase()) ? 1 : 0
          };
        }));
      }
    }

    // Search Careers
    if (contentTypesArray.length === 0 || contentTypesArray.includes('career')) {
      console.log('Searching careers...');
      
      let careerQuery = supabase
        .from('careers')
        .select('id, title, summary, description, slug, image_url, published_at, department, location, job_type, title_locales, summary_locales, description_locales, department_locales, location_locales, job_type_locales')
        .eq('is_published', true)
        .or(`title.ilike.%${searchPattern}%,summary.ilike.%${searchPattern}%,description.ilike.%${searchPattern}%,department.ilike.%${searchPattern}%,location.ilike.%${searchPattern}%`);

      const { data: careers, error: careersError } = await careerQuery
        .order('published_at', { ascending: false })
        .limit(limit);

      console.log('Careers query result:', { careers: careers?.length, error: careersError });

      if (careers) {
        allResults.push(...careers.map((career: any) => {
          const localizedTitle = language !== 'en' && career.title_locales?.[language] 
            ? career.title_locales[language] 
            : career.title;
          const localizedSummary = language !== 'en' && career.summary_locales?.[language] 
            ? career.summary_locales[language] 
            : career.summary;
          const localizedDepartment = language !== 'en' && career.department_locales?.[language] 
            ? career.department_locales[language] 
            : career.department;
          const localizedLocation = language !== 'en' && career.location_locales?.[language] 
            ? career.location_locales[language] 
            : career.location;

          return {
            id: career.id,
            content_type: 'career',
            title: localizedTitle,
            description: localizedSummary || career.description?.substring(0, 200) + '...',
            url: `/careers/${career.slug}`,
            image_url: career.image_url,
            category: localizedDepartment,
            subcategory: localizedLocation,
            published_at: career.published_at,
            relevance_score: localizedTitle?.toLowerCase().includes(searchPattern.toLowerCase()) ? 1 : 0
          };
        }));
      }
    }

    // Sort results by relevance (title matches first) then by date
    allResults.sort((a, b) => {
      if (a.relevance_score !== b.relevance_score) {
        return b.relevance_score - a.relevance_score;
      }
      return new Date(b.published_at).getTime() - new Date(a.published_at).getTime();
    });

    // Apply pagination
    const paginatedResults = allResults.slice(offset, offset + limit);
    const hasMore = allResults.length > offset + limit;

    console.log('Final search results:', {
      total: allResults.length,
      returned: paginatedResults.length,
      hasMore
    });

    return NextResponse.json({
      results: paginatedResults,
      total: allResults.length,
      hasMore
    });

  } catch (error) {
    console.error('Search API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 