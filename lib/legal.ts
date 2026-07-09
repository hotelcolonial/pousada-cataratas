// =============================================================================
// PLANTILLA BASE — POLÍTICA DE PRIVACIDAD Y COOKIES (LGPD)
// -----------------------------------------------------------------------------
// AVISO IMPORTANTE (interno, no se muestra en la página pública):
// Este es un TEXTO BASE / PLANTILLA generado como punto de partida y adaptado a
// las herramientas que este site realmente usa (Google Analytics vía GTM, Meta
// Pixel, chatbot Asksuite). NO es asesoría jurídica. DEBE ser revisado y
// validado por una persona con conocimiento de la LGPD (Lei nº 13.709/2018)
// antes de publicarse. Complete además los placeholders marcados con tokens
// {RESPONSAVEL}, {EMAIL} y {DATA} (ver campo `ph`), que aparecen resaltados en
// la página para recordar qué datos faltan.
// =============================================================================

import type { Locale } from "@/i18n/config";

export type LegalBlock =
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] };

export type LegalSection = { heading: string; blocks: LegalBlock[] };

export type PrivacyContent = {
  title: string;
  lastUpdatedLabel: string;
  intro: string;
  metaDescription: string;
  // Etiquetas de los placeholders que el cliente debe completar (resaltados).
  ph: { responsavel: string; email: string; data: string };
  sections: LegalSection[];
};

