import "./artigo.css";
import ContatoStrip from "@/components/ContatoStrip";
import { artigoDetails, getArtigos, getBlogPosts, getArtigoTags, getArtigoCategories, getArtigoRecent, getArtigoRelated } from "@/lib/data";
import { isLocale, locales, localePath } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import { pageMeta } from "@/i18n/seo";
import JsonLd from "@/components/JsonLd";
import { BOOKING_BASE } from "@/lib/booking";
import { articleLd, breadcrumbLd, ptDateToISO } from "@/lib/jsonld";
import type { Metadata } from "next";

const FALLBACK_ARTIGO = "o-que-fazer-em-foz-do-iguacu-em-3-dias";

// Extracto del artículo (desde el listado del blog), para la meta description.
function artigoExcerpt(loc: Parameters<typeof getBlogPosts>[0], slug: string): string | undefined {
  return getBlogPosts(loc).find((x) => x.href.split("post=")[1] === slug)?.excerpt;
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string; slug: string }> }): Promise<Metadata> {
  const { lang, slug } = await params;
  const loc = isLocale(lang) ? lang : "pt";
  const dict = await getDictionary(lang);
  const artigos = getArtigos(loc);
  const a = artigos[slug] ?? artigos[FALLBACK_ARTIGO];
  const iso = ptDateToISO((artigoDetails[slug] ?? artigoDetails[FALLBACK_ARTIGO]).date);
  return pageMeta({
    lang: loc,
    path: `/blog/${slug}`,
    title: a.title + dict.meta.titleSuffix,
    description: artigoExcerpt(loc, slug) ?? dict.meta.descBlog,
    image: a.cover,
    type: "article",
    article: { publishedTime: iso, authors: [a.author] },
  });
}

