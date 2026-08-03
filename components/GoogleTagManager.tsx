import Script from "next/script";

// ID del contenedor de Google Tag Manager.
export const GTM_ID = "GTM-NHZJTX2P";

/**
 * Inicialización de Google Consent Mode v2, previa a GTM (modelo opt-out).
 *
 * Estrategia `beforeInteractive`: se ejecuta ANTES de que se cargue `gtm.js`,
 * que es justo el orden que exige Consent Mode (si corriera después, no tendría
 * efecto). Fija el estado por defecto con TODOS los permisos en 'granted'.
 *
 * Si el visitante rechazó antes (opt-out), la cookie de dominio `CookieActived`
 * vale 'denied'; en ese caso se envía de inmediato un `update` a 'denied' para
 * publicidad y analytics, también ANTES de gtm.js. Ver lib/consent.ts.
 *
 * NOTA: url_passthrough y ads_data_redaction NO se configuran aquí a propósito;
 * ya están definidos en el contenedor de Google Tag Manager.
 */
export function GtmConsentInit() {
  return (
    <Script id="gtm-consent-init" strategy="beforeInteractive">
      {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('consent', 'default', {
  ad_storage: 'granted',
  ad_user_data: 'granted',
  ad_personalization: 'granted',
  analytics_storage: 'granted',
  functionality_storage: 'granted',
  personalization_storage: 'granted',
  security_storage: 'granted'
});
try {
  var m = document.cookie.match(/(?:^|;\\s*)CookieActived=([^;]+)/);
  if (m && decodeURIComponent(m[1]) === 'denied') {
    gtag('consent', 'update', {
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
      analytics_storage: 'denied'
    });
  }
} catch (e) {}`}
    </Script>
  );
}

/**
 * Snippet oficial de GTM: inicializa `dataLayer` y carga `gtm.js` de forma
 * asíncrona con el ID del contenedor. Estrategia `afterInteractive` para no
 * bloquear el render inicial de la página.
 */
export function GtmScript() {
  return (
    <Script id="gtm-base" strategy="afterInteractive">
      {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`}
    </Script>
  );
}

/**
 * Fallback `<noscript>` de GTM (iframe). Debe ir al inicio del `<body>`.
 * Está oculto (no altera el cuerpo visible); solo actúa si el visitante tiene
 * JavaScript deshabilitado.
 */
export function GtmNoScript() {
  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
        height="0"
        width="0"
        style={{ display: "none", visibility: "hidden" }}
      />
    </noscript>
  );
}
