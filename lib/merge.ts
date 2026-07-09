import type { Locale } from "@/i18n/config";

// Helpers de i18n para lib/data: fusionan la BASE (pt) con los TEXTOS del locale
// (con fallback a pt por clave). El merge es PROFUNDO: en objetos anidados y en
// arrays de objetos (photos, specs, body...) se combina elemento por elemento,
// así que los overrides solo necesitan aportar los campos de texto traducidos;
// rutas de imágenes, números y estructura salen siempre de la base.

type Dict<V> = Record<string, V>;
type TextMap<T> = Partial<Record<Locale, Dict<T>>>;

function isPlainObject(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

// Combina un valor base con su override. undefined → conserva la base.
function mergeVal(base: unknown, over: unknown): unknown {
  if (over === undefined) return base;
  if (Array.isArray(base) && Array.isArray(over)) {
    // element-wise: mantiene la longitud de la base; over[i] undefined → base[i].
    return base.map((b, i) => mergeVal(b, over[i]));
  }
  if (isPlainObject(base) && isPlainObject(over)) {
    const out: Record<string, unknown> = { ...base };
    for (const k of Object.keys(over)) out[k] = mergeVal(base[k], over[k]);
    return out;
  }
  return over;
}

// Merge de un Record<string, Base> con textos por clave: base + pt + locale.
export function mergeRecord<Base, Text>(
  base: Dict<Base>,
  texts: TextMap<Text>,
  lang: Locale,
): Dict<Base & Text> {
  const pt = texts.pt ?? {};
  const loc = texts[lang] ?? {};
  const out: Dict<Base & Text> = {};
  for (const key of Object.keys(base)) {
    let v: unknown = base[key];
    v = mergeVal(v, pt[key]);
    v = mergeVal(v, loc[key]);
    out[key] = v as Base & Text;
  }
  return out;
}

// Merge de un array de bases con textos indexados por una clave estable.
export function mergeList<Base, Text>(
  base: Base[],
  keyOf: (b: Base) => string,
  texts: TextMap<Text>,
  lang: Locale,
): (Base & Text)[] {
  const pt = texts.pt ?? {};
  const loc = texts[lang] ?? {};
  return base.map((b) => {
    const k = keyOf(b);
    let v: unknown = b;
    v = mergeVal(v, pt[k]);
    v = mergeVal(v, loc[k]);
    return v as Base & Text;
  });
}

// Para datasets 100% texto (sin base parcial): devuelve el texto del locale o pt.
export function pickText<T>(texts: Partial<Record<Locale, T>>, lang: Locale): T {
  return (texts[lang] ?? texts.pt) as T;
}
