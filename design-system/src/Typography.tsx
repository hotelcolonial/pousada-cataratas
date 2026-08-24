import type { ReactNode } from "react";

export interface EyebrowProps {
  /** Texto do rótulo. Vai para versais por CSS — escreva-o normal. */
  children?: ReactNode;
  /** Cor. `label` é o cinza por omissão; `navy` e `gold` para secções com mais peso. */
  tone?: "label" | "navy" | "gold";
  /** `wide` abre a entreletra e sobe para 12px — para sobretítulos de secção. */
  spacing?: "normal" | "wide";
  /** Classes adicionais. */
  className?: string;
}

/**
 * Rótulo curto em versais espaçadas que abre quase todas as secções do sítio.
 *
 * É a assinatura tipográfica da marca: minúsculas no código, versais no ecrã,
 * com entreletra larga. Use `spacing="wide"` quando abre uma secção inteira e o
 * valor por omissão quando etiqueta um bloco menor.
 *
 * @example
 * <Eyebrow tone="navy">Reconhecimento</Eyebrow>
 */
export function Eyebrow({ children, tone = "label", spacing = "normal", className }: EyebrowProps) {
  const cls = [
    "pcds-eyebrow",
    spacing === "wide" ? "pcds-eyebrow--wide" : null,
    tone === "label" ? null : `pcds-eyebrow--${tone}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");
  return <span className={cls}>{children}</span>;
}

export interface RuleProps {
  /** `short` é o fio dourado de 44px sob o eyebrow; `full` o separador de largura total. */
  width?: "short" | "full";
  /** Classes adicionais. */
  className?: string;
}

/**
 * Fio de 1px — o único separador que o sítio usa.
 *
 * `short` é o traço dourado curto que aparece por baixo do eyebrow nos
 * cabeçalhos de secção. `full` é o separador neutro entre linhas de uma lista.
 * Nunca é uma cor sólida: é sempre tinta ou dourado em opacidade baixa.
 *
 * @example
 * <Rule />
 * <Rule width="full" />
 */
export function Rule({ width = "short", className }: RuleProps) {
  const cls = ["pcds-rule", width === "full" ? "pcds-rule--full" : null, className]
    .filter(Boolean)
    .join(" ");
  return <hr className={cls} />;
}

export interface SectionHeaderProps {
  /** Sobretítulo em versais. Omitido, não se desenha. */
  eyebrow?: ReactNode;
  /** Título, na serifada da marca. */
  title?: ReactNode;
  /** Parágrafo de entrada, por baixo do título. */
  intro?: ReactNode;
  /** Desenha o fio dourado entre o eyebrow e o título. */
  rule?: boolean;
  /** Alinhamento. `center` é o das faixas de destaque. */
  align?: "start" | "center";
  /** Classes adicionais. */
  className?: string;
}

/**
 * Cabeçalho de secção: sobretítulo, fio, título serifado e entrada.
 *
 * É o padrão de abertura repetido em toda a home — a combinação que dá o ritmo
 * às secções. O título usa Gilda Display e cresce de 28px para 36px a partir de
 * 900px; a largura máxima em `ch` mantém as linhas legíveis sem medidas fixas.
 *
 * @example
 * <SectionHeader
 *   align="center"
 *   rule
 *   eyebrow="Reconhecimento"
 *   title="A pousada mais bem avaliada de Foz do Iguaçu"
 *   intro="Nº 1 no ranking de pousadas, entre 84 avaliadas pelos viajantes."
 * />
 */
export function SectionHeader({
  eyebrow,
  title,
  intro,
  rule = false,
  align = "start",
  className,
}: SectionHeaderProps) {
  const cls = ["pcds-sh", align === "center" ? "pcds-sh--center" : null, className]
    .filter(Boolean)
    .join(" ");
  return (
    <header className={cls}>
      {eyebrow ? <Eyebrow tone="navy">{eyebrow}</Eyebrow> : null}
      {rule ? <Rule /> : null}
      {title ? <h2 className="pcds-sh-title">{title}</h2> : null}
      {intro ? <p className="pcds-sh-intro">{intro}</p> : null}
    </header>
  );
}
