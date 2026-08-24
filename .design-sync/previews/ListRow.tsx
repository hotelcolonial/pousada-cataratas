import { Button, ListRow, Rule } from "@pousada-cataratas/design-system";

/** A lista de promoções da home: três linhas separadas por fio. */
export const Promocoes = () => (
  <div style={{ maxWidth: 520 }}>
    <ListRow
      eyebrow="Promoção"
      title="Tarifa Morador"
      action={
        <Button variant="chip" tone="navy">
          Ver mais
        </Button>
      }
    />
    <Rule width="full" />
    <ListRow
      eyebrow="Desfrute"
      title="Agosto Encantador"
      action={
        <Button variant="chip" tone="gold">
          Ver mais
        </Button>
      }
    />
    <Rule width="full" />
    <ListRow
      eyebrow="Aproveite"
      title="Day Use"
      action={
        <Button variant="chip" tone="navy">
          Ver mais
        </Button>
      }
    />
  </div>
);

/** Uma linha isolada, com a acção à direita. */
export const Uma = () => (
  <div style={{ maxWidth: 520 }}>
    <ListRow
      eyebrow="Promoção"
      title="Longa Estadia"
      action={
        <Button variant="chip" tone="navy">
          Ver mais
        </Button>
      }
    />
  </div>
);

/**
 * Numa coluna estreita, a linha aperta-se sozinha e a acção continua dentro.
 * É o caso que a consulta de contentor resolve e um media query de ecrã não.
 */
export const Estreita = () => (
  <div style={{ width: 320 }}>
    <ListRow
      eyebrow="Aproveite"
      title="Day Use"
      action={
        <Button variant="chip" tone="navy">
          Ver mais
        </Button>
      }
    />
  </div>
);
