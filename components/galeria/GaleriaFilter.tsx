"use client";

import { useState } from "react";
import type { GaleriaShot, GaleriaTab } from "@/lib/data";

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
  const [lightbox, setLightbox] = useState<{ img: string; alt: string } | null>(null);

  const visibleShots = cat === "todos" ? galeriaShots : galeriaShots.filter((s) => s.cat === cat);

  return (
    <>
      <div className="gf-tabs">
        {galeriaTabs.map((t) => (
          <button
            key={t.id}
            type="button"
            className="gf-tab"
            data-on={cat === t.id ? "1" : "0"}
            onClick={() => setCat(t.id)}
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
