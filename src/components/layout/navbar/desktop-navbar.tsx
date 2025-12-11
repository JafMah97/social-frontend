import LanguageSwitcher from "../header/language-switcher";
import { ThemeSwitcher } from "../header/theme-switcher";
import { FileQuestion, HomeIcon, MailIcon, NewspaperIcon } from "lucide-react";
import { getDictionary, Lang } from "@/utils/translation/dictionary-utils";
import NavLink from "./nav-link";
import AuthNavSection from "./auth-section";

export default async function DesktopNavbar({lang}:{lang:Lang}) {
  const dict =(await getDictionary(lang)).navBar


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
      icon: <MailIcon className="w-4 h-4" strokeWidth={2 } />,
    },
  ];

  return (
    <div className="hidden md:flex items-center w-full px-3 sm:px-4 md:px-5 h-16">
      <div className="mx-auto w-full max-w-7xl flex items-center justify-between h-full">
        {/* LEFT: Navigation */}
        <nav className="md:flex hidden items-center h-full w-full">
          <div className="flex items-center justify-around w-full bg-background rounded-2xl px-2 py-1 border border-border/30">
            {navItems.map((item) => (
              <NavLink
                key={item.href}
                href={item.href}
                label={item.label}
                icon={item.icon}
              />
            ))}
          </div>
        </nav>

        {/* Theme + Language */}
        <div className="flex items-center gap-1 border-l border-border/30 h-full mr-3">
          <div className="p-2 rounded-lg transition-all duration-200 hover:bg-accent">
            <ThemeSwitcher lang={lang} />
          </div>

          <div className="p-2 rounded-lg transition-all duration-200 hover:bg-accent">
            <LanguageSwitcher lang={lang} />
          </div>
        </div>

        {/* Auth actions */}
      <AuthNavSection lang={lang} />
      </div>
    </div>
  );
}
