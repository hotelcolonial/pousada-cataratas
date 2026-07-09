import type { CSSProperties } from "react";
import type { Dictionary } from "@/i18n/getDictionary";

// Bloque "Localização" (mapa + contato) compartido por todas las páginas.
// Markup idéntico al que estaba inline; solo los textos vienen del diccionario.
// `style` reproduce el margin de cada página (unas usan "64px 0 0", otras 0).
export default function ContatoStrip({ dict, style }: { dict: Dictionary; style?: CSSProperties }) {
  const c = dict.contato;
  return (
    <section id="localizacao" style={style}>
      <div className="pc-mapstrip" style={{ display: "grid", gridTemplateColumns: "1fr" }}>
        <div style={{ position: "relative", minHeight: "300px", background: "#E9F0F6" }}>
          <iframe
            title={c.mapaTitle}
            src="https://www.google.com/maps?cid=9336784945676779755&hl=pt-BR&gl=BR&output=embed"
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0, display: "block" }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
        <div style={{ background: "#143C7A", color: "#FFFFFF", padding: "42px 44px", minWidth: 0, display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <div style={{ width: "54px", height: "54px", borderRadius: "50%", background: "#C79A6A", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="#FFFFFF"><path d="M6.6 10.8a15.5 15.5 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.5.6.6 0 1 .5 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.5-1 1-1h3.5c.6 0 1 .5 1 1 0 1.2.2 2.4.6 3.5.1.4 0 .8-.3 1l-2.2 2.3Z" /></svg>
          </div>
          <h3 style={{ fontFamily: "var(--font-gilda), Georgia, serif", fontWeight: 500, fontSize: "33px", lineHeight: 1.04, color: "#FFFFFF", margin: "22px 0 0" }}>{c.faleConosco}</h3>
          <div style={{ marginTop: "32px" }}>
            <div style={{ fontSize: "12.5px", letterSpacing: ".05em", color: "rgba(255,255,255,.55)" }}>{c.reservasLabel}</div>
            <div style={{ fontSize: "14px", color: "#FFFFFF", marginTop: "8px" }}>+55 45 3523-7841</div>
          </div>
          <div style={{ marginTop: "26px" }}>
            <div style={{ fontSize: "12.5px", letterSpacing: ".05em", color: "rgba(255,255,255,.55)" }}>{c.whatsappLabel}</div>
            <div style={{ fontSize: "14px", color: "#FFFFFF", marginTop: "8px" }}>+55 45 99000-0000</div>
          </div>
        </div>
        <div style={{ background: "#C79A6A", color: "#FFFFFF", padding: "42px 44px", minWidth: 0, display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <div style={{ width: "54px", height: "54px", borderRadius: "50%", background: "#143C7A", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="#FFFFFF"><path d="M3 6.5C3 5.7 3.7 5 4.5 5h15c.8 0 1.5.7 1.5 1.5v11c0 .8-.7 1.5-1.5 1.5h-15A1.5 1.5 0 0 1 3 17.5v-11Zm2.2.5 6.8 5 6.8-5H5.2Z" /></svg>
          </div>
          <h3 style={{ fontFamily: "var(--font-gilda), Georgia, serif", fontWeight: 500, fontSize: "33px", lineHeight: 1.04, color: "#FFFFFF", margin: "22px 0 0" }}>{c.escrevaParaNos}</h3>
          <div style={{ marginTop: "32px" }}>
            <div style={{ fontSize: "12.5px", letterSpacing: ".05em", color: "rgba(255,255,255,.62)" }}>{c.informacoesLabel}</div>
            <div style={{ fontSize: "14px", color: "#FFFFFF", marginTop: "8px", overflowWrap: "anywhere" }}>contato@pousadacataratas.com.br</div>
          </div>
          <div style={{ marginTop: "26px" }}>
            <div style={{ fontSize: "12.5px", letterSpacing: ".05em", color: "rgba(255,255,255,.62)" }}>{c.recepcaoLabel}</div>
            <div style={{ fontSize: "14px", color: "#FFFFFF", marginTop: "8px", overflowWrap: "anywhere" }}>reservas@pousadacataratas.com.br</div>
          </div>
        </div>
      </div>
    </section>
  );
}
