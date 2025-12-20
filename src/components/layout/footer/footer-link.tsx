import { Lang } from "@/utils/translation/dictionary-utils";
import Link from "next/link";

export default function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
  lang: Lang;
}) {
  return (
    <Link
      href={href}
      className="group flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors duration-200 m-0"
    >
      <div className="flex-row flex items-center justify-center gap-1">
        <span className="text-sm font-medium">{children}</span>
      </div>
    </Link>
  );
}
