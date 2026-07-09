import type { MetadataRoute } from "next";
import { locales, defaultLocale, localePath } from "@/i18n/config";
import { siteUrl } from "@/i18n/seo";
import {
  quartoRooms,
  atracaoDetails,
  artigoDetails,
  promocaoDetails,
  produtoDetails,
} from "@/lib/data";

// Rutas fijas (sin prefijo de idioma). Los slugs de las rutas dinámicas son
// iguales en los tres idiomas (Fase 1), así que solo cambia el prefijo.
const staticPaths = [
  "/",
  "/quartos",
  "/galeria",
  "/promocoes",
  "/atracoes",
  "/blog",
  "/politica-de-privacidade",
];

function allPaths(): string[] {
  const paths = [...staticPaths];
  Object.keys(quartoRooms).forEach((s) => paths.push(`/quartos/${s}`));
  Object.keys(atracaoDetails).forEach((s) => paths.push(`/atracoes/${s}`));
  Object.keys(artigoDetails).forEach((s) => paths.push(`/blog/${s}`));
  Object.keys(promocaoDetails).forEach((s) => paths.push(`/promocoes/${s}`));
  Object.keys(produtoDetails).forEach((s) => paths.push(`/promocao/${s}`));
  return paths;
}

export default function sitemap(): MetadataRoute.Sitemap {
  return allPaths().map((path) => {
    const languages: Record<string, string> = {};
    for (const l of locales) languages[l] = `${siteUrl}${localePath(l, path)}`;
    languages["x-default"] = `${siteUrl}${localePath(defaultLocale, path)}`;
    return {
      // URL canónica de la entrada = variante en portugués (idioma por defecto).
      url: `${siteUrl}${localePath(defaultLocale, path)}`,
      alternates: { languages },
    };
  });
}
