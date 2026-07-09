// Configuración central de i18n.
// Variante A: prefijo de idioma en TODAS las rutas (/pt, /es, /en).
// Portugués es el idioma por defecto. Los slugs se mantienen en portugués
// para los tres idiomas (decisión de Fase 1 del plan).

export const locales = ["pt", "es", "en"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "pt";

// Valor del atributo <html lang>. Portugués conserva "pt-BR" para quedar
// EXACTAMENTE igual que antes de la i18n.
export const htmlLang: Record<Locale, string> = {
  pt: "pt-BR",
  es: "es",
  en: "en",
};

// ¿El string recibido es un locale soportado?
export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

// Prefija una ruta interna con el locale.
// localePath("pt", "/")          => "/pt"
// localePath("pt", "/quartos")   => "/pt/quartos"
// localePath("es", "/blog/x")    => "/es/blog/x"
export function localePath(lang: Locale | string, path: string): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  return clean === "/" ? `/${lang}` : `/${lang}${clean}`;
}
