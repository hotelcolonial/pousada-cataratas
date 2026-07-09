import "./atracao.css";
import { atracaoDetails, atracaoOrder, getAtracoes, getAtracaoDoItems, getAtracaoSteps } from "@/lib/data";
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
  const atracoes = getAtracoes(loc);
  const a = atracoes[slug] ?? atracoes["cataratas"];
  return pageMeta({ lang: loc, path: `/atracoes/${slug}`, title: a.name + dict.meta.titleSuffix, description: a.desc1, image: a.banner });
}

export function generateStaticParams() {
  return locales.flatMap((lang) =>
    Object.keys(atracaoDetails).map((slug) => ({ lang, slug })),
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

export default async function Atracao({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params;
  const loc = isLocale(lang) ? lang : "pt";
  const dict = await getDictionary(lang);
  const atracoes = getAtracoes(loc);
  const doItems = getAtracaoDoItems(loc);
  const steps = getAtracaoSteps(loc);
  const a = atracoes[slug] ?? atracoes["cataratas"];

  // Derivados (mismos cálculos que o script).
  const distParts = String(a.specs[0].value).split(" ");
  const heroVal = distParts[0];
  const heroUnit = distParts[1] || "min";
  const fCarro = a.specs[0].value;
  const fDuracao = a.specs[1].value;
  const fHorario = a.specs[2].value;
  const fEntrada = a.specs[3].value;
  const fEpoca = dict.atracaoDetail.epocaValue;
  const mapSrc =
    "https://maps.google.com/maps?saddr=" +
    encodeURIComponent("Pousada Cataratas, R. Parigot de Souza, 180 - Yolanda, Foz do Iguaçu - PR, 85853-270") +
    "&daddr=" +
    encodeURIComponent(a.name + ", Foz do Iguaçu") +
    "&hl=pt-BR&output=embed";
  const related = atracaoOrder
    .filter((k) => k !== a.slug)
    .slice(0, 3)
    .map((k) => ({
      name: atracoes[k].name,
      dist: atracoes[k].specs[0].value + " " + dict.atracaoDetail.daPousada,
      img: atracoes[k].banner,
      href: "/atracoes/" + k,
    }));

  return (
    <>
      <JsonLd data={breadcrumbLd(loc, [{ name: dict.nav.inicio, path: "/" }, { name: dict.nav.atracoes, path: "/atracoes" }, { name: a.name, path: `/atracoes/${slug}` }])} />
      {/* HERO BANNER */}
      <section style={{ position: "relative", width: "100%", height: "46vh", minHeight: "360px", display: "flex", alignItems: "flex-end", overflow: "hidden", background: "#143C7A" }}>
        <SlotImg src={a.banner} alt={format(dict.alt.atracao, { name: a.name })} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,rgba(9,22,46,0) 30%,rgba(9,22,46,.5) 64%,rgba(9,22,46,.92))" }} />
        <div className="in-wrap" style={{ position: "relative", width: "100%", paddingBottom: "26px" }}>
          <div className="ad-herorow">
            <div>
              <div style={{ fontSize: "12px", letterSpacing: ".26em", textTransform: "uppercase", color: "rgba(255,255,255,.8)" }}>{a.eyebrow}</div>
              <h1 className="ad-banner-h1" style={{ fontFamily: "var(--font-gilda), Georgia, serif", fontWeight: 500, fontSize: "44px", lineHeight: 1.02, color: "#FFFFFF", margin: "12px 0 24px" }}>{a.name}</h1>
              <nav className="ad-tabs">
                <a className="ad-tab is-active" href="#sobre">{dict.atracaoDetail.tabDescricao}</a>
                <a className="ad-tab" href="#localizacao">{dict.atracaoDetail.tabComoChegar}</a>
              </nav>
            </div>
            <div style={{ textAlign: "right", flex: "none" }}>
              <div style={{ display: "flex", alignItems: "flex-end", gap: "6px", justifyContent: "flex-end", color: "#FFFFFF", lineHeight: 0.9 }}>
                <span style={{ fontFamily: "var(--font-gilda), Georgia, serif", fontSize: "78px" }}>{heroVal}</span>
                <span style={{ fontSize: "20px", color: "rgba(255,255,255,.82)", paddingBottom: "11px" }}>{heroUnit}</span>
              </div>
              <div style={{ fontSize: "11px", letterSpacing: ".2em", textTransform: "uppercase", color: "rgba(255,255,255,.66)", marginTop: "8px" }}>{dict.atracaoDetail.daPousada}</div>
            </div>
          </div>
        </div>
      </section>

      {/* DETALHE: HEADER + 2 COLUNAS */}
      <section className="in-wrap" style={{ paddingTop: "80px" }}>
        <header>
          <h2 className="ad-bigtitle">{a.name}</h2>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginTop: "18px" }}>
            <span style={{ display: "inline-flex", color: "#C79A6A" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11Z" /><circle cx="12" cy="10" r="2.4" /></svg>
            </span>
            <span style={{ fontSize: "12px", letterSpacing: ".22em", textTransform: "uppercase", color: "#5C6B7A" }}>{a.eyebrow} · Foz do Iguaçu</span>
          </div>
        </header>

        <div className="ad-two">
          {/* ESQUERDA: imagem apaisada */}
          <div style={{ position: "relative", width: "100%", aspectRatio: "16/11", overflow: "hidden", background: "#143C7A" }}>
            <SlotImg src={a.foto} alt={format(dict.alt.atracaoFoto, { name: a.name, eyebrow: a.eyebrow })} />
          </div>

          {/* DIREITA: card dados práticos */}
          <div style={{ background: "#143C7A", color: "#FFFFFF", padding: "44px 38px", display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {[
                { icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>, label: dict.atracaoDetail.rowTempoCarro, val: fCarro },
                { icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 8h14M5 8a2 2 0 0 1-2-2V5h18v1a2 2 0 0 1-2 2M6 8v11a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V8" /><path d="M10 12h4" /></svg>, label: dict.atracaoDetail.rowDuracao, val: fDuracao },
                { icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5" /><path d="M12 1v3M12 20v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M1 12h3M20 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1" /></svg>, label: dict.atracaoDetail.rowHorario, val: fHorario },
                { icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="6" width="20" height="12" rx="2" /><circle cx="12" cy="12" r="2.5" /><path d="M6 12h.01M18 12h.01" /></svg>, label: dict.atracaoDetail.rowEntrada, val: fEntrada },
                { icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M3 9h18M8 2v4M16 2v4" /></svg>, label: dict.atracaoDetail.rowEpoca, val: fEpoca, last: true },
              ].map((row) => (
                <div key={row.label} style={{ display: "flex", alignItems: "flex-start", gap: "16px", padding: "18px 0", ...(row.last ? {} : { borderBottom: "1px solid rgba(255,255,255,.12)" }) }}>
                  <span style={{ flex: "none", color: "#C79A6A", display: "flex", marginTop: "2px" }}>{row.icon}</span>
                  <div>
                    <div style={{ fontSize: "11px", letterSpacing: ".18em", textTransform: "uppercase", color: "rgba(199,154,106,.9)" }}>{row.label}</div>
                    <div style={{ fontSize: "16px", color: "#FFFFFF", marginTop: "6px" }}>{row.val}</div>
                  </div>
                </div>
              ))}
            </div>
            <a href="#" className="ad-card-cta" style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: "54px", marginTop: "30px", background: "#C79A6A", color: "#FFFFFF", textDecoration: "none", fontSize: "12px", letterSpacing: ".22em", textTransform: "uppercase", transition: "filter .15s ease" }}>{dict.atracaoDetail.cardCta}</a>
          </div>
        </div>
      </section>

      {/* DESCRIÇÃO + O QUE FAZER */}
      <section id="sobre" className="in-wrap">
        <div className="ad-body">
          {/* ESQUERDA */}
          <div>
            <p className="ad-drop" style={{ fontSize: "16px", lineHeight: 1.85, color: "#3F4D5A", margin: 0 }}>{a.desc1}</p>
            <p style={{ fontSize: "16px", lineHeight: 1.85, color: "#5C6B7A", margin: "20px 0 0" }}>{a.desc2}</p>

            <div style={{ borderTop: "1px solid #E7E0D6", margin: "48px 0 0", paddingTop: "40px" }}>
              <h3 style={{ fontFamily: "var(--font-gilda), Georgia, serif", fontWeight: 500, fontSize: "34px", lineHeight: 1.05, color: "#143C7A", margin: 0 }}>{dict.atracaoDetail.oQueFazer}</h3>
              <div className="ad-do">
                {(doItems[a.slug] ?? doItems["cataratas"]).map((d) => (
                  <div key={d} style={{ display: "flex", alignItems: "flex-start", gap: "14px" }}>
                    <span style={{ flex: "none", color: "#C79A6A", display: "flex", marginTop: "1px" }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
                    </span>
                    <span style={{ fontSize: "15px", lineHeight: 1.5, color: "#3F4D5A" }}>{d}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* DIREITA: sidebar sticky */}
          <aside>
            <div className="ad-sidebar-sticky" style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <a href="#" className="ad-side-1" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "11px", width: "100%", height: "56px", background: "#C79A6A", color: "#FFFFFF", textDecoration: "none", fontSize: "12px", letterSpacing: ".2em", textTransform: "uppercase", transition: "filter .15s ease" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M3 10h18M8 2v4M16 2v4" /></svg>
                {dict.atracaoDetail.sideReservar}
              </a>
              <a href="#localizacao" className="ad-side-2" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "11px", width: "100%", height: "56px", background: "#143C7A", color: "#FFFFFF", textDecoration: "none", fontSize: "12px", letterSpacing: ".2em", textTransform: "uppercase", transition: "filter .15s ease" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11Z" /><circle cx="12" cy="10" r="2.4" /></svg>
                {dict.atracaoDetail.sideComoChegar}
              </a>
            </div>
          </aside>
        </div>
      </section>

      {/* LOCALIZAÇÃO */}
      <section id="localizacao" style={{ marginTop: "96px", padding: 0 }}>
        <div className="ad-locstrip" style={{ display: "grid", gridTemplateColumns: "1fr" }}>
          <div style={{ position: "relative", minHeight: "360px", background: "#E9F0F6" }}>
            <iframe title={dict.atracaoDetail.mapaTitle} src={mapSrc} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0, display: "block" }} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
          </div>
          <div style={{ background: "#143C7A", color: "#FFFFFF", padding: "62px 56px", minWidth: 0, display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <h2 style={{ fontFamily: "var(--font-gilda), Georgia, serif", fontWeight: 500, fontSize: "38px", lineHeight: 1.08, letterSpacing: "-.01em", margin: 0 }}>{dict.atracaoDetail.comoChegarTitle}</h2>
            <p style={{ fontSize: "15px", lineHeight: 1.7, color: "rgba(255,255,255,.74)", margin: "18px 0 0", maxWidth: "38ch" }}>{dict.atracaoDetail.comoChegarP}</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 0, marginTop: "30px" }}>
              {(steps[a.slug] ?? steps["cataratas"]).map((st) => (
                <div key={st} style={{ display: "flex", alignItems: "flex-start", gap: "16px", padding: "16px 0", borderTop: "1px solid rgba(255,255,255,.14)" }}>
                  <span style={{ flex: "none", color: "#C79A6A", display: "flex", marginTop: "1px" }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 6l6 6-6 6" /></svg>
                  </span>
                  <span style={{ flex: 1, fontSize: "15px", lineHeight: 1.5, color: "rgba(255,255,255,.95)" }}>{st}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* OUTRAS ATRAÇÕES */}
      <section id="proximas" className="in-wrap" style={{ marginTop: "120px" }}>
        <h2 style={{ fontFamily: "var(--font-gilda), Georgia, serif", fontWeight: 500, fontSize: "34px", lineHeight: 1.05, color: "#143C7A", margin: 0 }}>{dict.atracaoDetail.outrasTitle}</h2>
        <div className="ad-rel">
          {related.map((r) => (
            <a key={r.href} href={localePath(lang, r.href)} style={{ position: "relative", aspectRatio: "3/4", overflow: "hidden", background: "#143C7A", textDecoration: "none", display: "block" }}>
              <SlotImg src={r.img} alt={format(dict.alt.atracao, { name: r.name })} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,rgba(0,0,0,0) 46%,rgba(9,22,46,.84))" }} />
              <div style={{ position: "absolute", left: "24px", bottom: "24px", right: "24px", color: "#FFFFFF" }}>
                <div style={{ fontFamily: "var(--font-gilda), Georgia, serif", fontSize: "28px", lineHeight: 1.08 }}>{r.name}</div>
                <div style={{ fontSize: "11px", letterSpacing: ".2em", textTransform: "uppercase", color: "rgba(255,255,255,.82)", marginTop: "10px" }}>{r.dist}</div>
              </div>
            </a>
          ))}
        </div>
      </section>
    </>
  );
}
