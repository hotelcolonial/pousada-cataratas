"use client";

import { useEffect, useState } from "react";
import "./cookie-consent.css";
import { useDict, useLocale } from "@/components/i18n/LocaleProvider";
import { localePath } from "@/i18n/config";
import {
  applyConsent,
  loadConsent,
  OPEN_PREFERENCES_EVENT,
  type ConsentCategories,
} from "@/lib/consent";

const gilda = "var(--font-gilda), Georgia, serif";

export default function CookieConsent() {
  const dict = useDict();
  const lang = useLocale();
  const c = dict.cookies;

  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false); // banner de primera visita
  const [showPrefs, setShowPrefs] = useState(false); // panel de preferencias
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  // Solo en el cliente: decide si mostrar el banner y escucha aperturas del panel.
  useEffect(() => {
    setMounted(true);
    const stored = loadConsent();
    if (!stored) {
      setVisible(true); // primera visita
    } else {
      setAnalytics(stored.categories.analytics);
      setMarketing(stored.categories.marketing);
    }
    const openPrefs = () => {
      const s = loadConsent();
      setAnalytics(s?.categories.analytics ?? false);
      setMarketing(s?.categories.marketing ?? false);
      setShowPrefs(true);
    };
    window.addEventListener(OPEN_PREFERENCES_EVENT, openPrefs);
    return () => window.removeEventListener(OPEN_PREFERENCES_EVENT, openPrefs);
  }, []);

  // Cerrar el panel con Escape.
  useEffect(() => {
    if (!showPrefs) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowPrefs(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [showPrefs]);

  if (!mounted) return null;
  if (!visible && !showPrefs) return null;

  const finish = (cats: ConsentCategories) => {
    applyConsent(cats);
    setAnalytics(cats.analytics);
    setMarketing(cats.marketing);
    setVisible(false);
    setShowPrefs(false);
  };
  const acceptAll = () => finish({ analytics: true, marketing: true });
  const rejectAll = () => finish({ analytics: false, marketing: false });
  const saveChoice = () => finish({ analytics, marketing });

  const privacyHref = c.privacyPath.startsWith("http")
    ? c.privacyPath
    : localePath(lang, c.privacyPath);
  const [pxBefore, pxAfter] = c.privacyText.split("{link}");
  const privacyLink = (
    <>
      {pxBefore}
      <a
        href={privacyHref}
        style={{ color: "#143C7A", textDecoration: "underline", textUnderlineOffset: "2px" }}
      >
        {c.privacyLinkLabel}
      </a>
      {pxAfter}
    </>
  );

  return (
    <>
      {/* BANNER (primera visita) */}
      {visible && (
        <div
          className="pc-cc-card"
          role="dialog"
          aria-live="polite"
          aria-label={c.bannerTitle}
        >
          <div style={{ fontFamily: gilda, fontSize: "20px", color: "#143C7A", lineHeight: 1.15 }}>
            {c.bannerTitle}
          </div>
          <p style={{ fontSize: "13.5px", lineHeight: 1.6, color: "#5C6B7A", margin: "12px 0 0" }}>
            {c.bannerText}
          </p>
          <p style={{ fontSize: "13px", lineHeight: 1.6, color: "#5C6B7A", margin: "8px 0 0" }}>
            {privacyLink}
          </p>
          <div className="pc-cc-btns">
            <button type="button" className="pc-cc-btn pc-cc-btn-primary" onClick={acceptAll}>
              {c.acceptAll}
            </button>
            <button type="button" className="pc-cc-btn pc-cc-btn-ghost" onClick={rejectAll}>
              {c.rejectAll}
            </button>
          </div>
          <div style={{ marginTop: "8px", textAlign: "center" }}>
            <button type="button" className="pc-cc-btn-link" onClick={() => setShowPrefs(true)}>
              {c.configure}
            </button>
          </div>
        </div>
      )}

      {/* PANEL DE PREFERENCIAS (configurar / enlace del footer) */}
      {showPrefs && (
        <div
          className="pc-cc-overlay"
          onClick={() => setShowPrefs(false)}
          role="dialog"
          aria-modal="true"
          aria-label={c.prefsTitle}
        >
          <div className="pc-cc-panel" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "16px" }}>
              <h2 style={{ fontFamily: gilda, fontWeight: 500, fontSize: "26px", color: "#143C7A", margin: 0, lineHeight: 1.1 }}>
                {c.prefsTitle}
              </h2>
              <button
                type="button"
                aria-label={c.close}
                onClick={() => setShowPrefs(false)}
                style={{ border: "none", background: "transparent", cursor: "pointer", fontSize: "24px", lineHeight: 1, color: "#8A97A6", padding: "2px 4px" }}
              >
                ×
              </button>
            </div>
            <p style={{ fontSize: "14px", lineHeight: 1.6, color: "#5C6B7A", margin: "12px 0 4px" }}>
              {c.prefsIntro}
            </p>
            <p style={{ fontSize: "13px", lineHeight: 1.6, color: "#5C6B7A", margin: "0 0 6px" }}>
              {privacyLink}
            </p>

            {/* Necesarias (siempre activas) */}
            <div className="pc-cc-cat">
              <div>
                <div style={{ fontSize: "15px", color: "#1B2733", fontWeight: 600 }}>{c.necessaryTitle}</div>
                <div style={{ fontSize: "13.5px", lineHeight: 1.55, color: "#7A8694", marginTop: "6px" }}>{c.necessaryDesc}</div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
                <label className="pc-cc-switch">
                  <input type="checkbox" checked disabled readOnly />
                  <span className="pc-cc-slider" />
                </label>
                <span style={{ fontSize: "10px", letterSpacing: ".1em", textTransform: "uppercase", color: "#9AA3AD", whiteSpace: "nowrap" }}>{c.alwaysActive}</span>
              </div>
            </div>

            {/* Analíticas */}
            <div className="pc-cc-cat">
              <div>
                <div style={{ fontSize: "15px", color: "#1B2733", fontWeight: 600 }}>{c.analyticsTitle}</div>
                <div style={{ fontSize: "13.5px", lineHeight: 1.55, color: "#7A8694", marginTop: "6px" }}>{c.analyticsDesc}</div>
              </div>
              <label className="pc-cc-switch">
                <input type="checkbox" checked={analytics} onChange={(e) => setAnalytics(e.target.checked)} aria-label={c.analyticsTitle} />
                <span className="pc-cc-slider" />
              </label>
            </div>

            {/* Marketing */}
            <div className="pc-cc-cat" style={{ borderBottom: "1px solid rgba(31,30,27,.1)" }}>
              <div>
                <div style={{ fontSize: "15px", color: "#1B2733", fontWeight: 600 }}>{c.marketingTitle}</div>
                <div style={{ fontSize: "13.5px", lineHeight: 1.55, color: "#7A8694", marginTop: "6px" }}>{c.marketingDesc}</div>
              </div>
              <label className="pc-cc-switch">
                <input type="checkbox" checked={marketing} onChange={(e) => setMarketing(e.target.checked)} aria-label={c.marketingTitle} />
                <span className="pc-cc-slider" />
              </label>
            </div>

            <div className="pc-cc-btns" style={{ marginTop: "24px" }}>
              <button type="button" className="pc-cc-btn pc-cc-btn-ghost" onClick={rejectAll}>
                {c.rejectAll}
              </button>
              <button type="button" className="pc-cc-btn pc-cc-btn-ghost" onClick={saveChoice}>
                {c.save}
              </button>
              <button type="button" className="pc-cc-btn pc-cc-btn-primary" onClick={acceptAll}>
                {c.acceptAll}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
