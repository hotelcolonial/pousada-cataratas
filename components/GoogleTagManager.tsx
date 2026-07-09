import Script from "next/script";

// ID del contenedor de Google Tag Manager.
export const GTM_ID = "GTM-P27LJTQ5";

/**
 * Inicialización de Google Consent Mode v2, previa a GTM.
 *
 * Estrategia `beforeInteractive`: se ejecuta ANTES de que se cargue `gtm.js`,
 * que es justo el orden que exige Consent Mode. Fija el estado por defecto en
 * DENEGADO para analytics y publicidad, de modo que GTM y sus etiquetas no
 * rastrean hasta que el visitante consienta. Si ya hay una elección guardada
 * (visitante que regresa), aplica de inmediato el `update` correspondiente.
 *
 * El banner (components/cookies/CookieConsent.tsx) envía los `update` cuando el
 * visitante acepta/rechaza; ver lib/consent.ts.
 */
export function GtmConsentInit() {
  return (
    <Script id="gtm-consent-init" strategy="beforeInteractive">
      {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('consent', 'default', {
  ad_storage: 'denied',
  analytics_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  functionality_storage: 'granted',
  security_storage: 'granted',
  wait_for_update: 500
});
try {
  var s = localStorage.getItem('pc_cookie_consent');
  if (s) {
    var c = JSON.parse(s);
    if (c && c.categories) {
      gtag('consent', 'update', {
        analytics_storage: c.categories.analytics ? 'granted' : 'denied',
        ad_storage: c.categories.marketing ? 'granted' : 'denied',
        ad_user_data: c.categories.marketing ? 'granted' : 'denied',
        ad_personalization: c.categories.marketing ? 'granted' : 'denied'
      });
    }
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
