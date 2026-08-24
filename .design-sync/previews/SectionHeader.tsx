import { SectionHeader } from "@pousada-cataratas/design-system";

/** O cabeçalho como abre a secção de reconhecimento da home: centrado, com fio. */
export const Centrado = () => (
  <SectionHeader
    align="center"
    rule
    eyebrow="Reconhecimento"
    title="A pousada mais bem avaliada de Foz do Iguaçu"
    intro="Nº 1 no ranking de pousadas de Foz do Iguaçu, entre 84 pousadas avaliadas pelos viajantes."
  />
);

/** Alinhado à esquerda — a variante das secções de conteúdo corrido. */
export const Esquerda = () => (
  <SectionHeader
    eyebrow="A Estrutura"
    title="Tudo pensado para o seu conforto"
    intro="Quartos bem equipados, café da manhã caprichado e uma equipe atenciosa pronta para tornar a sua estadia em Foz do Iguaçu tranquila e inesquecível."
  />
);

/** Sem fio e sem entrada: só sobretítulo e título, para secções mais secas. */
export const Simples = () => (
  <SectionHeader eyebrow="Promoções" title="Confira as promoções da temporada" />
);

/** Só o título, quando a secção já vem contextualizada pela anterior. */
export const SoTitulo = () => <SectionHeader title="Acomodações" />;
