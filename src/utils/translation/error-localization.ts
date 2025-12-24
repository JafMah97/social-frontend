import { ERROR_CODES, ErrorCode } from "@/constants";
import { getDictionary, i18n, Lang } from "./dictionary-utils";

/**
 * Returns a localized error message for a given error code.
 * Falls back to default language if none provided.
 */
export async function getErrorMessage(
  code: ErrorCode,
  lang?: Lang
): Promise<string> {
  // Ensure we always have a valid language
  const currentLang =
    lang && i18n.langs.includes(lang) ? lang : i18n.defaultLang as Lang

  // Load the dictionary dynamically
  const dict = await getDictionary(currentLang);

  // Look up the error message by code
  return dict.errors?.[code] || dict.errors?.[ERROR_CODES.UNKNOWN];
}
