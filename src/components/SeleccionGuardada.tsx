"use client";
import Link from "next/link";
import { useState, type MouseEvent } from "react";
import { obtenerProyecto, type Proyecto } from "@/data/proyectos";
import { guardarSeleccion, useSeleccion } from "@/lib/seleccion";
import Compra from "./Compra";
import ImagenVenta from "./proyecto/ImagenVenta";

export function GuardarProyecto({ p }: { p: Proyecto }) {
  const seleccion = useSeleccion();
  const [mensaje, setMensaje] = useState("");
  const guardado = seleccion === p.slug;
  return (
    <div className="guardar-proyecto">
      <button
        className="guardar-boton"
        aria-pressed={guardado}
        onClick={() => {
          const correcto = guardarSeleccion(guardado ? null : p.slug);
          setMensaje(
            correcto
              ? guardado
                ? "Selección eliminada."
                : "Casa guardada en este navegador para continuar después."
              : "El navegador no permite guardar la selección. Puedes conservar el enlace de esta casa.",
          );
        }}
      >
        <span aria-hidden>{guardado ? "✓" : "+"}</span>{" "}
        {guardado ? "Casa guardada · Quitar" : "Guardar para después"}
      </button>
      <p className="nota" role="status">
        {mensaje || "Sin cuenta. Se guarda únicamente en este navegador."}
      </p>
    </div>
  );
}

export default function SeleccionGuardada({
  abrir,
}: {
  abrir: (e: MouseEvent<HTMLAnchorElement>, slug: string) => void;
}) {
  const slug = useSeleccion();
  const p = slug ? obtenerProyecto(slug) : null;
  const [error, setError] = useState("");
  if (!p) return null;
  return (
    <aside className="seleccion-guardada" aria-label="Tu casa guardada">
      <div className="seleccion-imagen">
        <ImagenVenta p={p} />
      </div>
      <div className="seleccion-texto">
        <p className="sobrelinea">TU CASA GUARDADA</p>
        <h2>Continúa con {p.nombre}</h2>
        <p className="nota">
          Guardada en este navegador. Puedes elegir otra casa cuando quieras.
        </p>
      </div>
      <div className="seleccion-acciones">
        <Link
          className="enlace"
          href={`/${p.slug}/`}
          onClick={(e) => abrir(e, p.slug)}
        >
          Volver a ver la casa →
        </Link>
        <Compra p={p} />
        <button
          className="quitar-seleccion"
          aria-label={`Quitar ${p.nombre} de la selección guardada`}
          onClick={() => {
            if (!guardarSeleccion(null))
              setError(
                "No se pudo quitar la selección. Revisa los permisos de almacenamiento del navegador.",
              );
          }}
        >
          Quitar
        </button>
      </div>
      {error && (
        <p className="error" role="alert">
          {error}
        </p>
      )}
    </aside>
  );
}
