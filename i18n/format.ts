// Interpola una plantilla del diccionario reemplazando {clave} por su valor.
// format("{name} em Foz do Iguaçu", { name: "Cataratas" }) => "Cataratas em Foz do Iguaçu"
export function format(
  template: string,
  vars: Record<string, string | number>,
): string {
  return template.replace(/\{(\w+)\}/g, (_, k) =>
    k in vars ? String(vars[k]) : `{${k}}`,
  );
}
