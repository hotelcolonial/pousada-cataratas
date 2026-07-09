import type { MetadataRoute } from "next";
import { siteUrl, noindex } from "@/i18n/seo";

export default function robots(): MetadataRoute.Robots {
  // Staging (NEXT_PUBLIC_NOINDEX activo): bloquea TODO el rastreo.
  if (noindex) {
    return {
      rules: { userAgent: "*", disallow: "/" },
    };
  }
  // Dominio real: indexable, con sitemap.
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
