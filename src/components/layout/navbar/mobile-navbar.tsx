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
import { getDictionary, Lang } from "@/utils/translation/dictionary-utils";
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

export default async function MobileNavbar({ lang }: { lang: Lang }) {
  const dict = (await getDictionary(lang)).navBar;
  const isLogged= true

  const navItems = [
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

  return (
    <div className="md:hidden">
      <Sheet modal={false}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="lg"
            aria-label="Open menu"
            className="text-foreground hover:bg-primary/10 hover:text-primary transition-colors duration-200 cursor-pointer"
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
          {/* Switchers with labels underneath and generous gap */}
          <div className="w-full flex items-start justify-around gap-6 border-b border-border/40 py-4">
            <div className="flex flex-col items-center justify-center gap-2">
              <div>
                <ThemeSwitcher lang={lang} />
              </div>
              <span className="text-xs text-muted-foreground">
                {dict.switchers.themeSwitchers.themes}
              </span>
            </div>

            <div className="flex flex-col items-center justify-center gap-2">
              <div>
                <LanguageSwitcher lang={lang} />
              </div>
              <span className="text-xs text-muted-foreground">
                {dict.switchers.langaugeSitchers.languages}
              </span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="py-4" aria-label="Mobile navigation">
            <div className="flex flex-col gap-2 px-4">
              {navItems.map((item) => (
                <NavLink
                  key={item.href}
                  href={item.href}
                  label={item.label}
                  icon={item.icon}
                  isMobile={true}
                />
              ))}
            </div>
          </nav>

          <div className="mt-4 p-4 border-t border-border/40 bg-background/95 flex flex-col items-start gap-4">
            <div className="w-full mt-1 flex flex-col gap-2">
              {isLogged?(
                <>
                <UserMenu lang={lang} isMobile={true}/>
                </>
            ):(
              <> 
              <AuthButtons lang={lang} isMobile/>
              </>)}
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
