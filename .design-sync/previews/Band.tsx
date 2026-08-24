import { Band, Button, SectionHeader } from "@pousada-cataratas/design-system";

/** Os quatro fundos, na ordem em que o sítio os alterna para dar ritmo. */
export const Tons = () => (
  <div>
    <Band tone="surface">
      <SectionHeader eyebrow="Branco" title="Acomodações" />
    </Band>
    <Band tone="cream-light">
      <SectionHeader eyebrow="Creme claro" title="Reconhecimento" />
    </Band>
    <Band tone="cream">
      <SectionHeader eyebrow="Creme" title="A Estrutura" />
    </Band>
    <Band tone="navy">
      <SectionHeader eyebrow="Azul da marca" title="Fale connosco" />
    </Band>
  </div>
);

/**
 * Sobre a faixa azul os botões de contorno passam a branco, sem se configurar
 * nada — é o comportamento do cabeçalho do sítio.
 */
export const SobreEscuro = () => (
  <Band tone="navy">
    <SectionHeader
      eyebrow="Reservas"
      title="Fale directamente connosco"
      intro="Garante a melhor tarifa e o café da manhã incluído."
    />
    <div style={{ marginTop: 22, display: "flex", gap: 14 }}>
      <Button variant="outline">Falar por WhatsApp</Button>
      <Button variant="solid" tone="gold">
        Ver promoções
      </Button>
    </div>
  </Band>
);

/** Sem o contentor centrado, para conteúdo que sangra até às margens. */
export const LarguraTotal = () => (
  <Band tone="cream" inner={false}>
    <div style={{ padding: "34px 24px", textAlign: "center" }}>
      <SectionHeader align="center" eyebrow="Galeria" title="Conheça a pousada" />
    </div>
  </Band>
);
