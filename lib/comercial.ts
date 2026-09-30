// Contato da equipe comercial (página Grupos). Punto único de verdad: para
// cambiar el teléfono o el e-mail, editar solo este archivo.
export const COMERCIAL = {
  telefone: "0800 002 9215", // tal como se muestra en pantalla
  email: "reservas@pousadacataratas.com.br",
};

// tel: sin espacios → "tel:08000029215"
export const COMERCIAL_TEL_HREF = `tel:${COMERCIAL.telefone.replace(/\D/g, "")}`;

// mailto: con asunto y cuerpo predefinidos (los textos vienen del diccionario).
// Los saltos de línea van como CRLF, que es lo que espera el estándar mailto.
export const comercialMailtoHref = (subject: string, body: string) =>
  `mailto:${COMERCIAL.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body.replace(/\r?\n/g, "\r\n"))}`;
