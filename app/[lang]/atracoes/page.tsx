import "./atracoes.css";
import { getAtracoesFeatured, getAtracoesCards, getAtracoesNearby } from "@/lib/data";
import { isLocale, localePath } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import { format } from "@/i18n/format";
import { pageMeta } from "@/i18n/seo";
import JsonLd from "@/components/JsonLd";
import { breadcrumbLd } from "@/lib/jsonld";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const loc = isLocale(lang) ? lang : "pt";
  const dict = await getDictionary(lang);
  return pageMeta({ lang: loc, path: "/atracoes", title: dict.atracoesList.bannerTitle + dict.meta.titleSuffix, description: dict.meta.descAtracoes, image: "/images/real/atracoes/cataratas-do-iguacu-vista-aerea-foz-do-iguacu.webp" });
}

// Reemplazo del <image-slot fit="cover"> del export.
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

export default async function Atracoes({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const loc = isLocale(lang) ? lang : "pt";
  const dict = await getDictionary(lang);
  const atracoesFeatured = getAtracoesFeatured(loc);
  const atracoesCards = getAtracoesCards(loc);
  const atracoesNearby = getAtracoesNearby(loc);
  return (
    <>
      <JsonLd data={breadcrumbLd(loc, [{ name: dict.nav.inicio, path: "/" }, { name: dict.nav.atracoes, path: "/atracoes" }])} />
      {/* HERO BANNER */}
      <section
        style={{ position: "relative", width: "100%", height: "40vh", minHeight: "300px", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", background: "#143C7A" }}
      >
        <SlotImg src="/images/real/atracoes/cataratas-do-iguacu-vista-aerea-foz-do-iguacu.webp" alt="Cataratas do Iguaçu em Foz do Iguaçu" />
        <div style={{ position: "absolute", inset: 0, background: "rgba(20,60,122,.46)" }} />
        <h1 style={{ position: "relative", fontFamily: "var(--font-gilda), Georgia, serif", fontWeight: 500, fontSize: "46px", lineHeight: 1, color: "#FFFFFF", textAlign: "center", margin: 0, padding: "0 22px" }}>
          {dict.atracoesList.bannerTitle}
        </h1>
      </section>

      <main style={{ background: "#FFFFFF", overflow: "hidden", paddingTop: "96px" }}>
        {/* INTRO */}
        <section className="in-wrap" style={{ paddingBottom: "24px" }}>
          <div className="at-intro">
            <div>
              <div className="at-eyebrow">{dict.atracoesList.introEyebrow}</div>
              <h2 className="at-introtitle">
                {dict.atracoesList.introTitleA}<br />{dict.atracoesList.introTitleB}
              </h2>
            </div>
            <div className="at-introcols">
              <p style={{ fontSize: "15.5px", lineHeight: 1.75, color: "#5C6B7A", margin: 0 }}>{dict.atracoesList.introP1}</p>
              <p style={{ fontSize: "15.5px", lineHeight: 1.75, color: "#5C6B7A", margin: 0 }}>{dict.atracoesList.introP2}</p>
            </div>
          </div>
        </section>

        {/* DESTAQUES */}
        <section className="in-wrap at-sec">
          <div className="at-feat">
            {atracoesFeatured.map((f) => {
              const slug = f.href.split("atracao=")[1];
              return (
                <div className={f.revClass ? `at-frow ${f.revClass}` : "at-frow"} key={f.id}>
                  <div className="at-fimg">
                    <div className="at-imgbox">
                      <SlotImg src={f.img} alt={format(dict.alt.atracao, { name: f.name })} />
                    </div>
                    <div className={f.badgeSide ? `at-badge ${f.badgeSide}` : "at-badge"}>
                      <div className="at-fnum">{f.dist}</div>
                      <div className="at-flab">{f.distLabel}</div>
                    </div>
                  </div>
                  <div>
                    <div className="at-eyebrow">{f.eyebrow}</div>
                    <h3 className="at-fname">{f.name}</h3>
                    <p style={{ fontSize: "15.5px", lineHeight: 1.75, color: "#5C6B7A", margin: "20px 0 0" }}>{f.desc}</p>
                    <a href={localePath(lang, `/atracoes/${slug}`)} className="at-flink">
                      {dict.atracoesList.featSaibaMais + " "}<span style={{ fontSize: "16px" }}>›</span>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* GRID DE CARTÕES */}
        <section className="in-wrap at-sec">
          <h2 className="at-h2">{dict.atracoesList.gridTitle}</h2>
          <div className="at-cards" style={{ marginTop: "36px" }}>
            {atracoesCards.map((c) => (
              <a className="at-card" key={c.id} href={c.url} target="_blank" rel="noopener noreferrer" style={{ display: "block", textDecoration: "none", color: "inherit" }}>
                <SlotImg src={c.img} alt={format(dict.alt.atracao, { name: c.name })} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,rgba(0,0,0,0) 48%,rgba(9,22,46,.82))" }} />
                <span style={{ position: "absolute", top: "16px", right: "16px", padding: "7px 13px", background: "#C79A6A", color: "#FFFFFF", fontSize: "10.5px", letterSpacing: ".14em", textTransform: "uppercase" }}>{c.badge}</span>
                <div style={{ position: "absolute", left: "22px", bottom: "22px", right: "22px", color: "#FFFFFF" }}>
                  <div style={{ fontFamily: "var(--font-gilda), Georgia, serif", fontSize: "27px", lineHeight: 1.08, letterSpacing: "-.01em" }}>{c.name}</div>
                  <div style={{ fontSize: "11px", letterSpacing: ".2em", textTransform: "uppercase", color: "rgba(255,255,255,.82)", marginTop: "10px" }}>{c.meta}</div>
                </div>
              </a>
            ))}
          </div>
        </section>
      </main>

      {/* COMO CHEGAR / MAPA + ATRAÇÕES */}
      <section style={{ margin: "96px 0", padding: 0 }}>
        <div className="at-locstrip">
          <div style={{ position: "relative", minHeight: "360px", background: "#E9F0F6" }}>
            <iframe
              title={dict.atracoesList.locMapaTitle}
              src="https://www.google.com/maps?cid=9336784945676779755&hl=pt-BR&gl=BR&output=embed"
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0 }}
            />
          </div>
          <div style={{ background: "#143C7A", color: "#FFFFFF", padding: "62px 56px", minWidth: 0, display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <h2 style={{ fontFamily: "var(--font-gilda), Georgia, serif", fontWeight: 500, fontSize: "38px", lineHeight: 1.08, letterSpacing: "-.01em", margin: 0 }}>{dict.atracoesList.locTitle}</h2>
            <p style={{ fontSize: "15px", lineHeight: 1.7, color: "rgba(255,255,255,.74)", margin: "18px 0 0", maxWidth: "38ch" }}>{dict.atracoesList.locP}</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 0, marginTop: "30px" }}>
              {atracoesNearby.map((n) => (
                <div key={n.name} style={{ display: "flex", alignItems: "center", gap: "16px", padding: "16px 0", borderTop: "1px solid rgba(255,255,255,.14)" }}>
                  <span style={{ flex: "none", color: "#C79A6A", display: "flex" }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11Z" />
                      <circle cx="12" cy="10" r="2.4" />
                    </svg>
                  </span>
                  <span style={{ flex: 1, fontSize: "15px", color: "rgba(255,255,255,.95)" }}>{n.name}</span>
                  <span style={{ flex: "none", fontSize: "12px", letterSpacing: ".14em", textTransform: "uppercase", color: "rgba(255,255,255,.6)" }}>{n.dist}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section style={{ margin: 0, padding: 0 }}>
        <div style={{ position: "relative", minHeight: "420px", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
          <SlotImg src="/images/real/home/piscina-lazer-pousada-cataratas-foz-do-iguacu.webp" alt="Piscina da Pousada Cataratas em Foz do Iguaçu" />
          <div style={{ position: "absolute", inset: 0, background: "rgba(11,24,46,.62)" }} />
          <div style={{ position: "relative", textAlign: "center", padding: "84px 24px", maxWidth: "760px", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <span style={{ fontSize: "12px", letterSpacing: ".26em", textTransform: "uppercase", color: "rgba(255,255,255,.78)" }}>{dict.atracoesList.ctaEyebrow}</span>
            <h2 style={{ fontFamily: "var(--font-gilda), Georgia, serif", fontWeight: 500, fontSize: "46px", lineHeight: 1.1, letterSpacing: "-.01em", color: "#FFFFFF", margin: "18px 0 0" }}>{dict.atracoesList.ctaTitle}</h2>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", justifyContent: "center", marginTop: "34px" }}>
              <a href={localePath(lang, "/quartos")} className="at-cta-primary" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", background: "#C79A6A", color: "#FFFFFF", textDecoration: "none", fontSize: "12px", letterSpacing: ".18em", textTransform: "uppercase", padding: "17px 36px", border: "1px solid #C79A6A", transition: "filter .15s ease" }}>
                {dict.atracoesList.ctaPrimary}
              </a>
              <a href={localePath(lang, "/galeria")} className="at-cta-ghost" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", background: "transparent", color: "#FFFFFF", textDecoration: "none", fontSize: "12px", letterSpacing: ".18em", textTransform: "uppercase", padding: "17px 36px", border: "1px solid #C79A6A", transition: "background .15s ease" }}>
                {dict.atracoesList.ctaGhost}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
