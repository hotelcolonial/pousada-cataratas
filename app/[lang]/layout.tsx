import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { notFound } from "next/navigation";
import { helveticaNeueCyr, gildaDisplay } from "../fonts";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { LocaleProvider } from "@/components/i18n/LocaleProvider";
import JsonLd from "@/components/JsonLd";
import CookieConsent from "@/components/cookies/CookieConsent";
import { GtmConsentInit, GtmScript, GtmNoScript } from "@/components/GoogleTagManager";
import { lodgingBusinessLd } from "@/lib/jsonld";
import { getDictionary } from "@/i18n/getDictionary";
import { locales, isLocale, htmlLang } from "@/i18n/config";
import "../globals.css";

export const metadata: Metadata = {
  title: "Pousada Cataratas",
  // Iconos y manifest. Las rutas apuntan a archivos estáticos en /public:
  // para subir de resolución en el futuro basta con reemplazar esos archivos
  // (mismos nombres) sin tocar este código. Ver public/icons/README.md.
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icons/icon-16.png", type: "image/png", sizes: "16x16" },
      { url: "/icons/icon-32.png", type: "image/png", sizes: "32x32" },
      { url: "/icons/icon-192.png", type: "image/png", sizes: "192x192" },
      { url: "/icons/icon-512.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: "/icons/apple-touch-icon.png", sizes: "180x180" }],
    shortcut: [{ url: "/favicon.ico" }],
  },
  manifest: "/manifest.webmanifest",
};

export const viewport: Viewport = {
  themeColor: "#143C7A",
};

// Genera las variantes por idioma (/pt, /es, /en).
export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  // Se carga el diccionario del locale (maquinaria de i18n).
  // En Fase 0 está vacío: ninguna vista lee todavía de él.
  const dict = await getDictionary(lang);

  return (
    <html
      lang={htmlLang[lang]}
      className={`${helveticaNeueCyr.variable} ${gildaDisplay.variable}`}
      // Evita el error de hidratación cuando una extensión del navegador
      // (p. ej. LanguageTool: data-lt-installed) inyecta atributos en <html>/<body>
      // antes de que React hidrate. Solo afecta a estas etiquetas (un nivel).
      suppressHydrationWarning
    >
      <body suppressHydrationWarning>
        {/* Google Tag Manager (noscript) — debe ir al inicio del <body> */}
        <GtmNoScript />
        {/* Google Tag Manager: init de consentimiento (beforeInteractive, listo
            para Consent Mode) + carga del contenedor (afterInteractive) */}
        <GtmConsentInit />
        <GtmScript />
        {/* Datos estructurados del hotel (LodgingBusiness), en todas las páginas */}
        <JsonLd data={lodgingBusinessLd(lang, dict.meta.description)} />
        {/* Header y Footer montados dentro del provider de locale */}
        <LocaleProvider lang={lang} dict={dict}>
          <Header />
          {children}
          <Footer lang={lang} dict={dict} />
          {/* Banner de consentimiento de cookies (Consent Mode v2) */}
          <CookieConsent />
        </LocaleProvider>
        {/* Chatbot Asksuite: carga diferida (lazyOnload) para no bloquear el render. */}
        <Script
          id="script-infochat"
          src="https://cdn.asksuite.com/infochat.js?dataConfig=https://control.asksuite.com/api/companies/pousada-cataratas-xgs"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
