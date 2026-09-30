import type { ReactNode } from "react";

export interface StatProps {
  /** O número em destaque. Curto — "27", "24h", "4.8". */
  value?: ReactNode;
  /** Rótulo por baixo, em versais espaçadas. */
  label?: ReactNode;
  /** Classes adicionais. */
  className?: string;
}

/**
 * Um número da pousada com o seu rótulo — "27 / Apartamentos", "24h / Recepção".
 *
 * O valor usa a sem-serifa em Light 300 a 40px: é o único sítio onde o peso
 * fino aparece em corpo grande, e é o que dá o ar de ficha técnica. O rótulo é
 * deliberadamente pequeno (9px) e muito espaçado, para não competir.
 *
 * @example
 * <Stat value="27" label="Apartamentos" />
 */
export function Stat({ value, label, className }: StatProps) {
  const cls = ["pcds-stat", className].filter(Boolean).join(" ");
  return (
    <div className={cls}>
      <div className="pcds-stat-value">{value}</div>
      <div className="pcds-stat-label">{label}</div>
    </div>
  );
}

export interface StatGroupProps {
  /** Os `Stat` do grupo. Pensado para quatro. */
  children?: ReactNode;
  /** Classes adicionais. */
  className?: string;
}

/**
 * O retângulo branco que aloja os números da pousada.
 *
 * Fila enquanto cabe; abaixo de 480px passa a 2x2. O corte não é arbitrário:
 * com quatro colunas, o rótulo mais comprido deixa de caber lado a lado nessa
 * largura e o último número saía do retângulo. Não force uma fila em telemóvel.
 *
 * Mede-se a SI PRÓPRIO, não ao ecrã (consulta de contentor): posto numa coluna
 * estreita de uma página larga, reorganiza-se na mesma. É o que um media query
 * de viewport não faria.
 *
 * @example
 * <StatGroup>
 *   <Stat value="27" label="Apartamentos" />
 *   <Stat value="24h" label="Recepção" />
 *   <Stat value="4.8" label="Avaliação" />
 *   <Stat value="1" label="Piscina" />
 * </StatGroup>
 */
export function StatGroup({ children, className }: StatGroupProps) {
  const cls = ["pcds-statgroup", className].filter(Boolean).join(" ");
  // O invólucro exterior é o contentor medido; o interior é o que reorganiza.
  // Um elemento não se pode estilizar a si próprio por @container, daí os dois.
  return (
    <div className={cls}>
      <div className="pcds-statgroup-inner">{children}</div>
    </div>
  );
}
