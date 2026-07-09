// Layout raíz mínimo.
// El <html>/<body>, las fuentes, los estilos globales, el Header/Footer y el
// LocaleProvider viven en app/[lang]/layout.tsx, porque el atributo <html lang>
// depende del locale (segmento [lang]). Este archivo solo delega en children.
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
