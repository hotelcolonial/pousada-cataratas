import { Eyebrow, Rule } from "@pousada-cataratas/design-system";

/** O fio dourado curto, no seu lugar: entre o sobretítulo e o título. */
export const Curto = () => (
  <div>
    <Eyebrow tone="navy">Reconhecimento</Eyebrow>
    <Rule />
    <p style={{ margin: "16px 0 0", fontFamily: "'Gilda Display', Georgia, serif", fontSize: 28, color: "#143C7A" }}>
      A pousada mais bem avaliada
    </p>
  </div>
);

/** O separador de largura total, entre linhas de uma lista. */
export const Total = () => (
  <div style={{ maxWidth: 420 }}>
    <p style={{ margin: 0, fontSize: 14, color: "#5C6B7A" }}>Tarifa Morador</p>
    <Rule width="full" />
    <p style={{ margin: "14px 0 0", fontSize: 14, color: "#5C6B7A" }}>Day Use</p>
    <Rule width="full" />
    <p style={{ margin: "14px 0 0", fontSize: 14, color: "#5C6B7A" }}>Longa Estadia</p>
  </div>
);
