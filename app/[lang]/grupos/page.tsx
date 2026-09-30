import "./grupos.css";
import type { CSSProperties, ReactNode } from "react";
import ContatoStrip from "@/components/ContatoStrip";
import JsonLd from "@/components/JsonLd";
import BeneficioIcone from "@/components/promo/BeneficioIcone";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import { pageMeta } from "@/i18n/seo";
import { breadcrumbLd } from "@/lib/jsonld";
import { COMERCIAL, COMERCIAL_TEL_HREF, comercialMailtoHref } from "@/lib/comercial";
import type { Metadata } from "next";

// Imagen de cabecera (placeholder hasta tener foto de grupo). También es la og:image.
const BANNER_IMG = "/images/real/home/fachada-vista-rua-pousada-cataratas-foz-do-iguacu.webp";
const INTRO_IMG = "/images/real/home/piscina-area-convivencia-pousada-cataratas-foz-do-iguacu.webp";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const loc = isLocale(lang) ? lang : "pt";
  const dict = await getDictionary(lang);
  return pageMeta({ lang: loc, path: "/grupos", title: dict.meta.titleGrupos, description: dict.meta.descGrupos, image: BANNER_IMG });
}

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

// Ícones lineares no mesmo desenho do BeneficioIcone (grelha 24, traço 1.3).
function Linear({ children, size = 40 }: { children: ReactNode; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.3} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      {children}
    </svg>
  );
}

// "Para quem é" — mesma ordem que dict.grupos.publico.
const PUBLICO_ICONS: ReactNode[] = [
  // Agências e operadoras: globo
  <Linear key="0"><circle cx="12" cy="12" r="9" /><path d="M3 12h18" /><path d="M12 3a14 14 0 0 1 0 18 14 14 0 0 1 0-18z" /></Linear>,
  // Excursões: ônibus
  <Linear key="1"><rect x="4" y="3" width="16" height="15" rx="2" /><path d="M4 11h16M4 7h16" /><circle cx="8" cy="14.5" r=".6" /><circle cx="16" cy="14.5" r=".6" /><path d="M7 18v2.5M17 18v2.5" /></Linear>,
  // Grupos esportivos e eventos: medalha
  <Linear key="2"><path d="M8 3l2.5 6M16 3l-2.5 6" /><circle cx="12" cy="15" r="6" /><path d="M12 12.3l.9 1.8 2 .3-1.5 1.4.4 2-1.8-1-1.8 1 .4-2-1.5-1.4 2-.3z" /></Linear>,
  // Empresas e viagens corporativas: maleta
  <Linear key="3"><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" /><path d="M3 12.5h18" /></Linear>,
  // Famílias e grupos de amigos: pessoas
  <Linear key="4"><circle cx="9" cy="8" r="3" /><path d="M3.5 20v-1.5a5.5 5.5 0 0 1 11 0V20" /><circle cx="17" cy="9" r="2.4" /><path d="M16 14.2a4.5 4.5 0 0 1 5 4.3V20" /></Linear>,
];

// "Por que escolher" — mesma ordem que dict.grupos.motivos.
const MOTIVO_ICONS: ReactNode[] = [
  <BeneficioIcone key="0" nome="quarto" size={40} />,
  <BeneficioIcone key="1" nome="cafe" size={40} />,
  <BeneficioIcone key="2" nome="estacionamento" size={40} />,
  <BeneficioIcone key="3" nome="local" size={40} />,
  // Atendimento comercial: headset
  <Linear key="4"><path d="M4 14v-2a8 8 0 0 1 16 0v2" /><rect x="3" y="13.5" width="4" height="6" rx="1.5" /><rect x="17" y="13.5" width="4" height="6" rx="1.5" /><path d="M19 19.5c0 1.2-1.5 2-4 2h-2" /></Linear>,
  <BeneficioIcone key="5" nome="desconto" size={40} />,
];

const eyebrow: CSSProperties = { fontSize: "12px", letterSpacing: ".3em", textTransform: "uppercase", color: "#9AA3AD" };
const h2: CSSProperties = { fontFamily: "var(--font-gilda), Georgia, serif", fontWeight: 500, lineHeight: 1.04, letterSpacing: "-.01em", color: "#143C7A", margin: "18px 0 0" };

