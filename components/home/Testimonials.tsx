"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import type { Testimonial } from "@/lib/data";
import { useDict } from "@/components/i18n/LocaleProvider";

const dotBase: CSSProperties = {
  width: "9px",
  height: "9px",
  borderRadius: "99px",
  border: "none",
  padding: 0,
  cursor: "pointer",
  transition: "all .25s",
  background: "#D5DBE2",
};
const dotOn: CSSProperties = {
  width: "11px",
  height: "11px",
  borderRadius: "99px",
  border: "none",
  padding: 0,
  cursor: "pointer",
  transition: "all .25s",
  background: "#C79A6A",
};

export default function Testimonials({ data }: { data: Testimonial[] }) {
  const dict = useDict();
  const TESTI = data;
  const n = TESTI.length;
  const [revIdx, setRevIdx] = useState(0);
  const revDir = useRef(1);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const tgridRef = useRef<HTMLDivElement>(null);
  const firstRender = useRef(true);

  const startRevAuto = () => {
    if (!timer.current)
      timer.current = setInterval(() => {
        revDir.current = 1;
        setRevIdx((i) => (i + 1) % n);
      }, 5000);
  };
  const stopRevAuto = () => {
    if (timer.current) {
      clearInterval(timer.current);
      timer.current = null;
    }
  };
  useEffect(() => stopRevAuto, []);

  // animateRev — mismo efecto de slide + escala de la card central al cambiar revIdx.
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    const g = tgridRef.current;
    if (!g) return;
    const dir = revDir.current || 1;
    g.animate(
      [
        { transform: "translateX(" + dir * 30 + "px)", opacity: 0.5 },
        { transform: "translateX(0)", opacity: 1 },
      ],
      { duration: 460, easing: "cubic-bezier(.4,0,.2,1)" },
    );
    const mc = g.querySelector<HTMLElement>(".pc-tcard-main");
    if (mc)
      mc.animate([{ transform: "scale(.985)" }, { transform: "scale(1.02)" }], {
        duration: 460,
        easing: "cubic-bezier(.4,0,.2,1)",
      });
  }, [revIdx]);

  const revCenter = TESTI[revIdx];
  const revLeft = TESTI[(revIdx - 1 + n) % n];
  const revRight = TESTI[(revIdx + 1) % n];

  const revPrev = () => {
    revDir.current = -1;
    setRevIdx((i) => (i - 1 + n) % n);
  };
  const revNext = () => {
    revDir.current = 1;
    setRevIdx((i) => (i + 1) % n);
  };

  return (
    <section style={{ padding: "72px 20px 40px", background: "#FFFFFF" }}>
      <div style={{ textAlign: "center", maxWidth: "760px", margin: "0 auto" }}>
        <div style={{ fontSize: "12px", letterSpacing: ".28em", textTransform: "uppercase", color: "#8A97A6" }}>
          {dict.testimonials.eyebrow}
        </div>
        <h2
          style={{
            fontFamily: "var(--font-gilda), Georgia, serif",
            fontWeight: 600,
            fontSize: "56px",
            lineHeight: 1,
            color: "#143C7A",
            margin: "12px 0 0",
          }}
        >
          {dict.testimonials.titulo}
        </h2>
      </div>

      <div
        style={{ position: "relative", maxWidth: "1180px", margin: "48px auto 0", padding: "0 64px" }}
        onMouseEnter={stopRevAuto}
        onMouseLeave={startRevAuto}
      >
        <button onClick={revPrev} className="pc-tnav" aria-label={dict.testimonials.anterior} style={{ left: 0 }}>
          <svg width="16" height="16" viewBox="0 0 14 14" fill="none">
            <path d="M9 2 4 7l5 5" stroke="#143C7A" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button onClick={revNext} className="pc-tnav" aria-label={dict.testimonials.proximo} style={{ right: 0 }}>
          <svg width="16" height="16" viewBox="0 0 14 14" fill="none">
            <path d="M5 2l5 5-5 5" stroke="#143C7A" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <div className="pc-tgrid" ref={tgridRef}>
          <div className="pc-tcard pc-tcard-side">
            <div className="pc-tquote">“</div>
            <p style={{ fontSize: "14px", lineHeight: 1.7, color: "#5C6B7A", margin: "16px 0 0" }}>{revLeft.text}</p>
            <div style={{ fontSize: "15px", fontWeight: 600, color: "#1B2733", marginTop: "22px" }}>{revLeft.name}</div>
          </div>
          <div className="pc-tcard pc-tcard-main">
            <div className="pc-tquote">“</div>
            <p style={{ fontSize: "16px", lineHeight: 1.72, color: "#2C3A47", margin: "18px 0 0" }}>{revCenter.text}</p>
            <div style={{ height: "1px", background: "rgba(20,33,51,.1)", margin: "26px 0 0" }} />
            <div style={{ fontSize: "16px", fontWeight: 700, color: "#1B2733", marginTop: "22px" }}>{revCenter.name}</div>
          </div>
          <div className="pc-tcard pc-tcard-side">
            <div className="pc-tquote">“</div>
            <p style={{ fontSize: "14px", lineHeight: 1.7, color: "#5C6B7A", margin: "16px 0 0" }}>{revRight.text}</p>
            <div style={{ fontSize: "15px", fontWeight: 600, color: "#1B2733", marginTop: "22px" }}>{revRight.name}</div>
          </div>
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "9px", marginTop: "30px" }}>
        {TESTI.map((_, k) => (
          <button
            key={k}
            onClick={() => {
              revDir.current = k >= revIdx ? 1 : -1;
              setRevIdx(k);
            }}
            aria-label={dict.testimonials.irAoDepoimento}
            style={k === revIdx ? dotOn : dotBase}
          />
        ))}
      </div>
    </section>
  );
}
