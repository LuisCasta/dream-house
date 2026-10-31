"use client";
import { useSyncExternalStore } from "react";
import { obtenerProyecto } from "@/data/proyectos";

const CLAVE = "dh_seleccion";
const EVENTO = "dh-seleccion-cambiada";
function leer() {
  try {
    const slug = localStorage.getItem(CLAVE);
    return slug && obtenerProyecto(slug) ? slug : null;
  } catch {
    return null;
  }
}
function suscribir(notificar: () => void) {
  window.addEventListener("storage", notificar);
  window.addEventListener(EVENTO, notificar);
  return () => {
    window.removeEventListener("storage", notificar);
    window.removeEventListener(EVENTO, notificar);
  };
}
export function useSeleccion() {
  return useSyncExternalStore(suscribir, leer, () => null);
}
// Una sola selección, sin correo, precio ni estado de pago.
export function guardarSeleccion(slug: string | null) {
  if (slug !== null && !obtenerProyecto(slug)) return false;
  try {
    if (slug) localStorage.setItem(CLAVE, slug);
    else localStorage.removeItem(CLAVE);
    window.dispatchEvent(new Event(EVENTO));
    return true;
  } catch {
    return false;
  }
}
