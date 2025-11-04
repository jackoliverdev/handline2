"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface SwitchProps extends React.InputHTMLAttributes<HTMLInputElement> {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  ({ className, checked, onCheckedChange, ...props }, ref) => {
    return (
      <div className="inline-flex h-[24px] w-[44px] shrink-0 cursor-pointer items-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50"
        onClick={() => onCheckedChange?.(!checked)}
      >
        <input
          type="checkbox"
          className="absolute h-0 w-0 opacity-0"
          checked={checked}
          onChange={(e) => onCheckedChange?.(e.target.checked)}
          ref={ref}
          {...props}
        />
        <div
          className={cn(
            "relative h-[24px] w-[44px] rounded-full transition-colors",
            checked ? "bg-primary" : "bg-input",
            className
          )}
        >
          <div
            className={cn(
              "absolute left-[2px] top-1/2 h-5 w-5 -translate-y-1/2 rounded-full bg-background shadow-lg ring-0 transition-transform",
              checked ? "translate-x-5" : "translate-x-0"
            )}
          />
        </div>
      </div>
    );
  }
);
Switch.displayName = "Switch";

export { Switch }; 