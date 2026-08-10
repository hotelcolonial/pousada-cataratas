import type { CSSProperties } from "react";
import type { Locale } from "@/i18n/config";
import { mergeRecord, mergeList, pickText } from "./merge";
import { es as esText } from "./translations/es";
import { en as enText } from "./translations/en";

// Datos movidos desde el script de "Home Pousada Cataratas.dc.html" — valores y
// textos SIN cambios respecto al export.
//
// ============================ i18n (Fase 2) ============================
// Los objetos/arrays de abajo son la BASE CANÓNICA en portugués (contenido
// invariante + textos pt, definidos UNA sola vez, sin duplicar). Los selectores
// getX(lang) del final fusionan esa base con los overrides de TEXTO del locale
// (por ahora vacíos: solo existe pt). Al añadir es/en se rellenan esos overrides
// SOLO con los campos traducibles; los invariantes salen siempre de la base.
// Las páginas consumen los selectores en lugar de los datos estáticos.

// tagAccent / tagDark del export (mismos valores; expresados como objeto de estilo).
export const tagAccent: CSSProperties = {
  position: "absolute",
  top: "14px",
  right: 0,
  padding: "13px 26px",
  fontSize: "11px",
  letterSpacing: ".16em",
  textTransform: "uppercase",
  color: "#FFFFFF",
  background: "#C79A6A",
};
export const tagDark: CSSProperties = { ...tagAccent, background: "#143C7A" };

export type RgCard = {
  id: string;
  slug: string;
  name: string;
  img: string;
  price: string;
  tag: "accent" | "dark";
  guests: string;
  area: string;
};

// rgCards — grilla de quartos.
export const rgCards: RgCard[] = [
  {
    id: "rg-1",
    slug: "quarto-duplo",
    name: "Quarto Duplo",
    img: "/images/real/quartos/quarto-duplo-pousada-cataratas-foz-do-iguacu.webp",
    price: "Sob consulta",
    tag: "accent",
    guests: "2 hóspedes",
    area: "13 m²",
  },
  {
    id: "rg-2",
    slug: "quarto-triplo",
    name: "Quarto Triplo",
    img: "/images/real/quartos/quarto-triplo-pousada-cataratas-foz-do-iguacu.webp",
    price: "Sob consulta",
    tag: "dark",
    guests: "3 hóspedes",
    area: "18 m²",
  },
  {
    id: "rg-3",
    slug: "quarto-quadruplo",
    name: "Quarto Quádruplo",
    img: "/images/real/quartos/quarto-quadruplo-pousada-cataratas-foz-do-iguacu.webp",
    price: "Sob consulta",
    tag: "dark",
    guests: "4 hóspedes",
    area: "22 m²",
  },
  {
    id: "rg-4",
    slug: "quarto-quintuplo",
    name: "Quarto Quíntuplo",
    img: "/images/real/quartos/quarto-quintuplo-pousada-cataratas-foz-do-iguacu.webp",
    price: "Sob consulta",
    tag: "accent",
    guests: "5 hóspedes",
    area: "26 m²",
  },
];

export type Testimonial = { text: string; name: string; loc: string };

// TESTI — depoimentos.
export const TESTI: Testimonial[] = [
  {
    text: "Tenho uma empresa de turismo receptivo em Foz do Iguaçu e tenho me hospedado na Pousada Cataratas há cerca de 4 anos. Tenho notado que o estabelecimento está sempre passando por alguma melhoria, não é estático como a maioria dos meios de hospedagem.",
    name: "Shiroagente",
    loc: "",
  },
  {
    text: "Uma pousada super aconchegante, pessoal super atencioso, limpíssima! O café da manhã é simples mas delicioso, não deixa a desejar. Tem vaga pra carro e a piscina é simplesmente deliciosa, minha filha não queria sair. O café de cortesia na recepção 24h por dia. Sem falar da localização. Logo mais eu volto!",
    name: "R2562BHleandrod",
    loc: "",
  },
  {
    text: "Muito satisfeito com o custo-benefício, a equipe é muito competente, local familiar, limpo e organizado. Alguns dos colchões merecem atenção, mas voltarei com certeza. Ah, a localização é muito boa, em um bairro pacato e seguro.",
    name: "Sérgio Naves",
    loc: "",
  },
  {
    text: "Excelente pousada, atendimento familiar, muito aconchegante, muito limpa. Recomendo!",
    name: "David Felicio",
    loc: "",
  },
  {
    text: "Lugar excelente para desfrutar com familiares e amigos. Café delicioso, que pode ser tomado na beira da piscina, ambiente agradável, chuveiro ótimo, cama confortável, quarto amplo, aconchegante e limpo. Muito bom para ficar com a família.",
    name: "verapH5637GU",
    loc: "",
  },
];

export type QuartoCard = {
  id: string;
  slug: string;
  tag: string;
  name: string;
  guests: string;
  size: string;
  desc: string;
  img: string;
  ph: string;
};

// cards — grilla de "Nossos Quartos" (página Quartos). Valores sin cambios.
export const quartosCards: QuartoCard[] = [
  {
    id: "rc-card-1",
    slug: "quarto-duplo",
    tag: "Pousada Cataratas",
    name: "Quarto Duplo",
    guests: "2 hóspedes",
    size: "13 m²",
    desc: "Aconchegante e ideal para casais, com cama de casal, ar-condicionado e tudo para um descanso tranquilo.",
    img: "/images/real/quartos/quarto-duplo-pousada-cataratas-foz-do-iguacu.webp",
    ph: "Foto — Quarto Duplo",
  },
  {
    id: "rc-card-2",
    slug: "quarto-triplo",
    tag: "Pousada Cataratas",
    name: "Quarto Triplo",
    guests: "3 hóspedes",
    size: "18 m²",
    desc: "Mais espaço para quem viaja em trio ou pequenas famílias, sem abrir mão do conforto.",
    img: "/images/real/quartos/quarto-triplo-pousada-cataratas-foz-do-iguacu.webp",
    ph: "Foto — Quarto Triplo",
  },
  {
    id: "rc-card-3",
    slug: "quarto-quadruplo",
    tag: "Pousada Cataratas",
    name: "Quarto Quádruplo",
    guests: "4 hóspedes",
    size: "22 m²",
    desc: "Conforto para a família toda aproveitar Foz do Iguaçu junta, com bastante espaço.",
    img: "/images/real/quartos/quarto-quadruplo-pousada-cataratas-foz-do-iguacu.webp",
    ph: "Foto — Quarto Quádruplo",
  },
  {
    id: "rc-card-4",
    slug: "quarto-quintuplo",
    tag: "Pousada Cataratas",
    name: "Quarto Quíntuplo",
    guests: "5 hóspedes",
    size: "26 m²",
    desc: "O espaço mais amplo da pousada, perfeito para famílias maiores que buscam privacidade.",
    img: "/images/real/quartos/quarto-quintuplo-pousada-cataratas-foz-do-iguacu.webp",
    ph: "Foto — Suíte Família",
  },
];

export type GaleriaShot = { id: string; cat: string; img: string; alt: string };

