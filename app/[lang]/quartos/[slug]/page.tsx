import "./quarto.css";
import { quartoRooms, getRooms, getQuartoAmenities, getQuartoAround } from "@/lib/data";
import QuartoBooking from "@/components/quarto/QuartoBooking";
import RoomCarousel from "@/components/quarto/RoomCarousel";
import ContatoStrip from "@/components/ContatoStrip";
import { isLocale, locales, localePath } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import { format } from "@/i18n/format";
import { pageMeta } from "@/i18n/seo";
import JsonLd from "@/components/JsonLd";
import { productLd, breadcrumbLd } from "@/lib/jsonld";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ lang: string; slug: string }> }): Promise<Metadata> {
  const { lang, slug } = await params;
  const loc = isLocale(lang) ? lang : "pt";
  const dict = await getDictionary(lang);
  const rooms = getRooms(loc);
  const r = rooms[slug] ?? rooms["quarto-duplo"];
  return pageMeta({ lang: loc, path: `/quartos/${slug}`, title: r.name + dict.meta.titleSuffix, description: r.longDesc, image: r.img });
}

export function generateStaticParams() {
  return locales.flatMap((lang) =>
    Object.keys(quartoRooms).map((slug) => ({ lang, slug })),
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

export default async function Quarto({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params;
  const loc = isLocale(lang) ? lang : "pt";
  const dict = await getDictionary(lang);
  const rooms = getRooms(loc);
  const quartoAmenities = getQuartoAmenities(loc);
  const r = rooms[slug] ?? rooms["quarto-duplo"];

  // "Ao redor da pousada": fotos reais das atrações (mesmas usadas em "Fique por dentro").
  const around = getQuartoAround(loc);

  // specs derivadas de r (mismos valores/ícones que o export).
  const specs = [
    { d: "M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M10 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM18 8v6M21 11h-6", label: dict.quartoDetail.specHospedes, val: r.guests },
    { d: "M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z", label: dict.quartoDetail.specMetragem, val: r.size },
    { d: "M5 8h12v4a5 5 0 0 1-5 5H10a5 5 0 0 1-5-5zM17 9h2a2 2 0 0 1 0 4h-2M8 4v1M11 4v1", label: dict.quartoDetail.specCafe, val: dict.quartoDetail.specCafeVal },
  ];

  return (
    <>
      <JsonLd data={productLd({ lang: loc, slug, name: r.name, description: r.longDesc, image: r.img, price: r.price })} />
      <JsonLd data={breadcrumbLd(loc, [{ name: dict.nav.inicio, path: "/" }, { name: dict.nav.quartos, path: "/quartos" }, { name: r.name, path: `/quartos/${slug}` }])} />
      {/* HERO BANNER */}
      <section style={{ position: "relative", height: "23vh", minHeight: "180px", display: "flex", alignItems: "flex-end", background: "#143C7A", overflow: "hidden" }}>
        <SlotImg src={r.img} alt={format(dict.alt.quarto, { name: r.name })} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,rgba(9,22,46,0) 35%,rgba(9,22,46,.55) 70%,rgba(9,22,46,.9))" }} />
        <div className="qd-wrap" style={{ position: "relative", width: "100%", paddingBottom: "24px" }}>
          <div className="qd-herorow">
            <nav className="qd-tabs">
              <a className="qd-tab is-active" href="#sobre">{dict.quartoDetail.tabDescricao}</a>
              <a className="qd-tab" href="#comodidades">{dict.quartoDetail.tabComodidades}</a>
              <a className="qd-tab" href="#localizacao">{dict.quartoDetail.tabAoredor}</a>
              <a className="qd-tab" href={localePath(lang, "/quartos")}>{dict.quartoDetail.tabSimilares}</a>
            </nav>
          </div>
        </div>
      </section>

      {/* BODY */}
      <main style={{ padding: "64px 0 110px" }}>
        <div className="qd-wrap">
          <div style={{ marginBottom: "48px" }}>
            <h1 style={{ fontFamily: "var(--font-gilda), Georgia, serif", fontWeight: 500, fontSize: "56px", lineHeight: 1, color: "#143C7A", margin: 0 }}>{r.name}</h1>
            <div style={{ display: "flex", alignItems: "center", gap: "16px", marginTop: "14px" }}>
              <span style={{ fontSize: "12px", letterSpacing: ".22em", textTransform: "uppercase", color: "#7A8694" }}>Pousada Cataratas</span>
            </div>
          </div>
          <div className="qd-grid">
            {/* LEFT: big image / carrossel */}
            <div>
              {r.photos && r.photos.length > 1 ? (
                <RoomCarousel photos={r.photos} />
              ) : (
                <div style={{ position: "relative", height: "600px", overflow: "hidden", background: "#143C7A" }}>
                  <SlotImg src={r.img} alt={format(dict.alt.quarto, { name: r.name })} />
                </div>
              )}
            </div>

            {/* RIGHT: booking card */}
            <aside className="qd-info">
              <QuartoBooking />
            </aside>
          </div>

          {/* DETALHES DO QUARTO */}
          <div className="qd-detail">
            {/* LEFT: conteúdo */}
            <div>
              <div className="qd-specs">
                {specs.map((s) => (
                  <div key={s.label} style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 0 }}>
                    <div style={{ height: "30px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#1E90C8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d={s.d} /></svg>
                    </div>
                    <div style={{ fontFamily: "var(--font-hnc), 'Helvetica Neue', Arial, sans-serif", fontWeight: 300, fontSize: "20px", lineHeight: 1.2, height: "24px", color: "#1B2733", marginTop: "13px" }}>{s.val}</div>
                    <div style={{ fontSize: "11px", letterSpacing: ".18em", textTransform: "uppercase", color: "#8A97A6", marginTop: "11px" }}>{s.label}</div>
                  </div>
                ))}
              </div>

              <h2 id="sobre" style={{ fontFamily: "var(--font-gilda), Georgia, serif", fontWeight: 500, fontSize: "38px", lineHeight: 1.05, color: "#143C7A", margin: "48px 0 0", scrollMarginTop: "80px" }}>{dict.quartoDetail.sobreTitle}</h2>
              <p style={{ fontSize: "16px", lineHeight: 1.8, color: "#3A4654", margin: "22px 0 0" }}>{r.longDesc}</p>
              <p style={{ fontSize: "15px", lineHeight: 1.8, color: "#7A8694", margin: "18px 0 0" }}>{r.longDesc2}</p>

              <div style={{ height: "1px", background: "rgba(31,30,27,.12)", margin: "48px 0" }} />

              <h3 id="comodidades" style={{ fontFamily: "var(--font-gilda), Georgia, serif", fontWeight: 500, fontSize: "30px", lineHeight: 1.05, color: "#143C7A", margin: 0, scrollMarginTop: "80px" }}>{dict.quartoDetail.servicosTitle}</h3>
              <div className="qd-serv" style={{ marginTop: "28px" }}>
                {quartoAmenities.map((a) => (
                  <div key={a.label} style={{ display: "flex", alignItems: "center", gap: "13px", fontSize: "14.5px", color: "#3A4654" }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1E90C8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ flex: "none" }}><path d={a.d} /></svg>
                    {a.label}
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT: ações sticky */}
            <aside className="qd-sidebar">
              <div className="qd-actions">
                <a href="#" className="qd-act-1" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", padding: "20px 22px", background: "#C79A6A", color: "#FFFFFF", textDecoration: "none", fontSize: "13px", letterSpacing: ".18em", textTransform: "uppercase", transition: "filter .15s ease" }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4.5" width="18" height="16" rx="2" /><path d="M3 9h18M8 3v3M16 3v3" /></svg>
                  {dict.quartoDetail.actReservar}
                </a>
                <a href="https://wa.me/55" target="_blank" rel="noopener" className="qd-act-2" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", padding: "20px 22px", background: "#143C7A", color: "#FFFFFF", textDecoration: "none", fontSize: "13px", letterSpacing: ".18em", textTransform: "uppercase", transition: "background .15s ease" }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a9.94 9.94 0 0 0-8.5 15.16L2 22l4.96-1.46A10 10 0 1 0 12 2Zm0 18.13a8.1 8.1 0 0 1-4.13-1.13l-.3-.18-3.05.9.92-2.98-.2-.31A8.13 8.13 0 1 1 12 20.13Zm4.46-6.1c-.24-.12-1.44-.71-1.66-.79s-.39-.12-.55.12-.63.79-.77.95-.28.18-.52.06a6.66 6.66 0 0 1-1.96-1.21 7.4 7.4 0 0 1-1.36-1.69c-.14-.24 0-.37.11-.49s.24-.28.37-.42a1.6 1.6 0 0 0 .24-.41.45.45 0 0 0 0-.43c-.06-.12-.55-1.32-.75-1.81s-.4-.41-.55-.42h-.47a.9.9 0 0 0-.65.3 2.74 2.74 0 0 0-.85 2.03 4.74 4.74 0 0 0 1 2.52 10.9 10.9 0 0 0 4.17 3.68c.58.25 1.04.4 1.39.51a3.35 3.35 0 0 0 1.54.1 2.51 2.51 0 0 0 1.65-1.17 2.04 2.04 0 0 0 .14-1.16c-.06-.1-.22-.16-.46-.28Z" /></svg>
                  {dict.quartoDetail.actWhatsapp}
                </a>
              </div>
            </aside>
          </div>
        </div>
      </main>

      {/* AO REDOR */}
      <section id="aoredor" style={{ scrollMarginTop: "80px" }}>
        <div className="qd-wrap" style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 22px 110px" }}>
          <h2 style={{ fontFamily: "var(--font-gilda), Georgia, serif", fontWeight: 500, fontSize: "38px", lineHeight: 1.05, color: "#143C7A", margin: "0 0 40px" }}>{dict.quartoDetail.aoredorTitle}</h2>
          <div className="qd-around">
            {around.map((a) => (
              <a key={a.title} href={localePath(lang, `/atracoes/${a.slug}`)} style={{ display: "block", position: "relative", aspectRatio: "3/4", overflow: "hidden", textDecoration: "none", color: "inherit" }}>
                <SlotImg src={a.img} alt={a.title} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(20,28,40,.72) 0%,rgba(20,28,40,.18) 38%,rgba(20,28,40,0) 62%)", pointerEvents: "none" }} />
                <h3 style={{ position: "absolute", left: "24px", bottom: "22px", margin: 0, fontFamily: "var(--font-gilda), Georgia, serif", fontWeight: 500, fontSize: "26px", lineHeight: 1.1, color: "#FFFFFF", pointerEvents: "none" }}>{a.title}</h3>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* LOCALIZAÇÃO */}
      <ContatoStrip dict={dict} style={{ margin: 0, padding: 0 }} />
    </>
  );
}
