import type { Metadata } from "next";
import "@/styles/globals.css";
import { enFont, arFont } from "@/lib/fonts";
import { ThemeProvider } from "@/providers/theme-provider";
import Navbar from "@/components/layout/navbar/navbar";
import Footer from "@/components/layout/footer/footer";
import { TranslationsProvider } from "@/providers/translation-provider";
import {
  getDictionary,
  i18n,
  Lang,
} from "@/utils/translation/dictionary-utils";
import { getDirection } from "@/utils/translation/language-utils";

export const metadata: Metadata = {
  title: "Konekta Social",
  description: "Konekta Social App",
};

interface RootLayoutProps {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}

export async function generateStaticParams() {
  return i18n.langs.map((lang: Lang) => ({ lang }));
}

export default async function RootLayout({
  params,
  children,
}: RootLayoutProps) {
  const { lang } = (await params) as { lang: Lang };
  const translations = await getDictionary(lang);
  const fontClass = lang == "ar" ? arFont.className : enFont.className;

  return (
    <html lang={lang} dir={getDirection(lang)} suppressHydrationWarning>
      <TranslationsProvider translations={translations}>
      <body
        className={`${fontClass} home-image`}
        style={{
          overflow: "initial !important",
          margin: "0px !important",
        }}
      >
          <ThemeProvider
            attribute={"class"}
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Navbar />
            {children}
            <Footer />
          </ThemeProvider>
      </body>
        </TranslationsProvider>
    </html>
  );
}
