import { NextResponse, type NextRequest } from "next/server";
import { locales, defaultLocale, isLocale } from "@/i18n/config";

// Detecta el locale inicial del visitante:
// 1) cookie NEXT_LOCALE (elección previa),
// 2) cabecera Accept-Language,
// 3) fallback al locale por defecto (pt).
function detectLocale(req: NextRequest): string {
  const cookie = req.cookies.get("NEXT_LOCALE")?.value;
  if (cookie && isLocale(cookie)) return cookie;

  const header = req.headers.get("accept-language");
  if (header) {
    const preferred = header
      .split(",")
      .map((part) => part.split(";")[0].trim().toLowerCase());
    for (const p of preferred) {
      const base = p.split("-")[0];
      if (isLocale(base)) return base;
    }
  }
  return defaultLocale;
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // ¿La ruta ya trae prefijo de locale? (/pt, /pt/..., /es, ...)
  const hasLocale = locales.some(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`),
  );
  if (hasLocale) return NextResponse.next();

  // Sin prefijo → redirigir al locale detectado (Variante A).
  const locale = detectLocale(req);
  const url = req.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Excluye _next, api, assets estáticos (images, fonts) y cualquier archivo
  // con extensión. El resto pasa por el middleware para asegurar el prefijo.
  matcher: ["/((?!_next|api|images|fonts|favicon.ico|.*\\..*).*)"],
};
