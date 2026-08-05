import type { LocaleContent } from "./types";
import type { ArtigoBlock, QuartoDetail } from "@/lib/data";

// Helpers de casteo: los arrays anidados (photos, body) solo aportan los campos
// de TEXTO traducibles (el resto —src/img/type— sale de la base pt vía merge
// element-wise). El tipo estricto de la base exige el casteo.
const photos = (alts: string[]) =>
  alts.map((alt) => ({ alt })) as unknown as QuartoDetail["photos"];

type BodyDraft = { text?: string; items?: string[]; caption?: string };
const body = (blocks: BodyDraft[]) => blocks as unknown as ArtigoBlock[];

export const es: LocaleContent = {
  // ============================ Home ============================
  rgCards: {
    "rg-1": { name: "Habitación Doble", guests: "2 huéspedes", price: "Consultar" },
    "rg-2": { name: "Habitación Triple", guests: "3 huéspedes", price: "Consultar" },
    "rg-3": { name: "Habitación Cuádruple", guests: "4 huéspedes", price: "Consultar" },
    "rg-4": { name: "Habitación Quíntuple", guests: "5 huéspedes", price: "Consultar" },
  },

  testi: [
    {
      text: "Tengo una empresa de turismo receptivo en Foz do Iguaçu y me hospedo en la Pousada Cataratas desde hace unos 4 años. He notado que el establecimiento siempre está pasando por alguna mejora, no es estático como la mayoría de los alojamientos.",
      name: "Shiroagente",
      loc: "",
    },
    {
      text: "Una posada súper acogedora, personal súper atento, ¡limpísima! El desayuno es sencillo pero delicioso, no deja nada que desear. Hay plaza para el coche y la piscina es simplemente deliciosa, mi hija no quería salir. El café de cortesía en la recepción las 24 horas. Sin hablar de la ubicación. ¡Pronto vuelvo!",
      name: "R2562BHleandrod",
      loc: "",
    },
    {
      text: "Muy satisfecho con la relación calidad-precio, el equipo es muy competente, lugar familiar, limpio y organizado. Algunos de los colchones merecen atención, pero volveré sin duda. Ah, la ubicación es muy buena, en un barrio tranquilo y seguro.",
      name: "Sérgio Naves",
      loc: "",
    },
    {
      text: "Excelente posada, atención familiar, muy acogedora, muy limpia. ¡Recomiendo!",
      name: "David Felicio",
      loc: "",
    },
    {
      text: "Lugar excelente para disfrutar con familiares y amigos. Desayuno delicioso, que se puede tomar a la orilla de la piscina, ambiente agradable, ducha estupenda, cama cómoda, habitación amplia, acogedora y limpia. Muy bueno para quedarse en familia.",
      name: "verapH5637GU",
      loc: "",
    },
  ],

  // ============================ Listado Quartos ============================
  quartosCards: {
    "rc-card-1": {
      name: "Habitación Doble",
      guests: "2 huéspedes",
      desc: "Acogedora e ideal para parejas, con cama de matrimonio, aire acondicionado y todo para un descanso tranquilo.",
      ph: "Foto — Habitación Doble",
    },
    "rc-card-2": {
      name: "Habitación Triple",
      guests: "3 huéspedes",
      desc: "Más espacio para quienes viajan en trío o pequeñas familias, sin renunciar a la comodidad.",
      ph: "Foto — Habitación Triple",
    },
    "rc-card-3": {
      name: "Habitación Cuádruple",
      guests: "4 huéspedes",
      desc: "Comodidad para que toda la familia disfrute de Foz do Iguaçu junta, con mucho espacio.",
      ph: "Foto — Habitación Cuádruple",
    },
    "rc-card-4": {
      name: "Habitación Quíntuple",
      guests: "5 huéspedes",
      desc: "El espacio más amplio de la posada, perfecto para familias más grandes que buscan privacidad.",
      ph: "Foto — Suite Familiar",
    },
  },

  // ============================ Galería ============================
  galeriaShots: {
    g1: { alt: "Fachada frontal de la Pousada Cataratas en Foz do Iguaçu" },
    g2: { alt: "Piscina de la Pousada Cataratas en Foz do Iguaçu" },
    g3: { alt: "Habitación Doble de la Pousada Cataratas en Foz do Iguaçu" },
    g4: { alt: "Desayuno de la Pousada Cataratas en Foz do Iguaçu" },
    g5: { alt: "Habitación Triple de la Pousada Cataratas en Foz do Iguaçu" },
    g6: { alt: "Área de la piscina de la Pousada Cataratas en Foz do Iguaçu" },
    g7: { alt: "Entrada de la Pousada Cataratas en Foz do Iguaçu" },
    g8: { alt: "Habitación Cuádruple de la Pousada Cataratas en Foz do Iguaçu" },
    g9: { alt: "Jardín y piscina de la Pousada Cataratas en Foz do Iguaçu" },
    g10: { alt: "Habitación Quíntuple de la Pousada Cataratas en Foz do Iguaçu" },
    g11: { alt: "Área externa de la Pousada Cataratas en Foz do Iguaçu" },
    g12: { alt: "Vista amplia de la Habitación Doble de la Pousada Cataratas en Foz do Iguaçu" },
    g13: { alt: "Piscina y jardín de la Pousada Cataratas en Foz do Iguaçu" },
    g14: { alt: "Bufé de desayuno de la Pousada Cataratas en Foz do Iguaçu" },
    g15: { alt: "Camas de la Habitación Triple de la Pousada Cataratas en Foz do Iguaçu" },
    g16: { alt: "Fachada de la Pousada Cataratas en Foz do Iguaçu" },
    g17: { alt: "Camas de la Habitación Cuádruple de la Pousada Cataratas en Foz do Iguaçu" },
    g18: { alt: "Estacionamiento de la Pousada Cataratas en Foz do Iguaçu" },
    g19: { alt: "Camas de la Habitación Quíntuple de la Pousada Cataratas en Foz do Iguaçu" },
    g20: { alt: "Cama de matrimonio y armario de la Habitación Doble de la Pousada Cataratas en Foz do Iguaçu" },
    g21: { alt: "Balcón y baño de la Habitación Triple de la Pousada Cataratas en Foz do Iguaçu" },
    g22: { alt: "TV y baño de la Habitación Cuádruple de la Pousada Cataratas en Foz do Iguaçu" },
    g23: { alt: "Armario y baño de la Habitación Quíntuple de la Pousada Cataratas en Foz do Iguaçu" },
    g24: { alt: "TV y baño de la Habitación Doble de la Pousada Cataratas en Foz do Iguaçu" },
    g25: { alt: "TV y armario de la Habitación Triple de la Pousada Cataratas en Foz do Iguaçu" },
    g26: { alt: "Vista amplia de la Habitación Cuádruple de la Pousada Cataratas en Foz do Iguaçu" },
    g27: { alt: "Vista amplia de la Habitación Quíntuple de la Pousada Cataratas en Foz do Iguaçu" },
  },

  galeriaTabs: {
    todos: { label: "Todos" },
    quartos: { label: "Habitaciones" },
    comuns: { label: "Áreas comunes" },
    piscina: { label: "Piscina" },
  },

  // ============================ Listado Atrações ============================
  atracoesFeatured: {
    "at-feat-1": {
      eyebrow: "Patrimonio natural",
      name: "Cataratas del Iguazú",
      distLabel: "min en coche",
      desc: "Una de las Siete Maravillas de la Naturaleza, con más de 270 saltos de agua rodeados de selva atlántica. Senderos, pasarelas y el famoso mirador de la Garganta del Diablo a pocos minutos de la posada.",
    },
    "at-feat-2": {
      eyebrow: "Vida salvaje",
      name: "Parque das Aves",
      distLabel: "min en coche",
      desc: "El mayor parque de aves de América Latina, con aviarios inmersivos donde tucanes, guacamayos y flamencos viven muy cerca de ti. Un paseo perfecto para todas las edades, junto a las Cataratas.",
    },
    "at-feat-3": {
      eyebrow: "Triple frontera",
      name: "Hito de las Tres Fronteras",
      distLabel: "min en coche",
      desc: "El punto donde Brasil, Argentina y Paraguay se encuentran, a orillas de los ríos Iguazú y Paraná. Mirador, gastronomía y un espectáculo de luces al atardecer.",
    },
    "at-feat-4": {
      eyebrow: "Ingeniería y naturaleza",
      name: "Represa de Itaipú",
      distLabel: "min en coche",
      desc: "Una de las mayores hidroeléctricas del mundo, con visitas guiadas, iluminación nocturna y el Refugio Biológico. Una experiencia que une tecnología y preservación ambiental.",
    },
    "at-feat-5": {
      eyebrow: "Vida acuática",
      name: "AquaFoz",
      distLabel: "min en coche",
      desc: "Uno de los mayores acuarios de América del Sur: un circuito de 750 metros por tres plantas que recrea el camino de las aguas de los ríos Iguazú y Paraná, con más de 300 especies de agua dulce y salada, del Alto Iguazú al Océano.",
    },
  },

  atracoesCards: {
    "at-card-1": { meta: "5 min · Aventura", badge: "Diversión" },
    "at-card-2": { meta: "12 min · Gastronomía", badge: "Noche" },
    "at-card-3": { meta: "14 min · Compras", badge: "Compras" },
  },

  atracoesNearby: {
    "Cataratas do Iguaçu": { name: "Cataratas del Iguazú" },
    "Parque das Aves": { name: "Parque das Aves" },
    "Marco das Três Fronteiras": { name: "Hito de las Tres Fronteras" },
    "Usina de Itaipu": { name: "Represa de Itaipú" },
  },

  // ============================ Blog (listado) ============================
  blogPosts: {
    "bl-1": {
      cat: "Rutas",
      title: "Qué hacer en Foz do Iguaçu en 3 días: guía completa para aprovechar cada hora",
      excerpt: "Ruta de 3 días en Foz do Iguaçu con las mejores atracciones, consejos locales y todo lo que necesitas saber para aprovechar cada hora.",
      ph: "Foto — Ruta de 3 días en Foz",
    },
    "bl-2": {
      cat: "Consejos de viaje",
      title: "Cómo llegar a las Cataratas del Iguazú saliendo de la posada: guía práctica para no perder tiempo",
      excerpt: "Saliendo de la posada, llegar a las Cataratas del Iguazú es más fácil de lo que parece. Descubre las mejores opciones de transporte y ahorra tiempo.",
      ph: "Foto — Cómo llegar a las Cataratas",
    },
    "bl-3": {
      cat: "Alojamiento",
      title: "Dónde alojarse cerca de las Cataratas con buena relación calidad-precio en Foz do Iguaçu",
      excerpt: "Descubre dónde alojarte cerca de las Cataratas con buena relación calidad-precio en Foz do Iguaçu y aprovecha cada momento de tu viaje con comodidad y ahorro.",
      ph: "Foto — Dónde alojarse en Foz",
    },
    "bl-4": {
      cat: "Atracciones",
      title: "Qué hacer en Foz do Iguaçu además de las Cataratas: 7 atracciones que valen cada día extra",
      excerpt: "Foz do Iguaçu tiene mucho más allá de las Cataratas. Descubre 7 atracciones que valen cada día extra en la ciudad y planifica tu visita con consejos locales.",
      ph: "Foto — Atracciones además de las Cataratas",
    },
  },

  blogCategories: {
    "Roteiros": { name: "Rutas" },
    "Dicas de viagem": { name: "Consejos de viaje" },
    "Hospedagem": { name: "Alojamiento" },
    "Atrações": { name: "Atracciones" },
  },

  blogRecent: {
    "bl-rec-1": { title: "Qué hacer en Foz do Iguaçu en 3 días" },
    "bl-rec-2": { title: "Cómo llegar a las Cataratas del Iguazú saliendo de la posada" },
    "bl-rec-3": { title: "Dónde alojarse cerca de las Cataratas con buena relación calidad-precio" },
    "bl-rec-4": { title: "Qué hacer en Foz do Iguaçu además de las Cataratas" },
  },

  blogTags: ["Cataratas", "Rutas", "Transporte", "Alojamiento", "Atracciones", "Gastronomía", "Foz do Iguaçu"],

  // ============================ Detalle Quarto ============================
  rooms: {
    "quarto-duplo": {
      name: "Habitación Doble",
      guests: "2 huéspedes",
      longDesc: "Acogedora e ideal para parejas o viajes de a dos, la Habitación Doble reúne todo lo que necesitas para un descanso tranquilo entre un paseo y otro por las Cataratas.",
      longDesc2: "Cama de matrimonio cómoda, aire acondicionado, Wi-Fi gratis y un baño privado bien equipado, en un ambiente silencioso y bien cuidado.",
      photos: photos([
        "Habitación Doble de la Pousada Cataratas en Foz do Iguaçu con cama de matrimonio",
        "Cama de matrimonio, armario y frigobar de la Habitación Doble de la Pousada Cataratas en Foz do Iguaçu",
        "TV, espejo y encimera de granito de la Habitación Doble de la Pousada Cataratas en Foz do Iguaçu",
        "Vista amplia de la Habitación Doble de la Pousada Cataratas en Foz do Iguaçu, cerca de las Cataratas",
      ]),
    },
    "quarto-triplo": {
      name: "Habitación Triple",
      guests: "3 huéspedes",
      longDesc: "Más espacio para quienes viajan en trío o en pequeñas familias, la Habitación Triple ofrece comodidad extra sin renunciar a la tranquilidad.",
      longDesc2: "Camas cómodas, aire acondicionado, Wi-Fi gratis y baño privado, en un ambiente pensado para que todos descansen bien.",
      photos: photos([
        "Habitación Triple de la Pousada Cataratas en Foz do Iguaçu con cama de matrimonio y cama individual",
        "Cama de matrimonio y cama individual de la Habitación Triple de la Pousada Cataratas en Foz do Iguaçu",
        "Habitación Triple de la Pousada Cataratas con balcón, encimera y espejo en Foz do Iguaçu",
        "TV, armario y frigobar de la Habitación Triple de la Pousada Cataratas en Foz do Iguaçu",
      ]),
    },
    "quarto-quadruplo": {
      name: "Habitación Cuádruple",
      guests: "4 huéspedes",
      longDesc: "Comodidad para que toda la familia disfrute de Foz do Iguaçu junta. La Habitación Cuádruple tiene bastante espacio para que todos descansen bien entre los paseos.",
      longDesc2: "Camas cómodas, aire acondicionado, Wi-Fi gratis y baño privado, en un ambiente amplio y bien iluminado.",
      photos: photos([
        "Habitación Cuádruple de la Pousada Cataratas en Foz do Iguaçu con cama de matrimonio y camas individuales",
        "Camas de la Habitación Cuádruple de la Pousada Cataratas en Foz do Iguaçu, ideal para familias",
        "Habitación Cuádruple de la Pousada Cataratas con TV, armario y baño privado en Foz do Iguaçu",
        "Vista amplia de la Habitación Cuádruple de la Pousada Cataratas en Foz do Iguaçu",
      ]),
    },
    "quarto-quintuplo": {
      name: "Habitación Quíntuple",
      guests: "5 huéspedes",
      longDesc: "El espacio más amplio de la posada, perfecto para familias más grandes que buscan privacidad y comodidad durante la estancia en Foz do Iguaçu.",
      longDesc2: "Varias camas, aire acondicionado, Wi-Fi gratis y baño privado, en un ambiente espacioso pensado para grupos.",
      photos: photos([
        "Habitación Quíntuple de la Pousada Cataratas en Foz do Iguaçu, amplia y para familias",
        "Camas de la Habitación Quíntuple de la Pousada Cataratas en Foz do Iguaçu, ideal para grupos",
        "Habitación Quíntuple de la Pousada Cataratas con armario y baño privado en Foz do Iguaçu",
        "Vista amplia de la Habitación Quíntuple de la Pousada Cataratas en Foz do Iguaçu",
      ]),
    },
  },

  quartoAmenities: {
    "Ar-condicionado": { label: "Aire acondicionado" },
    "Frigobar": { label: "Frigobar" },
    "TV": { label: "TV" },
    "Wi-Fi grátis": { label: "Wi-Fi gratis" },
    "Banheiro privativo": { label: "Baño privado" },
    "Cofre": { label: "Caja fuerte" },
    "Secador de cabelo": { label: "Secador de pelo" },
    "Café da manhã": { label: "Desayuno" },
    "Roupa de cama e toalhas": { label: "Ropa de cama y toallas" },
  },

  quartoAround: {
    cataratas: { title: "Cataratas del Iguazú" },
    "parque-das-aves": { title: "Parque das Aves" },
    "marco-tres-fronteiras": { title: "Hito de las Tres Fronteras" },
  },

  // ============================ Detalle Atração ============================
  atracoes: {
    cataratas: {
      eyebrow: "Patrimonio natural",
      kicker: "Foz do Iguaçu",
      name: "Cataratas del Iguazú",
      desc1: "Una de las Siete Maravillas de la Naturaleza, formada por más de 270 saltos de agua rodeados por la selva atlántica del Parque Nacional do Iguaçu. Las pasarelas llevan hasta la imponente Garganta del Diablo, donde la fuerza del agua impresiona de cerca.",
      desc2: "El paseo combina senderos ligeros, miradores y mucha naturaleza. Reserva algunas horas para disfrutarlo con calma — y prepárate para mojarte cerca de los saltos.",
      specs: [
        { label: "Distancia", value: "20 min" },
        { label: "Duración", value: "3–4 h" },
        { label: "Mejor horario", value: "Mañana" },
        { label: "Entrada", value: "De pago" },
      ],
    },
    "parque-das-aves": {
      eyebrow: "Vida salvaje",
      kicker: "Foz do Iguaçu",
      name: "Parque das Aves",
      desc1: "El mayor parque de aves de América Latina, con aviarios inmersivos donde caminas codo a codo con tucanes, guacamayos y flamencos. Una inmersión en la biodiversidad de la selva atlántica, junto a las Cataratas.",
      desc2: "El recorrido es tranquilo y accesible, perfecto para todas las edades. Reserva cerca de dos horas para apreciar cada aviario con calma.",
      specs: [
        { label: "Distancia", value: "15 min" },
        { label: "Duración", value: "2 h" },
        { label: "Mejor horario", value: "Mañana" },
        { label: "Entrada", value: "De pago" },
      ],
    },
    "marco-tres-fronteiras": {
      eyebrow: "Triple frontera",
      kicker: "Foz do Iguaçu",
      name: "Hito de las Tres Fronteras",
      desc1: "El punto donde Brasil, Argentina y Paraguay se encuentran, a orillas de los ríos Iguazú y Paraná. Un hito histórico con mirador, gastronomía y un espectáculo de luces al atardecer.",
      desc2: "Ve al final de la tarde para ver la puesta de sol sobre los tres países y quedarte para el show de luz y sonido. Un plan ligero y lleno de paisaje.",
      specs: [
        { label: "Distancia", value: "25 min" },
        { label: "Duración", value: "2 h" },
        { label: "Mejor horario", value: "Atardecer" },
        { label: "Entrada", value: "De pago" },
      ],
    },
    itaipu: {
      eyebrow: "Ingeniería y naturaleza",
      kicker: "Foz do Iguaçu",
      name: "Represa de Itaipú",
      desc1: "Una de las mayores hidroeléctricas del mundo, con visitas guiadas que revelan la escala impresionante de la represa. Por la noche, la iluminación especial transforma la estructura en un espectáculo aparte.",
      desc2: "También están el Refugio Biológico y el ecomuseo, que unen tecnología y preservación ambiental. Elige entre las rutas panorámica y especial según el tiempo disponible.",
      specs: [
        { label: "Distancia", value: "35 min" },
        { label: "Duración", value: "2–3 h" },
        { label: "Mejor horario", value: "Tarde" },
        { label: "Entrada", value: "De pago" },
      ],
    },
    "compras-paraguai": {
      eyebrow: "Compras y frontera",
      kicker: "Ciudad del Este",
      name: "Compras en Paraguay",
      desc1: "Al otro lado de la frontera, en Ciudad del Este, se encuentra uno de los mayores polos de compras de América del Sur. Electrónicos, perfumes, juguetes y novedades a precios que valen la travesía del Puente de la Amistad.",
      desc2: "Ve por la mañana para aprovechar mejor y lleva un documento con foto. Nuestro equipo ayuda a organizar el transporte y a orientar sobre el cupo de compras al volver a Brasil.",
      specs: [
        { label: "Distancia", value: "25 min" },
        { label: "Duración", value: "3–4 h" },
        { label: "Mejor horario", value: "Mañana" },
        { label: "Entrada", value: "Gratis" },
      ],
    },
    aquafoz: {
      eyebrow: "Vida acuática",
      kicker: "Foz do Iguaçu",
      name: "AquaFoz",
      desc1: "Uno de los mayores acuarios de América del Sur. Con 23 mil m² y cerca de 3,3 millones de litros de agua, AquaFoz recrea el camino de las aguas de los ríos Iguazú y Paraná en un circuito de 750 metros distribuido en tres plantas.",
      desc2: "Son más de 300 especies de agua dulce y salada — del Alto Iguazú a la Selva Inundada, de la Amazonía al Océano. Un viaje inmersivo que une encanto y educación ambiental, perfecto para todas las edades, en la Av. das Cataratas.",
      specs: [
        { label: "Distancia", value: "15 min" },
        { label: "Duración", value: "2–3 h" },
        { label: "Mejor horario", value: "Mañana" },
        { label: "Entrada", value: "De pago" },
      ],
    },
  },

  atracaoDoItems: {
    cataratas: [
      "Pasarela de las Cataratas",
      "Garganta del Diablo",
      "Senderos en la selva atlántica",
      "Miradores panorámicos",
      "Fotografía de los saltos",
      "Cafés y bares en Porto Canoas",
    ],
    "parque-das-aves": [
      "Aviarios inmersivos de selva atlántica",
      "Ver tucanes, guacamayos y flamencos de cerca",
      "Mariposario y aviario de colibríes",
      "Encuentro con guacamayos",
      "Fotografía con las aves",
      "Tienda y café del parque",
    ],
    "marco-tres-fronteiras": [
      "Mirador de las tres fronteras",
      "Espectáculo de luces al atardecer",
      "Villa gastronómica",
      "Presentaciones culturales",
      "Fotografía del obelisco",
      "Puesta de sol a orillas del río Paraná",
    ],
    itaipu: [
      "Visita panorámica a la represa",
      "Ver el vertedero en funcionamiento",
      "Iluminación nocturna de la represa",
      "Refugio Biológico Bela Vista",
      "Ecomuseo de Itaipú",
      "Circuito especial guiado",
    ],
    aquafoz: [
      "Circuito inmersivo de 750 metros",
      "Gran acuario y tanque principal",
      "Ver más de 300 especies",
      "Túnel sumergido",
      "Experiencias interactivas",
      "Educación ambiental para todas las edades",
    ],
    "compras-paraguai": [
      "Travesía del Puente de la Amistad",
      "Electrónicos, perfumes y novedades",
      "Centros comerciales de Ciudad del Este",
      "Juguetes y regalos",
      "Cambio de moneda y buenas gangas",
      "Gastronomía en la frontera",
    ],
  },

  atracaoSteps: {
    cataratas: [
      "Sal de la posada y toma la Av. das Cataratas (BR-469) sentido Parque Nacional",
      "Sigue por la carretera unos 10 km, siempre recto",
      "Entra por el pórtico del Parque Nacional do Iguaçu",
      "Estaciona en el Centro de Visitantes y dirígete a las pasarelas de las Cataratas",
    ],
    "parque-das-aves": [
      "Sal de la posada y toma la Av. das Cataratas (BR-469) sentido Parque Nacional",
      "Sigue unos minutos en dirección al pórtico del Parque Nacional",
      "El Parque das Aves queda a la derecha, poco antes de la entrada del parque",
      "Estaciona frente al Parque das Aves",
    ],
    "marco-tres-fronteiras": [
      "Sal de la posada en dirección al centro de Foz do Iguaçu",
      "Sigue por la Av. General Meira sentido Jardim Eldorado",
      "Continúa hasta las orillas del río Paraná",
      "Llegada al Hito de las Tres Fronteras",
    ],
    itaipu: [
      "Sal de la posada en dirección al centro de Foz do Iguaçu",
      "Toma la Av. Tancredo Neves sentido barrio Itaipu (norte)",
      "Sigue por la avenida unos 6 km",
      "Llegada al Centro de Recepción de Visitantes (Av. Tancredo Neves, 6702)",
    ],
    "compras-paraguai": [
      "Sal de la posada en dirección al centro de Foz do Iguaçu",
      "Sigue sentido Puente de la Amistad, sobre el río Paraná",
      "Cruza el puente rumbo a Ciudad del Este, en Paraguay",
      "Lleva documento con foto y presta atención al cupo de compras a la vuelta",
    ],
    aquafoz: [
      "Sal de la posada y toma la Av. das Cataratas (BR-469) sentido Parque Nacional",
      "Sigue por la carretera hasta el KM 18 de la Av. das Cataratas",
      "AquaFoz queda al borde de la avenida, bien señalizado",
      "Estaciona y comienza el circuito por el río Iguazú, rumbo al Océano",
    ],
  },

  // ============================ Detalle Promoção ============================
  promocoes: {
    "longa-estadia": {
      name: "Paquete larga estancia",
      sub: "A partir de 5 noches",
      validity: "Válido para estancias de 5 noches o más",
      desc: "Quédate más días y paga menos. Ideal para quienes quieren explorar Foz do Iguaçu con calma, aprovechando cada atracción sin prisa y con la comodidad de la posada como base.",
      desc2: "Cuantas más noches, mejor la tarifa. Habla con nuestro equipo y organiza la estancia perfecta para tu viaje.",
      conditions: [
        "Desayuno incluido",
        "Wi-Fi gratis en toda la posada",
        "Estacionamiento privado",
        "Mejor tarifa garantizada",
      ],
    },
    morador: {
      name: "Tarifa residente",
      sub: "Para residentes de la región",
      validity: "Mediante comprobante de residencia",
      desc: "Condición especial para quienes son de la región y quieren disfrutar de un descanso cerca de casa, con toda la estructura y la atención cálida de la posada.",
      desc2: "Presenta el comprobante de residencia en la reserva y garantiza la tarifa exclusiva para residentes.",
      conditions: [
        "Desayuno incluido",
        "Wi-Fi gratis en toda la posada",
        "Estacionamiento privado",
        "Comprobante de residencia",
      ],
    },
    antecipada: {
      name: "Reserva anticipada",
      sub: "Reservando con antelación",
      validity: "Reservas hechas con 30 días de antelación",
      desc: "Planifica tu viaje con antelación y ahorra. Quien reserva antes garantiza la mejor tarifa y la tranquilidad de tenerlo todo listo para el viaje.",
      desc2: "Reserva con al menos 30 días de antelación y aprovecha el descuento exclusivo.",
      conditions: [
        "Desayuno incluido",
        "Wi-Fi gratis en toda la posada",
        "Estacionamiento privado",
        "Cancelación flexible",
      ],
    },
  },

  // ============================ Detalle Produto ============================
  produtos: {
    "longa-estadia": {
      name: "Paquete larga estancia",
      desc1: "Quédate más días y paga menos. Ideal para quienes quieren explorar Foz do Iguaçu con calma, aprovechando cada atracción sin prisa y con la comodidad de la posada como base para conocer las Cataratas, el Parque das Aves y los alrededores.",
      desc2: "A partir de 5 noches garantizas hasta un 15% de descuento. La tarifa ya incluye desayuno, Wi-Fi gratis y estacionamiento privado — cuantas más noches, mejor la tarifa.",
    },
    morador: {
      name: "Tarifa residente",
      desc1: "Condición especial para residentes de la región de Foz do Iguaçu y alrededores. Aprovecha la posada como tu refugio cerca de casa, con toda la estructura y la comodidad de siempre.",
      desc2: "Los residentes de la región tienen un 10% de descuento en la tarifa mediante comprobante de residencia. Desayuno, Wi-Fi gratis y estacionamiento incluidos.",
    },
    antecipada: {
      name: "Reserva anticipada",
      desc1: "Planifica tu viaje con antelación y paga menos. Reservando con bastante margen garantizas la mejor tarifa y tranquilidad para organizar cada detalle del paseo.",
      desc2: "Reservando con antelación ganas un 12% de descuento en la tarifa. La condición incluye desayuno, Wi-Fi gratis y estacionamiento privado.",
    },
    "day-use": {
      name: "Day Use",
      desc1: "Aprovecha la estructura de la Pousada Cataratas por un día, sin necesidad de alojarte. Perfecto para quienes están de paso por Foz do Iguaçu y quieren relajarse entre un paseo y otro.",
      desc2: "El Day Use cuesta R$ 90 por persona y da acceso a las áreas de ocio de la posada durante el día, de 9h a 18h. Consulta la disponibilidad con nuestro equipo.",
    },
    "agosto-encantador": {
      name: "Agosto Encantador",
      fotoAlt: "Niños alimentando cabras en el Zoopark de Foz do Iguaçu — promoción Agosto Encantador de Pousada Cataratas",
      desc1: "Una promoción especial para hacer tu agosto inolvidable en Foz do Iguaçu. Alójate con nosotros y gana dos entradas para el Zoopark, uno de los paseos más encantadores de la región.",
      desc2: "Aprovecha la comodidad de la posada y vive la naturaleza de cerca, con dos entradas al Zoopark incluidas en tu estancia. Habla con nuestro equipo y garantiza tu reserva.",
    },
  },

  produtoRelated: {
    "quarto-duplo": { name: "Habitación Doble" },
    "quarto-triplo": { name: "Habitación Triple" },
    "quarto-quadruplo": { name: "Habitación Cuádruple" },
    "quarto-quintuplo": { name: "Habitación Quíntuple" },
  },

  // ============================ Detalle Artigo (blog) ============================
  artigos: {
    "o-que-fazer-em-foz-do-iguacu-em-3-dias": {
      category: "Rutas",
      title: "Qué hacer en Foz do Iguaçu en 3 días: guía completa para aprovechar cada hora",
      date: "7 de julio de 2026",
      author: "Equipo Pousada Cataratas",
      readTime: "4 min de lectura",
      body: body([
        { text: "Tres días parecen poco hasta que te das cuenta de que Foz do Iguaçu concentra algunos de los paisajes más impresionantes del planeta a pocos kilómetros unos de otros. Si quieres saber qué hacer en Foz do Iguaçu en 3 días sin perder tiempo ni dinero, llegaste al lugar correcto. Esta guía fue pensada por quienes conocen cada rincón de la ciudad y reciben visitantes todo el año." },
        { text: "Día 1: Cataratas del Iguazú y Parque das Aves a primera hora" },
        { text: "Empieza por lo más grandioso: las Cataratas del Iguazú. Llega antes de las 9h para tomar el sendero con menos gente y buena luz para las fotos. La caminata principal tiene cerca de 1,2 km y termina en la pasarela de la Garganta del Diablo brasileña, con el rocío del agua golpeando la cara. Reserva al menos dos horas aquí." },
        { text: "Justo a la salida del parque nacional, el Parque das Aves vale la parada. En menos de una hora atraviesas aviarios con guacamayos, tucanes y garzas de cerca, en una visita relajada que funciona bien para niños y parejas. Almuerza por ahí cerca y descansa por la tarde, porque el segundo día exige energía." },
        { text: "Qué llevar a las Cataratas" },
        { items: [
          "Ropa de secado rápido, porque te vas a mojar en la pasarela final",
          "Protector solar y repelente, el sendero pasa por zona abierta",
          "Calzado cerrado y antideslizante para el suelo mojado",
          "Cámara o móvil bien protegido en una bolsa impermeable",
        ] },
        { text: "Día 2: Itaipú por la mañana y Triple Frontera al atardecer" },
        { text: "La Represa de Itaipú abre a las 8h y ofrece visitas guiadas con distintos niveles de profundidad. El paseo panorámico ya impresiona bastante y dura cerca de una hora. Para quienes quieren ver las turbinas por dentro, el circuito especial requiere reserva previa. Vale la inversión. Por la tarde, el Hito de las Tres Fronteras reúne a Brasil, Argentina y Paraguay en un único mirador a orillas del río Paraná. La puesta de sol desde allí, con las aguas encontrándose, es un cierre perfecto para el día." },
        { text: "Día 3: naturaleza, compras y un ritmo más tranquilo" },
        { text: "El tercer día es el momento de respirar hondo y aprovechar lo que quedó de la lista. Mucha gente usa esa mañana para volver a algún punto favorito o explorar el Parque Nacional con más calma, sin el ajetreo del primer día. Si todavía no fuiste hasta el Sendero del Poço Preto, ese es el momento indicado: son casi ocho kilómetros entre selva cerrada, con avistamiento de aves y paradas a orillas del río. Es el lado salvaje y silencioso de Foz que pocos turistas descubren." },
        { text: "Por la tarde, la Feria de Ciudad del Este, del lado paraguayo, atrae a quienes buscan electrónicos, perfumes y ropa a precios competitivos. La travesía por el Puente de la Amistad es sencilla: lleva documento, presta atención al límite de compras permitido por la Receita Federal y listo. No hace falta visado. Si la frontera no es lo tuyo, el centro de Foz tiene tiendas, mercaditos y una escena gastronómica árabe sorprendente, herencia de la comunidad libanesa que vive en la ciudad desde hace décadas." },
        { text: "Consejos para aprovechar Ciudad del Este sin estrés" },
        { items: [
          "Ve temprano, preferiblemente antes de las 10h: el movimiento aumenta mucho al final de la mañana.",
          "Lleva reales y dólares. El cambio local acepta ambos, pero compara antes de pagar.",
          "Guarda las facturas de todo lo que compres para facilitar la vuelta por la aduana.",
          "Evita el sábado si puedes: es el día de mayor movimiento en el puente y en las tiendas.",
        ] },
        { text: "Dónde alojarse para aprovechar todo esto sin perder tiempo" },
        { text: "Saber qué hacer en Foz do Iguaçu en 3 días es medio camino recorrido. La otra mitad es tener una base bien ubicada, donde llegas descansado, comes bien por la mañana y además sales sin atascarte. Nuestra posada queda a pocos minutos de las Cataratas, con acceso fácil tanto al lado brasileño como a la Triple Frontera e Itaipú. Sin coche, sin complicaciones: muchos de nuestros huéspedes lo hacen todo en taxi o aplicación y gastan mucho menos de lo que imaginaban." },
        { text: "Si estás planeando ese viaje, reserva directamente con nosotros. Aquí encuentras una atención de quien conoce cada rincón de la ciudad y quiere ayudarte a aprovechar cada hora de tus tres días en Foz. Envía un mensaje, cuéntanos tu ruta y te echamos una mano para ajustar lo que haga falta." },
      ]),
    },
    "como-chegar-as-cataratas-do-iguacu-saindo-da-pousada": {
      category: "Consejos de viaje",
      title: "Cómo llegar a las Cataratas del Iguazú saliendo de la posada: guía práctica para no perder tiempo",
      date: "7 de julio de 2026",
      author: "Equipo Pousada Cataratas",
      readTime: "4 min de lectura",
      body: body([
        { text: "Te despiertas, tomas un café calentito y ya sientes el olor de la selva. Sabes que las Cataratas del Iguazú están ahí, a pocos minutos. Pero, ¿cómo llegar a las Cataratas del Iguazú saliendo de nuestra posada de la forma más rápida y tranquila posible? Esa es la duda más común de quienes están a punto de reservar, y te respondemos con todo lo que necesitas saber antes incluso de armar la mochila." },
        { text: "La distancia que marca toda la diferencia" },
        { text: "La posada queda a aproximadamente 100 metros de la Avenida das Cataratas, la vía principal que conecta Foz do Iguaçu con la entrada del Parque Nacional. Eso significa que, mientras otros huéspedes todavía están en el coche saliendo del centro de la ciudad, tú ya estás en camino. No es poca cosa si se considera que el parque abre temprano y la fila para entrar crece rápido los fines de semana y feriados." },
        { text: "Esa ubicación te coloca en el corredor natural de acceso al parque, con fácil salida hacia cualquier medio de transporte que prefieras. A continuación, detallamos cada opción para que elijas la que más sentido tiene para tu ruta." },
        { text: "Ir a pie: sí, es posible y muy sencillo" },
        { text: "Para quienes disfrutan de una caminata matinal, la entrada principal del Parque Nacional do Iguaçu queda a cerca de 3 km de la posada, siempre siguiendo por la Avenida das Cataratas. El recorrido tiene acera en buena parte del trayecto y pasa por verde a ambos lados de la vía. En días de sol, es un comienzo de mañana muy agradable. Lleva alrededor de 35 a 40 minutos a ritmo tranquilo." },
        { text: "Qué llevar si vas a pie" },
        { items: [
          "Protector solar aplicado antes de salir, porque el tramo tiene trechos sin sombra",
          "Botella de agua, ya que dentro del parque las opciones de compra se concentran en puntos específicos",
          "Calzado cerrado y cómodo, el suelo de los senderos dentro del parque es irregular en algunos tramos",
          "La entrada comprada con antelación por el sitio oficial del ICMBio, para no perder tiempo en la taquilla",
        ] },
        { text: "En coche propio o alquilado: rápido y sin complicaciones" },
        { text: "Si viniste en coche o alquilaste uno en Foz, la salida de la posada ya cae directo en la Avenida das Cataratas. Son menos de 5 minutos de viaje hasta el estacionamiento del parque, que cobra una tasa aparte de la entrada. Llegar temprano compensa, porque las plazas cerca de la entrada se agotan en temporada alta." },
        { text: "Transporte público: la línea que lleva directo al parque" },
        { text: "Quien prefiere no conducir tiene una opción práctica y barata: el autobús de la línea 120, conocido como 'Cataratas', pasa por la Avenida das Cataratas y lleva hasta la entrada del parque. El trayecto dura entre 15 y 25 minutos según el tráfico, y la parada más cercana a la posada queda a menos de dos minutos a pie. El billete cuesta un valor muy accesible, y encuentras el horario actualizado directamente en la aplicación de TCFOZ o preguntando en recepción." },
        { text: "Un consejo real: evita tomar el autobús entre las 9h y las 10h los fines de semana de temporada alta. El vehículo suele llenarse, y esperar el siguiente puede costar 20 minutos preciosos. Saliendo a las 8h, llegas antes de que la fila se engrose y además aprovechas la luz de la mañana en los senderos." },
        { text: "Taxi y aplicaciones: cuándo vale la pena pagar un poco más" },
        { text: "Aplicaciones como 99 y Uber funcionan bien en Foz do Iguaçu. El viaje de la posada hasta la entrada del parque ronda los 10 a 15 reales, según el horario. No es nada absurdo si vas con un niño pequeño, mucho equipaje de día, o simplemente quieres puerta a puerta sin pensar en estacionamiento. El taxi convencional también circula por la avenida y se puede llamar en recepción." },
        { text: "Horarios del parque: no llegues sin comprobar" },
        { items: [
          "El Parque Nacional do Iguaçu abre a las 9h y cierra a las 17h la mayor parte del año, con variaciones estacionales.",
          "La entrada debe comprarse con antelación por el sitio del ICMBio; no es posible comprarla en la taquilla física.",
          "La última entrada permitida suele ser hasta las 16h, así que planifica llegar con margen.",
          "Domingos y feriados tienen un flujo mucho mayor, conviene salir de la posada más temprano.",
        ] },
        { text: "Resumen para quien ya está casi decidido" },
        { text: "Saber cómo llegar a las Cataratas del Iguazú desde la posada es más sencillo de lo que parece, justamente porque la ubicación resuelve buena parte del problema. A pie, en coche, en autobús o en aplicación, el camino es corto y sin rodeos. Lo que cambia es tu ritmo en el día: quien va a pie elige la calma, quien va en coche elige la flexibilidad, quien va en autobús elige el bolsillo más ligero." },
        { text: "Si tienes cualquier duda sobre el horario de salida, cómo comprar la entrada o qué llevar en la mochila, puedes preguntar en recepción antes de dormir. Aquí conocemos cada detalle del camino, y nos encanta ayudarte a aprovechar cada minuto en las Cataratas." },
      ]),
    },
    "onde-se-hospedar-perto-das-cataratas-com-bom-custo-beneficio": {
      category: "Alojamiento",
      title: "Dónde alojarse cerca de las Cataratas con buena relación calidad-precio en Foz do Iguaçu",
      date: "7 de julio de 2026",
      author: "Equipo Pousada Cataratas",
      readTime: "4 min de lectura",
      body: body([
        { text: "Buscaste, comparaste, abriste decenas de pestañas y todavía no sabes dónde alojarte cerca de las Cataratas con buena relación calidad-precio. Foz do Iguaçu tiene opciones para todos los gustos, pero la diferencia entre llegar descansado y listo para disfrutar o perder horas en el tráfico empieza en la elección del alojamiento. Y esa elección importa más de lo que parece." },
        { text: "Qué hace que un alojamiento valga cada real que pagas" },
        { text: "Precio bajo no es sinónimo de buena relación calidad-precio. Quien ya se quedó en un hotel lejano lo sabe: lo que ahorras en la tarifa, lo gastas en taxi, en tiempo perdido y en el cansancio de llegar a las atracciones después de una hora de carretera. La ecuación cambia cuando la posada queda a pocos minutos de las Cataratas del Iguazú y además ofrece limpieza impecable, atención de gente que conoce la ciudad de verdad y estacionamiento seguro para dejar el coche sin preocupación." },
        { text: "Las reseñas de quienes ya se alojaron en Foz apuntan siempre a los mismos puntos: la cama buena, el desayuno abundante, la piscina que salva en el calor de Paraná y el cuidado de quien recibe. Son esos detalles los que hacen que el viaje valga la pena." },
        { caption: "La Pousada Cataratas queda a pocos minutos de las Cataratas del Iguazú, con piscina, desayuno incluido y estacionamiento seguro." },
        { text: "Lo que más elogian los huéspedes en las posadas de Foz" },
        { items: [
          "Limpieza y organización de las habitaciones y áreas comunes",
          "Atención cercana y consejos locales que no aparecen en ninguna guía",
          "Estacionamiento seguro incluido, sin tasa sorpresa en el checkout",
          "Piscina disponible para descomprimir después de un día en las Cataratas",
          "Ubicación que te coloca a minutos de los principales atractivos",
        ] },
        { text: "En la práctica, una posada bien ubicada en Foz do Iguaçu resuelve de una vez el problema de desplazamiento, seguridad y comodidad. Te despiertas, tomas el desayuno y ya estás cerca de todo, ya sea de las Cataratas, ya sea de la triple frontera con Argentina y Paraguay. Es exactamente ese conjunto lo que transforma un alojamiento común en un punto de partida que tiene sentido para tu viaje." },
        { text: "Posada u hotel: dónde rinde más tu dinero en Foz do Iguaçu" },
        { text: "Quien busca dónde alojarse cerca de las Cataratas con buena relación calidad-precio se topa rápido con una duda real: ¿vale la pena pagar más por un hotel grande o una posada ofrece la misma comodidad con más ventaja? La respuesta, la mayoría de las veces, se inclina hacia la posada. No porque sea 'más barata' en el sentido genérico, sino porque lo que recibes a cambio es más denso: atención que reconoce tu nombre, estacionamiento sin tasa extra escondida en el checkout y esa piscina que aparece como bonus en medio del calor de Foz." },
        { text: "Los hoteles más grandes cobran por la estructura que quizás nunca uses, salón de convenciones, spa completo, restaurante gourmet. En cambio, en una posada bien gestionada, cada real va directo a lo que importa: cama buena, baño limpio, desayuno abundante y una recepción que te indica el mejor horario para entrar en las Cataratas sin hacer fila." },
        { text: "Qué mirar además del precio a la hora de comparar" },
        { items: [
          "Distancia real hasta las Cataratas: calcula en minutos en coche, no solo en kilómetros en el mapa.",
          "Estacionamiento incluido y seguro, especialmente si vienes en coche o alquilaste uno a la llegada.",
          "Piscina disponible sin horario restringido, ideal para descansar tras un día largo en el Parque Nacional.",
          "Desayuno incluido: ahorra una comida entera y te pone en la carretera ya alimentado.",
          "Reseñas recientes sobre limpieza y atención, no solo sobre la estructura física.",
        ] },
        { text: "Por qué la ubicación decide más que cualquier otra cosa" },
        { text: "Foz do Iguaçu no es una ciudad grande, pero el tráfico en temporada alta sorprende. Estar en un punto estratégico significa llegar a las Cataratas antes del pico de visitantes, aprovechar una tarde en la triple frontera sin prisas y aún tener energía para una cena tranquila de vuelta. Cada minuto ahorrado en desplazamiento es un minuto más dentro del Parque, o simplemente descansando en la posada." },
        { text: "Garantiza tu estancia antes de que las mejores habitaciones desaparezcan del mapa" },
        { text: "Foz do Iguaçu se llena rápido en los feriados y en verano. Quien lo deja para última hora acaba eligiendo entre lo que sobró, pagando más caro por menos comodidad o quedándose lejos de todo lo que planeó. Si tu viaje ya tiene fecha, no empujes la reserva. Elige una posada con buena ubicación, estacionamiento, piscina y atención de quien conoce la ciudad de verdad. Después solo queda llegar, abrir la ventana y dejar que el ruido de los saltos de agua haga el resto." },
      ]),
    },
    "o-que-fazer-em-foz-do-iguacu-alem-das-cataratas": {
      category: "Atracciones",
      title: "Qué hacer en Foz do Iguaçu además de las Cataratas: 7 atracciones que valen cada día extra",
      date: "7 de julio de 2026",
      author: "Equipo Pousada Cataratas",
      readTime: "3 min de lectura",
      body: body([
        { text: "Llegaste a Foz do Iguaçu, te quedaste boquiabierto en las Cataratas y pensaste: '¿y ahora?' La buena noticia es que la ciudad tiene mucho más que ese paisaje ya inolvidable. Saber qué hacer en Foz do Iguaçu además de las Cataratas es el secreto para transformar una visita rápida en algunos de los mejores días de viaje que hayas tenido." },
        { text: "Foz guarda sorpresas para quien se queda más de un día" },
        { text: "Quien reserva solo una noche suele irse con la sensación de que dejó cosas atrás. Y las dejó de verdad. La región de la triple frontera, donde Brasil, Argentina y Paraguay se encuentran, concentra parques, gastronomía, shows nocturnos y adrenalina suficiente para ocupar una semana entera sin repetir plan." },
        { text: "La distancia entre los principales puntos es corta, lo que lo hace todo más fácil. Con una buena base, sales temprano, aprovechas el día entero y vuelves sin estrés. Es exactamente esa comodidad la que ofrece nuestra posada: ubicación estratégica, desayuno cuidado y equipo listo para indicar el camino correcto." },
        { text: "Parque das Aves: colores a los que ninguna foto hace justicia" },
        { text: "A pocos metros de la entrada de las Cataratas, el Parque das Aves reúne más de 1.400 especies en un ambiente de Selva Atlántica preservada. Caminas dentro de aviarios enormes, con tucanes, guacamayos y loros volando a tu alrededor. Reserva al menos dos horas y lleva repelente." },
        { text: "Qué observar para aprovechar mejor la visita" },
        { items: [
          "Llega temprano: los pájaros están más activos en las primeras horas de la mañana.",
          "Presta atención al aviario de las maritacas, donde se posan en tu hombro.",
          "Combina la visita con las Cataratas el mismo día, ya que ambos quedan en la misma avenida.",
          "Los niños pagan media entrada o entran gratis según la edad, confirma en el momento.",
        ] },
        { text: "Y esto es solo el comienzo. Foz aún reserva velocidad en el kartódromo, sabores de la frontera y shows que animan toda la noche. En los próximos apartados, te contamos todo para que llegues preparado y no te pierdas nada." },
        { text: "Adrena Kart: adrenalina de verdad a pocos minutos de las Cataratas" },
        { text: "Si piensas que Foz es solo naturaleza, el kartódromo Adrena Kart te va a sorprender. Con pistas profesionales y karts veloces, es parada obligada para quien quiere romper el ritmo entre un paseo y otro. Perfecto para parejas, amigos o para aquel familiar competitivo que aparece en todo viaje." },
        { text: "Sabores de la triple frontera: comer bien también es plan" },
        { text: "La gastronomía de Foz mezcla acentos brasileños, argentinos y paraguayos en un mismo plato. Asadores robustos, comiditas típicas en el mercado y restaurantes que combinan sabores de los tres países forman una ruta aparte para quien disfruta de comer bien sin gastar mucho." },
        { items: [
          "Prueba el tereré helado, bebida típica que los locales adoran en los días calurosos",
          "No te vayas sin probar la empanada argentina en alguna de las casas cerca de la frontera",
          "Los mercados del lado paraguayo tienen aperitivos rápidos y baratos para reponer energía entre paseos",
        ] },
        { text: "Rafain e IPORÃ: la noche en Foz tiene show garantizado" },
        { text: "Cuando el sol se va, Foz enciende otra llama. El Show Rafain reúne danzas folclóricas de varios países sudamericanos en un espectáculo colorido y animado. El IPORÃ, por su parte, apuesta por una lectura más contemporánea de la cultura local, con música en vivo y presentaciones que atrapan la atención de principio a fin. Planear al menos una noche para estos shows es la decisión correcta." },
        { text: "Consejo de quien conoce: reserva el show con antelación" },
        { text: "Los fines de semana y feriados, las sesiones se llenan rápido. Garantizar la entrada antes evita frustraciones y además deja el resto del día más tranquilo, sin esa carrera de última hora." },
        { text: "Ahora ya sabes qué hacer en Foz do Iguaçu además de las Cataratas, y te diste cuenta de que la ciudad pide más días de los que la mayoría de la gente reserva. Nuestra posada queda muy cerca de todos esos atractivos, con la calidez de quien te recibe como visita de casa. Elige las fechas, haz tu reserva y deja que nosotros nos ocupemos del resto." },
      ]),
    },
  },

  artigoTags: ["Cataratas", "Rutas", "Transporte", "Alojamiento", "Atracciones", "Gastronomía", "Foz do Iguaçu"],

  artigoCategories: {
    "Roteiros": { name: "Rutas" },
    "Dicas de viagem": { name: "Consejos de viaje" },
    "Hospedagem": { name: "Alojamiento" },
    "Atrações": { name: "Atracciones" },
  },

  artigoRecent: {
    "o-que-fazer-em-foz-do-iguacu-em-3-dias": { title: "Qué hacer en Foz do Iguaçu en 3 días" },
    "como-chegar-as-cataratas-do-iguacu-saindo-da-pousada": { title: "Cómo llegar a las Cataratas del Iguazú saliendo de la posada" },
    "onde-se-hospedar-perto-das-cataratas-com-bom-custo-beneficio": { title: "Dónde alojarse cerca de las Cataratas con buena relación calidad-precio" },
    "o-que-fazer-em-foz-do-iguacu-alem-das-cataratas": { title: "Qué hacer en Foz do Iguaçu además de las Cataratas" },
  },

  artigoRelated: {
    "/blog/o-que-fazer-em-foz-do-iguacu-em-3-dias": { title: "Qué hacer en Foz do Iguaçu en 3 días" },
    "/blog/como-chegar-as-cataratas-do-iguacu-saindo-da-pousada": { title: "Cómo llegar a las Cataratas del Iguazú saliendo de la posada" },
    "/blog/onde-se-hospedar-perto-das-cataratas-com-bom-custo-beneficio": { title: "Dónde alojarse cerca de las Cataratas con buena relación calidad-precio" },
    "/blog/o-que-fazer-em-foz-do-iguacu-alem-das-cataratas": { title: "Qué hacer en Foz do Iguaçu además de las Cataratas" },
  },
};
