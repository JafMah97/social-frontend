"use client";

import { useTransition } from "react";
import { usePathname, useRouter } from "next/navigation";

import { Languages } from "lucide-react";
import {
  Select,
  SelectItem,
  SelectContent,
  SelectTrigger,
} from "@/components/ui/select";
import { setCookie } from "@/utils/cookies";

import { LANG_COOKIE } from "@/constants";

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
    <Select value={currentLang} onValueChange={handleChange}>
      <SelectTrigger
        className="h-10 w-fit rounded-full border-border bg-transparent px-4 py-2 text-sm font-light hover:bg-accent/50 transition-all duration-200"
        aria-label="Select language"
      >
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center">
            <Languages className="h-3 w-3 text-primary" />
          </div>
          <span className="hidden md:block text-foreground font-light">
            {currentLang === "ar" ? "العربية" : "English"}
          </span>
        </div>
      </SelectTrigger>
      <SelectContent className="rounded-xl border-border bg-card shadow-lg">
        <SelectItem
          value="en"
          className="h-12 rounded-xl font-light hover:bg-accent/50 focus:bg-accent/50 transition-colors duration-200"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-6 w-6 items-center justify-center">
              <span className="text-xs font-medium text-primary">EN</span>
            </div>
            English
          </div>
        </SelectItem>
        <SelectItem
          value="ar"
          className="h-12 rounded-xl font-light hover:bg-accent/50 focus:bg-accent/50 transition-colors duration-200"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-6 w-6 items-center justify-center ">
              <span className="text-xs font-medium text-primary">AR</span>
            </div>
            العربية
          </div>
        </SelectItem>
      </SelectContent>
    </Select>
  );
}

export default LanguageSwitcher;
