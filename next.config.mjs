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
      // Maratona Internacional de Foz 2026 (27/09/2026): a promoção saiu do site
      // depois da prova (o post do blog continua). 301 para a lista de promoções,
      // no mesmo idioma, para não deixar 404 nos links já indexados/compartilhados.
      // Agosto Encantador (promo de agosto de 2026) também leva à Outubro Kids.
      {
        source: "/:lang(pt|es|en)/promocao/agosto-encantador",
        destination: "/:lang/promocao/outubro-kids",
        statusCode: 301,
      },
      // Setembro Encantador (01–30/09/2026) foi substituída pela Outubro Kids.
      {
        source: "/:lang(pt|es|en)/promocao/setembro-encantador",
        destination: "/:lang/promocao/outubro-kids",
        statusCode: 301,
      },
      {
        source: "/:lang(pt|es|en)/promocao/maratona-2026",
        destination: "/:lang/promocoes",
        statusCode: 301,
      },
    ];
  },
};

export default nextConfig;
