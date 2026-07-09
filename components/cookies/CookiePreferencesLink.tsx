"use client";

import { openCookiePreferences } from "@/lib/consent";

// Enlace/botón que reabre el panel de preferencias de cookies (para el footer).
// Recibe la etiqueta ya localizada; usa la misma clase visual que los enlaces
// del footer (.pcf-link) para no cambiar el diseño.
export default function CookiePreferencesLink({ label }: { label: string }) {
  return (
    <button
      type="button"
      className="pcf-link"
      onClick={openCookiePreferences}
      style={{
        background: "transparent",
        border: "none",
        padding: 0,
        cursor: "pointer",
        font: "inherit",
        fontSize: "13px",
        color: "#9AA3AD",
      }}
    >
      {label}
    </button>
  );
}
