import type { Metadata } from "next";
import "@/styles/globals.css";
import { enFont, arFont } from "@/lib/fonts";
import { ThemeProvider } from "@/providers/theme-provider";
import Navbar from "@/components/layout/navbar/navbar";
import Footer from "@/components/layout/footer/footer";
import { TranslationsProvider } from "@/providers/translation-provider";
import { getDictionary, i18n, Lang } from "@/utils/translation/dictionary-utils";

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

export default async function RootLayout({ params, children }: RootLayoutProps) {
  const { lang } = (await params) as { lang: Lang };
  const translations = await getDictionary(lang);

  return (
    <html
      lang="en"
      className={`${enFont.variable} ${arFont.variable}`}
      suppressHydrationWarning
    >
      <body className=" home-image min-h-screen w-full">
        <TranslationsProvider translations={translations}>
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
        </TranslationsProvider>
      </body>
    </html>
  );
}