// shots — grid filtrável da Galeria. Valores sin cambios.
export const galeriaShots: GaleriaShot[] = [
  { id: "g1", cat: "comuns", img: "/images/real/home/fachada-frontal-pousada-cataratas-foz-do-iguacu.webp", alt: "Fachada frontal da Pousada Cataratas em Foz do Iguaçu" },
  { id: "g2", cat: "piscina", img: "/images/real/home/piscina-pousada-cataratas-foz-do-iguacu.webp", alt: "Piscina da Pousada Cataratas em Foz do Iguaçu" },
  { id: "g3", cat: "quartos", img: "/images/real/quartos/quarto-duplo-pousada-cataratas-foz-do-iguacu.webp", alt: "Quarto Duplo da Pousada Cataratas em Foz do Iguaçu" },
  { id: "g4", cat: "comuns", img: "/images/real/home/cafe-da-manha-pousada-cataratas-foz-do-iguacu.webp", alt: "Café da manhã da Pousada Cataratas em Foz do Iguaçu" },
  { id: "g5", cat: "quartos", img: "/images/real/quartos/quarto-triplo-pousada-cataratas-foz-do-iguacu.webp", alt: "Quarto Triplo da Pousada Cataratas em Foz do Iguaçu" },
  { id: "g6", cat: "piscina", img: "/images/real/home/area-piscina-pousada-cataratas-foz-do-iguacu.webp", alt: "Área da piscina da Pousada Cataratas em Foz do Iguaçu" },
  { id: "g7", cat: "comuns", img: "/images/real/home/entrada-pousada-cataratas-foz-do-iguacu.webp", alt: "Entrada da Pousada Cataratas em Foz do Iguaçu" },
  { id: "g8", cat: "quartos", img: "/images/real/quartos/quarto-quadruplo-pousada-cataratas-foz-do-iguacu.webp", alt: "Quarto Quádruplo da Pousada Cataratas em Foz do Iguaçu" },
  { id: "g9", cat: "piscina", img: "/images/real/home/jardim-piscina-pousada-cataratas-foz-do-iguacu.webp", alt: "Jardim e piscina da Pousada Cataratas em Foz do Iguaçu" },
  { id: "g10", cat: "quartos", img: "/images/real/quartos/quarto-quintuplo-pousada-cataratas-foz-do-iguacu.webp", alt: "Quarto Quíntuplo da Pousada Cataratas em Foz do Iguaçu" },
  { id: "g11", cat: "comuns", img: "/images/real/home/area-externa-pousada-cataratas-foz-do-iguacu.webp", alt: "Área externa da Pousada Cataratas em Foz do Iguaçu" },
  { id: "g12", cat: "quartos", img: "/images/real/quartos/quarto-duplo-vista-ampla-pousada-cataratas-foz-do-iguacu.webp", alt: "Vista ampla do Quarto Duplo da Pousada Cataratas em Foz do Iguaçu" },
  { id: "g13", cat: "piscina", img: "/images/real/home/piscina-jardim-pousada-cataratas-foz-do-iguacu.webp", alt: "Piscina e jardim da Pousada Cataratas em Foz do Iguaçu" },
  { id: "g14", cat: "comuns", img: "/images/real/home/cafe-da-manha-buffet-pousada-cataratas-foz-do-iguacu.webp", alt: "Buffet de café da manhã da Pousada Cataratas em Foz do Iguaçu" },
  { id: "g15", cat: "quartos", img: "/images/real/quartos/quarto-triplo-camas-pousada-cataratas-foz-do-iguacu.webp", alt: "Camas do Quarto Triplo da Pousada Cataratas em Foz do Iguaçu" },
  { id: "g16", cat: "comuns", img: "/images/real/home/pousada-cataratas-foz-do-iguacu-fachada.webp", alt: "Fachada da Pousada Cataratas em Foz do Iguaçu" },
  { id: "g17", cat: "quartos", img: "/images/real/quartos/quarto-quadruplo-camas-pousada-cataratas-foz-do-iguacu.webp", alt: "Camas do Quarto Quádruplo da Pousada Cataratas em Foz do Iguaçu" },
  { id: "g18", cat: "comuns", img: "/images/real/home/estacionamento-pousada-cataratas-foz-do-iguacu.webp", alt: "Estacionamento da Pousada Cataratas em Foz do Iguaçu" },
  { id: "g19", cat: "quartos", img: "/images/real/quartos/quarto-quintuplo-camas-pousada-cataratas-foz-do-iguacu.webp", alt: "Camas do Quarto Quíntuplo da Pousada Cataratas em Foz do Iguaçu" },
  { id: "g20", cat: "quartos", img: "/images/real/quartos/quarto-duplo-cama-armario-pousada-cataratas-foz-do-iguacu.webp", alt: "Cama de casal e armário do Quarto Duplo da Pousada Cataratas em Foz do Iguaçu" },
  { id: "g21", cat: "quartos", img: "/images/real/quartos/quarto-triplo-varanda-banheiro-pousada-cataratas-foz-do-iguacu.webp", alt: "Varanda e banheiro do Quarto Triplo da Pousada Cataratas em Foz do Iguaçu" },
  { id: "g22", cat: "quartos", img: "/images/real/quartos/quarto-quadruplo-tv-banheiro-pousada-cataratas-foz-do-iguacu.webp", alt: "TV e banheiro do Quarto Quádruplo da Pousada Cataratas em Foz do Iguaçu" },
  { id: "g23", cat: "quartos", img: "/images/real/quartos/quarto-quintuplo-armario-banheiro-pousada-cataratas-foz-do-iguacu.webp", alt: "Armário e banheiro do Quarto Quíntuplo da Pousada Cataratas em Foz do Iguaçu" },
  { id: "g24", cat: "quartos", img: "/images/real/quartos/quarto-duplo-tv-banheiro-pousada-cataratas-foz-do-iguacu.webp", alt: "TV e banheiro do Quarto Duplo da Pousada Cataratas em Foz do Iguaçu" },
  { id: "g25", cat: "quartos", img: "/images/real/quartos/quarto-triplo-tv-armario-pousada-cataratas-foz-do-iguacu.webp", alt: "TV e armário do Quarto Triplo da Pousada Cataratas em Foz do Iguaçu" },
  { id: "g26", cat: "quartos", img: "/images/real/quartos/quarto-quadruplo-vista-ampla-pousada-cataratas-foz-do-iguacu.webp", alt: "Vista ampla do Quarto Quádruplo da Pousada Cataratas em Foz do Iguaçu" },
  { id: "g27", cat: "quartos", img: "/images/real/quartos/quarto-quintuplo-vista-ampla-pousada-cataratas-foz-do-iguacu.webp", alt: "Vista ampla do Quarto Quíntuplo da Pousada Cataratas em Foz do Iguaçu" },
  // Novas fotos reais (2026): quartos, áreas comuns (brinquedoteca, café da manhã, fachada) e piscina.
  { id: "g28", cat: "quartos", img: "/images/real/home/quarto-familia-quatro-camas-pousada-cataratas-foz-do-iguacu.webp", alt: "Quarto família com quatro camas, ar-condicionado e TV na Pousada Cataratas em Foz do Iguaçu" },
  { id: "g29", cat: "quartos", img: "/images/real/home/quarto-amplo-varias-camas-pousada-cataratas-foz-do-iguacu.webp", alt: "Quarto amplo com várias camas na Pousada Cataratas em Foz do Iguaçu" },
  { id: "g30", cat: "comuns", img: "/images/real/home/brinquedoteca-espaco-kids-pousada-cataratas-foz-do-iguacu.webp", alt: "Brinquedoteca com brinquedos e tapete colorido na Pousada Cataratas em Foz do Iguaçu" },
  { id: "g31", cat: "comuns", img: "/images/real/home/brinquedoteca-brinquedos-quadros-pousada-cataratas-foz-do-iguacu.webp", alt: "Brinquedoteca com brinquedos e quadros de animais na Pousada Cataratas em Foz do Iguaçu" },
  { id: "g32", cat: "comuns", img: "/images/real/home/espaco-kids-mesa-infantil-pousada-cataratas-foz-do-iguacu.webp", alt: "Espaço kids com mesa infantil e poltronas na Pousada Cataratas em Foz do Iguaçu" },
  { id: "g33", cat: "comuns", img: "/images/real/home/salao-cafe-da-manha-mesas-pousada-cataratas-foz-do-iguacu.webp", alt: "Salão de café da manhã com mesas de madeira na Pousada Cataratas em Foz do Iguaçu" },
  { id: "g34", cat: "comuns", img: "/images/real/home/cafe-da-manha-frios-frutas-pousada-cataratas-foz-do-iguacu.webp", alt: "Frios e frutas no café da manhã da Pousada Cataratas em Foz do Iguaçu" },
  { id: "g35", cat: "comuns", img: "/images/real/home/cafe-da-manha-pratos-quentes-pousada-cataratas-foz-do-iguacu.webp", alt: "Pratos quentes e ovos mexidos no café da manhã da Pousada Cataratas em Foz do Iguaçu" },
  { id: "g36", cat: "comuns", img: "/images/real/home/cafe-da-manha-bolos-paes-doces-pousada-cataratas-foz-do-iguacu.webp", alt: "Bolos, pães e doces no café da manhã da Pousada Cataratas em Foz do Iguaçu" },
  { id: "g37", cat: "comuns", img: "/images/real/home/cafe-da-manha-estacao-cafe-pousada-cataratas-foz-do-iguacu.webp", alt: "Estação de café e chá do café da manhã da Pousada Cataratas em Foz do Iguaçu" },
  { id: "g38", cat: "comuns", img: "/images/real/home/cafe-da-manha-beira-piscina-pousada-cataratas-foz-do-iguacu.webp", alt: "Café da manhã servido à beira da piscina na Pousada Cataratas em Foz do Iguaçu" },
  { id: "g39", cat: "comuns", img: "/images/real/home/fachada-vista-rua-pousada-cataratas-foz-do-iguacu.webp", alt: "Fachada da Pousada Cataratas vista da rua em Foz do Iguaçu" },
  { id: "g40", cat: "comuns", img: "/images/real/home/fachada-entrada-arborizada-pousada-cataratas-foz-do-iguacu.webp", alt: "Entrada arborizada da Pousada Cataratas em Foz do Iguaçu" },
  { id: "g41", cat: "comuns", img: "/images/real/home/placa-entrada-pousada-cataratas-foz-do-iguacu.webp", alt: "Placa e entrada da Pousada Cataratas em Foz do Iguaçu" },
  { id: "g42", cat: "piscina", img: "/images/real/home/piscina-vista-espreguicadeiras-guarda-sois-pousada-cataratas-foz-do-iguacu.webp", alt: "Vista da piscina com espreguiçadeiras e guarda-sóis na Pousada Cataratas em Foz do Iguaçu" },
  { id: "g43", cat: "piscina", img: "/images/real/home/piscina-area-descanso-ar-livre-pousada-cataratas-foz-do-iguacu.webp", alt: "Piscina e área de descanso ao ar livre da Pousada Cataratas em Foz do Iguaçu" },
  { id: "g44", cat: "piscina", img: "/images/real/home/piscina-jardim-espreguicadeiras-pousada-cataratas-foz-do-iguacu.webp", alt: "Piscina cercada por jardim com espreguiçadeiras na Pousada Cataratas em Foz do Iguaçu" },
  { id: "g45", cat: "piscina", img: "/images/real/home/piscina-area-convivencia-pousada-cataratas-foz-do-iguacu.webp", alt: "Piscina e área de convivência ao ar livre da Pousada Cataratas em Foz do Iguaçu" },
  { id: "g46", cat: "piscina", img: "/images/real/home/piscina-guarda-sois-sombra-pousada-cataratas-foz-do-iguacu.webp", alt: "Piscina com guarda-sóis e espreguiçadeiras à sombra na Pousada Cataratas em Foz do Iguaçu" },
  { id: "g47", cat: "piscina", img: "/images/real/home/piscina-espreguicadeiras-arvores-pousada-cataratas-foz-do-iguacu.webp", alt: "Piscina com espreguiçadeiras à sombra das árvores na Pousada Cataratas em Foz do Iguaçu" },
  { id: "g48", cat: "piscina", img: "/images/real/home/piscina-guarda-sol-vegetacao-pousada-cataratas-foz-do-iguacu.webp", alt: "Piscina e guarda-sol cercados de vegetação na Pousada Cataratas em Foz do Iguaçu" },
];

export type GaleriaTab = { id: string; label: string };

// tabDefs — categorias do filtro da Galeria.
export const galeriaTabs: GaleriaTab[] = [
  { id: "todos", label: "Todos" },
  { id: "quartos", label: "Quartos" },
  { id: "comuns", label: "Áreas comuns" },
  { id: "piscina", label: "Piscina" },
];

export type AtracaoFeatured = {
  id: string;
  revClass: string;
  badgeSide: string;
  href: string;
  eyebrow: string;
  name: string;
  dist: string;
  distLabel: string;
  img: string;
  desc: string;
};

// featured — destaques da página Atrações. Valores sin cambios.
export const atracoesFeatured: AtracaoFeatured[] = [
  { id: "at-feat-1", revClass: "", badgeSide: "", href: "Atracao.dc.html?atracao=cataratas", eyebrow: "Patrimônio natural", name: "Cataratas do Iguaçu", dist: "20", distLabel: "min de carro", img: "/images/real/atracoes/cataratas-do-iguacu-mirante-foz-do-iguacu.webp", desc: "Uma das Sete Maravilhas da Natureza, com mais de 270 quedas d'água cercadas por mata atlântica. Trilhas, passarelas e o famoso mirante da Garganta do Diabo, com fácil acesso a partir da pousada." },
  { id: "at-feat-2", revClass: "rev", badgeSide: "left", href: "Atracao.dc.html?atracao=parque-das-aves", eyebrow: "Vida selvagem", name: "Parque das Aves", dist: "15", distLabel: "min de carro", img: "/images/real/atracoes/parque-das-aves-jandaia-foz-do-iguacu.webp", desc: "O maior parque de aves da América Latina, com viveiros imersivos onde tucanos, araras e flamingos vivem pertinho de você. Um passeio perfeito para todas as idades, ao lado das Cataratas." },
  { id: "at-feat-3", revClass: "", badgeSide: "", href: "Atracao.dc.html?atracao=marco-tres-fronteiras", eyebrow: "Tríplice fronteira", name: "Marco das Três Fronteiras", dist: "25", distLabel: "min de carro", img: "/images/real/atracoes/marco-das-tres-fronteiras-obelisco-foz-do-iguacu.webp", desc: "O ponto onde Brasil, Argentina e Paraguai se encontram, às margens dos rios Iguaçu e Paraná. Mirante, gastronomia e um espetáculo de luzes ao entardecer." },
  { id: "at-feat-4", revClass: "rev", badgeSide: "left", href: "Atracao.dc.html?atracao=itaipu", eyebrow: "Engenharia & natureza", name: "Usina de Itaipu", dist: "35", distLabel: "min de carro", img: "/images/real/atracoes/usina-de-itaipu-barragem-foz-do-iguacu.webp", desc: "Uma das maiores hidrelétricas do mundo, com visitas guiadas, iluminação noturna e o Refúgio Biológico. Uma experiência que une tecnologia e preservação ambiental." },
  { id: "at-feat-5", revClass: "", badgeSide: "", href: "Atracao.dc.html?atracao=aquafoz", eyebrow: "Vida aquática", name: "AquaFoz", dist: "15", distLabel: "min de carro", img: "/images/real/atracoes/aqua-foz-grande-aquario-especies-marinhas.webp", desc: "Um dos maiores aquários da América do Sul: um circuito de 750 metros por três pavimentos que recria o caminho das águas dos rios Iguaçu e Paraná, com mais de 300 espécies de água doce e salgada, do Alto Iguaçu ao Oceano." },
];

export type AtracaoCard = { id: string; name: string; meta: string; badge: string; img: string; url: string };

