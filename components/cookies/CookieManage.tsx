"use client";

import { useEffect, useState } from "react";
import "./cookie-consent.css";
import { useDict } from "@/components/i18n/LocaleProvider";
import { applyConsentChoice, readConsentCookie } from "@/lib/consent";

// Sección "Gerenciar cookies" de la Política de Privacidade (opt-out).
// Permite RECHAZAR las cookies no esenciales (envía consent 'update' a 'denied'
// y lo guarda en la cookie de dominio) o volver a PERMITIRLAS.
export default function CookieManage() {
  const c = useDict().cookies;
  const [state, setState] = useState<"granted" | "denied" | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setState(readConsentCookie());
  }, []);

  const choose = (allow: boolean) => {
    applyConsentChoice(allow);
    setState(allow ? "granted" : "denied");
    setSaved(true);
  };

  return (
    <div className="pp-sec" id="gerenciar-cookies" style={{ scrollMarginTop: "120px" }}>
      <h2>{c.manageTitle}</h2>
      <p>{c.manageIntro}</p>
      <p style={{ fontWeight: 600, color: "#1B2733" }}>
        {state === "denied" ? c.manageStatusDenied : c.manageStatusAllowed}
      </p>
      <div className="pc-cc-btns" style={{ maxWidth: "460px" }}>
        <button
          type="button"
          className="pc-cc-btn pc-cc-btn-ghost"
          onClick={() => choose(false)}
        >
          {c.manageDeny}
        </button>
        <button
          type="button"
          className="pc-cc-btn pc-cc-btn-primary"
          onClick={() => choose(true)}
        >
          {c.manageAllow}
        </button>
      </div>
      {saved && (
        <p style={{ color: "#2E7D32", fontSize: "13.5px", marginTop: "10px" }} role="status">
          {c.manageSaved}
        </p>
      )}
    </div>
  );
}
