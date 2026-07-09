import "./galeria.css";
import GaleriaFilter from "@/components/galeria/GaleriaFilter";
import ContatoStrip from "@/components/ContatoStrip";
import { getGaleriaShots, getGaleriaTabs } from "@/lib/data";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import { pageMeta } from "@/i18n/seo";
import JsonLd from "@/components/JsonLd";
import { breadcrumbLd } from "@/lib/jsonld";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const loc = isLocale(lang) ? lang : "pt";
  const dict = await getDictionary(lang);
  return pageMeta({ lang: loc, path: "/galeria", title: dict.galeria.bannerTitle + dict.meta.titleSuffix, description: dict.meta.descGaleria, image: "/images/real/home/area-piscina-pousada-cataratas-foz-do-iguacu.webp" });
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

export default async function Galeria({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const loc = isLocale(lang) ? lang : "pt";
  const dict = await getDictionary(lang);
  return (
    <>
      <JsonLd data={breadcrumbLd(loc, [{ name: dict.nav.inicio, path: "/" }, { name: dict.nav.galeria, path: "/galeria" }])} />
      {/* HEADER BANNER */}
      <section
        style={{ position: "relative", width: "100%", height: "40vh", minHeight: "300px", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", background: "#143C7A" }}
      >
        <SlotImg src="/images/real/home/piscina-pousada-cataratas-foz-do-iguacu.webp" alt="Piscina e área de lazer da Pousada Cataratas em Foz do Iguaçu" />
        <div style={{ position: "absolute", inset: 0, background: "rgba(20,60,122,.46)" }} />
        <h1 style={{ position: "relative", fontFamily: "var(--font-gilda), Georgia, serif", fontWeight: 500, fontSize: "66px", lineHeight: 1, color: "#FFFFFF", textAlign: "center", margin: 0, padding: "0 22px" }}>
          {dict.galeria.bannerTitle}
        </h1>
      </section>

      <main style={{ background: "#FFFFFF", overflow: "hidden", paddingTop: "54px" }}>
        {/* EQUIPE / INTRO TEXTO + RETRATOS */}
        <section className="in-wrap" style={{ maxWidth: "1240px" }}>
          <div className="gp-row">
            <h2 className="in-h2" style={{ fontFamily: "var(--font-gilda), Georgia, serif", fontSize: "40px", lineHeight: 1.14, color: "#143C7A", letterSpacing: "-.01em", fontWeight: 500, margin: 0, textAlign: "right" }}>
              {dict.galeria.introH}
            </h2>
            <div className="gp-cards">
              <div style={{ position: "relative", aspectRatio: "1/1", overflow: "hidden", background: "#143C7A" }}>
                <SlotImg src="/images/real/home/area-piscina-pousada-cataratas-foz-do-iguacu.webp" alt="Área da piscina da Pousada Cataratas em Foz do Iguaçu" />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,rgba(0,0,0,0) 52%,rgba(9,22,46,.7))" }} />
                <div style={{ position: "absolute", left: 0, right: 0, bottom: "22px", textAlign: "center", color: "#FFFFFF" }}>
                  <div style={{ fontSize: "22px", lineHeight: 1.1 }}>{dict.galeria.card1Title}</div>
                  <div style={{ marginTop: "7px", fontSize: "11px", letterSpacing: ".22em", textTransform: "uppercase", color: "rgba(255,255,255,.82)" }}>{dict.galeria.card1Sub}</div>
                </div>
              </div>
              <div style={{ position: "relative", aspectRatio: "1/1", overflow: "hidden", background: "#143C7A" }}>
                <SlotImg src="/images/real/quartos/quarto-duplo-pousada-cataratas-foz-do-iguacu.webp" alt="Quarto Duplo da Pousada Cataratas em Foz do Iguaçu" />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,rgba(0,0,0,0) 52%,rgba(9,22,46,.7))" }} />
                <div style={{ position: "absolute", left: 0, right: 0, bottom: "22px", textAlign: "center", color: "#FFFFFF" }}>
                  <div style={{ fontSize: "22px", lineHeight: 1.1 }}>{dict.galeria.card2Title}</div>
                  <div style={{ marginTop: "7px", fontSize: "11px", letterSpacing: ".22em", textTransform: "uppercase", color: "rgba(255,255,255,.82)" }}>{dict.galeria.card2Sub}</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* GALERIA FILTRÁVEL */}
        <section className="in-wrap g-sec" style={{ maxWidth: "1240px" }}>
          <GaleriaFilter shots={getGaleriaShots(loc)} tabs={getGaleriaTabs(loc)} />
        </section>

        {/* ============ LOCALIZAÇÃO ============ */}
        <ContatoStrip dict={dict} style={{ margin: "64px 0 0", padding: 0 }} />
      </main>
    </>
  );
}
