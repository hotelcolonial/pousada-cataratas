"use client";

import { useRef, useState } from "react";
import type { GaleriaShot, GaleriaTab } from "@/lib/data";

// Máximo por página = 4 filas × 4 colunas (layout desktop). O resto vai para as
// páginas seguintes (1, 2, 3…).
const PAGE_SIZE = 16;

// Reemplazo del <image-slot fit="cover"> del export.
function SlotImg({ src, alt = "" }: { src: string; alt?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
    />
  );
}

export default function GaleriaFilter({ shots: galeriaShots, tabs: galeriaTabs }: { shots: GaleriaShot[]; tabs: GaleriaTab[] }) {
  const [cat, setCat] = useState("todos");
  const [page, setPage] = useState(1);
  const [lightbox, setLightbox] = useState<{ img: string; alt: string } | null>(null);
  const topRef = useRef<HTMLDivElement>(null);

  const filtered = cat === "todos" ? galeriaShots : galeriaShots.filter((s) => s.cat === cat);
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const current = Math.min(page, totalPages); // por si cambió el filtro
  const visibleShots = filtered.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE);

  // Cambiar de categoría vuelve a la página 1.
  const selectCat = (id: string) => {
    setCat(id);
    setPage(1);
  };

  // Cambiar de página y subir al inicio de la grilla.
  const goPage = (n: number) => {
    setPage(n);
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const pageBtn = (on: boolean): React.CSSProperties => ({
    minWidth: "38px",
    height: "38px",
    padding: "0 10px",
    border: on ? "1px solid #1E90C8" : "1px solid rgba(31,30,27,.18)",
    background: on ? "#1E90C8" : "transparent",
    color: on ? "#FFFFFF" : "#5C6B7A",
    fontFamily: "inherit",
    fontSize: "13px",
    letterSpacing: ".04em",
    cursor: on ? "default" : "pointer",
    transition: "background .15s ease, color .15s ease, border-color .15s ease",
  });

  return (
    <>
      <div className="gf-tabs" ref={topRef} style={{ scrollMarginTop: "100px" }}>
        {galeriaTabs.map((t) => (
          <button
            key={t.id}
            type="button"
            className="gf-tab"
            data-on={cat === t.id ? "1" : "0"}
            onClick={() => selectCat(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div className="gf-grid">
        {visibleShots.map((s) => (
          <div key={s.id} className="gf-cell" onClick={() => setLightbox({ img: s.img, alt: s.alt })}>
            <SlotImg src={s.img} alt={s.alt} />
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div
          className="gf-pages"
          style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "8px", flexWrap: "wrap", marginTop: "28px" }}
        >
          <button
            type="button"
            aria-label="Anterior"
            onClick={() => current > 1 && goPage(current - 1)}
            disabled={current === 1}
            style={{ ...pageBtn(false), opacity: current === 1 ? 0.4 : 1, cursor: current === 1 ? "default" : "pointer" }}
          >
            ‹
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
            <button
              key={n}
              type="button"
              aria-label={`Página ${n}`}
              aria-current={n === current ? "page" : undefined}
              onClick={() => n !== current && goPage(n)}
              style={pageBtn(n === current)}
            >
              {n}
            </button>
          ))}
          <button
            type="button"
            aria-label="Próxima"
            onClick={() => current < totalPages && goPage(current + 1)}
            disabled={current === totalPages}
            style={{ ...pageBtn(false), opacity: current === totalPages ? 0.4 : 1, cursor: current === totalPages ? "default" : "pointer" }}
          >
            ›
          </button>
        </div>
      )}

      {lightbox && (
        <div className="gf-lb" onClick={() => setLightbox(null)}>
          <button type="button" className="gf-lb-x" onClick={() => setLightbox(null)}>
            ×
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={lightbox.img} alt={lightbox.alt} />
        </div>
      )}
    </>
  );
}
