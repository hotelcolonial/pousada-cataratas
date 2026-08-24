import { Eyebrow } from "@pousada-cataratas/design-system";

/** Os três tons. O cinzento é o normal; o azul abre secções de mais peso. */
export const Tons = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
    <Eyebrow>Promoção</Eyebrow>
    <Eyebrow tone="navy">Reconhecimento</Eyebrow>
    <Eyebrow tone="gold">Exclusivo</Eyebrow>
  </div>
);

/** A entreletra larga, para quando abre uma secção inteira. */
export const Espacamento = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
    <Eyebrow tone="navy">A Estrutura</Eyebrow>
    <Eyebrow tone="navy" spacing="wide">
      A Estrutura
    </Eyebrow>
  </div>
);
