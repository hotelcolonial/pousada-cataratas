import { Stat, StatGroup } from "@pousada-cataratas/design-system";

/** Os números da pousada, como aparecem na secção A Estrutura. */
export const Numeros = () => (
  <StatGroup>
    <Stat value="28" label="Quartos" />
    <Stat value="24h" label="Recepção" />
    <Stat value="4.8" label="Avaliação" />
    <Stat value="1" label="Piscina" />
  </StatGroup>
);

/** Com três colunas, quando não há um quarto número a mostrar. */
export const Tres = () => (
  <StatGroup>
    <Stat value="418" label="Avaliações" />
    <Stat value="Nº 1" label="Ranking" />
    <Stat value="84" label="Pousadas" />
  </StatGroup>
);

/**
 * Largura estreita — abaixo de 480px o grupo passa a 2x2 sozinho.
 * É o comportamento que impede o último número de sair do retângulo branco.
 */
export const Estreito = () => (
  <div style={{ width: 320 }}>
    <StatGroup>
      <Stat value="28" label="Quartos" />
      <Stat value="24h" label="Recepção" />
      <Stat value="4.8" label="Avaliação" />
      <Stat value="1" label="Piscina" />
    </StatGroup>
  </div>
);
