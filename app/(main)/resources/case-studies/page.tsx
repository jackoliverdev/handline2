import { Metadata } from 'next';
import { getAllCaseStudies } from '@/lib/case-studies-service';
import CaseStudyRoot from '@/components/website/case-studies/case-study-root';

export const metadata: Metadata = {
  title: 'Case Studies | HandLine Success Stories',
  description: 'Explore real-world examples of how HandLine safety solutions have helped companies improve safety, efficiency and compliance.',
};

// Disable static generation for this page
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function CaseStudiesPage() {
  // Get the latest case studies from Supabase
  const { data: caseStudies } = await getAllCaseStudies({ published: true });
  
  console.log(`Fetched ${caseStudies?.length || 0} case studies for display`);
  
  return <CaseStudyRoot caseStudies={caseStudies || []} />;
} 