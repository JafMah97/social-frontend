"use client";

import { i18n, Lang } from "@/utils/translation/dictionary-utils";
import { useParams } from "next/navigation";

export function useCurrentLang(): Lang {
  const params = useParams();
  const lang = params?.lang as string;

  if (lang && i18n.langs.includes(lang as Lang)) {
    return lang as Lang;
  }

  return i18n.defaultLang as Lang;
}
