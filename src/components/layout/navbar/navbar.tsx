import DesktopNavbar from "./desktop-navbar";
import MobileNavbar from "./mobile-navbar";
import Logo from "../header/logo";

export default function Navbar() {

  return (
    <nav className="z-50 sticky w-full h-16 bg-background top-0">
      <div className="bg-primary/10 h-full">

      <div className="container mx-auto max-w-7xl px-4 h-full">
        <div className="flex items-center justify-between h-full relative">
          <Logo />
          <DesktopNavbar />
          <MobileNavbar />
        </div>
      </div>
      </div>

    </nav>
  );
}