// cards — grid "Mais para explorar em Foz".
export const atracoesCards: AtracaoCard[] = [
  { id: "at-card-1", name: "Adrena Kart", meta: "5 min · Aventura", badge: "Diversão", img: "/images/real/atracoes/adrena-kart-foz-do-iguacu.webp", url: "https://adrenakart.com.br/" },
  { id: "at-card-2", name: "Rafain Show", meta: "12 min · Gastronomia", badge: "Noite", img: "/images/real/atracoes/rafain-churrascaria-show-foz-do-iguacu.webp", url: "https://www.rafainchurrascaria.com.br/" },
  { id: "at-card-3", name: "Shopping Catuaí", meta: "14 min · Compras", badge: "Compras", img: "/images/real/atracoes/shopping-catuai-palladium-foz-do-iguacu.webp", url: "https://catuaipalladium.com.br/" },
];

export type AtracaoNearby = { name: string; dist: string };

// nearby — lista "No coração de Foz do Iguaçu".
export const atracoesNearby: AtracaoNearby[] = [
  { name: "Cataratas do Iguaçu", dist: "10 min" },
  { name: "Parque das Aves", dist: "6 min" },
  { name: "Marco das Três Fronteiras", dist: "15 min" },
  { name: "Usina de Itaipu", dist: "20 min" },
];

export type BlogPost = {
  id: string;
  cat: string;
  read: string;
  date: string;
  href: string;
  title: string;
  excerpt: string;
  img: string;
  ph: string;
};

// posts — grid de artigos do Blog. Valores sin cambios.
export const blogPosts: BlogPost[] = [
  { id: "bl-1", cat: "Roteiros", read: "4 min", date: "7 Jul 2026", href: "Artigo.dc.html?post=o-que-fazer-em-foz-do-iguacu-em-3-dias", title: "O que fazer em Foz do Iguaçu em 3 dias: roteiro completo para aproveitar cada hora", excerpt: "Roteiro de 3 dias em Foz do Iguaçu com as melhores atrações, dicas locais e tudo que você precisa saber para aproveitar cada hora.", img: "/images/blog/o-que-fazer-em-foz-do-iguacu-em-3-dias-roteiro-completo.webp", ph: "Foto — Roteiro 3 dias em Foz" },
  { id: "bl-2", cat: "Dicas de viagem", read: "4 min", date: "7 Jul 2026", href: "Artigo.dc.html?post=como-chegar-as-cataratas-do-iguacu-saindo-da-pousada", title: "Como chegar às Cataratas do Iguaçu saindo da pousada: guia prático para não perder tempo", excerpt: "Saindo da pousada, chegar às Cataratas do Iguaçu é mais fácil do que parece. Veja as melhores opções de transporte e economize tempo.", img: "/images/blog/como-chegar-cataratas-iguacu-saindo-pousada.webp", ph: "Foto — Como chegar às Cataratas" },
  { id: "bl-3", cat: "Hospedagem", read: "4 min", date: "7 Jul 2026", href: "Artigo.dc.html?post=onde-se-hospedar-perto-das-cataratas-com-bom-custo-beneficio", title: "Onde se hospedar perto das Cataratas com bom custo-benefício em Foz do Iguaçu", excerpt: "Saiba onde se hospedar perto das Cataratas com bom custo-benefício em Foz do Iguaçu e aproveite cada momento da sua viagem com conforto e economia.", img: "/images/real/home/piscina-jardim-pousada-cataratas-foz-do-iguacu.webp", ph: "Foto — Onde se hospedar em Foz" },
  { id: "bl-4", cat: "Atrações", read: "3 min", date: "7 Jul 2026", href: "Artigo.dc.html?post=o-que-fazer-em-foz-do-iguacu-alem-das-cataratas", title: "O que fazer em Foz do Iguaçu além das Cataratas: 7 atrações que valem cada dia a mais", excerpt: "Foz do Iguaçu tem muito além das Cataratas. Descubra 7 atrações que valem cada dia a mais na cidade e planeje sua visita com dicas locais.", img: "/images/blog/o-que-fazer-em-foz-do-iguacu-alem-das-cataratas.webp", ph: "Foto — Atrações além das Cataratas" },
];

export type BlogCategory = { name: string; count: number };

export const blogCategories: BlogCategory[] = [
  { name: "Roteiros", count: 1 },
  { name: "Dicas de viagem", count: 1 },
  { name: "Hospedagem", count: 1 },
  { name: "Atrações", count: 1 },
];

export type BlogRecent = { id: string; title: string; date: string; img: string; slug: string };

export const blogRecent: BlogRecent[] = [
  { id: "bl-rec-1", title: "O que fazer em Foz do Iguaçu em 3 dias", date: "7 Jul 2026", img: "/images/blog/o-que-fazer-em-foz-do-iguacu-em-3-dias-roteiro-completo.webp", slug: "o-que-fazer-em-foz-do-iguacu-em-3-dias" },
  { id: "bl-rec-2", title: "Como chegar às Cataratas do Iguaçu saindo da pousada", date: "7 Jul 2026", img: "/images/blog/como-chegar-cataratas-iguacu-saindo-pousada.webp", slug: "como-chegar-as-cataratas-do-iguacu-saindo-da-pousada" },
  { id: "bl-rec-3", title: "Onde se hospedar perto das Cataratas com bom custo-benefício", date: "7 Jul 2026", img: "/images/real/home/piscina-jardim-pousada-cataratas-foz-do-iguacu.webp", slug: "onde-se-hospedar-perto-das-cataratas-com-bom-custo-beneficio" },
  { id: "bl-rec-4", title: "O que fazer em Foz do Iguaçu além das Cataratas", date: "7 Jul 2026", img: "/images/blog/o-que-fazer-em-foz-do-iguacu-alem-das-cataratas.webp", slug: "o-que-fazer-em-foz-do-iguacu-alem-das-cataratas" },
];

export const blogTags: string[] = ["Cataratas", "Roteiros", "Transporte", "Hospedagem", "Atrações", "Gastronomia", "Foz do Iguaçu"];

// ============ DETALLE: QUARTO (Quarto.dc.html) — indexado por slug ============

export type QuartoDetail = {
  id: string;
  slug: string;
  tag: string;
  name: string;
  guests: string;
  size: string;
  price: string;
  img: string;
  longDesc: string;
  longDesc2: string;
  gallery: string[];
  photos?: { src: string; alt: string }[];
};

// rooms — mapa por slug (mismo id que las cards del listado Quartos). Valores sin cambios.
export const quartoRooms: Record<string, QuartoDetail> = {
  "quarto-duplo": {
    id: "rc-card-1", slug: "quarto-duplo", tag: "Pousada Cataratas", name: "Quarto Duplo", guests: "2 hóspedes", size: "13 m²", price: "320",
    img: "/images/real/quartos/quarto-duplo-pousada-cataratas-foz-do-iguacu.webp",
    longDesc: "Aconchegante e ideal para casais ou viagens a dois, o Quarto Duplo reúne tudo o que você precisa para um descanso tranquilo entre um passeio e outro pelas Cataratas.",
    longDesc2: "Cama de casal confortável, ar-condicionado, Wi-Fi grátis e um banheiro privativo bem equipado, num ambiente silencioso e bem cuidado.",
    gallery: [
      "/images/pexels/pexels-271618-w700.jpg",
      "/images/pexels/pexels-271643-w700.jpg",
      "/images/pexels/pexels-97083-w700.jpg",
    ],
    photos: [
      { src: "/images/real/quartos/quarto-duplo-pousada-cataratas-foz-do-iguacu.webp", alt: "Quarto Duplo da Pousada Cataratas em Foz do Iguaçu com cama de casal" },
      { src: "/images/real/quartos/quarto-duplo-cama-armario-pousada-cataratas-foz-do-iguacu.webp", alt: "Cama de casal, armário e frigobar do Quarto Duplo da Pousada Cataratas em Foz do Iguaçu" },
      { src: "/images/real/quartos/quarto-duplo-tv-banheiro-pousada-cataratas-foz-do-iguacu.webp", alt: "TV, espelho e bancada de granito do Quarto Duplo da Pousada Cataratas em Foz do Iguaçu" },
      { src: "/images/real/quartos/quarto-duplo-vista-ampla-pousada-cataratas-foz-do-iguacu.webp", alt: "Vista ampla do Quarto Duplo da Pousada Cataratas em Foz do Iguaçu" },
    ],
  },
  "quarto-triplo": {
    id: "rc-card-2", slug: "quarto-triplo", tag: "Pousada Cataratas", name: "Quarto Triplo", guests: "3 hóspedes", size: "18 m²", price: "420",
    img: "/images/real/quartos/quarto-triplo-pousada-cataratas-foz-do-iguacu.webp",
    longDesc: "Mais espaço para quem viaja em trio ou em pequenas famílias, o Quarto Triplo oferece conforto extra sem abrir mão da tranquilidade.",
    longDesc2: "Camas confortáveis, ar-condicionado, Wi-Fi grátis e banheiro privativo, num ambiente pensado para todos descansarem bem.",
    gallery: [
      "/images/pexels/pexels-271639-w700.jpg",
      "/images/pexels/pexels-237371-w700.jpg",
      "/images/pexels/pexels-97083-w700.jpg",
    ],
    photos: [
      { src: "/images/real/quartos/quarto-triplo-pousada-cataratas-foz-do-iguacu.webp", alt: "Quarto Triplo da Pousada Cataratas em Foz do Iguaçu com cama de casal e cama de solteiro" },
      { src: "/images/real/quartos/quarto-triplo-camas-pousada-cataratas-foz-do-iguacu.webp", alt: "Cama de casal e cama de solteiro do Quarto Triplo da Pousada Cataratas em Foz do Iguaçu" },
      { src: "/images/real/quartos/quarto-triplo-varanda-banheiro-pousada-cataratas-foz-do-iguacu.webp", alt: "Quarto Triplo da Pousada Cataratas com varanda, bancada e espelho em Foz do Iguaçu" },
      { src: "/images/real/quartos/quarto-triplo-tv-armario-pousada-cataratas-foz-do-iguacu.webp", alt: "TV, armário e frigobar do Quarto Triplo da Pousada Cataratas em Foz do Iguaçu" },
    ],
  },
  "quarto-quadruplo": {
    id: "rc-card-3", slug: "quarto-quadruplo", tag: "Pousada Cataratas", name: "Quarto Quádruplo", guests: "4 hóspedes", size: "22 m²", price: "520",
    img: "/images/real/quartos/quarto-quadruplo-pousada-cataratas-foz-do-iguacu.webp",
    longDesc: "Conforto para a família toda aproveitar Foz do Iguaçu junta. O Quarto Quádruplo tem bastante espaço para que todos descansem bem entre os passeios.",
    longDesc2: "Camas confortáveis, ar-condicionado, Wi-Fi grátis e banheiro privativo, num ambiente amplo e bem iluminado.",
    gallery: [
      "/images/pexels/pexels-271643-w700.jpg",
      "/images/pexels/pexels-271618-w700.jpg",
      "/images/pexels/pexels-164595-w700.jpg",
    ],
    photos: [
      { src: "/images/real/quartos/quarto-quadruplo-pousada-cataratas-foz-do-iguacu.webp", alt: "Quarto Quádruplo da Pousada Cataratas em Foz do Iguaçu com cama de casal e camas de solteiro" },
      { src: "/images/real/quartos/quarto-quadruplo-camas-pousada-cataratas-foz-do-iguacu.webp", alt: "Camas do Quarto Quádruplo da Pousada Cataratas em Foz do Iguaçu, ideal para famílias" },
      { src: "/images/real/quartos/quarto-quadruplo-tv-banheiro-pousada-cataratas-foz-do-iguacu.webp", alt: "Quarto Quádruplo da Pousada Cataratas com TV, armário e banheiro privativo em Foz do Iguaçu" },
      { src: "/images/real/quartos/quarto-quadruplo-vista-ampla-pousada-cataratas-foz-do-iguacu.webp", alt: "Vista ampla do Quarto Quádruplo da Pousada Cataratas em Foz do Iguaçu" },
    ],
  },
  "quarto-quintuplo": {
    id: "rc-card-4", slug: "quarto-quintuplo", tag: "Pousada Cataratas", name: "Quarto Quíntuplo", guests: "5 hóspedes", size: "26 m²", price: "620",
    img: "/images/real/quartos/quarto-quintuplo-pousada-cataratas-foz-do-iguacu.webp",
    longDesc: "O espaço mais amplo da pousada, perfeito para famílias maiores que buscam privacidade e conforto durante a estadia em Foz do Iguaçu.",
    longDesc2: "Várias camas, ar-condicionado, Wi-Fi grátis e banheiro privativo, num ambiente espaçoso pensado para grupos.",
    gallery: [
      "/images/pexels/pexels-261102-w700.jpg",
      "/images/pexels/pexels-271639-w700.jpg",
      "/images/pexels/pexels-271624-w700.jpg",
    ],
    photos: [
      { src: "/images/real/quartos/quarto-quintuplo-pousada-cataratas-foz-do-iguacu.webp", alt: "Quarto Quíntuplo da Pousada Cataratas em Foz do Iguaçu, amplo e para famílias" },
      { src: "/images/real/quartos/quarto-quintuplo-camas-pousada-cataratas-foz-do-iguacu.webp", alt: "Camas do Quarto Quíntuplo da Pousada Cataratas em Foz do Iguaçu, ideal para grupos" },
      { src: "/images/real/quartos/quarto-quintuplo-armario-banheiro-pousada-cataratas-foz-do-iguacu.webp", alt: "Quarto Quíntuplo da Pousada Cataratas com armário e banheiro privativo em Foz do Iguaçu" },
      { src: "/images/real/quartos/quarto-quintuplo-vista-ampla-pousada-cataratas-foz-do-iguacu.webp", alt: "Vista ampla do Quarto Quíntuplo da Pousada Cataratas em Foz do Iguaçu" },
    ],
  },
};

