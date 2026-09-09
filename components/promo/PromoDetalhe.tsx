import ContatoStrip from "@/components/ContatoStrip";
import BeneficioIcone from "@/components/promo/BeneficioIcone";
import JsonLd from "@/components/JsonLd";
import { localePath } from "@/i18n/config";
import type { Locale } from "@/i18n/config";
import { format } from "@/i18n/format";
import type { Dictionary } from "@/i18n/getDictionary";
import { WHATSAPP_HREF, whatsappHref } from "@/lib/whatsapp";
import { buildOfferBookingUrl } from "@/lib/booking";
import { breadcrumbLd } from "@/lib/jsonld";
import type { ProdutoDetail, ProdutoRelated } from "@/lib/data";

// ================= PLANTILLA DE DETALHE DE UMA PROMOÇÃO =================
// Uma só página para todas as promos: o que muda é o conteúdo, que vem de
// `produtoDetails` (lib/data.ts + lib/translations). A ordem de leitura é
// sempre a mesma:
//
//   banner com o nome e o gancho
//   → DESTAQUE (o número grande) ao lado da imagem protagonista
//   → BENEFÍCIOS em cards com ícone linear
//   → uma frase de descrição + botões + letra miúda
//   → galeria (se a promo tiver) e quartos relacionados
//
// Acrescentar uma promo nova não obriga a tocar aqui: basta a entrada em
// `produtoDetails` com destaque + benefícios. As duas rotas que a mostram
// (/promocao/<slug> e a antiga /promocoes/<slug>) usam este mesmo componente,
// para não haver dois desenhos da mesma coisa.

// Reemplazo del <image-slot fit="cover"> del export.
function SlotImg({ src, alt = "", priority = false }: { src: string; alt?: string; priority?: boolean }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      decoding="async"
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
    />
  );
}

export default function PromoDetalhe({
  p,
  produtoRelated,
  dict,
  lang,
  loc,
  slug,
  basePath,
}: {
  p: ProdutoDetail;
  produtoRelated: ProdutoRelated[];
  dict: Dictionary;
  lang: string;
  loc: Locale;
  slug: string;
  /** "/promocao" ou "/promocoes" — só para o breadcrumb da rota que a mostra. */
  basePath: string;
}) {
  return (
    <>
      <JsonLd data={breadcrumbLd(loc, [{ name: dict.nav.inicio, path: "/" }, { name: dict.nav.promocoes, path: "/promocoes" }, { name: p.name, path: `${basePath}/${slug}` }])} />

      {/* ---------- BANNER: nome + gancho ---------- */}
      <section className="pp-banner">
        <SlotImg src={p.banner} alt={format(dict.alt.produtoBanner, { name: p.name })} priority />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,rgba(20,60,122,.42) 0%,rgba(14,34,70,.66) 100%)" }} />
        <div style={{ position: "relative", textAlign: "center", padding: "0 22px" }}>
          <div style={{ fontSize: "12px", letterSpacing: ".3em", textTransform: "uppercase", color: "#C79A6A" }}>{dict.promocaoOffer.promocaoLabel}</div>
          <h1 className="pp-banner-h1" style={{ fontFamily: "var(--font-gilda), Georgia, serif", fontWeight: 500, fontSize: "46px", lineHeight: 1.04, color: "#FFFFFF", margin: "16px 0 0" }}>{p.name}</h1>
          <p className="pp-banner-hook" style={{ fontSize: "17px", lineHeight: 1.5, color: "rgba(247,243,236,.92)", margin: "18px auto 0", maxWidth: "620px" }}>{p.hook}</p>
        </div>
      </section>

      {/* ---------- DESTAQUE + IMAGEM PROTAGONISTA ---------- */}
      <section className="pp-destaque">
        <div className="pp-destaque-foto">
          <SlotImg src={p.foto} alt={p.fotoAlt ?? format(dict.alt.produtoFoto, { name: p.name })} />
        </div>

        <div className="pp-destaque-caixa">
          <span className="pp-destaque-label">{p.destaque.label}</span>
          <span className="pp-destaque-valor">{p.destaque.valor}</span>
          {p.destaque.nota && <span className="pp-destaque-nota">{p.destaque.nota}</span>}
        </div>
      </section>

      {/* ---------- BENEFÍCIOS ---------- */}
      <section className="pp-benef">
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: "12px", letterSpacing: ".3em", textTransform: "uppercase", color: "#C79A6A" }}>{dict.promocaoProduct.inclusoEyebrow}</div>
          <h2 className="pp-benef-h" style={{ fontFamily: "var(--font-gilda), Georgia, serif", fontWeight: 500, fontSize: "38px", lineHeight: 1.06, color: "#143C7A", margin: "14px 0 0" }}>{dict.promocaoOffer.inclusoTitle}</h2>
        </div>

        <div className="pp-benef-grid">
          {p.beneficios.map((b) => (
            <div className="pp-benef-card" key={b.texto}>
              <span style={{ color: "#C79A6A", display: "flex" }}>
                <BeneficioIcone nome={b.icone} />
              </span>
              <span style={{ fontSize: "15px", lineHeight: 1.55, color: "#3A4654" }}>{b.texto}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- DESCRIÇÃO + BOTÕES + LETRA MIÚDA ---------- */}
      <section className="pp-cta">
        <p className="pp-cta-desc">{p.desc}</p>

        <div className="pp-cta-botoes">
          <a href={p.waMessage ? whatsappHref(p.waMessage) : WHATSAPP_HREF} target="_blank" rel="noopener noreferrer" className="pp-wa">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="#FFFFFF" aria-hidden="true"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.004c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.13c-1.5 0-2.97-.4-4.25-1.16l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.37c0-4.54 3.7-8.23 8.25-8.23 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.82c0 4.54-3.7 8.23-8.24 8.23Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.13-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.42l-.48-.01c-.17 0-.43.06-.66.31-.23.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.1-.22-.16-.47-.28Z" /></svg>
            {dict.promocaoProduct.falarWhatsapp}
          </a>
          <a href={buildOfferBookingUrl(p.booking)} target="_blank" rel="noopener noreferrer" className="pp-resv">
            {dict.promocaoProduct.reservarAgora}
          </a>
        </div>

        {p.obs && <p className="pp-cta-obs">{p.obs}</p>}
      </section>

      {/* ---------- GALERIA (só se a promo tiver fotos extra) ---------- */}
      {p.galeria && p.galeria.length > 0 && (
        <section className="pp-galeria">
          {p.galeria.map((g) => (
            <div key={g.src} style={{ position: "relative", width: "100%", aspectRatio: "4/3", overflow: "hidden", background: "#143C7A" }}>
              <SlotImg src={g.src} alt={g.alt} />
            </div>
          ))}
        </section>
      )}

      {/* ---------- OUTROS QUARTOS ---------- */}
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

      {/* ---------- LOCALIZAÇÃO ---------- */}
      <ContatoStrip dict={dict} style={{ margin: 0, padding: 0 }} />
    </>
  );
}
