"use client";

import Script from "next/script";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { TRIPADVISOR, TA_CONTAINER_ID, taScriptSrc } from "@/lib/tripadvisor";

/**
 * Dispara el pintado del badge de TripAdvisor. IMPRESCINDIBLE con `lazyOnload`.
 *
 * El widget se carga en dos etapas y NINGUNA pinta nada por sí sola:
 *   1. El script del snippet (jscache/wejs) solo inserta un segundo <script>.
 *   2. Ese segundo script (WidgetEmbed-rated) define `window.taValidate`, apunta
 *      su función de render en la lista de validadores y hace
 *      `window.onload = window.taValidate`.
 * El badge aparece cuando se dispara el evento load de la página. Con lazyOnload
 * todo esto ocurre DESPUÉS de ese load, que ya no volverá a dispararse, así que
 * hay que llamar a taValidate() a mano — es exactamente lo que habría hecho el
 * load, y por eso no altera el comportamiento del widget oficial.
 *
 * Como el onLoad del <Script> se dispara al terminar la etapa 1 (cuando
 * taValidate todavía no existe), esperamos al load de la etapa 2, con un
 * temporizador de respaldo por si TripAdvisor cambia la forma de insertarlo.
 * Si nada de esto funciona, el contenedor conserva el badge de reserva del
 * snippet, que ya enlaza a la ficha del hotel: el hueco nunca queda vacío.
 */
function paintWidget() {
  let done = false;
  const run = () => {
    const w = window as Window & { taValidate?: () => void };
    if (done || typeof w.taValidate !== "function") return;
    done = true;
    w.taValidate();
  };

  run();
  if (done) return;
  document
    .querySelector<HTMLScriptElement>('script[src*="WidgetEmbed-rated"]')
    ?.addEventListener("load", run, { once: true });
  // Respaldo acotado: un único reintento por si el <script> de la etapa 2 ya
  // había cargado, o si el selector deja de encontrarlo.
  setTimeout(run, 2500);
}

/**
 * Widget OFICIAL de TripAdvisor (uniq=378), pensado como sello de respaldo
 * discreto en el pie: una tarjeta blanca pequeña que enmarca el badge para que
 * su verde corporativo no choque con el fondo del footer.
 *
 * Va montado en el Footer, que aparece en TODAS las páginas — y solo ahí, así
 * que el id del contenedor (único por página, lo exige TripAdvisor) no colisiona.
 */
export default function TripAdvisorBadge() {
  const lang = useLocale();

  return (
    <div className="pcf-ta-card">
      {/* Contenedor oficial: el script lo localiza por este id y sustituye su
          contenido. Hasta entonces se ve el badge de reserva del snippet, que ya
          enlaza a la ficha del hotel. No cambiar id ni clases. */}
      <div id={TA_CONTAINER_ID} className="TA_rated">
        <ul id="bQxqFWN5F4e9" className="TA_links TZ4WRK3NXv">
          <li id="OcwM6DoI" className="gT0FJg3T8P">
            <a target="_blank" rel="noopener noreferrer" href={TRIPADVISOR.reviewUrl}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://www.tripadvisor.com.br/img/cdsi/img2/badges/ollie-11424-2.gif" alt="TripAdvisor" />
            </a>
          </li>
        </ul>
      </div>

      {/* Script oficial del widget. `lazyOnload` = se inyecta tras el evento load
          de la página, en tiempo idle, así no compite con el render. */}
      <Script
        id={`tripadvisor-rated-${TRIPADVISOR.widgetUniq}-${lang}`}
        src={taScriptSrc(lang)}
        strategy="lazyOnload"
        data-loadtrk=""
        onLoad={(e: Event) => {
          // Equivalente al onload="this.loadtrk=true" del snippet oficial.
          const el = e.currentTarget as (HTMLScriptElement & { loadtrk?: boolean }) | null;
          if (el) el.loadtrk = true;
          paintWidget();
        }}
      />
    </div>
  );
}
