import { Stat } from "@pousada-cataratas/design-system";

/** Um número isolado, com o seu rótulo. */
export const Sozinho = () => <Stat value="28" label="Quartos" />;

/** Os quatro valores reais da pousada, para comparar as larguras. */
export const Valores = () => (
  <div style={{ display: "flex", gap: 46 }}>
    <Stat value="28" label="Quartos" />
    <Stat value="24h" label="Recepção" />
    <Stat value="4.8" label="Avaliação" />
    <Stat value="1" label="Piscina" />
  </div>
);
