"use client";

import { useState, type CSSProperties } from "react";
import { useDict } from "@/components/i18n/LocaleProvider";
import { format } from "@/i18n/format";

type Photo = { src: string; alt: string };

const arrowBase: CSSProperties = {
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  width: "46px",
  height: "46px",
  borderRadius: "50%",
  border: "none",
  cursor: "pointer",
  background: "rgba(9,22,46,.5)",
  color: "#FFFFFF",
  fontSize: "26px",
  lineHeight: 1,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 3,
};

export default function RoomCarousel({ photos }: { photos: Photo[] }) {
  const [i, setI] = useState(0);
  const dict = useDict();
  const n = photos.length;
  const go = (d: number) => setI((p) => (p + d + n) % n);

  return (
    <div style={{ position: "relative", height: "600px", overflow: "hidden", background: "#143C7A" }}>
      {photos.map((p, idx) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={idx}
          src={p.src}
          alt={p.alt}
          loading={idx === 0 ? "eager" : "lazy"}
          decoding="async"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: idx === i ? 1 : 0,
            transition: "opacity .45s ease",
          }}
        />
      ))}

      <button aria-label={dict.carousel.fotoAnterior} onClick={() => go(-1)} style={{ ...arrowBase, left: "16px" }}>
        &#8249;
      </button>
      <button aria-label={dict.carousel.proximaFoto} onClick={() => go(1)} style={{ ...arrowBase, right: "16px" }}>
        &#8250;
      </button>

      <div
        style={{
          position: "absolute",
          top: "16px",
          right: "16px",
          padding: "6px 12px",
          background: "rgba(9,22,46,.55)",
          color: "#FFFFFF",
          fontSize: "12px",
          letterSpacing: ".08em",
          borderRadius: "999px",
          zIndex: 3,
        }}
      >
        {i + 1} / {n}
      </div>

      <div style={{ position: "absolute", left: 0, right: 0, bottom: "18px", display: "flex", justifyContent: "center", gap: "8px", zIndex: 3 }}>
        {photos.map((_, idx) => (
          <button
            key={idx}
            aria-label={format(dict.carousel.irParaFoto, { n: idx + 1 })}
            onClick={() => setI(idx)}
            style={{
              width: idx === i ? "22px" : "8px",
              height: "8px",
              borderRadius: "999px",
              border: "none",
              cursor: "pointer",
              padding: 0,
              background: idx === i ? "#C79A6A" : "rgba(255,255,255,.6)",
              transition: "width .2s ease, background .2s ease",
            }}
          />
        ))}
      </div>
    </div>
  );
}
