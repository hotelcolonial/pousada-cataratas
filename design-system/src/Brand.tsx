import type { ReactNode } from "react";

export interface BrandProps {
  /** Conteúdo da página ou do ecrã. */
  children?: ReactNode;
  /** Classes adicionais na raiz. */
  className?: string;
}

/**
 * Raiz obrigatória do design system — envolve tudo o que use estes componentes.
 *
 * É o que liga as famílias tipográficas da marca (Gilda Display nos títulos,
 * Helvetica Neue Cyr no resto) e a cor de tinta base. Sem esta raiz à volta, os
 * componentes herdam a fonte do documento e deixam de parecer da Pousada
 * Cataratas — continuam a funcionar, mas com a tipografia errada.
 *
 * @example
 * <Brand>
 *   <Band tone="cream">…</Band>
 * </Brand>
 */
export function Brand({ children, className }: BrandProps) {
  return <div className={["pcds", className].filter(Boolean).join(" ")}>{children}</div>;
}
