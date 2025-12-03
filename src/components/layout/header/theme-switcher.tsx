"use client";

import { useMemo } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTranslation } from "@/providers/translation-provider";
import { Lang } from "@/utils/translation/dictionary-utils";
import { isRTL } from "@/utils/translation/language-utils";

const FALLBACK_DICT = {
  name: "Theme",
  light: "Light",
  dark: "Dark",
  system: "System",
};

export function ThemeSwitcher({ lang }: { lang: Lang }) {
  const { setTheme } = useTheme();
  const raw = useTranslation?.()?.navBar?.switchers?.themeSwitchers;
  const dict = useMemo(() => ({ ...FALLBACK_DICT, ...(raw ?? {}) }), [raw]);

  const rtl = isRTL(lang);

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="bg-primary/10 shadow-2xl shadow-foreground cursor-pointer relative"
          aria-label={dict.name}
        >
          <Sun
            strokeWidth={2}
            className="h-5 w-5 transition-transform motion-reduce:transition-none motion-reduce:transform-none dark:scale-0 dark:-rotate-90 text-primary"
            aria-hidden
          />
          <Moon
            strokeWidth={2}
            className="absolute inset-0 m-auto h-5 w-5 scale-0 rotate-90 transition-transform motion-reduce:transition-none motion-reduce:transform-none dark:scale-100 dark:rotate-0 text-primary"
            aria-hidden
          />
          <span className="sr-only">{dict.name}</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align={rtl ? "start" : "end"}
        className="bg-background text-foreground border border-border shadow-md min-w-25"
      >
        <DropdownMenuItem
          dir={rtl ? "rtl" : "ltr"}
          className="hover:bg-muted hover:text-muted-foreground cursor-pointer"
          onClick={() => setTheme("light")}
          role="menuitem"
        >
          {dict.light}
        </DropdownMenuItem>

        <DropdownMenuItem
          dir={rtl ? "rtl" : "ltr"}
          className="hover:bg-muted hover:text-muted-foreground cursor-pointer"
          onClick={() => setTheme("dark")}
          role="menuitem"
        >
          {dict.dark}
        </DropdownMenuItem>

        <DropdownMenuItem
          dir={rtl ? "rtl" : "ltr"}
          className="hover:bg-muted hover:text-muted-foreground cursor-pointer"
          onClick={() => setTheme("system")}
          role="menuitem"
        >
          {dict.system}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
