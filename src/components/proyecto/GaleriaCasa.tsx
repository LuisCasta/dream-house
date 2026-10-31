"use client";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import type { Proyecto } from "@/data/proyectos";
import { venta } from "@/data/venta";
import Dialogo from "../Dialogo";
import ImagenVenta from "./ImagenVenta";

const INTERVALO = 6000;
function suscribirMovimiento(callback: () => void) {
  const medio = window.matchMedia("(prefers-reduced-motion: reduce)");
  medio.addEventListener("change", callback);
  return () => medio.removeEventListener("change", callback);
}
function movimientoReducido() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function suscribirVisibilidad(callback: () => void) {
  document.addEventListener("visibilitychange", callback);
  return () => document.removeEventListener("visibilitychange", callback);
}
function estaOculto() {
  return document.hidden;
}
const servidor = () => false;

function Flecha({ anterior = false }: { anterior?: boolean }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d={anterior ? "m14 6-6 6 6 6" : "m10 6 6 6-6 6"}
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function GaleriaCasa({ p }: { p: Proyecto }) {
  const [indice, setIndice] = useState(0);
  const [ampliada, setAmpliada] = useState(false);
  const [videoAbierto, setVideoAbierto] = useState(false);
  const [pausado, setPausado] = useState(false);
  const [encima, setEncima] = useState(false);
  const galeriaRef = useRef<HTMLElement>(null);
  const reducido = useSyncExternalStore(
    suscribirMovimiento,
    movimientoReducido,
    servidor,
  );
  const oculto = useSyncExternalStore(
    suscribirVisibilidad,
    estaOculto,
    servidor,
  );
  const datos = venta(p);
  const nombres = ["Fachada", "Sala", "Cocina", "Recorrido"];
  const cambiar = useCallback((nuevo: number) => {
    setIndice((nuevo + 4) % 4);
    setVideoAbierto(false);
  }, []);
  const detener = pausado || reducido || videoAbierto;
  useEffect(() => {
    if (detener || encima || oculto) return;
    const timer = window.setTimeout(() => cambiar(indice + 1), INTERVALO);
    return () => window.clearTimeout(timer);
  }, [indice, detener, encima, oculto, cambiar, ampliada]);

  function abrirVisor() {
    setVideoAbierto(false);
    setEncima(false);
    setAmpliada(true);
  }
  function cerrarVisor() {
    setVideoAbierto(false);
    setEncima(false);
    setAmpliada(false);
    requestAnimationFrame(() =>
      galeriaRef.current
        ?.querySelector<HTMLButtonElement>(".carrusel-flecha.anterior")
        ?.focus({ preventScroll: true }),
    );
  }
  function visor(grande: boolean) {
    const activo = grande === ampliada;
    return (
      <section
        ref={grande ? undefined : galeriaRef}
        className={`carrusel ${grande ? "carrusel-ampliado" : ""}`}
        aria-label={`${grande ? "Galería ampliada" : "Galería"} de ${p.nombre}`}
        aria-roledescription="carrusel"
        onMouseEnter={() => {
          if (activo) setEncima(true);
        }}
        onMouseLeave={() => {
          if (activo) setEncima(false);
        }}
        onFocusCapture={(e) => {
          if (activo && e.target.matches(":focus-visible")) setPausado(true);
        }}
        onKeyDown={(e) => {
          if (!activo || !["ArrowLeft", "ArrowRight"].includes(e.key)) return;
          e.preventDefault();
          e.stopPropagation();
          cambiar(indice + (e.key === "ArrowLeft" ? -1 : 1));
          setPausado(true);
        }}
      >
        <div className="galeria-principal carrusel-marco">
          <div
            className="carrusel-medio"
            key={`${indice}-${grande}`}
            role="group"
            aria-roledescription="diapositiva"
            aria-label={`${indice + 1} de 4: ${nombres[indice]}`}
          >
            {indice < 3 ? (
              grande ? (
                <ImagenVenta p={p} indice={indice} encajar prioridad />
              ) : (
                <button
                  onClick={abrirVisor}
                  className="carrusel-ampliar"
                  aria-label={`Ampliar ${datos.imagenes[indice].alt}`}
                >
                  <ImagenVenta p={p} indice={indice} encajar prioridad />
                  <span className="ampliar-indicador" aria-hidden>
                    ⤢
                  </span>
                </button>
              )
            ) : videoAbierto && datos.youtubeId && activo ? (
              <iframe
                title={`Recorrido de ${p.nombre}`}
                src={`https://www.youtube-nocookie.com/embed/${encodeURIComponent(datos.youtubeId)}?rel=0`}
                allow="fullscreen; picture-in-picture"
                allowFullScreen
                className="h-full w-full"
              />
            ) : (
              <div className="video-vacio">
                <span className="video-play" aria-hidden>
                  ▷
                </span>
                <h2 className="font-display text-2xl">Recorre la casa</h2>
                {datos.youtubeId ? (
                  <button
                    className="boton mt-5"
                    onClick={() => {
                      setVideoAbierto(true);
                      setPausado(true);
                    }}
                  >
                    Ver recorrido
                  </button>
                ) : (
                  <p>
                    Recorrido de YouTube por confirmar.
                    <br />
                    No hay un video disponible todavía.
                  </p>
                )}
                {!grande && (
                  <button className="enlace ampliar-video" onClick={abrirVisor}>
                    Ampliar visor ↗
                  </button>
                )}
              </div>
            )}
          </div>
          <button
            className="carrusel-flecha anterior"
            onClick={() => cambiar(indice - 1)}
            aria-label="Medio anterior"
          >
            <Flecha anterior />
          </button>
          <button
            className="carrusel-flecha siguiente"
            onClick={() => cambiar(indice + 1)}
            aria-label="Medio siguiente"
          >
            <Flecha />
          </button>
        </div>
        <div className="carrusel-pie">
          <p aria-live={detener ? "polite" : "off"} aria-atomic="true">
            <span className="carrusel-numero">
              {indice + 1} <span>/ 4</span>
            </span>
            <span>{nombres[indice]}</span>
          </p>
          {reducido ? (
            <span className="nota">Avance manual</span>
          ) : (
            <button
              className="carrusel-pausa"
              onClick={() => {
                if (videoAbierto) setVideoAbierto(false);
                setPausado(!detener);
              }}
              aria-label={
                detener
                  ? "Reanudar carrusel automático"
                  : "Pausar carrusel automático"
              }
            >
              <span aria-hidden>{detener ? "▷" : "Ⅱ"}</span>
              {detener ? "Reanudar" : "Pausar"}
            </button>
          )}
        </div>
      </section>
    );
  }
  return (
    <>
      {visor(false)}
      <div className="miniaturas" aria-label="Seleccionar imagen o video">
        {datos.imagenes.map((m, i) => (
          <button
            key={m.espacio}
            onClick={() => {
              cambiar(i);
              setPausado(true);
            }}
            aria-pressed={indice === i}
            aria-label={m.alt}
            className="miniatura"
          >
            <ImagenVenta p={p} indice={i} />
            <span>{nombres[i]}</span>
          </button>
        ))}
        <button
          className="miniatura miniatura-video"
          onClick={() => {
            cambiar(3);
            setPausado(true);
          }}
          aria-pressed={indice === 3}
        >
          <span className="miniatura-play" aria-hidden>
            ▷
          </span>
          <span>Ver recorrido</span>
        </button>
      </div>
      {ampliada && (
        <Dialogo
          titulo={`Visor de ${p.nombre}`}
          cerrar={cerrarVisor}
          className="visor visor-carrusel"
        >
          <header className="visor-cabecera">
            <p>
              {p.nombre} <span>· Imágenes y recorrido</span>
            </p>
            <button
              className="cerrar"
              onClick={cerrarVisor}
              aria-label="Cerrar visor ampliado"
            >
              ×
            </button>
          </header>
          {visor(true)}
        </Dialogo>
      )}
    </>
  );
}
