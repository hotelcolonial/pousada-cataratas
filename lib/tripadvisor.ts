import type { Locale } from "@/i18n/config";

// Punto único de verdad de los datos de reconocimiento de TripAdvisor.
// ============================ EDITAR AQUÍ ============================
// Cuando cambie el ranking o la nota (TripAdvisor los actualiza cada cierto
// tiempo), basta con tocar estos cinco valores: la sección de la Home, los
// textos de los tres idiomas y la URL del widget se recalculan solos.
export const TRIPADVISOR = {
  /** Posición en el ranking de POUSADAS de Foz do Iguaçu (no de la ciudad). */
  rank: 1,
  /** Total de pousadas del ranking en el que ocupamos esa posición. */
  totalPousadas: 84,
  /** Nota media sobre 5. */
  rating: 4.5,
  /** Número de reseñas publicadas. */
  reviews: 418,
  /** Ficha del hotel en TripAdvisor. */
  reviewUrl:
    "https://www.tripadvisor.com.br/Hotel_Review-g303444-d888646-Reviews-Pousada_Cataratas-Foz_do_Iguacu_State_of_Parana.html",
  /** Identificadores del widget oficial (los da TripAdvisor en su snippet). */
  locationId: 888646,
  widgetUniq: 378,
} as const;
// ====================================================================

/** Id del contenedor que el script de TripAdvisor busca por getElementById. */
export const TA_CONTAINER_ID = `TA_rated${TRIPADVISOR.widgetUniq}`;

// Códigos de idioma aceptados por el widget (verificados: devuelven el badge
// traducido — "RECOMENDADO NO" / "RECOMENDADO EN" / "RECOMMENDED ON").
const TA_LANG: Record<Locale, string> = { pt: "pt", es: "es", en: "en" };

/** Script oficial del widget "rated" para el idioma de la página. */
export const taScriptSrc = (lang: Locale) =>
  `https://www.jscache.com/wejs?wtype=rated&uniq=${TRIPADVISOR.widgetUniq}` +
  `&locationId=${TRIPADVISOR.locationId}&lang=${TA_LANG[lang]}&display_version=2`;

// Separador decimal por idioma. Fijo a propósito (en vez de toLocaleString):
// la Home es estática y el valor debe ser idéntico en el HTML del build y en el
// cliente, sin depender del locale del runtime → hidratación limpia.
const decimalSep: Record<Locale, string> = { pt: ",", es: ",", en: "." };

/** 4.5 -> "4,5" (pt/es) | "4.5" (en) */
export const formatRating = (lang: Locale, value: number = TRIPADVISOR.rating) =>
  value.toFixed(1).replace(".", decimalSep[lang]);

/** Porcentaje de estrellas doradas: 4.5/5 -> 90. */
export const ratingPercent = (value: number = TRIPADVISOR.rating) =>
  Math.max(0, Math.min(100, (value / 5) * 100));
