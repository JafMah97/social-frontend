import type { Metadata } from "next";
import "@/styles/globals.css";
import { enFont, arFont } from "@/lib/fonts";
import { ThemeProvider } from "@/providers/theme-provider";

export const metadata: Metadata = {
  title: "Konekta Social",
  description: "Konekta Social App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${enFont.variable} ${arFont.variable}`} suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider
        attribute={"class"}
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
        >
        {children}
        </ThemeProvider>
        </body>
    </html>
  );
}
