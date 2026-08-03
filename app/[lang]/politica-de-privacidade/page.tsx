// PLANTILLA BASE — Política de Privacidad y Cookies.
// El contenido vive en lib/legal.ts (localizado pt/es/en). Es un TEXTO BASE que
// DEBE revisar una persona con conocimiento de la LGPD antes de publicarse, y
// contiene placeholders visibles ({RESPONSAVEL}, {EMAIL}, {DATA}) que el cliente
// debe completar. Ver el aviso al inicio de lib/legal.ts.
import "./politica.css";
import ContatoStrip from "@/components/ContatoStrip";
import { isLocale, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import { pageMeta } from "@/i18n/seo";
import JsonLd from "@/components/JsonLd";
import { breadcrumbLd } from "@/lib/jsonld";
import { privacyPolicy } from "@/lib/legal";
import CookieManage from "@/components/cookies/CookieManage";
import type { Metadata } from "next";

const HERO_IMG = "/images/real/home/fachada-frontal-pousada-cataratas-foz-do-iguacu.webp";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const loc = isLocale(lang) ? lang : "pt";
  const dict = await getDictionary(lang);
  const content = privacyPolicy[loc];
  return pageMeta({
    lang: loc,
    path: "/politica-de-privacidade",
    title: content.title + dict.meta.titleSuffix,
    description: content.metaDescription,
    image: HERO_IMG,
  });
}

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

// Reemplazo del <image-slot fit="cover"> del export (mismo patrón que las demás páginas).
function SlotImg({ src, alt = "" }: { src: string; alt?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
    />
  );
}

// Reemplaza los tokens de placeholder por un resaltado visible (dato a completar).
function withPlaceholders(text: string, ph: { responsavel: string; email: string; data: string }) {
  const map: Record<string, string> = { RESPONSAVEL: ph.responsavel, EMAIL: ph.email, DATA: ph.data };
  return text.split(/(\{RESPONSAVEL\}|\{EMAIL\}|\{DATA\})/g).map((part, i) => {
    const m = part.match(/^\{([A-Z]+)\}$/);
    if (m && map[m[1]]) {
      return (
        <span key={i} className="pp-ph">
          {map[m[1]]}
        </span>
      );
    }
    return part;
  });
}

export default async function PoliticaDePrivacidade({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const loc = isLocale(lang) ? lang : "pt";
  const dict = await getDictionary(lang);
  const content = privacyPolicy[loc];

  return (
    <>
      <JsonLd
        data={breadcrumbLd(loc, [
          { name: dict.nav.inicio, path: "/" },
          { name: content.title, path: "/politica-de-privacidade" },
        ])}
      />

      {/* HEADER BANNER (mesma cabeçalho das páginas interiores) */}
      <section
        style={{ position: "relative", width: "100%", height: "40vh", minHeight: "300px", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", background: "#143C7A" }}
      >
        <SlotImg src={HERO_IMG} alt={`${content.title} — Pousada Cataratas`} />
        <div style={{ position: "absolute", inset: 0, background: "rgba(20,60,122,.62)" }} />
        <h1 style={{ position: "relative", fontFamily: "var(--font-gilda), Georgia, serif", fontWeight: 500, fontSize: "56px", lineHeight: 1.04, color: "#FFFFFF", textAlign: "center", margin: 0, padding: "0 22px" }}>
          {content.title}
        </h1>
      </section>

      {/* CONTEÚDO */}
      <section className="pp-wrap">
        <div className="pp-updated">
          {content.lastUpdatedLabel}: <span className="pp-ph">{content.ph.data}</span>
        </div>
        <p className="pp-intro">{content.intro}</p>

        {content.sections.map((sec) => (
          <div className="pp-sec" key={sec.heading}>
            <h2>{sec.heading}</h2>
            {sec.blocks.map((block, bi) =>
              block.type === "p" ? (
                <p key={bi}>{withPlaceholders(block.text, content.ph)}</p>
              ) : (
                <ul key={bi}>
                  {block.items.map((item, ii) => (
                    <li key={ii}>{withPlaceholders(item, content.ph)}</li>
                  ))}
                </ul>
              ),
            )}
          </div>
        ))}

        {/* Gestión de cookies (opt-out) — cliente */}
        <CookieManage />
      </section>

      {/* LOCALIZAÇÃO (mesmo rodapé de conteúdo das páginas interiores) */}
      <ContatoStrip dict={dict} style={{ margin: 0, padding: 0 }} />
    </>
  );
}