export type IconItem = { label: string; d: string };

// amenities — serviços do quarto (fixos para todos). Valores sin cambios.
export const quartoAmenities: IconItem[] = [
  { label: "Ar-condicionado", d: "M3 8h18M6 12h.01M10 12h8M6 16h.01M10 16h6" },
  { label: "Frigobar", d: "M6 3h12v18H6zM6 10h12M9 6v1M9 13v3" },
  { label: "TV", d: "M3 5h18v12H3zM8 21h8" },
  { label: "Wi-Fi grátis", d: "M5 12.5a10 10 0 0 1 14 0M8 15.5a6 6 0 0 1 8 0M12 18.5h.01" },
  { label: "Banheiro privativo", d: "M7 10V6a2 2 0 0 1 4 0M4 10h16v2a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5zM7 22l1-3M17 22l-1-3" },
  { label: "Cofre", d: "M4 5h16v14H4zM15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM12 12h.01" },
  { label: "Secador de cabelo", d: "M3 7h11a4 4 0 0 1 0 8h-2l-1 4M3 7v8h8M8 11h.01" },
  { label: "Café da manhã", d: "M5 8h12v4a5 5 0 0 1-5 5H10a5 5 0 0 1-5-5zM17 9h2a2 2 0 0 1 0 4h-2M8 4v1M11 4v1" },
  { label: "Roupa de cama e toalhas", d: "M3 18v-6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6M3 14h18M7 10V8a1 1 0 0 1 1-1h3" },
];

export type QuartoAround = { title: string; img: string; slug: string };

// around — "Ao redor da pousada" (fixo para todos). Cada card enlaza a su atração.
export const quartoAround: QuartoAround[] = [
  { title: "Cataratas do Iguaçu", img: "/images/real/atracoes/cataratas-do-iguacu-foz.webp", slug: "cataratas" },
  { title: "Parque das Aves", img: "/images/real/atracoes/parque-das-aves-foz-do-iguacu.webp", slug: "parque-das-aves" },
  { title: "Marco das Três Fronteiras", img: "/images/real/atracoes/marco-das-tres-fronteiras-foz-do-iguacu.webp", slug: "marco-tres-fronteiras" },
];

// ============ DETALLE: ATRAÇÃO (Atracao.dc.html) — indexado por slug ============

export type AtracaoSpec = { label: string; value: string };

export type AtracaoDetail = {
  slug: string;
  eyebrow: string;
  kicker: string;
  name: string;
  banner: string;
  foto: string;
  desc1: string;
  desc2: string;
  specs: AtracaoSpec[];
  gallery: string[];
};

// Orden de las atracciones (para "Outras atrações"). Sin cambios.
export const atracaoOrder = ["cataratas", "parque-das-aves", "marco-tres-fronteiras", "itaipu", "aquafoz", "compras-paraguai"];

// Mapa por slug. Valores/textos sin cambios respecto al export.
export const atracaoDetails: Record<string, AtracaoDetail> = {
  "cataratas": {
    slug: "cataratas",
    eyebrow: "Patrimônio natural",
    kicker: "Foz do Iguaçu",
    name: "Cataratas do Iguaçu",
    banner: "/images/real/atracoes/cataratas-do-iguacu-vista-aerea-foz-do-iguacu.webp",
    foto: "/images/real/atracoes/cataratas-do-iguacu-passarelas-foz-do-iguacu.webp",
    desc1: "Uma das Sete Maravilhas da Natureza, formada por mais de 270 quedas dágua cercadas pela mata atlântica do Parque Nacional do Iguaçu. As passarelas levam até a imponente Garganta do Diabo, onde a força da água impressiona de perto.",
    desc2: "O passeio combina trilhas leves, mirantes e muita natureza. Reserve algumas horas para aproveitar com calma — e prepare-se para se molhar perto das quedas.",
    specs: [
      { label: "Distância", value: "20 min" },
      { label: "Duração", value: "3–4 h" },
      { label: "Melhor horário", value: "Manhã" },
      { label: "Ingresso", value: "Pago" },
    ],
    gallery: [
      "/images/pexels/pexels-460621-w900.jpg",
      "/images/pexels/pexels-2437291-w900.jpg",
      "/images/pexels/pexels-552785-w900.jpg",
    ],
  },
  "parque-das-aves": {
    slug: "parque-das-aves",
    eyebrow: "Vida selvagem",
    kicker: "Foz do Iguaçu",
    name: "Parque das Aves",
    banner: "/images/real/atracoes/parque-das-aves-arara-azul-foz-do-iguacu.webp",
    foto: "/images/real/atracoes/parque-das-aves-mapa-foz-do-iguacu.webp",
    desc1: "O maior parque de aves da América Latina, com viveiros imersivos onde você caminha lado a lado com tucanos, araras e flamingos. Um mergulho na biodiversidade da mata atlântica, ao lado das Cataratas.",
    desc2: "O percurso é tranquilo e acessível, perfeito para todas as idades. Reserve cerca de duas horas para apreciar cada viveiro com calma.",
    specs: [
      { label: "Distância", value: "15 min" },
      { label: "Duração", value: "2 h" },
      { label: "Melhor horário", value: "Manhã" },
      { label: "Ingresso", value: "Pago" },
    ],
    gallery: [
      "/images/pexels/pexels-38136-w900.jpg",
      "/images/pexels/pexels-56733-w900.jpg",
    ],
  },
  "marco-tres-fronteiras": {
    slug: "marco-tres-fronteiras",
    eyebrow: "Tríplice fronteira",
    kicker: "Foz do Iguaçu",
    name: "Marco das Três Fronteiras",
    banner: "/images/real/atracoes/marco-das-tres-fronteiras-fontes-noite-foz-do-iguacu.webp",
    foto: "/images/real/atracoes/marco-das-tres-fronteiras-gastronomia-foz-do-iguacu.webp",
    desc1: "O ponto onde Brasil, Argentina e Paraguai se encontram, às margens dos rios Iguaçu e Paraná. Um marco histórico com mirante, gastronomia e um espetáculo de luzes ao entardecer.",
    desc2: "Vá no fim da tarde para ver o pôr do sol sobre os três países e ficar para o show de luz e som. Um programa leve e cheio de paisagem.",
    specs: [
      { label: "Distância", value: "25 min" },
      { label: "Duração", value: "2 h" },
      { label: "Melhor horário", value: "Entardecer" },
      { label: "Ingresso", value: "Pago" },
    ],
    gallery: [
      "/images/pexels/pexels-2387873-w900.jpg",
      "/images/pexels/pexels-1655817-w900.jpg",
      "/images/pexels/pexels-3225517-w900.jpg",
    ],
  },
  "itaipu": {
    slug: "itaipu",
    eyebrow: "Engenharia & natureza",
    kicker: "Foz do Iguaçu",
    name: "Usina de Itaipu",
    banner: "/images/real/atracoes/usina-de-itaipu-vertedouro-foz-do-iguacu.webp",
    foto: "/images/real/atracoes/usina-de-itaipu-visita-foz-do-iguacu.webp",
    desc1: "Uma das maiores hidrelétricas do mundo, com visitas guiadas que revelam a escala impressionante da barragem. À noite, a iluminação especial transforma a estrutura num espetáculo à parte.",
    desc2: "Há também o Refúgio Biológico e o ecomuseu, que unem tecnologia e preservação ambiental. Escolha entre os roteiros panorâmico e especial conforme o tempo disponível.",
    specs: [
      { label: "Distância", value: "35 min" },
      { label: "Duração", value: "2–3 h" },
      { label: "Melhor horário", value: "Tarde" },
      { label: "Ingresso", value: "Pago" },
    ],
    gallery: [
      "/images/pexels/pexels-532192-w900.jpg",
      "/images/pexels/pexels-1108572-w900.jpg",
      "/images/pexels/pexels-414837-w900.jpg",
    ],
  },
  "compras-paraguai": {
    slug: "compras-paraguai",
    eyebrow: "Compras & fronteira",
    kicker: "Ciudad del Este",
    name: "Compras no Paraguai",
    banner: "/images/real/atracoes/compras-ciudad-del-este-paraguai-lojas.webp",
    foto: "/images/real/atracoes/ponte-da-amizade-foz-do-iguacu.webp",
    desc1: "Do outro lado da fronteira, em Ciudad del Este, fica um dos maiores polos de compras da América do Sul. Eletrônicos, perfumes, brinquedos e novidades a preços que valem a travessia da Ponte da Amizade.",
    desc2: "Vá pela manhã para aproveitar melhor e leve um documento com foto. A nossa equipe ajuda a organizar o transporte e a orientar sobre a cota de compras na volta ao Brasil.",
    specs: [
      { label: "Distância", value: "25 min" },
      { label: "Duração", value: "3–4 h" },
      { label: "Melhor horário", value: "Manhã" },
      { label: "Ingresso", value: "Grátis" },
    ],
    gallery: [
      "/images/pexels/pexels-264636-w900.jpg",
      "/images/pexels/pexels-1884581-w900.jpg",
      "/images/pexels/pexels-2387873-w900.jpg",
    ],
  },
  "aquafoz": {
    slug: "aquafoz",
    eyebrow: "Vida aquática",
    kicker: "Foz do Iguaçu",
    name: "AquaFoz",
    banner: "/images/real/atracoes/aqua-foz-grande-aquario-tanque-principal.webp",
    foto: "/images/real/atracoes/aqua-foz-experiencia-interativa-educacao-ambiental.webp",
    desc1: "Um dos maiores aquários da América do Sul. Com 23 mil m² e cerca de 3,3 milhões de litros d'água, o AquaFoz recria o caminho das águas dos rios Iguaçu e Paraná num circuito de 750 metros distribuído em três pavimentos.",
    desc2: "São mais de 300 espécies de água doce e salgada — do Alto Iguaçu à Floresta Alagada, da Amazônia ao Oceano. Uma jornada imersiva que une encantamento e educação ambiental, perfeita para todas as idades, na Av. das Cataratas.",
    specs: [
      { label: "Distância", value: "15 min" },
      { label: "Duração", value: "2–3 h" },
      { label: "Melhor horário", value: "Manhã" },
      { label: "Ingresso", value: "Pago" },
    ],
    gallery: [
      "/images/pexels/pexels-8970782-w900.jpg",
      "/images/pexels/pexels-12829679-w900.jpg",
      "/images/pexels/pexels-15212560-w900.jpg",
    ],
  },
};

