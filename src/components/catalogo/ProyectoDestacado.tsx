"use client";
import Link from "next/link";
import type { MouseEvent } from "react";
import type { Proyecto } from "@/data/proyectos";
import { precio, banos } from "@/lib/formato";
import { textoMedida } from "@/data/terrenos";
import ImagenVenta from "../proyecto/ImagenVenta";
import Compra from "../Compra";

export default function ProyectoDestacado({ p, abrir }: {
  p: Proyecto;
  abrir: (e: MouseEvent<HTMLAnchorElement>, slug: string) => void;
}) {
  return (
    <article className="proyecto-destacado tarjeta-casa">
      <Link href={`/${p.slug}/`} onClick={(e) => abrir(e, p.slug)} className="foto-tarjeta" aria-label={`Conocer ${p.nombre}`}>
        <ImagenVenta p={p} prioridad />
      </Link>
      <div className="destacado-info">
        <p className="sobrelinea">NUESTRO PRIMER PROYECTO DIGITAL</p>
        <h2><Link href={`/${p.slug}/`} onClick={(e) => abrir(e, p.slug)}>{p.nombre}</Link></h2>
        <p className="destacado-lema">{p.lema}</p>
        <p className="text-gris">{p.descripcion}</p>
        <ul className="destacado-datos" aria-label="Características del proyecto">
          <li>{p.m2} m² construidos</li>
          <li>Terreno {textoMedida(p.terreno)}</li>
          <li>{p.recamaras} recámaras · {banos(p.banos)} {p.banos === 1 ? "baño" : "baños"}</li>
          <li>{p.plantas} {p.plantas === 1 ? "planta" : "plantas"}</li>
        </ul>
        <p className="nota">Planos arquitectónicos acotados, fachada, cortes, planta de cimentación y render de fachada en PDF.</p>
        <div className="destacado-acciones">
          <Link href={`/${p.slug}/`} onClick={(e) => abrir(e, p.slug)} className="boton">Conocer {p.nombre} <span aria-hidden>→</span></Link>
          <div><strong>{precio(p.paquetes[0].precio)}</strong><p className="nota">Precio de ejemplo</p></div>
          <Compra p={p} className="destacado-comprar" />
        </div>
      </div>
    </article>
  );
}
