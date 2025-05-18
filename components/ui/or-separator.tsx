"use client";

import * as React from "react";
import * as SeparatorPrimitive from "@radix-ui/react-separator";

import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { useLanguage } from '@/lib/context/language-context';

const OrSeparator = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { t } = useLanguage();
  return (
    <div
      ref={ref}
      className={cn(
        "flex items-center justify-center space-x-4 text-muted-foreground",
        className
      )}
      {...props}
    >
      <Separator className="shrink" />
      <span className="whitespace-nowrap text-sm">{t('auth.orContinueWith') || 'or continue with'}</span>
      <Separator className="shrink" />
    </div>
  );
});
OrSeparator.displayName = SeparatorPrimitive.Root.displayName;

export { OrSeparator };