// Valores por defecto (iguais para todas as atrações no export).
// "O que fazer" específico por atração.
export const atracaoDoItems: Record<string, string[]> = {
  "cataratas": [
    "Passarela das Cataratas",
    "Garganta do Diabo",
    "Trilhas na mata atlântica",
    "Mirantes panorâmicos",
    "Fotografia das quedas",
    "Cafés e lanchonetes no Porto Canoas",
  ],
  "parque-das-aves": [
    "Viveiros imersivos de mata atlântica",
    "Ver tucanos, araras e flamingos de perto",
    "Borboletário e viveiro de beija-flores",
    "Encontro com araras",
    "Fotografia com as aves",
    "Loja e café do parque",
  ],
  "marco-tres-fronteiras": [
    "Mirante das três fronteiras",
    "Espetáculo de luzes ao entardecer",
    "Vila gastronômica",
    "Apresentações culturais",
    "Fotografia do obelisco",
    "Pôr do sol às margens do Rio Paraná",
  ],
  "itaipu": [
    "Visita panorâmica à barragem",
    "Ver o vertedouro em funcionamento",
    "Iluminação noturna da usina",
    "Refúgio Biológico Bela Vista",
    "Ecomuseu de Itaipu",
    "Circuito especial guiado",
  ],
  "aquafoz": [
    "Circuito imersivo de 750 metros",
    "Grande aquário e tanque principal",
    "Ver mais de 300 espécies",
    "Túnel submerso",
    "Experiências interativas",
    "Educação ambiental para todas as idades",
  ],
  "compras-paraguai": [
    "Travessia da Ponte da Amizade",
    "Eletrônicos, perfumes e novidades",
    "Shoppings de Ciudad del Este",
    "Brinquedos e presentes",
    "Câmbio e boas barganhas",
    "Gastronomia na fronteira",
  ],
};
// Passo a passo "Como chegar" por atração (a pousada fica na Av. das Cataratas,
// R. Parigot de Souza / Vila Yolanda). Vias reais verificadas.
export const atracaoSteps: Record<string, string[]> = {
  "cataratas": [
    "Saia da pousada e pegue a Av. das Cataratas (BR-469) sentido Parque Nacional",
    "Siga pela rodovia por cerca de 10 km, sempre em frente",
    "Entre pelo pórtico do Parque Nacional do Iguaçu",
    "Estacione no Centro de Visitantes e siga para as passarelas das Cataratas",
  ],
  "parque-das-aves": [
    "Saia da pousada e pegue a Av. das Cataratas (BR-469) sentido Parque Nacional",
    "Siga por poucos minutos em direção ao pórtico do Parque Nacional",
    "O Parque das Aves fica à direita, pouco antes da entrada do parque",
    "Estacione em frente ao Parque das Aves",
  ],
  "marco-tres-fronteiras": [
    "Saia da pousada em direção ao centro de Foz do Iguaçu",
    "Siga pela Av. General Meira sentido Jardim Eldorado",
    "Continue até as margens do Rio Paraná",
    "Chegada ao Marco das Três Fronteiras",
  ],
  "itaipu": [
    "Saia da pousada em direção ao centro de Foz do Iguaçu",
    "Pegue a Av. Tancredo Neves sentido bairro Itaipu (norte)",
    "Siga pela avenida por cerca de 6 km",
    "Chegada ao Centro de Recepção de Visitantes (Av. Tancredo Neves, 6702)",
  ],
  "compras-paraguai": [
    "Saia da pousada em direção ao centro de Foz do Iguaçu",
    "Siga sentido Ponte da Amizade, sobre o Rio Paraná",
    "Atravesse a ponte rumo a Ciudad del Este, no Paraguai",
    "Leve documento com foto e atenção à cota de compras na volta",
  ],
  "aquafoz": [
    "Saia da pousada e pegue a Av. das Cataratas (BR-469) sentido Parque Nacional",
    "Siga pela rodovia até o KM 18 da Av. das Cataratas",
    "O AquaFoz fica à margem da avenida, bem sinalizado",
    "Estacione e comece o circuito pelo Rio Iguaçu, rumo ao Oceano",
  ],
};

// ============ DETALLE: PROMOÇÃO (Promocao.dc.html) — indexado por slug ============

export type PromocaoDetail = {
  name: string;
  sub: string;
  discount: string;
  validity: string;
  img: string;
  heroSlot: string;
  desc: string;
  desc2: string;
  conditions: string[];
};

// Mapa por slug. Valores/textos sin cambios respecto al export.
export const promocaoDetails: Record<string, PromocaoDetail> = {
  "longa-estadia": {
    name: "Pacote longa estadia",
    sub: "A partir de 5 diárias",
    discount: "15%",
    validity: "Válido para estadias de 5 noites ou mais",
    img: "/images/pexels/pexels-164595-w1600.jpg",
    heroSlot: "promo-hero-1",
    desc: "Fique mais dias e pague menos. Ideal para quem quer explorar Foz do Iguaçu com calma, aproveitando cada atração sem pressa e com o conforto da pousada como base.",
    desc2: "Quanto mais noites, melhor a tarifa. Fale com a nossa equipe e monte a estadia perfeita para a sua viagem.",
    conditions: ["Café da manhã incluso", "Wi-Fi grátis em toda a pousada", "Estacionamento privativo", "Melhor tarifa garantida"],
  },
  "morador": {
    name: "Tarifa morador",
    sub: "Para moradores de Foz e região",
    discount: "25%",
    validity: "Mediante comprovante de endereço",
    img: "/images/pexels/pexels-271624-w1600.jpg",
    heroSlot: "promo-hero-2",
    desc: "Condição especial para quem é de Foz do Iguaçu e região e quer aproveitar um descanso pertinho de casa, com toda a estrutura e o atendimento caloroso da pousada.",
    desc2: "Apresente o comprovante de endereço na reserva e garanta 25% de desconto na diária, exclusivo para moradores de Foz do Iguaçu e região. 1 criança de até 5 anos tem cortesia.",
    conditions: ["Café da manhã incluso", "Wi-Fi grátis em toda a pousada", "Estacionamento privativo", "Comprovante de endereço"],
  },
  "antecipada": {
    name: "Reserva antecipada",
    sub: "Reservando com antecedência",
    discount: "12%",
    validity: "Reservas feitas com 30 dias de antecedência",
    img: "/images/pexels/pexels-261102-w1600.jpg",
    heroSlot: "promo-hero-3",
    desc: "Planeje sua viagem com antecedência e economize. Quem reserva antes garante a melhor tarifa e a tranquilidade de já ter tudo pronto para a viagem.",
    desc2: "Reserve com pelo menos 30 dias de antecedência e aproveite o desconto exclusivo.",
    conditions: ["Café da manhã incluso", "Wi-Fi grátis em toda a pousada", "Estacionamento privativo", "Cancelamento flexível"],
  },
};

// ============ DETALLE: PRODUTO (Produto.dc.html) — indexado por slug ============
// Enlazado desde el listado Promoções ("Reservar"). Usa el mismo ?promo= que a
// promoção, pero con banner/foto/descrições propios (valores sin cambios).

export type ProdutoDetail = {
  name: string;
  banner: string;
  foto: string;
  // Alt/título SEO específico de la foto (opcional). Si no se define, se usa el
  // texto genérico dict.alt.produtoFoto.
  fotoAlt?: string;
  desc1: string;
  desc2: string;
  // Mensaje de WhatsApp específico de esta oferta (opcional, siempre en PT).
  // Si no se define, el botón usa el mensaje genérico (WHATSAPP_HREF).
  waMessage?: string;
};

export const produtoDetails: Record<string, ProdutoDetail> = {
  "longa-estadia": {
    name: "Pacote longa estadia",
    banner: "/images/real/home/jardim-piscina-pousada-cataratas-foz-do-iguacu.webp",
    foto: "/images/real/quartos/quarto-quadruplo-vista-ampla-pousada-cataratas-foz-do-iguacu.webp",
    desc1: "Fique mais dias e pague menos. Ideal para quem quer explorar Foz do Iguaçu com calma, aproveitando cada atração sem pressa e com o conforto da pousada como base para conhecer as Cataratas, o Parque das Aves e os arredores.",
    desc2: "A partir de 5 diárias você garante até 15% de desconto. A diária já inclui café da manhã, Wi-Fi grátis e estacionamento privativo — quanto mais noites, melhor a tarifa.",
  },
  "morador": {
    name: "Tarifa morador",
    banner: "/images/real/home/piscina-lazer-pousada-cataratas-foz-do-iguacu.webp",
    foto: "/images/real/home/piscina-guarda-sol-pousada-cataratas-foz-do-iguacu.webp",
    desc1: "Condição especial para moradores da região de Foz do Iguaçu e arredores. Aproveite a pousada como seu refúgio perto de casa, com toda a estrutura e o conforto de sempre.",
    desc2: "Moradores de Foz do Iguaçu e região têm 25% de desconto na diária mediante comprovante de endereço. 1 criança de até 5 anos tem cortesia. Café da manhã, Wi-Fi grátis e estacionamento inclusos.",
  },
  "antecipada": {
    name: "Reserva antecipada",
    banner: "/images/real/home/fachada-frontal-pousada-cataratas-foz-do-iguacu.webp",
    foto: "/images/real/home/fachada-palmeiras-pousada-cataratas-foz-do-iguacu.webp",
    desc1: "Planeje sua viagem com antecedência e pague menos. Reservando com bastante folga você garante a melhor tarifa e tranquilidade para organizar cada detalhe do passeio.",
    desc2: "Reservando com antecedência você ganha 12% de desconto na diária. A condição inclui café da manhã, Wi-Fi grátis e estacionamento privativo.",
  },
  // ——— Promos nuevas (contenido placeholder; ajustar textos definitivos) ———
  "day-use": {
    name: "Day Use",
    banner: "/images/real/home/area-piscina-pousada-cataratas-foz-do-iguacu.webp",
    foto: "/images/real/home/piscina-pousada-cataratas-foz-do-iguacu.webp",
    desc1: "Aproveite a estrutura da Pousada Cataratas por um dia, sem precisar se hospedar. Perfeito para quem está de passagem por Foz do Iguaçu e quer relaxar entre um passeio e outro.",
    desc2: "O Day Use custa R$ 90 por pessoa e dá acesso às áreas de lazer da pousada durante o dia, das 9h às 18h. 1 criança de até 5 anos tem cortesia. A partir de 3 pagantes, incluímos um apartamento. Consulte a disponibilidade com a nossa equipe.",
    waMessage: "Olá, vim do site e tenho interesse no Day Use",
  },
  "agosto-encantador": {
    name: "Agosto Encantador",
    banner: "/images/real/home/area-externa-pousada-cataratas-foz-do-iguacu.webp",
    foto: "/images/real/home/zoopark-criancas-animais-agosto-encantador-pousada-cataratas-foz-do-iguacu.webp",
    fotoAlt: "Crianças alimentando cabras no Zoopark em Foz do Iguaçu — promoção Agosto Encantador da Pousada Cataratas",
    desc1: "Uma promoção especial para tornar o seu agosto inesquecível em Foz do Iguaçu. Hospede-se com a gente e ganhe dois ingressos para o Zoopark, um dos passeios mais encantadores da região.",
    desc2: "Aproveite o conforto da pousada e viva a natureza de perto, com dois ingressos ao Zoopark inclusos na sua estadia. Fale com a nossa equipe e garanta a sua reserva.",
  },
};

