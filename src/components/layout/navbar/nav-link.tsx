"use client";
import Link from "next/link";
import { JSX } from "react";

export default function NavLink({
  href,
  label,
  icon,
  isMobile = false,
  onAction,
}: {
  href: string;
  label: string;
  icon: JSX.Element;
  isMobile?: boolean;
  onAction?: () => void;
}) {
  return (
    <Link
      onClick={onAction}
      href={href}
      className="relative px-4 py-2 rounded-lg transition-all duration-300 font-medium text-sm text-foreground/70 hover:text-foreground hover:bg-accent"
    >
      <div className="flex items-center gap-2 text-primary">
        {icon}
        <span className={`${isMobile ? "block" : "hidden lg:block"}`}>
          {label}
        </span>
      </div>
    </Link>
  );
}
