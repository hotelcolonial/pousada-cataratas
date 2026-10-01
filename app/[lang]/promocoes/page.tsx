import "./promocoes.css";
import ContatoStrip from "@/components/ContatoStrip";
import { isLocale, localePath } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import { pageMeta } from "@/i18n/seo";
import JsonLd from "@/components/JsonLd";
import { breadcrumbLd } from "@/lib/jsonld";
import { promosAtivas, promoTexto } from "@/lib/promos";
import { getProdutos } from "@/lib/data";
import PromoCard from "@/components/promo/PromoCard";
import type { Metadata } from "next";

// As promoções com prazo (`fim` em lib/promos.ts) saem sozinhas: a página
// regenera-se de hora a hora para refletir a vigência.
export const revalidate = 3600;

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const loc = isLocale(lang) ? lang : "pt";
  const dict = await getDictionary(lang);
  return pageMeta({ lang: loc, path: "/promocoes", title: dict.meta.titlePromocoes, description: dict.meta.descPromocoes, image: "/images/real/home/area-piscina-pousada-cataratas-foz-do-iguacu.webp" });
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

export default async function Promocoes({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const loc = isLocale(lang) ? lang : "pt";
  const produtos = getProdutos(loc);
  const dict = await getDictionary(lang);
  return (
    <>
      <JsonLd data={breadcrumbLd(loc, [{ name: dict.nav.inicio, path: "/" }, { name: dict.nav.promocoes, path: "/promocoes" }])} />
      {/* HEADER BANNER */}
      <section
        style={{ position: "relative", width: "100%", height: "40vh", minHeight: "300px", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", background: "#143C7A" }}
      >
        <SlotImg src="/images/real/home/area-piscina-pousada-cataratas-foz-do-iguacu.webp" alt={dict.alts.promocoesBanner} />
        <div style={{ position: "absolute", inset: 0, background: "rgba(20,60,122,.46)" }} />
        <h1 style={{ position: "relative", fontFamily: "var(--font-gilda), Georgia, serif", fontWeight: 500, fontSize: "clamp(32px, 8vw, 66px)", lineHeight: 1, color: "#FFFFFF", textAlign: "center", margin: 0, padding: "0 22px" }}>
          {dict.promocoesList.bannerTitle}
        </h1>
      </section>

      {/* INTRO 2 COLUNAS */}
      <section className="pr-sec">
        {/* ESQUERDA */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: "12px", letterSpacing: ".3em", textTransform: "uppercase", color: "#9AA3AD" }}>{dict.promocoesList.eyebrow}</div>
          <h2 style={{ fontFamily: "var(--font-gilda), Georgia, serif", fontWeight: 500, fontSize: "58px", lineHeight: 1.04, letterSpacing: "-.01em", color: "#143C7A", margin: "18px 0 0" }}>{dict.promocoesList.title}</h2>
          <div className="pr-paras" style={{ marginTop: "34px" }}>
            <p style={{ fontSize: "15px", lineHeight: 1.78, color: "#7A8694", margin: 0 }}>{dict.promocoesList.p1}</p>
            <p style={{ fontSize: "15px", lineHeight: 1.78, color: "#7A8694", margin: 0 }}>{dict.promocoesList.p2}</p>
          </div>

          {/* BANNER HORIZONTAL */}
          <div style={{ position: "relative", marginTop: "auto", paddingTop: "44px" }}>
            <div style={{ position: "relative", width: "100%", height: "112px", overflow: "hidden", background: "#143C7A", display: "flex", alignItems: "center" }}>
              <SlotImg src="/images/real/home/jardim-piscina-pousada-cataratas-foz-do-iguacu.webp" alt={dict.alts.promocoesJardimPiscina} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg,rgba(20,33,51,.82) 0%,rgba(20,33,51,.55) 60%,rgba(20,33,51,.7) 100%)" }} />
              <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", padding: "0 30px", gap: "20px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "22px" }}>
                  <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                  <div>
                    <div style={{ fontFamily: "var(--font-gilda), Georgia, serif", fontWeight: 500, fontSize: "26px", lineHeight: 1.1, color: "#FFFFFF" }}>{dict.promocoesList.bannerH}</div>
                    <div style={{ fontSize: "13px", color: "#C7D0DA", marginTop: "4px" }}>{dict.promocoesList.bannerSub}</div>
                  </div>
                </div>
                <a href="#ofertas" style={{ flex: "none", display: "inline-block", background: "#143C7A", color: "#FFFFFF", textDecoration: "none", fontSize: "12px", letterSpacing: ".22em", textTransform: "uppercase", padding: "14px 24px", border: 0 }}>{dict.promocoesList.bannerCta}</a>
              </div>
            </div>
          </div>
        </div>

        {/* DIREITA */}
        <div style={{ position: "relative", aspectRatio: "1/1", overflow: "hidden", background: "#C79A6A", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "48px 36px", textAlign: "center" }}>
          <SlotImg src="/images/real/home/fachada-frontal-pousada-cataratas-foz-do-iguacu.webp" alt={dict.alts.promocoesFachadaFrontal} />
          <div style={{ position: "absolute", inset: 0, background: "rgba(199,154,106,.82)" }} />
          <div style={{ position: "relative", width: "100%" }}>
            <h3 style={{ fontFamily: "var(--font-gilda), Georgia, serif", fontWeight: 500, fontSize: "38px", lineHeight: 1, color: "#FFFFFF", margin: 0 }}>{dict.promocoesList.reservasTitle}</h3>
            <div className="pr-resv-links" style={{ display: "flex", flexDirection: "column", gap: "9px", marginTop: "26px" }}>
              <a href="#">{dict.promocoesList.link1}</a>
              <a href="#">{dict.promocoesList.link2}</a>
              <a href="#ofertas">{dict.promocoesList.link3}</a>
            </div>
          </div>
        </div>
      </section>

      {/* GRID 3 PROMOÇÕES */}
      {/* GRELHA DE PROMOÇÕES — a lista vive em lib/promos.ts */}
      <section id="ofertas" className="pr-cards" style={{ scrollMarginTop: "90px" }}>
        {promosAtivas().map((p) => (
          <PromoCard
            key={p.slug}
            promo={p}
            texto={promoTexto(dict, p)}
            destaque={produtos[p.slug]?.destaque}
            cta={dict.promocoesList.cardCta}
            lang={lang}
            className="pr-card"
          />
        ))}
      </section>

      {/* ============ LOCALIZAÇÃO ============ */}
      <ContatoStrip dict={dict} style={{ margin: "64px 0 0", padding: 0 }} />
    </>
  );
}
