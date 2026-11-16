"use client";
import { useEffect } from "react";
import Link from "next/link";
import type { Proyecto } from "@/data/proyectos";
import { venta } from "@/data/venta";
import { precio, banos } from "@/lib/formato";
import { textoMedida } from "@/data/terrenos";
import { track } from "@/lib/analytics";
import Compra from "../Compra";
import ContactoProyecto from "../ContactoProyecto";
import Dialogo from "../Dialogo";
import GaleriaCasa from "./GaleriaCasa";
import ImagenVenta from "./ImagenVenta";
import AvisoLanzamiento from "../AvisoLanzamiento";
import { GuardarProyecto } from "../SeleccionGuardada";

export default function Ficha({
  p,
  cerrar,
}: {
  p: Proyecto;
  cerrar: () => void;
}) {
  const datos = venta(p);
  useEffect(() => {
    track("demo_view_project", { proyecto: p.slug });
  }, [p.slug]);
  if (p.estado === "proximamente") {
    return (
      <Dialogo titulo={p.nombre} cerrar={cerrar}>
        <header className="ficha-cabecera">
          <span className="font-display text-xl">{p.nombre}</span>
          <button className="cerrar" onClick={cerrar} aria-label="Cerrar ficha">×</button>
        </header>
        <div className="ficha-grid">
          <section className="galeria" aria-label={`Avance de ${p.nombre}`}>
            <div className="galeria-principal"><ImagenVenta p={p} encajar /></div>
            <p className="nota mt-5">Imagen conceptual. El diseño final está en preparación.</p>
          </section>
          <section className="ficha-info">
            <span className="estado-proximamente">Próximamente</span>
            <h1 className="titulo-ficha mt-5">{p.nombre}</h1>
            <p className="mt-4 text-gris">Estamos preparando los planos y las imágenes de este proyecto. Publicaremos su información completa y precio cuando esté listo.</p>
            <p className="nota mt-4">Aún no está disponible para compra. Fecha de lanzamiento por confirmar.</p>
            <AvisoLanzamiento p={p} />
            <GuardarProyecto p={p} />
            <button type="button" className="enlace mt-5" onClick={cerrar}>Volver al catálogo</button>
          </section>
        </div>
      </Dialogo>
    );
  }
  return (
    <Dialogo titulo={p.nombre} cerrar={cerrar}>
      <header className="ficha-cabecera">
        <span className="font-display text-xl">{p.nombre}</span>
        <button className="cerrar" onClick={cerrar} aria-label="Cerrar ficha">
          ×
        </button>
      </header>
      <div className="ficha-grid">
        <section aria-label="Imágenes y recorrido" className="galeria">
          <GaleriaCasa p={p} />
          <p className="nota mt-5">
            {datos.imagenes.every((m) => !m.provisional)
              ? `${datos.imagenes.length} renders de visualización del proyecto.`
              : "Ilustraciones provisionales. Las imágenes reales están pendientes."}
          </p>
          <Link
            href={`/${p.slug}/`}
            className="enlace mt-3 inline-block text-xs"
          >
            Enlace directo a esta casa ↗
          </Link>
        </section>
        <section className="ficha-info">
          <p className="sobrelinea">EL PROYECTO · {p.estilo}</p>
          <h1 className="titulo-ficha">{p.nombre}</h1>
          <p className="mt-3 text-gris">{p.lema}</p>
          {p.documentacionVerificada && <p className="mt-3 text-gris">{p.descripcion}</p>}
          <dl className="datos-casa">
            {[
              [textoMedida(p.terreno), "Terreno de referencia"],
              [`${p.m2} m²`, "Construidos"],
              [`${p.recamaras} recámaras`, `${banos(p.banos)} ${p.banos === 1 ? "baño" : "baños"}`],
              [
                `${p.plantas} ${p.plantas === 1 ? "planta" : "plantas"}`,
                "Niveles",
              ],
            ].map(([valor, etiqueta]) => (
              <div key={etiqueta}>
                <dt>{etiqueta}</dt>
                <dd>{valor}</dd>
              </div>
            ))}
          </dl>
          <p className="nota">
            {p.documentacionVerificada
              ? "Distribución y terreno según los planos del proyecto. La medida no garantiza compatibilidad con tu terreno."
              : "Datos ilustrativos por confirmar. La medida no garantiza compatibilidad con tu terreno."}
          </p>
          <h2 className="font-display text-2xl mt-6">Qué recibes</h2>
          {p.documentacionVerificada && <p className="nota mt-2">Documento PDF de seis páginas: portada y cinco láminas técnicas.</p>}
          <ul className="entregables">
            {datos.entregables.map((e) => (
              <li key={e.id}>
                <span className="palomita" aria-hidden>
                  ✓
                </span>
                <span>
                  {e.nombre}{" "}
                  <span className="text-gris text-xs">{e.formato}</span>
                </span>
              </li>
            ))}
          </ul>
          <details className="lista-completa">
            <summary>Ver lista completa y formatos</summary>
            <ul>
              {datos.entregables.map((e) => (
                <li key={e.id}>
                  <strong>{e.formato}</strong> · {e.descripcion}
                </li>
              ))}
            </ul>
            <p className="nota mt-3">
              DWG editable pendiente de confirmar; no está incluido en esta
              demostración.
            </p>
          </details>
          <div className="aviso mt-5">
            <strong>Antes de comprar</strong>
            <p>
              No incluye {datos.exclusiones.join(", ").toLowerCase()}. Requiere
              revisión y adaptación local.
            </p>
            <p className="nota mt-2">
              {p.documentacionVerificada
                ? "Contenido según el PDF del proyecto. Precio de ejemplo."
                : "Paquete de ejemplo, sujeto a confirmación."}
            </p>
          </div>
          <div className="compra-fija">
            <div>
              <p className="precio-ficha">{precio(p.paquetes[0].precio)}</p>
              <p className="nota">Precio de ejemplo</p>
            </div>
            <Compra p={p} />
            <p className="nota entrega-ficha">
              Demostración sin cobro ni entrega de planos reales.
            </p>
          </div>
          <GuardarProyecto p={p} />
          <div className="adaptar-ficha">
            <ContactoProyecto nombre={p.nombre} slug={p.slug}>
              ¿Quieres adaptar esta casa?
            </ContactoProyecto>
            <p className="nota mt-1">
              Cotización separada. Contáctanos por WhatsApp.
            </p>
          </div>
        </section>
      </div>
    </Dialogo>
  );
}
