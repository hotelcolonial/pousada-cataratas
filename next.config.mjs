/** @type {import('next').NextConfig} */
const nextConfig = {
  // Redirecciones permanentes de URLs del site antiguo que ya no existen.
  async redirects() {
    return [
      {
        // El site antiguo tenía /contato (sin prefijo de idioma). Ya no existe
        // (404). El nuevo site tiene todas sus rutas bajo /pt · /es · /en, así
        // que "/contato" exacto no colisiona con ninguna ruta actual.
        // 301 permanente -> la home en portugués, para que Google entienda el
        // cambio definitivo y quien tenga el link viejo llegue a la home.
        // (Nota: statusCode: 301; el `permanent: true` de Next devolvería 308.)
        source: "/contato",
        destination: "/pt",
        statusCode: 301,
      },
    ];
  },
};

export default nextConfig;
