"use client";
import { useId, useState } from "react";
import Link from "next/link";
import { ARQUITECTO, CONTACTO } from "@/config/sitio";
import {
  ADAPTACION_CATALOGO,
  ATENCION_CATALOGO,
  PREGUNTAS_CATALOGO,
} from "@/data/informacionCatalogo";
import ContactoProyecto from "../ContactoProyecto";

function IconoAtencion({ indice }: { indice: number }) {
  const trazos = [
    "M7 3h7l4 4v14H6V3h1m7 0v5h4M9 12h6m-6 4h6",
    "M7 10V7a5 5 0 0 1 10 0v3M5 10h14v11H5zM12 14v3",
    "M4 14v-3a8 8 0 0 1 16 0v3M4 12H2v6h4v-6H4m16 0h2v6h-4v-6h2m0 6c0 3-3 4-6 4",
  ];
  return (
    <svg
      width="23"
      height="23"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d={trazos[indice]}
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Pregunta({
  pregunta,
  respuesta,
}: {
  pregunta: string;
  respuesta: string;
}) {
  const id = useId();
  const [abierta, setAbierta] = useState(false);
  return (
    <div className="pregunta-catalogo">
      <h3>
        <button
          id={`${id}-boton`}
          aria-expanded={abierta}
          aria-controls={`${id}-respuesta`}
          onClick={() => setAbierta(!abierta)}
        >
          {pregunta}
          <span aria-hidden>{abierta ? "−" : "+"}</span>
        </button>
      </h3>
      <div
        id={`${id}-respuesta`}
        role="region"
        aria-labelledby={`${id}-boton`}
        hidden={!abierta}
      >
        <p>{respuesta}</p>
      </div>
    </div>
  );
}

export default function InformacionCatalogo() {
  return (
    <section
      className="informacion-catalogo"
      aria-label="Información antes de comprar"
    >
      <ul className="atencion-catalogo">
        {ATENCION_CATALOGO.map((texto, i) => (
          <li key={texto}>
            <IconoAtencion indice={i} />
            {i === 2 ? (
              <Link href="/contacto/">{texto}</Link>
            ) : (
              <span>{texto}</span>
            )}
          </li>
        ))}
      </ul>
      <div className="informacion-catalogo-grid">
        <div>
          <section className="adaptacion-catalogo">
            <h2>{ADAPTACION_CATALOGO.titulo}</h2>
            <p>{ADAPTACION_CATALOGO.texto}</p>
            <ContactoProyecto mensaje={ADAPTACION_CATALOGO.mensaje}>
              {ADAPTACION_CATALOGO.enlace}
            </ContactoProyecto>
            <p className="aclaracion-adaptacion">
              Cotización separada.
              {CONTACTO.pendiente &&
                " En esta demo puedes preparar la consulta; el canal de contacto aún no está habilitado."}
            </p>
          </section>
          {!ARQUITECTO.pendiente && (
            <div className="equipo-catalogo">
              <p>Proyecto desarrollado por {ARQUITECTO.nombre}</p>
              <Link href="/contacto/" className="enlace">
                Conoce al equipo ↗
              </Link>
            </div>
          )}
        </div>
        <section className="faq-catalogo" aria-labelledby="titulo-faq-catalogo">
          <h2 id="titulo-faq-catalogo">Antes de comprar</h2>
          {PREGUNTAS_CATALOGO.map((p) => (
            <Pregunta key={p.pregunta} {...p} />
          ))}
        </section>
      </div>
    </section>
  );
}