export const privacyPolicy: Record<Locale, PrivacyContent> = {
  // ---------------------------------------------------------------- PORTUGUÊS
  pt: {
    title: "Política de Privacidade e Cookies",
    lastUpdatedLabel: "Última atualização",
    metaDescription:
      "Política de Privacidade e Cookies da Pousada Cataratas: como coletamos, usamos e protegemos seus dados pessoais, em conformidade com a LGPD.",
    intro:
      "Esta Política explica como a Pousada Cataratas coleta, usa, compartilha e protege os seus dados pessoais quando você visita este site ou entra em contato conosco, em conformidade com a Lei Geral de Proteção de Dados (LGPD – Lei nº 13.709/2018).",
    ph: {
      responsavel: "[COMPLETAR: nome/razão social do responsável]",
      email: "[COMPLETAR: e-mail de contato para privacidade]",
      data: "[COMPLETAR: data da última atualização]",
    },
    sections: [
      {
        heading: "1. Responsável pelo tratamento",
        blocks: [
          { type: "p", text: "O responsável pelo tratamento dos seus dados pessoais é {RESPONSAVEL}, com sede em R. Parigot de Souza, 180 – Vila Yolanda, Foz do Iguaçu – PR, 85853-270, Brasil." },
          { type: "p", text: "Para assuntos relacionados à privacidade e à proteção de dados, entre em contato pelo e-mail {EMAIL}." },
        ],
      },
      {
        heading: "2. Dados que coletamos",
        blocks: [
          { type: "p", text: "Coletamos apenas os dados necessários para atender você e operar o site:" },
          { type: "ul", items: [
            "Dados de contato: nome, e-mail, telefone/WhatsApp e o conteúdo das mensagens que você nos envia.",
            "Dados de reserva: datas de entrada e saída, número de hóspedes e preferências informadas.",
            "Dados de navegação: endereço IP, tipo de dispositivo e navegador, páginas visitadas e interações, coletados por cookies e tecnologias semelhantes.",
          ] },
        ],
      },
      {
        heading: "3. Como usamos os dados",
        blocks: [
          { type: "ul", items: [
            "Responder ao seu contato e prestar atendimento.",
            "Processar e gerenciar reservas e solicitações.",
            "Melhorar o site, os serviços e a sua experiência de navegação.",
            "Exibir conteúdos e ofertas mais relevantes (quando você consentir).",
            "Cumprir obrigações legais e regulatórias.",
          ] },
        ],
      },
      {
        heading: "4. Cookies e tecnologias semelhantes",
        blocks: [
          { type: "p", text: "Usamos cookies organizados em três categorias, coerentes com o banner de consentimento exibido no site:" },
          { type: "ul", items: [
            "Necessárias: essenciais para o funcionamento do site (navegação, idioma e segurança). Estão sempre ativas.",
            "Analíticas: ajudam a entender como o site é utilizado, de forma agregada e anônima, para melhorá-lo.",
            "Marketing: usadas para exibir anúncios e conteúdos mais relevantes para você.",
          ] },
          { type: "p", text: "Na sua primeira visita, um banner permite aceitar tudo, recusar o que não for essencial ou configurar por categoria. Você pode alterar a sua escolha a qualquer momento pelo link “Preferências de cookies” no rodapé. Utilizamos o Google Consent Mode: sem o seu consentimento, as etiquetas de analytics e de marketing permanecem bloqueadas." },
        ],
      },
      {
        heading: "5. Ferramentas de terceiros",
        blocks: [
          { type: "p", text: "Para operar o site e medir resultados, utilizamos serviços de terceiros que podem tratar dados conforme as suas próprias políticas de privacidade:" },
          { type: "ul", items: [
            "Google Analytics (via Google Tag Manager): medição de audiência e uso do site.",
            "Meta Pixel (Facebook/Instagram): mensuração e otimização de campanhas publicitárias.",
            "Asksuite: chatbot de atendimento para tirar dúvidas e apoiar reservas.",
          ] },
          { type: "p", text: "As ferramentas de analytics e marketing só são ativadas após o seu consentimento." },
        ],
      },
      {
        heading: "6. Base legal do tratamento",
        blocks: [
          { type: "ul", items: [
            "Consentimento: para cookies e ferramentas de analytics e marketing.",
            "Execução de contrato e procedimentos preliminares: para processar reservas e solicitações.",
            "Legítimo interesse: para segurança, prevenção de fraudes e melhoria do site.",
            "Cumprimento de obrigação legal ou regulatória.",
          ] },
        ],
      },
      {
        heading: "7. Compartilhamento de dados",
        blocks: [
          { type: "p", text: "Não vendemos os seus dados pessoais. Podemos compartilhá-los apenas com prestadores de serviço que nos apoiam (como as ferramentas listadas acima), com parceiros de reserva/pagamento quando aplicável, e com autoridades quando exigido por lei." },
        ],
      },
      {
        heading: "8. Conservação dos dados",
        blocks: [
          { type: "p", text: "Mantemos os seus dados apenas pelo tempo necessário às finalidades descritas nesta Política ou ao cumprimento de obrigações legais, após o que são eliminados ou anonimizados." },
        ],
      },
      {
        heading: "9. Transferência internacional",
        blocks: [
          { type: "p", text: "Alguns provedores (por exemplo, Google e Meta) podem tratar dados fora do Brasil. Nesses casos, adotam-se salvaguardas adequadas para proteger os seus dados." },
        ],
      },
      {
        heading: "10. Seus direitos como titular (LGPD)",
        blocks: [
          { type: "p", text: "Nos termos do art. 18 da LGPD, você pode, a qualquer momento:" },
          { type: "ul", items: [
            "Confirmar a existência de tratamento e acessar os seus dados.",
            "Corrigir dados incompletos, inexatos ou desatualizados.",
            "Solicitar a anonimização, o bloqueio ou a eliminação de dados desnecessários ou excessivos.",
            "Solicitar a portabilidade dos dados.",
            "Solicitar a eliminação dos dados tratados com base no consentimento.",
            "Obter informação sobre com quem compartilhamos os seus dados.",
            "Revogar o consentimento a qualquer momento.",
          ] },
          { type: "p", text: "Para exercer os seus direitos, escreva para {EMAIL}." },
        ],
      },
      {
        heading: "11. Segurança",
        blocks: [
          { type: "p", text: "Adotamos medidas técnicas e organizacionais razoáveis para proteger os seus dados contra acesso não autorizado, perda ou uso indevido." },
        ],
      },
      {
        heading: "12. Alterações nesta Política",
        blocks: [
          { type: "p", text: "Podemos atualizar esta Política periodicamente. A data da última atualização é indicada no início desta página." },
        ],
      },
      {
        heading: "13. Contato",
        blocks: [
          { type: "p", text: "Responsável/Encarregado pelo tratamento: {RESPONSAVEL}. E-mail para assuntos de privacidade: {EMAIL}." },
        ],
      },
    ],
  },

  // ------------------------------------------------------------------ ESPAÑOL
  es: {
    title: "Política de Privacidad y Cookies",
    lastUpdatedLabel: "Última actualización",
    metaDescription:
      "Política de Privacidad y Cookies de Pousada Cataratas: cómo recogemos, usamos y protegemos tus datos personales, conforme a la LGPD.",
    intro:
      "Esta Política explica cómo Pousada Cataratas recoge, usa, comparte y protege tus datos personales cuando visitas este sitio o te pones en contacto con nosotros, conforme a la Ley General de Protección de Datos de Brasil (LGPD – Ley nº 13.709/2018).",
    ph: {
      responsavel: "[COMPLETAR: nombre/razón social del responsable]",
      email: "[COMPLETAR: e-mail de contacto para privacidad]",
      data: "[COMPLETAR: fecha de última actualización]",
    },
    sections: [
      {
        heading: "1. Responsable del tratamiento",
        blocks: [
          { type: "p", text: "El responsable del tratamiento de tus datos personales es {RESPONSAVEL}, con domicilio en R. Parigot de Souza, 180 – Vila Yolanda, Foz do Iguaçu – PR, 85853-270, Brasil." },
          { type: "p", text: "Para asuntos relacionados con la privacidad y la protección de datos, escríbenos a {EMAIL}." },
        ],
      },
      {
        heading: "2. Datos que recogemos",
        blocks: [
          { type: "p", text: "Recogemos solo los datos necesarios para atenderte y operar el sitio:" },
          { type: "ul", items: [
            "Datos de contacto: nombre, e-mail, teléfono/WhatsApp y el contenido de los mensajes que nos envías.",
            "Datos de reserva: fechas de entrada y salida, número de huéspedes y preferencias indicadas.",
            "Datos de navegación: dirección IP, tipo de dispositivo y navegador, páginas visitadas e interacciones, recogidos mediante cookies y tecnologías similares.",
          ] },
        ],
      },
      {
        heading: "3. Cómo usamos los datos",
        blocks: [
          { type: "ul", items: [
            "Responder a tu contacto y brindarte atención.",
            "Procesar y gestionar reservas y solicitudes.",
            "Mejorar el sitio, los servicios y tu experiencia de navegación.",
            "Mostrar contenidos y ofertas más relevantes (cuando lo consientas).",
            "Cumplir obligaciones legales y regulatorias.",
          ] },
        ],
      },
      {
        heading: "4. Cookies y tecnologías similares",
        blocks: [
          { type: "p", text: "Usamos cookies organizadas en tres categorías, coherentes con el banner de consentimiento que se muestra en el sitio:" },
          { type: "ul", items: [
            "Necesarias: esenciales para el funcionamiento del sitio (navegación, idioma y seguridad). Están siempre activas.",
            "Analíticas: ayudan a entender cómo se usa el sitio, de forma agregada y anónima, para mejorarlo.",
            "Marketing: se usan para mostrar anuncios y contenidos más relevantes para ti.",
          ] },
          { type: "p", text: "En tu primera visita, un banner permite aceptar todo, rechazar lo no esencial o configurar por categoría. Puedes cambiar tu elección en cualquier momento desde el enlace “Preferencias de cookies” del pie de página. Utilizamos Google Consent Mode: sin tu consentimiento, las etiquetas de analytics y marketing permanecen bloqueadas." },
        ],
      },
      {
        heading: "5. Herramientas de terceros",
        blocks: [
          { type: "p", text: "Para operar el sitio y medir resultados, utilizamos servicios de terceros que pueden tratar datos conforme a sus propias políticas de privacidad:" },
          { type: "ul", items: [
            "Google Analytics (vía Google Tag Manager): medición de audiencia y uso del sitio.",
            "Meta Pixel (Facebook/Instagram): medición y optimización de campañas publicitarias.",
            "Asksuite: chatbot de atención para resolver dudas y apoyar reservas.",
          ] },
          { type: "p", text: "Las herramientas de analytics y marketing solo se activan tras tu consentimiento." },
        ],
      },
      {
        heading: "6. Base legal del tratamiento",
        blocks: [
          { type: "ul", items: [
            "Consentimiento: para cookies y herramientas de analytics y marketing.",
            "Ejecución de contrato y trámites previos: para procesar reservas y solicitudes.",
            "Interés legítimo: para seguridad, prevención de fraudes y mejora del sitio.",
            "Cumplimiento de obligaciones legales o regulatorias.",
          ] },
        ],
      },
      {
        heading: "7. Compartición de datos",
        blocks: [
          { type: "p", text: "No vendemos tus datos personales. Solo podemos compartirlos con proveedores de servicio que nos apoyan (como las herramientas listadas arriba), con socios de reserva/pago cuando corresponda, y con autoridades cuando la ley lo exija." },
        ],
      },
      {
        heading: "8. Conservación de los datos",
        blocks: [
          { type: "p", text: "Conservamos tus datos solo durante el tiempo necesario para las finalidades descritas en esta Política o para cumplir obligaciones legales, tras lo cual se eliminan o anonimizan." },
        ],
      },
      {
        heading: "9. Transferencia internacional",
        blocks: [
          { type: "p", text: "Algunos proveedores (por ejemplo, Google y Meta) pueden tratar datos fuera de Brasil. En esos casos se adoptan salvaguardas adecuadas para proteger tus datos." },
        ],
      },
      {
        heading: "10. Tus derechos como titular (LGPD)",
        blocks: [
          { type: "p", text: "Conforme al art. 18 de la LGPD, puedes, en cualquier momento:" },
          { type: "ul", items: [
            "Confirmar la existencia del tratamiento y acceder a tus datos.",
            "Corregir datos incompletos, inexactos o desactualizados.",
            "Solicitar la anonimización, el bloqueo o la eliminación de datos innecesarios o excesivos.",
            "Solicitar la portabilidad de los datos.",
            "Solicitar la eliminación de los datos tratados con base en el consentimiento.",
            "Obtener información sobre con quién compartimos tus datos.",
            "Revocar el consentimiento en cualquier momento.",
          ] },
          { type: "p", text: "Para ejercer tus derechos, escríbenos a {EMAIL}." },
        ],
      },
      {
        heading: "11. Seguridad",
        blocks: [
          { type: "p", text: "Adoptamos medidas técnicas y organizativas razonables para proteger tus datos frente a accesos no autorizados, pérdida o uso indebido." },
        ],
      },
      {
        heading: "12. Cambios en esta Política",
        blocks: [
          { type: "p", text: "Podemos actualizar esta Política periódicamente. La fecha de la última actualización se indica al inicio de esta página." },
        ],
      },
      {
        heading: "13. Contacto",
        blocks: [
          { type: "p", text: "Responsable/Encargado del tratamiento: {RESPONSAVEL}. E-mail para asuntos de privacidad: {EMAIL}." },
        ],
      },
    ],
  },

  // ------------------------------------------------------------------ ENGLISH
  en: {
    title: "Privacy and Cookie Policy",
    lastUpdatedLabel: "Last updated",
    metaDescription:
      "Pousada Cataratas Privacy and Cookie Policy: how we collect, use and protect your personal data, in accordance with Brazil's LGPD.",
    intro:
      "This Policy explains how Pousada Cataratas collects, uses, shares and protects your personal data when you visit this site or contact us, in accordance with Brazil's General Data Protection Law (LGPD – Law No. 13,709/2018).",
    ph: {
      responsavel: "[TO COMPLETE: controller name / legal entity]",
      email: "[TO COMPLETE: privacy contact e-mail]",
      data: "[TO COMPLETE: last updated date]",
    },
    sections: [
      {
        heading: "1. Data controller",
        blocks: [
          { type: "p", text: "The controller of your personal data is {RESPONSAVEL}, located at R. Parigot de Souza, 180 – Vila Yolanda, Foz do Iguaçu – PR, 85853-270, Brazil." },
          { type: "p", text: "For privacy and data protection matters, contact us at {EMAIL}." },
        ],
      },
      {
        heading: "2. Data we collect",
        blocks: [
          { type: "p", text: "We only collect the data needed to assist you and run the site:" },
          { type: "ul", items: [
            "Contact data: name, e-mail, phone/WhatsApp and the content of the messages you send us.",
            "Booking data: check-in and check-out dates, number of guests and stated preferences.",
            "Browsing data: IP address, device and browser type, pages visited and interactions, collected through cookies and similar technologies.",
          ] },
        ],
      },
      {
        heading: "3. How we use the data",
        blocks: [
          { type: "ul", items: [
            "Respond to your contact and provide support.",
            "Process and manage bookings and requests.",
            "Improve the site, our services and your browsing experience.",
            "Show more relevant content and offers (when you consent).",
            "Comply with legal and regulatory obligations.",
          ] },
        ],
      },
      {
        heading: "4. Cookies and similar technologies",
        blocks: [
          { type: "p", text: "We use cookies grouped into three categories, consistent with the consent banner shown on the site:" },
          { type: "ul", items: [
            "Necessary: essential for the site to work (navigation, language and security). Always on.",
            "Analytics: help us understand how the site is used, in an aggregated and anonymous way, to improve it.",
            "Marketing: used to show ads and content that are more relevant to you.",
          ] },
          { type: "p", text: "On your first visit, a banner lets you accept all, reject non-essential ones or configure by category. You can change your choice at any time via the “Cookie preferences” link in the footer. We use Google Consent Mode: without your consent, analytics and marketing tags remain blocked." },
        ],
      },
      {
        heading: "5. Third-party tools",
        blocks: [
          { type: "p", text: "To run the site and measure results, we use third-party services that may process data under their own privacy policies:" },
          { type: "ul", items: [
            "Google Analytics (via Google Tag Manager): audience measurement and site usage.",
            "Meta Pixel (Facebook/Instagram): measurement and optimization of advertising campaigns.",
            "Asksuite: support chatbot to answer questions and assist with bookings.",
          ] },
          { type: "p", text: "Analytics and marketing tools are only activated after your consent." },
        ],
      },
      {
        heading: "6. Legal basis for processing",
        blocks: [
          { type: "ul", items: [
            "Consent: for cookies and analytics and marketing tools.",
            "Performance of a contract and preliminary steps: to process bookings and requests.",
            "Legitimate interest: for security, fraud prevention and site improvement.",
            "Compliance with legal or regulatory obligations.",
          ] },
        ],
      },
      {
        heading: "7. Data sharing",
        blocks: [
          { type: "p", text: "We do not sell your personal data. We may share it only with service providers that support us (such as the tools listed above), with booking/payment partners where applicable, and with authorities when required by law." },
        ],
      },
      {
        heading: "8. Data retention",
        blocks: [
          { type: "p", text: "We keep your data only for as long as necessary for the purposes described in this Policy or to comply with legal obligations, after which it is deleted or anonymized." },
        ],
      },
      {
        heading: "9. International transfer",
        blocks: [
          { type: "p", text: "Some providers (for example, Google and Meta) may process data outside Brazil. In such cases, appropriate safeguards are applied to protect your data." },
        ],
      },
      {
        heading: "10. Your rights as a data subject (LGPD)",
        blocks: [
          { type: "p", text: "Under Article 18 of the LGPD, you may, at any time:" },
          { type: "ul", items: [
            "Confirm that processing exists and access your data.",
            "Correct incomplete, inaccurate or outdated data.",
            "Request anonymization, blocking or deletion of unnecessary or excessive data.",
            "Request data portability.",
            "Request deletion of data processed based on consent.",
            "Obtain information about who we share your data with.",
            "Withdraw consent at any time.",
          ] },
          { type: "p", text: "To exercise your rights, write to {EMAIL}." },
        ],
      },
      {
        heading: "11. Security",
        blocks: [
          { type: "p", text: "We apply reasonable technical and organizational measures to protect your data against unauthorized access, loss or misuse." },
        ],
      },
      {
        heading: "12. Changes to this Policy",
        blocks: [
          { type: "p", text: "We may update this Policy from time to time. The last updated date is shown at the top of this page." },
        ],
      },
      {
        heading: "13. Contact",
        blocks: [
          { type: "p", text: "Controller/Data protection officer: {RESPONSAVEL}. E-mail for privacy matters: {EMAIL}." },
        ],
      },
    ],
  },
};
