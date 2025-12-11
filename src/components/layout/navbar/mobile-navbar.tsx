"use client";
import {
  Menu,
  HomeIcon,
  NewspaperIcon,
  FileQuestion,
  MailIcon,
  XIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";

import { ThemeSwitcher } from "../header/theme-switcher";
import LanguageSwitcher from "../header/language-switcher";
import { Lang } from "@/utils/translation/dictionary-utils";
import NavLink from "./nav-link";
import { isRTL } from "@/utils/translation/language-utils";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../custom/custom-sheet";
import UserMenu from "../header/user-menu";
import AuthButtons from "../header/auth-buttons";
import { useTranslation } from "@/providers/translation-provider";
import { useCurrentLoggedUser } from "@/hooks/api-hooks/user/useCurrentLoggedUser";
import { useState } from "react";

export default function MobileNavbar({ lang }: { lang: Lang }) {
  const { data } = useCurrentLoggedUser();
  const dict = useTranslation().navBar;
  const [isOpend,setIsOpend] = useState(false)

  // ✅ Extracted logic into functions
  const isLogged = () => Boolean(data);

  const getNavItems = () => [
    {
      href: `/${lang}/`,
      label: dict.links.home,
      icon: <HomeIcon className="w-4 h-4" strokeWidth={2} />,
    },
    {
      href: `/${lang}/feeds`,
      label: dict.links.feeds,
      icon: <NewspaperIcon className="w-4 h-4" strokeWidth={2} />,
    },
    {
      href: `/${lang}/about`,
      label: dict.links.about,
      icon: <FileQuestion className="w-4 h-4" strokeWidth={2} />,
    },
    {
      href: `/${lang}/contact`,
      label: dict.links.contact,
      icon: <MailIcon className="w-4 h-4" strokeWidth={2} />,
    },
  ];

  const renderAuthSection = () => {
    if (isLogged()) {
      return (
        <UserMenu
          lang={lang}
          isMobile={true}
          onAction={() => setIsOpend(false)}
        />
      );
    }
    return <AuthButtons lang={lang} isMobile onAction={()=>setIsOpend(false)}/>;
  };

  return (
    <div className="md:hidden">
      <Sheet modal={false} open={isOpend} onOpenChange={setIsOpend}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="lg"
            aria-label="Open menu"
            className="text-foreground hover:bg-primary/10 hover:text-primary transition-colors duration-200 cursor-pointer"
            onClick={() => {
              setIsOpend(true);
            }}
          >
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>

        <SheetContent
          dir={isRTL(lang) ? "rtl" : "ltr"}
          side={isRTL(lang) ? "right" : "left"}
          className="p-0 w-80 border-r border-border/40 bg-background/95 backdrop-blur-sm"
        >
          {/* Header */}
          <SheetHeader className="px-6 py-4 border-b border-border/40 relative ">
            <div className="flex flex-row justify-between">
              <div className="flex items-center gap-3">
                <SheetTitle className="text-lg font-semibold text-foreground">
                  {dict.menu}
                </SheetTitle>
                <span className="ml-1 text-xs text-muted-foreground">
                  {dict.quickActions}
                </span>
              </div>
              <SheetClose className="p-2 cursor-pointer hover:bg-primary text-primary rounded-lg hover:text-foreground transition-colors duration-200">
                <XIcon
                  strokeWidth={2}
                  className="h-5 w-5 group-hover:bg-primary/10"
                />
              </SheetClose>
            </div>
          </SheetHeader>

          {/* Switchers */}
          <div className="w-full flex items-start justify-around gap-6 border-b border-border/40 py-4">
            <div className="flex flex-col items-center justify-center gap-2">
              <ThemeSwitcher lang={lang} />
              <span className="text-xs text-muted-foreground">
                {dict.switchers.themeSwitchers.themes}
              </span>
            </div>
            <div className="flex flex-col items-center justify-center gap-2">
              <LanguageSwitcher lang={lang} />
              <span className="text-xs text-muted-foreground">
                {dict.switchers.langaugeSitchers.languages}
              </span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="py-4" aria-label="Mobile navigation">
            <div className="flex flex-col gap-2 px-4">
              {getNavItems().map((item) => (
                <NavLink
                  onAction={() => setIsOpend(false)}
                  key={item.href}
                  href={item.href}
                  label={item.label}
                  icon={item.icon}
                  isMobile={true}
                />
              ))}
            </div>
          </nav>

          {/* Auth/User section */}
          <div className="mt-4 p-4 border-t border-border/40 bg-background/95 flex flex-col items-start gap-4">
            <div className="w-full mt-1 flex flex-col gap-2">
              {renderAuthSection()}
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
