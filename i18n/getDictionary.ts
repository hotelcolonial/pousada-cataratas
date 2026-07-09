import type { Locale } from "./config";
import ptDict from "./dictionaries/pt.json";

// La forma del diccionario se deriva del portugués (única fuente completa).
export type Dictionary = typeof ptDict;

// Diccionarios de textos de UI, cargados on-demand por locale (server-side).
// pt está completo; es/en existen vacíos (Fase 1 no agrega traducciones).
const loaders: Record<Locale, () => Promise<unknown>> = {
  pt: () => import("./dictionaries/pt.json").then((m) => m.default),
  es: () => import("./dictionaries/es.json").then((m) => m.default),
  en: () => import("./dictionaries/en.json").then((m) => m.default),
};

type Json = Record<string, unknown>;
function isPlainObject(v: unknown): v is Json {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}
// Fusiona `override` sobre `base`: las claves ausentes caen a `base` (pt).
// Con override vacío ({}), el resultado es exactamente `base`.
function deepMerge(base: Json, override: Json): Json {
  const out: Json = { ...base };
  for (const key of Object.keys(override)) {
    const bv = base[key];
    const ov = override[key];
    out[key] = isPlainObject(bv) && isPlainObject(ov) ? deepMerge(bv, ov) : ov;
  }
  return out;
}

// Devuelve el diccionario del locale con fallback a portugués para cualquier
// clave no traducida. En Fase 1, es/en están vacíos → devuelven pt completo.
export async function getDictionary(lang: string): Promise<Dictionary> {
  if (lang === "pt") return ptDict as Dictionary;
  const override = await (loaders[lang as Locale] ?? loaders.pt)();
  return deepMerge(ptDict as Json, (override ?? {}) as Json) as Dictionary;
}
