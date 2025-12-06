"use client";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/providers/translation-provider";
import { Lang } from "@/utils/translation/dictionary-utils";
import { isRTL } from "@/utils/translation/language-utils";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Edit, HelpCircle, Settings } from "lucide-react";
import Link from "next/link";
import * as React from "react";

export default function UserMenu({
  lang,
  isMobile = false,
}: {
  lang: Lang;
  isMobile?: boolean;
}) {
  const dict = useTranslation().navBar.userMenu;
  const rtl = isRTL(lang);

  return (
    <div
      className={`flex ${
        isMobile ? "flex-col gap-4" : "flex-row gap-2"
      } items-center justify-center gap-2`}
    >
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild aria-label="User menu">
          <CustomAvatar isMobile={isMobile} />
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align={rtl ? "start" : "end"}
          className="bg-background text-foreground border border-border rounded-lg"
        >
          <DropdownMenuItem
            dir={rtl ? "rtl" : "ltr"}
            className="w-34 text-sm h-8 p-2 m-2 rounded-sm outline-0 cursor-pointer hover:bg-primary/20 transition-colors hover:text-foreground flex items-center justify-between"
            asChild
          >
            <Link href={`/${lang}/profile`}>
              <span>{dict.profile}</span>
              <Edit className="w-5 h-5" strokeWidth={1} />
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem
            dir={rtl ? "rtl" : "ltr"}
            className="w-34 text-sm h-8 p-2 m-2 rounded-sm outline-0 cursor-pointer hover:bg-primary/20 transition-colors hover:text-foreground flex items-center justify-between"
            asChild
          >
            <Link href={`/${lang}/settings`}>
              <span>{dict.settings}</span>
              <Settings className="w-5 h-5" strokeWidth={1} />
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem
            dir={rtl ? "rtl" : "ltr"}
            className="w-34 text-sm h-8 p-2 m-2 rounded-sm outline-0 cursor-pointer hover:bg-primary/20 transition-colors hover:text-foreground flex items-center justify-between"
            asChild
          >
            <Link href={`/${lang}/help`}>
              <span>{dict.help}</span>
              <HelpCircle className="w-5 h-5" strokeWidth={1} />
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Button
        className={`h-9 px-4 bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-all duration-200 shadow-sm rounded-lg ${
          isMobile ? "w-full" : ""
        } `}
        aria-label="Logout"
      >
        <span className="text-sm font-medium">{dict.logout}</span>
      </Button>
    </div>
  );
}

// ForwardRef so Radix can treat it asChild
const CustomAvatar = React.forwardRef<HTMLDivElement, { isMobile: boolean }>(
  ({ isMobile, ...props }, ref) => {
    return (
      <div
        ref={ref}
        {...props}
        className="w-full flex flex-row justify-center items-center gap-2"
      >
        <Avatar className="rounded-full w-9 h-9 cursor-pointer">
          <AvatarImage
            className="rounded-full"
            src={"https://github.com/shadcn.png"}
            alt="User avatar"
          />
          <AvatarFallback className="rounded-full text-sm bg-primary/10 w-9 h-9 flex items-center justify-center">
            CN
          </AvatarFallback>
        </Avatar>
        <div
          className={`flex-col justify-center items-start ${
            isMobile ? "flex" : "hidden lg:flex"
          }`}
        >
          <p className="text-sm">Name</p>
          <Link className="text-xs -my-1" href={"#"}>
            @userName
          </Link>
        </div>
      </div>
    );
  }
);

CustomAvatar.displayName = "CustomAvatar";
