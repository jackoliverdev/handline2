import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Package } from "lucide-react";

export default function ProductNotFound() {
  return (
    <main className="container flex flex-col items-center justify-center py-20 text-center">
      <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-muted">
        <Package className="h-10 w-10 text-muted-foreground" />
      </div>
      
      <h1 className="mb-2 text-3xl font-bold md:text-4xl">Product Not Found</h1>
      
      <p className="mb-8 max-w-md text-muted-foreground">
        We couldn't find the product you're looking for. It may have been removed 
        or the URL might be incorrect.
      </p>
      
      <div className="flex flex-col gap-4 sm:flex-row">
        <Button asChild>
          <Link href="/products">
            Browse Products
          </Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/">
            Go to Homepage
          </Link>
        </Button>
      </div>
    </main>
  );
} 