"use client";

import { createContext, useContext } from "react";
import type { Locale } from "@/i18n/config";
import { defaultLocale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/getDictionary";

// Contexto de locale para Client Components (Header, y a futuro cualquier
// componente cliente que necesite el idioma sin prop-drilling).
type LocaleContextValue = { lang: Locale; dict: Dictionary };

const LocaleContext = createContext<LocaleContextValue>({
  lang: defaultLocale,
  dict: {} as Dictionary,
});

export function LocaleProvider({
  lang,
  dict,
  children,
}: {
  lang: Locale;
  dict: Dictionary;
  children: React.ReactNode;
}) {
  return (
    <LocaleContext.Provider value={{ lang, dict }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale(): Locale {
  return useContext(LocaleContext).lang;
}

export function useDict(): Dictionary {
  return useContext(LocaleContext).dict;
}
