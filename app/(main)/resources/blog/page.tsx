import { Metadata } from 'next';
import { getAllBlogs } from '@/lib/blog-service';
import BlogRoot from '@/components/website/blog/blog-root';

export const metadata: Metadata = {
  title: 'Blog | HandLine Safety Insights',
  description: 'Explore our collection of articles, insights, and resources about industrial safety, glove technology and industry standards.',
};

// Disable static generation for this page
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function BlogPage() {
  // Get the latest blog posts from Supabase
  const { data: blogPosts } = await getAllBlogs({ published: true });
  
  console.log(`Fetched ${blogPosts?.length || 0} blog posts for display`);
  
  return <BlogRoot blogPosts={blogPosts || []} />;
} 