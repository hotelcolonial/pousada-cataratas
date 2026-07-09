"use client";

import { useState, type CSSProperties } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useLocale, useDict } from "@/components/i18n/LocaleProvider";
import { locales, localePath, type Locale } from "@/i18n/config";

// Enlaces de navegación — mismos labels que el export (Header.dc.html).
// Los href apuntan a las rutas de Next (antes eran *.dc.html).
const links = [
  { key: "inicio", label: "Início", href: "/" },
  { key: "quartos", label: "Acomodações", href: "/quartos" },
  { key: "galeria", label: "Galeria", href: "/galeria" },
  { key: "promocoes", label: "Promoções", href: "/promocoes" },
  { key: "atracoes", label: "Atrações", href: "/atracoes" },
  { key: "blog", label: "Blog", href: "/blog" },
];

// Icono de WhatsApp (mismo path del export, se reutiliza a distintos tamaños).
const WA_PATH =
  "M12 2a9.94 9.94 0 0 0-8.5 15.16L2 22l4.96-1.46A10 10 0 1 0 12 2Zm0 18.13a8.1 8.1 0 0 1-4.13-1.13l-.3-.18-3.05.9.92-2.98-.2-.31A8.13 8.13 0 1 1 12 20.13Zm4.46-6.1c-.24-.12-1.44-.71-1.66-.79s-.39-.12-.55.12-.63.79-.77.95-.28.18-.52.06a6.66 6.66 0 0 1-1.96-1.21 7.4 7.4 0 0 1-1.36-1.69c-.14-.24 0-.37.11-.49s.24-.28.37-.42a1.6 1.6 0 0 0 .24-.41.45.45 0 0 0 0-.43c-.06-.12-.55-1.32-.75-1.81s-.4-.41-.55-.42h-.47a.9.9 0 0 0-.65.3 2.74 2.74 0 0 0-.85 2.03 4.74 4.74 0 0 0 1 2.52 10.9 10.9 0 0 0 4.17 3.68c.58.25 1.04.4 1.39.51a3.35 3.35 0 0 0 1.54.1 2.51 2.51 0 0 0 1.65-1.17 2.04 2.04 0 0 0 .14-1.16c-.06-.1-.22-.16-.46-.28Z";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  // Locale actual del ruteo (para prefijar los enlaces internos y mostrar el
  // idioma activo en el selector).
  const routeLang = useLocale();
  const dict = useDict();
  const router = useRouter();

  // "nav activo" derivado del pathname, ignorando el prefijo de idioma
  // (/pt/quartos -> /quartos) para que la lógica siga igual que antes.
  const pathname = usePathname();
  const rest =
    pathname.replace(new RegExp(`^/(${locales.join("|")})(?=/|$)`), "") || "/";
  const active =
    rest === "/"
      ? "inicio"
      : rest.startsWith("/quartos")
        ? "quartos"
        : rest.startsWith("/galeria")
          ? "galeria"
          : rest.startsWith("/promocoes")
            ? "promocoes"
            : rest.startsWith("/atracoes")
              ? "atracoes"
              : rest.startsWith("/blog")
                ? "blog"
                : "inicio";

  const reserveHref = "#";
  const waHref = "#";
  // Selector de idioma: PT · ES · EN. Al elegir, guarda la preferencia en la
  // cookie NEXT_LOCALE y navega a la MISMA página en el idioma elegido
  // (mismo slug, solo cambia el prefijo de locale).
  const langItems = locales;
  const current = routeLang.toUpperCase();
  const switchLocale = (code: Locale) => {
    document.cookie = `NEXT_LOCALE=${code}; path=/; max-age=31536000; samesite=lax`;
    setLangOpen(false);
    // scroll: false → conserva la posición de scroll al cambiar de idioma
    // (mismo diseño en los tres idiomas), en vez de volver al inicio.
    router.push(localePath(code, rest), { scroll: false });
  };

  // Estilo base de los ítems del selector de idioma (itemBase del export).
  const langItemBase: CSSProperties = {
    display: "block",
    width: "100%",
    textAlign: "left",
    padding: "10px 16px",
    border: "none",
    background: "transparent",
    color: "#1B2733",
    fontSize: "11.5px",
    letterSpacing: ".14em",
    textTransform: "uppercase",
    cursor: "pointer",
    fontFamily: "inherit",
    transition: "background .12s,color .12s",
  };
  const langItemStyle = (code: string): CSSProperties =>
    routeLang === code
      ? { ...langItemBase, background: "#143C7A", color: "#FFFFFF" }
      : langItemBase;

  return (
    <header
      className="pch"
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: "#143C7A",
        boxShadow: "none",
        fontFamily: "var(--font-hnc), system-ui, sans-serif",
        color: "#FFFFFF",
      }}
    >
      {/* ===== Selo Méritum Hotéis (painel do canto esquerdo) =====
          Renderizado de forma ABSOLUTA sobre o <header> (largura total), por isso
          fica colado à borda esquerda real da tela em qualquer largura, com o
          corte diagonal (clip-path). Altura = TODO o header (--pch-h = 118px:
          faixa de contato + nav), então o painel branco cobre as duas linhas.
          Logo A CORES (fica sobre branco), centrado H+V. O logo da Pousada é
          deslocado para a direita (.pch-pousada) para não ficar sob o painel. */}
      <div
        className="pch-meritum"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 3,
          height: "var(--pch-h)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#FFFFFF",
          // Bloco largo e "cheio", com a diagonal acentuada (offset 32px). O topo
          // e a base foram alargados mais um pouco (padding direito 34px): a borda
          // direita fica em ~101px na altura do logo da Pousada (x≈104px) → ~3px
          // de separação, no limite sem tapar. O logo da Pousada NÃO se move.
          padding: "0 34px 0 18px",
          clipPath: "polygon(0 0, 100% 0, calc(100% - 32px) 100%, 0 100%)",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/meritum-hoteis-logo.webp"
          alt={dict.header.meritumAlt}
          title={dict.header.meritumTitle}
          style={{ height: "56px", width: "auto", display: "block" }}
        />
      </div>

      {/* ===== FILA 1: faixa superior com os dados de contato =====
          O contato fica à direita e some no mobile (sobra só o selo Méritum).
          Dados fixos (iguais nos 3 idiomas): endereço + telefone (tel:) + email
          (mailto:). Ícones reaproveitados do próprio site. */}
      <div className="pch-topbar">
        <div className="pch-topbar-inner">
          <div className="pch-contact">
            <span className="pch-ci">
              <svg viewBox="0 0 24 24" aria-hidden><path d="M12 2C8.1 2 5 5.1 5 9c0 5.2 7 13 7 13s7-7.8 7-13c0-3.9-3.1-7-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5Z" /></svg>
              <span>R. Parigot de Souza, 180 — Foz do Iguaçu, PR</span>
            </span>
            <a href="tel:+554535237841">
              <svg viewBox="0 0 24 24" aria-hidden><path d="M6.6 10.8a15.5 15.5 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.5.6.6 0 1 .5 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.5-1 1-1h3.5c.6 0 1 .5 1 1 0 1.2.2 2.4.6 3.5.1.4 0 .8-.3 1l-2.2 2.3Z" /></svg>
              <span>+55 45 3523-7841</span>
            </a>
            <a href="mailto:reservas@pousadacataratas.com.br">
              <svg viewBox="0 0 24 24" aria-hidden><path d="M3 6.5C3 5.7 3.7 5 4.5 5h15c.8 0 1.5.7 1.5 1.5v11c0 .8-.7 1.5-1.5 1.5h-15A1.5 1.5 0 0 1 3 17.5v-11Zm2.2.5 6.8 5 6.8-5H5.2Z" /></svg>
              <span>reservas@pousadacataratas.com.br</span>
            </a>
          </div>
        </div>
      </div>
      <div
        className="pch-bar"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "18px",
          height: "70px",
          padding: "0 20px",
          maxWidth: "1760px",
          margin: "0 auto",
        }}
      >
        <a
          href={localePath(routeLang, "/")}
          className="pch-pousada"
          style={{ textDecoration: "none", lineHeight: 1, flex: "none", display: "block" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/pousada-logo.webp"
            alt={dict.header.pousadaLogoAlt}
            style={{ height: "38px", width: "auto", display: "block" }}
          />
        </a>

        <nav
          className="pch-nav"
          style={{
            display: "none",
            alignItems: "center",
            gap: 0,
            marginLeft: "auto",
            padding: 0,
          }}
        >
          {links.map((item) => (
            <a
              key={item.key}
              href={localePath(routeLang, item.href)}
              style={{ color: item.key === active ? "#FFFFFF" : "rgba(255,255,255,.72)" }}
            >
              {(dict.nav as Record<string, string>)[item.key]}
            </a>
          ))}
        </nav>

        <div
          className="pch-mobile"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "7px",
            flex: "none",
            marginLeft: "auto",
          }}
        >
          <a
            href={reserveHref}
            className="pch-reserve-m"
            style={{
              display: "inline-flex",
              alignItems: "center",
              padding: "11px 16px",
              background: "transparent",
              border: "1px solid rgba(255,255,255,.5)",
              color: "#FFFFFF",
              textDecoration: "none",
              fontSize: "11px",
              letterSpacing: ".14em",
              textTransform: "uppercase",
              whiteSpace: "nowrap",
              transition: "background .15s,color .15s,border-color .15s",
            }}
          >
            {dict.header.reservar}
          </a>
          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={dict.header.ariaMenu}
            className="pch-menu-btn"
            style={{
              width: "40px",
              height: "40px",
              border: "1px solid rgba(255,255,255,.5)",
              background: "transparent",
              display: "inline-flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "5px",
              cursor: "pointer",
              flex: "none",
              transition: "background .15s",
            }}
          >
            <span style={{ width: "17px", height: "2px", background: "#FFFFFF", display: "block" }} />
            <span style={{ width: "17px", height: "2px", background: "#FFFFFF", display: "block" }} />
          </button>
        </div>

        <div
          className="pch-desktop"
          style={{ display: "none", alignItems: "center", gap: "18px", flex: "none" }}
        >
          <div style={{ position: "relative" }}>
            <button
              onClick={() => setLangOpen((v) => !v)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "6px 2px",
                borderRadius: 0,
                background: "transparent",
                border: "none",
                color: "rgba(255,255,255,.72)",
                fontSize: "12px",
                letterSpacing: ".1em",
                cursor: "pointer",
                fontFamily: "inherit",
              }}
            >
              {current}
              <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                <path
                  d="M2.5 4.5 6 8l3.5-3.5"
                  stroke="#FFFFFF"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            {langOpen && (
              <div
                style={{
                  position: "absolute",
                  top: "calc(100% + 12px)",
                  right: 0,
                  background: "#FFFFFF",
                  border: "1px solid rgba(20,39,51,.12)",
                  boxShadow: "0 14px 34px rgba(20,39,51,.16)",
                  padding: "5px",
                  minWidth: "118px",
                  zIndex: 80,
                }}
              >
                {langItems.map((code) => (
                  <button
                    key={code}
                    onClick={() => switchLocale(code)}
                    style={langItemStyle(code)}
                  >
                    {code.toUpperCase()}
                  </button>
                ))}
              </div>
            )}
          </div>
          <a
            href={reserveHref}
            className="pch-reserve-d"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "12px 26px",
              borderRadius: 0,
              background: "transparent",
              border: "1px solid rgba(255,255,255,.5)",
              color: "#FFFFFF",
              textDecoration: "none",
              fontSize: "12px",
              letterSpacing: ".14em",
              textTransform: "uppercase",
              whiteSpace: "nowrap",
              transition: "background .15s,color .15s,border-color .15s",
            }}
          >
            {dict.header.reservar}
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none" style={{ marginLeft: "9px" }}>
              <path
                d="M3.5 10.5 10.5 3.5M10.5 3.5H5M10.5 3.5V9"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>
      </div>

      {menuOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 100,
            background: "#FFFFFF",
            overflowY: "auto",
            color: "#1B2733",
          }}
        >
          <div
            style={{
              maxWidth: "480px",
              margin: "0 auto",
              padding: "20px 22px 40px",
              minHeight: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/pousada-logo-preto.webp"
                  alt={dict.header.pousadaLogoAlt}
                  style={{ height: "40px", width: "auto", display: "block" }}
                />
                <span aria-hidden style={{ width: "1px", height: "26px", background: "rgba(20,33,51,.16)" }} />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/meritum-hoteis-logo.webp"
                  alt="Méritum Hotéis — grupo do qual a Pousada Cataratas faz parte"
                  title="Um hotel do grupo Méritum Hotéis"
                  style={{ height: "34px", width: "auto", display: "block" }}
                />
              </div>
              <button
                onClick={() => setMenuOpen(false)}
                aria-label={dict.header.ariaFechar}
                style={{
                  width: "42px",
                  height: "42px",
                  border: "1px solid rgba(31,30,27,.16)",
                  background: "#fff",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 3l10 10M13 3 3 13" stroke="#1E90C8" strokeWidth="1.7" strokeLinecap="round" />
                </svg>
              </button>
            </div>
            <nav style={{ marginTop: "30px", display: "flex", flexDirection: "column" }}>
              {links.map((item) => (
                <a
                  key={item.key}
                  href={localePath(routeLang, item.href)}
                  style={{
                    fontFamily: "var(--font-gilda), Georgia, serif",
                    fontWeight: 500,
                    fontSize: "30px",
                    letterSpacing: "-.01em",
                    color: item.key === active ? "#143C7A" : "#1B2733",
                    textDecoration: "none",
                    padding: "15px 0",
                    borderBottom: "1px solid rgba(31,30,27,.08)",
                  }}
                >
                  {(dict.nav as Record<string, string>)[item.key]}
                </a>
              ))}
            </nav>
            <div style={{ marginTop: "30px", display: "flex", flexDirection: "column", gap: "14px" }}>
              <a
                href={reserveHref}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "17px 22px",
                  background: "#143C7A",
                  color: "#FFFFFF",
                  textDecoration: "none",
                  fontSize: "12px",
                  letterSpacing: ".14em",
                  textTransform: "uppercase",
                }}
              >
                {dict.header.reservarDireto}
                <svg width="16" height="16" viewBox="0 0 14 14" fill="none">
                  <path
                    d="M3.5 10.5 10.5 3.5M10.5 3.5H5M10.5 3.5V9"
                    stroke="#FFFFFF"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
              <a
                href={waHref}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "17px 22px",
                  background: "transparent",
                  border: "1px solid rgba(31,30,27,.18)",
                  color: "#1B2733",
                  textDecoration: "none",
                  fontSize: "12px",
                  letterSpacing: ".14em",
                  textTransform: "uppercase",
                }}
              >
                {dict.header.falarWhatsapp}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#143C7A">
                  <path d={WA_PATH} />
                </svg>
              </a>
            </div>
            <div style={{ marginTop: "auto", paddingTop: "32px" }}>
              <div style={{ position: "relative", display: "inline-block" }}>
                <button
                  onClick={() => setLangOpen((v) => !v)}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "7px",
                    padding: "10px 18px",
                    background: "transparent",
                    border: "1px solid rgba(31,30,27,.18)",
                    color: "#1B2733",
                    fontSize: "12px",
                    letterSpacing: ".1em",
                    cursor: "pointer",
                    fontFamily: "inherit",
                  }}
                >
                  {current}
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path
                      d="M2.5 4.5 6 8l3.5-3.5"
                      stroke="#1B2733"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                {langOpen && (
                  <div
                    style={{
                      position: "absolute",
                      bottom: "calc(100% + 8px)",
                      left: 0,
                      background: "#FFFFFF",
                      border: "1px solid rgba(20,39,51,.12)",
                      boxShadow: "0 14px 34px rgba(20,39,51,.16)",
                      padding: "5px",
                      minWidth: "140px",
                      zIndex: 80,
                    }}
                  >
                    {langItems.map((code) => (
                      <button
                        key={code}
                        onClick={() => switchLocale(code)}
                        style={langItemStyle(code)}
                      >
                        {code.toUpperCase()}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
