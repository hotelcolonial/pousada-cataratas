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
