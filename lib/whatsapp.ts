// Link de WhatsApp de la pousada, con mensaje predefinido. Punto único de
// verdad para todos los botones "Falar no WhatsApp" del site.
//
// El mensaje va SIEMPRE en portugués, sin importar el idioma del site (es lo
// que la recepción espera recibir). Número: +55 0800 002 9215.
// ⚠️ Es un 0800: puede no abrir conversación en WhatsApp (wa.me espera móvil).
const WHATSAPP_NUMBER = "5508000029215";
const WHATSAPP_MESSAGE =
  "Olá, venho do site e tenho interesse em me hospedar na Pousada Cataratas";

// Construye el link de WhatsApp con un mensaje dado (para ofertas específicas).
export const whatsappHref = (message: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

// Link por defecto (mensaje genérico de hospedaje).
export const WHATSAPP_HREF = whatsappHref(WHATSAPP_MESSAGE);
