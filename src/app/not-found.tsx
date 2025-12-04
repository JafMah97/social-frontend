import { getCurrentLang } from "@/utils/translation/language-utils";
import { getDictionary, type Lang } from "@/utils/translation/dictionary-utils";
import { arFont, enFont } from "@/lib/fonts";
import { ThemeProvider } from "@/providers/theme-provider";
import "@/styles/globals.css";
import NotFoundContent from "@/components/layout/custom-component/not-found-content";
import { TranslationsProvider } from "@/providers/translation-provider";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "sonner";

export default async function NotFoundPage() {
  const lang = (await getCurrentLang()) as Lang;
  const translations = await getDictionary(lang);
    const fontClass = lang == "ar" ? arFont.className : enFont.className;


  return (
    <html
      lang={lang}
      className={`${enFont.variable} ${arFont.variable}`}
      suppressHydrationWarning
    >
      <body className={`${fontClass} w-full h-screen`}>
        <TranslationsProvider translations={translations}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <NextTopLoader color="var(--color-primary)" showSpinner={false} />
            <Toaster
              position="top-center"
              toastOptions={{
                style: {
                  fontSize: "0.875rem",
                  textAlign: "start",
                },
                className: `antialiased ${fontClass}`,
              }}
            />
            <NotFoundContent lang={lang} />
          </ThemeProvider>
        </TranslationsProvider>
      </body>
    </html>
  );
}
