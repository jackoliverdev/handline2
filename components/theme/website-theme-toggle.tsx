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
        variant="outline" 
        size="icon" 
        className={`bg-white dark:bg-black border-[#F28C38]/30 dark:border-[#F28C38]/50 hover:bg-[#F28C38] dark:hover:bg-[#F28C38] hover:border-[#F28C38] dark:hover:border-[#F28C38] transition-all duration-300 focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none ${className}`} 
        disabled
      >
        <Sun className="h-[1.2rem] w-[1.2rem] text-[#F28C38] hover:text-white rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute h-[1.2rem] w-[1.2rem] text-[#F28C38] hover:text-white rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    );
  }
  
  return (
    <Button 
      variant="outline" 
      size="icon" 
      onClick={toggleTheme} 
      className={`bg-white dark:bg-black border-[#F28C38]/30 dark:border-[#F28C38]/50 hover:bg-[#F28C38] dark:hover:bg-[#F28C38] hover:border-[#F28C38] dark:hover:border-[#F28C38] transition-all duration-300 hover:scale-105 hover:shadow-xl group focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none ${className}`}
      aria-label="Toggle theme"
      tabIndex={0}
    >
      <Sun className="h-[1.2rem] w-[1.2rem] text-[#F28C38] group-hover:text-white rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] text-[#F28C38] group-hover:text-white rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
} 