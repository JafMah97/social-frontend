"use client"
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/providers/translation-provider";
import { Lang } from "@/utils/translation/dictionary-utils";
import Link from "next/link";

export default function AuthButtons({lang,isMobile=false}:{lang:Lang,isMobile?:boolean}) {
  const dict =  useTranslation().navBar.authButtons
  return (
    <div className="flex flex-row gap-4 mx-4">
      <Link href={`/${lang}/auth/login`} className="h-full flex items-center">
        <Button
          variant="ghost"
          className={`h-9 px-4 cursor-pointer text-foreground/80 hover:text-foreground font-medium transition-all duration-200 hover:bg-accent rounded-lg bg-primary/10 ${
            isMobile ? "w-full" : ""
          }`}
          aria-label="Login"
        >
          <span className="text-sm font-medium">{dict.login}</span>
        </Button>
      </Link>

      <Link
        href={`/${lang}/auth/register`}
        className="h-full flex items-center"
      >
        <Button
          className={`h-9 px-4 cursor-pointer bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-all duration-200 shadow-sm rounded-lg ${
            isMobile ? "w-full" : ""
          }`}
          aria-label="Register"
        >
          <span className="text-sm font-medium">{dict.register}</span>
        </Button>
      </Link>
    </div>
  );
}

