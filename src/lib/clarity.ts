import { METRICAS } from "@/config/metricas";
import { leerConsentimiento } from "./consentimiento";

type Clarity = ((...args: unknown[]) => void) & { q?: unknown[][] };
declare global { interface Window { clarity?: Clarity } }

// Solo parámetros controlados por el sitio; nunca textos de formularios o URLs personales.
export function parametrosSeguros(params: Record<string, unknown>) {
  const seguros: Record<string, string | number | boolean> = {};
  for (const clave of ["proyecto", "proveedor", "canal", "estado", "medio", "codigo", "medida", "indice", "precio", "personalizada"]) {
    const valor = params[clave];
    if (typeof valor === "string" && /^[a-z0-9_.-]{1,100}$/i.test(valor)) seguros[clave] = valor;
    else if ((typeof valor === "number" && Number.isFinite(valor)) || typeof valor === "boolean") seguros[clave] = valor;
  }
  return seguros;
}

export function registrarClarity(evento: string, params: Record<string, unknown>) {
  if (!METRICAS.habilitadas || leerConsentimiento() !== "aceptado") return;
  window.clarity = window.clarity || Object.assign(function (...args: unknown[]) {
    (window.clarity!.q ||= []).push(args);
  }, { q: [] as unknown[][] });
  for (const [clave, valor] of Object.entries(parametrosSeguros(params))) window.clarity("set", clave, String(valor));
  window.clarity("event", evento);
}

export function retirarClarity() {
  if (!window.clarity) return;
  window.clarity("consentv2", { analytics_Storage: "denied", ad_Storage: "denied" });
  for (const nombre of ["_clck", "_clsk"]) {
    document.cookie = `${nombre}=; Max-Age=0; path=/`;
    document.cookie = `${nombre}=; Max-Age=0; path=/; domain=${location.hostname}`;
  }
  // Recargar elimina el código y las grabaciones en memoria tras revocar.
  window.location.reload();
}