export type ProdutoRelated = { name: string; img: string; badge: boolean; quartoSlug: string };

// "Você também pode gostar" — 4 quartos fijos (sin cambios). Los links a
// Quarto.dc.html?room=rc-card-N se mapean a los slugs legibles del detalle Quarto.
export const produtoRelated: ProdutoRelated[] = [
  { name: "Quarto Duplo", img: "/images/real/quartos/quarto-duplo-pousada-cataratas-foz-do-iguacu.webp", badge: true, quartoSlug: "quarto-duplo" },
  { name: "Quarto Triplo", img: "/images/real/quartos/quarto-triplo-pousada-cataratas-foz-do-iguacu.webp", badge: false, quartoSlug: "quarto-triplo" },
  { name: "Quarto Quádruplo", img: "/images/real/quartos/quarto-quadruplo-pousada-cataratas-foz-do-iguacu.webp", badge: false, quartoSlug: "quarto-quadruplo" },
  { name: "Quarto Quíntuplo", img: "/images/real/quartos/quarto-quintuplo-pousada-cataratas-foz-do-iguacu.webp", badge: true, quartoSlug: "quarto-quintuplo" },
];

// ============ DETALLE: ARTIGO (Artigo.dc.html) — indexado por slug ============
// 4 posts reais. Cada um traz cabeçalho + body (ArtigoBlock[]) renderizado pelo
// template. Os slugs coincidem com os href de blogPosts (?post=<slug>).

// Bloque de cuerpo del artículo. Cada tipo se renderiza con los mismos estilos del
// export (ar-p / ar-drop para el primero, ar-h2, blockquote, figure+figcaption).
export type ArtigoBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "quote"; text: string }
  | { type: "list"; items: string[] }
  | { type: "figure"; img: string; caption: string };

export type ArtigoDetail = {
  category: string;
  title: string;
  cover: string;
  date: string;
  author: string;
  readTime: string;
  body: ArtigoBlock[];
};

