import type { Metadata } from "next";
import { locales, defaultLocale, localePath } from "./config";

// URL base del sitio (para metadataBase, canonical, hreflang y sitemap).
// Configurable por entorno; por defecto el dominio de la pousada.
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.pousadacataratas.com.br"
).replace(/\/$/, "");

export const siteName = "Pousada Cataratas";

// Imagen social por defecto (fachada de la pousada) para Open Graph / Twitter
// cuando la página no aporta una propia.
export const defaultOgImage =
  "/images/real/home/pousada-cataratas-foz-do-iguacu-fachada.webp";

// Formato de og:locale (idioma_TERRITORIO) por cada locale.
const OG_LOCALE: Record<string, string> = {
  pt: "pt_BR",
  es: "es_ES",
  en: "en_US",
};

// Construye alternates.languages (hreflang) + x-default para una ruta SIN
// prefijo de idioma. Los slugs son iguales en los tres idiomas (Fase 1),
// así que solo cambia el prefijo /pt · /es · /en.
export function languageAlternates(path: string): Record<string, string> {
  const languages: Record<string, string> = {};
  for (const l of locales) languages[l] = localePath(l, path);
  languages["x-default"] = localePath(defaultLocale, path);
  return languages;
}

// Metadata localizada por página: título, descripción, canonical del locale
// actual, hreflang (pt/es/en + x-default), Open Graph (con imagen y locale) y
// Twitter Card (summary_large_image).
export function pageMeta(opts: {
  lang: string;
  path: string; // ruta sin prefijo de idioma, p.ej. "/quartos" o "/"
  title: string;
  description: string;
  image?: string; // ruta del sitio (se absolutiza con metadataBase)
  type?: "website" | "article";
  article?: { publishedTime?: string; authors?: string[] };
}): Metadata {
  const {
    lang,
    path,
    title,
    description,
    image = defaultOgImage,
    type = "website",
    article,
  } = opts;
  const canonical = localePath(lang, path);
  const locale = OG_LOCALE[lang] ?? OG_LOCALE.pt;
  const alternateLocale = locales
    .filter((l) => l !== lang)
    .map((l) => OG_LOCALE[l]);
  const images = [{ url: image, alt: title }];

  const openGraph: Metadata["openGraph"] =
    type === "article"
      ? {
          title,
          description,
          url: canonical,
          siteName,
          type: "article",
          locale,
          alternateLocale,
          images,
          publishedTime: article?.publishedTime,
          authors: article?.authors,
        }
      : {
          title,
          description,
          url: canonical,
          siteName,
          type: "website",
          locale,
          alternateLocale,
          images,
        };

  return {
    metadataBase: new URL(siteUrl),
    title,
    description,
    alternates: { canonical, languages: languageAlternates(path) },
    openGraph,
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}
