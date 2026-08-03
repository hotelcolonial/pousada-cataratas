"use client";

import { useEffect, useState } from "react";
import "./cookie-consent.css";
import { useDict, useLocale } from "@/components/i18n/LocaleProvider";
import { localePath } from "@/i18n/config";
import { acknowledgeConsent, readConsentCookie } from "@/lib/consent";

const gilda = "var(--font-gilda), Georgia, serif";

// Banner informativo (modelo opt-out). Por defecto todo va en 'granted'; este
// banner solo informa y, con "Entendi", se cierra y persiste que ya fue visto
// (cookie de dominio). La gestión/opt-out vive en la Política de Privacidade.
export default function CookieConsent() {
  const dict = useDict();
  const lang = useLocale();
  const c = dict.cookies;

  const [visible, setVisible] = useState(false);

  // Solo en el cliente: mostrar el banner si aún no hay cookie de consentimiento.
  useEffect(() => {
    if (readConsentCookie() === null) setVisible(true);
  }, []);

  if (!visible) return null;

  const accept = () => {
    acknowledgeConsent();
    setVisible(false);
  };

  const privacyHref = c.privacyPath.startsWith("http")
    ? c.privacyPath
    : localePath(lang, c.privacyPath);
  const [pxBefore, pxAfter] = c.privacyText.split("{link}");

  return (
    <div className="pc-cc-card" role="dialog" aria-live="polite" aria-label={c.bannerTitle}>
      <div style={{ fontFamily: gilda, fontSize: "20px", color: "#143C7A", lineHeight: 1.15 }}>
        {c.bannerTitle}
      </div>
      <p style={{ fontSize: "13.5px", lineHeight: 1.6, color: "#5C6B7A", margin: "12px 0 0" }}>
        {c.bannerText}
      </p>
      <p style={{ fontSize: "13px", lineHeight: 1.6, color: "#5C6B7A", margin: "8px 0 0" }}>
        {pxBefore}
        <a
          href={privacyHref}
          style={{ color: "#143C7A", textDecoration: "underline", textUnderlineOffset: "2px" }}
        >
          {c.privacyLinkLabel}
        </a>
        {pxAfter}
      </p>
      <div className="pc-cc-btns">
        <button type="button" className="pc-cc-btn pc-cc-btn-primary" onClick={accept}>
          {c.understood}
        </button>
      </div>
    </div>
  );
}
