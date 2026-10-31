// Datos de la marca y del negocio.
// Todo lo marcado como `pendiente: true` se muestra en la web con una etiqueta
// amarilla "Por confirmar" hasta que se reemplace por información real.

export const SITIO = {
  nombre: "Dream House",
  nombreCompleto: "Dream House Planos",
  dominio: "dreamhouse.mx", // PENDIENTE: confirmar dominio
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://dreamhouse.mx",
  moneda: "MXN",
};

export const CONTACTO = {
  pendiente: true,
  whatsapp: "520000000000", // PENDIENTE: número real con código de país, sin "+"
  whatsappVisible: "+52 00 0000 0000",
  email: "hola@dreamhouse.mx",
  horario: "Lunes a viernes, 9:00 a 18:00 (hora del centro de México)",
};

export const REDES = [
  { nombre: "TikTok", url: "https://www.tiktok.com/" }, // PENDIENTE: perfiles reales
  { nombre: "Instagram", url: "https://www.instagram.com/" },
  { nombre: "Facebook", url: "https://www.facebook.com/" },
  { nombre: "YouTube", url: "https://www.youtube.com/" },
];

// Información profesional. No publicar nada que no sea verificable.
export const ARQUITECTO = {
  pendiente: true,
  nombre: "Nombre del arquitecto responsable",
  cedula: "Cédula profesional: por confirmar",
  descripcion:
    "Aquí irá la trayectoria real del despacho o arquitecto responsable, con su cédula profesional consultable en el Registro Nacional de Profesionistas.",
};

export const DATOS_FISCALES = {
  pendiente: true,
  razonSocial: "Razón social por confirmar",
  rfc: "RFC por confirmar",
};

// Afirmaciones de confianza: mostrar solo las que el negocio puede respaldar.
export const GARANTIAS = {
  entregaDigital: true, // los archivos se entregan en línea
  pagoSeguro: true, // depende de la pasarela que se conecte (Stripe / Mercado Pago / Conekta)
  soporte: true, // PENDIENTE: confirmar canal y alcance del soporte post-compra
};

export function enlaceWhatsApp(mensaje: string) {
  if (CONTACTO.pendiente) return "/contacto/";
  return `https://wa.me/${CONTACTO.whatsapp}?text=${encodeURIComponent(mensaje)}`;
}
