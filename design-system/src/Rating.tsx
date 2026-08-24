import type { ReactNode } from "react";

function Star() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12 2.6l2.9 5.9 6.5.95-4.7 4.58 1.11 6.47L12 17.44l-5.81 3.06 1.11-6.47-4.7-4.58 6.5-.95L12 2.6z"
        fill="currentColor"
      />
    </svg>
  );
}

const ROW = (
  <>
    <Star />
    <Star />
    <Star />
    <Star />
    <Star />
  </>
);

export interface StarsProps {
  /** Nota de 0 a 5. Aceita meios — 4,5 pinta 90%. */
  value?: number;
  /** Texto para leitores de ecrã. Sem ele, a nota fica muda. */
  label?: string;
  /** Classes adicionais. */
  className?: string;
}

/**
 * Cinco estrelas com preenchimento parcial, em dourado.
 *
 * São duas filas sobrepostas — a apagada por baixo, a dourada por cima
 * recortada à percentagem da nota. Não usa `id` nem `clipPath` nomeado, por
 * isso pode repetir-se várias vezes na mesma página sem colidir.
 *
 * @example
 * <Stars value={4.5} label="4,5 de 5 estrelas" />
 */
export function Stars({ value = 5, label, className }: StarsProps) {
  const pct = Math.max(0, Math.min(100, (value / 5) * 100));
  const cls = ["pcds-stars", className].filter(Boolean).join(" ");
  return (
    <span className={cls} role="img" aria-label={label}>
      <span className="pcds-stars-bg" aria-hidden="true">
        {ROW}
      </span>
      <span className="pcds-stars-fg" style={{ width: `${pct}%` }} aria-hidden="true">
        {ROW}
      </span>
    </span>
  );
}

export interface RatingProps {
  /** Nota de 0 a 5. */
  value?: number;
  /** A nota escrita, já formatada para o idioma — "4,5" em pt/es, "4.5" em en. */
  display?: ReactNode;
  /** Texto para leitores de ecrã. */
  label?: string;
  /** Classes adicionais. */
  className?: string;
}

/**
 * A nota por extenso ao lado das estrelas — as estrelas mais o número.
 *
 * Passe `display` já formatado para o idioma da página: o separador decimal
 * muda (4,5 em pt/es, 4.5 em en) e deixá-lo ao `toLocaleString` do runtime faz
 * o HTML do servidor e o do cliente divergirem.
 *
 * @example
 * <Rating value={4.5} display="4,5" label="4,5 de 5 estrelas" />
 */
export function Rating({ value = 5, display, label, className }: RatingProps) {
  const cls = ["pcds-rating", className].filter(Boolean).join(" ");
  return (
    <span className={cls}>
      <Stars value={value} label={label} />
      <span className="pcds-rating-value">{display}</span>
    </span>
  );
}
