import Link from "next/link";

export default function ContactItem({
  icon,
  href,
  children,
}: {
  icon: React.ReactNode;
  href?: string;
  children: React.ReactNode;
}) {
  const content = (
    <div className="flex items-start gap-3 text-muted-foreground group">
      <div className="mt-0.5 text-primary shrink-0">{icon}</div>
      <div className="text-sm leading-relaxed group-hover:text-foreground transition-colors">
        {children}
      </div>
    </div>
  );

  if (href) {
    return (
      <Link
        href={href}
        className="block hover:text-primary transition-colors duration-200"
      >
        {content}
      </Link>
    );
  }
  return content;
}
