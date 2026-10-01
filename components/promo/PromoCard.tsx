import { localePath } from "@/i18n/config";
import { PROMO_BTN_BG, type Promo } from "@/lib/promos";
import type { Destaque } from "@/lib/data";

// O card de promoção do site. Nasceu na grelha de /promocoes e é o mesmo que a
// secção de ofertas do topo da home usa — para não haver duas versões do mesmo
// desenho. Quem chama controla só a largura, através de `className`.
//
// Medidas e cores vêm do export original: foto 3/4, caixa branca com sombra
// baixa, nome em Gilda 30px azul de marca, gancho em cinza, e o botão em azul
// (#143C7A) ou dourado (#C79A6A) conforme `promo.cor`.
//
// DESTAQUE: o número grande em dourado (maior que o nome) com o texto curto por
// baixo. Vem do `destaque` da página de detalhe (produtoDetails), o mesmo que
// a caixa azul da promo mostra — uma só fonte. Para os cards de uma fila
// ficarem alinhados, o nome ocupa sempre a altura de duas linhas (encostado em
// baixo), o destaque começa à mesma altura e o botão fica no fundo.
export type PromoCardTexto = {
  name: string;
  sub: string;
  altCard: string;
};

export default function PromoCard({
  promo,
  texto,
  destaque,
  cta,
  lang,
  className,
}: {
  promo: Promo;
  texto: PromoCardTexto;
  /** O destaque da promo (um ou vários). Sem ele, o conteúdo fica centrado. */
  destaque?: Destaque | Destaque[];
  cta: string;
  lang: string;
  className?: string;
}) {
  const destaques = destaque ? (Array.isArray(destaque) ? destaque : [destaque]) : [];
  return (
    <div
      className={className}
      style={{ background: "#FFFFFF", boxShadow: "0 18px 44px -28px rgba(20,33,51,.4)", display: "flex", flexDirection: "column" }}
    >
      <div style={{ position: "relative", width: "100%", aspectRatio: "3/4", overflow: "hidden", background: "#143C7A" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={promo.imgCard}
          alt={texto.altCard}
          loading="lazy"
          decoding="async"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>
      <div style={{ padding: "34px 26px 38px", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", flex: 1 }}>
        <div style={{ flex: destaques.length ? "none" : 1, width: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: destaques.length ? "flex-start" : "center", marginBottom: "26px" }}>
          <h3 style={{ fontFamily: "var(--font-gilda), Georgia, serif", fontWeight: 500, fontSize: "30px", lineHeight: 1.08, color: "#143C7A", margin: 0, minHeight: destaques.length ? "2.16em" : undefined, display: "flex", alignItems: "flex-end", justifyContent: "center" }}>
            {texto.name}
          </h3>
          {destaques.length > 0 && (
            <div style={{ display: "flex", justifyContent: "center", width: "100%", margin: "20px 0 0" }}>
              {destaques.map((d, i) => (
                <div key={i} style={{ flex: "1 1 0", minWidth: 0, maxWidth: "240px", display: "flex", flexDirection: "column", alignItems: "center", padding: destaques.length > 1 ? (i > 0 ? "0 0 0 16px" : "0 16px 0 0") : 0, borderLeft: i > 0 ? "1px solid rgba(20,60,122,.12)" : "none" }}>
                  <span style={{ fontFamily: "var(--font-hnc), 'Helvetica Neue', sans-serif", fontWeight: 300, fontSize: "58px", lineHeight: 0.9, color: "#C79A6A", whiteSpace: "nowrap" }}>{d.valor}</span>
                  {d.nota && <span style={{ fontSize: "13px", lineHeight: 1.4, color: "#143C7A", marginTop: "10px" }}>{d.nota}</span>}
                </div>
              ))}
            </div>
          )}
          {texto.sub && <div style={{ fontSize: "13.5px", lineHeight: 1.5, color: "#7A8694", margin: "16px 0 0" }}>{texto.sub}</div>}
        </div>
        <a
          href={localePath(lang, "/promocao/" + promo.slug)}
          style={{ marginTop: "auto", display: "inline-block", background: PROMO_BTN_BG[promo.cor], color: "#FFFFFF", textDecoration: "none", fontSize: "12px", letterSpacing: ".22em", textTransform: "uppercase", padding: "14px 28px" }}
        >
          {cta}
        </a>
      </div>
    </div>
  );
}
