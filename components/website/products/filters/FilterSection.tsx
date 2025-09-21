"use client";

import React from "react";
import { ChevronDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface FilterSectionProps {
  title: string;
  children: React.ReactNode;
  defaultExpanded?: boolean;
  countBadge?: number;
  className?: string;
  variant?: "desktop" | "mobile";
}

export function FilterSection({
  title,
  children,
  defaultExpanded = false,
  countBadge,
  className = "",
  variant = "desktop",
}: FilterSectionProps) {
  const [expanded, setExpanded] = React.useState<boolean>(defaultExpanded);

  return (
    <div className={`${variant === "desktop" ? "border-b border-brand-primary/10 dark:border-brand-primary/20 pb-4" : ""} ${className}`}>
      <button
        type="button"
        className={`flex w-full items-center justify-between ${variant === "mobile" ? "py-2" : "mb-2"}`}
        onClick={() => setExpanded((e) => !e)}
      >
        <h3 className={`${variant === "mobile" ? "text-base" : "text-sm"} font-medium text-brand-dark dark:text-white flex items-center`}>
          {title}
          {typeof countBadge === "number" && countBadge > 0 && (
            <Badge className="ml-2 bg-brand-primary text-white">{countBadge}</Badge>
          )}
        </h3>
        <ChevronDown
          className={`h-4 w-4 text-brand-primary transition-transform ${expanded ? "rotate-180" : ""}`}
        />
      </button>

      {(expanded) && (
        <div className="mt-2 space-y-3">
          {children}
        </div>
      )}
    </div>
  );
}


