import type { CSSProperties } from "react";
import "./home.css";
import BookingBar from "@/components/home/BookingBar";
import Testimonials from "@/components/home/Testimonials";
import ContatoStrip from "@/components/ContatoStrip";
import { getRgCards, getTesti, tagAccent, tagDark } from "@/lib/data";
import { isLocale, localePath } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import { format } from "@/i18n/format";
import { pageMeta } from "@/i18n/seo";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const loc = isLocale(lang) ? lang : "pt";
  const dict = await getDictionary(lang);
  return pageMeta({ lang: loc, path: "/", title: dict.meta.homeTitle, description: dict.meta.description });
}

// Reemplazo del <image-slot fit="cover"> del export: un <img> que llena el
// contenedor con object-fit:cover (mismo resultado visual que el slot).
function SlotImg({ src, alt = "", priority = false, pos }: { src: string; alt?: string; priority?: boolean; pos?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      decoding="async"
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: pos }}
    />
  );
}

const paraRelax: CSSProperties = { fontSize: "14.5px", lineHeight: 1.65, color: "#5C6B7A", margin: 0 };
const featTitle: CSSProperties = {
  fontFamily: "var(--font-hnc), 'Helvetica Neue', 'Archivo', Helvetica, Arial, sans-serif",
  fontWeight: 300,
  fontSize: "26px",
  lineHeight: 1.08,
  letterSpacing: "-.02em",
  color: "#143C7A",
};
const strFeatTitle: CSSProperties = {
  fontFamily: "var(--font-hnc), sans-serif",
  fontWeight: 500,
  fontSize: "16px",
  color: "#143C7A",
};
const strFeatDesc: CSSProperties = { fontSize: "12px", color: "#9AA3AD", marginTop: "4px" };
const newsDate: CSSProperties = {}; // .pc-news-date viene de home.css

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const loc = isLocale(lang) ? lang : "pt";
  const dict = await getDictionary(lang);
  const rgCards = getRgCards(loc);
  return (
    <div
      id="top"
      className="pc-page"
      style={{
        maxWidth: "100%",
        margin: "0 auto",
        background: "#FFFFFF",
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
        paddingBottom: 0,
      }}
    >
      {/* ============ HERO + BOOKING (100vh) ============ */}
      <section className="pc-hero-wrap" style={{ padding: 0, display: "flex", flexDirection: "column" }}>
        <div
          className="pc-hero"
          style={{ position: "relative", borderRadius: 0, overflow: "hidden", height: "calc(100vh - 70px)", minHeight: "520px", background: "#143C7A" }}
        >
          <SlotImg src="/images/real/home/pousada-cataratas-foz-do-iguacu-fachada.webp" alt="Fachada da Pousada Cataratas em Foz do Iguaçu, perto das Cataratas do Iguaçu" priority />
          <div
            style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,rgba(14,34,70,.5),rgba(9,22,46,.6))", pointerEvents: "none" }}
          />
          <div
            className="pc-hero-inner"
            style={{ position: "absolute", top: 0, left: 0, right: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "40px 24px", zIndex: 6 }}
          >
            <div style={{ fontSize: "13px", letterSpacing: ".34em", textTransform: "uppercase", color: "rgba(247,243,236,.9)" }}>
              {dict.home.heroEyebrow}
            </div>
            <div style={{ width: "54px", height: "1px", background: "rgba(247,243,236,.6)", margin: "24px 0 0" }} />
            <h1
              className="pc-hero-h1"
              style={{ fontFamily: "var(--font-hnc), sans-serif", fontWeight: 300, fontSize: "40px", lineHeight: 1.08, letterSpacing: "-.03em", color: "#F7F3EC", margin: "26px 0 0" }}
            >
              {dict.home.heroTitleA}
              <br />
              {dict.home.heroTitleB}
            </h1>
            <a
              href="#"
              className="pc-hero-cta"
              style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", marginTop: "36px", padding: "16px 44px", border: "1px solid #1E90C8", background: "#1E90C8", color: "#FFFFFF", textDecoration: "none", fontSize: "16px", letterSpacing: ".18em", textTransform: "uppercase", boxShadow: "0 16px 30px -14px rgba(30,144,200,.7)", transition: "background .18s,border-color .18s,transform .16s ease" }}
            >
              {dict.home.heroCta}
            </a>
          </div>
          <div style={{ position: "absolute", left: 0, right: 0, bottom: "28px", display: "flex", alignItems: "center", justifyContent: "center", gap: "11px", zIndex: 6 }}>
            <span style={{ width: "9px", height: "9px", borderRadius: "50%", background: "#F7F3EC" }} />
            <span style={{ width: "9px", height: "9px", borderRadius: "50%", background: "rgba(247,243,236,.4)" }} />
          </div>
        </div>

        <BookingBar />
      </section>

      {/* ============ A POUSADA / RELAX ============ */}
      <section className="pc-relax">
        <div style={{ position: "relative", alignSelf: "start" }}>
          <div className="pc-relax-img">
            <SlotImg src="/images/real/home/piscina-pousada-cataratas-foz-do-iguacu.webp" alt="Piscina da Pousada Cataratas em Foz do Iguaçu, com espreguiçadeiras e área de descanso" />
          </div>
          <div className="pc-relax-stat">
            <div style={{ fontFamily: "var(--font-gilda), Georgia, serif", fontWeight: 600, fontSize: "64px", lineHeight: 1 }}>{dict.home.relaxStatNum}</div>
            <div style={{ fontSize: "10px", letterSpacing: ".24em", textTransform: "uppercase", marginTop: "10px" }}>{dict.home.relaxStatLabel}</div>
          </div>
        </div>
        <div>
          <div style={{ fontSize: "12px", letterSpacing: ".24em", textTransform: "uppercase", color: "#1E90C8" }}>{dict.home.relaxEyebrow}</div>
          <h2 className="pc-relax-h">
            {dict.home.relaxHA}<br />{dict.home.relaxHB}<br />{dict.home.relaxHC}
          </h2>
          <div className="pc-relax-paras">
            <p style={paraRelax}>{dict.home.relaxP1}</p>
            <p style={paraRelax}>{dict.home.relaxP2}</p>
            <p style={paraRelax}>{dict.home.relaxP3}</p>
            <p style={paraRelax}>{dict.home.relaxP4}</p>
          </div>
        </div>
      </section>

      {/* ============ GRID DE QUARTOS ============ */}
      <section className="pc-rg">
        {rgCards.map((r) => (
          <a href={localePath(lang, `/quartos/${r.slug}`)} className="pc-rg-card" key={r.id} style={{ textDecoration: "none" }}>
            <SlotImg src={r.img} alt={format(dict.alt.quarto, { name: r.name })} pos={r.slug === "quarto-triplo" || r.slug === "quarto-quadruplo" ? "center 62%" : undefined} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,rgba(0,0,0,0) 42%,rgba(9,22,46,.74))", pointerEvents: "none" }} />
            <span style={r.tag === "accent" ? tagAccent : tagDark}>{r.price}</span>
            <div style={{ position: "absolute", left: "24px", bottom: "22px", color: "#FFFFFF" }}>
              <div style={{ fontFamily: "var(--font-gilda), Georgia, serif", fontWeight: 500, fontSize: "32px", letterSpacing: "-.01em" }}>{r.name}</div>
              <div style={{ display: "flex", gap: "30px", marginTop: "12px", fontSize: "11px", letterSpacing: ".14em", textTransform: "uppercase", whiteSpace: "nowrap", color: "rgba(255,255,255,.92)" }}>
                <span style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="8" r="3.4" />
                    <path d="M5.5 20a6.5 6.5 0 0 1 13 0" />
                  </svg>
                  {r.guests}
                </span>
                <span style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" />
                  </svg>
                  {r.area}
                </span>
              </div>
            </div>
          </a>
        ))}
      </section>

      {/* ============ PROMOÇÕES ============ */}
      <section id="promocoes" style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 30px 100px", scrollMarginTop: "90px" }}>
        <div className="pc-promo">
          <div style={{ display: "flex", flexDirection: "column", paddingRight: "24px" }}>
            <span style={{ fontFamily: "var(--font-hnc), sans-serif", fontSize: "12px", letterSpacing: ".32em", textTransform: "uppercase", color: "#9AA3AD" }}>{dict.home.promoEyebrow}</span>
            <h2 style={{ fontFamily: "var(--font-gilda), Georgia, serif", fontWeight: 300, fontSize: "62px", lineHeight: 1.0, letterSpacing: 0, color: "#143C7A", margin: "18px 0 0" }}>
              {dict.home.promoHA}<br />{dict.home.promoHB}
            </h2>
            <p style={{ fontSize: "15px", lineHeight: 1.66, color: "#7A8694", margin: "28px 0 0", maxWidth: "330px" }}>{dict.home.promoP}</p>
          </div>

          <div className="pc-promo-mid">
            <div style={{ position: "relative", width: "100%", height: "100%", minHeight: "520px", overflow: "hidden", background: "#143C7A" }}>
              <SlotImg src="/images/real/home/piscina-jardim-pousada-cataratas-foz-do-iguacu.webp" alt="Área da piscina e jardim da Pousada Cataratas em Foz do Iguaçu" />
            </div>
          </div>

          <div className="pc-promo-right pc-promo-list">
            <div className="pc-promo-item">
              <div className="pc-promo-thumb">
                <SlotImg src="/images/real/home/entrada-pousada-cataratas-foz-do-iguacu.webp" alt="Entrada da Pousada Cataratas em Foz do Iguaçu" />
              </div>
              <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "5px", minWidth: 0 }}>
                <span style={{ fontSize: "11px", letterSpacing: ".2em", textTransform: "uppercase", color: "#9AA3AD" }}>{dict.home.promoItem1Eyebrow}</span>
                <span style={{ fontFamily: "var(--font-gilda), Georgia, serif", fontWeight: 500, fontSize: "26px", lineHeight: 1.05, letterSpacing: "-.01em", color: "#143C7A" }}>{dict.home.promoItem1Name}</span>
              </div>
              <a href={localePath(lang, "/promocao/morador")} style={{ flex: "none", alignSelf: "center", minWidth: "78px", textAlign: "center", padding: "9px 16px", fontSize: "13px", fontWeight: 600, letterSpacing: ".04em", color: "#FFFFFF", background: "#143C7A", whiteSpace: "nowrap", textDecoration: "none" }}>{dict.home.verMais}</a>
            </div>

            <div style={{ height: "1px", background: "rgba(20,60,122,.1)" }} />

            <div className="pc-promo-item">
              <div className="pc-promo-thumb">
                <SlotImg src="/images/real/home/area-externa-pousada-cataratas-foz-do-iguacu.webp" alt="Área externa e jardim da Pousada Cataratas em Foz do Iguaçu" />
              </div>
              <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "5px", minWidth: 0 }}>
                <span style={{ fontSize: "11px", letterSpacing: ".2em", textTransform: "uppercase", color: "#9AA3AD" }}>{dict.home.promoItem2Eyebrow}</span>
                <span style={{ fontFamily: "var(--font-gilda), Georgia, serif", fontWeight: 500, fontSize: "26px", lineHeight: 1.05, letterSpacing: "-.01em", color: "#143C7A" }}>{dict.home.promoItem2Name}</span>
              </div>
              <a href={localePath(lang, "/promocao/agosto-encantador")} style={{ flex: "none", alignSelf: "center", minWidth: "78px", textAlign: "center", padding: "9px 16px", fontSize: "13px", fontWeight: 600, letterSpacing: ".04em", color: "#FFFFFF", background: "#C79A6A", whiteSpace: "nowrap", textDecoration: "none" }}>{dict.home.verMais}</a>
            </div>

            <div style={{ height: "1px", background: "rgba(20,60,122,.1)" }} />

            <div className="pc-promo-item">
              <div className="pc-promo-thumb">
                <SlotImg src="/images/real/home/cafe-da-manha-pousada-cataratas-foz-do-iguacu.webp" alt="Café da manhã da Pousada Cataratas em Foz do Iguaçu" />
              </div>
              <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "5px", minWidth: 0 }}>
                <span style={{ fontSize: "11px", letterSpacing: ".2em", textTransform: "uppercase", color: "#9AA3AD" }}>{dict.home.promoItem3Eyebrow}</span>
                <span style={{ fontFamily: "var(--font-gilda), Georgia, serif", fontWeight: 500, fontSize: "26px", lineHeight: 1.05, letterSpacing: "-.01em", color: "#143C7A" }}>{dict.home.promoItem3Name}</span>
              </div>
              <a href={localePath(lang, "/promocao/day-use")} style={{ flex: "none", alignSelf: "center", minWidth: "78px", textAlign: "center", padding: "9px 16px", fontSize: "13px", fontWeight: 600, letterSpacing: ".04em", color: "#FFFFFF", background: "#143C7A", whiteSpace: "nowrap", textDecoration: "none" }}>{dict.home.verMais}</a>
            </div>
          </div>
        </div>
      </section>

      {/* ============ FEATURE 2-CARDS ============ */}
      <section style={{ maxWidth: "1180px", margin: "0 auto", padding: "8px 70px 40px" }}>
        <div className="pc-feat2">
          <div className="pc-feat-card">
            <div className="pc-feat-ph">
              <SlotImg src="/images/real/home/cafe-da-manha-buffet-pousada-cataratas-foz-do-iguacu.webp" alt="Café da manhã com pães, frios, frutas e sucos na Pousada Cataratas em Foz do Iguaçu" />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <span style={featTitle}>{dict.home.feat1Title}</span>
              <span style={{ fontSize: "15px", lineHeight: 1.6, color: "#6B7480" }}>{dict.home.feat1Desc}</span>
            </div>
          </div>
          <div className="pc-feat-card">
            <div className="pc-feat-ph">
              <SlotImg src="/images/real/home/estacionamento-pousada-cataratas-foz-do-iguacu.webp" alt="Estacionamento privativo da Pousada Cataratas em Foz do Iguaçu" />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <span style={featTitle}>{dict.home.feat2Title}</span>
              <span style={{ fontSize: "15px", lineHeight: 1.6, color: "#6B7480" }}>{dict.home.feat2Desc}</span>
            </div>
          </div>
        </div>
      </section>

      {/* ============ A ESTRUTURA ============ */}
      <section className="pc-str-wrap">
        <div className="pc-str">
          <div className="pc-str-imgs">
            <div className="pc-str-imgA">
              <SlotImg src="/images/real/home/area-piscina-pousada-cataratas-foz-do-iguacu.webp" alt="Área da piscina da Pousada Cataratas em Foz do Iguaçu" />
            </div>
            <div className="pc-str-imgB">
              <SlotImg src="/images/real/home/fachada-frontal-pousada-cataratas-foz-do-iguacu.webp" alt="Fachada da Pousada Cataratas em Foz do Iguaçu" />
            </div>
            <div className="pc-str-stat">
              <div>
                <div className="pc-str-num">28</div>
                <div className="pc-str-lab">{dict.home.strStatQuartos}</div>
              </div>
              <div>
                <div className="pc-str-num">24h</div>
                <div className="pc-str-lab">{dict.home.strStatRecepcao}</div>
              </div>
              <div>
                <div className="pc-str-num">4.8</div>
                <div className="pc-str-lab">{dict.home.strStatAvaliacao}</div>
              </div>
              <div>
                <div className="pc-str-num">1</div>
                <div className="pc-str-lab">{dict.home.strStatPiscina}</div>
              </div>
            </div>
          </div>
          <div>
            <div style={{ fontSize: "12px", letterSpacing: ".24em", textTransform: "uppercase", color: "#1E90C8" }}>{dict.home.strEyebrow}</div>
            <h2 style={{ fontFamily: "var(--font-gilda), Georgia, serif", fontWeight: 500, fontSize: "58px", lineHeight: 1.0, letterSpacing: 0, color: "#143C7A", margin: "16px 0 0" }}>{dict.home.strTitle}</h2>
            <p style={{ fontSize: "14.5px", lineHeight: 1.7, color: "#5C6B7A", margin: "22px 0 0", maxWidth: "460px" }}>{dict.home.strDesc}</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginTop: "32px" }}>
              <div className="pc-str-bar">
                <div className="pc-str-fill" style={{ width: "82%", background: "#C79A6A" }}>
                  <span style={{ fontSize: "13px", fontWeight: 500 }}>{dict.home.strBar1}</span>
                </div>
              </div>
              <div className="pc-str-bar">
                <div className="pc-str-fill" style={{ width: "90%", background: "#143C7A" }}>
                  <span style={{ fontSize: "13px", fontWeight: 500 }}>{dict.home.strBar2}</span>
                </div>
              </div>
              <div className="pc-str-bar">
                <div className="pc-str-fill" style={{ width: "73%", background: "#143C7A" }}>
                  <span style={{ fontSize: "13px", fontWeight: 500 }}>{dict.home.strBar3}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="pc-str-feats">
          <div className="pc-str-feat">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#143C7A" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 3l7 2.5v5C19 16 15.5 19.5 12 21 8.5 19.5 5 16 5 10.5v-5L12 3z" />
              <path d="M9.2 12l2 2 3.6-3.8" />
            </svg>
            <div>
              <div style={strFeatTitle}>{dict.home.strFeat1Title}</div>
              <div style={strFeatDesc}>{dict.home.strFeat1Desc}</div>
            </div>
          </div>
          <div className="pc-str-feat">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#143C7A" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 7.5h18v9H3z" />
              <path d="M3 11h18M7 14.5h3" />
            </svg>
            <div>
              <div style={strFeatTitle}>{dict.home.strFeat2Title}</div>
              <div style={strFeatDesc}>{dict.home.strFeat2Desc}</div>
            </div>
          </div>
          <div className="pc-str-feat">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#143C7A" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="9" />
              <path d="M12 7v5l3 2" />
            </svg>
            <div>
              <div style={strFeatTitle}>{dict.home.strFeat3Title}</div>
              <div style={strFeatDesc}>{dict.home.strFeat3Desc}</div>
            </div>
          </div>
          <div className="pc-str-feat">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#143C7A" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 7h16v11H4z" />
              <path d="M4 7l8 6 8-6" />
            </svg>
            <div>
              <div style={strFeatTitle}>{dict.home.strFeat4Title}</div>
              <div style={strFeatDesc}>{dict.home.strFeat4Desc}</div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ BANNER PROMO ============ */}
      <section className="pc-bnr">
        <div className="pc-bnr-img">
          <SlotImg src="/images/real/home/jardim-piscina-pousada-cataratas-foz-do-iguacu.webp" alt="Jardim tropical e piscina da Pousada Cataratas em Foz do Iguaçu" />
        </div>
        <div className="pc-bnr-ov" />
        <div className="pc-bnr-in">
          <div className="pc-bnr-txt">
            <div style={{ fontSize: "12px", letterSpacing: ".26em", textTransform: "uppercase", color: "#EDE6DA" }}>{dict.home.bnrEyebrow}</div>
            <h2 style={{ fontFamily: "var(--font-gilda), Georgia, serif", fontWeight: 500, fontSize: "72px", lineHeight: 1.0, color: "#FFFFFF", margin: "16px 0 0" }}>{dict.home.bnrTitle}</h2>
            <p style={{ fontSize: "14.5px", lineHeight: 1.75, color: "#EDE6DA", margin: "22px 0 0" }}>{dict.home.bnrP}</p>
            <div style={{ fontSize: "11px", letterSpacing: ".24em", textTransform: "uppercase", color: "#EDE6DA", marginTop: "30px" }}>{dict.home.bnrPayLabel}</div>
            <div className="pc-pay">
              <div className="pc-pay-chip">
                <svg width="42" height="16" viewBox="0 0 48 16" fill="none">
                  <path d="M20.4 1.2L17.9 14.8h-3.2L17.2 1.2h3.2z" fill="#1A1F71" />
                  <path d="M32.5 1.5c-.64-.25-1.64-.52-2.9-.52-3.18 0-5.42 1.66-5.44 4.05-.02 1.76 1.6 2.74 2.82 3.33 1.25.6 1.67.98 1.67 1.52-.01.82-1 1.2-1.92 1.2-1.28 0-1.97-.18-3.03-.64l-.42-.2-.45 2.74c.75.34 2.15.63 3.6.65 3.38 0 5.58-1.64 5.6-4.18.02-1.4-.85-2.46-2.7-3.33-1.13-.57-1.82-.95-1.81-1.52 0-.51.59-1.05 1.85-1.05 1.06-.02 1.82.22 2.42.47l.29.14.44-2.66z" fill="#1A1F71" />
                  <path d="M40.7 1.2h-2.47c-.76 0-1.34.22-1.67 1l-4.75 11.6h3.36s.55-1.5.67-1.83h4.1c.1.43.39 1.83.39 1.83h2.97L40.7 1.2zm-3.94 8.27c.27-.7 1.28-3.4 1.28-3.4-.02.03.26-.7.42-1.16l.22 1.05.74 3.5h-2.66z" fill="#1A1F71" />
                  <path d="M14.2 1.2L11.1 10.5l-.33-1.66c-.58-1.92-2.4-4-4.43-5.04l2.87 10.97h3.39L17.6 1.2h-3.4z" fill="#1A1F71" />
                  <path d="M8.2 1.2H3.04L3 1.46c4.02 1 6.68 3.4 7.78 6.3L9.66 2.2c-.19-.76-.76-.98-1.46-1z" fill="#F9A51A" />
                </svg>
              </div>
              <div className="pc-pay-chip">
                <svg width="34" height="22" viewBox="0 0 34 22" fill="none">
                  <circle cx="12" cy="11" r="9" fill="#EB001B" />
                  <circle cx="22" cy="11" r="9" fill="#F79E1B" />
                  <path d="M17 4.2a8.98 8.98 0 0 1 0 13.6 8.98 8.98 0 0 1 0-13.6z" fill="#FF5F00" />
                </svg>
              </div>
              <div className="pc-pay-chip">{dict.home.bnrPix}</div>
            </div>
            <a
              href="#"
              className="pc-bnr-cta"
              style={{ display: "inline-block", marginTop: "32px", background: "#C79A6A", color: "#FFFFFF", fontSize: "16px", fontWeight: 700, letterSpacing: ".16em", textTransform: "uppercase", padding: "20px 46px", textDecoration: "none", boxShadow: "0 14px 30px rgba(199,154,106,.42)", transition: "transform .15s ease,box-shadow .15s ease,background .15s ease" }}
            >
              {dict.home.bnrCta}
            </a>
          </div>
          <div className="pc-bnr-circle" style={{ background: "#143C7A" }}>
            <div style={{ fontSize: "11px", letterSpacing: ".24em", textTransform: "uppercase", color: "#FFFFFF", opacity: 0.85 }}>{dict.home.bnrAte}</div>
            <div style={{ display: "flex", alignItems: "flex-start", fontFamily: "var(--font-hnc), 'Helvetica Neue', 'Archivo', Helvetica, Arial, sans-serif", fontWeight: 900, color: "#FFFFFF", lineHeight: 0.9, margin: "18px 0 18px" }}>
              <span style={{ fontSize: "92px" }}>10</span>
              <span style={{ fontSize: "40px", marginTop: "8px" }}>%</span>
            </div>
            <div style={{ fontSize: "11px", letterSpacing: ".22em", textTransform: "uppercase", color: "#FFFFFF", opacity: 0.85, maxWidth: "150px", lineHeight: 1.5 }}>{dict.home.bnrOff}</div>
          </div>
        </div>
      </section>

      {/* ============ NOTICIAS / STAY TUNED ============ */}
      <section className="pc-news-wrap">
        <div style={{ textAlign: "center", maxWidth: "620px", margin: "0 auto", flex: "none" }}>
          <div style={{ fontSize: "12px", letterSpacing: ".28em", textTransform: "uppercase", color: "#8A97A6" }}>{dict.home.newsEyebrow}</div>
          <h2 style={{ fontFamily: "var(--font-gilda), Georgia, serif", fontWeight: 500, fontSize: "48px", lineHeight: 1.0, color: "#143C7A", margin: "10px 0 0" }}>{dict.home.newsTitle}</h2>
          <p style={{ fontSize: "14px", lineHeight: 1.6, color: "#8A97A6", margin: "14px 0 0" }}>{dict.home.newsP}</p>
        </div>
        <div className="pc-news">
          <a href={localePath(lang, "/atracoes/cataratas")} className="pc-news-card pc-n-a" style={{ textDecoration: "none", color: "inherit" }}>
            <div style={{ position: "relative", flex: 1, minHeight: "120px", background: "#143C7A" }}>
              <SlotImg src="/images/real/atracoes/cataratas-do-iguacu-foz.webp" alt="Cataratas do Iguaçu com arco-íris, a poucos minutos da Pousada Cataratas em Foz do Iguaçu" />
            </div>
            <div style={{ background: "#FFFFFF", boxShadow: "0 16px 40px rgba(20,33,51,.08)", padding: "22px 26px 26px", flex: "none" }}>
              <div className="pc-news-date" style={newsDate}>{dict.home.newsCard1Date}</div>
              <h3 style={{ fontFamily: "var(--font-gilda), Georgia, serif", fontWeight: 600, fontSize: "26px", lineHeight: 1.05, color: "#143C7A", margin: "10px 0 0" }}>{dict.home.newsCard1Title}</h3>
              <p style={{ fontSize: "13px", lineHeight: 1.6, color: "#8A97A6", margin: "20px 0 0" }}>{dict.home.newsCard1Desc}</p>
              <span className="pc-news-btn">{dict.home.newsBtn}</span>
            </div>
          </a>
          <div className="pc-news-card pc-n-quote" style={{ background: "#C79A6A", padding: "36px 34px", alignItems: "center", textAlign: "center", justifyContent: "center" }}>
            <h3 style={{ fontFamily: "var(--font-gilda), Georgia, serif", fontWeight: 500, fontSize: "28px", lineHeight: 1.12, color: "#FFFFFF", margin: 0 }}>{dict.home.newsQuoteTitle}</h3>
            <div style={{ fontSize: "11px", letterSpacing: ".2em", textTransform: "uppercase", color: "#FFFFFF", opacity: 0.9, marginTop: "18px" }}>{dict.home.newsQuoteHandle}</div>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="#FFFFFF" style={{ opacity: 0.9, marginTop: "14px" }}>
              <path d="M7 7h4v4c0 2.2-1.4 3.7-3.6 4.2l-.4-1.2C8.3 13.6 9 12.9 9 11.8H7V7zm6 0h4v4c0 2.2-1.4 3.7-3.6 4.2l-.4-1.2c1.3-.4 2-1.1 2-2.2h-2V7z" />
            </svg>
          </div>
          <a href={localePath(lang, "/atracoes/parque-das-aves")} className="pc-news-card pc-n-relax" style={{ position: "relative", background: "#143C7A", minHeight: "160px", textDecoration: "none", color: "inherit" }}>
            <SlotImg src="/images/real/atracoes/parque-das-aves-foz-do-iguacu.webp" alt="Entrada do Parque das Aves em Foz do Iguaçu" />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,rgba(0,0,0,0) 45%,rgba(9,22,46,.78))", pointerEvents: "none" }} />
            <div style={{ position: "absolute", left: "24px", right: "24px", bottom: "24px" }}>
              <div className="pc-news-date" style={{ color: "#EDE6DA" }}>{dict.home.newsCard2Date}</div>
              <h3 style={{ fontFamily: "var(--font-gilda), Georgia, serif", fontWeight: 600, fontSize: "28px", lineHeight: 1.05, color: "#FFFFFF", margin: "10px 0 0" }}>{dict.home.newsCard2Title}</h3>
            </div>
          </a>
          <a href={localePath(lang, "/atracoes/compras-paraguai")} className="pc-news-card pc-n-around" style={{ textDecoration: "none", color: "inherit" }}>
            <div style={{ position: "relative", flex: 1, minHeight: "120px", background: "#143C7A" }}>
              <SlotImg src="/images/real/atracoes/compras-ciudad-del-este-paraguai.webp" alt="Compras em Ciudad del Este, no Paraguai, perto de Foz do Iguaçu" />
            </div>
            <div style={{ background: "#FFFFFF", boxShadow: "0 16px 40px rgba(20,33,51,.08)", padding: "22px 26px 26px", flex: "none" }}>
              <div className="pc-news-date" style={newsDate}>{dict.home.newsCard3Date}</div>
              <h3 style={{ fontFamily: "var(--font-gilda), Georgia, serif", fontWeight: 600, fontSize: "26px", lineHeight: 1.05, color: "#143C7A", margin: "10px 0 0" }}>{dict.home.newsCard3Title}</h3>
              <p style={{ fontSize: "13px", lineHeight: 1.6, color: "#8A97A6", margin: "20px 0 0" }}>{dict.home.newsCard3Desc}</p>
              <span className="pc-news-btn">{dict.home.newsBtn}</span>
            </div>
          </a>
          <div className="pc-news-card pc-n-dark" style={{ background: "#143C7A", padding: "30px", alignItems: "center", textAlign: "center", justifyContent: "center" }}>
            <div style={{ fontFamily: "var(--font-gilda), Georgia, serif", fontWeight: 500, fontSize: "24px", color: "#FFFFFF" }}>{dict.home.newsSite}</div>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C79A6A" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" style={{ marginTop: "14px" }}>
              <path d="M9 15l6-6M10.5 6.5l1-1a3.5 3.5 0 0 1 5 5l-1 1M13.5 17.5l-1 1a3.5 3.5 0 0 1-5-5l1-1" />
            </svg>
          </div>
          <a href={localePath(lang, "/atracoes/marco-tres-fronteiras")} className="pc-news-card pc-n-daily" style={{ position: "relative", background: "#143C7A", minHeight: "160px", textDecoration: "none", color: "inherit" }}>
            <SlotImg src="/images/real/atracoes/marco-das-tres-fronteiras-foz-do-iguacu.webp" alt="Marco das Três Fronteiras entre Brasil, Argentina e Paraguai em Foz do Iguaçu" />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,rgba(0,0,0,0) 45%,rgba(9,22,46,.78))", pointerEvents: "none" }} />
            <div style={{ position: "absolute", left: "24px", right: "24px", bottom: "24px" }}>
              <div className="pc-news-date" style={{ color: "#EDE6DA" }}>{dict.home.newsCard4Date}</div>
              <h3 style={{ fontFamily: "var(--font-gilda), Georgia, serif", fontWeight: 600, fontSize: "28px", lineHeight: 1.05, color: "#FFFFFF", margin: "10px 0 0" }}>{dict.home.newsCard4Title}</h3>
            </div>
          </a>
        </div>
      </section>

      {/* ============ RESEÑAS ============ */}
      <Testimonials data={getTesti(loc)} />

      {/* ============ LOCALIZAÇÃO ============ */}
      <ContatoStrip dict={dict} style={{ margin: "64px 0 0", padding: 0 }} />
    </div>
  );
}
