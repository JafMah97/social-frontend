// components/footer/footer.tsx
import Link from "next/link";
import {
  Heart,
  Mail,
  MapPin,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import Logo from "../header/logo";
import { getDictionary, Lang } from "@/utils/translation/dictionary-utils";
import { fmt } from "@/utils/translation/language-utils";
import { FaFacebook } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import Wave from "../website/home/svgs/wave";
import FooterLink from "./footer-link";
import ContactItem from "./contact-item";
import SocialLink from "./social-link";

export default async function Footer({ lang }: { lang: Lang }) {
  const currentYear = new Date().getFullYear();
  const { footer: dict, siteName, logo: dictLogo } = await getDictionary(lang);

  return (
    <footer className="bg-background ">
      <div className="relative w-full overflow-hidden leading-none bg-primary/10">
        <Wave up className="w-full h-auto " />
      </div>
      <div className="bg-primary/10">
        {/* Main Footer Content */}
        <div className="container mx-auto max-w-7xl px-4 py-12">
          {/* Top Section - 4 Column Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Brand Column */}
            <div className="space-y-4 flex flex-col justify-center lg:justify-start lg:items-start items-center">
              <div className="mb-4">
                <Logo dict={dictLogo} lang={lang} />
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed text-center lg:text-start">
                {dict.brand.description}
              </p>
            </div>

            {/* Quick Links */}
            <div className="space-y-4 flex flex-col  lg:justify-start justify-center lg:items-start items-center">
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {dict.navigation.title}
              </h3>
              <nav className="space-y-3 w-full lg:w-fit flex justify-center items-center lg:flex-col gap-4">
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
            <div className="space-y-4 flex justify-center items-center flex-col lg:justify-start lg:items-start">
              <h3 className="text-lg font-semibold text-foreground mb-2 ">
                {dict.contact.title}
              </h3>
              <div className="space-y-3 flex justify-center items-center lg:items-start flex-col">
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

            {/*  Social */}
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




