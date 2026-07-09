import localFont from "next/font/local";
import { Gilda_Display } from "next/font/google";

// Google Fonts — misma familia serif que el <link> del export (Gilda Display).
export const gildaDisplay = Gilda_Display({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-gilda",
  adjustFontFallback: false,
  fallback: ["Georgia", "serif"],
});

// Fuente local Helvetica Neue Cyr — replica el @font-face del export (Light 300 / Roman 400,
// font-display:swap). Los .ttf NO contienen glifos acentuados (á, ã, ç, é, õ…), así que esos
// caracteres los dibuja el fallback. Usamos "Archivo" (declarada como @font-face variable en
// globals.css, con acentos y peso variable 100–900) para que los acentos conserven el MISMO
// peso que el texto base — incluso en los títulos Light (300). Arial queda de respaldo.
// (El export ya listaba 'Archivo' en estos stacks; antes no resolvía por no existir la familia.)
export const helveticaNeueCyr = localFont({
  src: [
    {
      path: "../public/fonts/HelveticaNeueCyr-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/HelveticaNeueCyr-Roman.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-hnc",
  adjustFontFallback: false,
  fallback: ["Archivo", "Helvetica Neue", "Arial", "sans-serif"],
  declarations: [{ prop: "unicode-range", value: "U+0000-00BF" }],
});
