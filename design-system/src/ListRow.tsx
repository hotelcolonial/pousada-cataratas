import type { ReactNode } from "react";

export interface ListRowProps {
  /** URL da miniatura. Sem ela fica o retângulo azul, que é o placeholder do sítio. */
  image?: string;
  /** Texto alternativo da miniatura. */
  imageAlt?: string;
  /** Sobretítulo em versais — "Promoção", "Desfrute", "Aproveite". */
  eyebrow?: ReactNode;
  /** Nome da oferta, na serifada. */
  title?: ReactNode;
  /** Acção à direita. Normalmente um `Button variant="chip"`. */
  action?: ReactNode;
  /** Classes adicionais. */
  className?: string;
}

/**
 * Linha de lista com miniatura, texto e acção — o formato das promoções.
 *
 * Quando estreita, as medidas apertam sozinhas (miniatura 96→76px, título
 * 26→21px, espaçamento 22→14px): a versão folgada não cabe nos ~300px úteis de
 * um ecrã de 375px e a acção era empurrada para fora. Não fixe larguras aqui.
 *
 * Mede-se a SI PRÓPRIA, não ao ecrã (consulta de contentor): numa coluna
 * estreita de uma página larga aperta na mesma.
 *
 * O bloco de texto leva `min-width:0` para poder encolher — sem isso a palavra
 * mais comprida do título trava a linha inteira e a acção volta a sair.
 *
 * @example
 * <ListRow
 *   image="/images/day-use.webp"
 *   eyebrow="Aproveite"
 *   title="Day Use"
 *   action={<Button variant="chip" href="/promocao/day-use">Ver mais</Button>}
 * />
 */
export function ListRow({ image, imageAlt = "", eyebrow, title, action, className }: ListRowProps) {
  const cls = ["pcds-row", className].filter(Boolean).join(" ");
  // Exterior = contentor medido, interior = a fila que aperta. Ver StatGroup.
  return (
    <div className={cls}>
      <div className="pcds-row-inner">
        <div className="pcds-row-thumb">{image ? <img src={image} alt={imageAlt} /> : null}</div>
        <div className="pcds-row-body">
          {eyebrow ? <span className="pcds-eyebrow">{eyebrow}</span> : null}
          {title ? <span className="pcds-row-title">{title}</span> : null}
        </div>
        {action ? <div className="pcds-row-action">{action}</div> : null}
      </div>
    </div>
  );
}
