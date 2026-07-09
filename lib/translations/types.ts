import type {
  RgCard,
  Testimonial,
  QuartoCard,
  GaleriaShot,
  GaleriaTab,
  AtracaoFeatured,
  AtracaoCard,
  AtracaoNearby,
  BlogPost,
  BlogCategory,
  BlogRecent,
  QuartoDetail,
  IconItem,
  QuartoAround,
  AtracaoDetail,
  PromocaoDetail,
  ProdutoDetail,
  ProdutoRelated,
  ArtigoDetail,
} from "@/lib/data";

// Override de texto por elemento: solo los campos traducibles (el resto sale de
// la base pt). Para arrays anidados (photos, specs, conditions, body) el merge es
// elemento por elemento, así que basta con dar los campos de texto de cada índice
// (mismo orden y longitud que la base pt).
type ByKey<T> = Record<string, Partial<T>>;

// Contrato que DEBEN cumplir es.ts y en.ts. Las claves de cada Record son los
// mismos id/slug/label/name/href que usa la base pt en lib/data.ts.
export type LocaleContent = {
  // Home
  rgCards: ByKey<RgCard>; // clave: id (rg-1..rg-4)
  testi: Testimonial[]; // array completo (mismo orden que TESTI, 5 ítems)
  // Listado Quartos
  quartosCards: ByKey<QuartoCard>; // clave: id (rc-card-1..rc-card-4)
  // Galería
  galeriaShots: ByKey<GaleriaShot>; // clave: id (g1..g27) — solo {alt}
  galeriaTabs: ByKey<GaleriaTab>; // clave: id (todos/quartos/comuns/piscina) — solo {label}
  // Listado Atrações
  atracoesFeatured: ByKey<AtracaoFeatured>; // clave: id (at-feat-1..at-feat-5)
  atracoesCards: ByKey<AtracaoCard>; // clave: id (at-card-1..at-card-3)
  atracoesNearby: ByKey<AtracaoNearby>; // clave: name pt — {name?, dist?}
  // Blog (listado)
  blogPosts: ByKey<BlogPost>; // clave: id (bl-1..bl-4)
  blogCategories: ByKey<BlogCategory>; // clave: name pt — {name}
  blogRecent: ByKey<BlogRecent>; // clave: id (bl-rec-1..bl-rec-4) — {title}
  blogTags: string[]; // array completo (mismo orden)
  // Detalle Quarto
  rooms: ByKey<QuartoDetail>; // clave: slug — incluye photos[] (element-wise: solo {alt})
  quartoAmenities: ByKey<IconItem>; // clave: label pt — {label}
  quartoAround: ByKey<QuartoAround>; // clave: slug — {title}
  // Detalle Atração
  atracoes: ByKey<AtracaoDetail>; // clave: slug — specs[] element-wise ({label,value})
  atracaoDoItems: Record<string, string[]>; // clave: slug — array completo por slug
  atracaoSteps: Record<string, string[]>; // clave: slug — array completo por slug
  // Detalle Promoção / Produto
  promocoes: ByKey<PromocaoDetail>; // clave: slug — conditions[] array completo
  produtos: ByKey<ProdutoDetail>; // clave: slug
  produtoRelated: ByKey<ProdutoRelated>; // clave: quartoSlug — {name}
  // Detalle Artigo (blog)
  artigos: ByKey<ArtigoDetail>; // clave: slug — body[] element-wise ({text}/{items}/{caption})
  artigoTags: string[]; // array completo
  artigoCategories: ByKey<BlogCategory>; // clave: name pt — {name}
  artigoRecent: ByKey<{ title: string; date: string; img: string; slug: string }>; // clave: slug — {title}
  artigoRelated: ByKey<{ href: string; title: string; date: string; img: string }>; // clave: href — {title}
};
