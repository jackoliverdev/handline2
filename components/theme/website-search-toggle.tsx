"use client";

import React from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SearchToggleProps {
  className?: string;
  isOpen?: boolean;
  onToggle?: () => void;
}

export function WebsiteSearchToggle({ className, isOpen, onToggle }: SearchToggleProps) {
  return (
    <Button 
      variant="outline" 
      size="icon" 
      onClick={onToggle}
      className={`bg-white dark:bg-black border-slate-200 dark:border-slate-700 hover:bg-brand-primary dark:hover:bg-brand-primary hover:border-brand-primary dark:hover:border-brand-primary transition-all duration-300 hover:scale-105 hover:shadow-xl group !focus:ring-0 !focus:ring-offset-0 !focus-visible:ring-0 !focus-visible:ring-offset-0 !focus-visible:outline-none !focus:outline-none !outline-none [&:focus]:outline-none [&:focus-visible]:outline-none [&:focus]:ring-0 [&:focus-visible]:ring-0 ${
        isOpen ? 'bg-brand-primary border-brand-primary text-white' : ''
      } ${className}`}
      aria-label="Search"
      tabIndex={0}
      style={{ 
        outline: 'none !important', 
        boxShadow: 'none !important',
        border: 'none !important' 
      }}
      data-no-focus-ring="true"
    >
      <Search className={`h-[1.2rem] w-[1.2rem] transition-all duration-300 group-hover:scale-110 ${
        isOpen ? 'text-white' : 'text-brand-primary group-hover:text-white'
      }`} />
      <span className="sr-only">Toggle search</span>
    </Button>
  );
} 