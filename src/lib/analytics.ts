// Analítica opcional: eventos sin datos personales, enviados a Clarity tras aceptar.
import { leerConsentimiento } from "./consentimiento";
import { parametrosSeguros, registrarClarity } from "./clarity";

export type Evento =
  | "page_view"
  | "view_gallery_image"
  | "open_gallery"
  | "save_project"
  | "remove_saved_project"
  | "prepare_modification_request"
  | "launch_notification_interest"
  | "demo_view_project"
  | "demo_begin_checkout"
  | "demo_contact"
  | "demo_payment_result"
  | "view_project"
  | "select_lot_size"
  | "view_floorplan"
  | "begin_checkout"
  | "purchase"
  | "request_modification";

export type Atribucion = {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string; // ej. id del video de TikTok
  utm_term?: string;
  referrer?: string;
  landing?: string;
  fecha?: string;
};

const CLAVE_PRIMER = "dh_atribucion_primer_toque";
const CLAVE_ULTIMO = "dh_atribucion_ultimo_toque";
const UTM = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
] as const;

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

function leer(clave: string): Atribucion | null {
  try {
    const v = localStorage.getItem(clave);
    return v ? JSON.parse(v) : null;
  } catch {
    return null;
  }
}

function guardar(clave: string, a: Atribucion) {
  try {
    localStorage.setItem(clave, JSON.stringify(a));
  } catch {}
}

// Se llama una vez por carga de página (ver <Atribucion /> en el layout raíz).
export function capturarAtribucion() {
  if (typeof window === "undefined" || leerConsentimiento() !== "aceptado") return;
  const params = new URLSearchParams(location.search);
  const a: Atribucion = {};
  for (const k of UTM) {
    const v = params.get(k);
    if (v && /^[a-z0-9_.-]{1,100}$/i.test(v)) a[k] = v;
  }
  const referrerExterno =
    document.referrer && !document.referrer.startsWith(location.origin);
  if (!a.utm_source && !referrerExterno) return;
  try { a.referrer = document.referrer ? new URL(document.referrer).origin : undefined; } catch { /* Origen inválido. */ }
  a.landing = location.pathname;
  a.fecha = new Date().toISOString();
  if (!leer(CLAVE_PRIMER)) guardar(CLAVE_PRIMER, a);
  guardar(CLAVE_ULTIMO, a);
}

export function obtenerAtribucion() {
  return { primer_toque: leer(CLAVE_PRIMER), ultimo_toque: leer(CLAVE_ULTIMO) };
}

const REDES = ["tiktok", "instagram", "facebook", "youtube", "fb", "ig", "yt"];

// ¿La visita viene de una red social? (por UTM o por referrer)
export function vieneDeRedes(params: URLSearchParams) {
  const fuente = (params.get("utm_source") ?? "").toLowerCase();
  if (REDES.some((r) => fuente.includes(r))) return true;
  if (typeof document === "undefined") return false;
  const ref = document.referrer.toLowerCase();
  return REDES.some((r) => ref.includes(r));
}

function enviar(evento: Evento, datos: Record<string, unknown>) {
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({ event: evento, ...datos });
  if (!evento.startsWith("demo_")) registrarClarity(evento, datos);
  if (process.env.NODE_ENV !== "production")
    console.info("[analytics]", evento, datos);
}

export function track(evento: Evento, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined" || leerConsentimiento() !== "aceptado") return;
  if (evento.startsWith("demo_")) {
    enviar(evento, {
      proyecto: params.proyecto ?? null,
      escenario: params.escenario ?? null,
      demo: true,
    });
    return;
  }
  const { ultimo_toque, primer_toque } = obtenerAtribucion();
  enviar(evento, {
    ...parametrosSeguros(params),
    atribucion_ultimo: ultimo_toque,
    atribucion_primero: primer_toque,
  });
}
