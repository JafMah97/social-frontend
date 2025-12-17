// components/footer/footer.tsx
import Link from "next/link";
import {
  Heart,
  Mail,
  MapPin,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
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
  const { footer: dict, siteName, logo: dictLogo } = await getDictionary(lang);

  return (
    <footer className="bg-background ">
      <svg
        className="bg-primary/10"
        id="wave"
        style={{ transform: "rotate(180deg)", transition: "0.3s" }}
        viewBox="0 0 1440 100"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          style={{ transform: "translate(0, 0px)", opacity: "1" }}
          fill="url(#sw-gradient-0)"
          d="M0,70L10,71.7C20,73,40,77,60,71.7C80,67,100,53,120,43.3C140,33,160,27,180,35C200,43,220,67,240,63.3C260,60,280,30,300,25C320,20,340,40,360,51.7C380,63,400,67,420,66.7C440,67,460,63,480,56.7C500,50,520,40,540,31.7C560,23,580,17,600,15C620,13,640,17,660,23.3C680,30,700,40,720,46.7C740,53,760,57,780,50C800,43,820,27,840,16.7C860,7,880,3,900,3.3C920,3,940,7,960,8.3C980,10,1000,10,1020,11.7C1040,13,1060,17,1080,25C1100,33,1120,47,1140,55C1160,63,1180,67,1200,63.3C1220,60,1240,50,1260,51.7C1280,53,1300,67,1320,75C1340,83,1360,87,1380,76.7C1400,67,1420,43,1430,31.7L1440,20L1440,100L1430,100C1420,100,1400,100,1380,100C1360,100,1340,100,1320,100C1300,100,1280,100,1260,100C1240,100,1220,100,1200,100C1180,100,1160,100,1140,100C1120,100,1100,100,1080,100C1060,100,1040,100,1020,100C1000,100,980,100,960,100C940,100,920,100,900,100C880,100,860,100,840,100C820,100,800,100,780,100C760,100,740,100,720,100C700,100,680,100,660,100C640,100,620,100,600,100C580,100,560,100,540,100C520,100,500,100,480,100C460,100,440,100,420,100C400,100,380,100,360,100C340,100,320,100,300,100C280,100,260,100,240,100C220,100,200,100,180,100C160,100,140,100,120,100C100,100,80,100,60,100C40,100,20,100,10,100L0,100Z"
        ></path>
      </svg>
      <div className="bg-primary/10">
        {/* Main Footer Content */}
        <div className="container mx-auto max-w-7xl px-4 py-12">
          {/* Top Section - 4 Column Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Brand Column */}
            <div className="space-y-4">
              <div className="mb-4">
                <Logo dict={dictLogo} lang={lang} />
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
                <FooterLink lang={lang} href="/about">
                  {dict.navigation.links.about}
                </FooterLink>
                <FooterLink lang={lang} href="/contact">
                  {dict.navigation.links.contact}
                </FooterLink>
              </nav>
            </div>

            {/* Contact Info */}
            <div className="space-y-4 flex flex-col justify-start items-start">
              <h3 className="text-lg font-semibold text-foreground mb-2 ">
                {dict.contact.title}
              </h3>
              <div className="space-y-3">
                <ContactItem
                  icon={<Mail className="h-4 w-4" />}
                  href="mailto:hello@konekta.com"
                >
                  {dict.contact.email}
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
                <span>
                  {fmt(dict.copyright, {
                    year: currentYear,
                    siteName: siteName,
                  })}
                </span>
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
  lang: Lang;
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
