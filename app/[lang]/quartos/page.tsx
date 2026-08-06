import "./quartos.css";
import ContatoStrip from "@/components/ContatoStrip";
import { getQuartosCards } from "@/lib/data";
import { isLocale, localePath } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import { format } from "@/i18n/format";
import { pageMeta } from "@/i18n/seo";
import JsonLd from "@/components/JsonLd";
import { breadcrumbLd } from "@/lib/jsonld";
import { BOOKING_BASE } from "@/lib/booking";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const loc = isLocale(lang) ? lang : "pt";
  const dict = await getDictionary(lang);
  return pageMeta({ lang: loc, path: "/quartos", title: dict.quartosList.bannerTitle + dict.meta.titleSuffix, description: dict.meta.descQuartos, image: "/images/real/quartos/quarto-triplo-pousada-cataratas-foz-do-iguacu.webp" });
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

export default async function Quartos({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const loc = isLocale(lang) ? lang : "pt";
  const dict = await getDictionary(lang);
  const quartosCards = getQuartosCards(loc);
  return (
    <>
      <JsonLd data={breadcrumbLd(loc, [{ name: dict.nav.inicio, path: "/" }, { name: dict.nav.quartos, path: "/quartos" }])} />
      {/* HEADER BANNER */}
      <section
        style={{ position: "relative", width: "100%", height: "40vh", minHeight: "300px", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", background: "#143C7A" }}
      >
        <SlotImg src="/images/real/quartos/quarto-triplo-pousada-cataratas-foz-do-iguacu.webp" alt="Quartos da Pousada Cataratas em Foz do Iguaçu" />
        <div style={{ position: "absolute", inset: 0, background: "rgba(20,60,122,.46)" }} />
        <h1 style={{ position: "relative", fontFamily: "var(--font-gilda), Georgia, serif", fontWeight: 500, fontSize: "66px", lineHeight: 1, color: "#FFFFFF", textAlign: "center", margin: 0, padding: "0 22px" }}>
          {dict.quartosList.bannerTitle}
        </h1>
      </section>

      <main style={{ background: "#FFFFFF", overflow: "hidden", paddingTop: "54px" }}>
        {/* INTRO */}
        <section className="in-wrap q-intro">
          <div className="q-about">
            <div>
              <p className="q-dc" style={{ fontSize: "16.5px", lineHeight: 1.75, color: "#3A4654", margin: 0 }}>
                {dict.quartosList.aboutP1}
              </p>
              <p style={{ fontSize: "15px", lineHeight: 1.75, color: "#7A8694", margin: "26px 0 0" }}>
                {dict.quartosList.aboutP2}
              </p>
            </div>
            <div style={{ background: "#143C7A", color: "#FFFFFF", padding: "36px 32px" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: "18px" }}>
                  <span style={{ flex: "none", color: "#C79A6A", marginTop: "2px" }}>
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#C79A6A" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 21s-7-5.2-7-11a7 7 0 0 1 14 0c0 5.8-7 11-7 11z" />
                      <circle cx="12" cy="10" r="2.6" />
                    </svg>
                  </span>
                  <div>
                    <div style={{ fontSize: "11px", letterSpacing: ".22em", textTransform: "uppercase", color: "rgba(199,154,106,.85)" }}>{dict.quartosList.enderecoLabel}</div>
                    <div style={{ fontSize: "14px", lineHeight: 1.45, color: "#F4F1EB", marginTop: "7px" }}>{dict.quartosList.enderecoValue}</div>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "flex-start", gap: "18px" }}>
                  <span style={{ flex: "none", color: "#C79A6A", marginTop: "2px" }}>
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#C79A6A" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 4h3l1.6 4.2-2 1.4a12 12 0 0 0 5.8 5.8l1.4-2L20 16v3a1.5 1.5 0 0 1-1.6 1.5A15.5 15.5 0 0 1 3.5 5.6 1.5 1.5 0 0 1 5 4z" />
                    </svg>
                  </span>
                  <div>
                    <div style={{ fontSize: "11px", letterSpacing: ".22em", textTransform: "uppercase", color: "rgba(199,154,106,.85)" }}>{dict.quartosList.telefoneLabel}</div>
                    <div style={{ fontSize: "15px", lineHeight: 1.5, color: "#F4F1EB", marginTop: "7px" }}>+55 45 0000-0000</div>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "flex-start", gap: "18px" }}>
                  <span style={{ flex: "none", color: "#C79A6A", marginTop: "2px" }}>
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#C79A6A" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="5" width="18" height="14" rx="2" />
                      <path d="m3 7 9 6 9-6" />
                    </svg>
                  </span>
                  <div>
                    <div style={{ fontSize: "11px", letterSpacing: ".22em", textTransform: "uppercase", color: "rgba(199,154,106,.85)" }}>{dict.quartosList.emailLabel}</div>
                    <div style={{ fontSize: "15px", lineHeight: 1.5, color: "#F4F1EB", marginTop: "7px" }}>reservas@pousadacataratas.com.br</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* NOSSOS QUARTOS (cards) */}
        <section className="in-wrap q-intro q-sec" style={{ paddingBottom: "120px" }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ color: "#C79A6A", letterSpacing: ".42em", fontSize: "13px" }}>★★★★★</div>
            <h2 style={{ fontFamily: "var(--font-gilda), Georgia, serif", fontWeight: 500, fontSize: "58px", lineHeight: 1, color: "#143C7A", margin: "16px 0 0", letterSpacing: "-.01em" }}>
              {dict.quartosList.quartosTitle}
            </h2>
          </div>
          <div className="rc-grid" style={{ marginTop: "46px" }}>
            {quartosCards.map((c) => (
              <div key={c.id} style={{ display: "flex", flexDirection: "column", background: "#FBFAF7", height: "100%" }}>
                <div style={{ position: "relative", height: "248px", overflow: "hidden", background: "#143C7A" }}>
                  <SlotImg src={c.img} alt={format(dict.alt.quarto, { name: c.name })} />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,rgba(0,0,0,0) 52%,rgba(0,0,0,.52))" }} />
                  <div style={{ position: "absolute", left: "20px", bottom: "16px", display: "flex", alignItems: "center", gap: "12px", color: "#FFFFFF" }}>
                    <span style={{ fontSize: "10.5px", letterSpacing: ".24em", textTransform: "uppercase" }}>{c.tag}</span>
                    <span style={{ color: "#E7CBA6", letterSpacing: ".16em", fontSize: "10px" }}>★★★★★</span>
                  </div>
                </div>
                <div style={{ padding: "30px 30px 0", display: "flex", flexDirection: "column", flex: 1 }}>
                  <div style={{ fontFamily: "var(--font-gilda), Georgia, serif", fontWeight: 500, fontSize: "34px", lineHeight: 1, color: "#143C7A" }}>{c.name}</div>
                  <div style={{ display: "flex", gap: "30px", marginTop: "18px" }}>
                    <span style={{ display: "flex", alignItems: "center", gap: "9px", fontSize: "13px", letterSpacing: ".03em", color: "#5C6B7A" }}>
                      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#1E90C8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="8" r="3.2" />
                        <path d="M5 20a7 7 0 0 1 14 0" />
                      </svg>
                      {c.guests}
                    </span>
                    <span style={{ display: "flex", alignItems: "center", gap: "9px", fontSize: "13px", letterSpacing: ".03em", color: "#5C6B7A" }}>
                      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#1E90C8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" />
                      </svg>
                      {c.size}
                    </span>
                  </div>
                  <p style={{ fontSize: "14px", lineHeight: 1.65, color: "#8A94A0", margin: "18px 0 26px" }}>{c.desc}</p>
                  <a href={BOOKING_BASE} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "50px", marginTop: "auto", border: "2px solid #1E90C8", color: "#1E90C8", textDecoration: "none", fontSize: "11.5px", letterSpacing: ".2em", textTransform: "uppercase" }}>
                    {dict.quartosList.cardReservar}
                  </a>
                </div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "24px", padding: "0 30px", height: "56px", borderTop: "1px solid rgba(31,30,27,.1)" }}>
                  <div style={{ display: "flex", gap: "16px", color: "#A6AEB8" }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4.5 9.5a11 11 0 0 1 15 0M7.5 13a7 7 0 0 1 9 0" />
                      <circle cx="12" cy="16.5" r="1" />
                    </svg>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="6" width="18" height="7" rx="1.5" />
                      <path d="M7 17v1M12 17v1.5M17 17v1" />
                    </svg>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="5" width="18" height="12" rx="1.5" />
                      <path d="M9 21h6" />
                    </svg>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 12h16M6 12V8a2.5 2.5 0 0 1 5 0M8 19l-1-2M16 19l1-2" />
                    </svg>
                  </div>
                  <a href={localePath(lang, `/quartos/${c.slug}`)} style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "10.5px", letterSpacing: ".18em", textTransform: "uppercase", color: "#143C7A", textDecoration: "none" }}>
                    {dict.quartosList.cardMaisInfo + " "}<span style={{ fontSize: "15px", lineHeight: 1 }}>›</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ============ LOCALIZAÇÃO ============ */}
        <ContatoStrip dict={dict} style={{ margin: "64px 0 0", padding: 0 }} />
      </main>
    </>
  );
}
