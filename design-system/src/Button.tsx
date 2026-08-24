import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

/** Seta diagonal — a marca do sítio para "isto abre fora". */
function ExternalArrow() {
  return (
    <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path
        d="M3.5 10.5 10.5 3.5M10.5 3.5H5M10.5 3.5V9"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export interface ButtonProps {
  /** Texto do botão. */
  children?: ReactNode;
  /** Forma. `solid` é o CTA, `outline` o secundário, `chip` a acção em lista. */
  variant?: "solid" | "outline" | "chip";
  /** Cor. `blue` é do motor de reservas; `gold` de campanhas; `navy` do resto. */
  tone?: "navy" | "gold" | "blue";
  /** Tamanho. Ignorado em `chip`, que tem medida própria. */
  size?: "sm" | "md" | "lg";
  /** Acrescenta a seta diagonal de link externo. */
  external?: boolean;
  /** Renderiza como `<a>` em vez de `<button>`. */
  href?: string;
  /** Alvo do link, quando `href` está definido. */
  target?: string;
  /** Relação do link, quando `href` está definido. */
  rel?: string;
  /** Desativa o botão. */
  disabled?: boolean;
  /** Classes adicionais. */
  className?: string;
  /** Handler de clique. */
  onClick?: ButtonHTMLAttributes<HTMLButtonElement>["onClick"];
  /** Tipo do `<button>`. */
  type?: "button" | "submit" | "reset";
}

/**
 * Botão e link de acção da Pousada Cataratas, sempre de canto reto.
 *
 * Três formas, todas retiradas do sítio: `solid` é o CTA de reserva, `outline`
 * é o gesto do RESERVAR do cabeçalho — enche-se no hover, invertendo as cores —
 * e `chip` é a acção pequena das listas de promoções, a única sem versais.
 *
 * Com `href` renderiza `<a>`; sem ele, `<button>`. Para links que saem do sítio
 * use `external`, que acrescenta a seta diagonal usada em toda a navegação.
 *
 * @example
 * <Button variant="solid" tone="blue" size="lg">Reservar agora</Button>
 * <Button variant="outline" href="https://tripadvisor.com" external>Ver avaliações</Button>
 * <Button variant="chip" tone="gold" href="/promocao/day-use">Ver mais</Button>
 */
export function Button({
  children,
  variant = "solid",
  tone = "navy",
  size = "md",
  external = false,
  href,
  target,
  rel,
  disabled = false,
  className,
  onClick,
  type = "button",
}: ButtonProps) {
  const cls = [
    "pcds-btn",
    `pcds-btn--${variant}`,
    `pcds-btn--${tone}`,
    variant === "chip" ? null : `pcds-btn--${size}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const body = (
    <>
      {children}
      {external ? <ExternalArrow /> : null}
    </>
  );

  if (href) {
    const linkProps: AnchorHTMLAttributes<HTMLAnchorElement> = { className: cls, href, target, rel };
    if (disabled) linkProps["aria-disabled"] = true;
    return <a {...linkProps}>{body}</a>;
  }

  return (
    <button className={cls} type={type} disabled={disabled} onClick={onClick}>
      {body}
    </button>
  );
}
