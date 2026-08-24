import { Stars } from "@pousada-cataratas/design-system";

const linha = { display: "flex", alignItems: "center", gap: 14 } as const;
const nota = { fontSize: 12, letterSpacing: ".04em", color: "#9AA3AD", width: 28 } as const;

/**
 * A escala de preenchimento, rotulada. Sem o número ao lado não se distingue
 * 4,5 de 4 num cartão pequeno — e a variação é justamente o que interessa ver.
 */
export const Escala = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
    <div style={linha}>
      <span style={nota}>5,0</span>
      <Stars value={5} label="5 de 5 estrelas" />
    </div>
    <div style={linha}>
      <span style={nota}>4,5</span>
      <Stars value={4.5} label="4,5 de 5 estrelas" />
    </div>
    <div style={linha}>
      <span style={nota}>4,0</span>
      <Stars value={4} label="4 de 5 estrelas" />
    </div>
    <div style={linha}>
      <span style={nota}>3,5</span>
      <Stars value={3.5} label="3,5 de 5 estrelas" />
    </div>
    <div style={linha}>
      <span style={nota}>2,0</span>
      <Stars value={2} label="2 de 5 estrelas" />
    </div>
    <div style={linha}>
      <span style={nota}>0,0</span>
      <Stars value={0} label="Sem avaliações" />
    </div>
  </div>
);

/** A nota real da pousada — meia estrela, o caso que justifica o recorte parcial. */
export const NotaDaPousada = () => (
  <div style={linha}>
    <span style={nota}>4,5</span>
    <Stars value={4.5} label="4,5 de 5 estrelas" />
  </div>
);
