import DesktopNavbar from "./desktop-navbar";
import MobileNavbar from "./mobile-navbar";
import Logo from "../header/logo";
import { getCurrentLang, isRTL } from "@/utils/translation/language-utils";
import { Lang } from "@/utils/translation/dictionary-utils";

export default async function Navbar() {
const lang :Lang = await getCurrentLang()
  return (
    <nav dir={isRTL(lang) === true ? "rtl":"ltr"} className="z-50 sticky w-full h-16 bg-background top-0">
      <div className="bg-primary/10 h-full">

      <div className="container mx-auto max-w-7xl px-4 h-full">
        <div className="flex items-center justify-between h-full relative">
          <Logo />
          <DesktopNavbar lang={lang} />
          <MobileNavbar lang={lang} />
        </div>
      </div>
      </div>

    </nav>
  );
}
