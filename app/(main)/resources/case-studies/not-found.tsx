import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <main className="container flex flex-col items-center justify-center min-h-[70vh] py-12 text-center">
      <h1 className="text-heading-1 mb-4 font-bold tracking-tight">404</h1>
      <h2 className="text-heading-3 mb-6 font-medium">Case Study Not Found</h2>
      <p className="text-body-lg text-muted-foreground max-w-lg mb-8">
        Sorry, we couldn't find the case study you're looking for. It may have been moved, deleted, or never existed.
      </p>
      <Button asChild>
        <Link href="/resources/case-studies" className="flex items-center">
          <ChevronLeft className="mr-1 h-4 w-4" />
          Back to Case Studies
        </Link>
      </Button>
    </main>
  );
} 