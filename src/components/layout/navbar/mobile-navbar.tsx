// components/header/mobile-navbar.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  Home,
  Newspaper,
  Info,
  User,
  UserPlus,
  X,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { CustomSearch } from "../custom-component/custom-search";
import { ThemeSwitcher } from "../header/theme-switcher";
import LanguageSwitcher from "../header/language-switcher";

export default function MobileNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname() || "/";

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  // Defensive removal of injected default close button if present
  useEffect(() => {
    if (!isOpen) return;
    const timer = setTimeout(() => {
      const sheetRoot = document.querySelector(".no-default-close");
      const injectedBtn = sheetRoot
        ?.querySelector("button > svg.lucide-x")
        ?.closest("button");
      if (injectedBtn) injectedBtn.remove();
    }, 50);
    return () => clearTimeout(timer);
  }, [isOpen]);

  return (
    <div className="sm:hidden">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="lg"
            aria-label="Open menu"
            className="text-foreground hover:bg-primary/10 hover:text-primary transition-all duration-200"
          >
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>

        <SheetContent
          side="left"
          className="p-0 w-80 border-r border-border/40 bg-background/95 backdrop-blur-sm no-default-close safe-bottom"
        >
          {/* Header */}
          <SheetHeader className="px-6 py-4 border-b border-border/40 relative">
            <div className="flex items-center gap-3">
              <SheetTitle className="text-lg font-semibold text-foreground">
                Menu
              </SheetTitle>
              <span className="ml-1 text-xs text-muted-foreground">
                Quick actions
              </span>
            </div>

            <SheetClose asChild>
              <Button
                size="icon"
                aria-label="Close menu"
                className="absolute top-3 right-3 text-foreground hover:bg-muted/20"
              >
                <X className="h-4 w-4" />
              </Button>
            </SheetClose>

            {/* Search */}
            <div className="pt-4">
              <label htmlFor="mobile-search" className="sr-only">
                Search
              </label>
              <div className="relative">
                <CustomSearch />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
              </div>
            </div>
          </SheetHeader>

          {/* Navigation */}
          <nav className="py-4" aria-label="Mobile navigation">
            <div className="flex flex-col gap-2 px-4">
              <MobileNavLink
                href="/"
                icon={<Home className="h-5 w-5" />}
                label="Home"
                isActive={isActive("/")}
                onClick={() => setIsOpen(false)}
              />
              <MobileNavLink
                href="/feeds"
                icon={<Newspaper className="h-5 w-5" />}
                label="Feeds"
                isActive={isActive("/feeds")}
                onClick={() => setIsOpen(false)}
              />
              <MobileNavLink
                href="/about"
                icon={<Info className="h-5 w-5" />}
                label="About"
                isActive={isActive("/about")}
                onClick={() => setIsOpen(false)}
              />
            </div>

          </nav>

          {/* Bottom area: simplified, stacked, flex-start */}
          <div className="mt-4 p-4 border-t border-border/40 bg-background/95 flex flex-col items-start gap-4">
            {/* Switchers with labels underneath and generous gap */}
            <div className="w-full flex items-start justify-around gap-6">
              <div className="flex flex-col items-center justify-center gap-2">
                <div className="p-0">
                  <ThemeSwitcher />
                </div>
                <span className="text-xs text-muted-foreground">Theme</span>
              </div>

              <div className="flex flex-col items-center justify-center gap-2">
                <div className="p-0">
                  <LanguageSwitcher />
                </div>
                <span className="text-xs text-muted-foreground">Language</span>
              </div>
            </div>

            {/* Auth buttons: reduced height, balanced spacing */}
            <div className="w-full mt-1 flex flex-col gap-2">
              <Link
                href="/login"
                onClick={() => setIsOpen(false)}
                className="w-full"
              >
                <Button
                  variant="ghost"
                  className="w-full justify-center h-10 rounded-md border border-border text-foreground font-medium hover:bg-muted/50 focus-visible:ring-2 focus-visible:ring-primary/50 text-sm"
                  aria-label="Login"
                >
                  <User className="h-4 w-4 mr-2" />
                  <span>Login</span>
                </Button>
              </Link>

              <Link
                href="/register"
                onClick={() => setIsOpen(false)}
                className="w-full"
              >
                <Button
                  className="w-full justify-center h-10 rounded-md bg-primary text-primary-foreground font-semibold hover:bg-primary/95 focus-visible:ring-2 focus-visible:ring-primary/60 text-sm"
                  aria-label="Register"
                >
                  <UserPlus className="h-4 w-4 mr-2" />
                  <span>Register</span>
                </Button>
              </Link>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

/* MobileNavLink component */
function MobileNavLink({
  href,
  icon,
  label,
  variant = "default",
  isActive = false,
  onClick,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  variant?: "default" | "primary";
  isActive?: boolean;
  onClick: () => void;
}) {
  const base =
    "flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50";
  const variantClasses =
    variant === "primary"
      ? "bg-primary text-primary-foreground font-semibold hover:bg-primary/95 shadow"
      : `text-foreground ${
          isActive
            ? "bg-primary/10 text-primary font-medium border-l-4 border-primary"
            : "hover:bg-muted/50 text-foreground/90"
        }`;

  return (
    <Link
      href={href}
      onClick={onClick}
      className={`${base} ${variantClasses}`}
      aria-current={isActive ? "page" : undefined}
    >
      <div
        className={`flex-shrink-0 transition-transform duration-200 ${
          isActive
            ? "text-primary scale-105"
            : "text-foreground/70 group-hover:text-primary"
        }`}
      >
        {icon}
      </div>

      <span className="font-medium text-base flex-1">{label}</span>

      {isActive && variant === "default" && (
        <div
          className="w-2 h-2 bg-primary rounded-full animate-pulse"
          aria-hidden
        />
      )}
    </Link>
  );
}
