import "../../promocao/[slug]/promocao.css";
import PromoDetalhe from "@/components/promo/PromoDetalhe";
import { PROMOCOES_SLUG_LEGADO, getProdutos, getProdutoRelated } from "@/lib/data";
import { isLocale, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import { pageMeta } from "@/i18n/seo";
import type { Metadata } from "next";

// URLs antigas /promocoes/<slug>. Mostram exatamente a mesma página que
// /promocao/<slug> — mesma plantilla, mesmos dados — para não haver dois
// desenhos da mesma promoção. Só os três slugs que já existiam continuam a ser
// gerados, para não inventar URLs novas (ver PROMOCOES_SLUG_LEGADO).
export async function generateMetadata({ params }: { params: Promise<{ lang: string; slug: string }> }): Promise<Metadata> {
  const { lang, slug } = await params;
  const loc = isLocale(lang) ? lang : "pt";
  const dict = await getDictionary(lang);
  const produtos = getProdutos(loc);
  const p = produtos[slug] ?? produtos["longa-estadia"];
  return pageMeta({ lang: loc, path: `/promocoes/${slug}`, title: p.name + dict.meta.titleSuffix, description: p.desc, image: p.foto });
}

export function generateStaticParams() {
  return locales.flatMap((lang) => PROMOCOES_SLUG_LEGADO.map((slug) => ({ lang, slug })));
}

export default async function Promocao({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params;
  const loc = isLocale(lang) ? lang : "pt";
  const dict = await getDictionary(lang);
  const produtos = getProdutos(loc);
  const p = produtos[slug] ?? produtos["longa-estadia"];

  return (
    <PromoDetalhe
      p={p}
      produtoRelated={getProdutoRelated(loc)}
      dict={dict}
      lang={lang}
      loc={loc}
      slug={slug}
      basePath="/promocoes"
    />
  );
}
