"use client";

import React from "react";
import { Moon, Sun } from "lucide-react";
import { useWebsiteTheme } from "@/hooks/use-website-theme";
import { Button } from "@/components/ui/button";

interface ThemeToggleProps {
  className?: string;
  variant?: "default" | "outline" | "secondary" | "ghost" | "link";
}

export function WebsiteThemeToggle({ className, variant = "ghost" }: ThemeToggleProps) {
  const { theme, toggleTheme, mounted } = useWebsiteTheme();
  
  // Avoid hydration mismatch
  if (!mounted) {
    return (
      <Button 
        variant={variant} 
        size="icon" 
        className={`focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none ${className}`} 
        disabled
      >
        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    );
  }
  
  return (
    <Button 
      variant={variant} 
      size="icon" 
      onClick={toggleTheme} 
      className={`focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none ${className}`}
      aria-label="Toggle theme"
      tabIndex={0}
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 text-brand-primary transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 text-brand-primary transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
} 