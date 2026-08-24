import { Rating } from "@pousada-cataratas/design-system";

/** A nota da pousada, como aparece no selo de reconhecimento. */
export const Nota = () => <Rating value={4.5} display="4,5" label="4,5 de 5 estrelas" />;

/**
 * O mesmo valor nos três idiomas do sítio. O separador decimal muda, e por isso
 * é que `display` se passa já formatado em vez de se calcular no cliente.
 */
export const PorIdioma = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
    <Rating value={4.5} display="4,5" label="4,5 de 5 estrelas" />
    <Rating value={4.5} display="4,5" label="4,5 de 5 estrellas" />
    <Rating value={4.5} display="4.5" label="4.5 out of 5 stars" />
  </div>
);
