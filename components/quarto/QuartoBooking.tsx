"use client";

import { useState, type CSSProperties } from "react";
import { useDict } from "@/components/i18n/LocaleProvider";

// Calendario/hóspedes/noites portado 1:1 del script de Quarto.dc.html.
// Los nombres de meses (MES/MESES) ahora vienen del diccionario (i18n).
const pad = (x: number) => String(x).padStart(2, "0");
const iso = (d: Date) => d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate());
const addDay = (isoStr: string, n: number) => {
  const a = isoStr.split("-").map(Number);
  const d = new Date(a[0], a[1] - 1, a[2] + n);
  return iso(d);
};

const cellBase: CSSProperties = {
  height: "34px",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "13px",
  border: "none",
  background: "transparent",
  fontFamily: "inherit",
  color: "#1B2733",
};

type Which = "checkin" | "checkout";

export default function QuartoBooking() {
  // Estado inicial: hoje / hoje+1 (igual que o export).
  const [checkin, setCheckin] = useState(() => iso(new Date()));
  const [checkout, setCheckout] = useState(() => iso(new Date(Date.now() + 86400000)));
  const [guests, setGuests] = useState(2);
  const [pickerOpen, setPickerOpen] = useState<Which | null>(null);
  const [pk, setPk] = useState(() => {
    const t = new Date();
    return { y: t.getFullYear(), m: t.getMonth() };
  });
  const dict = useDict();
  const MES = dict.booking.mesShort;
  const MESES = dict.booking.mesLong;

  const ci = checkin.split("-");
  const co = checkout.split("-");
  const ciDay = String(+ci[2]);
  const ciMon = MES[+ci[1] - 1];
  const coDay = String(+co[2]);
  const coMon = MES[+co[1] - 1];

  const t = new Date();
  const today = t.getFullYear() + "-" + pad(t.getMonth() + 1) + "-" + pad(t.getDate());
  const checkoutMin = addDay(checkin, 1);
  const nights = Math.max(1, Math.round((+new Date(checkout) - +new Date(checkin)) / 86400000));

  const openCal = (which: Which) => {
    const a = (which === "checkin" ? checkin : checkout).split("-").map(Number);
    setPk({ y: a[0], m: a[1] - 1 });
    setPickerOpen(which);
  };
  const pickDay = (isoStr: string) => {
    if (pickerOpen === "checkin") {
      setCheckin(isoStr);
      setCheckout((c) => (c <= isoStr ? addDay(isoStr, 1) : c));
      setPickerOpen(null);
    } else {
      setCheckout(isoStr);
      setPickerOpen(null);
    }
  };
  const prevMonth = () => setPk(({ y, m }) => (m - 1 < 0 ? { y: y - 1, m: 11 } : { y, m: m - 1 }));
  const nextMonth = () => setPk(({ y, m }) => (m + 1 > 11 ? { y: y + 1, m: 0 } : { y, m: m + 1 }));

  const incGuests = () => setGuests((g) => Math.min(12, g + 1));
  const decGuests = () => setGuests((g) => Math.max(1, g - 1));
  const onGuests = (e: React.ChangeEvent<HTMLInputElement>) => {
    const n = parseInt(String(e.target.value).replace(/[^0-9]/g, ""), 10);
    setGuests(isNaN(n) ? 1 : Math.max(1, Math.min(12, n)));
  };

  let cal: { label: string; cells: { key: string; label: string; style: CSSProperties; onClick: () => void }[] } | null =
    null;
  if (pickerOpen) {
    const y = pk.y;
    const m = pk.m;
    const minIso = pickerOpen === "checkin" ? today : checkoutMin;
    const selIso = pickerOpen === "checkin" ? checkin : checkout;
    const lead = new Date(y, m, 1).getDay();
    const ndays = new Date(y, m + 1, 0).getDate();
    const cells: { key: string; label: string; style: CSSProperties; onClick: () => void }[] = [];
    for (let i = 0; i < lead; i++)
      cells.push({ key: "b" + i, label: "", style: { ...cellBase, visibility: "hidden" }, onClick: () => {} });
    for (let d = 1; d <= ndays; d++) {
      const isoStr = y + "-" + pad(m + 1) + "-" + pad(d);
      const disabled = isoStr < minIso;
      const sel = isoStr === selIso;
      let st: CSSProperties = { ...cellBase, cursor: "pointer" };
      if (disabled) st = { ...cellBase, color: "#C7D2DD", cursor: "default" };
      else if (sel) st = { ...cellBase, cursor: "pointer", background: "#143C7A", color: "#FFFFFF" };
      cells.push({ key: isoStr, label: String(d), style: st, onClick: disabled ? () => {} : () => pickDay(isoStr) });
    }
    cal = { label: MESES[m] + " " + y, cells };
  }

  const calHead = (
    <>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px" }}>
        <button onClick={prevMonth} aria-label={dict.booking.mesAnterior} style={{ border: "none", background: "transparent", cursor: "pointer", padding: "4px 8px", fontSize: "18px", color: "#143C7A", lineHeight: 1 }}>‹</button>
        <span style={{ fontSize: "13px", letterSpacing: ".04em", color: "#143C7A" }}>{cal?.label}</span>
        <button onClick={nextMonth} aria-label={dict.booking.proximoMes} style={{ border: "none", background: "transparent", cursor: "pointer", padding: "4px 8px", fontSize: "18px", color: "#143C7A", lineHeight: 1 }}>›</button>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", marginBottom: "6px" }}>
        <span style={{ fontSize: "10px", letterSpacing: ".04em", color: "#8A97A6" }}>{dict.booking.weekdays[0]}</span>
        <span style={{ fontSize: "10px", color: "#8A97A6" }}>{dict.booking.weekdays[1]}</span>
        <span style={{ fontSize: "10px", color: "#8A97A6" }}>{dict.booking.weekdays[2]}</span>
        <span style={{ fontSize: "10px", color: "#8A97A6" }}>{dict.booking.weekdays[3]}</span>
        <span style={{ fontSize: "10px", color: "#8A97A6" }}>{dict.booking.weekdays[4]}</span>
        <span style={{ fontSize: "10px", color: "#8A97A6" }}>{dict.booking.weekdays[5]}</span>
        <span style={{ fontSize: "10px", color: "#8A97A6" }}>{dict.booking.weekdays[6]}</span>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: "1px" }}>
        {cal?.cells.map((c) => (
          <button key={c.key} onClick={c.onClick} style={c.style}>{c.label}</button>
        ))}
      </div>
    </>
  );

  const chevron = (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
      <path d="M4 6l4 4 4-4" stroke="#8A97A6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );

  return (
    <div className="qbk">
      {/* ENTRADA */}
      <div className="qbk-col" style={{ borderRight: "1px solid rgba(31,30,27,.12)", borderBottom: "1px solid rgba(31,30,27,.12)" }}>
        <label className="qbk-lab">{dict.booking.entrada}</label>
        <div className="qbk-field" onClick={() => openCal("checkin")} style={{ cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "9px" }}>
          <span className="qbk-val" suppressHydrationWarning>{ciDay}</span>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "5px" }}>
            <span className="qbk-mon" suppressHydrationWarning>{ciMon}</span>
            {chevron}
          </div>
        </div>
        {pickerOpen === "checkin" && cal && (
          <>
            <div onClick={() => setPickerOpen(null)} style={{ position: "fixed", inset: 0, zIndex: 55 }} />
            <div style={{ position: "absolute", top: "calc(100% + 6px)", left: 0, zIndex: 60, background: "#FFFFFF", boxShadow: "0 18px 44px rgba(20,39,51,.24)", border: "1px solid rgba(31,30,27,.08)", padding: "14px", width: "288px", textAlign: "center" }}>
              {calHead}
            </div>
          </>
        )}
      </div>

      {/* SAÍDA */}
      <div className="qbk-col" style={{ borderBottom: "1px solid rgba(31,30,27,.12)" }}>
        <label className="qbk-lab">{dict.booking.saida}</label>
        <div className="qbk-field" onClick={() => openCal("checkout")} style={{ cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "9px" }}>
          <span className="qbk-val" suppressHydrationWarning>{coDay}</span>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "5px" }}>
            <span className="qbk-mon" suppressHydrationWarning>{coMon}</span>
            {chevron}
          </div>
        </div>
        {pickerOpen === "checkout" && cal && (
          <>
            <div onClick={() => setPickerOpen(null)} style={{ position: "fixed", inset: 0, zIndex: 55 }} />
            <div style={{ position: "absolute", top: "calc(100% + 6px)", right: 0, zIndex: 60, background: "#FFFFFF", boxShadow: "0 18px 44px rgba(20,39,51,.24)", border: "1px solid rgba(31,30,27,.08)", padding: "14px", width: "288px", textAlign: "center" }}>
              {calHead}
            </div>
          </>
        )}
      </div>

      {/* HÓSPEDES */}
      <div className="qbk-col" style={{ borderRight: "1px solid rgba(31,30,27,.12)" }}>
        <label className="qbk-lab">{dict.booking.hospedes}</label>
        <div className="qbk-field" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }}>
          <input type="text" inputMode="numeric" value={guests} onChange={onGuests} aria-label={dict.booking.hospedes} className="qbk-val" style={{ width: "50px", textAlign: "center", background: "transparent", border: "none", outline: "none", padding: 0, MozAppearance: "textfield" }} />
          <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
            <button onClick={incGuests} aria-label={dict.booking.mais} style={{ border: "none", background: "transparent", cursor: "pointer", padding: "2px", lineHeight: 0 }}>
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M4 10l4-4 4 4" stroke="#1B2733" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
            <button onClick={decGuests} aria-label={dict.booking.menos} style={{ border: "none", background: "transparent", cursor: "pointer", padding: "2px", lineHeight: 0 }}>
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M4 6l4 4 4-4" stroke="#1B2733" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
          </div>
        </div>
      </div>

      {/* NOITES */}
      <div className="qbk-col">
        <label className="qbk-lab">{dict.booking.noites}</label>
        <div className="qbk-field">
          <span className="qbk-val" suppressHydrationWarning>{nights}</span>
        </div>
      </div>

      <a href="#" className="qbk-cta">{dict.booking.reservar}</a>
    </div>
  );
}