export const artigoDetails: Record<string, ArtigoDetail> = {
  "o-que-fazer-em-foz-do-iguacu-em-3-dias": {
    category: "Roteiros",
    title: "O que fazer em Foz do Iguaçu em 3 dias: roteiro completo para aproveitar cada hora",
    cover: "/images/blog/o-que-fazer-em-foz-do-iguacu-em-3-dias-roteiro-completo.webp",
    date: "7 de Julho, 2026",
    author: "Equipe Pousada Cataratas",
    readTime: "4 min de leitura",
    body: [
      { type: "p", text: "Três dias parecem pouco até você perceber que Foz do Iguaçu concentra algumas das paisagens mais impressionantes do planeta a poucos quilômetros uma da outra. Se você quer saber o que fazer em Foz do Iguaçu em 3 dias sem perder tempo nem dinheiro, chegou ao lugar certo. Este roteiro foi pensado por quem conhece cada cantinho da cidade e recebe visitantes o ano todo." },
      { type: "h2", text: "Dia 1: Cataratas do Iguaçu e Parque das Aves de manhã cedo" },
      { type: "p", text: "Comece pelo mais grandioso: as Cataratas do Iguaçu. Chegue antes das 9h para pegar a trilha com menos gente e luz boa para as fotos. A caminhada principal tem cerca de 1,2 km e termina na passarela da Garganta do Diabo brasileira, com o spray da água batendo no rosto. Reserve pelo menos duas horas aqui." },
      { type: "p", text: "Logo na saída do parque nacional, o Parque das Aves vale a parada. Em menos de uma hora você atravessa viveiros com araras, tucanos e garças de perto, numa visita relaxada que funciona bem para crianças e casais. Almoce ali perto e descanse à tarde, porque o segundo dia exige fôlego." },
      { type: "h3", text: "O que levar para as Cataratas" },
      { type: "list", items: [
        "Roupa de secagem rápida, porque você vai se molhar na passarela final",
        "Protetor solar e repelente, a trilha passa por área aberta",
        "Calçado fechado e antiderrapante para o piso molhado",
        "Câmera ou celular bem protegido numa bolsa impermeável",
      ] },
      { type: "h2", text: "Dia 2: Itaipu de manhã e Tríplice Fronteira ao entardecer" },
      { type: "p", text: "A Usina de Itaipu abre às 8h e oferece visitas guiadas com diferentes níveis de profundidade. O passeio panorâmico já impressiona bastante e dura cerca de uma hora. Para quem quer ver as turbinas por dentro, o circuito especial precisa de agendamento prévio. Vale o investimento. À tarde, o Marco das Três Fronteiras reúne Brasil, Argentina e Paraguai num único mirante à beira do Rio Paraná. O pôr do sol dali, com as águas encontrando, é um encerramento perfeito para o dia." },
      { type: "h2", text: "Dia 3: natureza, compras e um ritmo mais tranquilo" },
      { type: "p", text: "O terceiro dia é o momento de respirar fundo e aproveitar o que sobrou da lista. Muita gente usa essa manhã para revisitar algum ponto favorito ou explorar o Parque Nacional com mais calma, sem o rush do primeiro dia. Se você ainda não foi até a Trilha do Poço Preto, esse é o momento certo: são quase oito quilômetros entre mata fechada, com avistamento de aves e paradas à beira do rio. É o lado selvagem e silencioso de Foz que poucos turistas descobrem." },
      { type: "p", text: "À tarde, a Feira de Ciudad del Este, do lado paraguaio, atrai quem quer eletrônicos, perfumes e roupas a preços competitivos. A travessia pela Ponte da Amizade é simples: leve documento, fique atento ao limite de compras permitido pela Receita Federal e pronto. Não precisa de visto. Se a fronteira não for a sua praia, o centro de Foz tem lojas, mercadinhos e uma cena gastronômica árabe surpreendente, herança da comunidade libanesa que vive na cidade há décadas." },
      { type: "h3", text: "Dicas para aproveitar Ciudad del Este sem estresse" },
      { type: "list", items: [
        "Vá cedo, de preferência antes das 10h: o movimento aumenta muito no fim da manhã.",
        "Leve reais e dólares. O câmbio local aceita os dois, mas compare antes de pagar.",
        "Guarde as notas fiscais de tudo que comprar para facilitar na volta pela aduana.",
        "Evite o sábado se puder: é o dia de maior movimento na ponte e nas lojas.",
      ] },
      { type: "h2", text: "Onde ficar para aproveitar tudo isso sem perder tempo" },
      { type: "p", text: "Saber o que fazer em Foz do Iguaçu em 3 dias é meio caminho andado. A outra metade é ter uma base bem localizada, onde você chega descansado, come bem de manhã e ainda sai sem engarrafar. A nossa pousada fica a poucos minutos das Cataratas, com acesso fácil tanto para o lado brasileiro quanto para a Tríplice Fronteira e Itaipu. Sem carro, sem complicação: muitos dos nossos hóspedes fazem tudo de táxi ou aplicativo e gastam muito menos do que imaginavam." },
      { type: "p", text: "Se você está planejando essa viagem, reserva direto com a gente. Aqui você encontra um atendimento de quem conhece cada canto da cidade e quer te ajudar a aproveitar cada hora dos seus três dias em Foz. Manda uma mensagem, conta seu roteiro e a gente te dá uma mãozinha para ajustar o que precisar." },
    ],
  },
  "como-chegar-as-cataratas-do-iguacu-saindo-da-pousada": {
    category: "Dicas de viagem",
    title: "Como chegar às Cataratas do Iguaçu saindo da pousada: guia prático para não perder tempo",
    cover: "/images/blog/como-chegar-cataratas-iguacu-saindo-pousada.webp",
    date: "7 de Julho, 2026",
    author: "Equipe Pousada Cataratas",
    readTime: "4 min de leitura",
    body: [
      { type: "p", text: "Você acorda, toma um café quentinho e já sente o cheiro da mata. Sabe que as Cataratas do Iguaçu estão ali, a poucos minutos. Mas como chegar às Cataratas do Iguaçu saindo da nossa pousada da forma mais rápida e tranquila possível? Essa é a dúvida mais comum de quem está prestes a reservar, e a gente responde com tudo que você precisa saber antes mesmo de arrumar a mochila." },
      { type: "h2", text: "A distância que faz toda a diferença" },
      { type: "p", text: "A pousada fica a aproximadamente 100 metros da Avenida das Cataratas, a via principal que conecta Foz do Iguaçu à entrada do Parque Nacional. Isso significa que, enquanto outros hóspedes ainda estão no carro saindo do centro da cidade, você já está no caminho. Não é pouca coisa quando se considera que o parque abre cedo e a fila para entrar cresce rápido nos fins de semana e feriados." },
      { type: "p", text: "Essa localização coloca você no corredor natural de acesso ao parque, com fácil saída para qualquer modal de transporte que você prefira. A seguir, a gente detalha cada opção para você escolher a que faz mais sentido para o seu roteiro." },
      { type: "h2", text: "Ir a pé: sim, é possível e bem simples" },
      { type: "p", text: "Para quem curte uma caminhada matinal, a entrada principal do Parque Nacional do Iguaçu fica a cerca de 3 km da pousada, sempre seguindo pela Avenida das Cataratas. O percurso tem calçada boa parte do trecho e passa por verde dos dois lados da via. Em dias de sol, é um começo de manhã bem agradável. Leva em torno de 35 a 40 minutos em ritmo tranquilo." },
      { type: "h3", text: "O que levar se for a pé" },
      { type: "list", items: [
        "Protetor solar aplicado antes de sair, porque o trecho tem trechos sem sombra",
        "Garrafa de água, já que dentro do parque as opções de compra ficam concentradas em pontos específicos",
        "Calçado fechado e confortável, o chão das trilhas dentro do parque é irregular em alguns trechos",
        "O ingresso comprado com antecedência pelo site oficial do ICMBio, para não perder tempo na bilheteria",
      ] },
      { type: "h2", text: "De carro próprio ou alugado: rápido e sem complicação" },
      { type: "p", text: "Se você veio de carro ou alugou um em Foz, a saída da pousada já cai direto na Avenida das Cataratas. São menos de 5 minutos de viagem até o estacionamento do parque, que cobra uma taxa separada do ingresso. Chegar cedo compensa, porque as vagas perto da entrada esgotam nas temporadas de alta." },
      { type: "h2", text: "Transporte público: a linha que leva direto ao parque" },
      { type: "p", text: "Quem prefere não dirigir tem uma opção prática e barata: o ônibus da linha 120, conhecido como 'Cataratas', passa pela Avenida das Cataratas e leva até a entrada do parque. O trajeto dura entre 15 e 25 minutos dependendo do tráfego, e a parada mais próxima da pousada fica a menos de dois minutos a pé. O bilhete sai por um valor bem acessível, e você encontra o horário atualizado diretamente no aplicativo da TCFOZ ou perguntando na recepção." },
      { type: "p", text: "Uma dica real: evite pegar o ônibus entre 9h e 10h nos fins de semana de temporada alta. O veículo costuma lotar, e esperar o próximo pode custar 20 minutos preciosos. Saindo às 8h, você chega antes da fila engrossar e ainda aproveita a luz da manhã nas trilhas." },
      { type: "h2", text: "Táxi e aplicativos: quando vale a pena pagar um pouco mais" },
      { type: "p", text: "Aplicativos como 99 e Uber funcionam bem em Foz do Iguaçu. A corrida da pousada até a portaria do parque fica em torno de 10 a 15 reais, dependendo do horário. Não é nada absurdo se você está com criança pequena, muita bagagem de dia, ou simplesmente quer porta a porta sem pensar em estacionamento. Táxi convencional também circula pela avenida e pode ser chamado na recepção." },
      { type: "h3", text: "Horários do parque: não chegue sem checar" },
      { type: "list", items: [
        "O Parque Nacional do Iguaçu abre às 9h e fecha às 17h na maior parte do ano, com variações sazonais.",
        "O ingresso precisa ser comprado com antecedência pelo site do ICMBio; não é possível comprar na bilheteria física.",
        "A última entrada permitida costuma ser até 16h, então planeje chegar com folga.",
        "Domingos e feriados têm fluxo bem maior, vale sair da pousada mais cedo.",
      ] },
      { type: "h2", text: "Resumo para quem já está quase decidindo" },
      { type: "p", text: "Saber como chegar às Cataratas do Iguaçu a partir da pousada é mais simples do que parece, justamente porque a localização resolve boa parte do problema. A pé, de carro, de ônibus ou de aplicativo, o caminho é curto e sem rodeios. O que muda é o seu ritmo no dia: quem vai a pé escolhe a calma, quem vai de carro escolhe a flexibilidade, quem vai de ônibus escolhe o bolso mais leve." },
      { type: "p", text: "Se tiver qualquer dúvida sobre horário de saída, como comprar o ingresso ou o que levar na mochila, pode perguntar na recepção antes de dormir. Aqui a gente conhece cada detalhe do caminho, e adoramos ajudar você a aproveitar cada minuto nas Cataratas." },
    ],
  },
  "onde-se-hospedar-perto-das-cataratas-com-bom-custo-beneficio": {
    category: "Hospedagem",
    title: "Onde se hospedar perto das Cataratas com bom custo-benefício em Foz do Iguaçu",
    cover: "/images/real/home/piscina-jardim-pousada-cataratas-foz-do-iguacu.webp",
    date: "7 de Julho, 2026",
    author: "Equipe Pousada Cataratas",
    readTime: "4 min de leitura",
    body: [
      { type: "p", text: "Você pesquisou, comparou, abriu dezenas de abas e ainda não sabe onde se hospedar perto das Cataratas com bom custo-benefício. Foz do Iguaçu tem opções pra todo gosto, mas a diferença entre chegar descansado e pronto pra aproveitar ou perder horas no trânsito começa na escolha da hospedagem. E essa escolha importa mais do que parece." },
      { type: "h2", text: "O que faz uma hospedagem valer cada real que você paga" },
      { type: "p", text: "Preço baixo não é sinônimo de custo-benefício. Quem já ficou num hotel distante sabe: o que você economiza no diário, você gasta em táxi, em tempo perdido e no cansaço de chegar nas atrações depois de uma hora de estrada. A equação muda quando a pousada fica a poucos minutos das Cataratas do Iguaçu e ainda entrega limpeza impecável, atendimento de gente que conhece a cidade de verdade e estacionamento seguro pra você largar o carro sem preocupação." },
      { type: "p", text: "As avaliações de quem já se hospedou em Foz apontam sempre os mesmos pontos: a cama boa, o café da manhã farto, a piscina que salva no calor do Paraná e o cuidado de quem recebe. São esses detalhes que fazem a viagem valer." },
      { type: "figure", img: "/images/real/home/fachada-frontal-pousada-cataratas-foz-do-iguacu.webp", caption: "A Pousada Cataratas fica a poucos minutos das Cataratas do Iguaçu, com piscina, café da manhã incluso e estacionamento seguro." },
      { type: "h3", text: "O que os hóspedes mais elogiam nas pousadas de Foz" },
      { type: "list", items: [
        "Limpeza e organização dos quartos e áreas comuns",
        "Atendimento próximo e dicas locais que não aparecem em guia nenhum",
        "Estacionamento seguro incluso, sem taxa surpresa no checkout",
        "Piscina disponível pra descomprimir depois de um dia nas Cataratas",
        "Localização que coloca você a minutos dos principais atrativos",
      ] },
      { type: "p", text: "Na prática, uma pousada bem localizada em Foz do Iguaçu resolve de uma vez o problema de deslocamento, segurança e conforto. Você acorda, toma café e já está perto de tudo, seja das Cataratas, seja da tríplice fronteira com Argentina e Paraguai. É exatamente esse conjunto que transforma uma hospedagem comum num ponto de partida que faz sentido pra sua viagem." },
      { type: "h2", text: "Pousada ou hotel: onde seu dinheiro rende mais em Foz do Iguaçu" },
      { type: "p", text: "Quem pesquisa onde se hospedar perto das Cataratas com bom custo-benefício esbarra rápido numa dúvida real: vale a pena pagar mais por um hotel grande ou uma pousada entrega o mesmo conforto com mais vantagem? A resposta, na maioria das vezes, pende pra pousada. Não porque seja 'mais barata' no sentido genérico, mas porque o que você recebe em troca é mais denso: atendimento que reconhece o seu nome, estacionamento sem taxa extra escondida no checkout e aquela piscina que aparece como bônus no meio do calor de Foz." },
      { type: "p", text: "Hotéis maiores cobram pela estrutura que você talvez nunca use, salão de convenções, spa completo, restaurante gourmet. Já numa pousada bem gerida, cada real vai direto pro que importa: cama boa, banheiro limpo, café da manhã farto e uma recepção que te indica o melhor horário pra entrar nas Cataratas sem encarar fila." },
      { type: "h3", text: "O que olhar além do preço na hora de comparar" },
      { type: "list", items: [
        "Distância real até as Cataratas: calcule em minutos de carro, não só em quilômetros no mapa.",
        "Estacionamento incluso e seguro, especialmente se você vier de carro ou alugou um na chegada.",
        "Piscina disponível sem horário restrito, ótima pra descansar depois de um dia longo no Parque Nacional.",
        "Café da manhã incluso: economiza uma refeição inteira e te bota na estrada já alimentado.",
        "Avaliações recentes sobre limpeza e atendimento, não só sobre a estrutura física.",
      ] },
      { type: "h2", text: "Por que a localização decide mais do que qualquer outra coisa" },
      { type: "p", text: "Foz do Iguaçu não é uma cidade grande, mas o trânsito na alta temporada surpreende. Ficar num ponto estratégico significa chegar nas Cataratas antes do pico de visitantes, aproveitar uma tarde na tríplice fronteira sem correria e ainda ter energia pra um jantar tranquilo de volta. Cada minuto economizado em deslocamento é um minuto a mais dentro do Parque, ou simplesmente descansando na pousada." },
      { type: "h2", text: "Garanta sua estadia antes que os melhores quartos saiam do mapa" },
      { type: "p", text: "Foz do Iguaçu lota rápido nos feriados e no verão. Quem deixa pra última hora acaba escolhendo entre o que sobrou, pagando mais caro por menos conforto ou ficando longe de tudo que planejou. Se a sua viagem já tem data, não empurra a reserva. Escolhe uma pousada com boa localização, estacionamento, piscina e atendimento de quem conhece a cidade de verdade. Depois é só chegar, abrir a janela e deixar o barulho das quedas d'água fazer o resto." },
    ],
  },
  "o-que-fazer-em-foz-do-iguacu-alem-das-cataratas": {
    category: "Atrações",
    title: "O que fazer em Foz do Iguaçu além das Cataratas: 7 atrações que valem cada dia a mais",
    cover: "/images/blog/o-que-fazer-em-foz-do-iguacu-alem-das-cataratas.webp",
    date: "7 de Julho, 2026",
    author: "Equipe Pousada Cataratas",
    readTime: "3 min de leitura",
    body: [
      { type: "p", text: "Você chegou em Foz do Iguaçu, ficou de boca aberta nas Cataratas e pensou: 'e agora?' A boa notícia é que a cidade tem muito mais do que essa paisagem já inesquecível. Saber o que fazer em Foz do Iguaçu além das Cataratas é o segredo para transformar uma visita rápida em alguns dos melhores dias de viagem que você já teve." },
      { type: "h2", text: "Foz guarda surpresas para quem fica mais de um dia" },
      { type: "p", text: "Quem reserva só uma diária costuma ir embora com a sensação de que deixou coisa para trás. E deixou mesmo. A região da tríplice fronteira, onde Brasil, Argentina e Paraguai se encontram, concentra parques, gastronomia, shows noturnos e adrenalina suficiente para ocupar uma semana inteira sem repetir programa." },
      { type: "p", text: "A distância entre os principais pontos é curta, o que torna tudo mais fácil. Com uma boa base, você parte cedo, aproveita o dia inteiro e volta sem estresse. É exatamente esse conforto que a nossa pousada oferece: localização estratégica, café da manhã caprichado e equipe pronta para indicar o caminho certo." },
      { type: "h2", text: "Parque das Aves: cores que nenhuma foto faz jus" },
      { type: "p", text: "A poucos metros da entrada das Cataratas, o Parque das Aves reúne mais de 1.400 espécies em um ambiente de Mata Atlântica preservada. Você caminha dentro de viveiros enormes, com tucanos, araras e papagaios voando ao seu redor. Separe pelo menos duas horas e leve repelente." },
      { type: "h3", text: "O que observar para aproveitar melhor a visita" },
      { type: "list", items: [
        "Chegue cedo: os pássaros estão mais ativos nas primeiras horas da manhã.",
        "Fique atento ao viveiro das maritacas, onde elas pousam no seu ombro.",
        "Combine a visita com as Cataratas no mesmo dia, já que os dois ficam na mesma avenida.",
        "Crianças pagam meia ou entram de graça dependendo da idade, confirme na hora.",
      ] },
      { type: "p", text: "E isso é só o começo. Foz ainda reserva velocidade no kartódromo, sabores da fronteira e shows que animam a noite inteira. Nos próximos tópicos, a gente te conta tudo para você chegar preparado e não perder nada." },
      { type: "h2", text: "Adrena Kart: adrenalina de verdade a poucos minutos das Cataratas" },
      { type: "p", text: "Se você pensa que Foz é só natureza, o kartódromo Adrena Kart vai te surpreender. Com pistas profissionais e karts velozes, é parada certa para quem quer quebrar o ritmo entre um passeio e outro. Perfeito para casais, amigos ou para aquele familiar competitivo que aparece em toda viagem." },
      { type: "h2", text: "Sabores da tríplice fronteira: comer bem também é programa" },
      { type: "p", text: "A gastronomia de Foz mistura sotaques brasileiros, argentinos e paraguaios no mesmo prato. Churrascarias robustas, comidinhas típicas no mercado e restaurantes que combinam temperos dos três países formam um roteiro à parte para quem curte comer bem sem gastar muito." },
      { type: "list", items: [
        "Experimente o tereré gelado, bebida típica que os locais adoram nos dias quentes",
        "Não saia sem provar a empanada argentina em alguma das casas perto da fronteira",
        "Os mercados do lado paraguaio têm lanches rápidos e baratos para repor a energia entre passeios",
      ] },
      { type: "h2", text: "Rafain e IPORÃ: a noite em Foz tem show garantido" },
      { type: "p", text: "Quando o sol vai embora, Foz acende outra chama. O Show Rafain reúne danças folclóricas de vários países sul-americanos em um espetáculo colorido e animado. Já o IPORÃ aposta em uma leitura mais contemporânea da cultura local, com música ao vivo e apresentações que prendem a atenção do começo ao fim. Planejar ao menos uma noite para esses shows é a decisão certa." },
      { type: "h3", text: "Dica de quem conhece: reserve o show com antecedência" },
      { type: "p", text: "Nos fins de semana e feriados, as sessões lotam rápido. Garantir o ingresso antes evita frustração e ainda deixa o restante do dia mais tranquilo, sem aquela correria de última hora." },
      { type: "p", text: "Agora você já sabe o que fazer em Foz do Iguaçu além das Cataratas, e percebeu que a cidade pede mais dias do que a maioria das pessoas reserva. Nossa pousada fica pertinho de todos esses atrativos, com o aconchego de quem recebe você como visita de casa. Escolha as datas, faça sua reserva e deixa que a gente cuida do resto." },
    ],
  },
};

