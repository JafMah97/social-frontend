import Link from "next/link";

export default function SocialLink({
  icon,
  href,
  label,
}: {
  icon: React.ReactNode;
  href: string;
  label: string;
}) {
  return (
    <Link
      href={href}
      aria-label={label}
      className="p-2 rounded-lg bg-muted/50 hover:bg-primary/10 hover:text-primary transition-all duration-300 hover:scale-110"
    >
      {icon}
    </Link>
  );
}
