// ============================ SLOT SAZONAL ============================
// A home e a grelha de /promocoes têm um lugar fixo que roda a cada temporada:
// foi "Agosto Encantador", agora é "Setembro Encantador", amanhã será outra.
//
// 👉 PARA DESLIGAR A PROMO QUANDO SETEMBRO ACABAR: pôr `ativa: false`.
//    O slot passa a mostrar a promo perene indicada em `perene` (Reserva
//    antecipada) sem tocar em mais nenhum ficheiro. A página de detalhe
//    /promocao/setembro-encantador continua a existir — só deixa de ser
//    anunciada na home e na grelha.
//
// 👉 PARA TROCAR POR UMA PROMO NOVA: mudar o `slug` e as imagens aqui, e os
//    textos em `promoSazonal` nos três dicionários (pt/es/en). Os textos da
//    página de detalhe vivem em `produtoDetails` (lib/data.ts + translations).
//
// As imagens são as mesmas nos três idiomas; só o texto é traduzido.

export type PromoSlot = {
  /** Slug da página de detalhe: /promocao/<slug> */
  slug: string;
  /** Miniatura do item da home (formato paisagem, ~104x76). */
  imgHome: string;
  /** Imagem do card de /promocoes (recortada em 3/4). */
  imgCard: string;
  /** Cor do botão: dourado destaca a promo sazonal, azul é o padrão. */
  cor: "accent" | "dark";
};

// Pop-up da home. A arte tem o mês impresso na própria imagem ("hospede-se em
// agosto"), numa versão por idioma (…-pt.webp / -es.webp / -en.webp). O parque
// continua a ser o Zoopark, mas o mês não: por isso fica desligado até haver a
// arte de setembro — mostrar a de agosto seria anunciar uma promoção acabada.
//
// 👉 PARA LIGAR: gerar as três imagens, apontar "base" para o prefixo comum
//    (sem o -pt/-es/-en.webp) e pôr ativo: true. Os textos alternativos e o
//    botão de fechar estão em components/home/PromoPopup.tsx.
export const PROMO_POPUP = {
  ativo: false,
  base: "/images/real/home/promo-agosto-zoopark-entradas-gratis-pousada-cataratas-foz-do-iguacu",
} as const;

export const PROMO_SAZONAL = {
  /** Interruptor único da promo de temporada. */
  ativa: true,

  /** Vigência, só para documentação — não é lida por nenhum componente. */
  vigencia: "01/09/2026 a 30/09/2026",

  /** O que se mostra enquanto `ativa` for true. */
  atual: {
    slug: "setembro-encantador",
    // Fotos reais do Zoopark. O nome do ficheiro diz "agosto-encantador" porque
    // foram tiradas para a promo de agosto — o parque é o mesmo, mudou só o mês.
    imgHome: "/images/real/home/zoopark-criancas-animais-agosto-encantador-pousada-cataratas-foz-do-iguacu.webp",
    imgCard: "/images/real/home/zoopark-menino-cabra-agosto-encantador-pousada-cataratas-foz-do-iguacu.webp",
    cor: "accent",
  } satisfies PromoSlot,

  /** O que ocupa o lugar quando `ativa` for false. */
  perene: {
    slug: "antecipada",
    imgHome: "/images/real/home/fachada-vista-rua-pousada-cataratas-foz-do-iguacu.webp",
    imgCard: "/images/real/home/fachada-palmeiras-pousada-cataratas-foz-do-iguacu.webp",
    cor: "dark",
  } satisfies PromoSlot,
} as const;

/** Imagens e slug do slot sazonal, já resolvidos pelo interruptor. */
export const promoSlot: PromoSlot = PROMO_SAZONAL.ativa
  ? PROMO_SAZONAL.atual
  : PROMO_SAZONAL.perene;

/** Cores de marca dos botões, para não repetir os hex nas páginas. */
export const PROMO_BTN_BG: Record<PromoSlot["cor"], string> = {
  accent: "#C79A6A",
  dark: "#143C7A",
};
