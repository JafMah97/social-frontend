import { cn } from "@/lib/utils";
import React from "react";

interface OverlayDivProps extends React.ComponentProps<"div"> {
  children?: React.ReactNode;
  /** Tailwind class for overlay rounding, e.g. "rounded-lg", "rounded-none" */
  rounded?: string;
}

export function OverlayDiv({
  className,
  children,
  rounded = "rounded-lg", // default
  ...props
}: OverlayDivProps) {
  return (
    <div
      className={cn(
        "relative bg-background/10 overflow-hidden z-10",
        rounded,
        // overlay pseudo-element
        "before:absolute before:inset-0 before:bg-primary/10 before:z-0 before:pointer-events-none",
        `before:${rounded}`,
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
