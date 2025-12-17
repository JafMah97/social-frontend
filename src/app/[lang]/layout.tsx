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
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "sonner";
import ReactQueryProvider from "@/providers/react-query-provider";

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
      <body className={`${fontClass}`}>
        <TranslationsProvider translations={translations}>
          <ReactQueryProvider>
            <NextTopLoader color="var(--color-primary)" showSpinner={false} />
            <ThemeProvider
              attribute={"class"}
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <Navbar lang={lang} />
              {children}
              <Toaster
                position="top-center"
                toastOptions={{
                  className: `antialiased ${fontClass}`,
                  style: {
                    backgroundColor: "var(--color-background)",
                    color: "var(--color-foreground",
                  },
                }}
              />
              <Footer lang={lang} />
            </ThemeProvider>
          </ReactQueryProvider>
        </TranslationsProvider>
      </body>
    </html>
  );
}
