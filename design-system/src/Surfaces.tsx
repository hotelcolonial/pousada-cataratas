import type { ReactNode } from "react";

export interface BandProps {
  /** Conteúdo da faixa. */
  children?: ReactNode;
  /** Fundo. A família creme vem do sítio; `navy` é a faixa escura de contacto. */
  tone?: "surface" | "cream" | "cream-light" | "navy";
  /** Envolve o conteúdo no contentor centrado de 1180px. Desligue para faixas de largura total. */
  inner?: boolean;
  /** Classes adicionais. */
  className?: string;
}

/**
 * Faixa de secção de largura total, com o fundo da marca.
 *
 * O sítio alterna branco e cremes para separar secções sem fios nem sombras —
 * é o principal recurso de ritmo vertical. `inner` liga o contentor centrado de
 * 1180px com o padding responsivo; desligue-o quando a secção precisa de sangrar
 * até às margens.
 *
 * Um `Band` com `tone="navy"` também inverte os botões `outline` que contenha,
 * passando-os a contorno branco — é o comportamento do cabeçalho.
 *
 * @example
 * <Band tone="cream-light">
 *   <SectionHeader align="center" title="A Estrutura" />
 * </Band>
 */
export function Band({ children, tone = "surface", inner = true, className }: BandProps) {
  const cls = ["pcds-band", `pcds-band--${tone}`, className].filter(Boolean).join(" ");
  return <section className={cls}>{inner ? <div className="pcds-band-inner">{children}</div> : children}</section>;
}

export interface CardProps {
  /** Conteúdo do cartão. */
  children?: ReactNode;
  /** Acabamento. `plain` é só a superfície branca; `bordered` acrescenta o fio; `raised` a sombra. */
  variant?: "plain" | "bordered" | "raised";
  /** Remove o padding interno, para cartões que alojam uma imagem ou uma grelha própria. */
  flush?: boolean;
  /** Classes adicionais. */
  className?: string;
}

/**
 * Superfície branca de canto reto — o cartão de conteúdo do sítio.
 *
 * Nunca tem cantos arredondados: no sítio o arredondamento está reservado a
 * peças com forma própria (círculos, carrosséis), não a superfícies de conteúdo.
 * A separação do fundo faz-se por tom, por um fio de 1px muito claro
 * (`bordered`) ou por uma sombra baixa e difusa (`raised`) — nunca pelas três.
 *
 * @example
 * <Card variant="bordered">
 *   <Eyebrow>Depoimento</Eyebrow>
 *   <p>Tudo impecável, voltaremos.</p>
 * </Card>
 */
export function Card({ children, variant = "plain", flush = false, className }: CardProps) {
  const cls = [
    "pcds-card",
    variant === "plain" ? null : `pcds-card--${variant}`,
    flush ? "pcds-card--flat" : null,
    className,
  ]
    .filter(Boolean)
    .join(" ");
  return <div className={cls}>{children}</div>;
}
