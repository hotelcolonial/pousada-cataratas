// Constructores de datos estructurados schema.org (JSON-LD).
// Todo el texto visible se recibe ya localizado según el idioma de la página.
import { localePath } from "@/i18n/config";
import { siteUrl, siteName, defaultOgImage } from "@/i18n/seo";

const abs = (path: string) => `${siteUrl}${path}`;

// Dirección real (igual en los tres idiomas).
const ADDRESS = {
  "@type": "PostalAddress",
  streetAddress: "R. Parigot de Souza, 180 - Vila Yolanda",
  addressLocality: "Foz do Iguaçu",
  addressRegion: "PR",
  postalCode: "85853-270",
  addressCountry: "BR",
};

// Amenities de la pousada, localizadas por idioma (amenityFeature).
const AMENITIES: Record<string, string[]> = {
  pt: [
    "Wi-Fi grátis",
    "Estacionamento",
    "Piscina",
    "Ar-condicionado",
    "Cofre",
    "Café da manhã",
    "Espaço Kids",
    "Recepção 24h",
    "Lavanderia (com custo à parte)",
    "Localização estratégica",
  ],
  es: [
    "Wi-Fi gratis",
    "Estacionamiento",
    "Piscina",
    "Aire acondicionado",
    "Caja fuerte",
    "Desayuno",
    "Espacio Kids",
    "Recepción 24h",
    "Lavandería (con costo aparte)",
    "Ubicación estratégica",
  ],
  en: [
    "Free Wi-Fi",
    "Parking",
    "Swimming pool",
    "Air conditioning",
    "Safe",
    "Breakfast",
    "Kids Space",
    "24-hour reception",
    "Laundry (extra charge)",
    "Strategic location",
  ],
};

// LodgingBusiness (Hotel): entidad principal del sitio. Se inyecta en el layout.
export function lodgingBusinessLd(lang: string, description: string) {
  const amenities = (AMENITIES[lang] ?? AMENITIES.pt).map((name) => ({
    "@type": "LocationFeatureSpecification",
    name,
    value: true,
  }));
  return {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    name: siteName,
    description,
    url: abs(localePath(lang, "/")),
    image: abs(defaultOgImage),
    telephone: "+5545991377708",
    priceRange: "R$320–R$620",
    address: ADDRESS,
    geo: {
      "@type": "GeoCoordinates",
      latitude: -25.5555564,
      longitude: -54.5682326,
    },
    amenityFeature: amenities,
    availableLanguage: ["pt-BR", "es", "en"],
  };
}

// BlogPosting para las páginas de artículo.
export function articleLd(opts: {
  lang: string;
  slug: string;
  title: string;
  description: string;
  image: string;
  author: string;
  datePublished?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: opts.title,
    description: opts.description,
    image: abs(opts.image),
    author: { "@type": "Organization", name: opts.author },
    publisher: {
      "@type": "Organization",
      name: siteName,
      logo: { "@type": "ImageObject", url: abs("/images/pousada-logo.webp") },
    },
    ...(opts.datePublished
      ? { datePublished: opts.datePublished, dateModified: opts.datePublished }
      : {}),
    mainEntityOfPage: abs(localePath(opts.lang, `/blog/${opts.slug}`)),
    inLanguage: opts.lang,
  };
}

// Product + Offer por cuarto, con precio en BRL.
export function productLd(opts: {
  lang: string;
  slug: string;
  name: string;
  description: string;
  image: string;
  price: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: opts.name,
    description: opts.description,
    image: abs(opts.image),
    brand: { "@type": "Brand", name: siteName },
    offers: {
      "@type": "Offer",
      price: opts.price,
      priceCurrency: "BRL",
      availability: "https://schema.org/InStock",
      url: abs(localePath(opts.lang, `/quartos/${opts.slug}`)),
    },
  };
}

// BreadcrumbList para páginas interiores. `items` en orden: raíz → actual.
export function breadcrumbLd(
  lang: string,
  items: { name: string; path: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: abs(localePath(lang, it.path)),
    })),
  };
}

// Convierte la fecha canónica en portugués ("7 de Julho, 2026") a ISO 8601.
const PT_MONTHS: Record<string, number> = {
  janeiro: 1, fevereiro: 2, março: 3, marco: 3, abril: 4, maio: 5,
  junho: 6, julho: 7, agosto: 8, setembro: 9, outubro: 10,
  novembro: 11, dezembro: 12,
};
export function ptDateToISO(s: string): string | undefined {
  const m = s.match(/(\d{1,2})\s+de\s+([A-Za-zçÇãÃ]+),?\s+(\d{4})/i);
  if (!m) return undefined;
  const month = PT_MONTHS[m[2].toLowerCase()];
  if (!month) return undefined;
  return `${m[3]}-${String(month).padStart(2, "0")}-${String(Number(m[1])).padStart(2, "0")}`;
}
