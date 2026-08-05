"use client";

import { useEffect, useState } from "react";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { BOOKING_BASE } from "@/lib/booking";

// Pop-up promocional de la Home ("hospede-se em agosto e ganhe 2 entradas ao
// Zoopark"). Imagen localizada (pt/es/en), con título/alt SEO semántico. Al
// hacer click lleva al motor de reservas. Se muestra SIEMPRE que se carga la
// Home (primera visita y cada refresh).

const BASE = "/images/real/home/promo-agosto-zoopark-entradas-gratis-pousada-cataratas-foz-do-iguacu";

type Promo = { src: string; alt: string; close: string };

const PROMO: Record<string, Promo> = {
  pt: {
    src: `${BASE}-pt.webp`,
    alt: "Promoção de agosto: hospede-se na Pousada Cataratas em Foz do Iguaçu e ganhe 2 entradas grátis ao Zoopark",
    close: "Fechar",
  },
  es: {
    src: `${BASE}-es.webp`,
    alt: "Promoción de agosto: hospédate en Pousada Cataratas en Foz do Iguaçu y gana 2 entradas gratis al Zoopark",
    close: "Cerrar",
  },
  en: {
    src: `${BASE}-en.webp`,
    alt: "August offer: stay at Pousada Cataratas in Foz do Iguaçu and get 2 free Zoopark tickets",
    close: "Close",
  },
};

export default function PromoPopup() {
  const lang = useLocale();
  const promo = PROMO[lang] ?? PROMO.pt;
  const [open, setOpen] = useState(false);

  // Al entrar/refrescar la Home: mostrar tras un breve retraso, siempre.
  useEffect(() => {
    const t = setTimeout(() => setOpen(true), 700);
    return () => clearTimeout(t);
  }, []);

  const close = () => setOpen(false);

  // Cerrar con Escape.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  if (!open) return null;

  return (
    <div
      onClick={close}
      role="dialog"
      aria-modal="true"
      aria-label={promo.alt}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 200,
        background: "rgba(20,33,51,.55)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{ position: "relative", width: "min(560px, 92vw, 82vh)" }}
      >
        <button
          type="button"
          aria-label={promo.close}
          onClick={close}
          style={{
            position: "absolute",
            top: "-14px",
            right: "-14px",
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            border: "none",
            background: "#143C7A",
            color: "#FFFFFF",
            fontSize: "20px",
            lineHeight: 1,
            cursor: "pointer",
            boxShadow: "0 6px 18px rgba(20,39,51,.35)",
            zIndex: 1,
          }}
        >
          ×
        </button>
        <a
          href={BOOKING_BASE}
          target="_blank"
          rel="noopener noreferrer"
          onClick={close}
          style={{ display: "block" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={promo.src}
            alt={promo.alt}
            title={promo.alt}
            width={1080}
            height={1080}
            style={{
              display: "block",
              width: "100%",
              height: "auto",
              cursor: "pointer",
              filter: "drop-shadow(0 24px 60px rgba(20,39,51,.4))",
            }}
          />
        </a>
      </div>
    </div>
  );
}
