"use client";

import { useDict, useLocale } from "@/components/i18n/LocaleProvider";
import { format } from "@/i18n/format";
import { TRIPADVISOR, formatRating, ratingPercent } from "@/lib/tripadvisor";

// Coronita de laurel dibujada a medida (nada de logos de terceros): tallo curvo
// + hojas colocadas a lo largo, y la rama derecha es la izquierda espejada.
// Las hojas son elipses rotadas; ajustar el array cambia la forma del laurel.
const LEAVES: { x: number; y: number; r: number }[] = [
  { x: 36.9, y: 93.9, r: 205 },
  { x: 30.3, y: 80.7, r: 216 },
  { x: 27.3, y: 65.2, r: 228 },
  { x: 28.0, y: 48.3, r: 242 },
  { x: 31.4, y: 33.2, r: 258 },
];

function LaurelBranch() {
  // translate(-16,0): abre la corona para que "Nº 1" respire dentro sin rozar las hojas.
  return (
    <g transform="translate(-16,0)">
      <path d="M44,102 C26,86 22,56 34,26" fill="none" stroke="#C79A6A" strokeWidth="1.6" strokeLinecap="round" />
      {LEAVES.map((l, i) => (
        <ellipse key={i} cx="0" cy="0" rx="6.8" ry="2.9" fill="#C79A6A" transform={`translate(${l.x},${l.y}) rotate(${l.r})`} />
      ))}
    </g>
  );
}

/** Corona de laurel dibujada a medida — enmarca la posición del ranking. */
function Laurel() {
  return (
    <svg className="pc-rec-laurel" viewBox="0 0 120 120" aria-hidden="true">
      <LaurelBranch />
      {/* rama derecha = espejo horizontal de la izquierda */}
      <g transform="translate(120,0) scale(-1,1)">
        <LaurelBranch />
      </g>
    </svg>
  );
}

const Star = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 2.6l2.9 5.9 6.5.95-4.7 4.58 1.11 6.47L12 17.44l-5.81 3.06 1.11-6.47-4.7-4.58 6.5-.95L12 2.6z" fill="currentColor" />
  </svg>
);

/**
 * Estrellas parciales sin trucos de id: dos filas idénticas superpuestas — la de
 * abajo apagada, la dorada encima recortada al porcentaje de la nota (4,5 → 90%).
 */
function Stars({ percent, label }: { percent: number; label: string }) {
  const row = (
    <>
      <Star />
      <Star />
      <Star />
      <Star />
      <Star />
    </>
  );
  return (
    <span className="pc-rec-stars" role="img" aria-label={label}>
      <span className="pc-rec-stars-bg" aria-hidden="true">{row}</span>
      <span className="pc-rec-stars-fg" style={{ width: `${percent}%` }} aria-hidden="true">{row}</span>
    </span>
  );
}

/**
 * Franja de reconocimiento de la Home: fondo azul de marca a todo el ancho (mismo
 * registro que la franja de contacto y el footer), con todo centrado — sobretítulo,
 * titular y una única pieza: el sello PROPIO en dorado/claro, en horizontal
 * (emblema de laurel | separador | posición, nota y reseñas).
 *
 * NO reproduce la marca de TripAdvisor: solo la cita como fuente en texto y enlaza
 * a la ficha. El widget oficial vive en el pie (components/TripAdvisorBadge.tsx).
 *
 * Todas las cifras salen de lib/tripadvisor.ts y los textos del diccionario.
 */
export default function Reconhecimento() {
  const lang = useLocale();
  const t = useDict().reconhecimento;
  const vars = {
    rank: TRIPADVISOR.rank,
    total: TRIPADVISOR.totalPousadas,
    reviews: TRIPADVISOR.reviews,
    rating: formatRating(lang),
  };

  return (
    <section id="reconhecimento" className="pc-rec" aria-labelledby="pc-rec-title">
      <div className="pc-rec-inner">
        <header className="pc-rec-head">
          <div className="pc-rec-eyebrow">{t.eyebrow}</div>
          <div className="pc-rec-rule" />
          <h2 className="pc-rec-h" id="pc-rec-title">{t.titulo}</h2>
          <p className="pc-rec-intro">{format(t.intro, vars)}</p>
        </header>

        {/* Sello propio: emblema | separador | posición, nota y reseñas */}
        <div className="pc-rec-selo">
          <div className="pc-rec-emblema">
            <Laurel />
            <span className="pc-rec-emblema-txt">{format(t.rankKicker, vars)}</span>
          </div>

          {/* separador vertical: divide sin sumar altura */}
          <div className="pc-rec-sep" />

          <div className="pc-rec-selo-info">
            <div className="pc-rec-rank">{format(t.rankDesc, vars)}</div>
            <div className="pc-rec-nota">
              <Stars percent={ratingPercent()} label={format(t.estrelasAria, vars)} />
              <span className="pc-rec-nota-num">{vars.rating}</span>
            </div>
            <div className="pc-rec-meta">
              {format(t.avaliacoes, vars)} · {t.fonte}
            </div>
          </div>
        </div>

        <p className="pc-rec-cat">{t.categoriaNota}</p>

        <a className="pc-rec-link" href={TRIPADVISOR.reviewUrl} target="_blank" rel="noopener noreferrer">
          {t.verTudo}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M5 12h13M12 6l6 6-6 6" />
          </svg>
        </a>
      </div>
    </section>
  );
}
