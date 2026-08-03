// Enlace del footer que lleva a la sección "Gerenciar cookies" de la Política de
// Privacidade (donde el visitante puede rechazar/permitir). Usa la misma clase
// visual que los enlaces del footer (.pcf-link) para no cambiar el diseño.
export default function CookiePreferencesLink({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  return (
    <a
      href={href}
      className="pcf-link"
      style={{ fontSize: "13px", color: "#9AA3AD" }}
    >
      {label}
    </a>
  );
}
