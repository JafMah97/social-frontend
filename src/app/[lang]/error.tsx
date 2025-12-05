// app/error.tsx
"use client";
import { Button } from "@/components/ui/button";
import { AlertCircle, Home, RefreshCw } from "lucide-react";
import Link from "next/link";
import { useTranslation } from "@/providers/translation-provider";
import { fmt } from "@/utils/translation/language-utils";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
const { siteName, errorPage: dict } = useTranslation();

  return (
    <div className="custom-height flex items-center justify-center bg-linear-to-br from-background via-background to-primary/5 p-2">
      <div className="container max-w-4xl mx-auto">
        <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-2 md:p-4 mt-4 shadow-2xl shadow-primary/5 relative">
          {/* Error Icon */}
          <div className="flex justify-center mb-4">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full animate-pulse" />
              <div className="relative bg-linear-to-br from-primary to-primary/70 p-3 rounded-full">
                <AlertCircle className="h-16 w-16 text-primary-foreground" />
              </div>
            </div>
          </div>

          {/* Error Message */}
          <div className="text-center space-y-6 mb-6">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              {dict.title}
            </h1>

            <div className="inline-flex items-center gap-2 px-4 py-2 bg-destructive/10 text-destructive rounded-lg">
              <AlertCircle className="h-4 w-4" />
              <span className="text-sm font-medium">
                {dict.errorLabel}: {error.message || dict.unknownError}
              </span>
            </div>

            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {dict.subtitle}
            </p>

            {error.digest && (
              <div className="inline-block px-4 py-2 bg-muted rounded-lg">
                <code className="text-sm text-muted-foreground">
                  {dict.errorId}: {error.digest}
                </code>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-2 justify-center items-center">
            {/* Home */}
            <Button
              variant="default"
              className="px-6 py-2 border-2 transition-all duration-300 hover:scale-105"
            >
              <Link className="flex items-center" href="/">
                <Home className="h-5 w-5 mx-2" />
                {dict.goHome}
              </Link>
            </Button>
            <div className="flex flex-row items-center justify-center gap-4">
              {/* back */}
              <Button
                variant="outline"
                onClick={() => window.history.back()}
                className="cursor-pointer px-6 py-2 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl shadow-primary/25"
              >
                {dict.goBack}
              </Button>
              {/* try again */}
              <Button
                variant={"outline"}
                onClick={reset}
                className="cursor-pointer px-6 py-2 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl shadow-primary/25"
              >
                <RefreshCw className="h-5 w-5 mr-2" />
                {dict.tryAgain}
              </Button>
            </div>
          </div>

          {/* Contact Support */}
          <div className="mt-4 border-t border-border/40 text-center">
            <p className="text-muted-foreground mt-4">{dict.supportPrompt}</p>
            <Button
              asChild
              variant="ghost"
              className="text-primary hover:text-primary/80 hover:bg-primary/10"
            >
              <Link href="/contact">{dict.contactSupport}</Link>
            </Button>
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-0 left-0 w-32 h-32 bg-primary/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-2xl" />
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-primary/5 rounded-full translate-x-1/2 translate-y-1/2 blur-2xl" />
        </div>

        {/* Footer Note */}
        <div className="mt-4 text-center text-sm text-muted-foreground">
          <p>
            {fmt(dict.footerNote, {
              year: new Date().getFullYear().toString(),
              siteName: siteName,
            })}
          </p>

          <div className="mt-2 flex items-center justify-center gap-2">
            <span className="flex items-center gap-2">
              <div className="h-2 w-2 bg-red-500 rounded-full animate-pulse" />
              {dict.systemStatus}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
