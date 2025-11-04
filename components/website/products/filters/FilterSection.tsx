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
    <div className={`${variant === "desktop" ? "pb-2" : ""} ${className}`}>
      <button
        type="button"
        className={`flex w-full items-center justify-between ${variant === "mobile" ? "py-2 text-left text-base" : "mb-2"}`}
        onClick={() => setExpanded((e) => !e)}
      >
        <h3 className={`${variant === "mobile" ? "text-base" : "text-sm"} font-medium text-brand-primary dark:text-brand-primary flex items-center`}>
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
        <div className="mt-2 space-y-2">
          {children}
        </div>
      )}
    </div>
  );
}


