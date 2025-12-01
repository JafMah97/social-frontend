// app/loading.tsx
'use client'
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import Logo from "@/components/layout/header/logo";
import { useTranslation } from "@/providers/translation-provider";

export default function Loading() {
  const [dots, setDots] = useState(".");
  const dict = useTranslation().loadingPage

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => {
        if (prev === "...") return ".";
        if (prev === "..") return "...";
        return "..";
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background/95 backdrop-blur-sm">
      {/* Centered loader */}
      <div className="flex flex-col items-center gap-6">
        {/* Logo */}
        <Logo/>
        {/* Spinner */}
        <div className="relative">
          <div className="h-20 w-20">
            <div className="absolute inset-0 border-3 border-primary/20 rounded-full"></div>
            <div className="absolute inset-0 border-3 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="h-6 w-6 text-primary animate-spin" />
          </div>
        </div>

        {/* Loading text */}
        <div className="text-center space-y-2">
          <p className="text-lg font-medium text-foreground">{dict.title}{dots}</p>
          <p className="text-sm text-muted-foreground max-w-xs">
            {dict.subtitle}
          </p>
        </div>
      </div>

      {/* Progress indicator at bottom */}
      <div className="absolute bottom-8 left-0 right-0">
        <div className="h-1 bg-linear-to-r from-transparent via-primary to-transparent animate-pulse" />
      </div>
    </div>
  );
}
