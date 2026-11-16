"use client";
import Script from "next/script";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { METRICAS } from "@/config/metricas";
import { ABRIR_PREFERENCIAS, guardarConsentimiento, leerConsentimiento, suscribirConsentimiento, type Consentimiento } from "@/lib/consentimiento";
import { retirarClarity } from "@/lib/clarity";
import { capturarAtribucion, track } from "@/lib/analytics";

const servidor = () => null;
export default function MetricasClarity() {
  const consentimiento = useSyncExternalStore(suscribirConsentimiento, leerConsentimiento, servidor);
  const [editar, setEditar] = useState(false);
  const ruta = usePathname();
  const ultimaRuta = useRef("");
  useEffect(() => {
    const abrir = () => setEditar(true);
    window.addEventListener(ABRIR_PREFERENCIAS, abrir);
    return () => window.removeEventListener(ABRIR_PREFERENCIAS, abrir);
  }, []);
  useEffect(() => {
    if (consentimiento !== "aceptado") {
      ultimaRuta.current = "";
      if (window.clarity) retirarClarity();
      return;
    }
    if (ultimaRuta.current === ruta) return;
    ultimaRuta.current = ruta;
    capturarAtribucion();
    track("page_view");
  }, [consentimiento, ruta]);

  function elegir(eleccion: Exclude<Consentimiento, null>) {
    guardarConsentimiento(eleccion);
    setEditar(false);
    if (eleccion === "rechazado") retirarClarity();
  }

  return <>
    {consentimiento === "aceptado" && METRICAS.habilitadas && <Script id="dream-house-clarity" strategy="afterInteractive">{`
      (function(c,l,a,r,i){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        c[a]('consentv2',{analytics_Storage:'granted',ad_Storage:'denied'});
        var t=l.createElement(r);t.async=1;t.src='https://www.clarity.ms/tag/'+i;
        l.head.appendChild(t);
      })(window,document,'clarity','script','${METRICAS.clarityId}');
    `}</Script>}
    {(consentimiento === null || editar) && <section className="preferencias-analitica" aria-label="Preferencias de analítica" data-clarity-mask="true">
      <div>
        <h2>¿Nos ayudas a mejorar Dream House?</h2>
        <p>Con tu permiso usamos Microsoft Clarity para medir visitas, clics y navegación. Puedes rechazar la analítica y seguir usando la página.</p>
        <Link href="/legal/privacidad/#tecnologias" className="enlace">Aviso de privacidad</Link>
      </div>
      <div className="preferencias-acciones">
        <button type="button" className="boton" onClick={() => elegir("aceptado")}>Aceptar analítica</button>
        <button type="button" className="boton" onClick={() => elegir("rechazado")}>Rechazar analítica</button>
        {consentimiento !== null && <button type="button" className="enlace" onClick={() => setEditar(false)}>Cerrar</button>}
      </div>
    </section>}
  </>;
}
