import type { BeneficioIcone as Chave } from "@/lib/data";

// Ícones lineares dos benefícios das promoções. Mesmo desenho dos ícones do
// Espaço Kids e da secção "A estrutura": traço fino, sem preenchimento, cantos
// redondos, grelha de 24. A cor vem de fora (currentColor), para o card poder
// pintá-los de dourado (#C79A6A) sem duplicar o SVG.
const DESENHOS: Record<Chave, React.ReactNode> = {
  // Chávena de café com pires
  cafe: (
    <>
      <path d="M4 8h12v5a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5V8z" />
      <path d="M16 9.5h1.8a2.2 2.2 0 0 1 0 4.4H16" />
      <path d="M3 21h14" />
    </>
  ),
  // Ondas de Wi-Fi
  wifi: (
    <>
      <path d="M2.5 9.5a14 14 0 0 1 19 0" />
      <path d="M6 13a9 9 0 0 1 12 0" />
      <path d="M9.5 16.5a4 4 0 0 1 5 0" />
      <path d="M12 20h.01" />
    </>
  ),
  // "P" de estacionamento dentro de um quadrado
  estacionamento: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M9.5 17V7.5h3.2a2.9 2.9 0 0 1 0 5.8H9.5" />
    </>
  ),
  // Ondas de água com guarda-sol
  piscina: (
    <>
      <path d="M2 17c1.6 0 1.6 1.2 3.2 1.2S6.8 17 8.4 17s1.6 1.2 3.2 1.2S13.2 17 14.8 17s1.6 1.2 3.2 1.2S19.6 17 21.2 17" />
      <path d="M2 21c1.6 0 1.6 1.2 3.2 1.2" />
      <path d="M7 14V5" />
      <path d="M3 8a5 5 0 0 1 9 0z" />
    </>
  ),
  // Carrinha de transporte
  transporte: (
    <>
      <path d="M3 16V7a1 1 0 0 1 1-1h9v10" />
      <path d="M13 9h4l4 3.5V16h-2" />
      <path d="M3 16h2M11 16h4" />
      <circle cx="7" cy="17.5" r="1.8" />
      <circle cx="17" cy="17.5" r="1.8" />
    </>
  ),
  // Garfo e faca
  refeicao: (
    <>
      <path d="M6 3v7a2 2 0 0 0 4 0V3" />
      <path d="M8 10v11" />
      <path d="M17 3c-1.5 1.2-2.2 3-2.2 5.2 0 1.6.7 2.6 2.2 2.9V21" />
    </>
  ),
  // Bilhete com picotado
  ingresso: (
    <>
      <path d="M3 8.5A1.5 1.5 0 0 1 4.5 7h15A1.5 1.5 0 0 1 21 8.5v1.9a2 2 0 0 0 0 3.2v1.9a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 15.5v-1.9a2 2 0 0 0 0-3.2z" />
      <path d="M13 8v1.5M13 14.5V16" />
    </>
  ),
  // Etiqueta de desconto com %
  desconto: (
    <>
      <path d="M20.6 12.6 12.6 20.6a2 2 0 0 1-2.8 0l-6.4-6.4a2 2 0 0 1-.6-1.4V4.8a2 2 0 0 1 2-2h8a2 2 0 0 1 1.4.6l6.4 6.4a2 2 0 0 1 0 2.8z" />
      <circle cx="7.8" cy="7.8" r="1.3" />
    </>
  ),
  // Calendário
  calendario: (
    <>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 10h18M8 3v4M16 3v4" />
    </>
  ),
  // Relógio
  relogio: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5.2l3.2 1.9" />
    </>
  ),
  // Documento com linhas
  documento: (
    <>
      <path d="M14 3H6.5A1.5 1.5 0 0 0 5 4.5v15A1.5 1.5 0 0 0 6.5 21h11a1.5 1.5 0 0 0 1.5-1.5V8z" />
      <path d="M14 3v5h5" />
      <path d="M8.5 13h7M8.5 16.5h4.5" />
    </>
  ),
  // Criança / família
  crianca: (
    <>
      <circle cx="12" cy="6.5" r="3" />
      <path d="M7 21v-4.5a5 5 0 0 1 10 0V21" />
      <path d="M9.5 21v-3M14.5 21v-3" />
    </>
  ),
  // Cama
  quarto: (
    <>
      <path d="M3 18V7" />
      <path d="M3 11h13a5 5 0 0 1 5 5v2" />
      <path d="M3 18h18" />
      <circle cx="7.5" cy="8.5" r="1.8" />
    </>
  ),
  // Alfinete de localização
  local: (
    <>
      <path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11z" />
      <circle cx="12" cy="10" r="2.6" />
    </>
  ),
  // Escudo com visto
  cancelamento: (
    <>
      <path d="M12 3l7.5 3v5.5c0 4.6-3.2 8.3-7.5 9.5-4.3-1.2-7.5-4.9-7.5-9.5V6z" />
      <path d="M9 12l2.2 2.2L15.5 10" />
    </>
  ),
};

export default function BeneficioIcone({ nome, size = 28 }: { nome: Chave; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.3}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {DESENHOS[nome]}
    </svg>
  );
}