export default async function Grupos({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const loc = isLocale(lang) ? lang : "pt";
  const dict = await getDictionary(lang);
  const g = dict.grupos;
  const mailto = comercialMailtoHref(g.emailSubject, g.emailBody);

  return (
    <>
      <JsonLd data={breadcrumbLd(loc, [{ name: dict.nav.inicio, path: "/" }, { name: dict.nav.grupos, path: "/grupos" }])} />

      {/* HEADER BANNER */}
      <section style={{ position: "relative", width: "100%", height: "40vh", minHeight: "300px", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", background: "#143C7A" }}>
        <SlotImg src={BANNER_IMG} alt={dict.alts.gruposBanner} />
        <div style={{ position: "absolute", inset: 0, background: "rgba(20,60,122,.46)" }} />
        <h1 style={{ position: "relative", fontFamily: "var(--font-gilda), Georgia, serif", fontWeight: 500, fontSize: "clamp(32px, 6vw, 60px)", lineHeight: 1.05, color: "#FFFFFF", textAlign: "center", margin: 0, padding: "0 22px", maxWidth: "980px" }}>
          {g.bannerTitle}
        </h1>
      </section>

      {/* INTRO */}
      <section className="gr-intro">
        <div>
          <div style={eyebrow}>{g.eyebrow}</div>
          <h2 className="gr-h2" style={h2}>{g.title}</h2>
          <p style={{ fontSize: "15px", lineHeight: 1.78, color: "#7A8694", margin: "30px 0 0", maxWidth: "560px" }}>{g.intro}</p>
          <a href="#proposta" className="gr-btn gr-btn-blue" style={{ marginTop: "34px" }}>{dict.home.gruposCta}</a>
        </div>
        <div className="gr-intro-img">
          <SlotImg src={INTRO_IMG} alt={dict.alts.gruposIntro} />
        </div>
      </section>

      {/* PARA QUEM É */}
      <section className="gr-publico-wrap">
        <div className="gr-inner">
          <div style={{ textAlign: "center" }}>
            <div style={eyebrow}>{g.publicoEyebrow}</div>
            <h2 className="gr-h2" style={h2}>{g.publicoTitle}</h2>
          </div>
          <div className="gr-publico">
            {g.publico.map((item, i) => (
              <div key={i} className="gr-card">
                <span style={{ color: "#C79A6A", display: "block" }}>{PUBLICO_ICONS[i]}</span>
                <h3 style={{ fontFamily: "var(--font-gilda), Georgia, serif", fontWeight: 500, fontSize: "22px", lineHeight: 1.15, color: "#143C7A", margin: "22px 0 0" }}>{item}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* POR QUE ESCOLHER */}
      <section className="gr-motivos-wrap">
        <div>
          <div style={eyebrow}>{g.motivosEyebrow}</div>
          <h2 className="gr-h2" style={h2}>{g.motivosTitle}</h2>
        </div>
        <ul className="gr-motivos">
          {g.motivos.map((item, i) => (
            <li key={i} className="gr-motivo">
              <span style={{ color: "#143C7A", flex: "none", display: "flex" }}>{MOTIVO_ICONS[i]}</span>
              <span style={{ fontFamily: "var(--font-hnc), sans-serif", fontWeight: 500, fontSize: "16px", lineHeight: 1.35, color: "#143C7A" }}>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* COMO FUNCIONA */}
      <section className="gr-passos-wrap">
        <div style={{ textAlign: "center" }}>
          <div style={eyebrow}>{g.passosEyebrow}</div>
          <h2 className="gr-h2" style={h2}>{g.passosTitle}</h2>
        </div>
        <ol className="gr-passos">
          {g.passos.map((p, i) => (
            <li key={i} className="gr-passo">
              <span aria-hidden="true" style={{ fontFamily: "var(--font-gilda), Georgia, serif", fontSize: "56px", lineHeight: 1, color: "#C79A6A" }}>{String(i + 1).padStart(2, "0")}</span>
              <h3 style={{ fontFamily: "var(--font-gilda), Georgia, serif", fontWeight: 500, fontSize: "24px", lineHeight: 1.15, color: "#143C7A", margin: "20px 0 0" }}>{p.title}</h3>
              <p style={{ fontSize: "14.5px", lineHeight: 1.7, color: "#7A8694", margin: "12px 0 0" }}>{p.desc}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* CTA */}
      <section id="proposta" className="gr-cta" style={{ scrollMarginTop: "90px" }}>
        <div style={{ maxWidth: "760px", margin: "0 auto", textAlign: "center" }}>
          <div style={{ ...eyebrow, color: "rgba(255,255,255,.62)" }}>{g.ctaEyebrow}</div>
          <h2 className="gr-h2" style={{ ...h2, color: "#FFFFFF" }}>{g.ctaTitle}</h2>
          <p style={{ fontSize: "15px", lineHeight: 1.7, color: "#C7D0DA", margin: "22px auto 0", maxWidth: "560px" }}>{g.ctaP}</p>
          <div style={{ marginTop: "30px" }}>
            <div style={{ fontSize: "12.5px", letterSpacing: ".05em", color: "rgba(255,255,255,.55)" }}>{g.ctaTelLabel}</div>
            <a href={COMERCIAL_TEL_HREF} style={{ display: "inline-block", fontFamily: "var(--font-gilda), Georgia, serif", fontSize: "38px", lineHeight: 1.1, color: "#FFFFFF", textDecoration: "none", marginTop: "8px" }}>{COMERCIAL.telefone}</a>
          </div>
          <div className="gr-cta-btns">
            <a href={COMERCIAL_TEL_HREF} className="gr-btn gr-btn-gold">{g.ctaLigar}</a>
            <a href={mailto} className="gr-btn gr-btn-ghost">{g.ctaEmail}</a>
          </div>
        </div>
      </section>

      {/* ============ LOCALIZAÇÃO ============ */}
      <ContatoStrip dict={dict} style={{ margin: "64px 0 0", padding: 0 }} />
    </>
  );
}
