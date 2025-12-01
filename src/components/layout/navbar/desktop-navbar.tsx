// components/header/desktop-navbar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import LanguageSwitcher from "../header/language-switcher";
import { ThemeSwitcher } from "../header/theme-switcher";
import { Button } from "@/components/ui/button";

export default function DesktopNavbar() {
  const pathname = usePathname() || "/";

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/feeds", label: "Feeds" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <div className="hidden sm:flex items-center w-full px-3 sm:px-4 md:px-6 h-16">
      <div className="mx-auto w-full max-w-7xl flex items-center justify-between h-full">
        {/* LEFT: Navigation - Clean text links */}
        <nav className="flex items-center h-full">
          <div className="flex items-center gap-1 bg-background/50 rounded-2xl px-2 py-1 border border-border/30">
            {navItems.map((item, index) => (
              <NavLink
                key={item.href}
                href={item.href}
                label={item.label}
                isActive={isActive(item.href)}
                index={index}
              />
            ))}
          </div>
        </nav>

        {/* RIGHT: Actions - Perfectly aligned */}
        <div className="flex items-center gap-3 h-full">
          {/* Auth actions */}
          <div className="hidden sm:flex items-center gap-2 h-full">
            <Link href="/login" className="h-full flex items-center">
              <Button
                variant="ghost"
                className="h-9 px-4 cursor-pointer text-foreground/80 hover:text-foreground font-medium transition-all duration-200 hover:bg-accent rounded-lg"
                aria-label="Login"
              >
                <span className="text-sm font-medium">Login</span>
              </Button>
            </Link>

            <Link href="/register" className="h-full flex items-center">
              <Button
                className="h-9 px-4 cursor-pointer bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-all duration-200 shadow-sm hover:shadow rounded-lg"
                aria-label="Register"
              >
                <span className="text-sm font-medium">Register</span>
              </Button>
            </Link>
          </div>

          {/* Theme + Language - Clean and aligned */}
          <div className="flex items-center gap-1 pl-3 border-l border-border/30 h-full">
            <div className="flex items-center h-full">
              <div className="p-2 rounded-lg transition-all duration-200 hover:bg-accent">
                <ThemeSwitcher />
              </div>
            </div>

            <div className="flex items-center h-full">
              <div className="p-2 rounded-lg transition-all duration-200 hover:bg-accent">
                <LanguageSwitcher />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Beautiful text-only NavLink
function NavLink({
  href,
  label,
  isActive,
}: {
  href: string;
  label: string;
  isActive: boolean;
  index: number;
}) {
  return (
    <Link
      href={href}
      className={`relative px-4 py-2 rounded-lg transition-all duration-300 font-medium text-sm ${
        isActive
          ? "text-primary bg-primary/10 shadow-sm"
          : "text-foreground/70 hover:text-foreground hover:bg-accent"
      }`}
    >
      {label}

      {/* Elegant active indicator */}
      {isActive && (
        <div className="absolute bottom-1 left-1/2 w-4 h-0.5 bg-primary rounded-full -translate-x-1/2" />
      )}
    </Link>
  );
}
