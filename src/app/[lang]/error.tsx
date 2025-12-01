// app/error.tsx
"use client";

import { Button } from "@/components/ui/button";
import { AlertCircle, Home, RefreshCw, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-background via-background to-primary/5 p-2">
      <div className="container max-w-4xl mx-auto">
        <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-5 md:p-8 shadow-2xl shadow-primary/5">
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
              Something went wrong
            </h1>

            <div className="inline-flex items-center gap-2 px-4 py-2 bg-destructive/10 text-destructive rounded-lg">
              <AlertCircle className="h-4 w-4" />
              <span className="text-sm font-medium">
                Error: {error.message || "Unknown error"}
              </span>
            </div>

            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              We apologize for the inconvenience. Our team has been notified and
              is working to fix the issue.
            </p>

            {/* Error Code if available */}
            {error.digest && (
              <div className="inline-block px-4 py-2 bg-muted rounded-lg">
                <code className="text-sm font-mono text-muted-foreground">
                  Error ID: {error.digest}
                </code>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              onClick={reset}
              className="px-6 py-6 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl shadow-primary/25"
            >
              <RefreshCw className="h-5 w-5 mr-2" />
              Try Again
            </Button>

            <Button
              asChild
              variant="outline"
              className="px-6 py-6 border-2 hover:bg-accent hover:border-accent transition-all duration-300 hover:scale-105"
            >
              <Link href="/">
                <Home className="h-5 w-5 mr-2" />
                Go Home
              </Link>
            </Button>

            <Button
              variant="ghost"
              onClick={() => window.history.back()}
              className="px-6 py-6 hover:bg-muted transition-all duration-300 hover:scale-105"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Go Back
            </Button>
          </div>

          {/* Contact Support */}
          <div className="mt-6 pt-8 border-t border-border/40 text-center">
            <p className="text-muted-foreground mb-4">
              Still experiencing issues?
            </p>
            <Button
              asChild
              variant="ghost"
              className="text-primary hover:text-primary/80 hover:bg-primary/10"
            >
              <Link href="/contact">Contact Support →</Link>
            </Button>
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-0 left-0 w-32 h-32 bg-primary/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-2xl" />
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-primary/5 rounded-full translate-x-1/2 translate-y-1/2 blur-2xl" />
        </div>

        {/* Footer Note */}
        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Konekta • Error Page</p>
          <p className="mt-2 flex items-center justify-center gap-2">
            <span className="flex items-center gap-2">
              <div className="h-2 w-2 bg-red-500 rounded-full animate-pulse" />
              System Status: Error Detected
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
