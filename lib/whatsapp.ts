// Link de WhatsApp de la pousada, con mensaje predefinido. Punto único de
// verdad para todos los botones "Falar no WhatsApp" del site.
//
// El mensaje va SIEMPRE en portugués, sin importar el idioma del site (es lo
// que la recepción espera recibir). Número: +55 45 99137-7708.
const WHATSAPP_NUMBER = "5545991377708";
const WHATSAPP_MESSAGE =
  "Olá, venho do site e tenho interesse em me hospedar na Pousada Cataratas";

export const WHATSAPP_HREF = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  WHATSAPP_MESSAGE,
)}`;
