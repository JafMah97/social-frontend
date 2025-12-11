"use client";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/providers/translation-provider";
import { Lang } from "@/utils/translation/dictionary-utils";
import { isRTL } from "@/utils/translation/language-utils";

import { Edit, HelpCircle, Settings } from "lucide-react";
import Link from "next/link";
import CustomAvatar from "../custom/custom-avatar";
import { useCurrentLoggedUser } from "@/hooks/api-hooks/user/useCurrentLoggedUser";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export default function UserMenu({
  lang,
  isMobile = false,
}: {
  lang: Lang;
  isMobile?: boolean;
}) {
  const dict = useTranslation().navBar.userMenu;
  const rtl = isRTL(lang);
  const { data } = useCurrentLoggedUser();
  return (
    <div
      className={`flex ${
        isMobile ? "flex-col gap-4" : "flex-row gap-2"
      } items-center justify-center gap-2`}
    >
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild aria-label="User menu">
          <div className="flex flex-row gap-2">
            <CustomAvatar
              className="w-10 h-10"
              src={data?.data.profileImage}
              fallback={data?.data.username.slice(0, 2)}
            />
          </div>
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
