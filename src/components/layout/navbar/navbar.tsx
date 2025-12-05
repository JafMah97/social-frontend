import DesktopNavbar from "./desktop-navbar";
import MobileNavbar from "./mobile-navbar";
import Logo from "../header/logo";
import { isRTL } from "@/utils/translation/language-utils";
import { getDictionary, Lang } from "@/utils/translation/dictionary-utils";

export default async function Navbar({ lang }: { lang: Lang }) {
  const dict = (await getDictionary(lang)).logo;
  return (
    <nav
      dir={isRTL(lang) === true ? "rtl" : "ltr"}
      className="z-50 sticky w-full h-16 bg-background top-0 shadow-2xl"
    >
      <div className="bg-primary/10 h-full">
        <div className="container mx-auto max-w-7xl px-4 h-full">
          <div className="flex items-center justify-between h-full relative">
            <Logo dict={dict} lang={lang} />
            <DesktopNavbar lang={lang} />
            <MobileNavbar lang={lang} />
          </div>
        </div>
      </div>
    </nav>
  );
}
