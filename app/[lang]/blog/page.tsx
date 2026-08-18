import "./blog.css";
import ContatoStrip from "@/components/ContatoStrip";
import { getBlogPosts, getBlogCategories, getBlogRecent, getBlogTags } from "@/lib/data";
import { isLocale, localePath } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import { pageMeta } from "@/i18n/seo";
import JsonLd from "@/components/JsonLd";
import { breadcrumbLd } from "@/lib/jsonld";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const loc = isLocale(lang) ? lang : "pt";
  const dict = await getDictionary(lang);
  return pageMeta({ lang: loc, path: "/blog", title: dict.blogList.bannerTitle + dict.meta.titleSuffix, description: dict.meta.descBlog, image: "/images/real/atracoes/cataratas-do-iguacu-mirante-foz-do-iguacu.webp" });
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

export default async function Blog({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const loc = isLocale(lang) ? lang : "pt";
  const dict = await getDictionary(lang);
  const blogPosts = getBlogPosts(loc);
  const feat = blogPosts[0];
  const blogCategories = getBlogCategories(loc);
  const blogRecent = getBlogRecent(loc);
  const blogTags = getBlogTags(loc);
  return (
    <>
      <JsonLd data={breadcrumbLd(loc, [{ name: dict.nav.inicio, path: "/" }, { name: dict.nav.blog, path: "/blog" }])} />
      {/* HERO BANNER */}
      <section
        style={{ position: "relative", width: "100%", height: "40vh", minHeight: "300px", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", background: "#143C7A" }}
      >
        <SlotImg src="/images/real/atracoes/cataratas-do-iguacu-mirante-foz-do-iguacu.webp" alt="Cataratas do Iguaçu vistas de um mirante em Foz do Iguaçu" />
        <div style={{ position: "absolute", inset: 0, background: "rgba(20,60,122,.46)" }} />
        <h1 style={{ position: "relative", fontFamily: "var(--font-gilda), Georgia, serif", fontWeight: 500, fontSize: "46px", lineHeight: 1, color: "#FFFFFF", textAlign: "center", margin: 0, padding: "0 22px" }}>
          {dict.blogList.bannerTitle}
        </h1>
      </section>

      {/* POST DESTAQUE */}
      <section className="in-wrap" style={{ paddingTop: "96px", paddingBottom: "96px" }}>
        <a href={localePath(lang, `/blog/${feat.href.split("post=")[1]}`)} style={{ textDecoration: "none", display: "block" }}>
          <div className="bl-feat2">
            {/* ESQUERDA: imagem */}
            <div style={{ position: "relative", aspectRatio: "16/10", overflow: "hidden", background: "#143C7A" }}>
              <SlotImg src={feat.img} alt={feat.title} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,rgba(0,0,0,0) 55%,rgba(9,22,46,.62))" }} />
              <div style={{ position: "absolute", left: "26px", bottom: "26px", display: "flex", alignItems: "center", gap: "12px" }}>
                <span style={{ width: "3px", height: "18px", background: "#C79A6A", display: "block" }} />
                <span style={{ fontSize: "11px", letterSpacing: ".22em", textTransform: "uppercase", color: "#FFFFFF" }}>{feat.date}</span>
              </div>
            </div>
            {/* DIREITA: texto */}
            <div>
              <div style={{ fontSize: "12px", letterSpacing: ".22em", textTransform: "uppercase", color: "#1E90C8" }}>{feat.cat}</div>
              <h2 className="bl-feat2-title" style={{ marginTop: "16px" }}>{feat.title}</h2>
              <p style={{ fontSize: "16px", lineHeight: 1.75, color: "#5C6B7A", margin: "22px 0 0", maxWidth: "46ch" }}>{feat.excerpt}</p>
              <span style={{ display: "inline-flex", alignItems: "center", gap: "9px", marginTop: "30px", fontSize: "12px", letterSpacing: ".2em", textTransform: "uppercase", color: "#143C7A" }}>{dict.blogList.lerArtigo + " "}<span style={{ fontSize: "16px" }}>›</span></span>
            </div>
          </div>
        </a>
      </section>

      {/* ARTIGOS + SIDEBAR */}
      <section className="in-wrap" style={{ paddingBottom: "110px" }}>
        <div className="bl-layout">
          {/* PRINCIPAL: grid de cards */}
          <div className="bl-cards2">
            {blogPosts.map((p) => {
              const slug = p.href.split("post=")[1];
              return (
                <a key={p.id} href={localePath(lang, `/blog/${slug}`)} style={{ textDecoration: "none", display: "flex", flexDirection: "column", background: "#FBFAF8", height: "100%" }}>
                  <div style={{ position: "relative", width: "100%", aspectRatio: "16/10", overflow: "hidden", background: "#143C7A" }}>
                    <SlotImg src={p.img} alt={p.title} />
                  </div>
                  <div style={{ padding: "26px 24px 28px", display: "flex", flexDirection: "column", flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "11px" }}>
                      <span style={{ width: "3px", height: "14px", background: "#C79A6A", display: "block" }} />
                      <span style={{ fontSize: "11px", letterSpacing: ".2em", textTransform: "uppercase", color: "#9AA3AD" }}>{p.date}</span>
                    </div>
                    <h3 className="bl-cardtitle">{p.title}</h3>
                    <p style={{ fontSize: "14.5px", lineHeight: 1.65, color: "#5C6B7A", margin: "12px 0 0" }}>{p.excerpt}</p>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: "8px", marginTop: "auto", paddingTop: "22px", fontSize: "11px", letterSpacing: ".2em", textTransform: "uppercase", color: "#143C7A" }}>{dict.blogList.lerArtigo + " "}<span style={{ fontSize: "15px" }}>›</span></span>
                  </div>
                </a>
              );
            })}
          </div>

          {/* SIDEBAR */}
          <aside>
            <div className="bl-side-sticky" style={{ display: "flex", flexDirection: "column", gap: "44px" }}>
              {/* Busca */}
              <div>
                <div style={{ fontSize: "11px", letterSpacing: ".22em", textTransform: "uppercase", color: "#1E90C8" }}>{dict.blogList.buscarLabel}</div>
                <div style={{ position: "relative", marginTop: "16px" }}>
                  <span style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)", color: "#9AA3AD", display: "flex" }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="11" cy="11" r="7" />
                      <path d="m21 21-4.3-4.3" />
                    </svg>
                  </span>
                  <input type="text" placeholder={dict.blogList.buscarPlaceholder} style={{ width: "100%", height: "52px", padding: "0 16px 0 46px", border: "1px solid #E2DACE", background: "#FFFFFF", fontFamily: "inherit", fontSize: "14px", color: "#1B2733", outline: "none" }} />
                </div>
              </div>

              {/* Categorias */}
              <div>
                <div style={{ fontSize: "11px", letterSpacing: ".22em", textTransform: "uppercase", color: "#1E90C8" }}>{dict.blogList.categoriasLabel}</div>
                <div style={{ marginTop: "14px" }}>
                  {blogCategories.map((c) => (
                    <a key={c.name} href="#" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "14px", padding: "14px 0", borderBottom: "1px solid #ECE6DC", textDecoration: "none" }}>
                      <span style={{ fontSize: "15px", color: "#3F4D5A" }}>{c.name}</span>
                      <span style={{ fontSize: "12px", color: "#9AA3AD" }}>{c.count}</span>
                    </a>
                  ))}
                </div>
              </div>

              {/* Recentes */}
              <div>
                <div style={{ fontSize: "11px", letterSpacing: ".22em", textTransform: "uppercase", color: "#1E90C8" }}>{dict.blogList.recentesLabel}</div>
                <div style={{ display: "flex", flexDirection: "column", gap: "20px", marginTop: "18px" }}>
                  {blogRecent.map((r) => (
                    <a key={r.id} href={localePath(lang, `/blog/${r.slug}`)} style={{ display: "flex", gap: "16px", textDecoration: "none", alignItems: "flex-start" }}>
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

              {/* Tags */}
              <div>
                <div style={{ fontSize: "11px", letterSpacing: ".22em", textTransform: "uppercase", color: "#1E90C8" }}>{dict.blogList.etiquetasLabel}</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginTop: "16px" }}>
                  {blogTags.map((t) => (
                    <a key={t} href="#" style={{ display: "inline-block", padding: "8px 14px", border: "1px solid #E2DACE", background: "#FFFFFF", fontSize: "11px", letterSpacing: ".14em", textTransform: "uppercase", color: "#5C6B7A", textDecoration: "none" }}>{t}</a>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* LOCALIZAÇÃO */}
      <ContatoStrip dict={dict} style={{ margin: 0, padding: 0 }} />
    </>
  );
}
