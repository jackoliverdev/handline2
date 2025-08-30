import { Metadata } from "next";
import { getAllCareerPosts } from "@/lib/career-service";
import CareerRoot from "@/components/website/careers/career-root";
import type { CareerPost } from "@/lib/career-service";

export const metadata: Metadata = {
  title: "Careers | HandLine",
  description: "Join our team at HandLine and be part of creating innovative safety solutions that protect workers across industries worldwide.",
};

export default async function CareersPage() {
  // Fetch active career posts
  const careerPosts = await getAllCareerPosts({ 
    published: true // Only get published job postings
  });
  
  // Log for debugging
  console.log(`Fetched ${careerPosts.length} career posts`);
  
  return (
    <main className="flex flex-col min-h-screen">
      <CareerRoot careerPosts={careerPosts} />
    </main>
  );
} 