import { Button, Card, Eyebrow, Rating } from "@pousada-cataratas/design-system";

/** Os três acabamentos. A separação faz-se por UM recurso, nunca pelos três. */
export const Acabamentos = () => (
  <div style={{ display: "grid", gap: 18, gridTemplateColumns: "repeat(3, 1fr)", background: "#F4F1EC", padding: 18 }}>
    <Card variant="plain">
      <Eyebrow>Simples</Eyebrow>
      <p style={{ margin: "10px 0 0", fontSize: 13.5, lineHeight: 1.65 }}>
        Só a superfície branca. Separa-se do fundo pelo tom.
      </p>
    </Card>
    <Card variant="bordered">
      <Eyebrow>Com fio</Eyebrow>
      <p style={{ margin: "10px 0 0", fontSize: 13.5, lineHeight: 1.65 }}>
        Um fio de 1px muito claro desenha o limite.
      </p>
    </Card>
    <Card variant="raised">
      <Eyebrow>Com sombra</Eyebrow>
      <p style={{ margin: "10px 0 0", fontSize: 13.5, lineHeight: 1.65 }}>
        Uma sombra baixa e difusa levanta-o do fundo.
      </p>
    </Card>
  </div>
);

/** O cartão de depoimento, como aparece na home. */
export const Depoimento = () => (
  <div style={{ background: "#F4F1EC", padding: 18 }}>
    <Card variant="bordered">
      <Rating value={5} display="5,0" label="5 de 5 estrelas" />
      <p style={{ margin: "14px 0 0", fontSize: 14.5, lineHeight: 1.7, color: "#5C6B7A" }}>
        Ficámos quatro noites e foi impecável. O café da manhã é caprichado e a
        equipa trata de tudo — das Cataratas ao transfer. Voltaremos.
      </p>
      <p style={{ margin: "16px 0 0", fontSize: 12, letterSpacing: ".04em", color: "#9AA3AD" }}>
        Marina T. — São Paulo
      </p>
    </Card>
  </div>
);

/** Sem padding, para alojar uma imagem ou uma grelha própria. */
export const SemPadding = () => (
  <div style={{ background: "#F4F1EC", padding: 18, maxWidth: 320 }}>
    <Card variant="raised" flush>
      <div style={{ height: 130, background: "#143C7A" }} />
      <div style={{ padding: "18px 20px" }}>
        <Eyebrow>Acomodação</Eyebrow>
        <p style={{ margin: "8px 0 14px", fontFamily: "'Gilda Display', Georgia, serif", fontSize: 24, color: "#143C7A" }}>
          Quarto Duplo
        </p>
        <Button variant="chip" tone="navy">
          Ver mais
        </Button>
      </div>
    </Card>
  </div>
);
