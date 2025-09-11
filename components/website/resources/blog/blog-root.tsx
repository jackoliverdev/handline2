'use client';

import React from 'react';
import { BlogHero } from './hero';
import { BlogGrid } from './grid';
import { FeaturedBlog } from './featured-blog';
import BlogCategories from './Categories';
import { useLanguage } from '@/lib/context/language-context';
import type { BlogPost } from '@/lib/blog-service';

export default function BlogRoot({ blogPosts }: { blogPosts: BlogPost[] }) {
  const { language, t } = useLanguage();
  const [searchQuery, setSearchQuery] = React.useState('');

  // Get featured blog post (first one with featured_image_url or image_url)
  const featuredBlog = blogPosts.find(blog => blog.featured_image_url || blog.image_url);

  return (
    <main className="flex flex-col min-h-[100dvh]">
      <BlogHero language={language} blogPosts={blogPosts} searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      {/* Categories Buckets */}
      <BlogCategories onSelect={(q) => setSearchQuery(q)} />
      
      {/* Featured Blog Section */}
      {featuredBlog && (
        <FeaturedBlog blog={featuredBlog} language={language} t={t} />
      )}

      {/* Blog Grid */}
      <div id="blog-grid" className="bg-[#F5EFE0]/80 dark:bg-transparent py-12">
        <BlogGrid blogPosts={blogPosts} language={language} searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      </div>
    </main>
  );
} 