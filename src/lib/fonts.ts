import { Cairo, Roboto } from "next/font/google";

export const enFont = Roboto({
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-en",
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

export const arFont = Cairo({
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["arabic"],
  variable: "--font-ar",
  display: "swap",
});
