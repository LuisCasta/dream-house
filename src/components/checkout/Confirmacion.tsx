"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState, useSyncExternalStore } from "react";
import { obtenerProyecto } from "@/data/proyectos";
import { venta } from "@/data/venta";
import { leerDemo } from "@/lib/demo";
import { checkoutUrl, recurso } from "@/lib/rutas";
import { precio } from "@/lib/formato";
import ImagenVenta from "../proyecto/ImagenVenta";

const suscribir = () => () => {};
export default function Confirmacion() {
  const params = useSearchParams();
  const id = params.get("orden") || "";
  const montado = useSyncExternalStore(
    suscribir,
    () => true,
    () => false,
  );
  const pedido = montado ? leerDemo(id) : null;
  const p = pedido ? obtenerProyecto(pedido.slug) : null;
  const [feedback, setFeedback] = useState("");
  const [descargando, setDescargando] = useState(false);
  if (!montado)
    return (
      <div className="ancho py-16" role="status">
        Cargando simulación…
      </div>
    );
  if (!pedido || !p)
    return (
      <div className="ancho estado-vacio">
        <div className="estado-icono">!</div>
        <h1 className="titulo-pagina">No encontramos esta simulación.</h1>
        <p className="text-gris my-5">
          El pedido demo solo está disponible en la sesión donde se creó. Este
          enlace no acredita una compra.
        </p>
        <Link href="/planos" className="boton">
          Volver al catálogo
        </Link>
        <Link href="/recuperar" className="enlace block mt-5">
          Recuperar mis archivos
        </Link>
      </div>
    );
  const aprobado = pedido.escenario === "aprobado";
  const pendiente = pedido.escenario === "pendiente";
  async function descargar() {
    if (descargando) return;
    setDescargando(true);
    setFeedback("");
    try {
      const respuesta = await fetch(recurso("/demo/muestra-dreamhouse.zip"));
      if (!respuesta.ok) throw new Error("descarga");
      const blob = await respuesta.blob();
      const cabecera = new Uint8Array(await blob.slice(0, 2).arrayBuffer());
      if (cabecera[0] !== 80 || cabecera[1] !== 75) throw new Error("archivo");
      const url = URL.createObjectURL(blob);
      const enlace = document.createElement("a");
      enlace.href = url;
      enlace.download = "Dream-House-MUESTRA-DEMO.zip";
      document.body.appendChild(enlace);
      enlace.click();
      enlace.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      setFeedback(
        "Muestra preparada. El ZIP contiene únicamente un README de demostración, sin planos.",
      );
    } catch {
      setFeedback(
        "No se pudo descargar la muestra. Inténtalo de nuevo o consulta Ayuda. No se ha entregado ningún plano.",
      );
    } finally {
      setDescargando(false);
    }
  }
  return (
    <div className={`ancho resultado ${pedido.escenario}`}>
      <div className="resultado-titulo">
        <div className="estado-icono" aria-hidden>
          {aprobado ? "✓" : pendiente ? "◷" : "!"}
        </div>
        <p className="sobrelinea">SIMULACIÓN · SIN COBRO REAL</p>
        <h1 className="titulo-pagina">
          {aprobado
            ? "Pago simulado aprobado"
            : pendiente
              ? "Pago simulado pendiente"
              : "El pago simulado no se completó"}
        </h1>
        <p className="text-gris mt-4">
          {aprobado
            ? "Conoce cómo será la entrega digital de tu proyecto."
            : pendiente
              ? "Este escenario sigue a la espera de confirmación."
              : "Vuelve al formulario y elige otro escenario de prueba."}
        </p>
      </div>
      <div className="resultado-grid">
        <section className="panel pedido-resumen">
          <ImagenVenta p={p} />
          <div>
            <h2 className="font-display text-3xl">{p.nombre}</h2>
            <p className="nota mt-3 break-all">
              Pedido {pedido.id} · Demostración
            </p>
            <p className="text-sm mt-4">{p.paquetes[0].nombre}</p>
            <p className="nota mt-5">Total simulado</p>
            <p className="precio-resumen">{precio(p.paquetes[0].precio)}</p>
          </div>
        </section>
        <section className="panel acciones-resultado">
          {aprobado ? (
            <>
              <button
                className="boton w-full"
                onClick={descargar}
                disabled={descargando}
              >
                {descargando ? "Preparando muestra…" : "↓ Descargar muestra"}
              </button>
              <p className="nota mt-3">
                Solo un README de ejemplo. No contiene planos ni archivos del
                proyecto.
              </p>
              <div className="formatos">
                {venta(p).entregables.map((e) => (
                  <div key={e.id}>
                    <strong>{e.formato}</strong>
                    <span>{e.nombre}</span>
                  </div>
                ))}
              </div>
              <p className="nota">
                Contenido previsto del paquete; pendiente de confirmar y
                conectar la entrega real.
              </p>
            </>
          ) : pendiente ? (
            <>
              <div className="aviso">
                <strong>La descarga todavía no está habilitada.</strong>
                <p>
                  No necesitas pagar de nuevo. Esta simulación permanece
                  pendiente.
                </p>
              </div>
              <button
                className="boton w-full mt-5"
                onClick={() =>
                  setFeedback(
                    "Consulta simulada: el estado sigue pendiente. No se consultó una pasarela ni se envió correo.",
                  )
                }
              >
                Consultar estado
              </button>
            </>
          ) : (
            <>
              <div className="aviso">
                <strong>Escenario de prueba fallido</strong>
                <p>
                  Puedes volver conservando esta casa y cambiar el escenario.
                </p>
              </div>
              <Link href={checkoutUrl(p.slug)} className="boton w-full mt-5">
                Volver al pago
              </Link>
            </>
          )}
          <p role="status" className="feedback mt-4">
            {feedback}
          </p>
        </section>
      </div>
      <div className="resultado-soporte">
        {aprobado && (
          <div>
            <h2 className="font-medium">
              El correo también es una simulación.
            </h2>
            <p className="nota mt-2">
              No se ha enviado ningún enlace por correo.
            </p>
            <button
              className="enlace mt-3"
              onClick={() =>
                setFeedback("Reenvío simulado. No se envió ningún correo real.")
              }
            >
              Simular reenvío del enlace
            </button>
          </div>
        )}
        <div>
          <h2 className="font-medium">¿Necesitas ayuda?</h2>
          <Link href="/contacto" className="enlace mt-3 inline-block">
            Contactar soporte
          </Link>
          <p className="nota mt-2">Canales de atención por confirmar.</p>
        </div>
      </div>
      <div className="aviso text-center mt-6">
        Antes de construir, solicita la revisión y adaptación de un profesional
        local.
      </div>
      <Link href="/planos" className="enlace inline-block mt-8">
        ← Volver al catálogo
      </Link>
    </div>
  );
}
