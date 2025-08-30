import { Metadata } from 'next';
import { getAllCaseStudies } from '@/lib/case-studies-service';
import CaseStudyRoot from '@/components/website/resources/case-studies/case-study-root';

export const metadata: Metadata = {
  title: 'Case Studies | HandLine Success Stories',
  description: 'Explore real-world examples of how HandLine safety solutions have helped companies improve safety, efficiency and compliance.',
};

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function CaseStudiesPage() {
  const { data: caseStudies } = await getAllCaseStudies({ published: true });
  return <CaseStudyRoot caseStudies={caseStudies || []} />;
}


