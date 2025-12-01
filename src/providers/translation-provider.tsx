"use client";

import { CompleteDictionary } from "@/utils/translation/dictionary-utils";
import React, { createContext, useContext, ReactNode } from "react";

interface TranslationsContextType {
  translations: CompleteDictionary;
}

const TranslationsContext = createContext<TranslationsContextType | undefined>(
  undefined
);

export const TranslationsProvider = ({
  translations,
  children,
}: {
  translations: CompleteDictionary;
  children: ReactNode;
}) => {
  return (
    <TranslationsContext.Provider value={{ translations }}>
      {children}
    </TranslationsContext.Provider>
  );
};

export function useTranslation(): CompleteDictionary {
  const context = useContext(TranslationsContext);
  if (!context) {
    throw new Error(
      "useTranslation must be used within a TranslationsProvider"
    );
  }
  return context.translations;
}
