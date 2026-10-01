import type { Dictionary } from "@/i18n/getDictionary";

// ========================= AS PROMOÇÕES DO SITE =========================
// Este ficheiro é a ÚNICA lista de promoções. Lê-a quem precisar delas:
//   • a secção "Ofertas especiais" no topo da home (só as `destaque`)
//   • a lista "Confira as Promoções" mais abaixo na home (todas as ativas)
//   • a grelha de /promocoes (todas as ativas)
// Aqui ficam só o slug, as imagens e os interruptores; os TEXTOS de cada promo
// (sobretítulo, nome, gancho e alt das imagens) vivem em `promos` nos três
// dicionários — i18n/dictionaries/pt|es|en.json, indexados pela mesma `key`.
//
// 👉 DESLIGAR UMA PROMO: `ativa: false` — sai dos três sítios de uma vez. A
//    página de detalhe /promocao/<slug> continua a existir, só deixa de ser
//    anunciada.
// 👉 PROMO COM PRAZO: `fim: "AAAA-MM-DD"` (último dia da vigência, inclusive,
//    hora de Brasília). No dia seguinte sai sozinha da home e de /promocoes —
//    as duas páginas regeneram-se de hora a hora (`revalidate`).
// 👉 MUDAR QUAIS APARECEM NO TOPO DA HOME: mexer no `destaque`. São 3 cards
//    numa linha, por isso convém manter exatamente três com `destaque: true`.
// 👉 PROMO NOVA: acrescentar uma entrada aqui + o bloco de textos com a mesma
//    `key` nos três dicionários. Os textos da página de detalhe vivem em
//    `produtoDetails` (lib/data.ts + lib/translations).

/** Chaves do bloco `promos` do dicionário — o TypeScript garante que batem certo. */
export type PromoKey = keyof Dictionary["promos"];

export type Promo = {
  /** Onde estão os textos: dict.promos[key] */
  key: PromoKey;
  /** Slug da página de detalhe: /promocao/<slug> */
  slug: string;
  /** Miniatura do item da lista da home (formato paisagem, ~104x76). */
  imgHome: string;
  /** Imagem do card (recortada em 3/4). */
  imgCard: string;
  /** Cor do botão: dourado destaca, azul é o padrão. */
  cor: "accent" | "dark";
  /** Anunciada na home e na grelha? */
  ativa: boolean;
  /** Entra na secção de ofertas do topo da home? */
  destaque: boolean;
  /** Último dia da vigência (AAAA-MM-DD, inclusive). Sem isto, não caduca. */
  fim?: string;
};

/** Ainda dentro da vigência? Conta até ao fim do dia `fim` em Brasília (UTC-3). */
export function vigente(p: { fim?: string }, agora: Date = new Date()): boolean {
  if (!p.fim) return true;
  return agora.getTime() < new Date(`${p.fim}T23:59:59.999-03:00`).getTime();
}

// ---------------------------- SLOT SAZONAL ----------------------------
// Um lugar da lista roda a cada temporada: foi "Agosto Encantador", depois
// "Setembro Encantador", agora é "Outubro Kids".
//
// 👉 QUANDO OUTUBRO ACABAR não é preciso fazer nada: depois de `fim` o lugar
//    passa sozinho a mostrar a promo perene (Reserva antecipada). Para tirá-la
//    antes do prazo: `ativa: false`.
// 👉 TROCAR POR UMA PROMO NOVA: mudar o `slug`, as imagens e o `fim` em
//    `atual`, e os textos em `promos.sazonal` nos três dicionários.
export const PROMO_SAZONAL = {
  /** Interruptor único da promo de temporada. */
  ativa: true,

  /** O que se mostra enquanto `ativa` for true e a vigência não tiver acabado. */
  atual: {
    key: "sazonal",
    slug: "outubro-kids",
    // Estadias de 01/10 a 31/10/2026.
    fim: "2026-10-31",
    // Provisórias: fotos reais do ZooPark (tiradas para a promo de agosto,
    // daí o nome do ficheiro) até haver arte própria do Outubro Kids.
    imgHome: "/images/real/home/zoopark-criancas-animais-agosto-encantador-pousada-cataratas-foz-do-iguacu.webp",
    imgCard: "/images/real/home/zoopark-menino-cabra-agosto-encantador-pousada-cataratas-foz-do-iguacu.webp",
    cor: "accent",
  },

  /** O que ocupa o lugar quando `ativa` for false ou a vigência acabar. */
  perene: {
    key: "perene",
    slug: "antecipada",
    imgHome: "/images/real/home/fachada-vista-rua-pousada-cataratas-foz-do-iguacu.webp",
    imgCard: "/images/real/home/fachada-palmeiras-pousada-cataratas-foz-do-iguacu.webp",
    cor: "dark",
  },
} as const;

