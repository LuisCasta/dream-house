// Eventos de conversión y atribución por contenido (UTM).
//
// CONECTAR PROVEEDOR: los eventos se envían a `window.dataLayer`, que es lo que
// lee Google Tag Manager. Desde GTM se pueden reenviar a GA4, Meta Pixel y TikTok
// Pixel sin tocar este código. Si se prefiere enviarlos directo, hacerlo en `enviar()`.

export type Evento =
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
const UTM = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const;

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
  const params = new URLSearchParams(location.search);
  const a: Atribucion = {};
  for (const k of UTM) {
    const v = params.get(k);
    if (v) a[k] = v;
  }
  const referrerExterno = document.referrer && !document.referrer.startsWith(location.origin);
  if (!a.utm_source && !referrerExterno) return;
  a.referrer = document.referrer || undefined;
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
  if (process.env.NODE_ENV !== "production") console.info("[analytics]", evento, datos);
}

export function track(evento: Evento, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  const { ultimo_toque, primer_toque } = obtenerAtribucion();
  enviar(evento, {
    ...params,
    atribucion_ultimo: ultimo_toque,
    atribucion_primero: primer_toque,
  });
}
