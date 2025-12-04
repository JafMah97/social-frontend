// components/footer/footer.tsx
import Link from "next/link";
import {
  Heart,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import Logo from "../header/logo";
import { getDictionary, Lang } from "@/utils/translation/dictionary-utils";
import { fmt, isRTL } from "@/utils/translation/language-utils";
import { FaFacebook } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";



export default async function Footer({ lang }: { lang: Lang }) {
  const currentYear = new Date().getFullYear();
  const { footer: dict, siteName } = await getDictionary(lang);

  return (
    <footer className="bg-background border-t border-border ">
      <div className="bg-primary/10">
        {/* Main Footer Content */}
        <div className="container mx-auto max-w-7xl px-4 py-12">
          {/* Top Section - 4 Column Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Brand Column */}
            <div className="space-y-4">
              <div className="mb-4">
                <Logo lang={lang} />
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {dict.brand.description}
              </p>
            </div>

            {/* Quick Links */}
            <div className="space-y-4 flex flex-col justify-center items-center">
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {dict.navigation.title}
              </h3>
              <nav className="space-y-3">
                <FooterLink lang={lang} href="/">
                  {dict.navigation.links.home}
                </FooterLink>
                <FooterLink lang={lang} href="/feeds">
                  {dict.navigation.links.feeds}
                </FooterLink>
                <FooterLink lang={lang} href="/about">
                  {dict.navigation.links.about}
                </FooterLink>
                <FooterLink lang={lang} href="/blog">
                  {dict.navigation.links.blog}
                </FooterLink>
                <FooterLink lang={lang} href="/contact">
                  {dict.navigation.links.contact}
                </FooterLink>
              </nav>
            </div>

            {/* Contact Info */}
            <div className="space-y-4 flex flex-col justify-start items-center">
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {dict.contact.title}
              </h3>
              <div className="space-y-3">
                <ContactItem
                  icon={<Mail className="h-4 w-4" />}
                  href="mailto:hello@konekta.com"
                >
                  {dict.contact.email}
                </ContactItem>
                <ContactItem
                  icon={<Phone className="h-4 w-4" />}
                  href="tel:+1234567890"
                >
                  {dict.contact.phone}
                </ContactItem>
                <ContactItem icon={<MapPin className="h-4 w-4" />}>
                  {dict.contact.address}
                </ContactItem>
              </div>
            </div>

            {/* Newsletter & Social */}
            <div className="space-y-6 flex flex-col justify-start items-center">
              <div className="space-y-3 flex flex-col justify-start items-center">
                <h3 className="text-lg font-semibold text-foreground">
                  {dict.newsletter.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {dict.newsletter.subtitle}
                </p>
                <div className="flex gap-2 items-center">
                  <Input
                    type="email"
                    placeholder={dict.newsletter.placeholder}
                    className="bg-background border-border text-sm"
                  />
                  <Button size="sm" className="bg-primary hover:bg-primary/90">
                    {isRTL(lang) ? (
                      <ArrowLeft className="h-4 w-4" />
                    ) : (
                      <ArrowRight className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="space-y-3 flex flex-col justify-start items-center">
                <h3 className="text-lg font-semibold text-foreground">
                  {dict.social.title}
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
                {dict.legal.privacy}
              </Link>
              <Link
                href="/terms"
                className="hover:text-primary transition-colors"
              >
                {dict.legal.terms}
              </Link>
              <Link
                href="/cookies"
                className="hover:text-primary transition-colors"
              >
                {dict.legal.cookies}
              </Link>
            </div>

            {/* Copyright */}
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse" />
                <span>{dict.status}</span>
              </div>

              <div className="hidden md:block text-muted-foreground/50">•</div>
              <div className="flex items-center gap-1">
                <span>{fmt(dict.copyright,{year:currentYear,siteName:siteName})}</span>
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
    icon: <FaSquareXTwitter className="h-4 w-4" />,
    href: "https://twitter.com/konekta",
    label: "Twitter",
  },
  {
    icon: <FaGithub className="h-4 w-4" />,
    href: "https://github.com/konekta",
    label: "GitHub",
  },
  {
    icon: <FaLinkedin className="h-4 w-4" />,
    href: "https://linkedin.com/company/konekta",
    label: "LinkedIn",
  },
  {
    icon: <FaFacebook className="h-4 w-4" />,
    href: "https://facebook.com/konekta",
    label: "Facebook",
  },
];

// Footer Link Component
function FooterLink({
  lang,
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
  lang:Lang
}) {
  return (
    <Link
      href={href}
      className="group flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors duration-200"
    >
      <div className="flex-row flex items-center justify-center gap-1">
        {isRTL(lang) ? (
          <ArrowLeft className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 -translate-x-2 group-hover:translate-x-0" />
        ) : (
          <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 -translate-x-2 group-hover:translate-x-0" />
        )}
        <span className="text-sm font-medium">{children}</span>
      </div>
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
