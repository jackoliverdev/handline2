"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "reactfire";
import { Loader2 } from "lucide-react";

export default function NotFound() {
  const router = useRouter();
  const { data: user, status } = useUser();

  // Redirect based on authentication status
  useEffect(() => {
    if (status === "success") {
      if (user) {
        // If user is logged in, redirect to dashboard
        router.push("/dashboard");
      } else {
        // If user is not logged in, redirect to home
        router.push("/");
      }
    }
  }, [user, status, router]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background">
      <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
      <h2 className="text-lg font-medium text-foreground">Redirecting you to the right place...</h2>
      <p className="text-muted-foreground mt-2">Just a moment please</p>
    </div>
  );
} 