// Listas fijas del sidebar/artículo (sin cambios respecto al export).
export const artigoTags: string[] = ["Cataratas", "Roteiros", "Transporte", "Hospedagem", "Atrações", "Gastronomia", "Foz do Iguaçu"];

export const artigoCategories: { name: string; count: number }[] = [
  { name: "Roteiros", count: 1 },
  { name: "Dicas de viagem", count: 1 },
  { name: "Hospedagem", count: 1 },
  { name: "Atrações", count: 1 },
];

export const artigoRecent: { title: string; date: string; img: string; slug: string }[] = [
  { title: "O que fazer em Foz do Iguaçu em 3 dias", date: "7 Jul 2026", img: "/images/blog/o-que-fazer-em-foz-do-iguacu-em-3-dias-roteiro-completo.webp", slug: "o-que-fazer-em-foz-do-iguacu-em-3-dias" },
  { title: "Como chegar às Cataratas do Iguaçu saindo da pousada", date: "7 Jul 2026", img: "/images/blog/como-chegar-cataratas-iguacu-saindo-pousada.webp", slug: "como-chegar-as-cataratas-do-iguacu-saindo-da-pousada" },
  { title: "Onde se hospedar perto das Cataratas com bom custo-benefício", date: "7 Jul 2026", img: "/images/real/home/piscina-jardim-pousada-cataratas-foz-do-iguacu.webp", slug: "onde-se-hospedar-perto-das-cataratas-com-bom-custo-beneficio" },
  { title: "O que fazer em Foz do Iguaçu além das Cataratas", date: "7 Jul 2026", img: "/images/blog/o-que-fazer-em-foz-do-iguacu-alem-das-cataratas.webp", slug: "o-que-fazer-em-foz-do-iguacu-alem-das-cataratas" },
];

// related: se filtra o post atual na página e mostra até 3.
export const artigoRelated: { href: string; title: string; date: string; img: string }[] = [
  { href: "/blog/o-que-fazer-em-foz-do-iguacu-em-3-dias", title: "O que fazer em Foz do Iguaçu em 3 dias", date: "7 Jul 2026", img: "/images/blog/o-que-fazer-em-foz-do-iguacu-em-3-dias-roteiro-completo.webp" },
  { href: "/blog/como-chegar-as-cataratas-do-iguacu-saindo-da-pousada", title: "Como chegar às Cataratas do Iguaçu saindo da pousada", date: "7 Jul 2026", img: "/images/blog/como-chegar-cataratas-iguacu-saindo-pousada.webp" },
  { href: "/blog/onde-se-hospedar-perto-das-cataratas-com-bom-custo-beneficio", title: "Onde se hospedar perto das Cataratas com bom custo-benefício", date: "7 Jul 2026", img: "/images/real/home/piscina-jardim-pousada-cataratas-foz-do-iguacu.webp" },
  { href: "/blog/o-que-fazer-em-foz-do-iguacu-alem-das-cataratas", title: "O que fazer em Foz do Iguaçu além das Cataratas", date: "7 Jul 2026", img: "/images/blog/o-que-fazer-em-foz-do-iguacu-alem-das-cataratas.webp" },
];

// ======================================================================
// SELECTORES i18n — fusionan la base pt de arriba con los overrides de texto
// del locale (Fase 2: overrides vacíos → devuelven exactamente los valores pt).
// Las páginas y componentes consumen ESTOS selectores, no los datos estáticos.
// Cuando se añadan es/en, se rellena el objeto de overrides de cada selector
// (p. ej. `{ es: { "rc-card-1": { name: "..." } } }`) solo con campos de texto.
// ======================================================================

// Mapa de textos { es, en } por dataset (pt sale de la base de arriba).
const T = <K extends keyof typeof esText>(key: K) => ({ es: esText[key], en: enText[key] });

// ---- Home: cards de quartos (RgCard) ----
export function getRgCards(lang: Locale): RgCard[] {
  return mergeList<RgCard, Partial<RgCard>>(rgCards, (c) => c.id, T("rgCards"), lang);
}

// ---- Home: depoimentos (Testimonial) — 100% texto ----
export function getTesti(lang: Locale): Testimonial[] {
  return pickText({ pt: TESTI, es: esText.testi, en: enText.testi }, lang);
}

// ---- Listado Quartos (QuartoCard) ----
export function getQuartosCards(lang: Locale): QuartoCard[] {
  return mergeList<QuartoCard, Partial<QuartoCard>>(quartosCards, (c) => c.id, T("quartosCards"), lang);
}

// ---- Galería: fotos y pestañas ----
export function getGaleriaShots(lang: Locale): GaleriaShot[] {
  return mergeList<GaleriaShot, Partial<GaleriaShot>>(galeriaShots, (s) => s.id, T("galeriaShots"), lang);
}
export function getGaleriaTabs(lang: Locale): GaleriaTab[] {
  return mergeList<GaleriaTab, Partial<GaleriaTab>>(galeriaTabs, (t) => t.id, T("galeriaTabs"), lang);
}

// ---- Listado Atrações ----
export function getAtracoesFeatured(lang: Locale): AtracaoFeatured[] {
  return mergeList<AtracaoFeatured, Partial<AtracaoFeatured>>(atracoesFeatured, (f) => f.id, T("atracoesFeatured"), lang);
}
export function getAtracoesCards(lang: Locale): AtracaoCard[] {
  return mergeList<AtracaoCard, Partial<AtracaoCard>>(atracoesCards, (c) => c.id, T("atracoesCards"), lang);
}
export function getAtracoesNearby(lang: Locale): AtracaoNearby[] {
  return mergeList<AtracaoNearby, Partial<AtracaoNearby>>(atracoesNearby, (n) => n.name, T("atracoesNearby"), lang);
}

// ---- Blog: grid, categorías, recientes, tags ----
export function getBlogPosts(lang: Locale): BlogPost[] {
  return mergeList<BlogPost, Partial<BlogPost>>(blogPosts, (p) => p.id, T("blogPosts"), lang);
}
export function getBlogCategories(lang: Locale): BlogCategory[] {
  return mergeList<BlogCategory, Partial<BlogCategory>>(blogCategories, (c) => c.name, T("blogCategories"), lang);
}
export function getBlogRecent(lang: Locale): BlogRecent[] {
  return mergeList<BlogRecent, Partial<BlogRecent>>(blogRecent, (r) => r.id, T("blogRecent"), lang);
}
export function getBlogTags(lang: Locale): string[] {
  return pickText({ pt: blogTags, es: esText.blogTags, en: enText.blogTags }, lang);
}

// ---- Detalle Quarto (getRooms) ----
export function getRooms(lang: Locale): Record<string, QuartoDetail> {
  return mergeRecord<QuartoDetail, Partial<QuartoDetail>>(quartoRooms, T("rooms"), lang);
}
export function getQuartoAmenities(lang: Locale): IconItem[] {
  return mergeList<IconItem, Partial<IconItem>>(quartoAmenities, (a) => a.label, T("quartoAmenities"), lang);
}
export function getQuartoAround(lang: Locale): QuartoAround[] {
  return mergeList<QuartoAround, Partial<QuartoAround>>(quartoAround, (a) => a.slug, T("quartoAround"), lang);
}

// ---- Detalle Atração (getAtracoes) + "o que fazer" + "como chegar" ----
export function getAtracoes(lang: Locale): Record<string, AtracaoDetail> {
  return mergeRecord<AtracaoDetail, Partial<AtracaoDetail>>(atracaoDetails, T("atracoes"), lang);
}
export function getAtracaoDoItems(lang: Locale): Record<string, string[]> {
  return pickText({ pt: atracaoDoItems, es: esText.atracaoDoItems, en: enText.atracaoDoItems }, lang);
}
export function getAtracaoSteps(lang: Locale): Record<string, string[]> {
  return pickText({ pt: atracaoSteps, es: esText.atracaoSteps, en: enText.atracaoSteps }, lang);
}

// ---- Detalle Promoção (getPromocoes) ----
export function getPromocoes(lang: Locale): Record<string, PromocaoDetail> {
  return mergeRecord<PromocaoDetail, Partial<PromocaoDetail>>(promocaoDetails, T("promocoes"), lang);
}

// ---- Detalle Produto (getProdutos) + relacionados ----
export function getProdutos(lang: Locale): Record<string, ProdutoDetail> {
  return mergeRecord<ProdutoDetail, Partial<ProdutoDetail>>(produtoDetails, T("produtos"), lang);
}
export function getProdutoRelated(lang: Locale): ProdutoRelated[] {
  return mergeList<ProdutoRelated, Partial<ProdutoRelated>>(produtoRelated, (r) => r.quartoSlug, T("produtoRelated"), lang);
}

// ---- Detalle Artigo (getArtigos) + sidebar ----
export function getArtigos(lang: Locale): Record<string, ArtigoDetail> {
  return mergeRecord<ArtigoDetail, Partial<ArtigoDetail>>(artigoDetails, T("artigos"), lang);
}
export function getArtigoTags(lang: Locale): string[] {
  return pickText({ pt: artigoTags, es: esText.artigoTags, en: enText.artigoTags }, lang);
}
export function getArtigoCategories(lang: Locale): { name: string; count: number }[] {
  return mergeList<{ name: string; count: number }, Partial<{ name: string; count: number }>>(artigoCategories, (c) => c.name, T("artigoCategories"), lang);
}
export function getArtigoRecent(lang: Locale): { title: string; date: string; img: string; slug: string }[] {
  return mergeList<{ title: string; date: string; img: string; slug: string }, Partial<{ title: string; date: string; img: string; slug: string }>>(artigoRecent, (r) => r.slug, T("artigoRecent"), lang);
}
export function getArtigoRelated(lang: Locale): { href: string; title: string; date: string; img: string }[] {
  return mergeList<{ href: string; title: string; date: string; img: string }, Partial<{ href: string; title: string; date: string; img: string }>>(artigoRelated, (r) => r.href, T("artigoRelated"), lang);
}