export function generateStaticParams() {
  return locales.flatMap((lang) =>
    Object.keys(artigoDetails).map((slug) => ({ lang, slug })),
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

export default async function Artigo({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params;
  const loc = isLocale(lang) ? lang : "pt";
  const dict = await getDictionary(lang);
  const artigos = getArtigos(loc);
  const artigoTags = getArtigoTags(loc);
  const artigoCategories = getArtigoCategories(loc);
  const artigoRecent = getArtigoRecent(loc);
  const a = artigos[slug] ?? artigos["o-que-fazer-em-foz-do-iguacu-em-3-dias"];
  const related = getArtigoRelated(loc).filter((r) => r.href !== `/blog/${slug}`).slice(0, 3);

  return (
    <>
      <JsonLd data={articleLd({ lang: loc, slug, title: a.title, description: artigoExcerpt(loc, slug) ?? dict.meta.descBlog, image: a.cover, author: a.author, datePublished: ptDateToISO((artigoDetails[slug] ?? artigoDetails[FALLBACK_ARTIGO]).date) })} />
      <JsonLd data={breadcrumbLd(loc, [{ name: dict.nav.inicio, path: "/" }, { name: dict.nav.blog, path: "/blog" }, { name: a.title, path: `/blog/${slug}` }])} />
      {/* CABEÇALHO DO ARTIGO */}
      <section style={{ position: "relative", width: "100%", minHeight: "62vh", display: "flex", alignItems: "flex-end", justifyContent: "center", overflow: "hidden", background: "#143C7A" }}>
        <SlotImg src={a.cover} alt={a.title} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,rgba(9,22,46,.12) 25%,rgba(9,22,46,.55) 62%,rgba(9,22,46,.92))" }} />
        <div className="in-wrap" style={{ position: "relative", textAlign: "center", paddingBottom: "64px", maxWidth: "920px" }}>
          <div style={{ fontSize: "12px", letterSpacing: ".26em", textTransform: "uppercase", color: "rgba(255,255,255,.82)" }}>{a.category}</div>
          <h1 className="ar-title">{a.title}</h1>
          <div className="ar-meta">
            <span style={{ display: "inline-flex", alignItems: "center", gap: "9px", fontSize: "13px", color: "rgba(255,255,255,.86)" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M3 9h18M8 2v4M16 2v4" /></svg>
              {a.date}
            </span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: "9px", fontSize: "13px", color: "rgba(255,255,255,.86)" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 4-6 8-6s8 2 8 6" /></svg>
              {a.author}
            </span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: "9px", fontSize: "13px", color: "rgba(255,255,255,.86)" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>
              {a.readTime}
            </span>
          </div>
        </div>
      </section>

      {/* CORPO DO ARTIGO + SIDEBAR */}
      <section className="in-wrap" style={{ paddingTop: "84px", paddingBottom: "110px" }}>
        <div className="ar-body">
          {/* ESQUERDA: corpo */}
          <article>
            {a.body.map((b, i) => {
              if (b.type === "h2") return <h2 key={i} className="ar-h2">{b.text}</h2>;
              if (b.type === "h3") return <h3 key={i} className="ar-h3">{b.text}</h3>;
              if (b.type === "list")
                return (
                  <ul key={i} className="ar-ul">
                    {b.items.map((it, j) => (
                      <li key={j}>{it}</li>
                    ))}
                  </ul>
                );
              if (b.type === "quote")
                return (
                  <blockquote key={i} style={{ margin: "44px 0 0", padding: "0 0 0 26px", borderLeft: "3px solid #C79A6A" }}>
                    <p style={{ fontFamily: "var(--font-gilda), Georgia, serif", fontSize: "26px", lineHeight: 1.4, color: "#143C7A", margin: 0 }}>{b.text}</p>
                  </blockquote>
                );
              if (b.type === "cta")
                return (
                  <div key={i} style={{ background: "#C79A6A", color: "#FFFFFF", padding: "38px 34px", marginTop: "48px" }}>
                    <h3 style={{ fontFamily: "var(--font-gilda), Georgia, serif", fontWeight: 500, fontSize: "30px", lineHeight: 1.12, color: "#FFFFFF", margin: 0 }}>{b.title}</h3>
                    <p style={{ fontSize: "15px", lineHeight: 1.7, color: "rgba(255,255,255,.9)", margin: "14px 0 0" }}>{b.text}</p>
                    <a href={b.href} target="_blank" rel="noopener noreferrer" className="ar-cta" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", height: "54px", padding: "0 34px", marginTop: "26px", background: "#143C7A", color: "#FFFFFF", textDecoration: "none", fontSize: "12px", letterSpacing: ".2em", textTransform: "uppercase", transition: "filter .15s ease" }}>{b.btn}</a>
                  </div>
                );
              if (b.type === "figure")
                return (
                  <figure key={i} style={{ margin: "44px 0 0" }}>
                    <div style={{ position: "relative", width: "100%", aspectRatio: "16/9", overflow: "hidden", background: "#143C7A" }}>
                      <SlotImg src={b.img} alt={b.caption} />
                    </div>
                    <figcaption style={{ fontSize: "13px", color: "#9AA3AD", marginTop: "12px" }}>{b.caption}</figcaption>
                  </figure>
                );
              const isFirstP = a.body.findIndex((x) => x.type === "p") === i;
              return (
                <p key={i} className={isFirstP ? "ar-p ar-drop" : "ar-p"} style={isFirstP ? { marginTop: 0 } : undefined}>
                  {b.text}
                </p>
              );
            })}

            {/* TAGS */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginTop: "48px", paddingTop: "36px", borderTop: "1px solid #ECE6DC" }}>
              {artigoTags.map((t) => (
                <a key={t} href="#" style={{ display: "inline-block", padding: "8px 14px", border: "1px solid #E2DACE", background: "#FFFFFF", fontSize: "11px", letterSpacing: ".14em", textTransform: "uppercase", color: "#5C6B7A", textDecoration: "none" }}>{t}</a>
              ))}
            </div>

            {/* COMPARTILHAR */}
            <div style={{ display: "flex", alignItems: "center", gap: "18px", marginTop: "30px" }}>
              <span style={{ fontSize: "11px", letterSpacing: ".2em", textTransform: "uppercase", color: "#9AA3AD" }}>{dict.artigo.compartilhar}</span>
              <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                <a href="#" aria-label={dict.artigo.ariaFacebook} className="ar-share" style={{ color: "#143C7A", display: "inline-flex" }}><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M14 9h2.5V6H14a3.5 3.5 0 0 0-3.5 3.5V11H8.5v3h2V21h3v-7H16l.5-3h-3V9.5A.5.5 0 0 1 14 9Z" /></svg></a>
                <a href="#" aria-label={dict.artigo.ariaWhatsapp} className="ar-share" style={{ color: "#143C7A", display: "inline-flex" }}><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a9.94 9.94 0 0 0-8.5 15.16L2 22l4.96-1.46A10 10 0 1 0 12 2Zm0 18.13a8.1 8.1 0 0 1-4.13-1.13l-.3-.18-3.05.9.92-2.98-.2-.31A8.13 8.13 0 1 1 12 20.13Z" /></svg></a>
                <a href="#" aria-label={dict.artigo.ariaEmail} className="ar-share" style={{ color: "#143C7A", display: "inline-flex" }}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg></a>
                <a href="#" aria-label={dict.artigo.ariaCopiar} className="ar-share" style={{ color: "#143C7A", display: "inline-flex" }}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1" /><path d="M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1" /></svg></a>
              </div>
            </div>
          </article>

          {/* SIDEBAR */}
          <aside>
            <div className="ar-side-sticky" style={{ display: "flex", flexDirection: "column", gap: "44px" }}>
              {/* Recentes */}
              <div>
                <div style={{ fontSize: "11px", letterSpacing: ".22em", textTransform: "uppercase", color: "#1E90C8" }}>{dict.artigo.recentesLabel}</div>
                <div style={{ display: "flex", flexDirection: "column", gap: "20px", marginTop: "18px" }}>
                  {artigoRecent.map((r) => (
                    <a key={r.title} href={localePath(lang, `/blog/${r.slug}`)} style={{ display: "flex", gap: "16px", textDecoration: "none", alignItems: "flex-start" }}>
                      <div style={{ position: "relative", flex: "none", width: "78px", height: "64px", overflow: "hidden", background: "#143C7A" }}>
                        <SlotImg src={r.img} alt={r.title} />
                      </div>
                      <div style={{ minWidth: 0 }}>
                        <div style={{ fontSize: "14px", lineHeight: 1.35, color: "#143C7A" }}>{r.title}</div>
                        <div style={{ fontSize: "11px", letterSpacing: ".12em", textTransform: "uppercase", color: "#9AA3AD", marginTop: "8px" }}>{r.date}</div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              {/* Categorias */}
              <div>
                <div style={{ fontSize: "11px", letterSpacing: ".22em", textTransform: "uppercase", color: "#1E90C8" }}>{dict.artigo.categoriasLabel}</div>
                <div style={{ marginTop: "14px" }}>
                  {artigoCategories.map((c) => (
                    <a key={c.name} href="#" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "14px", padding: "14px 0", borderBottom: "1px solid #ECE6DC", textDecoration: "none" }}>
                      <span style={{ fontSize: "15px", color: "#3F4D5A" }}>{c.name}</span>
                      <span style={{ fontSize: "12px", color: "#9AA3AD" }}>{c.count}</span>
                    </a>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div style={{ background: "#C79A6A", color: "#FFFFFF", padding: "38px 32px" }}>
                <h3 style={{ fontFamily: "var(--font-gilda), Georgia, serif", fontWeight: 500, fontSize: "28px", lineHeight: 1.15, color: "#FFFFFF", margin: 0 }}>{dict.artigo.ctaTitle}</h3>
                <p style={{ fontSize: "14px", lineHeight: 1.6, color: "rgba(255,255,255,.86)", margin: "14px 0 0" }}>{dict.artigo.ctaP}</p>
                <a href={BOOKING_BASE} target="_blank" rel="noopener noreferrer" className="ar-cta" style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: "52px", marginTop: "24px", background: "#143C7A", color: "#FFFFFF", textDecoration: "none", fontSize: "12px", letterSpacing: ".2em", textTransform: "uppercase", transition: "filter .15s ease" }}>{dict.artigo.ctaBtn}</a>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* AUTOR + RELACIONADOS */}
      <section className="in-wrap" style={{ paddingBottom: "110px" }}>
        {/* CARD AUTOR */}
        <div className="ar-author" style={{ background: "#FBFAF8", padding: "32px 30px" }}>
          <div>
            <div style={{ fontSize: "11px", letterSpacing: ".22em", textTransform: "uppercase", color: "#1E90C8" }}>{dict.artigo.escritoPor}</div>
            <div style={{ fontFamily: "var(--font-hnc), sans-serif", fontWeight: 400, fontSize: "22px", color: "#143C7A", marginTop: "8px", letterSpacing: "-.01em" }}>{a.author}</div>
            <p style={{ fontSize: "14.5px", lineHeight: 1.65, color: "#5C6B7A", margin: "8px 0 0", maxWidth: "62ch" }}>{dict.artigo.autorBio}</p>
          </div>
        </div>

        {/* RELACIONADOS */}
        <div style={{ marginTop: "96px" }}>
          <h2 style={{ fontFamily: "var(--font-gilda), Georgia, serif", fontWeight: 500, fontSize: "34px", lineHeight: 1.05, color: "#143C7A", margin: 0 }}>{dict.artigo.relacionadosTitle}</h2>
          <div className="ar-rel">
            {related.map((r, i) => (
              <a key={i} href={localePath(lang, r.href)} style={{ textDecoration: "none", display: "flex", flexDirection: "column", height: "100%" }}>
                <div style={{ position: "relative", width: "100%", aspectRatio: "16/10", overflow: "hidden", background: "#143C7A" }}>
                  <SlotImg src={r.img} alt={r.title} />
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "11px", marginTop: "18px" }}>
                  <span style={{ width: "3px", height: "14px", background: "#C79A6A", display: "block" }} />
                  <span style={{ fontSize: "11px", letterSpacing: ".2em", textTransform: "uppercase", color: "#9AA3AD" }}>{r.date}</span>
                </div>
                <h3 className="ar-relt">{r.title}</h3>
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
