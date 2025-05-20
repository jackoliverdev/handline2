import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCareerPostBySlug, getAllCareerPosts } from "@/lib/career-service";
import CareerPostClient from "@/components/website/careers/CareerPostClient";
import type { CareerPost } from "@/lib/career-service";

// Generate static params for all career posts
export async function generateStaticParams() {
  const posts = await getAllCareerPosts({ published: true });
  
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// Generate metadata for each career post
export async function generateMetadata({ 
  params 
}: { 
  params: { slug: string } 
}): Promise<Metadata> {
  const post = await getCareerPostBySlug(params.slug);
  
  if (!post) {
    return {
      title: "Career Post Not Found | HandLine",
      description: "The requested career post could not be found.",
    };
  }
  
  return {
    title: `${post.title} | Careers | HandLine`,
    description: post.description.substring(0, 160) + (post.description.length > 160 ? '...' : ''),
  };
}

export default async function CareerPostPage({ 
  params 
}: { 
  params: { slug: string } 
}) {
  // Get with default language (en)
  const post = await getCareerPostBySlug(params.slug);
  
  // Log for debugging
  console.log(`Fetched career post: ${params.slug}`, post ? "Found" : "Not found");
  
  // If post not found, return 404
  if (!post) {
    notFound();
  }
  
  return (
    <main>
      <CareerPostClient post={post} />
    </main>
  );
} 