"use client";

import { useSyncExternalStore } from "react";

// Carrito guardado en el navegador (no requiere cuenta ni registro).

export type ItemCarrito = { slug: string; paquete: string };

const CLAVE = "dh_carrito";
const oyentes = new Set<() => void>();
const VACIO: ItemCarrito[] = [];
let cache: { crudo: string | null; items: ItemCarrito[] } = { crudo: null, items: VACIO };

function leer(): ItemCarrito[] {
  try {
    const crudo = localStorage.getItem(CLAVE);
    if (crudo !== cache.crudo) cache = { crudo, items: crudo ? JSON.parse(crudo) : VACIO };
  } catch {}
  return cache.items;
}

function escribir(items: ItemCarrito[]) {
  try {
    localStorage.setItem(CLAVE, JSON.stringify(items));
  } catch {}
  oyentes.forEach((f) => f());
}

function suscribir(f: () => void) {
  oyentes.add(f);
  window.addEventListener("storage", f);
  return () => {
    oyentes.delete(f);
    window.removeEventListener("storage", f);
  };
}

export function useCarrito() {
  return useSyncExternalStore(suscribir, leer, () => VACIO);
}

export function agregarAlCarrito(item: ItemCarrito) {
  const items = leer().filter((i) => i.slug !== item.slug);
  escribir([...items, item]);
}

export function quitarDelCarrito(slug: string) {
  escribir(leer().filter((i) => i.slug !== slug));
}

export function vaciarCarrito() {
  escribir([]);
}
