"use client";

import { useSyncExternalStore } from "react";

const nada = () => () => {};

// true solo en el navegador, después de hidratar. Evita leer localStorage/sessionStorage en el servidor.
export function useMontado() {
  return useSyncExternalStore(nada, () => true, () => false);
}
