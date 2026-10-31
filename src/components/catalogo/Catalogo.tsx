"use client";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useRef, useState, type MouseEvent } from "react";
import { PROYECTOS, obtenerProyecto } from "@/data/proyectos";
import { MEDIDAS, slugMedida, textoMedida } from "@/data/terrenos";
import { precio, banos } from "@/lib/formato";
import ImagenVenta from "../proyecto/ImagenVenta";
import Ficha from "../proyecto/Ficha";
import Compra from "../Compra";
import ContactoProyecto from "../ContactoProyecto";
import SeleccionGuardada from "../SeleccionGuardada";

export default function Catalogo({
  inicial,
  medidaInicial = "",
}: {
  inicial?: string;
  medidaInicial?: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const vuelta = useRef<string | null>(null);
  const [busqueda, setBusqueda] = useState("");
  const [medida, setMedida] = useState(medidaInicial);
  const elegido = obtenerProyecto(inicial ?? params.get("casa") ?? "");
  const normalizar = (s: string) =>
    s
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  const lista = PROYECTOS.filter(
    (p) =>
      normalizar(p.nombre).includes(normalizar(busqueda)) &&
      (!medida || slugMedida(p.terreno) === medida),
  );
  function abrir(e: MouseEvent<HTMLAnchorElement>, slug: string) {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0)
      return;
    e.preventDefault();
    vuelta.current = pathname;
    const query = new URLSearchParams(params.toString());
    query.set("casa", slug);
    router.push(`${pathname}?${query}`, { scroll: false });
  }
  function cerrar() {
    if (inicial) router.replace("/planos/", { scroll: false });
    else if (vuelta.current === pathname) {
      vuelta.current = null;
      router.back();
    } else {
      const query = new URLSearchParams(params.toString());
      query.delete("casa");
      router.replace(`${pathname}${query.size ? `?${query}` : ""}`, {
        scroll: false,
      });
    }
  }
  return (
    <div className="ancho catalogo">
      <div className="catalogo-intro">
        <div>
          <p className="sobrelinea">ENCUENTRA TU PRÓXIMO HOGAR</p>
          <h1>Los planos de la casa que viste.</h1>
          <p className="text-gris mt-3">
            Elige tu casa. Conoce el proyecto. Hazlo tuyo.
          </p>
        </div>
        <div className="buscador">
          <label htmlFor="buscar-casa" className="sr-only">
            Buscar casa por nombre
          </label>
          <span aria-hidden>⌕</span>
          <input
            id="buscar-casa"
            type="search"
            placeholder="Buscar casa por nombre…"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </div>
      </div>
      <p className="catalogo-conoce">
        <Link href="/nosotros/" className="enlace">
          ¿Qué es Dream House? Conócenos ↗
        </Link>
      </p>
      <SeleccionGuardada abrir={abrir} />
      <div className="filtros">
        <label htmlFor="filtro-terreno">Terreno de referencia</label>
        <select
          id="filtro-terreno"
          value={medida}
          onChange={(e) => setMedida(e.target.value)}
        >
          <option value="">Todas las medidas</option>
          {MEDIDAS.map((m) => (
            <option key={m.slug} value={m.slug}>
              {textoMedida(m)}
            </option>
          ))}
        </select>
        {(busqueda || medida) && (
          <button
            className="enlace"
            onClick={() => {
              setBusqueda("");
              setMedida("");
            }}
          >
            Limpiar filtros
          </button>
        )}
        <span className="nota ml-auto" role="status">
          {lista.length} proyectos
        </span>
      </div>
      <p className="nota mb-5">
        Propuesta visual · Imágenes, datos, paquetes y precios de ejemplo por
        confirmar.
      </p>
      {lista.length ? (
        <div className="catalogo-grid">
          {lista
            .map((p, i) => (
              <article key={p.slug} className="tarjeta-casa">
                <Link
                  href={`/${p.slug}/`}
                  onClick={(e) => abrir(e, p.slug)}
                  aria-label={`Ver imágenes de ${p.nombre}`}
                  className="foto-tarjeta"
                >
                  <ImagenVenta p={p} prioridad={i < 3} />
                </Link>
                <div className="tarjeta-info">
                  <h2>
                    <Link
                      href={`/${p.slug}/`}
                      onClick={(e) => abrir(e, p.slug)}
                    >
                      {p.nombre}
                    </Link>
                  </h2>
                  <p className="tarjeta-terreno">
                    Terreno de referencia {textoMedida(p.terreno)}
                  </p>
                  <p className="tarjeta-datos">
                    {p.m2} m² · {p.recamaras} recámaras · {banos(p.banos)} baños
                    · {p.plantas} {p.plantas === 1 ? "planta" : "plantas"}
                  </p>
                  <p className="tarjeta-incluye">
                    <span aria-hidden>▤</span> Planos PDF, fachadas y cortes
                    <br />
                    <span className="pl-6">Renders y especificaciones</span>
                  </p>
                  <p className="precio-tarjeta">
                    {precio(p.paquetes[0].precio)}
                  </p>
                  <Compra p={p} />
                  <Link
                    className="enlace ver-imagenes"
                    href={`/${p.slug}/`}
                    onClick={(e) => abrir(e, p.slug)}
                  >
                    Ver imágenes y recorrido <span aria-hidden>→</span>
                  </Link>
                </div>
              </article>
            ))
            .flatMap((tarjeta, i) =>
              i === 2
                ? [
                    tarjeta,
                    <aside key="personalizado" className="personalizado">
                      <span className="icono-personalizado" aria-hidden>
                        ⌂
                      </span>
                      <div>
                        <h2>¿Necesitas un proyecto personalizado?</h2>
                        <p>Platiquemos sobre tu terreno y lo que necesitas.</p>
                      </div>
                      <ContactoProyecto>
                        Consultar proyecto personalizado
                      </ContactoProyecto>
                    </aside>,
                  ]
                : [tarjeta],
            )}
        </div>
      ) : (
        <div className="sin-resultados">
          <h2 className="font-display text-3xl">No encontramos esa casa.</h2>
          <p className="text-gris my-4">
            Prueba otro nombre o cambia la medida de referencia.
          </p>
          <button
            className="boton"
            onClick={() => {
              setBusqueda("");
              setMedida("");
            }}
          >
            Ver todos los proyectos
          </button>
        </div>
      )}
      {elegido && <Ficha key={elegido.slug} p={elegido} cerrar={cerrar} />}
    </div>
  );
}
