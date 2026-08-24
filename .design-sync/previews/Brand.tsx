import { Band, Brand, Button, SectionHeader } from "@pousada-cataratas/design-system";

/**
 * A raiz em uso: envolve a página inteira e é o que liga a tipografia da marca.
 * Tudo o que está dentro herda Gilda Display nos títulos e Helvetica Neue Cyr
 * no resto.
 */
export const Raiz = () => (
  <Brand>
    <Band tone="cream-light">
      <SectionHeader
        align="center"
        rule
        eyebrow="Reconhecimento"
        title="A pousada mais bem avaliada de Foz do Iguaçu"
        intro="Nº 1 no ranking de pousadas, entre 84 avaliadas pelos viajantes."
      />
      <div style={{ marginTop: 22, textAlign: "center" }}>
        <Button variant="solid" tone="blue">
          Reservar agora
        </Button>
      </div>
    </Band>
  </Brand>
);
