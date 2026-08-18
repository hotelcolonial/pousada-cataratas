// Motor de reservas (OMNI). Punto único de verdad para el link de reservas.
//
// BOOKING_BASE -> página inicial del motor (sin parámetros). La usan los botones
// "Reservar" del nav, el CTA del hero y el banner "Garanta sua oferta".
//
// buildBookingUrl -> añade las fechas y el número de hóspedes elegidos en un
// formulario. Parámetros calcados de la URL de ejemplo del motor:
//   ?endDate=YYYY-MM-DD&rooms[]=a2c2&startDate=YYYY-MM-DD
// En rooms[], "a<N>" = adultos y "c<M>" = crianças. Nuestros formularios no
// tienen crianças, así que mapeamos hóspedes -> adultos y omitimos la parte "c".
// startDate = check-in, endDate = check-out (ambos ya en formato ISO).
export const BOOKING_BASE =
  "https://reservar.pousadacataratas.com.br/hotels/HOTEL_OMNI_53217";

export const buildBookingUrl = (
  checkin: string,
  checkout: string,
  guests: number,
) => `${BOOKING_BASE}?endDate=${checkout}&rooms[]=a${guests}&startDate=${checkin}`;

// Link do motor para uma oferta específica: datas sugeridas da promoção e/ou
// cupom já aplicado (ex.: Maratona 2026 -> CORRIDA26). Todos os campos são
// opcionais; sem nenhum deles devolve o BOOKING_BASE puro.
export type BookingOffer = {
  checkin?: string;
  checkout?: string;
  guests?: number;
  promoCode?: string;
};

export function buildOfferBookingUrl({ checkin, checkout, guests, promoCode }: BookingOffer = {}) {
  const params: string[] = [];
  if (checkout) params.push(`endDate=${checkout}`);
  if (guests) params.push(`rooms[]=a${guests}`);
  if (checkin) params.push(`startDate=${checkin}`);
  if (promoCode) params.push(`promoCode=${encodeURIComponent(promoCode)}`);
  return params.length ? `${BOOKING_BASE}?${params.join("&")}` : BOOKING_BASE;
}

// Maratona Internacional de Foz do Iguaçu 2026 (prova em 27/09): semana da prova
// com o cupom da promoção. Fuente única para el botón de /promocao/maratona-2026
// y el CTA del artículo del blog.
export const MARATONA_2026_OFFER: BookingOffer = {
  checkin: "2026-09-25",
  checkout: "2026-09-29",
  promoCode: "CORRIDA26",
};

export const MARATONA_2026_BOOKING_URL = buildOfferBookingUrl(MARATONA_2026_OFFER);
