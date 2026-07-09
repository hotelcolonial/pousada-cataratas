import type { MetadataRoute } from "next";
import { siteUrl, noindex } from "@/i18n/seo";

export default function robots(): MetadataRoute.Robots {
  // Staging (URL que no es el dominio real, según NEXT_PUBLIC_SITE_URL):
  // bloquea TODO el rastreo. Ver i18n/seo.ts.
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
