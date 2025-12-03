"use client";

import { useTransition } from "react";
import { usePathname } from "next/navigation";

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
import { useTranslation } from "@/providers/translation-provider";
import { isRTL } from "@/utils/translation/language-utils";
import { Lang } from "@/utils/translation/dictionary-utils";

export function LanguageSwitcher({lang}:{lang:Lang}) {
  const pathname = usePathname();
  const [, startTransition] = useTransition();
  const dict = useTranslation().navBar.switchers.langaugeSitchers

  const currentLang = pathname?.split("/")[1] || "en";

  function handleChange(lang: string) {
    if (lang === currentLang) return;
    setCookie(LANG_COOKIE, lang);

    const newPath = pathname.replace(`/${currentLang}`, `/${lang}`);
    startTransition(() => {
      window.location.href = (newPath)
    });
  }

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Select language"
          className="bg-primary/10 cursor-pointer shadow-2xl shadow-foreground"
        >
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center">
              <Languages className="h-4 w-4 text-primary" strokeWidth={2} />
            </div>
            <span className="sr-only">{dict.name}</span>
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
          <div dir={isRTL(lang)?"rtl":"ltr"} className="flex h-6 w-6 items-center justify-center">
            <span className="text-xs font-medium text-primary">EN</span>
          </div>
          {dict.english}
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
          {dict.arabic}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default LanguageSwitcher;
