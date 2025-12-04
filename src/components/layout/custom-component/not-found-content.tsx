"use client"

import { Button } from "@/components/ui/button";
import { useTranslation } from "@/providers/translation-provider";
import { Lang } from "@/utils/translation/dictionary-utils";
import { ArrowLeft, Home } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NotFoundContent({ lang }: { lang: Lang }) {
  const dict = useTranslation().notFoundPage
  const router = useRouter();

  return (
    <div className="flex flex-col bg-background w-full h-full justify-center items-center">
      <main className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="max-w-2xl w-full mx-auto text-center space-y-8">
          {/* 404 Display */}
          <div className="space-y-2">
            <div className="flex justify-center items-center gap-2">
              <span className="text-8xl md:text-[10rem] font-black text-primary">
                4
              </span>
              <span className="text-8xl md:text-[10rem] font-black text-muted-foreground">
                0
              </span>
              <span className="text-8xl md:text-[10rem] font-black text-primary">
                4
              </span>
            </div>
            <div className="h-1 w-32 mx-auto bg-background rounded-full" />
          </div>

          {/* Message */}
          <div className="space-y-4">
            <h1 className="text-3xl font-bold text-foreground">
              {dict.title || "Page Not Found"}
            </h1>
            <p className="text-muted-foreground text-lg">
              {dict.description ||
                "The page you're looking for doesn't exist or has been moved."}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href={`/${lang}`} className="flex items-center gap-2">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 px-5 cursor-pointer w-full"
            >
                <Home className="h-5 w-5" />
                {dict.goHome || "Go Home"}
            </Button>
              </Link>
            <Button
              variant="outline"
              size="lg"
              className="border-2 hover:bg-accent cursor-pointer "
              onClick={() => router.back()}
            >
              <span className="flex items-center gap-2 ">
                <ArrowLeft className="h-5 w-5" />
                {dict.goback || "Go Back"}
              </span>
            </Button>
          </div>
        </div>
      </main>

      {/* Simple Footer */}
      <footer className="p-4 border-t border-border text-center text-sm text-muted-foreground">
        <p>
          © {new Date().getFullYear()} {dict.footer}
        </p>
      </footer>
    </div>
  );
}
