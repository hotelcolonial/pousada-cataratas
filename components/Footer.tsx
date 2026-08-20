import { localePath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/getDictionary";
import CookiePreferencesLink from "@/components/cookies/CookiePreferencesLink";
import TripAdvisorBadge from "@/components/TripAdvisorBadge";
import { privacyPolicy } from "@/lib/legal";
import { WHATSAPP_HREF } from "@/lib/whatsapp";

// Icono de WhatsApp — mismo path del export (Footer.dc.html).
const WA_PATH =
  "M12 2a9.94 9.94 0 0 0-8.5 15.16L2 22l4.96-1.46A10 10 0 1 0 12 2Zm0 18.13a8.1 8.1 0 0 1-4.13-1.13l-.3-.18-3.05.9.92-2.98-.2-.31A8.13 8.13 0 1 1 12 20.13Zm4.46-6.1c-.24-.12-1.44-.71-1.66-.79s-.39-.12-.55.12-.63.79-.77.95-.28.18-.52.06a6.66 6.66 0 0 1-1.96-1.21 7.4 7.4 0 0 1-1.36-1.69c-.14-.24 0-.37.11-.49s.24-.28.37-.42a1.6 1.6 0 0 0 .24-.41.45.45 0 0 0 0-.43c-.06-.12-.55-1.32-.75-1.81s-.4-.41-.55-.42h-.47a.9.9 0 0 0-.65.3 2.74 2.74 0 0 0-.85 2.03 4.74 4.74 0 0 0 1 2.52 10.9 10.9 0 0 0 4.17 3.68c.58.25 1.04.4 1.39.51a3.35 3.35 0 0 0 1.54.1 2.51 2.51 0 0 0 1.65-1.17 2.04 2.04 0 0 0 .14-1.16c-.06-.1-.22-.16-.46-.28Z";

export default function Footer({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const f = dict.footer;
  return (
    <div className="pcf" style={{ fontFamily: "var(--font-hnc), system-ui, sans-serif" }}>
      <footer style={{ maxWidth: "1760px", margin: "0 auto", padding: "80px 30px 36px" }}>
        <div className="pcf-grid">
          <div className="pcf-brand">
            {/* Pousada Cataratas │ Méritum Hotéis (mesmo layout do navbar) */}
            <div style={{ display: "flex", alignItems: "center", gap: "11px" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/pousada-logo-preto.webp"
                alt={f.pousadaLogoAlt}
                style={{ height: "42px", width: "auto", display: "block" }}
              />
              <span aria-hidden style={{ width: "1px", height: "26px", background: "rgba(20,33,51,.16)" }} />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/meritum-hoteis-logo.webp"
                alt={f.meritumAlt}
                title={f.meritumTitle}
                style={{ height: "34px", width: "auto", display: "block" }}
              />
            </div>
            <p
              style={{
                fontSize: "14.5px",
                lineHeight: 1.62,
                color: "#5C6B7A",
                margin: "22px 0 0",
                maxWidth: "330px",
              }}
            >
              {f.brandDesc}
            </p>
            {/* Crédito de desenvolvimento (sem link por enquanto) */}
            <div
              style={{
                marginTop: "26px",
                fontSize: "12.5px",
                lineHeight: 1.5,
                color: "#9AA3AD",
              }}
            >
              {f.credito}
            </div>
          </div>
          <div className="pcf-c1">
            <div style={{ fontSize: "14.5px", color: "#1B2733" }}>{f.colPousada}</div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "13px",
                marginTop: "20px",
                fontSize: "14.5px",
              }}
            >
              <a href={localePath(lang, "/quartos")} className="pcf-link">
                {f.linkAcomodacoes}
              </a>
              <a href={localePath(lang, "/galeria")} className="pcf-link">
                {f.linkGaleria}
              </a>
              <a href={localePath(lang, "/atracoes")} className="pcf-link">
                {f.linkAtracoes}
              </a>
            </div>
          </div>
          <div className="pcf-c2">
            <div style={{ fontSize: "14.5px", color: "#1B2733" }}>{f.colReservas}</div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "13px",
                marginTop: "20px",
                fontSize: "14.5px",
              }}
            >
              <a href="#" className="pcf-link">
                {f.linkReservar}
              </a>
              <a href={localePath(lang, "/blog")} className="pcf-link">
                {f.linkBlog}
              </a>
            </div>
          </div>
          <div className="pcf-c3">
            <div style={{ fontSize: "14.5px", color: "#1B2733" }}>{f.colContato}</div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "13px",
                marginTop: "20px",
                fontSize: "14.5px",
              }}
            >
              <a href={WHATSAPP_HREF} target="_blank" rel="noopener noreferrer" className="pcf-link">
                {f.linkWhatsapp}
              </a>
              <a href="https://www.instagram.com/pousadacataratas/" target="_blank" rel="noopener noreferrer" className="pcf-link">
                {f.linkInstagram}
              </a>
              <a href="https://www.facebook.com/pousadacataratasfoz" target="_blank" rel="noopener noreferrer" className="pcf-link">
                {f.linkFacebook}
              </a>
            </div>
          </div>
        </div>

        {/* Selo oficial de TripAdvisor — respaldo discreto, sin protagonismo.
            Su margen inferior negativo lo acerca a la barra de copyright para
            que lea como parte de ella y no como una sección más. */}
        <div className="pcf-ta">
          <TripAdvisorBadge />
        </div>

        <div
          className="pcf-bottom"
          style={{
            marginTop: "28px",
            display: "flex",
            flexWrap: "wrap",
            gap: "16px",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "18px", flexWrap: "wrap" }}>
            <div style={{ fontSize: "13px", color: "#9AA3AD" }}>
              {f.copyright}
            </div>
            <a href={localePath(lang, "/politica-de-privacidade")} className="pcf-link" style={{ fontSize: "13px", color: "#9AA3AD" }}>
              {privacyPolicy[lang].title}
            </a>
            <CookiePreferencesLink
              href={localePath(lang, "/politica-de-privacidade") + "#gerenciar-cookies"}
              label={dict.cookies.footerLink}
            />
          </div>
          <div style={{ fontSize: "13px", color: "#9AA3AD" }}>
            {f.tagline}
          </div>
        </div>
      </footer>

      <a
        href={WHATSAPP_HREF}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={f.ariaWhatsapp}
        className="pcf-wa"
        style={{
          // Apilado por encima del widget de chat de Asksuite (anclado abajo-derecha):
          // se sube el bottom para que el logo de WhatsApp quede visible sobre él.
          position: "fixed",
          bottom: "96px",
          right: "16px",
          zIndex: 90,
          width: "56px",
          height: "56px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textDecoration: "none",
        }}
      >
        <svg
          width="54"
          height="54"
          viewBox="0 0 24 24"
          fill="#25D366"
          style={{ filter: "drop-shadow(0 4px 12px rgba(0,0,0,.3))" }}
        >
          <path d={WA_PATH} />
        </svg>
      </a>
    </div>
  );
}