/** O slot sazonal resolvido no momento do pedido (interruptor + vigência). */
const slotSazonal = () =>
  PROMO_SAZONAL.ativa && vigente(PROMO_SAZONAL.atual) ? PROMO_SAZONAL.atual : PROMO_SAZONAL.perene;

// ------------------------------ A LISTA ------------------------------
// A ordem daqui é a ordem em que aparecem na home e na grelha.
const promos = (): Promo[] => [
  {
    key: "morador",
    slug: "morador",
    imgHome: "/images/real/home/entrada-pousada-cataratas-foz-do-iguacu.webp",
    imgCard: "/images/real/home/piscina-guarda-sol-pousada-cataratas-foz-do-iguacu.webp",
    cor: "dark",
    ativa: true,
    destaque: true,
  },
  {
    ...slotSazonal(),
    ativa: true,
    destaque: true,
  },
  {
    key: "day-use",
    slug: "day-use",
    imgHome: "/images/real/home/cafe-da-manha-pousada-cataratas-foz-do-iguacu.webp",
    imgCard: "/images/real/home/piscina-lazer-pousada-cataratas-foz-do-iguacu.webp",
    cor: "dark",
    ativa: true,
    destaque: false,
  },
  {
    key: "longa-estadia",
    slug: "longa-estadia",
    // O buffet do Aipim Gastronomia nos dois lugares: o almoço no restaurante é
    // o que a promoção tem de mais apetecível. As fotos da pousada ficam na
    // página de detalhe (`banner` e `galeria` em lib/data.ts).
    imgHome: "/images/real/promocoes/restaurante-aipim-gastronomia-buffet-almoco-pousada-cataratas-foz-do-iguacu.webp",
    imgCard: "/images/real/promocoes/restaurante-aipim-gastronomia-buffet-almoco-pousada-cataratas-foz-do-iguacu.webp",
    cor: "dark",
    ativa: true,
    destaque: true,
  },
];

/** As promoções anunciadas, por ordem. */
export const promosAtivas = (): Promo[] => promos().filter((p) => p.ativa && vigente(p));

/** As que abrem a home, na secção de ofertas por baixo do hero. */
export const promosDestaque = (): Promo[] => promos().filter((p) => p.ativa && p.destaque && vigente(p));

/** Data de fim (AAAA-MM-DD) da promo com este slug, se tiver prazo. */
export function fimDaPromo(slug: string): string | undefined {
  const comPrazo: { slug: string; fim?: string }[] = [PROMO_SAZONAL.atual, ...promos()];
  return comPrazo.find((p) => p.slug === slug && p.fim)?.fim;
}

/** A promo deste slug já passou do `fim`? (Página de detalhe: aviso + noindex.) */
export function promoEncerrada(slug: string, agora: Date = new Date()): boolean {
  const fim = fimDaPromo(slug);
  return !!fim && !vigente({ fim }, agora);
}

/** Junta a promo aos seus textos no idioma pedido. */
export function promoTexto(dict: Dictionary, p: Promo) {
  return dict.promos[p.key];
}

/** Cores de marca dos botões, para não repetir os hex nas páginas. */
export const PROMO_BTN_BG: Record<Promo["cor"], string> = {
  accent: "#C79A6A",
  dark: "#143C7A",
};

// Pop-up da home. Arte "Reserve direto e ganhe 10% OFF" (cupom CATARATAS10),
// numa versão por idioma (…-pt.webp / -es.webp / -en.webp). Não tem mês nem
// parque impressos, por isso não caduca sozinha: fica ligado enquanto o cupom
// valer no motor.
//
// 👉 PARA TROCAR A ARTE: gerar as três imagens, apontar "base" para o prefixo
//    comum (sem o -pt/-es/-en.webp) e ajustar os textos alternativos, o link e
//    as medidas em components/home/PromoPopup.tsx. Para desligar: ativo: false.
export const PROMO_POPUP = {
  ativo: true,
  base: "/images/real/home/promo-reserve-direto-10-off-cupom-cataratas10-pousada-cataratas-foz-do-iguacu",
} as const;
