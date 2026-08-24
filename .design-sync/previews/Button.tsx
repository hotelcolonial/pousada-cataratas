import { Button } from "@pousada-cataratas/design-system";

/** O CTA de reserva, na sua forma cheia — o azul é exclusivo desta acção. */
export const Reservar = () => (
  <div style={{ display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" }}>
    <Button variant="solid" tone="blue" size="lg">
      Reservar agora
    </Button>
    <Button variant="solid" tone="gold" size="lg">
      Aproveitar oferta
    </Button>
  </div>
);

/** As três formas lado a lado: cheia, contorno e chip. */
export const Formas = () => (
  <div style={{ display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" }}>
    <Button variant="solid" tone="navy">
      Ver acomodações
    </Button>
    <Button variant="outline" tone="navy">
      Falar connosco
    </Button>
    <Button variant="chip" tone="navy">
      Ver mais
    </Button>
  </div>
);

/** Os três tons na forma cheia. Navy para o geral, dourado para campanhas, azul para reservar. */
export const Tons = () => (
  <div style={{ display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" }}>
    <Button variant="solid" tone="navy">
      Acomodações
    </Button>
    <Button variant="solid" tone="gold">
      Tarifa morador
    </Button>
    <Button variant="solid" tone="blue">
      Reservar
    </Button>
  </div>
);

/** Tamanhos da forma cheia — sm, md e lg. */
export const Tamanhos = () => (
  <div style={{ display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" }}>
    <Button variant="solid" tone="navy" size="sm">
      Pequeno
    </Button>
    <Button variant="solid" tone="navy" size="md">
      Médio
    </Button>
    <Button variant="solid" tone="navy" size="lg">
      Grande
    </Button>
  </div>
);

/** Link que abre fora, com a seta diagonal da marca. */
export const LinkExterno = () => (
  <div style={{ display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" }}>
    <Button variant="outline" tone="navy" href="https://www.tripadvisor.com.br" external>
      Ver todas as avaliações
    </Button>
    <Button variant="solid" tone="blue" href="https://reservas.pousadacataratas.com.br" external>
      Reservar no site oficial
    </Button>
  </div>
);

/** Estado desativado. */
export const Desativado = () => (
  <div style={{ display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" }}>
    <Button variant="solid" tone="navy" disabled>
      Esgotado
    </Button>
    <Button variant="outline" tone="navy" disabled>
      Indisponível
    </Button>
  </div>
);
