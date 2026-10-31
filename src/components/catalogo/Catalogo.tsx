"use client";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import { PROYECTOS, obtenerProyecto } from "@/data/proyectos";
import { MEDIDAS, slugMedida, textoMedida } from "@/data/terrenos";
import { precio, banos } from "@/lib/formato";
import ImagenVenta from "../proyecto/ImagenVenta";
import Ficha from "../proyecto/Ficha";
import Compra from "../Compra";
import BannerColaboracion from "./BannerColaboracion";
import InformacionCatalogo from "./InformacionCatalogo";
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
  const origenFicha = useRef<{
    elemento: HTMLAnchorElement;
    x: number;
    y: number;
  } | null>(null);
  const [busqueda, setBusqueda] = useState("");
  const [medida, setMedida] = useState(medidaInicial);
  const elegido = obtenerProyecto(inicial ?? params.get("casa") ?? "");
  const slugElegido = elegido?.slug;
  useEffect(() => {
    if (slugElegido || !origenFicha.current) return;
    const origen = origenFicha.current;
    origenFicha.current = null;
    // Esperar la restitución nativa del historial, incluido el ancla en Safari.
    let segundoFrame = 0;
    const primerFrame = requestAnimationFrame(() => {
      segundoFrame = requestAnimationFrame(() => {
        window.scrollTo({ left: origen.x, top: origen.y, behavior: "instant" });
        if (origen.elemento.isConnected)
          origen.elemento.focus({ preventScroll: true });
      });
    });
    return () => {
      cancelAnimationFrame(primerFrame);
      cancelAnimationFrame(segundoFrame);
    };
  }, [slugElegido]);
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
    // Safari no enfoca los enlaces al tocarlos; registrar el origen del diálogo.
    e.currentTarget.focus({ preventScroll: true });
    origenFicha.current = {
      elemento: e.currentTarget,
      x: window.scrollX,
      y: window.scrollY,
    };
    vuelta.current = pathname;
    const query = new URLSearchParams(params.toString());
    query.set("casa", slug);
    // Mantener el ancla evita que Safari salte a ella al volver de la ficha.
    router.push(`${pathname}?${query}${window.location.hash}`, {
      scroll: false,
    });
  }
  function cerrar() {
    if (inicial) router.replace("/planos/", { scroll: false });
    else if (vuelta.current === pathname) {
      vuelta.current = null;
      router.back();
    } else {
      const query = new URLSearchParams(params.toString());
      query.delete("casa");
      router.replace(
        `${pathname}${query.size ? `?${query}` : ""}${window.location.hash}`,
        {
          scroll: false,
        },
      );
    }
  }
  return (
    <div className="ancho catalogo">
      <BannerColaboracion />
      <div className="catalogo-herramientas">
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
      </div>
      <SeleccionGuardada abrir={abrir} />
      <p className="nota mb-5">
        Propuesta visual · Imágenes, datos, paquetes y precios de ejemplo por
        confirmar.
      </p>
      <div id="casas" className="catalogo-resultados">
        {lista.length ? (
          <div className="catalogo-grid">
            {lista.map((p, i) => (
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
            ))}
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
      </div>
      <InformacionCatalogo />
      {elegido && <Ficha key={elegido.slug} p={elegido} cerrar={cerrar} />}
    </div>
  );
}
