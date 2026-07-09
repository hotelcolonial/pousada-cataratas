// Renderiza un bloque de datos estructurados <script type="application/ld+json">.
// Server component: no añade JS al cliente ni afecta el diseño.
export default function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
