import "./promocao.css";
import ContatoStrip from "@/components/ContatoStrip";
import { produtoDetails, getProdutos, getProdutoRelated } from "@/lib/data";
import { isLocale, locales, localePath } from "@/i18n/config";
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
  const produtos = getProdutos(loc);
  const p = produtos[slug] ?? produtos["longa-estadia"];
  return pageMeta({ lang: loc, path: `/promocao/${slug}`, title: p.name + dict.meta.titleSuffix, description: p.desc1, image: p.banner });
}

export function generateStaticParams() {
  return locales.flatMap((lang) =>
    Object.keys(produtoDetails).map((slug) => ({ lang, slug })),
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

export default async function Produto({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params;
  const loc = isLocale(lang) ? lang : "pt";
  const dict = await getDictionary(lang);
  const produtos = getProdutos(loc);
  const produtoRelated = getProdutoRelated(loc);
  const p = produtos[slug] ?? produtos["longa-estadia"];

  return (
    <>
      <JsonLd data={breadcrumbLd(loc, [{ name: dict.nav.inicio, path: "/" }, { name: dict.nav.promocoes, path: "/promocoes" }, { name: p.name, path: `/promocao/${slug}` }])} />
      {/* HERO BANNER */}
      <section style={{ position: "relative", width: "100%", height: "40vh", minHeight: "300px", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", background: "#143C7A" }}>
        <SlotImg src={p.banner} alt={format(dict.alt.produtoBanner, { name: p.name })} />
        <div style={{ position: "absolute", inset: 0, background: "rgba(20,60,122,.46)" }} />
        <h1 className="pp-banner-h1" style={{ position: "relative", fontFamily: "var(--font-gilda), Georgia, serif", fontWeight: 500, fontSize: "46px", lineHeight: 1, color: "#FFFFFF", textAlign: "center", margin: 0, padding: "0 22px" }}>{p.name}</h1>
      </section>

      {/* PRODUTO: 2 COLUNAS */}
      <section className="pp-prod">
        {/* ESQUERDA: imagem */}
        <div style={{ position: "relative", width: "100%", aspectRatio: "4/5", overflow: "hidden", background: "#143C7A" }}>
          <SlotImg src={p.foto} alt={format(dict.alt.produtoFoto, { name: p.name })} />
        </div>

        {/* DIREITA: detalhes */}
        <div>
          <h2 style={{ fontFamily: "var(--font-gilda), Georgia, serif", fontWeight: 500, fontSize: "40px", lineHeight: 1.04, color: "#143C7A", margin: 0 }}>{p.name}</h2>
          <p style={{ fontSize: "15px", lineHeight: 1.8, color: "#5C6B7A", margin: "26px 0 0" }}>{p.desc1}</p>
          <p style={{ fontSize: "15px", lineHeight: 1.8, color: "#5C6B7A", margin: "16px 0 0" }}>{p.desc2}</p>

          <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginTop: "36px" }}>
            <a href="https://wa.me/" className="pp-wa" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", height: "54px", background: "#143C7A", color: "#FFFFFF", textDecoration: "none", fontSize: "12px", letterSpacing: ".22em", textTransform: "uppercase", transition: "filter .15s ease" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#FFFFFF"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.004c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.13c-1.5 0-2.97-.4-4.25-1.16l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.37c0-4.54 3.7-8.23 8.25-8.23 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.82c0 4.54-3.7 8.23-8.24 8.23Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.13-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.42l-.48-.01c-.17 0-.43.06-.66.31-.23.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.1-.22-.16-.47-.28Z" /></svg>
              {dict.promocaoProduct.falarWhatsapp}
            </a>
            <a href="#" className="pp-resv" style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "54px", background: "#C79A6A", color: "#FFFFFF", textDecoration: "none", fontSize: "12px", letterSpacing: ".22em", textTransform: "uppercase", transition: "filter .15s ease" }}>{dict.promocaoProduct.reservarAgora}</a>
          </div>
        </div>
      </section>

      {/* OUTROS QUARTOS: 4 CARDS */}
      <section className="pp-rel">
        <h2 style={{ fontFamily: "var(--font-gilda), Georgia, serif", fontWeight: 500, fontSize: "34px", lineHeight: 1.05, color: "#143C7A", margin: "0 0 34px" }}>{dict.promocaoProduct.relTitle}</h2>
        <div className="pp-rel-grid">
          {produtoRelated.map((q) => (
            <div key={q.quartoSlug} style={{ background: "#FBFAF8", display: "flex", flexDirection: "column" }}>
              <div style={{ position: "relative", width: "100%", aspectRatio: "4/3", overflow: "hidden", background: "#143C7A" }}>
                <SlotImg src={q.img} alt={format(dict.alt.quarto, { name: q.name })} />
                {q.badge && (
                  <span style={{ position: "absolute", top: 0, right: 0, background: "#C79A6A", color: "#FFFFFF", fontSize: "10px", letterSpacing: ".2em", textTransform: "uppercase", padding: "7px 12px" }}>{dict.promocaoProduct.oferta}</span>
                )}
              </div>
              <div style={{ padding: "24px 20px 26px", display: "flex", flexDirection: "column", alignItems: "center", gap: "14px" }}>
                <h3 style={{ fontFamily: "var(--font-gilda), Georgia, serif", fontWeight: 500, fontSize: "24px", lineHeight: 1.1, color: "#1B2733", margin: 0, textAlign: "center" }}>{q.name}</h3>
                <a href={localePath(lang, `/quartos/${q.quartoSlug}`)} className="pp-vq" style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: "48px", marginTop: "4px", background: "#143C7A", color: "#FFFFFF", textDecoration: "none", fontSize: "11px", letterSpacing: ".2em", textTransform: "uppercase", transition: "filter .15s ease" }}>{dict.promocaoProduct.verQuarto}</a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* LOCALIZAÇÃO */}
      <ContatoStrip dict={dict} style={{ margin: 0, padding: 0 }} />
    </>
  );
}
