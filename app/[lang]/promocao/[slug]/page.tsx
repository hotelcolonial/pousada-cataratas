import "./promocao.css";
import PromoDetalhe from "@/components/promo/PromoDetalhe";
import { produtoDetails, getProdutos, getProdutoRelated } from "@/lib/data";
import { isLocale, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import { pageMeta } from "@/i18n/seo";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ lang: string; slug: string }> }): Promise<Metadata> {
  const { lang, slug } = await params;
  const loc = isLocale(lang) ? lang : "pt";
  const dict = await getDictionary(lang);
  const produtos = getProdutos(loc);
  const p = produtos[slug] ?? produtos["longa-estadia"];
  return pageMeta({ lang: loc, path: `/promocao/${slug}`, title: p.name + dict.meta.titleSuffix, description: p.desc, image: p.foto });
}

export function generateStaticParams() {
  return locales.flatMap((lang) =>
    Object.keys(produtoDetails).map((slug) => ({ lang, slug })),
  );
}

export default async function Produto({ params }: { params: Promise<{ lang: string; slug: string }> }) {
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
      basePath="/promocao"
    />
  );
}
