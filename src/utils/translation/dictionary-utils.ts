export const i18n = {
  defaultLang: "en",
  langs: ["en", "ar"] as const,
};

export type Lang = (typeof i18n.langs)[number];

const rawDictionaries = {
  en: () => import("@/dictionaries/en.json").then((r) => r.default),
  ar: () => import("@/dictionaries/ar.json").then((r) => r.default),
} as const;

export type Dictionaries = typeof rawDictionaries;

export const dictionaries: Dictionaries = rawDictionaries;

// Type for the complete dictionary structure
export type CompleteDictionary = Awaited<ReturnType<Dictionaries["en"]>>;

// Type for accessing specific sections of the dictionary
export type DictionaryFor<K extends keyof CompleteDictionary> =
  CompleteDictionary[K];

// Function to get the complete dictionary for a language
export async function getDictionary(lang: Lang): Promise<CompleteDictionary> {
  if (!i18n.langs.includes(lang)) {
    lang = i18n.defaultLang as Lang;
  }
  return dictionaries[lang]() as Promise<CompleteDictionary>;
}
