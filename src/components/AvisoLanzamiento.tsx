"use client";
import type { Proyecto } from "@/data/proyectos";
import { AVISOS } from "@/config/avisos";
import { track } from "@/lib/analytics";

export default function AvisoLanzamiento({ p }: { p: Proyecto }) {
  if (p.estado !== "proximamente") return null;
  const asunto = `Aviso de lanzamiento: ${p.nombre}`;
  const mensaje = `Hola, quiero recibir un aviso por correo cuando ${p.nombre} esté listo.\n\nProyecto: ${p.nombre} (${p.slug})\n\nSolo solicito un aviso de este lanzamiento, sin suscribirme a publicidad.\n\nGracias.`;
  return (
    <div className="aviso-lanzamiento">
      <a
        className="boton"
        href={`mailto:${AVISOS.correo}?subject=${encodeURIComponent(asunto)}&body=${encodeURIComponent(mensaje)}`}
        aria-label={`Avísame cuando ${p.nombre} esté listo`}
        onClick={() => track("launch_notification_interest", { proyecto: p.slug, canal: "email" })}
      >Avísame cuando esté listo</a>
      <p className="nota">Abre tu correo. Envía el mensaje para solicitar el aviso.</p>
    </div>
  );
}
