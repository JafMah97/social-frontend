// app/loading.tsx
"use client";

import Logo from "@/components/layout/header/logo";
import { useTranslation } from "@/providers/translation-provider";
import { useCurrentLang } from "../hooks/useCurrentLang";
import { Loader2 } from "lucide-react";

export default function Loading() {
  const { loadingPage: dict, logo: dictLogo } = useTranslation();
  const lang = useCurrentLang();
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm"
      aria-live="polite"
      aria-busy="true"
    >
      <div className="w-full max-w-md px-6">
        <div className="rounded-xl border border-border bg-card/60 shadow-lg">
          <div className="flex flex-col items-center gap-6 p-8">
            {/* Logo */}
            <Logo dict={dictLogo} lang={lang} />

            {/* Spinner */}
            <div className="relative h-16 w-16">
              <div className="absolute inset-0 rounded-full border-4 border-primary/20" />
              <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Loader2
                  aria-hidden
                  className="h-5 w-5 text-primary animate-spin"
                />
              </div>
            </div>

            {/* Text */}
            <div className="text-center space-y-1">
              <p className="text-base font-semibold text-foreground">
                {dict.title}
              </p>
              <p className="text-sm text-muted-foreground">{dict.subtitle}</p>
            </div>

            {/* Subtle skeleton lines */}
            <div className="w-full space-y-2">
              <div className="h-2 rounded bg-muted animate-pulse" />
              <div className="h-2 w-5/6 rounded bg-muted animate-pulse" />
            </div>
          </div>

          {/* Bottom gradient progress bar */}
          <div className="h-1 w-full overflow-hidden rounded-b-xl">
            <div className="h-full w-1/2 animate-[progress_1.8s_ease_infinite] bg-linear-to-r from-transparent via-primary to-transparent" />
          </div>
        </div>
      </div>

      {/* Keyframes for progress */}
      <style jsx>{`
        @keyframes progress {
          0% {
            transform: translateX(-100%);
          }
          50% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  );
}
