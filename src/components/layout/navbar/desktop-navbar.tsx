import Link from "next/link";
import LanguageSwitcher from "../header/language-switcher";
import { ThemeSwitcher } from "../header/theme-switcher";
import { Button } from "@/components/ui/button";
import { Contact, FileQuestion, HomeIcon, PackageIcon } from "lucide-react";
import { getDictionary, Lang } from "@/utils/translation/dictionary-utils";
import { JSX } from "react";

export default async function DesktopNavbar({lang}:{lang:Lang}) {
  const dict =await getDictionary(lang)

  const navItems = [
    {
      href: `/${lang}/`,
      label: "Home",
      icon: <HomeIcon className="w-4 h-4" strokeWidth={1} />,
    },
    {
      href: `/${lang}/feeds`,
      label: "Feeds",
      icon: <PackageIcon className="w-4 h-4" strokeWidth={1} />,
    },
    {
      href: `/${lang}/about`,
      label: "About",
      icon: <FileQuestion className="w-4 h-4" strokeWidth={1} />,
    },
    {
      href: `/${lang}/contact`,
      label: "Contact",
      icon: <Contact className="w-4 h-4" strokeWidth={1} />,
    },
  ];

  return (
    <div className="hidden sm:flex items-center w-full px-3 sm:px-4 md:px-6 h-16">
      <div className="mx-auto w-full max-w-7xl flex items-center justify-between h-full">
        {/* LEFT: Navigation */}
        <nav className="flex items-center h-full w-full">
          <div className="flex items-center justify-around w-full bg-background/50 rounded-2xl px-2 py-1 border border-border/30">
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
        <div className="flex items-center gap-1 pl-3 border-l border-border/30 h-full">
          <div className="p-2 rounded-lg transition-all duration-200 hover:bg-accent">
            <ThemeSwitcher lang={lang}/>
          </div>

          <div className="p-2 rounded-lg transition-all duration-200 hover:bg-accent">
            <LanguageSwitcher />
          </div>
        </div>

        {/* Auth actions */}
        <div className="flex items-center gap-3 h-full">
          <div className="hidden sm:flex items-center gap-2 h-full">
            <Link href={`/${lang}/login`} className="h-full flex items-center">
              <Button
                variant="ghost"
                className="h-9 px-4 text-foreground/80 hover:text-foreground font-medium transition-all duration-200 hover:bg-accent rounded-lg"
                aria-label="Login"
              >
                <span className="text-sm font-medium">Login</span>
              </Button>
            </Link>

            <Link
              href={`/${lang}/register`}
              className="h-full flex items-center"
            >
              <Button
                className="h-9 px-4 bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-all duration-200 shadow-sm rounded-lg"
                aria-label="Register"
              >
                <span className="text-sm font-medium">Register</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function NavLink({
  href,
  label,
  icon,
}: {
  href: string;
  label: string;
  icon: JSX.Element;
}) {
  return (
    <Link
      href={href}
      className="relative px-4 py-2 rounded-lg transition-all duration-300 font-medium text-sm text-foreground/70 hover:text-foreground hover:bg-accent"
    >
      <div className="flex items-center gap-2">
        {icon}
        <span>{label}</span>
      </div>
    </Link>
  );
}
