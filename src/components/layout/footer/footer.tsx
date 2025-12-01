// components/footer/footer.tsx
import Link from "next/link";
import {
  Heart,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  Twitter,
  Github,
  Linkedin,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import Logo from "../header/logo";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background border-t border-border">
      <div className="bg-primary/10">

      {/* Main Footer Content */}
      <div className="container mx-auto max-w-7xl px-4 py-12">
        {/* Top Section - 4 Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="mb-4">
              <Logo />
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Building amazing experiences for everyone. Join our community and
              be part of something extraordinary.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Navigation
            </h3>
            <nav className="space-y-3">
              <FooterLink href="/">Home</FooterLink>
              <FooterLink href="/feeds">Feeds</FooterLink>
              <FooterLink href="/about">About Us</FooterLink>
              <FooterLink href="/blog">Blog</FooterLink>
              <FooterLink href="/contact">Contact</FooterLink>
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Contact Us
            </h3>
            <div className="space-y-3">
              <ContactItem
                icon={<Mail className="h-4 w-4" />}
                href="mailto:hello@konekta.com"
              >
                hello@konekta.com
              </ContactItem>
              <ContactItem
                icon={<Phone className="h-4 w-4" />}
                href="tel:+1234567890"
              >
                +1 (234) 567-890
              </ContactItem>
              <ContactItem icon={<MapPin className="h-4 w-4" />}>
                123 Innovation Street
                <br />
                Tech City, TC 12345
              </ContactItem>
            </div>
          </div>

          {/* Newsletter & Social */}
          <div className="space-y-6">
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-foreground">
                Stay Updated
              </h3>
              <p className="text-sm text-muted-foreground">
                Subscribe to our newsletter for the latest updates.
              </p>
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Your email"
                  className="bg-background border-border text-sm"
                />
                <Button size="sm" className="bg-primary hover:bg-primary/90">
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-foreground">
                Follow Us
              </h3>
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <SocialLink
                    key={social.label}
                    icon={social.icon}
                    href={social.href}
                    label={social.label}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Middle Separator */}
        <Separator className="my-8 bg-border" />

        {/* Legal & Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 py-4">
          {/* Legal Links */}
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <Link
              href="/privacy"
              className="hover:text-primary transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="hover:text-primary transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              href="/cookies"
              className="hover:text-primary transition-colors"
            >
              Cookie Policy
            </Link>
          </div>

          {/* Copyright */}
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse" />
              <span>All systems operational</span>
            </div>

            <div className="hidden md:block text-muted-foreground/50">•</div>

            <div className="flex items-center gap-1">
              <span>© {currentYear} Konekta</span>
              <Heart className="h-3 w-3 text-red-500 ml-1" />
            </div>
          </div>
        </div>
      </div>
      </div>
    </footer>
  );
}

// Social Links Data
const socialLinks = [
  {
    icon: <Twitter className="h-4 w-4" />,
    href: "https://twitter.com/konekta",
    label: "Twitter",
  },
  {
    icon: <Github className="h-4 w-4" />,
    href: "https://github.com/konekta",
    label: "GitHub",
  },
  {
    icon: <Linkedin className="h-4 w-4" />,
    href: "https://linkedin.com/company/konekta",
    label: "LinkedIn",
  },
  {
    icon: <ExternalLink className="h-4 w-4" />,
    href: "https://konekta.com",
    label: "Website",
  },
];

// Footer Link Component
function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="group flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors duration-200"
    >
      <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 -translate-x-2 group-hover:translate-x-0" />
      <span className="text-sm font-medium">{children}</span>
    </Link>
  );
}

// Contact Item Component
function ContactItem({
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

// Social Link Component
function SocialLink({
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
