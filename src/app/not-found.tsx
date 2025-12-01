import Link from "next/link";
import { Button } from "@/components/ui/button";

import { ArrowLeft, Home } from "lucide-react";
import { getCurrentLang } from "@/utils/translation/language-utils";
import { getDictionary, type Lang } from "@/utils/translation/dictionary-utils";
import { arFont, enFont } from "@/lib/fonts";
import { ThemeProvider } from "@/providers/theme-provider";

export default async function NotFoundPage() {
  const lang = (await getCurrentLang()) as Lang;
  const { notFoundPage: dict } = await getDictionary(lang);

  return (
    <html
      lang="en"
      className={`${enFont.variable} ${arFont.variable}`}
      suppressHydrationWarning
      style={{ scrollbarGutter: "unset !important" }}
    >
      <body className="h-screen w-full">
        <ThemeProvider
          attribute={"class"}
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex flex-col bg-background w-full h-full justify-center items-center">
            {/* Main Content */}
            <main className="flex-1 flex flex-col items-center justify-center p-4">
              <div className="max-w-2xl w-full mx-auto text-center space-y-8">
                {/* 404 Display */}
                <div className="space-y-2">
                  <div className="flex justify-center items-center gap-2">
                    <span className="text-8xl md:text-[10rem] font-black text-primary">
                      4
                    </span>
                    <div className="relative">
                      <span className="text-8xl md:text-[10rem] font-black text-muted-foreground">
                        0
                      </span>
                    </div>
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
                  <Button
                    asChild
                    size="lg"
                    className="bg-primary hover:bg-primary/90"
                  >
                    <Link href={`/${lang}`} className="flex items-center gap-2">
                      <Home className="h-5 w-5" />
                      {dict.goHome || "Go Home"}
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-2 hover:bg-accent"
                  >
                    <ArrowLeft className="h-5 w-5 mr-2" />
                    {dict.goback || "Go Back"}
                  </Button>
                </div>
              </div>
            </main>

            {/* Simple Footer */}
            <footer className="p-4 border-t border-border text-center text-sm text-muted-foreground">
              <p>© {new Date().getFullYear()}{dict.footer}</p>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
