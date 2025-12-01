"use client";

import { useTransition } from "react";
import { usePathname, useRouter } from "next/navigation";

import { Languages } from "lucide-react";
import { setCookie } from "@/utils/cookies";
import { LANG_COOKIE } from "@/constants";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

export function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const [, startTransition] = useTransition();

  const currentLang = pathname?.split("/")[1] || "en";

  function handleChange(lang: string) {
    if (lang === currentLang) return;
    setCookie(LANG_COOKIE, lang);

    const newPath = pathname.replace(`/${currentLang}`, `/${lang}`);
    startTransition(() => {
      router.push(newPath);
    });
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Select language"
          className="bg-background shadow-2xl shadow-foreground"
        >
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center">
              <Languages className="h-4 w-4 text-primary" strokeWidth={2} />
            </div>
            <span className="sr-only">Select language</span>
          </div>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="bg-background text-foreground border border-border rounded-lg"
      >
        <DropdownMenuItem
          className={`flex items-center gap-3 ${
            currentLang === "en"
              ? "text-primary bg-primary/10"
              : "hover:bg-muted hover:text-muted-foreground"
          }`}
          onClick={() => handleChange("en")}
        >
          <div className="flex h-6 w-6 items-center justify-center">
            <span className="text-xs font-medium text-primary">EN</span>
          </div>
          English
        </DropdownMenuItem>

        <DropdownMenuItem
          className={`flex items-center gap-3 ${
            currentLang === "ar"
              ? "text-primary bg-primary/10"
              : "hover:bg-muted hover:text-muted-foreground"
          }`}
          onClick={() => handleChange("ar")}
        >
          <div className="flex h-6 w-6 items-center justify-center">
            <span className="text-xs font-medium text-primary">AR</span>
          </div>
          العربية
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default LanguageSwitcher;
