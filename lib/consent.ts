// Lógica compartida del consentimiento de cookies + Google Consent Mode v2.
//
// MODELO: opt-out / informativo.
//   - Por defecto TODOS los permisos van en 'granted' (se fija en el script
//     beforeInteractive de components/GoogleTagManager.tsx, ANTES de gtm.js).
//   - El banner es meramente informativo: "Entendi" solo lo cierra y persiste
//     que ya fue visto.
//   - El visitante puede RECHAZAR (opt-out) desde la Política de Privacidade;
//     eso envía un consent 'update' a 'denied' y lo guarda en la cookie.
//
// PERSISTENCIA: una única cookie de DOMINIO (.pousadacataratas.com.br) para que
// la preferencia se comparta con el motor de reservas (reservar.pousada...).
//   valor "granted" -> banner visto / cookies permitidas
//   valor "denied"  -> el visitante rechazó las no esenciales
//   ausente         -> primera visita (se muestra el banner; por defecto granted)

// ⚠️ CONTRATO ENTRE SUBDOMINIOS: este nombre debe coincidir con el que lee el
// motor de reservas en reservar.pousadacataratas.com.br.
export const CONSENT_COOKIE = "CookieActived";

// 180 días.
const CONSENT_MAX_AGE = 60 * 60 * 24 * 180;

export type ConsentValue = "granted" | "denied";

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

// Señales de Consent Mode v2 que se ponen en 'denied' al rechazar (opt-out).
// functionality_storage, personalization_storage y security_storage permanecen
// en 'granted' (no dependen del consentimiento publicitario/analítico).
const OPTOUT_DENIED = {
  ad_storage: "denied",
  ad_user_data: "denied",
  ad_personalization: "denied",
  analytics_storage: "denied",
} as const;

const OPTIN_GRANTED = {
  ad_storage: "granted",
  ad_user_data: "granted",
  ad_personalization: "granted",
  analytics_storage: "granted",
} as const;

// Dominio de la cookie: en producción, compartida por todos los subdominios
// (.pousadacataratas.com.br). En localhost/preview no se fija domain (fallaría).
function cookieDomainAttr(): string {
  if (typeof window === "undefined") return "";
  return window.location.hostname.endsWith("pousadacataratas.com.br")
    ? "; domain=.pousadacataratas.com.br"
    : "";
}

// Lee la cookie de consentimiento; null si no existe o el valor no es válido.
export function readConsentCookie(): ConsentValue | null {
  if (typeof document === "undefined") return null;
  const m = document.cookie.match(
    new RegExp("(?:^|;\\s*)" + CONSENT_COOKIE + "=([^;]+)"),
  );
  if (!m) return null;
  const v = decodeURIComponent(m[1]);
  return v === "denied" ? "denied" : v === "granted" ? "granted" : null;
}

function writeConsentCookie(value: ConsentValue) {
  if (typeof document === "undefined") return;
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie =
    CONSENT_COOKIE +
    "=" +
    value +
    "; path=/" +
    cookieDomainAttr() +
    "; max-age=" +
    CONSENT_MAX_AGE +
    "; SameSite=Lax" +
    secure;
}

// Asegura un gtag() utilizable (el real lo define el script beforeInteractive;
// si aún no existe, se recrea con la misma forma para que GTM lo lea).
function ensureGtag(): (...args: unknown[]) => void {
  window.dataLayer = window.dataLayer || [];
  if (typeof window.gtag !== "function") {
    window.gtag = function gtag() {
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer.push(arguments);
    };
  }
  return window.gtag;
}

// Banner "Entendi": no cambia el consentimiento (ya está todo granted por
// defecto), solo persiste que el banner fue visto para no volver a mostrarlo.
export function acknowledgeConsent() {
  writeConsentCookie("granted");
}

// Opt-out / opt-in desde la Política de Privacidade. Envía el consent 'update'
// correspondiente y guarda la preferencia en la cookie de dominio.
export function applyConsentChoice(allow: boolean) {
  if (typeof window === "undefined") return;
  const gtag = ensureGtag();
  gtag("consent", "update", allow ? OPTIN_GRANTED : OPTOUT_DENIED);
  window.dataLayer.push({
    event: "cookie_consent_update",
    consent: { necessary: true, analytics: allow, marketing: allow },
  });
  writeConsentCookie(allow ? "granted" : "denied");
}
