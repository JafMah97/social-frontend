"use client";

import Link from "next/link";
import { Home, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body>
        <div className="flex h-full flex-1 items-center justify-center space-y-2 pb-10">
          <h2>Something went wrong!</h2>
          <p>{error.message}</p>
          <div className="flex justify-center gap-3 text-center">
            <Button
              onClick={reset}
              variant="destructive"
              size="lg"
              className="inline-flex transform items-center gap-2 font-semibold shadow-lg transition-all duration-200 hover:scale-105 hover:shadow-xl"
            >
              <RefreshCw className="h-4 w-4" />
              Try Again
            </Button>

            <Link
              href="/"
              className="border-input bg-background hover:bg-accent hover:text-accent-foreground inline-flex transform items-center gap-2 border px-4 py-2 font-semibold shadow-md transition-all duration-200 hover:scale-105"
            >
              <Home className="h-4 w-4" />
              Go Home
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
}
