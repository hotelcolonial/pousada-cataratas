// Lógica compartida del consentimiento de cookies + Google Consent Mode v2.
//
// Categorías del banner:
//   - necessary  → siempre activa (functionality_storage / security_storage)
//   - analytics  → analytics_storage
//   - marketing  → ad_storage + ad_user_data + ad_personalization
//
// El estado por defecto (denegado) se fija en el script beforeInteractive de
// components/GoogleTagManager.tsx, ANTES de que cargue gtm.js. Aquí solo se
// envían las actualizaciones (consent 'update') cuando el visitante elige, y se
// persiste la elección para no volver a preguntar.

export const CONSENT_KEY = "pc_cookie_consent";
export const CONSENT_VERSION = 1;

// Evento DOM para abrir el panel de preferencias desde cualquier parte
// (p. ej. el enlace del footer).
export const OPEN_PREFERENCES_EVENT = "pc:open-cookie-preferences";

export type ConsentCategories = { analytics: boolean; marketing: boolean };
export type StoredConsent = { v: number; categories: ConsentCategories; ts: number };

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

// Lee la elección guardada; null si no hay (primera visita) o si es inválida.
export function loadConsent(): StoredConsent | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(CONSENT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as StoredConsent;
    if (!parsed || parsed.v !== CONSENT_VERSION || !parsed.categories) return null;
    return parsed;
  } catch {
    return null;
  }
}

// Traduce las categorías del banner a señales de Google Consent Mode.
function toSignals(c: ConsentCategories) {
  return {
    analytics_storage: c.analytics ? "granted" : "denied",
    ad_storage: c.marketing ? "granted" : "denied",
    ad_user_data: c.marketing ? "granted" : "denied",
    ad_personalization: c.marketing ? "granted" : "denied",
  };
}

// Actualiza el consentimiento en Consent Mode y (por defecto) lo persiste.
// Usa el gtag() global definido por el script beforeInteractive; si no existe,
// lo recrea con la misma forma (push del objeto arguments) para que GTM lo lea.
export function applyConsent(categories: ConsentCategories, persist = true) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  if (typeof window.gtag !== "function") {
    window.gtag = function gtag() {
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer.push(arguments);
    };
  }
  window.gtag("consent", "update", toSignals(categories));
  // Evento propio para que GTM pueda disparar/actualizar etiquetas al cambiar.
  window.dataLayer.push({
    event: "cookie_consent_update",
    consent: { necessary: true, ...categories },
  });
  if (persist) {
    try {
      const payload: StoredConsent = { v: CONSENT_VERSION, categories, ts: Date.now() };
      window.localStorage.setItem(CONSENT_KEY, JSON.stringify(payload));
    } catch {
      /* localStorage no disponible: se mantiene solo en memoria */
    }
  }
}

// Dispara la apertura del panel de preferencias (para el enlace del footer).
export function openCookiePreferences() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(OPEN_PREFERENCES_EVENT));
}
