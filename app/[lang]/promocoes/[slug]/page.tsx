import "./promocao.css";
import ContatoStrip from "@/components/ContatoStrip";
import { promocaoDetails, getPromocoes } from "@/lib/data";
import { isLocale, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import { format } from "@/i18n/format";
import { pageMeta } from "@/i18n/seo";
import JsonLd from "@/components/JsonLd";
import { breadcrumbLd } from "@/lib/jsonld";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ lang: string; slug: string }> }): Promise<Metadata> {
  const { lang, slug } = await params;
  const loc = isLocale(lang) ? lang : "pt";
  const dict = await getDictionary(lang);
  const promocoes = getPromocoes(loc);
  const p = promocoes[slug] ?? promocoes["longa-estadia"];
  return pageMeta({ lang: loc, path: `/promocoes/${slug}`, title: p.name + dict.meta.titleSuffix, description: p.desc, image: p.img });
}

export function generateStaticParams() {
  return locales.flatMap((lang) =>
    Object.keys(promocaoDetails).map((slug) => ({ lang, slug })),
  );
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

export default async function Promocao({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params;
  const loc = isLocale(lang) ? lang : "pt";
  const dict = await getDictionary(lang);
  const promocoes = getPromocoes(loc);
  const p = promocoes[slug] ?? promocoes["longa-estadia"];

  return (
    <>
      <JsonLd data={breadcrumbLd(loc, [{ name: dict.nav.inicio, path: "/" }, { name: dict.nav.promocoes, path: "/promocoes" }, { name: p.name, path: `/promocoes/${slug}` }])} />
      {/* HERO BANNER */}
      <section style={{ position: "relative", width: "100%", height: "42vh", minHeight: "320px", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", background: "#143C7A" }}>
        <SlotImg src={p.img} alt={format(dict.alt.produtoBanner, { name: p.name })} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom,rgba(20,33,51,.42) 0%,rgba(20,33,51,.62) 100%)" }} />
        <div style={{ position: "relative", textAlign: "center", padding: "0 22px" }}>
          <div style={{ fontSize: "12px", letterSpacing: ".3em", textTransform: "uppercase", color: "#EDE6DA" }}>{dict.promocaoOffer.promocaoLabel}</div>
          <h1 style={{ fontFamily: "var(--font-gilda), Georgia, serif", fontWeight: 500, fontSize: "60px", lineHeight: 1.04, color: "#FFFFFF", margin: "16px 0 0" }}>{p.name}</h1>
        </div>
      </section>

      {/* BODY 2 COLUNAS */}
      <section className="pd-body">
        {/* ESQUERDA */}
        <div>
          <div style={{ fontSize: "12px", letterSpacing: ".3em", textTransform: "uppercase", color: "#9AA3AD" }}>{p.sub}</div>
          <h2 style={{ fontFamily: "var(--font-gilda), Georgia, serif", fontWeight: 500, fontSize: "44px", lineHeight: 1.06, color: "#143C7A", margin: "16px 0 0" }}>{dict.promocaoOffer.sobreTitle}</h2>
          <p style={{ fontSize: "16px", lineHeight: 1.8, color: "#3A4654", margin: "26px 0 0" }}>{p.desc}</p>
          <p style={{ fontSize: "15px", lineHeight: 1.8, color: "#7A8694", margin: "18px 0 0" }}>{p.desc2}</p>

          <div style={{ height: "1px", background: "rgba(31,30,27,.12)", margin: "46px 0" }} />

          <h3 style={{ fontFamily: "var(--font-gilda), Georgia, serif", fontWeight: 500, fontSize: "28px", lineHeight: 1.05, color: "#143C7A", margin: 0 }}>{dict.promocaoOffer.inclusoTitle}</h3>
          <div className="pd-cond" style={{ marginTop: "26px" }}>
            {p.conditions.map((c) => (
              <div key={c} style={{ display: "flex", alignItems: "flex-start", gap: "14px" }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C79A6A" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" style={{ flex: "none", marginTop: "2px" }}><path d="M20 6 9 17l-5-5" /></svg>
                <span style={{ fontSize: "15px", lineHeight: 1.6, color: "#3A4654" }}>{c}</span>
              </div>
            ))}
          </div>
        </div>

        {/* DIREITA: card oferta */}
        <div style={{ position: "relative", background: "#143C7A", color: "#FFFFFF", padding: "44px 38px", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
          <div style={{ fontSize: "12px", letterSpacing: ".26em", textTransform: "uppercase", color: "rgba(255,255,255,.6)" }}>{dict.promocaoOffer.descontoLabel}</div>
          <div style={{ fontFamily: "var(--font-hnc), 'Helvetica Neue', sans-serif", fontWeight: 300, fontSize: "88px", lineHeight: 0.9, color: "#FFFFFF", margin: "14px 0 0" }}>{p.discount}</div>
          <div style={{ fontSize: "13px", color: "rgba(255,255,255,.72)", marginTop: "14px" }}>{p.validity}</div>
          <div style={{ width: "46px", height: "1px", background: "rgba(199,154,106,.8)", margin: "26px 0" }} />
          <a href="#" className="pd-resv" style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", padding: "16px 22px", background: "#C79A6A", color: "#FFFFFF", textDecoration: "none", fontSize: "12px", letterSpacing: ".2em", textTransform: "uppercase", transition: "filter .15s ease" }}>{dict.promocaoOffer.reservarAgora}</a>
          <a href="#" className="pd-wa" style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: "9px", marginTop: "12px", padding: "16px 22px", background: "transparent", border: "1px solid rgba(255,255,255,.4)", color: "#FFFFFF", textDecoration: "none", fontSize: "12px", letterSpacing: ".2em", textTransform: "uppercase", transition: "background .15s ease" }}>{dict.promocaoOffer.falarWhatsapp}</a>
        </div>
      </section>

      {/* ============ LOCALIZAÇÃO ============ */}
      <ContatoStrip dict={dict} style={{ margin: "64px 0 0", padding: 0 }} />
    </>
  );
}
