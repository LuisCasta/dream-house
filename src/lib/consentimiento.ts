import { METRICAS } from "@/config/metricas";

export type Consentimiento = "aceptado" | "rechazado" | null;
export const CLAVE_CONSENTIMIENTO = "dh_consentimiento_analitica_v1";
const EVENTO = "dh-consentimiento-cambiado";
export const ABRIR_PREFERENCIAS = "dh-abrir-preferencias";
let temporal: Consentimiento | undefined;

export function leerConsentimiento(): Consentimiento {
  if (typeof window === "undefined") return null;
  if (temporal !== undefined) return temporal;
  try {
    const dato = JSON.parse(localStorage.getItem(CLAVE_CONSENTIMIENTO) || "null");
    if (dato?.version !== 1 || !["aceptado", "rechazado"].includes(dato.eleccion)) return null;
    const edad = Date.now() - dato.fecha;
    return Number.isFinite(edad) && edad >= 0 && edad < METRICAS.vigenciaConsentimiento ? dato.eleccion : null;
  } catch { return null; }
}

export function guardarConsentimiento(eleccion: Exclude<Consentimiento, null>) {
  temporal = eleccion;
  try {
    localStorage.setItem(CLAVE_CONSENTIMIENTO, JSON.stringify({ version: 1, eleccion, fecha: Date.now() }));
    if (eleccion === "rechazado") {
      localStorage.removeItem("dh_atribucion_primer_toque");
      localStorage.removeItem("dh_atribucion_ultimo_toque");
    }
  } catch { /* La preferencia sigue siendo válida en la página actual. */ }
  window.dispatchEvent(new Event(EVENTO));
}

export function suscribirConsentimiento(notificar: () => void) {
  const almacenamiento = (evento: StorageEvent) => {
    if (evento.key === CLAVE_CONSENTIMIENTO || evento.key === null) {
      temporal = undefined;
      notificar();
    }
  };
  window.addEventListener(EVENTO, notificar);
  window.addEventListener("storage", almacenamiento);
  return () => {
    window.removeEventListener(EVENTO, notificar);
    window.removeEventListener("storage", almacenamiento);
  };
}

export function abrirPreferencias() {
  window.dispatchEvent(new Event(ABRIR_PREFERENCIAS));
}
