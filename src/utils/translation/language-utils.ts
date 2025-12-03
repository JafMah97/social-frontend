import { LANG_COOKIE } from "@/constants/index";
import { Lang } from "./dictionary-utils";

export function getDirection(lang: Lang): "rtl" | "ltr" {
  return lang === "ar" ? "rtl" : "ltr";
}

export function isRTL(lang: Lang): boolean {
  return getDirection(lang) === "rtl";
}

export const getCurrentLang = async (): Promise<Lang> => {
  const { cookies } = await import("next/headers");
  console.log( ((await cookies()).get(LANG_COOKIE)?.value || "en") )
  return ((await cookies()).get(LANG_COOKIE)?.value || "en") as Lang;
};

interface Options {
  [key: string]: string | number | boolean | undefined;
  femaleArabicField?: boolean;
}

export function fmt(message: string, options: Options = {}): string {
  let result = message;
  Object.entries(options).forEach(([key, value]) => {
    if (value !== undefined) {
      result = result.replace(
        new RegExp(`\\{\\{${key}\\}\\}`, "g"),
        String(value)
      );
    }
  });
  return result;
}
