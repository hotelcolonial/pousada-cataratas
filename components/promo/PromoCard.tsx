import { localePath } from "@/i18n/config";
import { PROMO_BTN_BG, type Promo } from "@/lib/promos";

// O card de promoção do site. Nasceu na grelha de /promocoes e é o mesmo que a
// secção de ofertas do topo da home usa — para não haver duas versões do mesmo
// desenho. Quem chama controla só a largura, através de `className`.
//
// Medidas e cores vêm do export original: foto 3/4, caixa branca com sombra
// baixa, nome em Gilda 30px azul de marca, gancho em cinza, e o botão em azul
// (#143C7A) ou dourado (#C79A6A) conforme `promo.cor`.
export type PromoCardTexto = {
  name: string;
  sub: string;
  altCard: string;
};

export default function PromoCard({
  promo,
  texto,
  cta,
  lang,
  className,
}: {
  promo: Promo;
  texto: PromoCardTexto;
  cta: string;
  lang: string;
  className?: string;
}) {
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
      <div style={{ padding: "38px 30px", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", flex: 1 }}>
        <h3 style={{ fontFamily: "var(--font-gilda), Georgia, serif", fontWeight: 500, fontSize: "30px", lineHeight: 1.08, color: "#143C7A", margin: 0 }}>
          {texto.name}
        </h3>
        <div style={{ fontSize: "14px", color: "#7A8694", margin: "14px 0 24px" }}>{texto.sub}</div>
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
