import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Shield } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex flex-col min-h-[100dvh] items-center justify-center py-20 bg-[#F5EFE0]/80 dark:bg-transparent">
      <div className="container flex flex-col items-center text-center max-w-2xl gap-6">
        <div className="inline-flex items-center rounded-full bg-brand-primary/10 px-4 py-1.5 text-sm border border-brand-primary/40 backdrop-blur-sm">
          <Shield className="mr-2 h-4 w-4 text-brand-primary" />
          <span className="text-brand-dark dark:text-white font-medium">
            404 - Not Found
          </span>
        </div>
        
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl text-brand-dark dark:text-white">
          Standard Not Found
        </h1>
        
        <p className="text-xl text-brand-secondary dark:text-gray-300">
          We couldn't find the EN standard you were looking for. It may have been moved, removed, or doesn't exist.
        </p>
        
        <div className="mt-6 flex flex-col sm:flex-row gap-4">
          <Button asChild className="bg-brand-primary hover:bg-brand-primary/90">
            <Link href="/resources/en-resource-centre">
              Browse All Standards
            </Link>
          </Button>
          <Button asChild variant="outline" className="border-brand-primary/20 hover:bg-brand-primary/10 hover:text-brand-primary">
            <Link href="/">
              Return Home
            </Link>
          </Button>
        </div>
      </div>
    </main>
  );
} 